// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i);
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i);
require.context('../stylesheets/', true, /\.(css|scss)$/i);

//TODO - Your ES6 JavaScript code (if any) goes here
import React from 'react';
import ReactDOM from 'react-dom';

import { movies } from './movies';

class Main extends React.Component {
	render() {
		return <MovieList movies={movies} />;
	}
}

class MovieList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { movies: this.props.movies };
		this.sortMovies = this.sortMovies.bind(this);
	}

	sortMovies() {
		this.state.movies.sort((a, b) => {
			return a.rating - b.rating;
		});
		this.setState({
			movies: this.state.movies,
		});
	}

	render() {
		return (
			<div className='container'>
				<header>
					<h1>Top 10 Movies: Chris Reynolds</h1>
				</header>
				<nav>
					<ul>
						<li>Home</li>
						<li>List</li>
						<li>About</li>
					</ul>
					<button className='primary' onClick={this.sortMovies}>
						Sort
					</button>
				</nav>
				<main>
					{this.state.movies.map(m => {
						return <Movie key={m.id} movie={m} />;
					})}
				</main>
			</div>
		);
	}
}

function Movie(props) {
	const m = props.movie;
	return (
		<div className='card'>
			<img src={m.poster} alt={m.title} />
			<h2>{m.title}</h2>
			<p>{m.plot}</p>
			<ul className='extra'>
				<li>
					<strong>{m.rating}</strong> rating
				</li>
				<li>
					<strong>{m.votes}</strong> votes
				</li>
				<li>
					<button className='primary'>Select</button>
				</li>
			</ul>
		</div>
	);
}
ReactDOM.render(<Main />, document.getElementById('main'));
