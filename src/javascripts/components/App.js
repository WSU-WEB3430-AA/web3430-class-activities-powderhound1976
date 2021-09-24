import React from 'react';
import MovieList from './Movie-list';

export default function Main() {
	return (
		<>
			<div className='container'>
				<header>
					<h1>Top 10 Movies</h1>
				</header>
				<MovieList />
			</div>
			<footer>&copy; All rights reserved</footer>
		</>
	);
}
