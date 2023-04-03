import { message } from "antd";
import { Movie, User } from "../../lib/app-interface";
import { postRequest } from "../axios";

const getUserData = async (url: string, params: any, headers?: any) => {
    let user: User = {}
    try {
        const resp: any = await postRequest(url, params, headers)
        if(resp.data.success) {
            user = {
                email: resp.data.user.email,
                username: resp.data.user.username,
                avatar: resp.data.user.avatar,
                description: resp.data.user.description,
                _id: resp.data.user._id
            }
        } else {
            message.error({content: JSON.stringify(resp.data.err)})
        }
    } catch (error) {
        message.error({content:JSON.stringify(error)})
    }
    return user
}

const getMovieDetail = (movie: Movie) => ({
    doubanId: movie.doubanId||'',
    rate: movie.rate||0,
    name: movie.name||'未知',
    description: movie.description||'未知',
    video: movie.video||'',
    poster: movie.poster||'',
    movieTypes: movie.movieTypes||[],
    year: movie.year||'未知',
    languages: movie.languages||[],
    countries: movie.countries||[],
    actors: movie.actors||[],
    directors: movie.directors||[],
    writers: movie.writers||[],
    dateReleased: movie.dateReleased||''
})


export default {
    getUserData,
    getMovieDetail
}