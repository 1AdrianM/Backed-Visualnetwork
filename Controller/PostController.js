const User = require("../Model/User");
const Post = require("../Model/Post");
const asyncHandler =  require('express-async-handler');
const { v2:cloudinary } = require('cloudinary')

const GetUserPosts = asyncHandler(async(req,res)=>{


})

const GetPost = asyncHandler(async(req, res)=>{
    const post = await Post.find().lean()
    if(!post?.length){
        return res.status(404).json({message:"No posts found"})
    }
    const PostWithUser = await Promise.all(post.map(async (post) => {
        const user = await User.findById(post.user).lean().exec()
        return { ...post, Username: user.Username}
    }))

    res.json(PostWithUser)
})
const DeletePost =asyncHandler(async (req,res)=>{

    const id = req.params.id
    if(!id){
        return res.status(400).json({msg:"No post ID provided"})
    }
    const post = await Post.findById(id)
    if(!post){
        return res.status(401).json({msg:"Post not found"})
    }
})

const CreatePost = asyncHandler(async (req, res)=>{

const {description, postedBy} = req.body

let{img} = req.body;

if( !description ||!postedBy || !img) return res.status(400).json({message:"Please fill the fileds"});

const user = await User.findById(postedBy);
		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}
if(img){
    response = await cloudinary.uploader.upload(img)
    img = response.secure_url
}
const MaxLength = 500
if (description.length > MaxLength) {
	return res.status(400).json({ message: `Description must be ${MaxLength} characters or less` })
}

const postObj = {description, postedBy, img }

try{
const post= await Post.create(postObj)
    return res.status(201).json({
        message:'post created successfully'})
}
 catch(err){
    console.log(err);
    return res.status(500).json({message:"failed to create the post"})  ;
   }
}
)

const likes_Handling = asyncHandler(async(req,res)=>{
try{
const {id:postId}= req.params
const {userId}= request.user?._id
const  post = await Post.findById(postId)
if(!post)return res.status(404).json('The post was not found')

const userLikes = post.likes.includes(userId)

if(userLikes) { 
await User.updateOne({id: postBy},{ $pull:{likes:userId}})
res.status(201).json({message:"Post has been un-liked."})
}else{
    await post.likes.push(userId)
    await post.save();
			res.status(200).json({ message: "Post liked successfully" });
}} catch(error){
console.log("Error in Liking a post", error);
res.status(400).json(`${error} Error`)
//check if user already liked the post

}
})
const bookmaks_handling = asyncHandler(async(req,res)=>{

try{
const {id:postId} = req.params
const {userId} = req.user_.id
const post = await Post.findById(postId)


if(!post){
    return res.status(400).json({message: 'The post is not available or not found'})
}
const isBookmarked= post.bookmarked.includes(userId)

if(isBookmarked){
   await Post.updateOne({id:postId},{ $pull:{bookmarked:userId}})
   res.json('This post has been removed from your Bookmarks')
}else
{
    await post.bookmarked.push(userId)
    res.json('This post has been added to your Bookmarks')
    post.save()
}}
catch(err){
    console.log(err)
}
})

const replyTo = asyncHandler(async(req,res)=>{
try{
    const{text} = req.body

    const {id} = req.params._id

    const{userProfilePic}= req.user.userProfilePic

    const{username} = req.user.username

    const {userId} = req.user_.id

if(!text) {

    return res.status(400).json({message:'Please enter a comment required'})
}

    const post = await Post.findById(id)
if(!post){

    return res.status(400).json({message:"Post does not exist"});
}

let  newComment={userId, text, userProfilePic, username, createdAt:Date.now()}

    await post.commentBy.push(newComment);
    await post.save();
res.json({...newComment,"reply":true})

}catch(error){
    console.log(error)
}

})


const deleteReply = asyncHandler(async(req,res)=> {
try{
    const {id:postId} = req.params

    const{commentId} = req.body

if(!postId || !commentId){
    return res.status(400).json({message:"No Post ID or Comment ID provided"})
}
const post = await Post.findById(postId);
if (!post) {
    return res.status(404).json({ message: "Post not found" });
}

const commentIndex = post.commentedBy.findIndex(comment => comment._id.toString() === commentId.toString());
if (commentIndex === -1) {
    return res.status(404).json({ message: "Comment not found" });
}

// Remove the comment from the array
post.commentedBy.splice(commentIndex, 1);
await post.save();
return res.status(200).json({ message: "Comment deleted successfully" });
} catch (error) {
console.log(error);
return res.status(500).json({ message: "Failed to delete comment" });
}
})
 
//const post = await Post.findById(postId)



module.exports ={
    DeletePost,
    CreatePost,
    likes_Handling,
    bookmaks_handling,
    GetPost,
    replyTo,
    deleteReply,
    GetUserPosts
}

/*const UpdatePost =asyncHandler(async (req,res)=> {

    const{description, postedBy} = req.body;

if(!description) return res.status(400).json({msg: "Please enter all fields. to change"});

const post = await Post.findById(postedBy)
if(!post){
    return res.status(404).json({ msg: 'No post with this id.' });
}
try{

description = post.description;
await post.save()

res.status(200).json({message:'Post updated succesfully'})
}catch(err){

    console.log(err);

    return res.sendStatus(500)
}
 })*/