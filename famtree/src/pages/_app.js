import '@/styles/GlobalStyles.module.css'


import { AuthProvider } from '../../component/option/AuthContext';


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}