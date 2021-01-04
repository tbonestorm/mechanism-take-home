/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import useAppJwt from '../../hooks/useAppJwt';
import { Button } from '@material-ui/core';

const LogoutButton = ({ className }) => {
  const { logout } = useAppJwt();
  return (
    <Button
      color="inherit"
      className={className}
      onClick={() =>
        logout()
      }
    >
      Log Out
    </Button>
  );
};

LogoutButton.propTypes = {
  className: PropTypes.string,
};

LogoutButton.defaultProps = {
  className: '',
};

export default LogoutButton;
