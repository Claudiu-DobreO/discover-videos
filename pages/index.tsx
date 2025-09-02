import Head from "next/head";
import Navbar from '@/components/nav/navbar';
import Banner from "@/components/banner/banner";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Watch your favourite movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page}`}
      > 
        <Navbar username='claudu@claudiu.com' />
        
        <Banner  
          title='Clifford the red dog'
          subtitle='a very cute dog'
          imgUrl='/static/clifford.webp'
        />
        
        {/* 
        
        <Card /> */}
      </div>
    </>
  );
}
