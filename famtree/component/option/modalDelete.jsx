import { motion, AnimatePresence } from "framer-motion";
import React ,{useEffect , useState ,useRef } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Grid, CardContent, CardActionArea, CardMedia, Typography, List, ListItem, createStyles, 
    DialogContent, DialogActions, DialogContentText, Dialog, DialogTitle, Card, TextField, Link, Button, 
    TextareaAutosize } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import Image from 'next/image';
import { makeStyles , styled , useTheme } from '@mui/styles';
import csstyle from '../../src/styles/GlobalStyles.module.css';
import { useRouter } from "next/router";
import axios from 'axios';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import Switch from '@mui/material/Switch';
import dynamic from 'next/dynamic';





const dropIn ={
    hidden:{
        y:"-100vh",
        opacity:0,
    },
    visible:{
        y:"0",
        opacity:1,
        transition:{
            duration:1.5,
            type:"spring",
            damping:35,
            stiffness:100,
        },
    },
    exit:{
        y:"100vh",
        opacity:0,
        transition:{
            duration:1.5,
            type:"spring",
            damping:35,
            stiffness:100,
        },
    },
};


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



  export default function ModalDelete({ handleClose, pks, gen, nme }) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorhand, setErrorhand] = useState('');
  
    const handleDelete = async () => {
      try {
        setLoading(true);
        console.log("gender " + gen);
        console.log("pk " + pks);
        const endpoint = gen === 'Male' ? 'bdelete' : 'gdelete';
  
        const token = localStorage.getItem('accessToken');
  
        const response = await axios.delete(`http://127.0.0.1:8000/media/${endpoint}/${pks}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log(response.data);
        setOpen(true);
  
        setTimeout(() => {
          handleClose();
          router.push('/home/tree');
        }, 7000);
      } catch (error) {
        setOpen(true);
        console.error(error);
        console.error(error.data);
        setErrorhand(error.message); // Set the error message
        console.log(errorhand);
      } finally {
        setLoading(false);
      }
    };
  
    const handleSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

  return (
    <>
        <motion.Box
            my={3}
            sx={{overflow:"hidden",maxHeight:'100vh'}}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClick={(e)=> e.stopPropagation()}>
                <Box className={csstyle.modsfoots}>
                    <DialogTitle id="alert-dialog-title" sx={{color:'red'}}>
                        {"Are you sure you want to delete the record for "}<b>{nme}</b>{" ?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{color:'dark'}}>
                        <b>Note:</b> Once deleted data or records cannot be restored.
                        Please ensure you are certain of your actions before deleting any data.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color="info">Cancel</Button>
                        <Button onClick={handleDelete} variant="outlined" color="error" autoFocus>{loading ? 'Deleting...' : 'Agree'}</Button>
                    </DialogActions>
                </Box>
        </motion.Box>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbar}>
          <Alert onClose={handleSnackbar} severity="error" sx={{ width: '100%' }}>
            {errorhand || `${nme} Deleted, Wait a minutes page Loading....`}
          </Alert>
        </Snackbar>
    </>
  )
}
