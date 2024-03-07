import * as React from 'react';
import Image from 'next/image';
import { Box, Grid,CardContent ,CardActionArea,CardMedia, Typography, styled, List, ListItem, createStyles, Card, TextField, Link, Button, TextareaAutosize } from '@mui/material';
// import Backg from '../Media/bg.jpg'; 
import { makeStyles } from '@mui/styles';
import {motion , useScroll,AnimatePresence, addScaleCorrector } from 'framer-motion'
import dynamic from 'next/dynamic';
// import { Layout } from '../../component/Layout';
import ParkIcon from '@mui/icons-material/Park';
// import csstyle from '../styles/globals.css'
import csstyle from "../../styles/GlobalStyles.module.css";
import axios from 'axios';
import {AuthContext} from '../../../component/option/AuthContext';
import { useRouter } from 'next/router';
import  withAuth  from '../withAuth';




const Layout = dynamic(() => import('../../../component/Layout').then((mod) => mod.Layout));


const useStyles = makeStyles({
  txt: {
    marginTop:'3.5rem',
    fontSize:{
      xl:'5rem',lg:'4rem',md:'3rem',sm:'2rem',xs:'1rem'
    }
  },
  lnk:{
    justifyContent:'center',
    marginX:'auto',
    alignItems:'center',
    display:'flex',
    color:'red',
    fontWeight:'bolder',
  }
});


