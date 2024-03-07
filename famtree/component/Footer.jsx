import React, { useState } from 'react';
import { Box, Grid, Button,AppBar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import csstyle from '../src/styles/GlobalStyles.module.css';

import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HubIcon from '@mui/icons-material/Hub';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import  withAuth  from '../src/pages/withAuth';



const ModalHelp = dynamic(() => import('./Option/modalhelp'));
const ModalSearch = dynamic(() => import('./Option/modalsearch'));
const ModalAdd = dynamic(() => import('./Option/modaladd'));
const ModalContact = dynamic(() => import('./Option/modalcontact'));



const Footer = () => {
  const [modalcon, setModalcon] = useState(false);
  const [modalsrc, setModalsrc] = useState(false);
  const [modaladd, setModaladd] = useState(false);

  const handleClose = (setModal) => {
    setModal(false);
  };

  const handleOpen = (setModal) => {
    setModal(true);
  };

  return (
    <>
      <Box
        bottom={-10}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.87)',
          position: 'fixed',
          width: '100%',
          display: 'flex',
        }}
      >
        <Grid container justifyContent="space-between" sx={{ width: '100%' }}>
          <Grid item xs={2} sx={{ justifyContent: 'center', display: 'flex' }}>
            <Button
              onClick={() => handleOpen(setModalcon)}
              sx={{
                backgroundColor: 'inherit',
                borderRadius: '40px',
              }}
            >
              <ArrowCircleUpTwoToneIcon
                sx={{
                  fontSize: '3rem',
                  color: 'red',
                }}
              />
            </Button>
          </Grid>

          <Grid item xs={2} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Button
              onClick={() => handleOpen(setModalsrc)}
              sx={{ backgroundColor: 'inherit', display: 'absolute', bottom: 30 }}
            >
              <SearchIcon
                sx={{
                  backgroundColor: 'white',
                  borderTop: '2px solid black',
                  borderLeft: '2px solid black',
                  borderRight: '2px solid black',
                  borderRadius: '50%',
                  fontSize: { xl: '5rem', lg: '4rem', md: '4rem', sm: '3rem', xs: '3rem' },
                  display: 'absolute',
                  bottom: 15,
                  backgroundColor:'green',
                  color: 'black',
                  padding: '3px 5px',
                }}
              />
            </Button>
          </Grid>

          <Grid item xs={1.5} sx={{ justifyContent: 'center', display: 'flex' }}>
            <Button
              onClick={() => handleOpen(setModaladd)}
              sx={{
                backgroundColor: 'transparent',
                right: 10,
                borderRadius: '40px',
              }}
            >
              <AddCircleIcon
                sx={{
                  fontSize: '3rem',
                  color: 'red',
                }}
              />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <AnimatePresence>
        {modalcon && (
          <Box
            component={motion.div}
            initial={{ y: '-100vh', opacity: 0 }}
            animate={{ y: '0', opacity: 1, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
            exit={{ y: '100vh', opacity: 0, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
            className={csstyle.popupfoot}
          >
            <ModalContact handleClose={() => handleClose(setModalcon)} />
          </Box>
        )}


        {modalsrc && (
          <Box
            component={motion.div}
            initial={{ y: '-100vh', opacity: 0 }}
            animate={{ y: '0', opacity: 1, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
            exit={{ y: '100vh', opacity: 0, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
            className={csstyle.popupfoot}
          >
            <ModalSearch handleClose={() => handleClose(setModalsrc)} />
          </Box>
        )}

        {modaladd && (
          <Box
            component={motion.div}
            initial={{ y: '-100vh', opacity: 0 }}
            animate={{ y: '0', opacity: 1, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
            exit={{ y: '100vh', opacity: 0, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
            className={csstyle.popupfoot}
          >
            <ModalAdd handleClose={() => handleClose(setModaladd)}/>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}

export default withAuth(Footer);