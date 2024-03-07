import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {AuthContext} from '../../component/option/AuthContext';
import axios from 'axios';



const withAuthentication = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const { logoutUser, check } = useContext(AuthContext);
    const [bool,setbool] = useState(false);
    const [userdetails, setUserdetails] = useState([])


    
useEffect(() => {
  const checkAuth = async () => {
    try {
      const authToken = localStorage.getItem('accessToken');
      if (authToken) {
        router.push('/home');
        try {
          const res = await axios.get('http://127.0.0.1:8000/auth/usr/check/', {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          console.log(res.data);
          setUserdetails(res.data);
          router.push('/home');
          // Handle the response as per your requirement
          console.log("BBBBB");
        } catch (error) {
          console.log("AAAAA");
        }
      }
        else {

      }
    } catch (error) {
      console.log(error);
    }
  };

  checkAuth();
}, []);



    return <WrappedComponent {...props} userdetails={userdetails}/>;
  };

  return AuthenticatedComponent;
};

export default withAuthentication;