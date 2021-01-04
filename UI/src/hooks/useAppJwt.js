import { useContext, useState } from 'react';
import JwtContext from '../providers/JwtContext';
import _ from 'lodash';
import firebase from "firebase/app";

const useAppJwt = () => {
  const { appToken, setAppToken } = useContext(JwtContext);
  const [user, setUser] = useState({});

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUser(user);
      user.getIdToken().then((token) => {
        setAppToken(token);
      });
    }
    if (!user) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
      firebase.auth()
       .signInWithPopup(provider).then(function(result) {
          setAppToken(firebase.auth().currentUser.getIdToken());
       }).catch(function(error) {
       });
      });
    }
  });

  function isAuthenticated() {
    return !_.isUndefined(firebase.auth().currentUser);
  };

  function logout() {
    setAppToken('');
    firebase.auth().signOut();
  }

  return {
    appToken,
    isAuthenticated,
    logout,
    user,
  };
};

export default useAppJwt;
