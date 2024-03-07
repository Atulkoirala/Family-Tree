import React, { useEffect, useRef, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import {Box,Grid,Toolbar,Tooltip,Card,TextField,Stack, Select, IconButton, Menu, MenuItem,MenuIcon,Typography,Input, Button, FormControl, InputLabel } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Search } from '@mui/icons-material';
import axios from 'axios'
import csstyle from '../../src/styles/GlobalStyles.module.css';
import { makeStyles , styled , useTheme } from '@mui/styles';
import {motion , useScroll,AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';




const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 1.5,
      type: "spring",
      damping: 35,
      stiffness: 100,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 1.5,
      type: "spring",
      damping: 35,
      stiffness: 100,
    },
  },
};


// const SearchBox = styled(TextField)(({ theme }) => ({

// }));

const useStyles = makeStyles({
  imag:{
    marginX: 'auto',borderRadius:'50%',
    justifyContent: 'center', alignItems: 'center', position: 'flex',
  },itemTxt:{
    fontSize: '1rem', textAlign: 'center', fontWeight: 'bolder',width:'100%',
    color:'white', justifyContent: 'center', alignItems: 'center',marginLeft:'0.1rem',marginRight:'0.1rem'
  },cardbg:{
    width: 155, height: 155, position: 'absolute',borderRadius: '2rem',border:'1.5px solid black', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'
  },lnk:{
    textDecoration:'none',
    fontWeight:'bold',
    cursor:'pointer',
  }
})

export default function ModalSearch({ handleClose }) {

  const classes = useStyles();
  const popupRef = useRef(null);
  const [query, setQuery] = useState('');
  const [post, setpost] = useState([]);
  const [load,setload] = useState([false]);



  
  React.useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const [boysResponse, girlsResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/media/boys/',{ headers: { Authorization: `Bearer ${token}`, }}),
          axios.get('http://127.0.0.1:8000/media/girls/',{headers: { Authorization: `Bearer ${token}`, }})
        ]);
  
        const combinedData = [...boysResponse.data, ...girlsResponse.data];
        combinedData.sort((a, b) => a.value - b.value); // Sort in ascending order based on value property
  
        setpost(combinedData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchMediaData();
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose();
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, handleClose]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  
  

  return (
    <>
      <motion.Box
          my={3}
          className={csstyle.modsfoot}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          ref={popupRef}
        >
          <Box py={2} px={1} sx={{ width: '50vw',height:'fit-content',backgroundColor:'gray',borderRadius:'10px 10px 10px 10px'}}>
          {/* <SearchBox
            label="Enter The Name"
            variant="outlined"
            sx={{ width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
              value: query,
              onChange: handleQueryChange,
            }}
          /> */}
            <TextField
              label="Enter The Name"
              variant="outlined"
              value={query}
              onChange={handleQueryChange}
              size="large"
              fullWidth 
              />



                <Stack direction="horizontal" sx={{overflow:'auto',width:'100%',height:'fit-content',display:'flex',flex:'none' }}>
                  {load ? (
                    <h4>Loading...</h4>
                  ) : (
                    post
                      .filter((result) => result.Name.toLowerCase() === query.toLowerCase())
                      .map((item) => {
                        const isfemale = (item.Gender === "Female");
                        const isdeath = (item.Status === "Death");
                        const isdiff = (item.Diffrent_Family === 'Yes');
                        const isdivorce = (item.Marrital_Status === 'Divorce');

                        const bcolf = isdeath ? 'linear-gradient(45deg, rgba(0,0,0,0.8428163501728816) 0%, rgba(255,0,227,0.9212477227219013) 100%)' : isdivorce ? 'linear-gradient(45deg, rgba(195,0,0,0.949258927203694) 13%, rgba(215,4,192,0.9016398795846463) 84%)' : isdiff ? 'linear-gradient(45deg, rgba(245,222,179,1) 22%, rgba(209,0,187,1) 100%)' : 'linear-gradient(50deg, rgba(103,51,101,0.9016398795846463) 25%, rgba(226,108,214,1) 100%)'
                        const bcolm = isdeath ? 'linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(54,190,255,1) 100%)' : isdivorce ? ' linear-gradient(40deg, rgba(178,3,3,0.9212477227219013) 25%, rgba(54,190,255,1) 100%)' : isdiff ? 'linear-gradient(45deg, rgba(245,222,179,1) 22%, rgba(71,196,255,1) 100%)' : ' linear-gradient(45deg, rgba(54,190,255,1) 0%, rgba(45,98,119,1) 57%)'

                        return (
                        <Link className={classes.lnk} href={isfemale ? `home/tree/girl/${item.id}` : `home/tree/boy/${item.id}`} passHref>
                          <Grid direction="horizontal" m={2} py={0.7} px={1.5} key={item.id} sx={{ backgroundColor: 'rgba(245, 222, 179, 0.5)', borderRadius: '20px',with:'100%',height:'fit-content',overflow:'auto',flex:'none' }}>
                            {/* <Box sx={{ justifyContent: 'center', textAlign: 'center', display: 'flex' }}>
                              <Typography mx={1} sx={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }}>Mom:{isfemale ? item.parent : item.moms }</Typography>
                              <Typography mx={2} sx={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }}>Dad:{isfemale ? item.dads : item.parent}</Typography>
                            </Box> */}

                            <Card component={motion.button} sx={{
                                width: 190,height: 190,borderRadius: '2rem',background: isfemale ? bcolf : bcolm,
                                position: 'relative',display: 'flex',justifyContent: 'center',alignItems: 'center',}}>
                              
                              <Typography  component={motion.p} p={1} sx={{ fontSize: '1rem',color: 'black',
                                  margin: 'auto', textAlign: 'center', fontWeight: 'bolder',padding: '1rem 1rem',
                                  justifyContent: 'center', alignItems: 'center',}}>{item.Name}
                              </Typography>

                              <Card component={motion.button} whileHover={{ opacity: '0' }}
                                sx={{width: 190, height: 190,position: 'absolute',top: 0,left: 0,
                                  bottom: 0,right: 0, display: 'flex',justifyContent: 'center',
                                  alignItems: 'center',background: isfemale ? bcolf : bcolm,
                                  borderRadius: '2rem',border: '1.5px solid black',}}>
                                
                                <Image width={180} height={180} src={item.image} className={classes.imag} alt="Profile Image" />
                              
                              </Card>
                            </Card>

                              <Typography sx={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }}>ID: {item.id}</Typography>
                          </Grid>
                        </Link>
                        );
                      })
                  )}
                </Stack>

          </Box>

          

      </motion.Box>
    </>
  )
}
