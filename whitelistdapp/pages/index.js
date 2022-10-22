import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { providers } from "ethers";

export default function Home() {
  const [numWhiteListedAddresses, setNumWhiteListedAddresses] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const { chainId } = await web3Provider.getNetwork();
      console.log(chainId);
      if (chainId !== 5) {
        alert("switch to goerli fam");
      }

      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }

      return web3Provider;
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressWhitelisted();
      checkNumWhitelisted();
    } catch (err) {
      console.error(err);
      console.log(err);
    }
  };
  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div>
      <Head>
        <title>California Jacuzzi WL</title>
        <meta name="description" content="california-jacuzzi"></meta>
      </Head>
      <div className={styles.main}>
        <h1 className={styles.title}> California Jacuzzi</h1>

        <div className={styles.description}>
          {numWhiteListedAddresses} fuckers have been whitelisted, try your
          luck!
        </div>
        <div>
          <img className={styles.image} src="./dev.svg" />
        </div>
      </div>
    </div>
  );
}
