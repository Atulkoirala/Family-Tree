import * as React from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import {Box,Grid,Toolbar,Tooltip, TextField, Select,Paper, IconButton, Menu,styled, MenuItem,MenuIcon,Divider,Typography,Input, Button, FormControl, InputLabel } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import csstyle from '../../../styles/GlobalStyles.module.css';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { makeStyles } from '@mui/styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {motion , useScroll, AnimatePresence } from 'framer-motion'
import withAuth from '../../withAuth';






const Layout = dynamic(() => import('../../../../component/Layout').then((mod) => mod.Layout));
const ModalChange = dynamic(() => import('../../../../component/option/modalchange'));
// sx={{,}}



const useStyles = makeStyles({
  });
  



const Index = ()=> {
    
    const classes = useStyles();
    const [post, setpost] = React.useState([]);
    const [postoken, setpostoken] = React.useState([]);


    const labels = ['First Name', 'Last Name', 'Username', 'Email', 'Role', 'Parent', 'Editor Token', 'Watcher Token'];
    const values = ['John', 'Doe', 'johndoe', 'johndoe@example.com', 'User', 'Parent Name', '0c3c10f3-ebbe-4db1-8c3f-0ee7bc759cf7', '40c218e9-c34f-4f6c-b62f-44b6d112bbde'];
    

    React.useEffect(() => {
      const fetchMediaData = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const res = await axios.get('http://127.0.0.1:8000/auth/usr/', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setpost(res.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchMediaData(); // Call the function to fetch the user data
    }, []);
    
    React.useEffect(() => {
      if (post && post.role === 'Manager') {
        const fetchTokenData = async () => {
          try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get('http://127.0.0.1:8000/auth/usr/token/', {
              headers: { Authorization: `Bearer ${token}` }
            });
            setpostoken(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchTokenData(); // Call the function to fetch the token data
      }
    }, [post]);
    
    console.log(post); // Access post data here
    console.log(post && post.id); // Access post id here (using optional chaining to avoid errors)
    


    const rows = [
      { id: 7, name: labels[0], Description: post.first_name },
      { id: 1, name: labels[1], Description: post.last_name },
      { id: 2, name: labels[2], Description: post.username },
      { id: 3, name: labels[3], Description: post.email },
      { id: 4, name: labels[4], Description: post.role },
      { id: 5, name: labels[5], Description: (post.role !== "Manager") ? post.parentName : "-" },
      { id: 6, name: labels[6], Description: (post.role !== "Manager") ? "Sorry Only Manager can have token" : postoken.token_ed },
      { id: 6, name: labels[7], Description: (post.role !== "Manager") ? "Sorry Only Manager can have token" : postoken.token_wa },
    ];

    const [modalchan, setModalchan] = React.useState(false);

    const handleClose = (setModal) => {
      setModal(false);
    };
  
    const handleOpen = (setModal) => {
      setModal(true);
    };

  return (
    <>
        <Box overflow="hidden" className={csstyle.body}>
            <Box sx={{height:'100vh',zIndex:'9',overflowY:'auto',overflowX:'hidden'}}>
                <Layout>
                    <Grid container>
                        <Grid item xs={12} xl={12} sx={{marginBottom:{xl:'23.5%',lg:'23.5%',md:'22%',sm:'24%',xs:'30%'}}}>
                            <Box sx={{ width: '100vw', position: 'relative'}}>
                                
                                <Image src="/covfam.jpg" width={50} height={50} layout="responsive" />
                                
                                <Typography component="h1" className={classes.txt} sx={{fontSize: {xl:'2.9rem',lg:'2.6rem',md:'2.1rem',sm:'1.79rem',xs:'1.4rem'},
                                    position: 'absolute',right: '50%', left: '50%', transform: 'translateX(-50%)',
                                    justifyContent:'center',textAlign:'center',width:'100%', fontWeight: 'bolder',top:'165%',
                                    background: 'linear-gradient(to right bottom, black , red)',
                                    // background: 'linear-gradient(to right bottom,#8F00FF, #FF0000)',
                                    // background: 'White',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontFamily: 'Roboto Mono, Lucida Console',
                                    }}>Family Details</Typography>
                                
                                <Box sx={{ position: 'absolute',right: '50%', left: '50%', transform: 'translateX(-50%)',
                                    width: '20%',top:'77%', borderRadius:'50%',overflow:'hidden',borderBottom:'3px solid white', borderLeft:'3px solid white', borderRight:'3px solid white'}}>
                                    <Image src="/pic.jpg" layout="responsive" className={classes.imgs} width={50} height={50} />
                                </Box>
                            </Box>
                        </Grid>



                        <Divider color="black" mb={3} sx={{ height: 2, width: '100vw' }} />

                        <Grid xs={12} sm={6} sx={{width:'100vw',margin:'auto',justifyContent: 'center',textAlign:'center',alignItems:'center'}}>

                                <TableContainer component={Paper} mt={3} sx={{maxWidth:'100vw',backgroundColor:'rgba(128, 128, 128, 0.37)'}}>
                                    <Table aria-label="customized table">
                                    <TableBody>
                                        {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell sx={{
                                                    [`&.${tableCellClasses.body}`]: {
                                                    fontSize: 20,
                                                    },justifyContent:'center',textAlign:'center',fontWeight:'bold', maxWidth: '200px',overflow:'hidden',border:'none'}} component="th" scope="row">
                                            {row.name}</TableCell>
                                            <TableCell sx={{
                                                    [`&.${tableCellClasses.body}`]: {
                                                    fontSize: 19,
                                                    },justifyContent:'center',textAlign:'center',overflowX:'auto', maxWidth: '200px',overflow:'auto',border:'none'}} align="right">{row.Description}</TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                    </Table>
                                </TableContainer>


                        </Grid>                           
                    </Grid>
                    
                    <Box py={4} sx={{ width:'100%',justifyContent:'center',textAlign:'center',margin:'auto',alignItems:'center'}}>
                        <Button variant="contained" color="info" size="medium"
                            sx={{marginRight:{xl:'3rem',lg:'2.5rem',md:'2rem',sm:'1.5rem',xs:'1rem'},
                                marginBottom:{xl:'0rem',lg:'0rem',md:'0rem',sm:'0rem',xs:'1.2rem'}}}>Update</Button>
                        <Button onClick={() => handleOpen(setModalchan)} variant="contained" color="secondary" size="medium"
                            sx={{marginRight:{xl:'3rem',lg:'2.5rem',md:'2rem',sm:'1.5rem',xs:'1rem'},
                                marginBottom:{xl:'0rem',lg:'0rem',md:'0rem',sm:'0rem',xs:'1.2rem'}}}>Change Password</Button>
                        {/* <Button variant="contained" color="secondary" size="medium"
                            sx={{marginRight:{xl:'3rem',lg:'2.5rem',md:'2rem',sm:'1.5rem',xs:'1rem'},
                                marginBottom:{xl:'0rem',lg:'0rem',md:'0rem',sm:'0rem',xs:'1.2rem'}}}>Reset Username</Button> */}
                        <Button variant="contained" color="error" size="medium"
                            sx={{marginRight:{xl:'3rem',lg:'2.5rem',md:'2rem',sm:'1.5rem',xs:'1rem'},
                                marginBottom:{xl:'0rem',lg:'0rem',md:'0rem',sm:'0rem',xs:'1.2rem'}}}>Delete</Button>
                    </Box>

                </Layout>
            </Box>
        </Box>

        <AnimatePresence>
            {modalchan && (
              <Box
                component={motion.div}
                initial={{ y: '-100vh', opacity: 0 }}
                animate={{ y: '0', opacity: 1, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
                exit={{ y: '-100vh', opacity: 0, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
                className={csstyle.popupfoot}
              >
                <ModalChange handleClose={() => handleClose(setModalchan)} />
              </Box>
            )}
        </AnimatePresence>
    </>
  )
}

export default withAuth(Index);