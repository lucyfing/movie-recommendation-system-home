import { getRequest, postRequest } from "./axios"
import { Movie } from '../lib/app-interface' 
import { message } from "antd"
import { type } from "os"
import utils from './utils/index'

const getAllMovies = async (type?: string, year?:number) => {
    let moviesList: Array<Movie> = []
    try {
        const resp = await getRequest(`/api/movies/?type=${!!!type?'':type}&&year=${!!!year||year===-1?'':year}`)
        // moviesList = resp.data.movies.map((movie:Movie)=>({
        //     doubanId: movie.doubanId,
        //     rate: movie.rate,
        //     name: movie.name,
        //     description: movie.description,
        //     video: movie.video,
        //     poster: movie.poster,
        //     movieTypes: movie.movieTypes,
        //     year: movie.year,
        //     languages: movie.languages,
        //     countries: movie.countries,
        //     actors: movie.actors,
        //     directors: movie.directors,
        //     meta: {
        //         createdAt: new Date(movie.meta.createdAt),
        //         updatedAt: new Date(movie.meta.updatedAt)
        //     }
        // }))
        moviesList = resp.data.movies.map((movie: Movie)=>utils.getMovieDetail(movie))
    } catch (error) {
        throw error
    }

    return moviesList
}


const getFilterMovies = async (name: string) => {
    let movies: Array<Movie> = []
    try {
        const resp = await getRequest(`/api/movies/filterMovies/?name=${!!name?name:''}`)
        // movies = resp.data.movies.map((movie:Movie)=>({
        //     doubanId: movie.doubanId,
        //     rate: movie.rate,
        //     name: movie.name,
        //     description: movie.description,
        //     video: movie.video,
        //     poster: movie.poster,
        //     movieTypes: movie.movieTypes,
        //     year: movie.year,
        //     languages: movie.languages,
        //     countries: movie.countries,
        //     actors: movie.actors,
        //     directors: movie.directors,
        //     meta: {
        //         createdAt: new Date(movie.meta.createdAt),
        //         updatedAt: new Date(movie.meta.updatedAt)
        //     }
        // }))
        movies = resp.data.movies.map((movie: Movie)=>utils.getMovieDetail(movie))
    } catch (error) {
        message.error({content:JSON.stringify(error), duration:3})
    }
    return movies
}


export default {
    getAllMovies,
    getFilterMovies
}