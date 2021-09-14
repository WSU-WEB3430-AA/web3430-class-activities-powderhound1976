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
		return <MovieList movies= {movies} />;
	}
}

class MovieList extends React.Component {
	render() {
		return (
			<div className='container'>
				<header>
					<h1>Top 10 Movies</h1>
				</header>
				<nav>
					<ul>
						<li>Home</li>
						<li>List</li>
						<li>About</li>
					</ul>
				</nav>
				<main>
					{this.props.movies.map(m => {
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
