
// Our primary need is to render human-useful text for various codes. This
// module tries to normalize all of the vagaries of this data into something
// simple that translates system + code into a display name.
//
// Most of these are FHIR CodeSystem resources. Others are just
// scraped or hacked together from who knows where. Such a hassle.

import config from './config.js';

// +--------------------+
// | Systems Dictionary |
// +--------------------+

// Edit this to add new systems. "url" should resolve to the source data;
// "type" defaults to "fhir" which means a CodeSystem resource.
// See "loadSystem" for alternative type options.

const systems = {

  // National Vaccine Catalogue
  "http://snomed.info/sct/20611000087101": {
        "url": "https://raw.githubusercontent.com/hc-sc/hc-pdir-vaccine-lookup-table/refs/heads/main/vaccine-table/nvc-bundle.json",
        "type": "nvc",
        "placeHolder": "hhc-pdir-vaccine-lookup-table"
    },
  // coverage-class
  "http://terminology.hl7.org/CodeSystem/coverage-class": {
	"url": "https://build.fhir.org/ig/HL7/UTG/CodeSystem-coverage-class.json"
  },

  // copay 
  "http://terminology.hl7.org/CodeSystem/coverage-copay-type": {
	"url": "https://build.fhir.org/ig/HL7/UTG/CodeSystem-coverage-copay-type.json"
  },

  // copayExt
  "http://hl7.org/fhir/us/insurance-card/CodeSystem/C4DICExtendedCopayTypeCS": {
	"url": "https://build.fhir.org/ig/HL7/carin-digital-insurance-card/CodeSystem-C4DICExtendedCopayTypeCS.json"
  },

  // contact
  "http://terminology.hl7.org/CodeSystem/contactentity-type": {
	"url": "https://build.fhir.org/ig/HL7/UTG/CodeSystem-contactentity-type.json"
  },

  // contactExt
  "http://hl7.org/fhir/us/insurance-card/CodeSystem/C4DICExtendedContactTypeCS": {
	"url": "https://build.fhir.org/ig/HL7/carin-digital-insurance-card/CodeSystem-C4DICExtendedContactTypeCS.json"
  },

  // WHO ATC (Snapshot)
  "http://www.whocc.no/atc": {
	"type": "dictionary",
	"url": "codes-who-atc.json",
	"placeHolder": "..."
  },

  // SNOMED SCT (Global Patient Set)
  "http://snomed.info/sct": {
	"type": "dictionary",
	"url": "codes-snomed-sct.json",
	"plaecHolder": "..."
  },

  // LOINC
  "http://loinc.org": {
	"type": "dictionary",
	"url": "codes-loinc.json",
	"plaecHolder": "..."
  },

  // CPT (Docket Snapshot)
  "http://www.ama-assn.org/go/cpt": {
	"type": "docket-cpt",
	"url": "https://raw.githubusercontent.com/hellodocket/vaccine-code-mappings/main/vaccine-code-mapping.json",
	"placeHolder": "..."
  },
  
  // CVX (Docket Snapshot)
  "http://hl7.org/fhir/sid/cvx": {
	"type": "docket-cvx",
	"url": "https://raw.githubusercontent.com/hellodocket/vaccine-code-mappings/main/vaccine-code-mapping.json",
	"placeHolder": "..."
  },

  // ObservationInterpretation
  "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation": {
	"url": "https://build.fhir.org/ig/HL7/UTG/CodeSystem-v3-ObservationInterpretation.json"
  },

  // Substance Admin Substitution
  "http://terminology.hl7.org/CodeSystem/v3-substanceAdminSubstitution": {
	"url": "https://build.fhir.org/ig/HL7/UTG/CodeSystem-v3-substanceAdminSubstitution.json"
  },

  // Consent Policy and Scope Definitions
  "http://terminology.hl7.org/CodeSystem/consentpolicycodes": {
	"url": "https://build.fhir.org/ig/HL7/UTG/CodeSystem-consentpolicycodes.json"
  },

  "http://terminology.hl7.org/CodeSystem/consentscope": {
	"url": "https://build.fhir.org/ig/HL7/UTG/CodeSystem-consentscope.json"
  },

  // Consent Category value set dependencies
  "http://terminology.hl7.org/CodeSystem/consentcategorycodes": {
	"url": "https://build.fhir.org/ig/HL7/UTG/CodeSystem-consentcategorycodes.json"
  },

  
}

