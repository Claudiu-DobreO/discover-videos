import jwt from 'jsonwebtoken';
import { getVideoStatsByUserAndVideo, updateStats, insertStats } from '../../lib/db/hasura';

const stats = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const { videoId } = req.method === 'POST' ? req.body : req.query;

        if (!videoId) {
            return res.status(400).json({ message: 'Video ID is required' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.issuer;
        

        const videoStats = await getVideoStatsByUserAndVideo(userId, videoId, token);
        const hasStats = videoStats?.length > 0;

        if (req.method === 'POST') {
            const { favourited, watched = true } = req.body;
            
            if (hasStats) {
                // update stats
                const statResponse = await updateStats(token, { 
                    favourited, 
                    watched, 
                    userId,  
                    videoId 
                });

                if (statResponse.errors) {
                    return res.status(500).json({ done: false, message: 'Internal server error' });
                }

                const videoStats = statResponse.data.update_stats.returning[0];
                res.status(200).json({ data: videoStats });
            } else {
                // create stats
                const statResponse = await insertStats(token, { 
                    favourited, 
                    watched, 
                    userId, 
                    videoId 
                });
                
                if (statResponse.errors) {
                    return res.status(500).json({ done: false, message: 'Internal server error' });
                }

                const videoStats = statResponse.data.insert_stats.returning[0];
                res.status(200).json({ data: videoStats });
            }
        } else if (req.method === 'GET') {
            if (hasStats) {
                res.status(200).json(videoStats);
            } else {
                res.status(404).json({ data: null });
            }
        }
    } catch (error) {
        console.error('Something went wrong with the stats: ', error);
        return res.status(500).json({ done: false, message: 'Internal server error' });
    }
};

export default stats;