import Comment from "../models/CommentsSchema.js";
import Post from "../models/PostsSchema.js";

export const getComments = async (req,res)=>{
    try {
        const comments = await Comment.find({
            post: req.params.postId,
        }).populate('post',{title:1, _id:0})
        res.send({
            dati: comments,
        })
    } catch (error) {
        res.status(404).send({message: 'Not Found'})
    }  
}

export const getSingleComment = async (req,res)=>{
    try {
        const singleComment = await Comment.findOne({post: req.params.postId, _id: req.params.commentId})
        return res.status(200).send(singleComment) 
    } catch (error) {console.log(error)
       return res.status(404).send({message: 'Not Found'}) 
    } 
}

export const createComment = async (req,res)=>{   
    const postId = req.params.postId
    const commentInfo = req.body
    try {
        const newComment = new Comment ({...commentInfo, post: postId})
        const createdComment = await newComment.save()
        res.status(200).send(createdComment)
    } catch (error) {
        res.status(400).send(error)
    }  
}

export const editComment = async (req,res) =>{
    try {
        //verifico che il commento esista
        const comment = await Comment.exists({_id:req.params.commentId})
        if(comment){
            const singleComment = await Comment.findOneAndUpdate(
                {post: req.params.postId, _id: req.params.commentId},
                {$set: req.body},
                {new: true}
            )
        return res.status(200).send(singleComment)
        }else {return res.status(404).send({message: 'Comment not found'})}     
    } catch (error) {
        res.status(400).send(error)
    }
}

export const deleteComment = async(req,res) =>{
    try {
        //verifico che il commento esista
        const comment = await Comment.exists({_id:req.params.commentId})
        if(comment){
            //elimino il commento
            const singleComment = await Comment.findOneAndDelete(
                {post: req.params.postId, _id: req.params.commentId}
            )
            //invio risposta di successo
            return res.status(200).send(`ho eliminato il commento con id: ${req.params.commentId}`)
        }else {
            //se il commento non esiste, resituisce errore 404
            return res.status(404).send({message: 'Comment not found'})}
    } catch (error) {
        res.status(400).send(error)
    }
}