
import React, { Component, useState } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import MoviesDataService from "../services/moviesDataService";



class MovieForm extends Component
{   
    constructor(props)
    {
        super(props)

        this.saveMovie = this.saveMovie.bind(this)

        this.state = {
            movieTitle: '',
            movieDirector: '',
            movieSynopsis: '',
            redirectURL: ''
        }

        let { movieId } = this.props.match.params

        //if it has a movie id on path
        if(movieId !== undefined)
        {
            MoviesDataService.get(movieId).then((response) =>{
                this.setState({
                    movieTitle: response.data['title'],
                    movieDirector: response.data['director'],
                    movieSynopsis: response.data['synopsis']
                })
            })
            .catch(e => {
                alert('error: ' + e)
            })
        }
    }

    saveMovie()
    {
        const movie = {
            title: this.state.movieTitle,
            director: this.state.movieDirector,
            synopsis: this.state.movieSynopsis
        }

        console.log("MOVIE => " + JSON.stringify(movie))

        let { movieId } = this.props.match.params
        if(movieId === undefined)
        {
            MoviesDataService.create(movie).then(this.setState({redirectURL: '/movies'}))
            .catch(e =>
            {
                alert('error: ' + e)
            })
        }

        else
        {
            MoviesDataService.update(movieId, movie).then((response) =>{
                if(response.status === 200)
                    this.setState({redirectURL: '/movies'})
            })
            .catch(e =>
            {
                alert('error: ' + e)
            })
        }

    }
 
    render()
    {
        if(this.state.redirectURL !== '')
            return <Navigate to={this.state.redirectURL}></Navigate>

        return (
            
            <div>
                <div className="container mt-3">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md">
                            <h2 className="text-center">Filme</h2>
                            <div className="card-body">
                                <form>
                                    <div>
                                        <label className="mb-1">Título:</label>
                                        <input 
                                            type="text"
                                            maxLength={255}
                                            placeholder="Título" 
                                            className="form-control" 
                                            defaultValue={this.state.movieTitle}
                                            onChange={(event) => this.setState({movieTitle: event.target.value})}>
                                        </input>  
                                    </div>
                                    <div className="mt-3">
                                        <label className="mb-1">Sinopse:</label>
                                        <input 
                                            maxLength={255}
                                            placeholder="Sinopse" 
                                            className="form-control" 
                                            defaultValue={this.state.movieSynopsis} 
                                            onChange={(event) => this.setState({movieSynopsis: event.target.value})} >
                                        </input>
                                    </div>
                                    <div className="mt-3">
                                        <label className="mb-1">Diretor:</label>
                                        <input 
                                            maxLength={255}
                                            placeholder="Diretor" 
                                            className="form-control" 
                                            defaultValue={this.state.movieDirector}
                                            onChange={(event) => this.setState({movieDirector: event.target.value})} >
                                        </input>
                                    </div>
                                </form>
                                <div className="mt-3">
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.saveMovie} >Salvar
                                    </button>
                                    <Link 
                                        to={'/movies'} 
                                        className="btn btn-warning" style={{marginLeft: '10px'}}>Voltar
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default MovieForm
