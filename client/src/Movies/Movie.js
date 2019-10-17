import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleEdit = (id) => {
    this.props.setIdState(id);
    this.props.history.push(`/update-movie/${id}`);
  }

  handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(() => {this.props.history.push(`/`);})
    .catch(e => {console.log(e)});
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="save-button2" movie={this.state.movie} onClick={() => this.handleEdit(this.state.movie.id)}>
          Edit
        </div>
        <div className="save-button3" movie={this.state.movie} onClick={() => this.handleDelete(this.state.movie.id)}>
          Delete
        </div>
      </div>
    );
  }
}
