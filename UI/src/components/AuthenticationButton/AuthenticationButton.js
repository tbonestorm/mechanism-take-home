import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Popper from '@material-ui/core/Popper';
import { Divider } from '@material-ui/core';
import styles from './AuthenticationButton.module.css';
import LogoutButton from '../LogoutButton/LogoutButton';
import useAppJwt from '../../hooks/useAppJwt';

/*
  Shows either login text button to allow a user to login, or a popper which will allow the user to log out or direct
  to settings.
*/
const AuthenticationButton = ({ className }) => {
  const { isAuthenticated, user } = useAppJwt();
  const [anchorEl, setAnchorEl] = useState(null);
  let userName;
  let userPicture;
  let userEmail = '';

  if (isAuthenticated && !_.isEmpty(user)) {
    const { displayName, photoURL, email } = user;
    userName = displayName;
    userPicture = photoURL;
    userEmail = email;
  }

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event && event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClickAway = (event) => {
    if (!anchorEl.contains(event.target)) {
      handleClick();
    }
  };

  const combinedStyles = [className, styles.Container].join(' ');
  const buttonToShow = 
    <div className={styles.Container}>
      <Avatar alt={userName} src={userPicture} onClick={handleClick} />
      <ClickAwayListener onClickAway={handleClickAway}>
        <Popper open={open} anchorEl={anchorEl} className={styles.Popper}>
          <h2>My Account</h2>
          <div className={styles.PopperContent}>
            <Avatar
              alt={userName}
              src={userPicture}
              className={styles.PopperAvatar}
            />
          </div>
          <h2>{userName}</h2>
          <h3>{userEmail}</h3>
          <Divider className={styles.Divider} />
          <LogoutButton />
        </Popper>
      </ClickAwayListener>
    </div>;

  return (
    <div className={combinedStyles}>
      <span className={styles.UserName}>{userName}</span>
      {buttonToShow}
    </div>
  );
};

AuthenticationButton.propTypes = {
  className: PropTypes.string,
};

AuthenticationButton.defaultProps = {
  className: '',
};

export default AuthenticationButton;
