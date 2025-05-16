export const languages = {
  en: {
    // App.js
    aboutTab: 'About',
    fileTab: 'Open file',
    photoTab: 'Use your camera',
    searchTab: 'Search Record',
    dataTab: 'Card Details',

    // About.js
    aboutTitle: 'SMART Health Card Viewer',
    aboutSubtitle: 'View SMART Health Cards',
    getStarted: 'Get Started',
    photoDescriptionShort: 'Start scanning using your camera',
    fileDescriptionShort: 'Upload a file containing a SMART Health Card',
  
    aboutContent: 'This viewer is a modification of the ',
    aboutContent1:'SMART Heath Card viewer',
    aboutContent2:', an ',
    aboutContent3: 'open source application',
    aboutContent4: ' developed and maintained by ',
    aboutContent5:'The Commons Project',
    aboutContent6:'. This version of the application can be used standalone or embedded within an EHR to read information in ', 
    aboutContent7:'SMART Health Cards',
    aboutContent8:'. Supported data types currently include digital immunization records issues using the ', 
    aboutContent9:'SMART Health Card standard', 
    aboutContent10:'.',

    aboutPrivacy: 'Personal health information is processed exclusively in the browser and is never sent to the servers hosting the viewer.',

    // Photo.js
    captureTitle: 'Capture SMART Health Card QR Code image',
    cameraPaused: 'Camera paused',
    restartCamera: 'Restart Camera',
    openCamera: 'Open Camera',
    cameraAccessDenied: 'Camera access denied. Please allow camera access and try again.',
    noQrCode: 'No QR code detected. Please try again.',
    invalidQrCode: 'Invalid QR code format. Please scan a valid health card QR code.',
    qrCodeError: 'Error processing QR code. Please try again.',
    cameraError: 'Failed to start camera. Please try again.',
    cameraTimeout: 'Camera session timed out. Please restart the camera.',

    // ValidationInfo.js
    validationTitle: 'Validation Information',
    valid: 'Valid',
    invalid: 'Invalid',
    expired: 'Expired',
    notValidYet: 'Not valid yet',
    signatureValid: 'Signature Valid',
    signatureInvalid: 'Signature Invalid',
    issuerValid: 'Issuer Valid',
    issuerInvalid: 'Issuer Invalid',
    typeValid: 'Type Valid',
    typeInvalid: 'Type Invalid',
    statusValid: 'Status Valid',
    statusInvalid: 'Status Invalid',
    dateValid: 'Date Valid',
    dateInvalid: 'Date Invalid',

    // PatientSummary.js
    patientInfo: 'Patient Information',
    name: 'Name',
    birthDate: 'Date of Birth',
    identifier: 'Identifier',

    // ImmunizationHistory.js
    immunizationHistory: 'Immunization History',
    date: 'Date',
    vaccine: 'Vaccine',
    lotNumber: 'Lot Number',
    jurisdiction: 'Jurisdiction',
    status: 'Status',
    completed: 'Completed',
    notCompleted: 'Not Completed',

    // TCPFooter.js
    footerText: 'Powered by TCP',

    // File.js
    fileTitle: 'Open file',
    noFileChosen: 'No file chosen',
    fileDescription: 'The viewer can typically read files with a .smart-health-card or .fhir extension.',
    chooseFile: 'Choose File',
    fileError: 'Error reading file. Please try again.',
    invalidFile: 'Invalid file format. Please choose a valid SMART Health Card file.',

    // Scan.js
    scanDescription: 'Position the QR code within the frame to scan',
    scanError: 'Error scanning QR code. Please try again.',
    scanSuccess: 'QR code scanned successfully',
    readCode: 'Read Code',
    scanTitle: 'Scan a Smart Health Card QR Code',
    // Buttons
    saveToPDF: 'Save to PDF',
    saveToFHIR: 'Save to FHIR',
    source: 'Source',
    takePhotoText: 'Scan',
    openFileText: 'Open file',

    // TCPFooter.js
    disclaimer: 'DISCLAIMER: ',
    disclaimerDescription: 'THE COMMONS PROJECT FOUNDATION (“TCP”) DOES NOT PROVIDE MEDICAL ADVICE OR ADMINISTER ANY DIAGNOSTIC MEDICAL TESTS, VACCINES OR OTHER HEALTHCARE INTERVENTIONS. TCP MAKES NO ENDORSEMENT OR REPRESENTATION AS TO THE ACCREDITATION, LICENSING OR GOOD-STANDING OF ANY HEALTHCARE PROVIDER UNDER APPLICABLE STATE, FEDERAL, NATIONAL OR SUPRANATIONAL LAWS AND REGULATIONS. TCP EXPRESSLY DISCLAIMS ANY AND ALL LIABILITY FOR ANY CONSEQUENTIAL, INDIRECT, INCIDENTAL, SPECIAL OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION ANY LOSS OF REVENUES OR PROFITS OR ANY LOSS OF USE OF DATA, ARISING OUT OF OR CONNECTED IN ANY WAY WITH ANY DIAGNOSTIC TESTING, MEDICAL TREATMENT, VACCINATION OR OTHER HEALTHCARE INTERVENTION OR OTHERWISE PROVIDED, SPONSORED, OR PROMOTED BY ANY CTN MEMBER, WHETHER PROVIDED BY THE MEMBER ITSELF OR BY ITS AFFILIATES, REPRESENTATIVES, AGENTS OR SUBCONTRACTORS.',
    linksDislaimer: ' ',
    privacyPolicy: 'Website Privacy Policy',
    termsOfService: 'Terms of Service',
    
    // About.js
    about: 'About',

    // ValidationInfo.js
    validation1: 'This card is',
    validation2: 'valid',
    validation3: 'and was issued by',
    validation4: 'on',
    invalidValidation: 'invalid',


  },
  fr: {
    // App.js
    aboutTab: 'À propos',
    fileTab: 'Ouvrir un fichier',
    photoTab: 'Utiliser votre caméra',
    searchTab: 'Rechercher un dossier',
    dataTab: 'Détails de la carte',

    // About.js
    aboutTitle: 'Lecteur de carte de santé SMART',
    aboutSubtitle: 'Lit et vérifie les cartes de santé SMART',
    getStarted: 'Débuter',
    photoDescriptionShort: 'Commencer à numériser en utilisant votre caméra',
    fileDescriptionShort:  "Le lecteur peut généralement lire les fichiers portant l'extension .smart-health-card ou .fhir.",
    aboutContent: 'Ce lecteur est une modification du ',
    aboutContent1:'lecteur de carte de santé SMART',
    aboutContent2:', une ',
    aboutContent3: 'application open source',
    aboutContent4: ' développée et maintenue par ',
    aboutContent5:'The Commons Project',
    aboutContent6:". Cette version de l'application peut être utilisée de manière autonome ou intégrée dans un DSE pour lire les informations contenues dans les ", 
    aboutContent7:'SMART Health Cards',
    aboutContent8:'. Les types de données pris en charge comprennent actuellement les dossiers de vaccination électroniques émis selon la ', 
    aboutContent9:'norme de la carte de santé SMART', 
    aboutContent10:'.',
    aboutPrivacy: 'Les informations personnelles relatives à la santé sont traitées exclusivement dans le navigateur et ne sont jamais envoyées aux serveurs hébergeant le lecteur.',
    

    // Photo.js
    captureTitle: "Capturer l'image du code QR de carte santé SMART",
    cameraPaused: 'Caméra en pause',
    restartCamera: 'Redémarrer la caméra',
    openCamera: 'Ouvrir la caméra',
    cameraAccessDenied: 'Accès à la caméra refusé. Veuillez autoriser l\'accès à la caméra et réessayer.',
    noQrCode: 'Aucun code QR détecté. Veuillez réessayer.',
    invalidQrCode: 'Format de code QR invalide. Veuillez scanner un code QR de carte de santé valide.',
    qrCodeError: 'Erreur lors du traitement du code QR. Veuillez réessayer.',
    cameraError: 'Échec du démarrage de la caméra. Veuillez réessayer.',
    cameraTimeout: 'La session de la caméra est écoulée. Veuillez redémarrer votre caméra.',

    // ValidationInfo.js
    validationTitle: 'Informations de validation',
    valid: 'Valide',
    invalid: 'Invalide',
    expired: 'Expiré',
    notValidYet: 'Pas encore valide',
    signatureValid: 'Signature valide',
    signatureInvalid: 'Signature invalide',
    issuerValid: 'Émetteur valide',
    issuerInvalid: 'Émetteur invalide',
    typeValid: 'Type valide',
    typeInvalid: 'Type invalide',
    statusValid: 'Statut valide',
    statusInvalid: 'Statut invalide',
    dateValid: 'Date valide',
    dateInvalid: 'Date invalide',
    invalidValidation: 'invalide',

    // PatientSummary.js
    patientInfo: 'Informations du patient',
    name: 'Nom',
    birthDate: 'Date de naissance',
    identifier: 'Identifiant',

    // ImmunizationHistory.js
    immunizationHistory: 'Historique de vaccination',
    date: 'Date',
    vaccine: 'Vaccin',
    lotNumber: 'Numéro de lot',
    jurisdiction: 'Juridiction',
    status: 'Statut',
    completed: 'Complété',
    notCompleted: 'Non complété',

    // TCPFooter.js
    footerText: 'Propulsé par TCP',

    // File.js
    fileTitle: 'Ouvrir un fichier',
    noFileChosen: 'Aucun fichier sélectionné',
    fileDescription: "Le lecteur peut généralement lire les fichiers portant l'extension .smart-health-card ou .fhir.",
    chooseFile: 'Choisir un fichier',
    fileError: 'Erreur lors de la lecture du fichier. Veuillez réessayer.',
    invalidFile: 'Format de fichier invalide. Veuillez choisir un fichier de carte de santé SMART valide.',

    // Scan.js
    scanDescription: 'Positionnez le code QR dans le cadre pour le scanner',
    scanError: 'Erreur lors du scan du code QR. Veuillez réessayer.',
    scanSuccess: 'Code QR scanné avec succès',
    readCode: 'Lire le code',
    scanTitle: 'Numériser un code QR de santé Smart',

    // Buttons
    saveToPDF: 'Sauvegarder au Format PDF',
    saveToFHIR: 'Sauvegarder au Format FHIR',
    source: 'Source',
    startScanningText: 'Commencer à numériser',
    takePhotoText: 'Numériser',
    openFileText: 'Ouvrir un fichier',

    // TCPFooter.js
    disclaimer: 'CLAUSE DE NON-RESPONSABILITÉ : ',
    disclaimerDescription: "LA FONDATION COMMONS PROJECT (« TCP ») NE FOURNIT PAS DE CONSEILS MÉDICAUX ET N'ADMINISTRE PAS DE TESTS MÉDICAUX DIAGNOSTIQUES, DE VACCINS OU D'AUTRES INTERVENTIONS DE SANTÉ. LA TCP NE DONNE AUCUNE GARANTIE NI NE FAIT AUCUNE DÉCLARATION QUANT À L'ACCRÉDITATION, L'AUTORISATION D'EXERCER OU LA BONNE RÉPUTATION D'UN PRESTATAIRE DE SOINS DE SANTÉ EN VERTU DES LOIS ET RÉGLEMENTATIONS ÉTATIQUES, FÉDÉRALES, NATIONALES OU SUPRANATIONALES EN VIGUEUR. LE TCP DÉCLINE EXPRESSÉMENT TOUTE RESPONSABILITÉ EN CAS DE DOMMAGES CONSÉCUTIFS, INDIRECTS, ACCESSOIRES, SPÉCIAUX OU EXEMPLAIRES, Y COMPRIS, MAIS SANS S'Y LIMITER, TOUTE PERTE DE REVENUS OU DE BÉNÉFICES OU TOUTE PERTE D'UTILISATION DE DONNÉES, DÉCOULANT DE OU LIÉS DE QUELQUE MANIÈRE QUE CE SOIT À TOUT TEST DE DIAGNOSTIC, TRAITEMENT MÉDICAL, VACCINATION OU AUTRE INTERVENTION DE SOINS DE SANTÉ OU AUTREMENT FOURNI, PARRAINÉ OU PROMU PAR UN MEMBRE DU CTN, QU'IL SOIT FOURNI PAR LE MEMBRE LUI-MÊME OU PAR SES AFFILIÉS, SES REPRÉSENTANTS, SES AGENTS OU SES SOUS-TRAITANTS.",
    privacyPolicy: 'Politique sur la vie privée du site internet',
    termsOfService: 'Termes et conditions',
    linksDislaimer: '*Tous les liens sont disponibles en anglais seulement ',

    // About.js
    about: 'À propos',

    //Validation.js
    validation1: 'Cette carte est',
    validation2: 'valide',
    validation3: 'et a été émise par le',
    validation4: 'le',



  }
}; 