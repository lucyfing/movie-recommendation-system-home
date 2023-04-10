import { getRequest, postRequest } from "./axios"
import { Movie } from '../lib/app-interface' 
import { message } from "antd"
import { type } from "os"
import utils from './utils/index'

const getAllMovies = async (type?: string, year?:number) => {
    let moviesList: Array<Movie> = []
    try {
        const resp = await getRequest(`/api/movies/?type=${!!!type?'':type}&&year=${!!!year||year===-1?'':year}`)
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
        movies = resp.data.movies.map((movie: Movie)=>utils.getMovieDetail(movie))
    } catch (error) {
        message.error({content:JSON.stringify(error), duration:3})
    }
    return movies
}


const recommendMovies = async (params: {doubanId: string, _id?: string}) => {
    const resp = await postRequest('/api/movies/recommendMovies', params)
    const movies = resp.data.movies.map((movie: Movie) => utils.getMovieDetail(movie))
    return movies
}


const recommendAllMovies = async (params: {_id?: string}) => {
    const resp = await postRequest('/api/movies/recommendAllMovies', params)
    const movies = resp.data.movies.map((movie: Movie) => utils.getMovieDetail(movie))
    return movies
}


export default {
    getAllMovies,
    getFilterMovies,
    recommendMovies,
    recommendAllMovies
}