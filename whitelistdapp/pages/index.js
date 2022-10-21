import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Web3Modal from "web3modal";

export default function Home() {
  const [numWhiteListedAddresses, setNumWhiteListedAddresses] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false)
  const web3ModalRef = useRef();
  const connectWallet = async()=>{
    try{
      getProviderOrigner();
      setWalletConnected(true);
      checkIfWhiteListed();
      checkIfMaxedOut();
    } catch(err){
      console.error(err);
      console.log(err);

    }

  }
  useEffect(()=>{
    if(!walletConnected){
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    

    }

  },[walletConnected])


  return (
    <div>
      <Head>
        <title>
California Jacuzzi WL
        </title>
        <meta name='description' content='california-jacuzzi'></meta>
      </Head>
      <div className={styles.main}>
        <h1 className={styles.title}> California Jacuzzi</h1>
        <div className={styles.description}>
          {numWhiteListedAddresses} fuckers have been whitelisted, try your luck!
        </div>
        <div>
        <img className={styles.image} src='./dev.svg'/>
        </div>
      </div>
    </div>
  )
}
