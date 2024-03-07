import { useRouter } from 'next/router';
import * as React from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import {Box,Grid,Toolbar,Tooltip, TextField, Select, IconButton, Menu, MenuItem,MenuIcon,Typography,Input, Button, FormControl, InputLabel } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import csstyle from '../../../../styles/GlobalStyles.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { makeStyles , styled , useTheme } from '@mui/styles';
import {motion , useScroll,AnimatePresence } from 'framer-motion'
import withAuth from '../../../withAuth';




const Layout = dynamic(() => import('../../../../../component/Layout').then((mod) => mod.Layout));
const Children = dynamic(()=> import('../../../../../component/option/children'));
const ModalDelete = dynamic(() => import('../../../../../component/option/modalDelete'));

const useStyles = makeStyles({
  imag:{
    marginX: 'auto',borderRadius:'50%',
    justifyContent: 'center', alignItems: 'center', position: 'flex',
  },itemTxt:{
    fontSize: '1rem', textAlign: 'center', fontWeight: 'bolder',width:'100%',
    color:'white', justifyContent: 'center', alignItems: 'center',marginLeft:'0.1rem',marginRight:'0.1rem'
  },cardbg:{
    width: 155, height: 155, position: 'absolute',borderRadius: '2rem',border:'1.5px solid black', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'
  }
})