// +--------------------------+
// | getDeferringCodeRenderer |
// +--------------------------+

// This object makes it easier to use codes in React components that
// are expected to run sync. safeDisplay will always return a "reasonable"
// value synchronously. In UseEffect(), a true value from awaitDeferred
// means you should re-render because new (relevant) systems have been
// loaded.

export function getDeferringCodeRenderer() {

  const obj = { deferred: {}, promises: [] };

  obj.safeCodeDisplay = function(system, code) {
	
	const [disp, defer] = safeDisplaySync(system, code);
	
	if (defer && !this.deferred[system]) {
	  console.log(`deferring load for system ${system}`);
	  this.deferred[system] = true;
	  this.promises.push(getSystem(system));
	}

	return(disp);
  };

  obj.safeCodingDisplay = function(c) {
	return(c.display || this.safeCodeDisplay(c.system, c.code));
  }

  obj.awaitDeferred = async function() {
	let anyLoaded = false;
	for (const i in this.promises) {
	  if (await this.promises[i]) anyLoaded = true;
	}
	return(anyLoaded);
  }

  return(obj);
}

// +-----------------+
// | safeDisplay     |
// | safeDisplaySync |
// +-----------------+

export async function safeDisplay(system, code) {
  let [disp, defer] = safeDisplaySync(system, code);
  if (defer && await getSystem(system)) [disp, defer] = safeDisplaySync(system, code);
  return(disp);
}

function safeDisplaySync(system, code) {

  if (systemLoaded(system) || getSystemLocal(system)) {
	return([ _loadedSystems[system][code] || code, false ]);
  }

  const loadable = systemLoadable(system);
  const placeHolder = (loadable ? (systems[system].placeHolder || code) : code);
  return([ placeHolder, loadable ]);
}

// +----------------+
// | systemLoadable |
// | systemLoaded   |
// | getSystemLocal |
// | getSystem      |
// +----------------+

const _loadedSystems = {};
const _failedSystems = {};

function systemLoadable(system) {
  return(systemLoaded(system) || (systems[system] && !_failedSystems[system]));
}

function systemLoaded(system) {
  return(_loadedSystems[system]);
}

function getSystemLocal(system) {

  const local = getFromLocal(system);
  if (!local) return(undefined);

  _loadedSystems[system] = local;
  return(local);
}

export async function getSystem(system) {

  if (systemLoaded(system)) return(_loadedSystems[system]);
  if (!systemLoadable(system)) return(undefined);

  try {
	let loaded = getFromLocal(system);
	if (!loaded) {
	  loaded = await loadSystem(system);
	  saveToLocal(system, loaded);
	}
	
	_loadedSystems[system] = loaded;
	return(_loadedSystems[system]);
  }
  catch (err) {
	console.error(err.toString());
	_failedSystems[system] = true;
	return(undefined);
  }
}

async function loadSystem(system) {

  const url = systems[system].url;
  const type = systems[system].type || "fhir";
  
  const response = await fetch(url);
  if (response.status < 200 || response.status >= 300) {
	throw new Error(`loading ${system} from ${url} (${response.status})`);
  }

  switch (type) {
	case "fhir":
	  return(parseFhirSystem(system, await response.json()));

	case "dictionary":
	  return(await response.json());

	case "docket-cvx":
	  return(parseDocketVaccineMappings(await response.json(), "cvx"));

	case "docket-cpt":
	  return(parseDocketVaccineMappings(await response.json(), "cpt"));

    case "nvc":
      return (await parseNVCVaccineMappings(await response.json()));

	default:
	  throw new Error(`Unknown system type ${type} for ${system}`);
  }
}

