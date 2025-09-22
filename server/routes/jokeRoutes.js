import { Router } from 'express';
import {
    getRandomJoke,
    getAllJokes,
    getJokeById,
    createJoke,
    updateJoke,
    deleteJoke
} from '../controllers/JokeController.js';

const router = Router();

router.get('/', getAllJokes);
router.get('/random', getRandomJoke);
router.get('/:id', getJokeById);
router.post('/', createJoke);
router.put('/:id', updateJoke);
router.delete('/:id', deleteJoke);

export default router;
