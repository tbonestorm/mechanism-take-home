import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import styles from './App.module.css';
import Layout from './containers/Layout/Layout';
import AppTheme from './AppTheme';

import firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { JwtProvider } from './providers/JwtContext';

const firebaseConfig = {
  apiKey: "AIzaSyBTnrA33TyTLWO27JDDdXosehvtePkVn3Q",
  authDomain: "mechanism-take-home.firebaseapp.com",
  databaseURL: "https://mechanism-take-home-default-rtdb.firebaseio.com",
  projectId: "mechanism-take-home",
  storageBucket: "mechanism-take-home.appspot.com",
  messagingSenderId: "30902637951",
  appId: "1:30902637951:web:162947e453ca5d8473b64a",
  measurementId: "G-C9966137X7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App() {
  return (
        <div className={styles.App}>
              <ThemeProvider theme={AppTheme}>
                <JwtProvider>
                  <Layout />
                </JwtProvider>
              </ThemeProvider>
        </div>
  );
}

export default App;
