import * as futil from "./lib/fhirUtil.js";

import styles from "./ImmunizationHistory.module.css";
import { useLanguage } from './lib/LanguageContext';

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

function renderImmunizationGroup(
  key,
  immunizations,
  organized,
  dcr
) {
  const renderPatient = () => {
    const patientInfo = futil.renderPerson(immunizations[0].patient, organized.byId);

    return (
      <>
        <tr key={key}>
          <th>Name (last, first) / Nom (nom, prénom)</th>
          <td>{patientInfo.name}</td>
        </tr>
        <tr key={key}>
          <th>Date of birth <br></br> (Y-M-D) / Date de naissance (A-M-J)</th>
          <td>{patientInfo.dob}</td>
        </tr>
        {patientInfo.identifier && (
          <tr key={key}>
            <th>Unique identifier / Identifiant unique</th>
            <td>{patientInfo.identifier}</td>
          </tr>
        )}
      </>
    );
  };

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
  const patientInfo = futil.renderPerson(immunizations[0].patient, organized.byId);
  const birthDate = patientInfo.dob;
  const age = futil.renderAge(immunization.occurrenceDateTime, birthDate);
  const lotNumber = immunization.lotNumber === "N/A" ? "Unspecified" : immunization.lotNumber;
  const sourceJurisdiction = immunization.performer.some((p) => p.actor.display === "N/A")
      ? "Unspecified"
      : renderPerformers(immunization.performer);


  return (
    <tr key={key}>
      <td>{immunization.occurrenceDateTime}</td>
      <td>{age.years}Y {age.months}M</td>
      <td>{futil.renderCodeableJSX(immunization.vaccineCode, dcr)}</td>
      <td>{renderCodings(immunization.vaccineCode.coding)}</td>
      <td>{lotNumber}</td> 
      <td>{sourceJurisdiction}</td>
      {immunization.status && <td>{immunization.status}</td>}
    </tr>
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
}

export default function ImmunizationHistory({ organized, dcr }) {
  const { t } = useLanguage();
  const immunizationGroups = immunizationsByPatient(
    Object.values(organized.all)
  );
  if (immunizationGroups.length === 0) {
    return;
  }
  return (
    <div className={styles.container}>
      <h2>{t('immunization')}</h2>
      {immunizationGroups.map((ig, index) => (
        <div key={index}>
          {renderImmunizationGroup(index, ig, organized, dcr)}
        </div>
      ))}
    </div>
  );
}
