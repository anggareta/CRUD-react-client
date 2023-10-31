import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMoviewList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      //console.log(response.data);
      setMoviewList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review
    });

    setMoviewList([
      ...movieReviewList,
      { movie_name: movieName, movie_review: review }
    ])
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview
    });

    setNewReview('');
  }

  return (
    <div className="App">
      <h1 id='ttt'>CRUD Application</h1>

      <div className="form">
        <label htmlFor="movieName">Movie Name</label>
        <input type="text" id="movieName" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }}></input>
        <label htmlFor="review">Review</label>
        <input type="text" id="review" name="review" onChange={(e) => {
          setReview(e.target.value)
        }}></input>

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val, id) => {

          return (
            <div className="card" key={id}>
              <h1>{val.movie_name}</h1>
              <p>{val.movie_review}</p>
              <button onClick={() => { deleteReview(val.movie_name) }}>Delete</button>
              <input type='text' id={id} className="updateInput" onChange={(e) => {
                setNewReview(e.target.value);
              }} />
              <button onClick={() => { updateReview(val.movie_name) }}>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
