import React from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import {Box,Grid,Toolbar,Tooltip,Card,TextField, Select, IconButton, Menu, MenuItem,MenuIcon,Typography,Input, Button, FormControl, InputLabel } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import csstyle from '../../../styles/GlobalStyles.module.css';
import { makeStyles , styled , useTheme } from '@mui/styles';
import {motion , useScroll,AnimatePresence } from 'framer-motion'
import withAuthentication from '@/pages/withAuthentication';
import withAuth from '@/pages/withAuth';






const Layout = dynamic(() => import('../../../../component/Layout').then((mod) => mod.Layout));
const Footer = dynamic(()=> import("../../../../component/Footer"));





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
    textDecoration:'none',fontWeight:'bold',cursor:'pointer',
  }
})




const Index = ()=> {


  const classes = useStyles();
  const [data,setData] = React.useState([]);

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
  
        setData(combinedData);
        console.log(combinedData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchMediaData();
  }, []);



  const groupedData = data.reduce((acc, item) => {
    const foundItem = acc.find((group) => group[0].ids === item.ids);
    if (foundItem) {
      foundItem.push(item);
    } else {
      acc.push([item]);
    }
    return acc;
  }, []);
  


  return (
    <Box overflow="hidden" className={csstyle.body}>
        <Layout title="Home">
          <Box sx={{overflowY: 'auto',height:'90vh' }}>
            <Box mb={7} sx={{ flexGrow: 1, overflowY: 'auto' }}>
                      {groupedData.map((group, index) => {
                        const reducedData = group.reduce((acc, item) => {
                          const value = item.value;
                          const existingGroup = acc.find((group) => group.value === value);
                          if (existingGroup) {
                            existingGroup.items.push(item);
                          } else {
                            acc.push({ value, items: [item] });
                          }
                          return acc;
                        }, []);

                        return (
                          <Box key={index} sx={{borderBottom:'3px solid white',overflowX:'auto'}} p={2} mb={1}>
                            <Box sx={{ display: 'flex'}}>
                              {reducedData.map((groupedItem, groupedIndex) => (
                                <Box key={groupedIndex}>
                                  <Box
                                    sx={{
                                      border: '2.5px solid black',
                                      borderRadius:'20px 20px 20px 20px',
                                      display: 'flex',
                                      marginX:'1.5rem',
                                    }}
                                  >
                                    {groupedItem.items.map((item) => {
                                      const isfemale = (item.Gender === "Female");
                                      const isdeath = (item.Status === "Death");
                                      const isdiff = (item.Diffrent_Family === 'Yes');
                                      const isdivorce = (item.Marrital_Status === 'Divorce');
                                        
                                      const bcolf = isdeath ? 'linear-gradient(45deg, rgba(0,0,0,0.8428163501728816) 0%, rgba(255,0,227,0.9212477227219013) 100%)' : isdivorce ? 'linear-gradient(45deg, rgba(195,0,0,0.949258927203694) 13%, rgba(215,4,192,0.9016398795846463) 84%)' : isdiff ? 'linear-gradient(45deg, rgba(245,222,179,1) 22%, rgba(209,0,187,1) 100%)' : 'linear-gradient(50deg, rgba(103,51,101,0.9016398795846463) 25%, rgba(226,108,214,1) 100%)'
                                      const bcolm = isdeath ? 'linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(54,190,255,1) 100%)' : isdivorce ? ' linear-gradient(40deg, rgba(178,3,3,0.9212477227219013) 25%, rgba(54,190,255,1) 85%)' : isdiff ? 'linear-gradient(45deg, rgba(245,222,179,1) 22%, rgba(71,196,255,1) 100%)' : ' linear-gradient(45deg, rgba(54,190,255,1) 0%, rgba(45,98,119,1) 57%)'

                                      return(
                                        <Link className={classes.lnk} href={isfemale ? `/home/tree/girl/${item.id}` : `/home/tree/boy/${item.id}`} passHref>
                                          <Grid direction="horizontal"  py={0.7} px={1.5} key={item.id} sx={{ backgroundColor: 'rgba(237, 231, 223, 0.1)', borderRadius: '20px',with:'100%',height:'fit-content',overflow:'auto',flex:'none' }}>
                                            <Box sx={{ justifyContent: 'center', textAlign: 'center', display: 'flex' }}>
                                              <Typography mx={1} sx={{ color:'white',justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }}>Mom:{isfemale ? item.parent : item.moms }</Typography>
                                              <Typography mx={2} sx={{ color:'white',justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }}>Dad:{isfemale ? item.dads : item.parent}</Typography>
                                            </Box>
                
                                            <Card component={motion.button} sx={{
                                                width: 190,height: 190,borderRadius: '2rem',background: isfemale ? bcolf : bcolm,cursor:'pointer',
                                                position: 'relative',display: 'flex',justifyContent: 'center',alignItems: 'center',}}>
                                              
                                              <Typography  component={motion.p} p={1} sx={{ fontSize: '1rem',color: 'black',
                                                  margin: 'auto', textAlign: 'center', fontWeight: 'bolder',padding: '1rem 1rem',
                                                  justifyContent: 'center', alignItems: 'center',}}>{item.Name}
                                              </Typography>
                
                                              <Card component={motion.button} whileHover={{ opacity: '0' }}
                                                sx={{width: 190, height: 190,position: 'absolute',top: 0,left: 0,
                                                  bottom: 0,right: 0, display: 'flex',justifyContent: 'center',
                                                  alignItems: 'center',background: isfemale ? bcolf : bcolm,cursor:'pointer',
                                                  borderRadius: '2rem',border: '1.5px solid black',}}>
                                                
                                                <Image width={180} height={180} src={item.image} className={classes.imag} alt="Profile Image" />
                                              
                                              </Card>
                                            </Card>
                
                                              <Typography sx={{ color:'white',justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }}>ID: {item.id}</Typography>
                                          </Grid>
                                        </Link>
                                        );
                                        })}
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        );
                        })}
              </Box>
          </Box>

          <Footer/>
        </Layout>
    </Box>
  )
}

export default withAuth(Index);