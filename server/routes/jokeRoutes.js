import { Router } from "express";
import {getRandomJoke, getAllJokes, getJokeById, createJoke} from "../controllers/jokeController.js";

const router = Router();

router.get('/', getAllJokes)
router.get('/random', getRandomJoke);
router.get('/:id', getJokeById);
router.post('/', createJoke)

export default router;
