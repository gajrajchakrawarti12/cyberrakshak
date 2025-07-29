import express from 'express';
import Video from '../models/Video.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
