/* eslint-disable global-require */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
/*
  Section Context will be used in order to keep track of which section is active, which step is selected and how many steps
  there are.
*/

const JwtContext = createContext({
  appToken: '',
  setAppToken: () => {},
});

const JwtProvider = ({ children }) => {
  const [appToken, setAppToken] = useState('');
  return (
    <JwtContext.Provider
      value={{appToken, setAppToken}}
    >
      {children}
    </JwtContext.Provider>
  );
};

JwtProvider.propTypes = {
  children: PropTypes.object,
};

JwtProvider.defaultProps = {
  children: {},
};

export { JwtProvider };

export default JwtContext;
