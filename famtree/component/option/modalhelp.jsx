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

                <Box my={2} px={2} whileHover={{opacity:1}}>

                  <Box sx={{ height:'47vh',overflow:'hidden',width:'100%',borderRadius:'5%',fontWeight:'bold'}}>
                    <Tabs
                      value={value}
                      sx={{width:'95%'}}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                    >
                {post.map((elem) => {
                  return (
                      <Tab label={elem.Name} key={elem.id} sx={{width:{xl:'25%',lg:'25%',md:'25%',sm:'25%',xs:'15%'},overflowX:'auto',fontSize:{xl:'1rem',lg:'0.9rem',md:'0.8rem',sm:'0.7rem',xs:'0.68rem'},fontWeight:'bolder'}}/>
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
                    <Box sx={{marginTop:'0.7rem', justifyContent:'center',textAlign:'center',alignItems:'center'
                          }}>
                        <Typography variant='h5' sx={{ fontSize: {xl:'3rem',lg:'3.3rem',md:'2.7rem',sm:'2.2rem',xs:'1.7rem'} }} fontWeight='bold'>{elem.Name}</Typography>

                      <Box p={1} sx={{overflow:'auto',maxHeight: 'calc(75vh - 200px)'}}>
                        <Typography variant='p' sx={{ fontSize: {xl:'1.25rem',lg:'1.1rem',md:'1rem',sm:'0.89rem',xs:'0.77rem'}}}>
                        
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus semper lacinia. Proin in tellus mi. Nulla quis tempor sem, id varius turpis. Suspendisse sed interdum magna, vel efficitur ligula. Curabitur auctor elit at ante sodales convallis. Nam aliquam ligula sed arcu lobortis tempus. Donec dictum lorem ac ligula aliquam, vitae dapibus velit efficitur. Integer commodo ligula sit amet turpis blandit dignissim. In vel rutrum mauris.

Sed fringilla neque in dapibus euismod. Vivamus consequat lectus id nulla pharetra, eget maximus lacus vulputate. Maecenas ultrices eros sit amet erat elementum malesuada. Phasellus pharetra lacinia sem, in cursus lectus facilisis eu. Nulla facilisi. Integer tristique ex eu nisl pharetra, nec pulvinar nisi tristique. Suspendisse sit amet nulla et sem maximus fringilla. Quisque a dui sed neque congue tincidunt sed sed purus.

Praesent auctor pharetra massa id fermentum. Nulla consectetur congue arcu, id dapibus risus malesuada at. Nulla hendrerit enim sit amet eleifend cursus. Nulla facilisi. Curabitur pellentesque dapibus velit, eget placerat leo pulvinar vitae. Etiam non sapien tortor. Ut iaculis dui at ullamcorper mattis. Fusce euismod lacinia risus, id congue arcu aliquam sed. Integer congue tellus ligula, nec pharetra ligula auctor at.

Cras eu fringilla felis. Integer consectetur ipsum in metus bibendum finibus. Ut iaculis massa vitae orci congue, sit amet sollicitudin velit aliquam. Fusce auctor, dolor nec tristique feugiat, purus leo convallis turpis, id faucibus odio arcu vitae lectus. Suspendisse non massa orci. Proin aliquam purus sem, ac venenatis metus ultrices at. Vestibulum non facilisis ante, a posuere tellus. Aliquam id felis felis. Maecenas tincidunt efficitur lectus, ac sagittis mauris rutrum eget. Nullam tincidunt ante vitae ligula pellentesque, ac iaculis justo tempor. Integer iaculis arcu nec risus iaculis aliquet. Suspendisse potenti. In hac habitasse platea dictumst. Sed at neque eros.

Sed fermentum nisi vitae mi posuere, id maximus tellus imperdiet. Sed a mi vitae urna ultricies consectetur eu ac eros. Nulla nec luctus tortor. Fusce tristique a ex sit amet rhoncus. Aliquam erat volutpat. Phasellus feugiat libero sed nunc iaculis dapibus. Vivamus sollicitudin mauris non magna convallis venenatis. Curabitur quis nulla non velit bibendum fringilla. Sed mattis dolor et arcu vulputate consectetur. Aenean auctor bibendum mi in commodo. Donec vel fringilla elit. Cras consequat leo in iaculis porta. Integer vel risus sit amet justo sagittis consectetur. Donec pulvinar facilisis felis, a efficitur nisi dignissim vel.
                        
                        </Typography><br></br>
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
