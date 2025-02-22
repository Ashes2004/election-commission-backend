import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }, 
    date: { type: String, required: true }
});

const News = mongoose.model("News", newsSchema);
export default News;
