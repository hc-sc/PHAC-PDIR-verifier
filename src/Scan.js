import React, { useState, useEffect, useCallback } from 'react';
import { Button, TextField } from '@mui/material';
import { looksLikeSHX } from './lib/SHX.js';
import { looksLikeJSON } from './lib/fhirUtil.js';
import { useLanguage } from './lib/LanguageContext';

export default function Scan({ viewData }) {
  const { t } = useLanguage();
  const [qrCode, setQRCode] = useState('');

  const maybeSHX = useCallback(() => {
    return(looksLikeSHX(qrCode) || looksLikeJSON(qrCode));
  }, [qrCode]);
  
  const handleQRCodeChange = async (evt) => {
    setQRCode(evt.target.value);
  };

  useEffect(() => {
    if (maybeSHX() && qrCode.endsWith('\n')) viewData(qrCode);
  }, [qrCode,maybeSHX,viewData]);

  return (
    <div>
      <h1>{t('scanTitle')}</h1>

      <TextField variant='outlined'
                 rows={6}
                 margin='normal'
                 fullWidth
                 autoFocus
                 multiline
                 value={qrCode}
                 onChange={handleQRCodeChange}
      />

      <Button variant='contained'
              disabled={ !maybeSHX() }
              onClick={ async () => viewData(qrCode) } >
        {t('readCode')}
      </Button>
    </div>
  );
}
