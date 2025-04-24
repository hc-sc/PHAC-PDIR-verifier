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
    aboutSubtitle: 'View SMART Health Cards and Links',
    getStarted: 'Get Started',
    scanDescriptionShort: 'Use your device\'s camera to scan a SMART Health Card QR code',
    photoDescriptionShort: 'Take a photo of a SMART Health Card QR code',
    fileDescriptionShort: 'Upload a file containing a SMART Health Card',
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
    scanDescription: 'Position the QR code within the frame to scan',
    scanError: 'Error scanning QR code. Please try again.',
    scanSuccess: 'QR code scanned successfully',
    readCode: 'Read Code',

    // Buttons
    saveToPDF: 'Save to PDF',
    saveToFHIR: 'Save to FHIR',
    source: 'Source',
    startScanningText: 'Start Scanning',
    takePhotoText: 'Take Photo',
    openFileText: 'Open file',

    // TCPFooter.js
    disclaimer: 'DISCLAIMER:',
    disclaimerDescription: 'THE COMMONS PROJECT FOUNDATION (“TCP”) DOES NOT PROVIDE MEDICAL ADVICE OR ADMINISTER ANY DIAGNOSTIC MEDICAL TESTS, VACCINES OR OTHER HEALTHCARE INTERVENTIONS. TCP MAKES NO ENDORSEMENT OR REPRESENTATION AS TO THE ACCREDITATION, LICENSING OR GOOD-STANDING OF ANY HEALTHCARE PROVIDER UNDER APPLICABLE STATE, FEDERAL, NATIONAL OR SUPRANATIONAL LAWS AND REGULATIONS. TCP EXPRESSLY DISCLAIMS ANY AND ALL LIABILITY FOR ANY CONSEQUENTIAL, INDIRECT, INCIDENTAL, SPECIAL OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION ANY LOSS OF REVENUES OR PROFITS OR ANY LOSS OF USE OF DATA, ARISING OUT OF OR CONNECTED IN ANY WAY WITH ANY DIAGNOSTIC TESTING, MEDICAL TREATMENT, VACCINATION OR OTHER HEALTHCARE INTERVENTION OR OTHERWISE PROVIDED, SPONSORED, OR PROMOTED BY ANY CTN MEMBER, WHETHER PROVIDED BY THE MEMBER ITSELF OR BY ITS AFFILIATES, REPRESENTATIVES, AGENTS OR SUBCONTRACTORS.',
    privacyPolicy: 'Website Privacy Policy',
    termsOfService: 'Terms of Service',
    
    // About.js
    about: 'About',
  },
  fr: {
    // App.js
    aboutTab: 'À propos',
    scanTab: 'Numériser une carte',
    fileTab: 'Ouvrir le fichier',
    photoTab: 'Prendre une photo',
    searchTab: 'Rechercher un dossier',
    dataTab: 'Détails de la carte',

    // About.js
    aboutTitle: 'Visionneuse de cartes de santé SMART',
    aboutSubtitle: 'Lecture de carte de santé SMART et de liens SMART*',
    getStarted: 'Commencer',
    scanDescriptionShort: 'Utilisez l\'appareil photo de votre appareil pour scanner un code QR de carte de santé SMART',
    photoDescriptionShort: 'Prenez une photo d\'un code QR de carte de santé SMART',
    fileDescriptionShort: 'Téléchargez un fichier contenant une carte de santé SMART',
    aboutContent: "Développée et maintenue par The Commons Project, cette application open source peut être utilisée de manière autonome ou intégrée dans un DSE pour lire les informations contenues dans les cartes de santé et les liens SMART. Les types de données pris en charge comprennent actuellement les cartes de vaccination contre la COVID-19, les dossiers généraux de vaccination, les résumés internationaux de dossiers de patients et les cartes numériques d'assurance maladie. ",
    aboutContact: "Si vous souhaitez héberger vous-même le lecteur, apporter des fonctionnalités ou des correctifs au projet, ou si vous avez d'autres questions, veuillez contacter The Commons Project. Les informations personnelles relatives à la santé sont traitées exclusivement dans le navigateur et ne sont jamais envoyées aux serveurs hébergeant le lecteur.",
    aboutPrivacy: 'Les informations personnelles relatives à la santé sont traitées exclusivement dans le navigateur et ne sont jamais envoyées aux serveurs hébergeant le lecteur.',

    // Photo.js
    captureTitle: "Capturer l'image du code QR de santé Smart",
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

    // Buttons
    saveToPDF: 'Sauvegarder au Format PDF',
    saveToFHIR: 'Sauvegarder au Format FHIR',
    source: 'Source',
    startScanningText: 'Démarrer la numérisation',
    takePhotoText: 'Prendre une photo',
    openFileText: 'Ouvrir le fichier',

    // TCPFooter.js
    disclaimer: 'DISCLAIMER:',
    disclaimerDescription: "CLAUSE DE NON-RESPONSABILITÉ : LA FONDATION COMMONS PROJECT (« TCP ») NE FOURNIT PAS DE CONSEILS MÉDICAUX ET N'ADMINISTRE PAS DE TESTS MÉDICAUX DIAGNOSTIQUES, DE VACCINS OU D'AUTRES INTERVENTIONS DE SANTÉ. LA TCP NE DONNE AUCUNE GARANTIE NI NE FAIT AUCUNE DÉCLARATION QUANT À L'ACCRÉDITATION, L'AUTORISATION D'EXERCER OU LA BONNE RÉPUTATION D'UN PRESTATAIRE DE SOINS DE SANTÉ EN VERTU DES LOIS ET RÉGLEMENTATIONS ÉTATIQUES, FÉDÉRALES, NATIONALES OU SUPRANATIONALES EN VIGUEUR. LE TCP DÉCLINE EXPRESSÉMENT TOUTE RESPONSABILITÉ EN CAS DE DOMMAGES CONSÉCUTIFS, INDIRECTS, ACCESSOIRES, SPÉCIAUX OU EXEMPLAIRES, Y COMPRIS, MAIS SANS S'Y LIMITER, TOUTE PERTE DE REVENUS OU DE BÉNÉFICES OU TOUTE PERTE D'UTILISATION DE DONNÉES, DÉCOULANT DE OU LIÉS DE QUELQUE MANIÈRE QUE CE SOIT À TOUT TEST DE DIAGNOSTIC, TRAITEMENT MÉDICAL, VACCINATION OU AUTRE INTERVENTION DE SOINS DE SANTÉ OU AUTREMENT FOURNI, PARRAINÉ OU PROMU PAR UN MEMBRE DU CTN, QU'IL SOIT FOURNI PAR LE MEMBRE LUI-MÊME OU PAR SES AFFILIÉS, SES REPRÉSENTANTS, SES AGENTS OU SES SOUS-TRAITANTS.",
    privacyPolicy: 'Politique sur la vie privée du site internet',
    termsOfService: 'Termes et conditions',
    // About.js
    about: 'À propos',
  }
}; 