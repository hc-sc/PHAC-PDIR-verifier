import React from 'react';
import { Button } from '@mui/material';
import { useOptionalFhir } from './OptionalFhir';
import config from './lib/config.js';
import styles from './About.module.css';
import { useLanguage } from './lib/LanguageContext';

export default function About({ setTab, tabValues }) {
  const { t } = useLanguage();
  const fhir = useOptionalFhir();

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
                <p className={styles.featureDescription}>{t('scanDescriptionShort')}</p>
                {renderTabButton(tabValues.Scan, t('startScanningText'))}
              </div>
            )}
            {config("showPhoto") && (
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{t('photoTab')}</h3>
                <p className={styles.featureDescription}>{t('photoDescriptionShort')}</p>
                {renderTabButton(tabValues.Photo, t('takePhotoText'))}
              </div>
            )}
            {config("showFile") && (
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{t('fileTab')}</h3>
                <p className={styles.featureDescription}>{t('fileDescriptionShort')}</p>
                {renderTabButton(tabValues.File, t('openFileText'))}
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
          <h2 className={styles.sectionTitle}>{t('about')}</h2>
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

