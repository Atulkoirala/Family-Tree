import { motion, AnimatePresence } from "framer-motion";
import React ,{useEffect , useState ,useRef } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Grid,CardContent ,CardActionArea,CardMedia, Typography, List, ListItem, createStyles, Card, TextField, Link, Button, TextareaAutosize } from '@mui/material';
import Image from 'next/image';
import { makeStyles , styled , useTheme } from '@mui/styles';
import csstyle from '../../src/styles/GlobalStyles.module.css';
import { useRouter } from "next/router";
import axios from 'axios';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import Switch from '@mui/material/Switch';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
import dynamic from "next/dynamic";
import withAuth  from '../../src/pages/withAuth';


// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });


const Styledfield = dynamic(()=> import('./styledfield'));

const dropIn ={
    hidden:{
        y:"-100vh",
        opacity:0,
    },
    visible:{
        y:"0",
        opacity:1,
        transition:{
            duration:1.5,
            type:"spring",
            damping:35,
            stiffness:100,
        },
    },
    exit:{
        y:"100vh",
        opacity:0,
        transition:{
            duration:1.5,
            type:"spring",
            damping:35,
            stiffness:100,
        },
    },
};


const StyledTextField = styled(TextField)`
  ${({ theme }) => ({
    mb: 2,
        
  })};
`;


const ModalAdd = ({userdetails,handleClose}) => {
  const [isfemale,setisfemale] = useState(true);

  const handleToggle = ()=>{
    setisfemale(!isfemale);
  };

  const alertClose = (event,reason) =>{
    if(reason === 'clickaway'){
      return;
    }
    setopener(false);

    setTimeout(() => {
      router.push('/home/');
    }, 6000);
  }

  return (
    <>
            <motion.Box
                my={3}
                className={csstyle.modsfoot}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e)=> e.stopPropagation()}>

                  
                <Button size="small" onClick={handleClose} sx={{color:'black',border:'1px solid black',fontWeight:'bolder',backgroundColor:'crimson',borderRadius:'10px 10px 10px 10px'}}>
                        <CancelIcon/>
                </Button>

              <Box sx={{display:'flex',justifyContent:'center',textAlign:'center'}}>
                <Typography sx={{color:'skyblue',fontWeight:'bold'}} component="p"><ManIcon/> Man</Typography>
                <Switch checked={isfemale} onChange={handleToggle}/>
                <Typography sx={{color:'pink',fontWeight:'bold'}} component="p">Woman <WomanIcon/></Typography>
              </Box>

                  {/* <Switch checked={isfemale} onChange={handleToggle}/> */}

                  {(isfemale) ? (
                      <Styledfield gen="Female" details={userdetails}/>
                  ) : (
                      <Styledfield gen="Male" details={userdetails}/>
                  )}
         
            </motion.Box>

            {/* <Snackbar open={opener} autoHideDuration={6000} onClose={alertClose}>
              <Alert onClose={alertClose} severity="error" sx={{ width: '100%' }}>
                Deleted
              </Alert>
            </Snackbar> */}

    </>
  )
}

export default withAuth(ModalAdd);