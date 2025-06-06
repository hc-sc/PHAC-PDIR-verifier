import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Button } from '@mui/material';
import About from './About.js';
import File from './File.js';
import Photo from './Photo.js';
import Search from './Search.js';
import Data from './Data.js';
import TCPFooter from './TCPFooter.js';
import { useOptionalFhir } from './OptionalFhir';
import config from './lib/config.js';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';

import styles from './App.module.css';

const TabValue = {
  About: 'about',
  File: 'file',
  Photo: 'photo',
  Search: 'search',
  Data: 'data'
}

function AppContent() {
  const [tabValue, setTabValue] = useState(config("initialTab"));
  const [scannedSHX, setScannedSHX] = useState(undefined);
  const fhir = useOptionalFhir();
  const { t, toggleLanguage, currentLanguage } = useLanguage();

  const [nvcJson, setNvcJson] = useState(null);
  // Request to download JSON file 
  useEffect(() => {
  fetch("https://raw.githubusercontent.com/hc-sc/hc-pdir-vaccine-lookup-table/main/vaccine-table/nvc-bundle.json")
    .then(response => response.json()) // Convert to make it a usable JSON object
    .then(data => {
      setNvcJson(data); // Update with fetched data
    })
    .catch(error => console.error("Failed to fetch NVC JSON", error));
}, []);


  const handleTabChange = (evt, newValue) => {
    setTabValue(newValue);
  };

  function setTab(newTab) {
    setTabValue(newTab);
  }

  function viewData(shx) {
    setScannedSHX(shx);
    setTabValue(TabValue.Data);
  }

  useEffect(() => {
    const shx = config("shx");
    if (shx) viewData(shx);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          orientation='horizontal'
          variant='scrollable'
          scrollButtons='auto'
          allowScrollButtonsMobile

        >
          <Tab label={t('aboutTab')} value={TabValue.About} />
          {config("showPhoto") && <Tab label={t('photoTab')} value={TabValue.Photo} />}
          {config("showFile") && <Tab label={t('fileTab')} value={TabValue.File} />}
          {fhir && config("showSearch") && <Tab label={t('searchTab')} value={TabValue.Search} />}
          {scannedSHX && <Tab label={t('dataTab')} value={TabValue.Data} />}
        </Tabs>
        <Button 
          onClick={toggleLanguage}
          className={styles.languageButton}
        >
          {currentLanguage === 'en' ? 'FR' : 'EN'}
        </Button>
      </div>

      <div className={styles.content}>
        {tabValue === TabValue.About && <About setTab={setTab} tabValues={TabValue} />}
        {tabValue === TabValue.File && <File viewData={viewData} />}
        {tabValue === TabValue.Photo && <Photo viewData={viewData} />}
        {tabValue === TabValue.Search && <Search viewData={viewData} />}
        {tabValue === TabValue.Data && <Data shx={scannedSHX} nvcJson={nvcJson} />}
      </div>

      {config("tcpFooter") && <TCPFooter />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

