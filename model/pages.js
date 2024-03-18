import mongoose from "mongoose";

const pageSchema =  mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required:true
    },
    isdraft : {
        type: Boolean,
        required:true
    },
    ishide:{
        type: Boolean,
        required:true
    },
    publishDate:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, 
      },
}); 

const Pages = mongoose.model("Pages", pageSchema);

export default Pages;
