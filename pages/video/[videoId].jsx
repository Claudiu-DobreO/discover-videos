import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Modal from 'react-modal';
import NavBar from "@/components/nav/navbar";
import Like from "@/components/icons/like-icon";
import DisLike from "@/components/icons/dislike-icon";
import { getVideoById } from "@/lib/videos";
import styles from '../../styles/Video.module.css';

Modal.setAppElement("#__next");

export const getStaticProps = async (context) => {
    const videoId = context.params.videoId;
    const videoArray = await getVideoById(videoId);

    return {
        props: { video: videoArray.length > 0 ? videoArray[0] : {} },
        revalidate: 10,
    };
};

export const getStaticPaths = async () => {
    const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];

    const paths = listOfVideos.map((videoId) => ({
        params: { videoId },
    }));
    
    return {
        paths,
        fallback: 'blocking',
    };
};

const Video = ({ video }) => {
    const router = useRouter();
    const { videoId } = router.query;

    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    const { title, publishedTime, description, channelTitle, viewCount = 0 } = video;

    useEffect(() => {
        const fetchStats = async () => {
            const response = await fetch(`/api/stats?videoId=${videoId}`);
            const data = await response.json();

            if (data.length > 0) {
                setLike(data[0].favourited === 1);
                setDislike(data[0].favourited === 0);
            }
        };
        fetchStats();
    }, [videoId]);

    const runRatingService = async (videoId, favourited) => {
        const response = await fetch('/api/stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ videoId, favourited }),
        });

        return await response.json();
    };


    const handleToggleLike = async () => {
        const val = !like; 
        setDislike(like);
        setLike(val);

        const favourited = val ? 1 : 0

        const data = await runRatingService(videoId, favourited);
    };

    const handleToggleDislike = async () => {
        const val =  !dislike;
        setLike(dislike);
        setDislike(val);

        const favourited = val ? 0 : 1;
        const data = await runRatingService(videoId, favourited);
    };
    
    return (
        <div className={styles.container}>
            <NavBar />
            <Modal
                isOpen={true}
                contentLabel="Example Modal"
                onRequestClose={() => router.back()}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <iframe 
                    id="player" 
                    className={styles.videoPlayer}
                    type="text/html" 
                    width="100%" 
                    height="390"
                    src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com$controls=0&autoplay=0&rel=1`}
                    frameBorder="0">
                </iframe>

                <div className={styles.likeDislikeBtnWrapper}>
                    <button onClick={() => handleToggleLike()}>
                        <div className={styles.btnWrapper}>
                            <Like selected={like} />
                        </div>
                    </button>
                    <button onClick={() => handleToggleDislike()}>
                        <div className={styles.btnWrapper}>
                            <DisLike selected={dislike} />
                        </div>
                    </button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishTime}>{publishedTime}</p>
                            <p className={styles.title}>{title}</p>
                            <p className={styles.description}>{description}</p>
                        </div>
                        <div className={styles.col2}>
                            <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                                <span className={styles.textColour}>Cast: </span>
                                <span className={styles.channelTitle}>{channelTitle}</span>
                            </p>
                            <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                                <span className={styles.textColour}>Views: </span>
                                <span className={styles.channelTitle}>{viewCount}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Video;