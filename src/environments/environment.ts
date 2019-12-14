// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: 'http://localhost:3000/api',
  firebaseConfig: {
    apiKey: 'AIzaSyDAuLJOalzdqtTFPPoQeNAVno7MESkRZAA',
    authDomain: 'dev-comconnect.firebaseapp.com',
    databaseURL: 'https://dev-comconnect.firebaseio.com',
    projectId: 'dev-comconnect',
    storageBucket: 'dev-comconnect.appspot.com',
    messagingSenderId: '1084192924358',
    appId: '1:1084192924358:web:6792653d3224d38b332dc7',
    measurementId: 'G-81HW83LHW1'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
