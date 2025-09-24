import { Router } from 'express';
import {
    getRandomJoke,
    getAllJokes,
    getJokeById,
    createJoke,
    updateJoke,
    deleteJoke, voteJoke
} from '../controllers/JokeController.js';
import {validate} from "../middlewares/validate.js";
import {jokeIdSchema} from "../validators/joke/jokeIdSchemaValidator.js";
import {createJokeSchema} from "../validators/joke/jokeCreateValidator.js";
import {jokeUpdateValidator} from "../validators/joke/jokeUpdateValidator.js";
import {jokeUpdateLikeSchema} from "../validators/joke/jokeUpdateLikeValidator.js";

const router = Router();

router.get('/', getAllJokes);
router.get('/random', getRandomJoke);
router.get('/:id', validate(jokeIdSchema), getJokeById);
router.post('/', validate(createJokeSchema), createJoke);
router.put('/:id', validate(jokeUpdateValidator), updateJoke);
router.delete('/:id', validate(jokeIdSchema), deleteJoke);
router.post('/:id/vote', validate(jokeUpdateLikeSchema), voteJoke);

export default router;
