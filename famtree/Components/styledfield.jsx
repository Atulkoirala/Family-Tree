import { motion, AnimatePresence } from "framer-motion";
import React ,{useEffect , useState ,useRef } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import {Box,Grid, TextField, Select, MenuItem,Typography, Button, FormControl, InputLabel } from '@mui/material';
import { makeStyles , styled , useTheme } from '@mui/styles';
import { alpha } from '@mui/system';
import style from '../src/styles/globals.module.css';
import Form from "react-jsonschema-form";
import axios from 'axios';




const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));




function Styledfield({gen}) {
  const checkboy = (gen === "Male");
  const [girl, setGirl] = useState([]);
  const [boy, setBoy] = useState([]);
  const [sel, setSel] = useState([]);
  const [data, setData] = useState({
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



  const payload = {
    spous: sel,
  };


  // const mergedData = { ...data, ...payload };

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const [boysResponse, girlsResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/media/boys/'),
          axios.get('http://127.0.0.1:8000/media/girls/')
        ]);
        setBoy(boysResponse.data);
        setGirl(girlsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMediaData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const endpoint = gen === "Male" ? "bcreate" : "gcreate";

    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    sel.forEach((item) => {
      formData.append('spous', item);
    });

    axios.post(`http://127.0.0.1:8000/media/${endpoint}/`, formData)
    .then((response) => {
      console.log(response);
      window.location.reload();
    })
    .catch((error) => {
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

  const handlechangeS = (event) => {
    const { value } = event.target;
    setSel(value);
    console.log(value);
  };

  const handleFileChange = (event) => {
    console.log(data.image)
    console.log("---")
    console.log(event.target.files[0])
    setData({ ...data, image: event.target.files[0]});
  };

  // console.log(formData);

  return (

  <Box p={2} sx={{ backgroundColor: checkboy?alpha('#87CEEB', 0.2) :alpha('#FFC0CB', 0.4) }}>
    {/* <form> */}
    <Typography component='h1'
      sx={{justifyContent:'center',textAlign:'center',fontSize:'2rem',fontWeight:'bold',color:checkboy?'white':'black'}}
      >{gen}</Typography>
    <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ids"
            label="Ids"
            type="number"
            value={data.ids}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="value"
            label="Value"
            type="number"
            step="0.01"
            value={data.value}
            onChange={handleChange}
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
            name="SurName"
            label="SurName"
            value={Array.isArray(data.SurName) ? data.SurName.join(",") : data.SurName}
            onChange={handleChange}
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
              required
            >
              {
                checkboy ? <MenuItem value="Male">Male</MenuItem> : <MenuItem value="Female">Female</MenuItem>
              }
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
              value={data.Date_Of_Death}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
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
        <InputLabel>{checkboy ? 'Wife' : 'Husband'}</InputLabel>
        <Select
          name="spous"
          label={checkboy ? 'Wife' : 'Husband'}
          value={sel} // make sure value is an array
          // onChange={handleChange}
          onChange={handlechangeS}
          multiple
          required
        >
          {checkboy
            ? girl.map((ele) => (
                <MenuItem key={ele.id} value={ele.id}>
                  {ele.Name}
                </MenuItem>
              ))
            : boy.map((ele) => (
                <MenuItem key={ele.id} value={ele.id}>
                  {ele.Name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Grid>
  )
}


<Grid item xs={12} sm={6}>
  <FormControl fullWidth>
    <InputLabel>Father</InputLabel>
    <Select
      name={checkboy ? "parent" : "dads"}
      label="Father"
      value={checkboy ? data.parent : data.dads}
      onChange={handleChange}
    >
      {boy.map((ele) => (
        <MenuItem key={ele.id} value={ele.id}>{ele.Name}</MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>



<Grid item xs={12} sm={6}>
  <FormControl fullWidth>
    <InputLabel>Mother</InputLabel>
    <Select
      name={checkboy ? "moms" : "parent"}
      label="Mother"
      value={checkboy ? data.moms : data.parent}
      onChange={handleChange}
    >
      {girl.map((ele) => (
        <MenuItem key={ele.id} value={ele.id}>{ele.Name}</MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>





          <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center',borderBottom:'1px solid black',width:'100%'}} py={1} ml={1.5}>
            <input
              id="image"
              name="image"
              label="Your Picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="success" sx={{justifyContent:'center',textAlign:'center',alignItem:'center'}}>
              Submit
            </Button>
          </Grid>
        </Grid>
        </form>
      </Box>

  );
}

export default Styledfield;




// import { motion, AnimatePresence } from "framer-motion";
// import React ,{useEffect , useState ,useRef } from 'react'
// import CancelIcon from '@mui/icons-material/Cancel';
// import {Box, TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
// import { makeStyles , styled , useTheme } from '@mui/styles';
// import style from '../src/styles/globals.module.css';
// import Form from "react-jsonschema-form";
// import axios from 'axios';



// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// function Styledfield() {
//     const [ap, setap] = useState([]);
//     const [parents, setParents] = useState([]);
//     const [mothers, setMothers] = useState([]);
//     const [wives, setWives] = useState([]);
//     const [data, setData] = useState({
//       Name: '',
//       SurName: '',
//       parent: '',
//       Mother: '',
//       Wife: '',
//     });
  
//     useEffect(() => {
//       axios.get('http://127.0.0.1:8000/media/boys/')
//         .then(response => {
//           setap(response.data);
//           // setap(JSON.stringify(response.data));
//           console.log("aap "+ap);
//         })
//         .catch(error => console.log(error));
//     }, []);
  
//     const handleSubmit = (event) => {
//       event.preventDefault();
//       axios.post('http://127.0.0.1:8000/media/bcreate/', data).then((response) => {
//         console.log("1"+response);
//       });
//     };
  
//     const handleChange = (event) => {
//       setData({ ...data, [event.target.name]: event.target.value });
//     };



//   return (
//   {/* 

//       <Box>
//           {
//             ap.map((ele) => {
//               return <option key={ele.id} value={ele.parent}>{ele.parent}</option>;
//             })
//           }
//       </Box>

//   );
// }

// export default Styledfield;
