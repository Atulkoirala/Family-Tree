import * as React from 'react';
import Image from 'next/image';
import { Box, Grid,CardContent ,CardActionArea,CardMedia, Typography, styled, List, ListItem, createStyles, Card, TextField, Link, Button, TextareaAutosize } from '@mui/material';
// import Backg from '../Media/bg.jpg'; 
import { makeStyles } from '@mui/styles';
import {motion , useScroll,AnimatePresence } from 'framer-motion'





const useStyles = makeStyles({
  txt: {
    marginTop:'3.5rem',
    fontSize:{
      xl:'5rem',lg:'4rem',md:'3rem',sm:'2rem',xs:'1rem'
    }
  },
  lnk:{
    justifyContent:'center',
    marginX:'auto',
    alignItems:'center',
    display:'flex',
    color:'red',
    fontWeight:'bolder',
  }
});


export default function Homepage() {
  const classes = useStyles();

  return (
    <>
      <Box overflow="hidden">
          {/* <Image width={1000} height={1000} className={classes.backgrod} src="/Media/bg.jpg"/> */}
          
          <Box mt={5} sx={{justifyContent: 'center', alignItems: 'center'}}>
            <Typography component={motion.h1} 
              sx={{
                fontSize:{
                  xl:'5rem',lg:'4rem',md:'3rem',sm:'2rem',xs:'1.5rem'
                },
                marginTop:'5rem',
                justifyContent:'center',
                textAlign:'center',
              }}
              >Hello </Typography>


            <Button size="large" sx={{
                marginX:'auto',
                display:'flex',
                color:'red',
                '& > a': {
                  textDecoration: 'none !important',
                },
              }}>
                <Link href="tree" className={classes.lnk}>Tree</Link>
              </Button>
          </Box>
      </Box>
    </>
  )
}