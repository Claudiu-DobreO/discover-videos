import videoTestData from '../data/videos.json';
import { getUserWatchedVideos } from './db/hasura';

const fetchVideos = async (url) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    const BASE_URL = 'https://www.googleapis.com/youtube/v3';

    const response = await fetch(`${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`);
    return await response.json();
}

export const getCommonVideos = async (url) => {
    const isDev = process.env.DEVELOPMENT;
    
    try {
        const data = isDev ? videoTestData : await fetchVideos(url);

        if (data?.error) {
            console.error('YouTube api error: ',data.error);
            return [];
        }

        return data.items.map(video => {
            const id = video.id?.videoId || video.id;

            return {
                title: video?.snippet?.title,
                imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
                id,
                description: video?.snippet?.description,
                channelTitle: video?.snippet?.channelTitle,
                viewCount: video?.statistics ? video?.statistics?.viewCount : '0',
                publishedTime: video?.snippet?.publishedAt,
            }
        });
    } catch (error) {
        console.error('Something went wrong.  Could not get videos: ', error);
        return [];
    }
};

export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&type=video&q=${searchQuery}`
    return getCommonVideos(URL);
};

export const getPopularVideos = (regionCode = 'US') => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=${regionCode}`;
    return getCommonVideos(URL);
};

export const getVideoById = (videoId) => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
    return getCommonVideos(URL);
};

export const getWatchItAgainVideos = async (userId, token) => {
    const watchedVideos = await getUserWatchedVideos(userId, token);
    return watchedVideos.map((video) => ({
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    }));
};