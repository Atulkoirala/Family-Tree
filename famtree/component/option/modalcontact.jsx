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


export default function ModalContact({handleClose}) {
    
    
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const ref = useRef(null);
    const { scrollXProgress } = useScroll({ container: ref });


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

    const post=[
        {id:1,Name:'Create'},
        {id:2,Name:'Update'},
        {id:3,Name:'View'},
        {id:4,Name:'Delete'},
    ]

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


                

                
            </motion.Box>

    </>
  )
}
