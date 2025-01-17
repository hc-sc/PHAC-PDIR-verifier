
import styles from './TCPFooter.module.css';
import { useLanguage } from './lib/LanguageContext';

export default function TCPFooter() {
const { t } = useLanguage();

  return (
	<div className={styles.container}>
	  <div>
		<a href="https://www.commonhealth.org/website-privacy-policy">{t('privacyPolicy')}</a>
		&nbsp;|&nbsp;
		<a href="https://www.commonhealth.org/terms">{t('termsOfService')}</a>
	  </div>
	  <div>
		<b>{t('disclaimer')}</b>{t('disclaimerDescription')}
	  </div>
	</div>
  );
}

