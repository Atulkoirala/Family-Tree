import React ,{useEffect , useState ,useRef } from 'react'
import { Tooltip , AppBar , usetheme , Tabpanel , Tab ,Modal, Tabs , CardContent, Stack , CardActions , Box, Grid, Typography, styled, List ,ListItem ,createStyles, Card ,TextField,InputAdornment , Link , Button ,TextareaAutosize } from '@mui/material';
import {motion , useScroll, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import csstyle from '../../src/styles/GlobalStyles.module.css';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';




export default function NestedModal({handleCloses}) {

  const [emailid,setEmailid] = useState('');

  const handleSubmit = async () => {

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/password_reset/', {
        email: emailid,
      });
      // Password reset success, handle the response accordingly
    } catch (error) {
      console.log(error);
      // Password reset error, handle the error accordingly
    }
    }

  return (
    <motion.div
          my={3}
          className={csstyle.modsf}
          // variants={dropIn}
          // initial="hidden"
          // animate="visible"
          // exit="exit"
          onClick={(e)=> e.stopPropagation()}
          >
          <Button size="small" onClick={handleCloses} p={2} sx={{color:'black',border:'1px solid black',fontWeight:'bolder',backgroundColor:'crimson',borderRadius:'10px 10px 30px 30px',position:'absolute',justifyContent: 'center',display:'flex' }}>
                  <CancelIcon />
          </Button>
          
          <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                        
                        <Typography component='h1' mt={5} mb={2} sx={{marginX:'auto',justifyContent:'center',textAlign:'center',fontweight:'550',color:'black',width:'100%',display:'block',fontSize:'1.1rem'}}>Enter your email to reset your password.</Typography>
    
                          <Box mb={5} mx={2} sx={{display:'flex',width: '90%',margin:'auto'}}>
                              
                              <TextField
                                name="email"
                                label="Email"
                                onChange={(e)=>setEmailid(e.target.value)}
                                type="email"
                                size="large"
                                sx={{width:'100%',height:'50%'}}
                                required
                                fullWidth
                                />
                              <Button type="submit" size="small" color="error" sx={{width:'15%',margin:'auto',height:'50%',justifyContent:'center',textAlign:'center',alignItem:'center'}}>
                                  <ArrowForwardTwoToneIcon sx={{color:'black',fontWeight:'bolder'}}/>
                              </Button>
                          </Box>
    
                        <Typography component='h1' mt={3} mb={2} sx={{marginX:'auto',justifyContent:'center',textAlign:'center',fontweight:'550',color:'black',width:'100%',display:'block',fontSize:'1rem'}}>After this check your email for your new Password.</Typography>
    
                  </form>
    </motion.div>
  );
}