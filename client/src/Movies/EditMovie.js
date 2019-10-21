import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosWithAuth from './axios';
import { getDiffieHellman } from 'crypto';

const EditMovie = props => {
  const [ movie, setMovie ] = useState([])
  const id=props.match.params.id;
  
    useEffect(() => {
      if(id!==null)getMovies();
    }, [])

  const getMovies = () => {
    axiosWithAuth().get(
      `http://localhost:5000/api/movies/${id}`
    ).then(res => {
      setMovie(res.data)
    }).catch(e => console.log(e));
  }
  let starsArray=[];
  const UpdateMovie = ({ id, title, director, metascore, stars }) => {
    console.log(id);
    
    console.log(starsArray);
    if(id!==null && id!==undefined){
      axiosWithAuth().put(
        `http://localhost:5000/api/movies/${id}`,
        { id, title, director, metascore, stars },
      )
        .then(() => {
          props.history.push(`/movies/${id}`)
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      starsArray = stars.split(',');
      axiosWithAuth().post(
        `http://localhost:5000/api/movies`,
        { title, director, metascore, stars: starsArray },
      )
        .then((res) => {
          console.log(res);
          props.history.push(`/`)
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className="save-wrapper">
      <Formik
          // 6- Mmm. we need a special prop to re-mount the Formik
          // component whenever the `currentQuoteId` changes
          // 7- We need some validation so the form can't go out empty.
          key={movie}
          //validate={validate}
          initialValues={{
            title: movie.title,
            director: movie.director,
            metascore: movie.metascore,
            stars: movie.stars,
          }}
          onSubmit={({ title, director, metascore, stars }) => {
            console.log({ title, director, metascore, stars })
            UpdateMovie({
              id: id,
              title,
              director,
              metascore,
              stars,
            });
          }}
          render={() => (
            <Form>
              <Field name='title' />
              <ErrorMessage name='title' component='span' />

              <Field name='director' />
              <ErrorMessage name='director' component='span' />

              <Field name='metascore' />
              <ErrorMessage name='metascore' component='span' />

              <Field name='stars' />
              <ErrorMessage name='stars' component='span' />

              <input type='submit' />
            </Form>
          )}
        />
    </div>
  );
};

export default EditMovie;
