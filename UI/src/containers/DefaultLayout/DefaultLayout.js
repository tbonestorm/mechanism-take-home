import React from 'react';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import { makeStyles, Typography } from '@material-ui/core';
import styles from './DefaultLayout.module.css';

const iconStyles = makeStyles({
  root: {
    color: '#004aac',
    justifySelf: 'center',
  },
});

const DefaultLayout = () => {
  const useIconStyles = iconStyles();
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <ErrorOutlinedIcon
          fontSize="large"
          classes={{
            root: useIconStyles.root,
          }}
        />
        <Typography component="h1" variant="h5">
          Oops! It looks like something went wrong. Please try again.
        </Typography>
      </div>
    </div>
  );
};

export default DefaultLayout;
