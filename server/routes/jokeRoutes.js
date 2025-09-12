import { Router } from "express";
import { getRandomJoke, getAllJokes} from "../controllers/jokeController.js";

const router = Router();

router.get('/', getAllJokes)
router.get('/random', getRandomJoke);

export default router;
