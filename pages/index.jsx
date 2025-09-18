import Head from "next/head";
import Navbar from '@/components/nav/navbar';
import Banner from "@/components/banner/banner";
import SectionCards from "@/components/card/section-cards";
import { getVideos, getPopularVideos } from "@/lib/videos";
import styles from "@/styles/Home.module.css";

export const getServerSideProps = async () => {
  const disneyVideos = await getVideos('disney cartoon trailers');
  const travelVideos = await getVideos('travel');
  const productivityVideos = await getVideos('productivity');
  const popularVideos = await getPopularVideos('US');

  return { props: { disneyVideos, travelVideos, productivityVideos, popularVideos }};
}

export default function Home({ disneyVideos, travelVideos, productivityVideos, popularVideos }) {
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
        <Navbar />
        
        <Banner  
          title='Clifford the red dog'
          subtitle='a very cute dog'
          imgUrl='/static/clifford.webp'
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title='Disney' videos={disneyVideos} size='large' />
          <SectionCards title='Travel' videos={travelVideos} size='small' />
          <SectionCards title='Productivity' videos={productivityVideos} size='medium' />
          <SectionCards title='Popular' videos={popularVideos} size='small' />
        </div>
        
      </div>
    </>
  );
}
