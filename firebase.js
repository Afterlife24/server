const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');


// scanmeprod-productionFIRESTORE
// const firebaseConfig = {
//   apiKey: "AIzaSyBwMWR-QyG3LnkeOmI5_QBbI_FoL_skIHc",
//   authDomain: "scanmeprod.firebaseapp.com",
//   projectId: "scanmeprod",
//   storageBucket: "scanmeprod.appspot.com",
//   messagingSenderId: "3426314793",
//   appId: "1:3426314793:web:ec931d424b430196ae4a38",
//   measurementId: "G-K7TP3HFDM0"
// };


const firebaseConfig = {
    apiKey: "AIzaSyCQk1KdAXHzFevM5Atgtl57eHnTzQ12eYI",
    authDomain: "token-cab71.firebaseapp.com",
    projectId: "token-cab71",
    storageBucket: "token-cab71.appspot.com",
    messagingSenderId: "610364184109",
    appId: "1:610364184109:web:b118083d997124851dcaa4",
    measurementId: "G-T9J8H0WNSS"
  };



  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

module.exports = { db };