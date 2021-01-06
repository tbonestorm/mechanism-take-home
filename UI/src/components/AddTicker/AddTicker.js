import { Button, Fade, makeStyles, Modal, TextField } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';
import { useForm } from "react-hook-form";
import React from 'react';
import useAppJwt from '../../hooks/useAppJwt';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: '#fff',
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const AddTicker = ({ open, handleClose, children }) => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const { appToken } = useAppJwt();

    const onSubmit = (data) => {
      axios.post(process.env.REACT_APP_PORFOLIO_SERVICE,  {
        units: data["units"],
        ticker: data["ticker"],
        valueOnAquired: data["purchaseValue"],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${appToken}`,
        },
      }).then(() => {
        handleClose(true);
      });
    };

    return (
        <Modal
        open={open}
        className={classes.modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Add a stock</h2>
            <TextField inputRef={register({ required: true})} label="Ticker Symbol" name="ticker" />
            <TextField inputRef={register({ required: true})} label="Number of Stocks" name="units" />
            <TextField inputRef={register({ required: true})} label="Purchase value" name="purchaseValue" />
            <Button onClick={handleSubmit(onSubmit)}>Save</Button>
          </div>
        </Fade>
      </Modal>)
};

export default AddTicker;
