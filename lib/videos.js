import videoData from '../data/videos.json';

export const getVideos = () => {
    return videoData.items.map(video => ({
        title: video?.snippet?.title,
        imgUrl: video?.snippet?.thumbnails?.high?.url,
        id: video?.id?.videoId,
    }));
};