export default withAuth(function TreeGirl({ treeid }) {

  const router = useRouter();
  const classes = useStyles();
  const [modaldel,setModaldel] = React.useState(false);
  const [post, setpost] = React.useState([]);

  const updateClick = ()=>{
    router.push('/home/tree/girl/update/'+treeid);
  }

  const handleClose = (setModal) => {
    setModal(false);
  };

  const handleOpen = (setModal) => {
    setModal(true);
  };

  React.useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(`http://127.0.0.1:8000/media/girl/${treeid}/`, { headers: { Authorization: `Bearer ${token}`, }});
        setpost(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchMediaData();
  }, []);

  const rows=[
    {id:1 , name : 'ids' , Description: post.ids },
    {id:2 , name : 'value' , Description: post.value },
    {id:3 , name : 'Name' , Description: post.Name },
    {id:4 , name : 'SurName' , Description: post.SurName },
    {id:5 , name : 'Gender' , Description: post.Gender },
    {id:6 , name : 'Is she Diffrent Family?' , Description: post.Diffrent_Family },
    {id:7 , name : 'Born Place' , Description: post.Born_Place },
    {id:8 , name : 'Date Of Birth' , Description: post.Date_Of_Birth },
    {id:9 , name : 'How is she ?' , Description: post.Status },
    ...(post.Status === 'Death'
    ? [{ id: 10, name: 'Date Of Death', Description: post.Date_Of_Death }]
    : []),
    { id: 11, name: 'Father', Description: post.Father ?? 'null' },
    { id: 12, name: 'Mother', Description: post.pname ?? 'null' },
    {id:13 , name : 'Marrital Status' , Description: post.Marrital_Status },
    ...(post.Marrital_Status === 'Married'
    ? [{ id: 14, name: 'Spouse', Description: post.Husband.length > 1 ? post.Husband.join(" , ") : post.Husband }]
    : []),
    ...(post.Marrital_Status === 'Married'
    ? [{
      id: 15,
      name: 'Children',
      Description: (
        <Box sx={{display:'flex',justifyContent:'center',textAlign:'center',alignItems:'center'}}>
          <Children pks={post.id} gen={post.Gender} col="pink" />
          {post.spous !== null && Array.isArray(post.spous) && post.spous.length > 1 ? (
            post.spous.map((spouse, index) => (
              <Children key={index} pks={spouse} gen="Male" col="skyblue" />
            ))
          ) : (
            <Children pks={post.spous} gen="Male" col="skyblue" />
          )}
        </Box>
      ),
    }]
    : []),
  ]

  return (
    <>
      <Box className={csstyle.body}>
        <Layout>
              <Grid container sx={{overflowY: 'auto', height: '90vh' }}>
                <Grid item xs={12} p={1}>
                  <Grid container sx={{overflowX:'auto'}}>
                    <Grid item xs={7} sm={5} my={1} mx={2} display="block">
                        <Box component={Button} href="/home/tree" mr={3} ml={1} py={1} sx={{borderRadius:'50%',background:'black',width:'fit-content',height:'fit-content'}}>
                          <KeyboardBackspaceTwoToneIcon href="/home/tree" sx={{fontSize:'2.3rem',fontWeight:'bolder',color:'red',curosr:'pointer'}}/>
                        </Box>
                        <Box sx={{border:'1rem solid #FF1493',margin:'auto',borderRadius:'50%',width:'fit-content',justifyContent:'center',alignItems:'center',textAlign:'center',background:'#FF1493'}}>
                          <Image src={post.image} className={classes.imag} alt="Profile" width={220} height={220} style={{ borderRadius: '50%' }}/>
                        </Box>
                    </Grid>
                    <Grid item xs={7} sm={5} p={1} pb={2.7} sx={{margin:'auto',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                      <Button onClick={updateClick} variant="contained" color="info" size="medium" 
                        sx={{marginRight:{xl:'2.2rem',lg:'1.8rem',md:'1.5rem',sm:'1.3rem',xs:'1rem'},
                            marginBottom:{xl:'0rem',lg:'0rem',md:'0rem',sm:'0rem',xs:'1.2rem'}}}>Update</Button>
                      <Button onClick={() => handleOpen(setModaldel)} variant="contained" color="error" size="medium"
                        sx={{marginRight:{xl:'1rem',lg:'1rem',md:'1rem',sm:'1rem',xs:'1rem'},
                            marginBottom:{xl:'0rem',lg:'0rem',md:'0rem',sm:'0rem',xs:'1.2rem'}}}>Delete</Button>
                    </Grid>
                  </Grid>

                </Grid>
                <Grid item xs={12} mb={2}>
                  <TableContainer component={Paper} sx={{maxWidth:'100vw'}}>
                    <Table sx={{}} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{
                                  [`&.${tableCellClasses.head}`]: {
                                      backgroundColor: 'black',
                                      color: 'white',fontSize: 22,
                                    },justifyContent:'center',textAlign:'center',fontWeight:'bolder',fontFamily:'monospace'}}>Name</TableCell>
                          
                          <TableCell sx={{
                                  [`&.${tableCellClasses.head}`]: {
                                      backgroundColor: 'black',
                                      color: 'white',fontSize: 22,
                                    },justifyContent:'center',textAlign:'center',fontWeight:'bolder',fontFamily:'monospace'}}>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name} sx={{
                            '&:nth-of-type(odd)': {
                              background: 'linear-gradient(rgba(128, 128, 128, 0.7),rgba(255, 105, 180, 0.7) )',
                            },
                            '&:nth-of-type(even)': {
                              background: 'linear-gradient(rgba(204, 0, 0, 0.7),rgba(255, 140, 0, 0.7))',
                            },
                            // hide last border
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            }
                          }}>
                            <TableCell sx={{
                                    [`&.${tableCellClasses.body}`]: {
                                      fontSize: 16,
                                    },justifyContent:'center',textAlign:'center',fontWeight:'bold', maxWidth: '200px',overflowX:'auto',}} component="th" scope="row">
                              {row.name}</TableCell>

                            <TableCell sx={{
                                    [`&.${tableCellClasses.body}`]: {
                                      fontSize: 15,
                                    },justifyContent:'center',textAlign:'center',overflowX:'auto',fontWeight:'550',}} align="right">{row.Description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              
        </Layout>
      </Box>
      
      <AnimatePresence>
        {modaldel && (
          <Box
            component={motion.div}
            initial={{ y: '-100vh', opacity: 0 }}
            animate={{ y: '0', opacity: 1, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
            exit={{ y: '100vh', opacity: 0, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
            className={csstyle.popupdel}
          >
            <ModalDelete handleClose={() => handleClose(setModaldel)} pks={post.id} gen={post.Gender} nme={post.Name}/>
          </Box>
        )}
      </AnimatePresence>
    </>
  )
});

export async function getServerSideProps(context) {
  const { treeid } = context.params;

  return {
    props: {
      treeid,
    },
  };
}