import wrapper from '../store/configure';
import '../styles/global.css';
import Head from 'next/head';

const App = ({ Component }) =>{
  return(
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel = "icon" href="/favicon.ico" />
        <title>JiGram</title>
      </Head>
      <Component />
    </>
  )
}

export default wrapper.withRedux(App);
