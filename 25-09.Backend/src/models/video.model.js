import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videofile: {
        type: String,      // cloudinary url of video
        required: [true, 'Video file is required'],
    },
    thumbnail: {
        type: String,    // cloudinary url of thumbnail
        required: [true, 'Thumbnail is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    duration: {
        type: Number,   // cloudinary url in seconds
        required: [true, 'Duration is required'],
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate);

const VideoModel = mongoose.model("Video", videoSchema);
export default VideoModel;