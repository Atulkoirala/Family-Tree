import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import {AuthContext} from '../../../../component/option/AuthContext';
import  withAuth  from '../../withAuth';





const Hi = () => {

  const { check } = useContext(AuthContext);

  return (
    <Box sx={{ background: 'black', height: '100vh' }}>
      <h1 style={{ color: 'red' }}>Hello World</h1>
    </Box>
  );
}


export default withAuth(Hi);