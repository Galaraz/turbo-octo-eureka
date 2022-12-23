import '../styles/globals.css'


// import Header from '../components/Header';
// import Footer from '../components/Footer'
// import WrapperStyle from '../components/WrapperStyle';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthProvider from '../context';
function MyApp({ Component, pageProps }) {

  return(
    <AuthProvider>
      {/* <Header/> */}
       <Component {...pageProps} />
      {/* <Footer/> */}
    </AuthProvider>
  )  

}

export default MyApp
