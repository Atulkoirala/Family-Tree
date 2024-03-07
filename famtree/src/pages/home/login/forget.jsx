import React ,{useEffect , useState ,useRef } from 'react'
import { Tooltip , AppBar , usetheme , Tabpanel , Tab ,Modal, Tabs , CardContent, Stack , CardActions , Box, Grid, Typography, styled, List ,ListItem ,createStyles, Card ,TextField,InputAdornment , Link , Button ,TextareaAutosize } from '@mui/material';
import {motion , useScroll, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import csstyle from '../../../styles/GlobalStyles.module.css';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import { useRouter} from 'next/router'
import dynamic from 'next/dynamic';
import withAuthentication from "../../withAuthentication";






const Layout = dynamic(()=>import('../../../../component/Layout').then((mod) => mod.Layout));

const Forget = ({id,tok})=> {

    const router = useRouter();
    const [password,setPassword] = useState('');
    const [repass,setrepass] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async () => {
      if(password === repass){

        const formData = new FormData();
        formData.append('group', id);
        formData.append('token', tok);
        formData.append('password', password);
  
         axios.post(`http://127.0.0.1:8000/auth/reset/${id}/${tok}/`, formData)
        .then((response) => {
          console.log(response);
          router.push('/home/login');
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      } else {
        setError('Passwords do not match');
      }
    };

  return (
    <Box className={csstyle.bodylogin}>
      <Layout>
        <Box sx={{
            width:{xl:'35%',lg:'50%',md:'50%',sm:'50%',xs:'83%'},
            top:'7%',bottom:'0',left:'0%',right:'0%',
            justifyContent:'center',textAlign:'center',alignItems:'center',position:'absolute',
            backgroundColor:'rgba(232, 217, 100, 0.357)',margin:'auto',
            border:'1px solid black',borderRadius:'15px 15px 15px 15px',height:'fit-content',
            boxShadow:'0px 0px 10px #81007c',overflowY:'auto',maxHeight: 'calc(100vh - 120px)',}}>
                    <Typography component='h1'
                        sx={{justifyContent:'center',textAlign:'center',fontSize:'2rem',fontWeight:'bold',color:'black'}}
                        >Reset Password</Typography>


            <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                
            <Typography component='h1' mt={5} mb={2} sx={{fontweight:'550',color:'black',width:'100%',display:'block',fontSize:'1.3rem'}}>Make your password much stronger.</Typography>
                      
                      <Box mb={5} mx={3} sx={{display:'flex',width: '100%',margin:'auto'}}>
                        <Grid container mx={2}>
                          <Grid item sx={12} xs={12}>
                            <TextField
                                label="New Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                size="large"
                                sx={{width:'100%'}}
                                required
                                fullWidth
                                />
                          </Grid>
                          <Grid item sm={12} my={2} xs={12}>
                            <TextField
                                value={repass}
                                onChange={(e) => setrepass(e.target.value)}
                                label="Confirm Password"
                                type="password"
                                size="large"
                                sx={{width:'100%'}}
                                required
                                fullWidth
                                />
                          </Grid>
                          <Grid item sm={12} xs={12} mb={2} sx={{justifyContent:'center',textAlign:'center',alignItem:'center'}}>
                            <Button type="submit" size="medium" variant="contained" color="success" sx={{justifyContent:'center',textAlign:'center',alignItem:'center'}}>
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
            </form>
        </Box>
      </Layout>
    </Box>
  );
}

export default withAuthentication(Forget);