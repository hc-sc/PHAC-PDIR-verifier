import * as futil from "./lib/fhirUtil.js";

import styles from "./ImmunizationHistory.module.css";

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
          <th>Patient Name</th>
          <td>{patientInfo.name}</td>
        </tr>
        <tr key={key}>
          <th>Date of Birth</th>
          <td>{patientInfo.dob}</td>
        </tr>
        <tr key={key}>
          <th>Unique Identifier</th>
          <td>{patientInfo.identifier}</td>
        </tr>
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


    return (
      <tr key={key}>
        <td>{immunization.occurrenceDateTime}</td>
        <td>{age.years}Y {age.months}M</td>
        <td>{futil.renderCodeableJSX(immunization.vaccineCode, dcr)}</td>
        <td>{renderCodings(immunization.vaccineCode.coding)}</td>
        <td>{renderPerformers(immunization.performer)}</td>
        <td>{immunization.lotNumber}</td>
         {immunization.status && <td>{immunization.status}</td>}
      </tr>
    );
  };

  const renderImmunizations = () => {
    return immunizations
      .sort((a, b) => a.occurrenceDateTime > b.occurrenceDateTime)
      .map((i, index) => renderImmunization(i, index));
  };

  const renderImmunizationHeaders = () => {
    return (
      <tr>
        <th>Date Administered</th>
        <th>At age</th>
        <th>Name</th>
        <th>SNOMED-CT</th>
        <th>Performer</th>
        <th>Lot Number</th>
          {immunizations[0].status && <th>Status</th>}
      </tr>
    );
  };

  return (
    <table className={styles.dataTable}>
      <tbody>{renderPatient()}</tbody>
      <tbody>{renderImmunizationHeaders()}</tbody>
      <tbody>{renderImmunizations()}</tbody>
    </table>
  );
}

export default function ImmunizationHistory({ organized, dcr }) {
  const immunizationGroups = immunizationsByPatient(
    Object.values(organized.all)
  );
  if (immunizationGroups.length === 0) {
    return;
  }
  return (
    <div className={styles.container}>
      <h2>Immunizations</h2>
      {immunizationGroups.map((ig, index) => (
        <div key={index}>
          {renderImmunizationGroup(index, ig, organized, dcr)}
        </div>
      ))}
    </div>
  );
}
