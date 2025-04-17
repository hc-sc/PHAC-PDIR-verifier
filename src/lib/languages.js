export const languages = {
  en: {
    // App.js
    aboutTab: 'About',
    scanTab: 'Scan Card',
    fileTab: 'Open File',
    photoTab: 'Take Photo',
    searchTab: 'Search Record',
    dataTab: 'Card Details',

    // About.js
    aboutTitle: 'SMART Health Card Viewer',
    aboutSubtitle: 'View and verify SMART Health Cards and Links in your browser.',
    getStarted: 'Get Started',
    scanDescription: 'Use your device\'s camera to scan a SMART Health Card QR code',
    photoDescription: 'Take a photo of a SMART Health Card QR code',
    fileDescription: 'Upload a file containing a SMART Health Card',
    aboutContent: 'Developed and maintained by The Commons Project, this open source application can be used standalone or embedded within an EHR to read information in SMART Health Cards and Links. Supported data types currently include COVID-19 vaccine cards, general immunization records, International Patient Summaries, and Digital Health Insurance Cards.',
    aboutContact: 'If you would like to host the viewer yourself, contribute features or fixes to the project, or have any other questions, please contact The Commons Project.',
    aboutPrivacy: 'Personal health information is processed exclusively in the browser and is never sent to the servers hosting the viewer.',

    // Photo.js
    captureTitle: 'Capture Smart Health QR Code Image',
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
    fileTitle: 'Open File',
    noFileChosen: 'No file chosen',
    fileDescription: 'The viewer can typically read files with a .smart-health-card or .fhir extension.',
    chooseFile: 'Choose File',
    fileError: 'Error reading file. Please try again.',
    invalidFile: 'Invalid file format. Please choose a valid SMART Health Card file.',

    // Scan.js
    scanTitle: 'Scan a Smart Health Card QR Code',
    scanDescription: 'Position the QR code within the frame to scan',
    scanError: 'Error scanning QR code. Please try again.',
    scanSuccess: 'QR code scanned successfully',
    readCode: 'Read Code',

    // Buttons
    saveToPDF: 'Save to PDF',
    saveToFHIR: 'Save to FHIR',
    source: 'Source',
  },
  fr: {
    // App.js
    aboutTab: 'À propos',
    scanTab: 'Scanner la carte',
    fileTab: 'Ouvrir un fichier',
    photoTab: 'Prendre une photo',
    searchTab: 'Rechercher un dossier',
    dataTab: 'Détails de la carte',

    // About.js
    aboutTitle: 'Visionneuse de cartes de santé SMART',
    aboutSubtitle: 'Visualisez et vérifiez les cartes de santé SMART et les liens dans votre navigateur.',
    getStarted: 'Commencer',
    scanDescription: 'Utilisez l\'appareil photo de votre appareil pour scanner un code QR de carte de santé SMART',
    photoDescription: 'Prenez une photo d\'un code QR de carte de santé SMART',
    fileDescription: 'Téléchargez un fichier contenant une carte de santé SMART',
    aboutContent: 'Développée et maintenue par The Commons Project, cette application open source peut être utilisée de manière autonome ou intégrée dans un DSE pour lire les informations des cartes de santé SMART et des liens. Les types de données actuellement pris en charge incluent les cartes de vaccination COVID-19, les dossiers d\'immunisation généraux, les résumés de patients internationaux et les cartes d\'assurance maladie numériques.',
    aboutContact: 'Si vous souhaitez héberger la visionneuse vous-même, contribuer à des fonctionnalités ou des corrections au projet, ou si vous avez d\'autres questions, veuillez contacter The Commons Project.',
    aboutPrivacy: 'Les informations de santé personnelles sont traitées exclusivement dans le navigateur et ne sont jamais envoyées aux serveurs hébergeant la visionneuse.',

    // Photo.js
    captureTitle: 'Capturer le code QR de santé intelligent',
    cameraPaused: 'Caméra en pause',
    restartCamera: 'Redémarrer la caméra',
    openCamera: 'Ouvrir la caméra',
    cameraAccessDenied: 'Accès à la caméra refusé. Veuillez autoriser l\'accès à la caméra et réessayer.',
    noQrCode: 'Aucun code QR détecté. Veuillez réessayer.',
    invalidQrCode: 'Format de code QR invalide. Veuillez scanner un code QR de carte de santé valide.',
    qrCodeError: 'Erreur lors du traitement du code QR. Veuillez réessayer.',
    cameraError: 'Échec du démarrage de la caméra. Veuillez réessayer.',
    cameraTimeout: 'Session de la caméra expirée. Veuillez redémarrer la caméra.',

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
    noFileChosen: 'Aucun fichier choisi',
    fileDescription: 'Le visualiseur peut généralement lire les fichiers avec les extensions .smart-health-card ou .fhir.',
    chooseFile: 'Choisir un fichier',
    fileError: 'Erreur lors de la lecture du fichier. Veuillez réessayer.',
    invalidFile: 'Format de fichier invalide. Veuillez choisir un fichier de carte de santé SMART valide.',

    // Scan.js
    scanTitle: 'Scannez un code QR de carte de santé SMART',
    scanDescription: 'Positionnez le code QR dans le cadre pour le scanner',
    scanError: 'Erreur lors du scan du code QR. Veuillez réessayer.',
    scanSuccess: 'Code QR scanné avec succès',
    readCode: 'Lire le code',

    // Buttons
    saveToPDF: 'Enregistrer en PDF',
    saveToFHIR: 'Enregistrer en FHIR',
    source: 'Source',
  }
}; 