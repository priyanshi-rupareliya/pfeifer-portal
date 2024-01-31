import i18next from 'i18next';

i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  resources: {
    en: {
      translation: {
        "logout": "Logout",
        "name": "Name",
        "type": "Type",
        "date": "Date",
        "firstname": "First Name",
        "lastname": "Last Name",
        "email": "Email",
        "uploadDate": "Upload Date",
      }
    }
  }
});

export default i18next;
