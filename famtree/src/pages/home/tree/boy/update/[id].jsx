import { useRouter } from 'next/router';
import * as React from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import {Box,Grid,Toolbar,Tooltip, TextField, Select,FormHelperText, IconButton, Menu, MenuItem,MenuIcon,Typography,Input, Button, FormControl, InputLabel } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import csstyle from '../../../../../styles/GlobalStyles.module.css';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { makeStyles , styled , useTheme } from '@mui/styles';
import {motion , useScroll,AnimatePresence } from 'framer-motion'
import withAuth from '../../../../withAuth';



const Layout = dynamic(() => import('../../../../../../component/Layout').then((mod) => mod.Layout));


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

export default withAuth(function BoyId({ id }) {


    const [previousData, setPreviousData] = React.useState({});


    const router = useRouter();
    const classes = useStyles();
    const [prof,setprof] = React.useState(null);
    const [girl, setGirl] = React.useState([]);
    const [boy, setBoy] = React.useState([]);
    const [sel, setSel] = React.useState([]);
    const [data, setData] = React.useState({
      ids: 0,
      value: 0.0,
      Name: '',
      SurName: '',
      Gender: '',
      Diffrent_Family: '',
      Born_Place: '',
      Date_Of_Birth: '',
      Status: '',
      Date_Of_Death: '',
      Marrital_Status: '',
      // spous: null,
      // spous: sel,
      parent: '',
      parentb: '',
      parentg: '',
      moms: '',
      dads: '',
      image: null,
    });
  
  
  
    // const payload = {
    //   spous: sel,
    // };
  
  
    // const mergedData = { ...data, ...payload };
    React.useEffect(() => {
        const fetchMediaData = async () => {
          try {
            const token = localStorage.getItem('accessToken');
            const res = await axios.get(`http://127.0.0.1:8000/media/boy/${id}/`,{ headers: { Authorization: `Bearer ${token}`, }});
            setPreviousData({ ...res.data }); // Store previous data
            setData({ ...res.data }); // Update current data
            setSel(res.data.spous);
            console.log('Previous Data:', prevData);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchMediaData();
      }, []);
      
  
    React.useEffect(() => {
      const fetchMediaData = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const [boysResponse, girlsResponse] = await Promise.all([
            axios.get('http://127.0.0.1:8000/media/boys/',{ headers: { Authorization: `Bearer ${token}`, }}),
            axios.get('http://127.0.0.1:8000/media/girls/',{headers: { Authorization: `Bearer ${token}`, }})
          ]);
          setBoy(boysResponse.data);
          setGirl(girlsResponse.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchMediaData();
    }, []);

    const backClick =()=>{
      router.push('/home/tree/boy/'+id);
    }

    const errorHandler = (errorMessage) => {
      alert(errorMessage);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      // if(data.Date_Of_Death == null){
      //   formData.set('Date_Of_Death', '');
      // }

      formData.delete('spous');
      console.log(sel);
      // Iterate over the 'sel' array and append each value separately
      sel.forEach((item) => {
        formData.append('spous', item);
      });
      console.log(sel);
      if(data.Marrital_Status === "UnMarried"){
        setSel([]);
        formData.delete('spous');
      }
      // sel.forEach((item) => {
      //   formData.append('spous', item);
      // });

      for (let [name, value] of formData.entries()) {
        console.log(`${name}: ${value}`);
      }
      
      const token = localStorage.getItem('accessToken');
      axios.put(`http://127.0.0.1:8000/media/bupdate/${id}/`, formData, { headers: { Authorization: `Bearer ${token}`, }})
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
        .catch((error) => {
          if (
            error.response.status === 500
          ) {
            // Display custom error message to alert the user about the specific error
            errorHandler("Please select a different Father. You cannot select the Yourself as Father");
          } else {
            errorHandler(JSON.stringify(error.response.data, null, 2));
          }
          console.log(error.response.data);
        });
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
    
      let newValue = value;
      if (name === "SurName") {
        newValue = value.split(",");
      } else if (name === "ids") {
        newValue = parseInt(value);
      } else if (name === "value") {
        newValue = parseFloat(value);
      } else if (name === "Date_Of_Birth" || name === "Date_Of_Death") {
        // Convert the date to YYYY-MM-DD format
        const date = new Date(value);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        newValue = `${year}-${month}-${day}`;
      } 
      else if (name === "Marrital_Status") {
        console.log("HHHHH");
        console.log("Spous: ", data.spous);
      // } else if (name === "spous") {
        // newValue = value.split(",").map((id) => parseInt(id));
      }
    
      console.log(name);
      console.log("---");
      console.log(newValue);
    
      setData((prevData) => ({
        ...prevData,
        [name]: newValue // conditionally set spous to an empty array if Marrital_Status is not Married
      }));
    };
  
    const handleChangeS = (event) => {
      const { value } = event.target;
      setSel([...value]); // Spread the values and create a new array
    };
  
    const handleFileChange = (event) => {
      console.log(data.image)
      const fle = event.target.files[0]
      setprof(URL.createObjectURL(fle));
      console.log("---")
      console.log(event.target.files[0])
      setData({ ...data, image: fle});
    };
    
  return (
    <>
       <Box className={csstyle.body}>
            <Layout>
                <Box sx={{overflowY: 'auto', height: '90vh' }}>
                  <Box mb={3} p={1.5} sx={{ flexGrow: 1, overflowY: 'auto' }}>
                      <Box component={Button} onClick={backClick} mr={3} ml={1} py={1} sx={{display:'flex',borderRadius:'50%',background:'black',width:'fit-content',height:'fit-content'}}>
                        <KeyboardBackspaceTwoToneIcon href="/home/tree" sx={{fontSize:'2.3rem',fontWeight:'bolder',color:'red',curosr:'pointer'}}/>
                      </Box>
                    <Typography component='h1'
                        sx={{justifyContent:'center',textAlign:'center',fontSize:'2rem',fontWeight:'bold',color:'black'}}
                    >{data.Name} Update</Typography>

                    <form onSubmit={handleSubmit} method="PUT" encType="multipart/form-data">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        // variant="standard"
                        name="ids"
                        label="Ids"
                        type="number"
                        value={data.ids}
                        // value={data.ids}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }} // Display the label above the value
                        InputProps={{ autoFocus: true }} // Automatically focus on the input
                        inputProps={{ min: 0 }}
                        required
                        fullWidth
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField
                        // variant="standard"
                        name="value"
                        label="Value"
                        type="number"
                        step="0.01"
                        value={data.value}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }} // Display the label above the value
                        InputProps={{ autoFocus: true }} // Automatically focus on the input
                        // inputProps={{ min: 0 }}
                        required
                        fullWidth
                        />
                    </Grid>
            {/* {
                checkboy ?(
                <Grid item xs={12} sm={6}>
                <TextField
                    name="SurName"
                    label="SurName"
                    value={data.SurNameb}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                </Grid>
                )
                :(
                <Grid item xs={12} sm={6}>
                <TextField
                    name="SurName"
                    label="SurName"
                    value={data.SurNameg}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                </Grid>
                )
            } */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                        // variant="standard"
                        name="SurName"
                        label="SurName"
                        value={data.SurName}
                        onChange={handleChange}
                        // InputLabelProps={{ shrink: true }} // Display the label above the value
                        // InputProps={{ autoFocus: true }} // Automatically focus on the input
                        // inputProps={{ min: 0 }}
                        required
                        fullWidth
                        />
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="Name"
                        label="Name"
                        value={data.Name}
                        onChange={handleChange}
                        required
                        fullWidth
                        />
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="Gender"
                            label="Gender"
                            value={data.Gender}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }} // Display the label above the value
                            InputProps={{ autoFocus: true }} // Automatically focus on the input
                            inputProps={{ min: 0 }}
                            required
                            fullWidth
                        >
                            <MenuItem value="Male">Male</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                        <InputLabel>Diffrent Family</InputLabel>
                        <Select
                            name="Diffrent_Family"
                            label="Diffrent Family"
                            value={data.Diffrent_Family}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="Born_Place"
                        label="Born Place"
                        value={data.Born_Place}
                        onChange={handleChange}
                        required
                        fullWidth
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="Date_Of_Birth"
                        label="Born Date"
                        type="date"
                        value={data.Date_Of_Birth}
                        // Date has wrong format. Use one of these formats instead: YYYY-MM-DD.
                        onChange={handleChange}
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="Status"
                            label="Status"
                            value={data.Status}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Alive">Alive</MenuItem>
                            <MenuItem value="Death">Death</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    {data.Status === "Death" && (
                        <Grid item xs={12} sm={6}>
                        <TextField
                            name="Date_Of_Death"
                            label="Death Date"
                            type="date"
                            value={ data.Date_Of_Death }
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                            shrink: true,
                            }}
                            required
                        />
                        </Grid>
                    )}



                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                        <InputLabel>Marital Status</InputLabel>
                        <Select
                            name="Marrital_Status"
                            label="Marrital Status"
                            value={data.Marrital_Status}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="UnMarried">UnMarried</MenuItem>
                            <MenuItem value="Married">Married</MenuItem>
                            <MenuItem value="Divorce">Divorced</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>


            {
                data.Marrital_Status === "Married" && (
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                    <InputLabel>Wife</InputLabel>
                    <Select
                        name="spous"
                        label="Wife"
                          value={sel}// make sure value is an array
                          // onChange={handleChange}
                          onChange={handleChangeS}
                          required
                          multiple
                    >
                        {girl.map((ele) => (
                            <MenuItem key={ele.id} value={ele.id}>
                            {ele.Name}
                            </MenuItem>
                        )
                        )}
                    </Select>
                    </FormControl>
                </Grid>
                )
            }


            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                <InputLabel>Father</InputLabel>
                <Select
                    name="parent"
                    label="Father"
                    value={data.parent}
                    onChange={handleChange}
                    
                >
                    <MenuItem value="">None</MenuItem>
                    {boy.map((ele) => (
                    <MenuItem key={ele.id} value={ele.id}>{ele.Name}</MenuItem>
                    ))}


                    {/* {[
                    { id: "",value:"", Name: 'Null' }, // Add the "Null" option manually
                    ...boy // Spread the original array of values
                    ].map((ele) => (
                        <MenuItem key={ele.id} value={ele.id}>{ele.Name}</MenuItem>
                    ))} */}
                </Select>
                    <FormHelperText>
                        You need to add this again before submitting,None will not be displayed
                    </FormHelperText>
                </FormControl>
            </Grid>



            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel>Mother</InputLabel>
                    <Select
                    name="moms"
                    label="Mother"
                    value={data.moms}
                    onChange={handleChange}
                    
                    >
                    <MenuItem value="">None</MenuItem>
                    {girl.map((ele) => (
                        <MenuItem key={ele.id} value={ele.id}>{ele.Name}</MenuItem>
                    ))}
                    </Select>
                    <FormHelperText>
                        You need to add this again before submitting,None will not be displayed
                    </FormHelperText>
                </FormControl>
                </Grid>







                <Grid item xs={12} sm={12} sx={{ display: 'inline', justifyContent: 'center',textAlign:'center',borderBottom:'1px solid black',width:'100%'}} py={1} ml={1.5}>
                        <Input
                            my={2}
                            id="image"
                            name="image"
                            label="Your Picture"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            // className={classes.phot}
                            required
                            />
                            {
                            (data.image || prof) ? (
                              <Box my={2} sx={{border:'1rem solid #87CEEB',margin:'auto',borderRadius:'50%',width:'fit-content',justifyContent:'center',alignItems:'center',textAlign:'center',background:'#87CEEB'}}>
                                <Image src={prof || data.image} className={classes.imag} width={220} height={220} style={{ borderRadius: '50%' }} alt="Image" />
                              </Box>      
                            ) : (
                                <></>
                            )
                            }
                </Grid>


                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" color="success" sx={{justifyContent:'center',textAlign:'center',alignItem:'center'}}>
                            Submit
                        </Button>
                        </Grid>
                    </Grid>
                    </form>
                  </Box>
                </Box>
            </Layout>
       </Box>
    </>
  )
});

export async function getServerSideProps(context) {
    const { id } = context.params;
  
    return {
      props: {
        id,
      },
    };
  }
