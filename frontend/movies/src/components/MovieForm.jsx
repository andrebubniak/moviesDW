import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MoviesDataService from "../services/moviesDataService";


function MovieForm()
{
    const [movieTitle, setMovieTitle] = useState('')
    const [movieSynopsis, setMovieSynopsis] = useState('')
    const [movieDirector, setMovieDirector] = useState('')

    let { movieId } = useParams()
    let navigate = useNavigate()

    useEffect(() =>{
        
        async function fetchData()
        {
            //if it has a movie id on path
            if(movieId !== undefined)
            {
                await MoviesDataService.get(movieId).then((response) =>{
                    setMovieTitle( response.data['title'] )
                    setMovieSynopsis( response.data['synopsis'] )
                    setMovieDirector( response.data['director'] )
                })
                .catch(e => {
                    alert('error: ' + e)
                })
            }
        }

        fetchData()

    }, [movieId])
    

    let saveMovie = async () => 
    {
        const movie = {
            title: movieTitle,
            director: movieDirector,
            synopsis: movieSynopsis
        }

        if(movieId === undefined)
        {
            try
            {
                await MoviesDataService.create(movie)
                navigate('/movies')
            }
            catch(e)
            {
                alert('error: ' + e)
            }           
        }

        else
        {
            try
            {
                await MoviesDataService.update(movieId, movie)
                navigate('/movies')
            }
            catch(e)
            {
                alert('error: ' + e)
            }         
        }
    }

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
                                        value={movieTitle}
                                        onChange={(event) => setMovieTitle(event.target.value)}>
                                    </input>  
                                </div>
                                <div className="mt-3">
                                    <label className="mb-1">Diretor:</label>
                                    <input 
                                        maxLength={255}
                                        placeholder="Diretor" 
                                        className="form-control" 
                                        value={movieDirector}
                                        onChange={(event) => setMovieDirector(event.target.value)}>
                                    </input>
                                </div>
                                <div className="mt-3">
                                    <label className="mb-1">Sinopse:</label>
                                    <input 
                                        maxLength={255}
                                        placeholder="Sinopse" 
                                        className="form-control" 
                                        value={movieSynopsis}
                                        onChange={(event) => setMovieSynopsis(event.target.value)}>
                                    </input>
                                </div>
                            </form>
                            <div className="mt-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={saveMovie}>Salvar
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

export default MovieForm
