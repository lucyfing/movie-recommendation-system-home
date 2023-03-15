import { getRequest } from "./axios"
import { Movie } from '../lib/app-type' 

const getAllMovies = async (url: string) => {
    let moviesList: Array<Movie> = []
    try {
        const resp = await getRequest(url)
        moviesList = resp.data.movies.map((movie:Movie)=>({
            doubanId: movie.doubanId,
            rate: movie.rate,
            name: movie.name,
            description: movie.description,
            video: movie.video,
            poster: movie.poster,
            movieTypes: movie.movieTypes,
            year: movie.year,
            languages: movie.languages,
            countries: movie.countries,
            actors: movie.actors,
            directors: movie.directors,
            meta: {
                createdAt: new Date(movie.meta.createdAt),
                updatedAt: new Date(movie.meta.updatedAt)
            }
        }))
    } catch (error) {
        throw error
    }

    return moviesList
}


export default {
    getAllMovies
}