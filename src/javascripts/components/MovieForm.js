import React, { useContext, useState } from 'react';
import { MovieContext } from './Movie-list';
import { useHistory, useParams } from 'react-router';
import { setYear } from 'date-fns';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export function VHelp({ message }) {
	return <p className='help'>{message}</p>;
}
export default function MovieForm() {
	let { movies, setMovies } = useContext(MovieContext);
	let { mid } = useParams();

	let movie = mid ? movies.find(m => m.id == mid) : {};
	let is_new = mid === undefined;
	let { handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: is_new
			? {
					title: '',
					year: new Date().getFullYear(),
					rated: '',
					genre: '',
					plot: '',
					poster: '',
					rating: '',
					votes: '',
					imdbID: '',
					reviews: '',
			  }
			: { ...movie },
		validate(values) {
			let errors = {};
			if (
				!values.year ||
				values.year < 1900 ||
				values.year > new Date().getFullYear()
			)
				errors.year = 'Year is required between 1900 and current year';
			if (!values.title) errors.title = 'Title is required';
			if (!values.year) errors.year = 'Year is required';
			if (!values.rated) errors.rated = 'rated is required';
			if (!values.genre) errors.genre = 'genre is required';
			if (!values.poster) errors.poster = 'poster is required';
			if (!values.plot) errors.plot = 'plot is required';
			if (!values.rating) errors.rating = 'rating is required';
			if (!values.votes) errors.votes = 'votes is required';
			if (!values.imdbID) errors.imdbID = 'imdbID is required';
			if (!values.reviews) errors.reviews = 'reviews is required';

			return errors;
		},
		onSubmit(values) {
			if (is_new) {
				let id = movies.length;
				while (true) {
					let mv = movies.find(m => m.id == id++);
					if (mv === undefined) break;
				}

				values.id = id;
				movies.push(values);
			} else {
				let mv = movies.find(m => m.id == movie.id);
				Object.assign(mv, values);
			}

			setMovies([...movies]);
			history.push('/movies');
      toast(is_new ? "Successfully added" : "Successfully updated")
		},
	});

	const history = useHistory();

	return (
		<form onSubmit={handleSubmit}>
			<h1>Adding/Editing a movie</h1>

			<div className='field'>
				<label htmlFor='title'>Title</label>
				<div className='control'>
					<input
						type='text'
						name='title'
						value={values.title}
						onChange={handleChange}
					/>
					<VHelp message={errors.title} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='title'>Year</label>
				<div className='control'>
					<input
						type='text'
						name='year'
						value={values.year}
						onChange={handleChange}
					/>
					<VHelp message={errors.year} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='title'>Rated</label>
				<div className='control'>
					<input
						type='text'
						name='rated'
						value={values.rated}
						onChange={handleChange}
					/>
					<VHelp message={errors.rated} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='title'>Genre</label>
				<div className='control'>
					<input
						type='text'
						name='genre'
						value={values.genre}
						onChange={handleChange}
					/>
					<VHelp message={errors.genre} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='title'>Poster</label>
				<div className='control'>
					<input
						type='text'
						name='poster'
						value={values.poster}
						onChange={handleChange}
					/>
					<VHelp message={errors.poster} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='plot'>Plot</label>
				<div className='control'>
					<textarea
						name='plot'
						value={values.plot}
						onChange={handleChange}></textarea>
					<VHelp message={errors.plot} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='rating'>Rating</label>
				<div className='control'>
					<input
						type='text'
						name='rating'
						value={values.rating}
						onChange={handleChange}
					/>
					<VHelp message={errors.rating} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='votes'>Votes</label>
				<div className='control'>
					<input
						type='text'
						name='votes'
						value={values.votes}
						onChange={handleChange}
					/>
					<VHelp message={errors.votes} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='imdbID'>IMDB ID</label>
				<div className='control'>
					<input
						type='text'
						name='imdbID'
						value={values.imdbID}
						onChange={handleChange}
					/>
					<VHelp message={errors.imdbID} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='reviews'>Reviews</label>
				<div className='control'>
					<input
						type='array'
						name='reviews'
						value={values.reviews}
						onChange={handleChange}
					/>
					<VHelp message={errors.reviews} />
				</div>
			</div>

			<div className='field'>
				<label></label>
				<div className='control'>
					<button type='submit' className='primary'>
						Submit
					</button>
					<button
						className='primary'
						onClick={() => history.push('/movies')}>
						Cancel
					</button>
				</div>
			</div>
		</form>
	);
}
