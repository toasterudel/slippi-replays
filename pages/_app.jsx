import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import { UserAuthContextProvider } from "../firebase/userAuthContext";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <UserAuthContextProvider>
        <Component {...pageProps} />
      </UserAuthContextProvider>
    </>
  );
}

export default MyApp;
