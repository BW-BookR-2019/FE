import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../actions';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'rgba(201, 148, 141, 0.9)',
    border: '2px solid #a34134',
    // boxShadow: theme.shadows[5],
    padding: '50px',
    color: '#013533',
    borderRadius: '10px',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
    },
  button: {
    border: 'none',
    color: 'white',
    padding: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 15px',
    width: '100px',
    borderRadius: '50px',
    backgroundColor: '#cf4e28',
  }
}));

export default function DeleteModal(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Delete Book
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Are you sure you want to delete this book?</h2>
            <div>
              <button className={classes.button} onClick={() => dispatch(deleteBook(props.id, props.history))}>Yes</button>
              <button className={classes.button} onClick={handleClose}>No</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}