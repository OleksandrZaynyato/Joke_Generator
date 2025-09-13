import { Router } from "express";
import {getRandomJoke, getAllJokes, createJoke} from "../controllers/jokeController.js";

const router = Router();

router.get('/', getAllJokes)
router.get('/random', getRandomJoke);
router.post('/', createJoke)

export default router;
