import { useRouter } from "next/router";
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';

Modal.setAppElement("#__next");

const Video = () => {
    const router = useRouter();
    const { videoId } = router.query;

    const video = {
        title: 'Clifford the red dog',
        publishedTime: '2021-01-01',
        description: 'A big red dog that is supper cute.  Can he get any bigger?',
        channelTitle: 'Paramount Pictures',
        viewCount: '100,000',
    };

    const { title, publishedTime, description, channelTitle, viewCount } = video;

    return (
        <div className={styles.container}>
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
                    frameborder="0">
                </iframe>

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