// +-----------------+
// | parseFhirSystem |
// +-----------------+

function parseFhirSystem(system, resource) {

  switch (resource.resourceType) {
	  
	case "CodeSystem":
	  return(parseFhirCodeSystem(resource));

	default:
	  throw new Error(`Can't parse ${resource.resourceType} for ${system}`);
  }
}

// +---------------------+
// | parseFhirCodeSystem |
// +---------------------+

function parseFhirCodeSystem(resource) {

  const system = {};

  for (const i in resource.concept) {
	addCodeSystemConcept(system, resource.concept[i]);
  }

  return(system);
}

function addCodeSystemConcept(system, c) {

  system[c.code] = c.display || c.code;

  if (c.concept) {
	for (const i in c.concept) {
	  addCodeSystemConcept(system, c.concept[i]);
	}
  }
}

// +----------------------------+
// | parseDocketVaccineMappings |
// +----------------------------+

function parseDocketVaccineMappings(json, tag) {

  const values = json[tag];
  const parsed = {};

  Object.keys(values).forEach((key,index) => {
	parsed[key.toString()] = values[key].name;
  });

  return(parsed);
}

// +----------------------------+
// | Disease Name Mapping      |
// +----------------------------+

// Cache for disease name maps
let _diseaseNameMaps = {};

async function getDiseaseNameMap(language) {
  if (_diseaseNameMaps[language]) {
    return _diseaseNameMaps[language];
  }

  try {
    const snomedSystem = await getSystem("http://snomed.info/sct");
    if (!snomedSystem) {
      console.warn("SNOMED system not available, using fallback disease names");
      // Fallback to hardcoded disease names if SNOMED system fails
      _diseaseNameMaps[language] = getFallbackDiseaseNames();
      return _diseaseNameMaps[language];
    }
    
    _diseaseNameMaps[language] = snomedSystem;
    return snomedSystem;
  } catch (error) {
    console.error(`Failed to load disease name map for ${language}:`, error);
    // Fallback to hardcoded disease names
    _diseaseNameMaps[language] = getFallbackDiseaseNames();
    return _diseaseNameMaps[language];
  }
}

function getFallbackDiseaseNames() {
  return {
    "397430003": "Diphtheria due to Corynebacterium diphtheriae",
    "406583002": "Haemophilus influenzae type b infection",
    "27836007": "Pertussis",
    "398102009": "Acute poliomyelitis",
    "76902006": "Tetanus",
    "18624000": "Rotavirus infection",
    "56717001": "Tuberculosis",
    "66071002": "Hepatitis B",
    "40468003": "Hepatitis A",
    "14189004": "Measles",
    "36653000": "Mumps",
    "36989005": "Rubella",
    "38907003": "Varicella",
    "23511006": "Meningococcal disease",
    "16814004": "Pneumococcal disease",
    "240532009": "Human papilloma virus infection",
    "840539006": "COVID-19",
    "6142004": "Influenza",
    "4740000": "Shingles",
    "55735004": "Respiratory syncytial virus infection",
    "67924001": "Smallpox",
    "359814004": "Mpox",
    "14168008": "Rabies",
    "409498004": "Anthrax",
    "45901000087102": "Zaire Ebolavirus disease",
    "63650001": "Cholera",
    "11840006": "Traveler's diarrhea",
    "4834000": "Typhoid fever",
    "111864006": "Chikungunya fever",
    "52947006": "Japanese encephalitis",
    "712986001": "Tickborne encephalitis"
  };
}

function cleanLabel(label) {
  if (!label) return "";
  return label.trim().replace(/\s+/g, " ");
}

// +----------------------------+
// | buildCategoryLabels        |
// +----------------------------+

