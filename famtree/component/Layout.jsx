import Head from 'next/head'
import React from 'react'
import dynamic from 'next/dynamic'
import { Box, Grid, Button } from '@mui/material';
// import Navbar from './Navbar';


const Navbar = dynamic(() => import("./Navbar"));
const Footer = dynamic(() => import("./Footer"));

export const Layout = ({ children, title }) => {

  return (
    <>
      <Box>
        <Navbar/>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico"></link>
        </Head>
        {children}
      </Box>
      {/* <Footer/> */}
    </>
  )
}
