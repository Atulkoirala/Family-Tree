import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {AuthContext} from '../../component/option/AuthContext';
import axios from 'axios';



const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const { logoutUser, check } = useContext(AuthContext);
    const [bool,setbool] = useState(false);
    const [userdetails, setUserdetails] = useState([])


    
useEffect(() => {
  const checkAuth = async () => {
    try {
      const authToken = localStorage.getItem('accessToken');
      if (!authToken) {
        logoutUser();
        router.push('/home/login');
        setbool(false);
      } else {
        setbool(true);


        try {
          const res = await axios.get('http://127.0.0.1:8000/auth/usr/check/', {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          console.log(res.data);
          setUserdetails(res.data);
          // Handle the response as per your requirement
          console.log("BBBBB");
        } catch (error) {
          console.log("AAAAA");
            logoutUser();
            setbool(false);
            router.push('/home/login'); // Replace '/home/login' with the actual login page route
        }

      }
    } catch (error) {
      logoutUser();
      setbool(false);
      router.push('/home/login'); // Replace '/home/login' with the actual login page route
    }
  };

  checkAuth();
}, []);



    return <WrappedComponent {...props} userdetails={userdetails}/>;
  };

  return AuthenticatedComponent;
};

export default withAuth;