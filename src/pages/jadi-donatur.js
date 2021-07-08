import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jadi Donatur Plasma Konvalesens</title>
        <meta name="description" content="Data Donor Plasma Konvalesens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Jadi Donatur Plasma Konvalesens</h1>
    </>
  );
}
