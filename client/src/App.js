import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditMovie from "./Movies/EditMovie";

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [editId, setId] = useState(null);
  let ID=null;

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const setIDS = id => {
    ID=id;
    console.log(ID);
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route path="/update-movie/:id" component={EditMovie} movieid={ID} {...props} />
      
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} setIdState={setIDS}/>;
        }}
      />
    </>
  );
};

export default App;
