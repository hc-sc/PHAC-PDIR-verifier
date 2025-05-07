import { CERT_STATUS_VALID, CERT_STATUS_INVALID } from './lib/SHX.js';

import styles from './ValidationInfo.module.css';
import { useLanguage } from './lib/LanguageContext';

export default function ValidationInfo({ bundle }) {
  const { t, currentLanguage } = useLanguage();

  // +-------------+
  // | renderValid |
  // +-------------+

  const renderValid = () => {
	
	let issuer = bundle.issuerName;
	if (bundle.issuerURL) {
	  issuer = <a target="_blank" rel="noreferrer"
				  href={bundle.issuerURL}>{issuer}</a>;
	}

  const issueDate = bundle.issueDate.toLocaleString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
  

  const revocationQualifier = 
            (bundle.supportsRevocation ? '' :
              <> Because this issuer does not support revocation,
                details may have changed since that time.</>);

	return(
	  <div className={styles.container}>
		{t('validation1')} <span className={styles.green}>{t('validation2')}</span> {t('validation3')} <b>{issuer}</b> {t('validation4')} <b>{issueDate}</b>.
	  </div>
	);
  }

  // +---------------+
  // | renderInvalid |
  // +---------------+
  
  const renderInvalid = () => {

	const reasons = bundle.reasons.map(r => <li key={r}>{r}</li>);
	
	return(
	  <div className={styles.container}>
		{t('validation1')} <span className={styles.red}>{t('invalidValidation')}</span>.
		<ul>{reasons}</ul>
	  </div>
	);
  }

  // +------------+
  // | renderNone |
  // +------------+

  const renderNone = () => {
	return(<></>);
  }

  // +--------+
  // | render |
  // +--------+

  let info = undefined;
  switch (bundle.certStatus) {
    case CERT_STATUS_VALID: info = renderValid(); break;
    case CERT_STATUS_INVALID: info = renderInvalid(); break;
    default: info = renderNone(); break;
  }
  
  return(info);
}

