import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
// import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(XHR)
    // .use(Cache)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'fr',

        react: {
            // wait: true, // globally set to wait for loaded translations in translate hoc
            // exposeNamespace: true // exposes namespace on data-i18next-options to be used in eg. locize-editor
        },

        // have a common namespace used around the full app
        ns: ['common'],
        defaultNS: 'common',

        debug: false,

        // cache: {
        //   enabled: true
        // },

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ',',
            format: (value, format, lng) => {
                if (format === 'uppercase') return value.toUpperCase();
                return value;
            }
        }
    });


export default i18n;
