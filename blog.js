import mongoose from require("mongoose")
const {model ,Scheema} = mongoose

const Blog = new Scheema(
    {
         title: String,
         category: String,
         isPublished: Boolean,
         content: String,
         tages: [String],
         comment: [
            {
                userName: String,
                userComment: String,
                userLike: Number

            }
         ]
    }
)

const BLOG = model("Blog" , Scheema) 

module.exports = BLOG;