const HomePage = ({userdetails}) => {
  const classes = useStyles();

  const [adds, setAdds] = React.useState(false);
  const [edits, setEdits] = React.useState(false);
  
  const [btnadd, setBtnadd] = React.useState(false);
  const [btnedit, setBtnedit] = React.useState(false);
  
  const [txtadd, setTxtadd] = React.useState("");
  const [txtedit, setTxtedit] = React.useState("");

  const [post,setpost] = React.useState([]);
  const router = useRouter();

  console.log("details : "+userdetails.id);

  
  const handleAddClick = () => {
    setAdds(true);
    setEdits(false);
  };

  const handleEditClick = () => {
    setAdds(false);
    setEdits(true);
  };

  const handleAdd = (event) =>{
    event.preventDefault();

    const token = localStorage.getItem('accessToken');
    const jwt = require('jsonwebtoken');
    const decodedToken = jwt.decode(token);
    const username = decodedToken.username;
    const userId = decodedToken.user_id;
    const email = decodedToken.email;


    const formData = new FormData();
    formData.append("Name",txtadd);
    formData.append("user",userId);

    try {
      const res = axios.post(`http://127.0.0.1:8000/media/fam/`,formData, { headers: { Authorization: `Bearer ${token}`, }});
      setpost(res.data);
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (event) =>{
    event.preventDefault();

    const token = localStorage.getItem('accessToken');
    const jwt = require('jsonwebtoken');
    const decodedToken = jwt.decode(token);
    const username = decodedToken.username;
    const userId = decodedToken.user_id;
    const email = decodedToken.email;

    const formData = new FormData();
    formData.append("Name",txtedit);
    formData.append("user",userId);

    try {
      const res = axios.put(`http://127.0.0.1:8000/media/fam/${post[0].id}/`,formData, { headers: { Authorization: `Bearer ${token}`, }});
      setpost(res.data);
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const responses = await axios.get('http://127.0.0.1:8000/media/fam/', {
          headers: { Authorization: `Bearer ${token}`, },
        });
        setpost(responses.data);
        console.log(responses.data);
        if(responses.data.length === 1){
          setBtnedit(true);
          setBtnadd(false);
        }
        else{
          setBtnadd(true);
          setBtnedit(false);
        }

      } catch (error) {
        console.log('Error:', error);
        setBtnadd(true);
        setBtnedit(false);
      }
    }
    fetchData();
  },[]);

  return (
  <>
    <Box overflow="hidden" className={csstyle.bodyhome}>
        <Box sx={{height:"100vh"}}>
          <Layout title="Famtree">
                  {/* <Image width={1000} height={1000} className={classes.backgrod} src="/Media/bg.jpg"/> */}
                  
                  <Box mt={3} sx={{justifyContent: 'center', alignItems: 'center'}}>
                    

                  {
                      post.map((ele) => (
                        <Typography component={motion.h1} key={ele.id}
                          sx={{
                            fontSize:{
                              xl:'5rem',lg:'4rem',md:'3rem',sm:'2rem',xs:'1.5rem'
                            },
                            marginTop:'5rem',
                            justifyContent:'center',
                            textAlign:'center',
                            fontWeight:'bold',
                          }}>Hello {ele.Name}</Typography>
                      ))

                    }


                    <Button size="large" p={2} sx={{
                        marginX:'auto',
                        display:'flex',
                        color:'green',
                        '& > a': {
                          textDecoration: 'none !important',
                        },
                      }}>
                        <Link href="home/tree" className={classes.lnk}>
                          <ParkIcon p={2} sx={{
                            fontSize:{
                              xl:'10rem',lg:'9rem',md:'8rem',sm:'7rem',xs:'5rem'
                            },
                            color:'green',
                            borderBottom:'3px solid green',
                            borderRadius:'50%',
                            background:'rgba(128, 128, 128, 0.2)',
                            padding:'15px 9px',
                            }}
                          />
                        </Link>
                    </Button>

                    <Box my={3} p={2} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', width: '100vw', margin: 'auto' }}>
                      { btnadd && 
                        <Button variant="contained" color="primary" onClick={handleAddClick} sx={{ textTransform: 'none', color: 'white', padding: '7px 7px', fontWeight: 'bold', marginX: '1rem' }}>
                          Add FamilyName
                        </Button>
                      }
                      {btnedit && 
                        <Button variant="contained" color="secondary" onClick={handleEditClick} sx={{ textTransform: 'none', color: 'white', padding: '7px 7px', fontWeight: 'bold', marginX: '1rem' }}>
                          Edit FamilyName
                        </Button>
                      }
                    </Box>

                    {adds && 
                      <form onSubmit={handleAdd} method="Post" encType="multipart/form-data">
                          <Box sx={{width:'fit-content',height:'fit-content',display:'flex',marginX:'auto','& label':{
                            fontWeight:'bolder',
                            border:'solid dark 1px',
                            color :'black',
                            }}}>
                                <TextField
                                    name="text"
                                    label="Add Name"
                                    onChange={(e)=>setTxtadd(e.target.value)}
                                    type="text"
                                    size="medium"
                                    required
                                    fullWidth
                                    />
                                  <Button type="submit" size="medium" variant="outlined" sx={{fontWeight:'bold',color:'black',justifyContent:'center',textAlign:'center',alignItem:'center'}}>
                                    Add
                                  </Button>
                            </Box>
                        </form>
                    }
                    {edits &&
                      <form onSubmit={handleEdit} method="PUT" encType="multipart/form-data">
                          <Box sx={{width:'30%',height:'fit-content',display:'flex',marginX:'auto','& label':{
                            fontWeight:'bolder',
                            border:'solid dark 1px',
                            color :'black',
                              }}}>
                                    <TextField
                                      name="text"
                                      label="Edit Details"
                                      onChange={(e)=>setTxtedit(e.target.value)}
                                      type="text"
                                      size="medium"
                                      required
                                      fullWidth
                                      />
                                    <Button type="submit" size="medium" variant="outlined" sx={{fontWeight:'bold',color:'black',justifyContent:'center',textAlign:'center',alignItem:'center'}}>
                                      Edit
                                    </Button>
                            </Box>
                        </form>
                      }



                      {/* <Typography component={motion.h1} 
                        sx={{
                          fontSize:{
                            xl:'4.6rem',lg:'3.4rem',md:'2.3rem',sm:'1.7rem',xs:'1.3rem'
                          },
                          marginTop:'2rem',
                          justifyContent:'center',
                          textAlign:'center',
                          fontWeight:'300',
                        }}
                      >Welcome To The FamTree </Typography> */}
                  </Box>
          </Layout>
        </Box>
    </Box>
  </>
  )
}

export default withAuth(HomePage);
