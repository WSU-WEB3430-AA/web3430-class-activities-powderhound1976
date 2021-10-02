import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import StarRating from './StarRating'
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

export default function Movie(props) {
	const onLike = props.onLike;
	const m = props.movie;
	const history = useHistory();
  
	return (
		<div className='card'>
			<img src={m.poster} alt={m.title} />
			<h2>{m.title}</h2>
			<p>{m.plot}</p>
			<ul className='extra'>
				<li>
          {/* This is where it is breaking down */}
					{/* <StarRating selectedStars={m.rating} totalStars={5}/> */}
					<strong> {m.rating}</strong> rating
				</li>
				<li>
					<strong>{m.votes}</strong> votes
				</li>
				<li>
					<FaThumbsUp color='maroon' onClick={onLike} />
					<small> {m.likes ? m.likes : 0}</small>
				</li>
			</ul>
			<button className="primary" onClick={() => history.push(`/movies/${m.id}/edit`)}>Edit</button>
		</div>
	);

  
}
