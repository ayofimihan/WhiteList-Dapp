import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [numWhiteListedAddresses, setNumWhiteListedAddresses] = useState(0);
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
