import React, { createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import jwt from 'jsonwebtoken';





export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  // const [authTokens, setAuthTokens] = React.useState(null);
  const [check, setCheck] = React.useState(null);
  const [usercheck,setusercheck] = React.useState([]);
  let [loading, setLoading] = React.useState(true)
  const [errorhand, setErrorhand] = React.useState('');
  // const [userdetails, setUserdetails] = React.useState([]);




  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem('accessToken');
  //       const responses = await axios.get('http://127.0.0.1:8000/auth/usr/check/',{
  //         headers: { Authorization: `Bearer ${token}`, },
  //       });
  //       setusercheck(responses.data);
        
  //       console.log(responses.data);
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }
  //   }
  //   fetchData();
  // },[]);


  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(`http://127.0.0.1:8000/auth/token/`, {
        'email': event.target.email.value,
        'password': event.target.password.value
      });
  
      console.log(response.data);
      const accessToken = response.data.access;
      const decodedToken = jwt.decode(accessToken);
      const username = decodedToken.username;
  
      console.log("AAA" + username);
  
  
      // Store the tokens in the localStorage
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      console.log("AAA" + check);
      console.log("BBBB" + username);
      console.log("CCC" + accessToken);

      alert("You are Signined, Wait for a few minutes....");
      setTimeout(() => {
        router.push('/home');
      }, 3000);
      
      // window.location.reload();
      // userfunc();
    } catch (error) {
      console.log(error);
      alert("Incorrect email or Password");
    }
  };

  const logoutUsers = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const refreshTokenExpiration = localStorage.getItem('refreshTokenExpiration');
  
    // Check if the refresh token and its expiration are present
    if (refreshToken && refreshTokenExpiration) {
      const currentTimestamp = Date.now();
      const expirationTimestamp = parseInt(refreshTokenExpiration);
  
      // Check if the refresh token has expired
      if (currentTimestamp > expirationTimestamp) {
        // Remove tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        // Redirect to the login page
        router.push('/home/login');
      }
    }
  };


  const logoutUser = () => {
        // Remove tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
  };


  useEffect(()=>{
    logoutUsers();
  },[])
  
  // const userfunc = () =>{
  //   try {
  //         const authToken = localStorage.getItem('accessToken');
  //         const res = axios.get('http://127.0.0.1:8000/auth/usr/check/', {
  //           headers: { Authorization: `Bearer ${authToken}` },
  //         });
  //         // console.log(res.data);
  //         // Handle the response as per your requirement
  //         console.log("BBBBB");
  //         setUserdetails(res.data);
  //         console.log(userdetails);

  //       } catch (error) {
  //         console.log("AAAAA");
  //         logoutUser();
  //       }
  // }
  

  // const logoutUser = () => {
  //   localStorage.removeItem('accessToken');
  //   localStorage.removeItem('refreshToken');
  //   router.push('/home/login');
  // };
  
  // let updateToken = async () => {
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   const formData = new FormData();
  //   formData.append('refresh', refreshToken);
  
  //   try {
  //     const response = await axios.post(`http://127.0.0.1:8000/auth/token/refresh/`, formData);
  //     console.log(response.data);
  
  //     if (response.status === 200) {
  //       localStorage.setItem('accessToken', response.data.access);
  //       localStorage.setItem('refreshToken', response.data.refresh);
  //       console.log("Access token updated: " + response.data.access);
  //       console.log("Refresh token updated: " + response.data.refresh);
  //     } else {
  //       logoutUser();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     logoutUser();
  //   }
    
  //   if (loading) {
  //     setLoading(false);
  //   }
  // };
  
  
  // useEffect(() => {
  //   if (loading) {
  //     updateToken();
  //   }
  //   const fourMinutes = 4 * 60 * 1000;
  //   const interval = setInterval(() => {
  //     updateToken();
  //   }, fourMinutes);
  
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  let contextData = {
    // updateToken: updateToken,
    logoutUser: logoutUser,
    check: check,
    usercheck: usercheck,
    handleLogin: handleLogin,
    // userdetails:userdetails
  }
  

  return (
    <AuthContext.Provider value={contextData}>
      {children}
      {/* {authTokens ? children : null} */}
    </AuthContext.Provider>
  );
};
