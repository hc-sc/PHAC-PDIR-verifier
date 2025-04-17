import React from 'react';
import { Button } from '@mui/material';
import { useOptionalFhir } from './OptionalFhir';
import config from './lib/config.js';
import styles from './About.module.css';
import { useLanguage } from './lib/LanguageContext';

export default function About({ setTab, tabValues }) {
  const { t } = useLanguage();
  const fhir = useOptionalFhir();

  const lnk = (text, url) => {
    return (<a href={url} target="_blank" rel="noreferrer">{text}</a>);
  }

  const renderTabButton = (tab, text) => {
    return (
      <Button 
        variant="contained" 
        onClick={() => setTab(tab)}
        className={styles.actionButton}
      >
        {text}
      </Button>
    );
  }

  const commonsLink = lnk("The Commons Project", "https://www.thecommonsproject.org/");
  const smartLink = lnk("SMART Health Cards and Links", "https://smarthealth.cards/");
  const srcLink = lnk("open source application", "https://github.com/the-commons-project/shc-web-reader");
  const covidLink = lnk("COVID-19 vaccine cards", "https://smarthealth.cards/en/find-my-issuer.html");
  const ipsLink = lnk("International Patient Summaries", "https://international-patient-summary.net/");

  return (
    <div className={styles.about}>
      <div className={styles.header}>
        <img src="shc.png" alt="SMART Health Card" className={styles.logo} />
        <h1 className={styles.title}>{t('aboutTitle')}</h1>
        <p className={styles.subtitle}>{t('aboutSubtitle')}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('getStarted')}</h2>
          <div className={styles.features}>
            {config("showScan") && (
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{t('scanTab')}</h3>
                <p className={styles.featureDescription}>{t('scanDescription')}</p>
                {renderTabButton(tabValues.Scan, "Start Scanning")}
              </div>
            )}
            {config("showPhoto") && (
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{t('photoTab')}</h3>
                <p className={styles.featureDescription}>{t('photoDescription')}</p>
                {renderTabButton(tabValues.Photo, "Take Photo")}
              </div>
            )}
            {config("showFile") && (
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{t('fileTab')}</h3>
                <p className={styles.featureDescription}>{t('fileDescription')}</p>
                {renderTabButton(tabValues.File, "Open File")}
              </div>
            )}
            {fhir && config("showSearch") && (
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>Search Records</h3>
                <p className={styles.featureDescription}>
                  Find and view health records in your system
                </p>
                {renderTabButton(tabValues.Search, "Search Records")}
              </div>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.description}>
            {t('aboutContent')}
          </p>
          <p className={styles.description}>
            {t('aboutContact')}
          </p>
          <p className={styles.privacy}>{t('aboutPrivacy')}</p>
        </div>
      </div>
    </div>
  );
}

