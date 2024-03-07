import { motion, AnimatePresence } from "framer-motion";
import React ,{useEffect , useState ,useRef ,useContext } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import {Box,Grid, TextField, Select, MenuItem,Typography,Input, Button, FormControl, InputLabel } from '@mui/material';
import { makeStyles , styled , useTheme } from '@mui/styles';
import { alpha } from '@mui/system';
import csstyle from '../../../styles/GlobalStyles.module.css';
// import Form from "react-jsonschema-form";
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {AuthContext} from '../../../../component/option/AuthContext';
import withAuthentication from "../../withAuthentication";




const Layout = dynamic(() => import("../../../../component/Layout").then((mod) => mod.Layout));
const ModalForget = dynamic(() => import('../../../../component/option/modalforget'));




const useStyles = makeStyles({
    txt:{
        '& label':{
            fontWeight:'bolder',
            color :'black',
        },
        '& input': {
            fontWeight: '600',
            color: 'green',
        },
        '& .MuiInputBase-input': {
            backgroundColor: 'rgba(245, 222, 179, 0.5)', 
          },
    },
})

const Index = () => {

    const classes = useStyles();

    let{handleLogin} = useContext(AuthContext);

    const [modalforg,setModalfrog] = useState(false);
    
    const handleOpen = (setModal)=>{
        setModal(true);
    }

    const handleCloses = (setModal)=>{
        setModal(false);
    }

  return (
    <>
        <Box className={csstyle.bodylogin}>
            <Layout>
                <Box sx={{
                    width:{xl:'35%',lg:'50%',md:'50%',sm:'50%',xs:'83%'},
                    top:'10%',bottom:'0',left:'0%',right:'0%',
                    justifyContent:'center',textAlign:'center',alignItems:'center',position:'absolute',
                    backgroundColor:'rgba(232, 217, 100, 0.357)',margin:'auto',
                    border:'2px solid black',borderRadius:'15px 15px 15px 15px',height:'fit-content',
                    boxShadow:'0px 0px 10px #81007c',overflowY:'auto',maxHeight: 'calc(100vh - 120px)',}}>
                        <Typography component='h1'
                            sx={{justifyContent:'center',textAlign:'center',fontSize:'3rem',fontWeight:'bolder',color:'black',fontFamily: 'Montserrat'}}
                        >Log In</Typography>


                            <form onSubmit={handleLogin} method="POST" encType="multipart/form-data">
                                <Box
                                    sx={{
                                        position: 'relative',
                                        overflowY: 'auto',
                                        // maxHeight: 'calc(100vh - 160px)', // Adjust the height as needed
                                        p: 2,
                                    }}>
                                    <Grid container spacing={2}>
                                        
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                className={classes.txt}
                                                name="email"
                                                label="Email"
                                                type="email"
                                                // value={data.email}
                                                // onChange={handleChange}
                                                required
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                className={classes.txt}
                                                name="password"
                                                label="Password"
                                                type="password"
                                                // value={data.password}
                                                // onChange={handleChange}
                                                required
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button type="submit" variant="contained" color="success" sx={{justifyContent:'center',textAlign:'center',alignItem:'center'}}>
                                                Login
                                            </Button>
                                        </Grid>
                                        <Grid item mb={2} xs={12}>
                                            <Button onClick={()=> handleOpen(setModalfrog)} color="secondary" size="small"><Typography component='h1' 
                                                    sx={{justifyContent:'center',width:'100%',display:'grid',textAlign:'center',fontSize:'1.5rem',fontWeight:'bold',color:'#8B0000',margin:'auto'}}
                                            >Forget Password ?</Typography></Button>
                                        </Grid>
                                        <Typography component='h1' 
                                                sx={{justifyContent:'center',textAlign:'center',fontSize:'1.7rem',fontWeight:'bold',color:'black',margin:'auto'}}
                                        >Create User ?<Link href="/home/signup"> Sign Up</Link></Typography>
                                    </Grid>
                                </Box>
                            </form>
                </Box>
            </Layout>
        </Box>
        <AnimatePresence>
            {modalforg && (
            <Box
                component={motion.div}
                initial={{ y: '-100vh', opacity: 0 }}
                animate={{ y: '0', opacity: 1, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
                exit={{ y: '-100vh', opacity: 0, transition: { duration: 1.5, type: 'spring', damping: 35, stiffness: 100 } }}
                className={csstyle.popupfoot}
            >
                <ModalForget handleCloses={() => handleCloses(setModalfrog)} />
            </Box>
            )}
        </AnimatePresence>
    </>
  )
}

export default withAuthentication(Index);