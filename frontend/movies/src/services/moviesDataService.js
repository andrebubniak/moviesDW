import movie_api from '../http-common'

class MoviesDataService
{
    getAll() 
    {
        return movie_api.get('/movies')
    }

    get(id)
    {
        return movie_api.get(`/movies/${id}`)
    }

    //if has id delete by id, if not delete all
    delete(id)
    {
        if(id === undefined) return movie_api.delete('/movies')

        return movie_api.delete(`/movies/${id}`)
    }

    create(movie_data)
    {
        return movie_api.post('/movies', movie_data)
    }

    update(id, movie_data)
    {
        return movie_api.put(`/movies/${id}`, movie_data)
    }

}

export default new MoviesDataService()