import { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const TentangKonvalesens = () => {
  return (
    <>
      <Head>
        <title>Apa Itu Donor Plasma Konvalesens</title>
        <meta name="description" content="Data Donor Plasma Konvalesens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Apa Itu Donor Plasma Konvalesens</h1>
      <div className="text-center">
        <Image
          src="/assets/tentang-donor-plasma-konvalesens.jpg"
          alt="Tentang Donor Plasma Konvalesens"
          width={590}
          height={600}
          layout="intrinsic"
        />
      </div>
    </>
  );
};
export default TentangKonvalesens;
