import { motion, AnimatePresence } from "framer-motion";
import React ,{useEffect , useState ,useRef } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import {Box,Grid, TextField, Select, MenuItem,Typography,Input, Button, FormControl, InputLabel } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles , styled , useTheme } from '@mui/styles';
import { alpha } from '@mui/system';
import csstyle from '../../../styles/GlobalStyles.module.css';
// import Form from "react-jsonschema-form";
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from "next/router";
import withAuthentication from '../../withAuthentication';




const Layout = dynamic(() => import("../../../../component/Layout").then((mod) => mod.Layout));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
    bx:{
        
    }
})

const Index = () => {

    const classes = useStyles();

    const [roles, setroles] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [errorhand, setErrorhand] = useState('');



    // const [fname,setfname] = useState("");
    const [data, setData] = useState({
        first_name:'',
        last_name:'',
        username:'',
        email:'',
        password:'',
        token:'',
        pic: null,
      });

      const handleSubmit = (event) => {
        event.preventDefault();

        if (roles === 'Manager') {
            data.token = "12345";
          }

        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));


        console.log(data.token);
        console.log("DATA" + data);

        axios.post('http://127.0.0.1:8000/auth/register/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
        .then((response) => {
  
          setTimeout(() => {
            router.push('/home');
          }, 6000);
          
          setOpen(true);

        })
        .catch((error) => {
          setOpen(true);
          console.error(error);
          console.error(error.response.data);
          setErrorhand((JSON.stringify(error.response.data, null, 2))); // Set the error message
          console.log(errorhand);
        });
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
      
        
      
        setData((prevData) => ({
          ...prevData,
          [name]: value // conditionally set spous to an empty array if Marrital_Status is not Married
        }));
      };

      const handleChangeRoles = (event) => {
        let val = event.target.value;
        setroles(val);
      };

    //   const handleChangeFamily = (event) =>{
    //     let val = event.target.value;
    //     setfname(val);
    //   }

      const handleFileChange = (event) => {
        console.log(data.pic)
        console.log("---")
        console.log(event.target.files[0])
        setData({ ...data, pic: event.target.files[0]});
        console.log(data);
      };
    
      const handleSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


  return (
    <Box className={csstyle.bodysignup}>
        <Layout>
            <Box sx={{
                width:{xl:'50%',lg:'65%',md:'65%',sm:'75%',xs:'83%'},
                marginTop:'5%',left:'0%',right:'0%',
                justifyContent:'center',alignItems:'center',marginX:'auto',position:'relative',
                backgroundColor:'rgba(232, 217, 168, 0.357)',
                border:'2px solid black',borderRadius:'15px 15px 15px 15px',
                boxShadow:'0px 0px 10px #81007c',overflowY:'auto',maxHeight: 'calc(100vh - 160px)',zIndex:'9999999999999'}}>
                        <Typography component='h1'
                            sx={{justifyContent:'center',textAlign:'center',fontSize:'3rem',fontWeight:'bolder',color:'black',fontFamily: 'Montserrat'}}
                        >Sign Up</Typography>
                        <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                            <Box
                                sx={{
                                    position: 'relative',
                                    overflowY: 'auto',
                                    maxHeight: 'calc(100vh - 160px)', // Adjust the height as needed
                                    p: 2,
                                    zIndex:'999999999999',
                                }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.txt}
                                            name="first_name"
                                            label="First Name"
                                            type="text"
                                            value={data.first_name}
                                            onChange={handleChange}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.txt}
                                            name="last_name"
                                            label="Last Name"
                                            type="text"
                                            value={data.last_name}
                                            onChange={handleChange}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            className={classes.txt}
                                            name="email"
                                            label="Email"
                                            type="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.txt}
                                            name="username"
                                            label="UserName"
                                            type="text"
                                            value={data.username}
                                            onChange={handleChange}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.txt}
                                            name="password"
                                            label="Password"
                                            type="password"
                                            value={data.password}
                                            onChange={handleChange}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl className={classes.txt} fullWidth>
                                            <InputLabel >Role</InputLabel>
                                            <Select
                                                name="spous"
                                                label="Role"
                                                value={roles}
                                                onChange={handleChangeRoles}
                                                required
                                                >
                                                <MenuItem sx={{fontWeight:'bolder',color:'black',}} value="Manager">Manager</MenuItem>
                                                <MenuItem sx={{fontWeight:'bolder',color:'black',}} value="Editor">Editor</MenuItem>
                                                <MenuItem sx={{fontWeight:'bolder',color:'black',}} value="Watcher">Watcher</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {
                                        ((roles === "Watcher")||(roles === "Editor")) && (
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    className={classes.txt}
                                                    name="token"
                                                    label="Token"
                                                    type="text"
                                                    value={data.token}
                                                    onChange={handleChange}
                                                    required
                                                    fullWidth
                                                />
                                            </Grid>
                                        )
                                    }
                                    {/* <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.txt}
                                            name="name"
                                            label="Family Name"
                                            type="text"
                                            value={fname}
                                            onChange={handleChangeFamily}
                                            helperText="Once Written Cannot Be Edited"
                                            required
                                            fullWidth
                                        />
                                    </Grid> */}
                                    <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center',borderBottom:'1px solid black',width:'100%'}} py={1} ml={1.5}>
                                        <Input
                                            className={classes.txt}
                                            id="pic"
                                            name="pic"
                                            label="Your Picture"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            required/>
                                    </Grid>
                                    <Grid item mb={1.3} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button type="submit" variant="contained" color="success" sx={{justifyContent:'center',textAlign:'center',alignItem:'center'}}>
                                            Register
                                        </Button>
                                    </Grid>

                                    <Typography component='h1' 
                                        sx={{justifyContent:'center',textAlign:'center',fontSize:'1.7rem',fontWeight:'bold',color:'black',margin:'auto'}}
                                    >Already User ?<Link href="/home/login"> Login</Link></Typography>
                                </Grid>
                            </Box>
                        </form>
            </Box>
        </Layout>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbar}>
            {
                errorhand ?
                <Alert onClose={handleSnackbar} severity="error" sx={{ width: '100%' }}>
                    {`${errorhand}`}
                </Alert>
              :
                <Alert onClose={handleSnackbar} severity="success" sx={{ width: '100%' }}>
                    {`${roles} Account with ${data.first_name} Created , Wait a minutes page Loading....`}
                </Alert>
            }

        </Snackbar>
    </Box>
  )
}

export default withAuthentication(Index);