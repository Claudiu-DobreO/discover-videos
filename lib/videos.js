export const getCommonVideos = async (url) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    
    try {
        const BASE_URL = 'https://www.googleapis.com/youtube/v3';

        const response = await fetch(`${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`);
        const data = await response.json();

        if (data?.error) {
            console.error('YouTube api error: ',data.error);
            return [];
        }

        return data.items.map(video => {
            const id = video.id?.videoId || video.id;

            return {
                title: video?.snippet?.title,
                imgUrl: video?.snippet?.thumbnails?.high?.url,
                id,
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
}

export const getPopularVideos = (regionCode = 'US') => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=${regionCode}`;
    return getCommonVideos(URL);
}