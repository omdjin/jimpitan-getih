import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>Donor Plasma Konvalesens</h1>

      <p className={styles.description}>Plasma anda selamatkan nyawa mereka!</p>

      <div className={styles.grid}>
        <Link href="/jadi-donatur">
          <a className={styles.card}>
            <h2>Jadi Donatur &rarr;</h2>
            <p>Daftarkan diri anda untuk jadi donatur Plasma Konvalesens.</p>
          </a>
        </Link>
        <Link href="/request-plasma">
          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Request &rarr;</h2>
            <p>Ajukan kebutuhan Plasma Konvalesens!</p>
          </a>
        </Link>
      </div>
    </>
  );
}
