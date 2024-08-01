const express=require('express')
const {createpost,getapost,deletepost,likingpost,replaytopost,feedpost,deletereplay}=require('../Controller/post')

const {userauth}=require('../Middleware/userauth')
const postRouter=express.Router()
postRouter.post('/create',userauth,createpost)
postRouter.get('/getpost/:id',userauth,getapost)
postRouter.delete('/delete/:id',userauth,deletepost)
postRouter.post('/likepost/:id',userauth,likingpost)
postRouter.post('/replay/:id',userauth,replaytopost)
postRouter.get('/feed',userauth,feedpost)
postRouter.get('/deletereplay/:postid',userauth,deletereplay)
module.exports=postRouter