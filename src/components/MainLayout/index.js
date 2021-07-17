import Head from 'next/head';
import Image from 'next/image';
import { Container, Navbar } from 'react-bootstrap';
import TopNav from '@/components/Navigation/Top';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <TopNav />
      <Container>
        <Head>
          <title>Data Donor Plasma Konvalesens</title>
          <meta name="description" content="Data Donor Plasma Konvalesens" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>{children}</main>
        <Navbar fixed="bottom" className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer">
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </Navbar>
      </Container>
    </>
  );
};

export default Layout;
