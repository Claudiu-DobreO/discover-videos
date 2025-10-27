import Head from "next/head";
import Navbar from "@/components/nav/navbar";
import SectionCards from "@/components/card/section-cards";
import useRedirectUser from "@/utils/redirectUser";
import { getFavouritedVideos } from "@/lib/videos";
import styles from "@/styles/MyList.module.css";

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

    const myListVideos = await getFavouritedVideos(userId, token);
    return {
        props: {
            myListVideos: myListVideos || [],
        }
    }
};

const MyList = ({ myListVideos }) => {
    return (
        <div>
            <Head>
                <title>My List</title>
            </Head>

            <main className={styles.main}>
                <Navbar />
                <div className={styles.sectionWrapper}>
                    <SectionCards
                        title="My List"
                        videos={myListVideos}
                        size="small"
                        shouldWrap
                        shouldScale={false}
                    />
                </div>
            </main>          
        </div>
    );
};

export default MyList;