import React from 'react';
import { useLanguage } from './lib/LanguageContext';
import styles from './File.module.css';

export default function File({ onFileSelect }) {
  const { t } = useLanguage();
  const [fileName, setFileName] = React.useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className={styles.fileContainer}>
      <h2>{t('fileTitle')}</h2>
      <div className={styles.fileInputContainer}>
        <input
          type="file"
          id="fileInput"
          accept=".smart-health-card,.fhir"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <label htmlFor="fileInput" className={styles.fileLabel}>
          {t('chooseFile')}
        </label>
        <p className={styles.fileName}>{fileName || t('noFileChosen')}</p>
      </div>
      <p className={styles.fileDescription}>{t('fileDescription')}</p>
    </div>
  );
}
