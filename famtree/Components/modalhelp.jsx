import React ,{useEffect , useState ,useRef } from 'react'
import { Tooltip , AppBar , usetheme , Tabpanel , Tab , Tabs , CardContent, Stack , CardActions , Box, Grid, Typography, styled, List ,ListItem ,createStyles, Card ,TextField,InputAdornment , Link , Button ,TextareaAutosize } from '@mui/material';
import {motion , useScroll, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import style from '../src/styles/globals.module.css';
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
                className={style.modsfoots}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e)=> e.stopPropagation()}
                >
                <Button size="small" onClick={handleClose} p={2} sx={{color:'black',border:'1px solid black',fontWeight:'bolder',backgroundColor:'crimson',borderRadius:'10px 10px 30px 30px',marginBottom:'1rem',position:'absolute',top:-7.3,justifyContent: 'center',display:'flex' }}>
                        <CancelIcon />
                </Button>

                <Box my={2} px={2} whileHover={{opacity:1}}>

                  <Box sx={{  background: 'rgba(255, 255, 255, 0.9)',height:'47vh',overflow:'hidden',width:'100%',borderRadius:'5%'}}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                    >
                {post.map((elem) => {
                  return (
                      <Tab label={elem.Name} key={elem.id} sx={{width:'25%',fontSize:{xl:'1rem',lg:'0.8rem',md:'0.77rem',sm:'0.66rem',xs:'0.55rem'}}}/>
                      )
                })}
                    </Tabs>

                    <SwipeableViews
                      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                {
                post.map((elem) => {
                  return (
                  <AnimatePresence initial={false} value={value} index={elem.id} key={elem.id} dir={theme.direction} sx={{overflow:'hidden'}} >
                    {/* <Box component={motion.img} whileHover={{opacity:'0.0'}} sx={{height:'100%',width:'fit-content',opacity:'0.29',position:'absolute',top:0,left:0,right:0,bottom:0,margin:'auto',justifyContent:'center',alignItems:'center',background: 'rgba(255, 255, 255, 0.9)'}} src={elem.img}></Box> */}
                    <Box sx={{margin:{xl:'7.7%',lg:'7.7%',md:'7%',sm:'7.7%',xs:'17%'}}}>
                      <Box>
                        <Typography variant='h5' sx={{ fontSize: {xl:'3rem',lg:'3.3rem',md:'2.7rem',sm:'2.2rem',xs:'1.7rem'} }} fontWeight='bold'>{elem.Name}</Typography>
                        <Typography variant='h5' sx={{ fontSize: {xl:'1.89rem',lg:'2rem',md:'1.7rem',sm:'1.5rem',xs:'1.1rem'} }} fontWeight='bold'>{elem.Name}</Typography>
                      </Box>
                      <Box p={1}>
                        <Typography variant='p' sx={{ fontSize: {xl:'1.25rem',lg:'1.1rem',md:'1rem',sm:'0.89rem',xs:'0.77rem'}}} >{elem.Name}</Typography><br></br>
                        <Typography variant='p' sx={{ fontSize: {xl:'1.25rem',lg:'1.1rem',md:'1rem',sm:'0.89rem',xs:'0.77rem'}}} >{elem.From} – {elem.Name}</Typography>
                      </Box>
                    </Box>
                      </AnimatePresence>
                      )
                    })
                }
                    </SwipeableViews>
                  </Box>
              </Box>

                
            </motion.Box>

    </>
  )
}
