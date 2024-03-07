import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';






export default function Index() {
  const [post, setPost] = useState([]);
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem('accessToken');
  //       const response = await axios.get('http://127.0.0.1:8000/auth/usr/', {
  //         headers: { Authorization: `Bearer ${token}`, },
  //       });
  //       setPost(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const token = localStorage.getItem('accessToken');
    //     const responses = await axios.get('http://127.0.0.1:8000/media/fam/', {
    //       headers: { Authorization: `Bearer ${token}`, },
    //     });
    //     setPosts(responses.data);
    //     console.log(responses.data);
    //   } catch (error) {
    //     console.log('Error:', error);
    //   }
    // };

    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const formData = new FormData();
      formData.append('refresh', refreshToken);
  
      try{
        axios.post(`http://127.0.0.1:8000/auth/token/refresh/`, formData)
        .then((response) => {
          console.log(response.data);

          // Store the tokens in the localStorage
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);

          // window.location.reload();
        })
      }
      catch(error){
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ background: 'black', height: '100vh' }}>
      <h1 style={{ color: 'red' }}>Hello World</h1>
    </Box>
  );
}
