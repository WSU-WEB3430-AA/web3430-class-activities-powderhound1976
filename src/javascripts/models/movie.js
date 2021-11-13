import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let reviewSchema = new Schema({
	comment: String,
	postedAt: Date,
});

let movieSchema = new Schema({
	id: Number,
	title: String,
	plot: String,
	poster: String,
	rating: Number,
	votes: Number,
	genre: String,
	year: Number,
	imdbId: String,
	added_at: Date,
	updated_at: Date,
	reviews: [reviewSchema],
});

export let Movie = mongoose.model('Movie', movieSchema);
