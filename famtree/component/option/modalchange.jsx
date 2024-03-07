import React ,{useEffect , useState ,useRef } from 'react'
import { Tooltip , AppBar , usetheme , Tabpanel , Tab , Tabs , CardContent, Stack , CardActions , Box, Grid, Typography, styled, List ,ListItem ,createStyles, Card ,TextField,InputAdornment , Link , Button ,TextareaAutosize } from '@mui/material';
import {motion , useScroll, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import csstyle from '../../src/styles/GlobalStyles.module.css';
import CancelIcon from '@mui/icons-material/Cancel';






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


export default function ModalHelp({handleClose}) {
    
    const [check,setcheck] = useState("");
    const [old,setold] = useState("");
    const [newp,setnewp] = useState("");



      const handleSubmit = (event) => {
        event.preventDefault();
    
        if(check === newp){
            const formData = new FormData();
            formData.append('current_password', old);
            formData.append('new_password', newp);
            const token = localStorage.getItem('accessToken');
             axios.post(`http://127.0.0.1:8000/auth/password_change/`, formData , { headers: { Authorization: `Bearer ${token}`, }})
            .then((response) => {
              console.log(response);
              router.push('/home/login');
            })
            .catch((error) => {
              console.log(error);
            });
        }
        else{
            alert("Password Does not Match");
        }
      };

  return (
    <>
            <motion.Box
                my={3}
                className={csstyle.modsfoots}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e)=> e.stopPropagation()}
                >
                <Button size="small" onClick={handleClose} p={2} sx={{color:'black',border:'1px solid black',fontWeight:'bolder',backgroundColor:'crimson',borderRadius:'10px 10px 30px 30px',marginBottom:'1rem',position:'absolute',top:-7.3,justifyContent: 'center',display:'flex' }}>
                        <CancelIcon />
                </Button>

                <Box>
                    <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                        <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            name="current_password"
                            label="Current Password"
                            type="password"
                            onChange={(e)=>{setold(e.target.value)}}
                            required
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            name="new_password"
                            label="New Password"
                            type="password"
                            onChange={(e)=>{setnewp(e.target.value)}}
                            required
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            name="Re_new_password"
                            label="Re New Password"
                            type="password"
                            onChange={(e)=>{setcheck(e.target.value)}}
                            required
                            fullWidth
                            />
                        </Grid>
                        </Grid>
                        
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" variant="contained" color="success" sx={{justifyContent:'center',textAlign:'center',alignItem:'center'}}>
                                Submit
                            </Button>
                            </Grid>
                    </form>
                </Box>

                
            </motion.Box>

    </>
  )
}
