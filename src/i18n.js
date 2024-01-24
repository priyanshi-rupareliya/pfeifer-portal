import i18next from 'i18next';

i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  resources: {
    en: {
      translation: {
        "logout": "Logout",
        "documentId": "Document ID",
        "name": "Name",
        "type": "Type",
        "date": "Date",
        "status": "Status",
        "firstname": "First Name",
        "lastname": "Last Name",
        "email": "Email",
        "role": "Role",
        "documentName": "Document Name",
        "documentType": "Document Type",
        "uploadDate": "Upload Date",
        "hospitalId": "Hospital ID",
        "hospitalName": "Hospital Name",
        "hospitalType": "Hospital Type",
        
      }
    }
  }
});

export default i18next;