async function buildCategoryLabels() {
  const diseaseNameMapEN = await getDiseaseNameMap("EN");
  const diseaseNameMapFR = await getDiseaseNameMap("FR");

  // Static categories as defined
  const staticLabels = {
    category1Group: {
      snomedCodes: ["397430003", "406583002", "27836007", "398102009", "76902006"], // Diphtheria, Haemophilus influenzae, Pertussis, Poliomyelitis, Tetanus
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category2Group: {
      snomedCodes: ["18624000"], // Rotavirus
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category3Group: {
      snomedCodes: ["56717001"], // Tuberculosis
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category4Group: {
      snomedCodes: ["66071002", "40468003"], // Hepatitis A, B
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category5Group: {
      snomedCodes: ["14189004", "36653000", "36989005", "38907003"], // Measles, Mumps, Rubella, Varicella
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category6Group: {
      snomedCodes: ["23511006"], // Meningococcal disease
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category7Group: {
      snomedCodes: ["16814004"], // Pneumococcal disease
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category8Group: {
      snomedCodes: ["240532009"], // Human papilloma virus infection
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category9Group: {
      snomedCodes: ["840539006", "6142004"], // COVID-19, Influenza
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category10Group: {
      snomedCodes: ["4740000"], // Shingles
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category11Group: {
      snomedCodes: ["55735004"], // Respiratory syncytial virus infection
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category12Group: {
      snomedCodes: ["67924001", "359814004"], // Smallpox, Mpox
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category13Group: {
      snomedCodes: ["14168008"], // Rabies
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category14Group: {
      snomedCodes: ["409498004", "45901000087102"], // Anthrax, Zaire Ebolavirus disease
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category15Group: {
      snomedCodes: ["63650001", "11840006", "4834000"], // Cholera, Traveler's diarrhea, Typhoid fever
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    category16Group: {
      snomedCodes: ["111864006", "52947006", "712986001"], // Chikungunya fever, Japanese encephalitis, Tickborne encephalitis
      get nameEN() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapEN[code]).filter(Boolean).join(", ")); },
      get nameFR() { return cleanLabel(this.snomedCodes.map(code => diseaseNameMapFR[code]).filter(Boolean).join(", ")); }
    },
    unspecified: {
      snomedCodes: [],
      get nameEN() { return "Unspecified"; },
      get nameFR() { return "Non spécifié"; }
    }
  };

  return staticLabels;
}

// +----------------------------+
// | parseNVCVaccineMappings    |
// +----------------------------+
export async function parseNVCVaccineMappings(json) {
  const table = json?.table || {}; 
  const parsed = {};
  const categoryLabels = await buildCategoryLabels();

  Object.keys(table).forEach(vaccineCode => {
    const entry = table[vaccineCode];
    
    // Extract diseases from NVC data
    const diseases = (entry.diseaseEN || []).map(diseaseObj => {
      return Object.values(diseaseObj)[0];
    });

    // If no diseases found in NVC data, try to infer from display name
    let finalDiseases = diseases;
    if (diseases.length === 0) {
      finalDiseases = inferDiseasesFromDisplayName(entry.displayEN, categoryLabels);
    }

    // Extract French diseases from NVC data
    const diseasesFR = (entry.diseaseFR || []).map(diseaseObj => {
      return Object.values(diseaseObj)[0];
    });

    // If no French diseases found in NVC data, try to infer from display name
    let finalDiseasesFR = diseasesFR;
    if (diseasesFR.length === 0) {
      finalDiseasesFR = inferDiseasesFromDisplayName(entry.displayFR, categoryLabels, 'FR');
    }

    parsed[vaccineCode] = {
      displayName: entry.displayEN || "Unknown",
      displayNameFR: entry.displayFR || "Inconnu",
      diseases: finalDiseases.length ? finalDiseases : ["Unknown"],
      diseasesFR: finalDiseasesFR.length ? finalDiseasesFR : ["Inconnu"],
      categoryLabels: categoryLabels
    };
  });
  
  return parsed;
}

// +----------------------------+
// | inferDiseasesFromDisplayName |
// +----------------------------+

function inferDiseasesFromDisplayName(displayName, categoryLabels, language = 'EN') {
  if (!displayName) return [];

  const displayLower = displayName.toLowerCase();
  const diseases = [];

  // Map display name keywords to disease categories
  const keywordMappings = {
    // English keywords
    'diphtheria': language === 'FR' ? categoryLabels.category1Group.nameFR : categoryLabels.category1Group.nameEN,
    'tetanus': language === 'FR' ? categoryLabels.category1Group.nameFR : categoryLabels.category1Group.nameEN,
    'pertussis': language === 'FR' ? categoryLabels.category1Group.nameFR : categoryLabels.category1Group.nameEN,
    'polio': language === 'FR' ? categoryLabels.category1Group.nameFR : categoryLabels.category1Group.nameEN,
    'haemophilus': language === 'FR' ? categoryLabels.category1Group.nameFR : categoryLabels.category1Group.nameEN,
    'hib': language === 'FR' ? categoryLabels.category1Group.nameFR : categoryLabels.category1Group.nameEN,
    'rotavirus': language === 'FR' ? categoryLabels.category2Group.nameFR : categoryLabels.category2Group.nameEN,
    'tuberculosis': language === 'FR' ? categoryLabels.category3Group.nameFR : categoryLabels.category3Group.nameEN,
    'hepatitis a': language === 'FR' ? categoryLabels.category4Group.nameFR : categoryLabels.category4Group.nameEN,
    'hepatitis b': language === 'FR' ? categoryLabels.category4Group.nameFR : categoryLabels.category4Group.nameEN,
    'hepatitis': language === 'FR' ? categoryLabels.category4Group.nameFR : categoryLabels.category4Group.nameEN,
    'measles': language === 'FR' ? categoryLabels.category5Group.nameFR : categoryLabels.category5Group.nameEN,
    'mumps': language === 'FR' ? categoryLabels.category5Group.nameFR : categoryLabels.category5Group.nameEN,
    'rubella': language === 'FR' ? categoryLabels.category5Group.nameFR : categoryLabels.category5Group.nameEN,
    'varicella': language === 'FR' ? categoryLabels.category5Group.nameFR : categoryLabels.category5Group.nameEN,
    'meningococcal': language === 'FR' ? categoryLabels.category6Group.nameFR : categoryLabels.category6Group.nameEN,
    'pneumococcal': language === 'FR' ? categoryLabels.category7Group.nameFR : categoryLabels.category7Group.nameEN,
    'hpv': language === 'FR' ? categoryLabels.category8Group.nameFR : categoryLabels.category8Group.nameEN,
    'papilloma': language === 'FR' ? categoryLabels.category8Group.nameFR : categoryLabels.category8Group.nameEN,
    'covid': language === 'FR' ? categoryLabels.category9Group.nameFR : categoryLabels.category9Group.nameEN,
    'influenza': language === 'FR' ? categoryLabels.category9Group.nameFR : categoryLabels.category9Group.nameEN,
    'flu': language === 'FR' ? categoryLabels.category9Group.nameFR : categoryLabels.category9Group.nameEN,
    'shingles': language === 'FR' ? categoryLabels.category10Group.nameFR : categoryLabels.category10Group.nameEN,
    'herpes zoster': language === 'FR' ? categoryLabels.category10Group.nameFR : categoryLabels.category10Group.nameEN,
    'rsv': language === 'FR' ? categoryLabels.category11Group.nameFR : categoryLabels.category11Group.nameEN,
    'respiratory syncytial': language === 'FR' ? categoryLabels.category11Group.nameFR : categoryLabels.category11Group.nameEN,
    'smallpox': language === 'FR' ? categoryLabels.category12Group.nameFR : categoryLabels.category12Group.nameEN,
    'mpox': language === 'FR' ? categoryLabels.category12Group.nameFR : categoryLabels.category12Group.nameEN,
    'rabies': language === 'FR' ? categoryLabels.category13Group.nameFR : categoryLabels.category13Group.nameEN,
    'anthrax': language === 'FR' ? categoryLabels.category14Group.nameFR : categoryLabels.category14Group.nameEN,
    'ebola': language === 'FR' ? categoryLabels.category14Group.nameFR : categoryLabels.category14Group.nameEN,
    'cholera': language === 'FR' ? categoryLabels.category15Group.nameFR : categoryLabels.category15Group.nameEN,
    'typhoid': language === 'FR' ? categoryLabels.category15Group.nameFR : categoryLabels.category15Group.nameEN,
    'chikungunya': language === 'FR' ? categoryLabels.category16Group.nameFR : categoryLabels.category16Group.nameEN,
    'japanese encephalitis': language === 'FR' ? categoryLabels.category16Group.nameFR : categoryLabels.category16Group.nameEN,
    'tickborne encephalitis': language === 'FR' ? categoryLabels.category16Group.nameFR : categoryLabels.category16Group.nameEN,
    
    // French keywords
    'diphtérie': language === 'FR' ? categoryLabels.category1Group.nameFR : categoryLabels.category1Group.nameEN,
    'tétanos': language === 'FR' ? categoryLabels.category1Group.nameFR : categoryLabels.category1Group.nameEN,
    'coqueluche': language === 'FR' ? categoryLabels.category1Group.nameFR : categoryLabels.category1Group.nameEN,
    'poliomyélite': language === 'FR' ? categoryLabels.category1Group.nameFR : categoryLabels.category1Group.nameEN,
    'haemophilus': language === 'FR' ? categoryLabels.category1Group.nameFR : categoryLabels.category1Group.nameEN,
    'rotavirus': language === 'FR' ? categoryLabels.category2Group.nameFR : categoryLabels.category2Group.nameEN,
    'tuberculose': language === 'FR' ? categoryLabels.category3Group.nameFR : categoryLabels.category3Group.nameEN,
    'hépatite a': language === 'FR' ? categoryLabels.category4Group.nameFR : categoryLabels.category4Group.nameEN,
    'hépatite b': language === 'FR' ? categoryLabels.category4Group.nameFR : categoryLabels.category4Group.nameEN,
    'hépatite': language === 'FR' ? categoryLabels.category4Group.nameFR : categoryLabels.category4Group.nameEN,
    'rougeole': language === 'FR' ? categoryLabels.category5Group.nameFR : categoryLabels.category5Group.nameEN,
    'oreillons': language === 'FR' ? categoryLabels.category5Group.nameFR : categoryLabels.category5Group.nameEN,
    'rubéole': language === 'FR' ? categoryLabels.category5Group.nameFR : categoryLabels.category5Group.nameEN,
    'varicelle': language === 'FR' ? categoryLabels.category5Group.nameFR : categoryLabels.category5Group.nameEN,
    'méningocoque': language === 'FR' ? categoryLabels.category6Group.nameFR : categoryLabels.category6Group.nameEN,
    'pneumocoque': language === 'FR' ? categoryLabels.category7Group.nameFR : categoryLabels.category7Group.nameEN,
    'vph': language === 'FR' ? categoryLabels.category8Group.nameFR : categoryLabels.category8Group.nameEN,
    'papillome': language === 'FR' ? categoryLabels.category8Group.nameFR : categoryLabels.category8Group.nameEN,
    'covid': language === 'FR' ? categoryLabels.category9Group.nameFR : categoryLabels.category9Group.nameEN,
    'grippe': language === 'FR' ? categoryLabels.category9Group.nameFR : categoryLabels.category9Group.nameEN,
    'influenza': language === 'FR' ? categoryLabels.category9Group.nameFR : categoryLabels.category9Group.nameEN,
    'zona': language === 'FR' ? categoryLabels.category10Group.nameFR : categoryLabels.category10Group.nameEN,
    'vrs': language === 'FR' ? categoryLabels.category11Group.nameFR : categoryLabels.category11Group.nameEN,
    'variole': language === 'FR' ? categoryLabels.category12Group.nameFR : categoryLabels.category12Group.nameEN,
    'rage': language === 'FR' ? categoryLabels.category13Group.nameFR : categoryLabels.category13Group.nameEN,
    'choléra': language === 'FR' ? categoryLabels.category15Group.nameFR : categoryLabels.category15Group.nameEN,
    'typhoïde': language === 'FR' ? categoryLabels.category15Group.nameFR : categoryLabels.category15Group.nameEN
  };

  // Check for keyword matches
  for (const [keyword, diseaseGroup] of Object.entries(keywordMappings)) {
    if (displayLower.includes(keyword)) {
      diseases.push(diseaseGroup);
    }
  }

  return diseases;
}
// +--------------+
// | getFromLocal |
// | saveToLocal  |
// +--------------+

const CACHE_PREFIX = "sys__";

function getFromLocal(system) {

  const key = getCacheKey(system);
  const cached = localStorage.getItem(key);
  if (!cached) return(undefined);

  try {
	let expireDate = getCacheDate(cached);
	expireDate.setSeconds(expireDate.getSeconds() + config("terminologyCacheSeconds"));
	if (new Date() > expireDate) throw new Error("expired");
	return(JSON.parse(cached.substring(cached.indexOf("|") + 1)));
  }
  catch (err) {
	console.log(`pruning ${system} from cache (${err})`);
	localStorage.removeItem(key);
	return(undefined);
  }
}

function saveToLocal(system, dict) {

  const key = getCacheKey(system);
  const cached = `${new Date()}|${JSON.stringify(dict)}`;

  if (cached.length > config("terminologyCacheItemCeiling")) {
	console.log(`system ${system} too big to cache (${cached.length})`);
	return;
  }

  if (trySaveLocal(key, cached)) {
	console.log(`successfully cached ${system} on first try`);
	return;
  }

  // try to prune things out and save in the background
  
  setTimeout(() => {
	
	// start pruning from the cache FIFO
	// (sort comes from getCacheState)
	
	let cchNeeded = cached.length;
	const cacheState = getCacheState();

	let i = 0;
	while (cchNeeded > 0 && i < cacheState.length) {
	  localStorage.removeItem(cacheState[i].key);
	  cchNeeded -= cacheState[i].cch;
	  ++i;
	}

	if (cchNeeded > 0) {
	  // so sad too bad
	  console.log(`can't cache ${system} (${cached.length} cch)`);
	  return;
	}

	if (!trySaveLocal(key, cached)) {
	  console.log(`failed caching ${system} on second try`);
	}
  }, 0);
  
}

function trySaveLocal(key, cached) {
  try {
	localStorage.setItem(key, cached);
	return(true);
  }
  catch (err) {
	console.log(err.toString());
	return(false);
  }
}

function getCacheKey(system) {
  return(CACHE_PREFIX + system);
}

function getCacheDate(cached) {
  const ichPipe = cached.indexOf("|");
  if (ichPipe === -1) throw new Error("invalid cache item");
  const cacheDate = new Date();
  cacheDate.setTime(Date.parse(cached.substring(0, ichPipe)));
  return(cacheDate);
}

function getCacheState() {

  const state = [];

  for (let i = 0; i < localStorage.length; ++i) {
	
	const key = localStorage.key(i);
	if (!key.startsWith(CACHE_PREFIX)) continue;

	const cached = localStorage.getItem(key);
	
	state.push({
	  key: key,
	  cached: getCacheDate(cached),
	  cch: cached.length
	});
  }

  state.sort((a,b) => (a.cached - b.cached));
  
  return(state);
}



