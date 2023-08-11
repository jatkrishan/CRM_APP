const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const blogSchema = new Schema(
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

const Blog = model("Blogs" ,blogSchema) 

module.exports =  Blog;