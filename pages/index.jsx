import Head from "next/head";
import Navbar from '@/components/nav/navbar';
import Banner from "@/components/banner/banner";
import SectionCards from "@/components/card/section-cards";
import { getVideos, getPopularVideos, getWatchItAgainVideos } from "@/lib/videos";
import useRedirectUser from "@/utils/redirectUser";
import styles from "@/styles/Home.module.css";

export const getServerSideProps = async (context) => {
  const { userId, token } = useRedirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const watchedVideos = await getWatchItAgainVideos(userId, token);
  const disneyVideos = await getVideos('disney cartoon trailers');
  const travelVideos = await getVideos('travel');
  const productivityVideos = await getVideos('productivity');
  const popularVideos = await getPopularVideos('US');

  return { props: { disneyVideos, travelVideos, productivityVideos, popularVideos, watchedVideos } };
};

export default function Home({ disneyVideos, travelVideos, productivityVideos, popularVideos, watchedVideos }) {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Watch your favourite movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page}`}> 
        <Navbar />
        
        <Banner 
          videoId="4zH5iYM4wJo" 
          title='Clifford the red dog'
          subtitle='a very cute dog'
          imgUrl='/static/clifford.webp'
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title='Disney' videos={disneyVideos} size='large' />
          <SectionCards title='Watch It Again' videos={watchedVideos} size='small' />
          <SectionCards title='Travel' videos={travelVideos} size='small' />
          <SectionCards title='Productivity' videos={productivityVideos} size='medium' />
          <SectionCards title='Popular' videos={popularVideos} size='small' />
        </div>
        
      </div>
    </>
  );
}
