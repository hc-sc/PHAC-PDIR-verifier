import React, { useState, useEffect } from 'react';
import * as futil from "./lib/fhirUtil.js";

import styles from "./ImmunizationHistory.module.css";
import { useLanguage } from './lib/LanguageContext';
import { parseNVCVaccineMappings } from './lib/codes.js';

function immunizationsByPatient(resources) {
  const groups = resources.reduce((acc, resource) => {
    if (resource.resourceType !== "Immunization") {
      return acc;
    }
    const key = resource.patient.reference;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(resource);
    return acc;
  }, {});

  return Object.values(groups);
}


export default function ImmunizationHistory({ organized, dcr, nvcJson }) {
  const { t, currentLanguage } = useLanguage();
  const [nvcVaccineMappings, setNvcVaccineMappings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVaccineMappings = async () => {
      try {
        setLoading(true);
        const mappings = await parseNVCVaccineMappings(nvcJson);
        setNvcVaccineMappings(mappings);
      } catch (error) {
        console.error('Failed to load vaccine mappings:', error);
        setNvcVaccineMappings({});
      } finally {
        setLoading(false);
      }
    };

    if (nvcJson) {
      loadVaccineMappings();
    }
  }, [nvcJson]);

  const renderCodings = (codings) => {
    return (
    <ul>
      {codings.map((c, index) => (
        <li key={index}>
          {c.code} ({c.system})
        </li>
      ))}
    </ul>
  );
  };
  
  const renderPerformers = (performers) => {
    if (!performers) return(undefined);
    
    return (
      <ul>
      {performers.map((p, index) => {
        return (
          <li key={index}>
            {p.actor.display.split(',')[0]}
          </li>
        );
      })}
      </ul>
    );
  };

  const renderImmunization = (immunization, key) => {
    const patientInfo = futil.renderPerson(immunization.patient, organized.byId);
    const birthDate = patientInfo.dob;
    const age = futil.renderAge(immunization.occurrenceDateTime, birthDate);
    
    // Use French text when language is French
    const isFrench = currentLanguage === 'fr';
    const unspecifiedText = isFrench ? "Non spécifié" : "Unspecified";
    const unknownText = isFrench ? "Inconnu" : "Unknown";
    
    const lotNumber = immunization.lotNumber === "N/A" ? unspecifiedText : immunization.lotNumber;
    const sourceJurisdiction = immunization.performer.some((p) => p.actor.display === "N/A")
      ? unspecifiedText
      : renderPerformers(immunization.performer);

      const vaccineCode = String(immunization.vaccineCode?.coding?.[0]?.code ?? "");
      
      // Get diseases and display name based on language
      let diseases = unknownText;
      let displayName = unknownText;
      
      if (nvcVaccineMappings && nvcVaccineMappings[vaccineCode]) {
        const mapping = nvcVaccineMappings[vaccineCode];
        
        // Use French disease names if available, otherwise fall back to English
        if (isFrench && mapping.diseasesFR) {
          diseases = mapping.diseasesFR.sort().join("; ");
        } else if (mapping.diseases) {
          diseases = mapping.diseases.sort().join("; ");
        }
        
        // Use French display name if available, otherwise fall back to English
        if (isFrench && mapping.displayNameFR) {
          displayName = mapping.displayNameFR;
        } else if (mapping.displayName) {
          displayName = mapping.displayName;
        }
      }

      // Format age display based on language
      const ageDisplay = isFrench 
        ? `${age.years}A ${age.months}M` 
        : `${age.years}Y ${age.months}M`;

    return (
    <tr key={key}>
        <td>{immunization.occurrenceDateTime}</td>
        <td>{ageDisplay}</td>
        <td>{diseases}</td>
        <td>{displayName}</td>
        <td>{renderCodings(immunization.vaccineCode.coding)}</td>
        <td>{lotNumber}</td> 
        <td>{sourceJurisdiction}</td>
        {immunization.status && <td>{immunization.status}</td>}
      </tr>
    );
  };

  const renderImmunizationGroup = (key, immunizations, organized, dcr, nvcVaccineMappings) => {
    const renderPatient = () => {
      const patientInfo = futil.renderPerson(immunizations[0].patient, organized.byId);

      return (
        <>
          <tr key={`${key}-name`}>
            <th>Name (last, first) / Nom (nom, prénom)</th>
            <td>{patientInfo.name}</td>
          </tr>
          <tr key={`${key}-dob`}>
            <th>Date of birth <br></br> (Y-M-D) / Date de naissance (A-M-J)</th>
            <td>{patientInfo.dob}</td>
          </tr>
          {patientInfo.identifier && (
            <tr key={`${key}-identifier`}>
              <th>Unique identifier / Identifiant unique</th>
              <td>{patientInfo.identifier}</td>
            </tr>
          )}
        </>
      );
    };


    const renderImmunizations = () => {
      return immunizations
        .sort((a, b) => new Date(b.occurrenceDateTime) - new Date(a.occurrenceDateTime))
      .map((i, index) => renderImmunization(i, index));
    };

    const renderImmunizationHeaders = () => {
      return (
      <tr>
        <th>Date given (Y-M-D) / Date d'administration  <br></br> (A-M-J)</th>
        <th>At age / <br></br> Âge à l'administration</th>
        <th>Vaccine preventable disease(s) / Maladie(s) évitable(s) par la vaccination</th>
        <th>Vaccine or antigen / Vaccin ou  antigène</th>
        <th>SNOMED-CT</th>
        <th>Lot number / Numéro de lot</th>
        <th>Source jurisdiction / Juridiction de provenance</th>
        {immunizations[0].status && <th>Status</th>}
      </tr>
    );
    };

    return (
      <table className={styles.immunizationTable}>
        <tbody>{renderPatient()}</tbody>
        <tbody>{renderImmunizationHeaders()}</tbody>
        <tbody>{renderImmunizations()}</tbody>
      </table>
    );
  };

  const immunizationGroups = immunizationsByPatient(
    Object.values(organized.all)
  );
  
  if (immunizationGroups.length === 0) {
    return;
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <h2>{t('immunization')}</h2>
        <p>Loading vaccine data...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>{t('immunization')}</h2>
      {immunizationGroups.map((ig, index) => (
        <div key={index}>
          {renderImmunizationGroup(index, ig, organized, dcr, nvcVaccineMappings)}
        </div>
      ))}
    </div>
  );
}
