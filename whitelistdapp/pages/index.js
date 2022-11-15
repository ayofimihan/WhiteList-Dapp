import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { Contract, providers } from "ethers";
import { abi, CONTRACT_ADDRESS } from "../konstants";

export default function Home() {
  const [numOfWhiteListedAddresses, setNumOfWhiteListedAddresses] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  const [loading, setLoading] = useState(false);
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

      if ((needSigner = true)) {
        const signer = web3Provider.getSigner();
        return signer;
      }

      return web3Provider;
    } catch (err) {
      console.log(err);
    }
  };

  const addAddressToWhitelist = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
      const txn = await contract.addAddressToWhitelist();
      setLoading(true);
      await txn.wait();
      setLoading(false);
      await checkNumWhitelisted();
      setJoinedWhitelist(true);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfAddressWhitelisted = async () => {
    try {
      const signer = getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
      const address = await signer.getAddress();
      const _joinedWhitelist = await contract.whitelistedAddresses(address);
      setJoinedWhitelist(_joinedWhitelist);
    } catch (err) {
      console.log(err);
    }
  };

  const checkNumWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const contract = new Contract(CONTRACT_ADDRESS, abi, provider);
      const x = await contract.numAddressesWhitelisted();
      setNumOfWhiteListedAddresses(x);
    } catch (err) {
      console.log(err);
    }
  };

  const button = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        console.log(numOfWhiteListedAddresses);

        return (
          <div className={styles.description}>
            Thanks for joining the Whitelist!
          </div>
        );
      } else if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else {
        return (
          <button onClick={addAddressToWhitelist} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressWhitelisted();
      checkNumWhitelisted();
    } catch (err) {
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
          {numOfWhiteListedAddresses} fuckersm have been whitelisted.
        </div>
        <div>{button()}</div>
        <div>
          <img className={styles.image} src="./dev.png" />
        </div>
      </div>
    </div>
  );
}
