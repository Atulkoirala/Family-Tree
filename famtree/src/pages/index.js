import * as React from 'react';
import dynamic from 'next/dynamic';
import { AuthContext } from '../../component/option/AuthContext';
import  withAuth  from '../pages/withAuth';



const HomePage = () => {

    const { authTokens } = React.useContext(AuthContext);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
};

export default HomePage;