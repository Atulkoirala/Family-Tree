import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, IconButton, InputAdornment, List, TextField } from '@mui/material';
import { styled } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import { Search } from '@mui/icons-material';
import axios from 'axios'
import style from '../src/styles/globals.module.css';




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


const SearchBox = styled(TextField)(({ theme }) => ({

}));


export default function ModalSearch({ handleClose }) {

  const popupRef = useRef(null);
  const [query, setQuery] = useState('');
  const [post, setpost] = useState([]);
  const [load,setload] = useState([false]);



  
  const getBoys = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/media/boys/');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const getGirls = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/media/girls/');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const combineData = async () => {
    setload(true);
    const boys = await getBoys();
    setload(true);
    const girls = await getGirls();
    const combinedData = [...boys, ...girls];
    combinedData.sort((a, b) => a.value - b.value);
    setpost(combinedData);
    setload(false);
  };
  

useEffect(() => {
    combineData();
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
        className={style.modsfoot}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        ref={popupRef}
      >
        <Box sx={{ width: '100%' }}>
        <SearchBox
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
        />

        </Box>

        <Box>
        {
          load ?(<h4>Loading...</h4>):(
          (post.filter((result)=>{
              if((result.Name.toLowerCase() === query.toLowerCase())){
                  return result;
              }
          })
              .map(elem => 
                    <Box sx={{display:'flex'}} key={elem.id}>
                      <li>{elem.Name}</li>
                    </Box>

                      )))
          }
        </Box>

      </motion.Box>
    </>
  )
}
