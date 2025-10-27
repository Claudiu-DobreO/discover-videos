import Link from 'next/link';
import Card from './card';
import styles from './section-cards.module.css';

const SectionCards = ({ title, videos = [], size, shouldWrap=false, shouldScale=true }) => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={`${styles.cardWrapper} ${shouldWrap && styles.wrap}`}>
                {videos.map((video, index) => (
                    <Link key={index} href={`/video/${encodeURIComponent(video.id)}`}>
                        <Card id={index} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale} />
                    </Link>    
                ))}
            </div>
        </section>
    );
};

export default SectionCards;