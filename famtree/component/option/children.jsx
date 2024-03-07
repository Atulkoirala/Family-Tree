import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Grid, CardContent, CardActionArea, CardMedia, Typography, List, ListItem, createStyles, Card, TextField, Link, Button, TextareaAutosize } from '@mui/material';
import Image from 'next/image';
import { makeStyles, styled, useTheme } from '@mui/styles';
import csstyle from '../../src/styles/GlobalStyles.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import { useRouter } from "next/router";
import axios from 'axios';







export default function Children({ pks, gen, col}) {

  const [person, setperson] = useState([]);

  useEffect(() => {
    async function fetchPerson() {
      try {
        const token = localStorage.getItem('accessToken');
        const endpoint = gen === "Male" ? "b" : "g";
        const response = await axios.get(
          `http://127.0.0.1:8000/media/${endpoint}/${pks}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setperson(response.data);
      } catch (error) {
        console.error(error);
        // Handle the error here (e.g., show an error message)
      }
    }
  
    fetchPerson();
  }, [pks, gen]);
  

  console.log("id "+pks);
  console.log("Gender "+gen);

  return (
    <>
      {person.map((ele) => {
        const isdiff = (ele.dif === "No");
        if ((isdiff) && (!pks)) {
          return (
           <Typography component="p" sx={{width:'fit-content',backgroundColor: col,border:'1px solid black',borderRadius:'50%'}} p={1} mr={1} key={ele.id}>{ele.Name}</Typography>
          )
        } else {
          return (
            null
          )
        }
      })}
    </>
  )
}
