import mongoose from "mongoose";
import Post from "../models/PostModel.js";

/***********************GET ALL POST***************************/

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({error: error.msg })
    }
}

/***********************CREATE NEW POST************************/

const addPost = async (req, res) => {
    
    const { title, body } = req.body
    if (!title || !body) {
        return res.status(400).json({ msg: "Missing fields" })
    }
    try {   
        const post = await Post.create({ title, body})
        res.status(200).json({msg: 'Post request received'})
        await post.save()
    }
    catch (error) {
        res.status(500).json({error: error.msg })
    }
}

/***********************DELETE POST************************/

const deletePost = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({error: "Incorrect Id"})
    }

    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(400).json({ msg: "Post not found" })
    }
    
    try {
        await Post.deleteOne();
        res.status(200).json({msg: 'Post was deleted.'})
    }
    catch(error) {
        res.status(500).json({error: error.msg })
    }
}

/***********************UPDATE POST************************/

const updatePost = async (req, res) => {
    const { title, body } = req.body
    if (!title || !body) {
        return res.status(400).json({ msg: "Missing fields" })
    }
    // Get the data from the field of the form
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({error: "Incorrect Id"})
    }
    const post = await Post.findById(req.params.id);
    
    if(!post){
        return res.status(400).json({ msg: "Post not found" })
    }

    try {
        await Post.updateOne({title, body});
        res.status(200).json({msg: 'Post was updated.'})
    } catch (error) {
        res.status(500).json({error: error.msg })
    }
}

export { getPosts, addPost, deletePost, updatePost}