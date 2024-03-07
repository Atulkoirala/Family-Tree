import React ,{useEffect , useState ,useRef,useContext } from 'react'
import { Tooltip , AppBar , usetheme , Tabpanel , Tab ,Modal, Tabs , CardContent, Stack , CardActions , Box, Grid, Typography, styled, List ,ListItem ,createStyles, Card ,TextField,InputAdornment , Link , Button ,TextareaAutosize } from '@mui/material';
import {motion , useScroll, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic';
import {AuthContext} from '../../../../component/option/AuthContext';
import { useRouter } from 'next/router';


// const Layout = dynamic(() => import("../../../component/Layout").then((mod) => mod.Layout));


export default function NestedModal() {
  const router = useRouter();

  React.useEffect(()=>{
    const auth = localStorage.getItem('accessToken');
    if(!auth){
      router.push('/');
    }
  },[]);


  return (
    <>
      Content Page
    </>
  );
}

// let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
// let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)