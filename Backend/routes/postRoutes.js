import express from 'express'
import { addPost, getPosts, deletePost, updatePost } from '../controllers/postController.js';

const router = express.Router();

// GET ALL POST
router.get('/', getPosts )

// ADD A NEW POST
router.post('/', addPost )

// DELETE A POST
router.delete('/:id', deletePost )

// UPDATE A POST
router.put('/:id', updatePost)

export {router as postRoutes}
