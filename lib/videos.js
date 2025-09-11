export const getVideos = async (searchQuery) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxresult=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`);
        const data = await response.json();

        console.log('Data: ', data.items);

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