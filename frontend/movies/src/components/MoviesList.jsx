import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesDataService from "../services/moviesDataService";



class ListMovie extends Component
{
    
    constructor(props)
    {
        super(props)
  
        this.state = {
            movies: [],
            searchMovieTitle: ''
        }

        this.deleteMovie = this.deleteMovie.bind(this)
        this.refreshMovies = this.refreshMovies.bind(this)

    }
    

    refreshMovies()
    {
        MoviesDataService.getAll().then((response) => {
            this.setState({ movies: response.data });
        })
        .catch(e =>
        {
            alert('error: ' + e)
        });
    }

    componentDidMount()
    {
        this.refreshMovies()
    }
    

    deleteMovie(id)
    {
        MoviesDataService.delete(id).then(() => this.refreshMovies())
        .catch(e => 
        {
            alert('error: ' + e)
        }); 
    }

    
    render()
    {

        return (

            <div>
                <h2 className="text-center">Lista de Filmes</h2>
                <div >
                    <Link 
                        className="btn btn-primary mb-2"
                        style={{marginLeft: '-11px'}} 
                        to={"/movie/"}>Adicionar Filme
                    </Link>
                    <button 
                        className="btn btn-danger mb-2"
                        style={{marginLeft: '10px'}} 
                        onClick={() => this.deleteMovie()}
                        >Excluir Todos Os Filmes
                    </button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered" >
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Diretor</th>
                                <th className="col-2">Sinopse</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {            
                                this.state.movies.map(
                                    movie => 
                                    <tr key={movie.id}>
                                        <td className="col-3">{movie.title}</td>
                                        <td className="col-3">{movie.director}</td>
                                        <td className="col-4">{movie.synopsis}</td>
                                        <td>
                                            <Link 
                                                className="btn btn-primary" 
                                                to={"/movie/" + movie.id} >Editar
                                            </Link>
                                            <button 
                                                className="btn btn-danger" 
                                                style={{marginLeft: '10px'}}
                                                onClick={() => this.deleteMovie(movie.id)} >Excluir
                                            </button>
                                        </td>
                                    </tr>
                                )
                                
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
    
}

export default ListMovie