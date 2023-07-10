import axios from "axios";
import { apikey } from "../constants";


const baseurl = 'https://api.themoviedb.org/3';
const trendingMoviesUrl = `${baseurl}/trending/movie/day?api_key=${apikey}`;
const upcomingMoviesUrl = `${baseurl}/movie/upcoming?api_key=${apikey}`;
const topReatedMoviesUrl = `${baseurl}/movie/top_rated?api_key=${apikey}`;

export const imageback = path => path? `https://image.tmdb.org/t/p/w780${path}`: null;
export const image342 = path => path? `https://image.tmdb.org/t/p/w342${path}`: null;
export const image500 = path => path? `https://image.tmdb.org/t/p/w500${path}`: null;
export const image185 = path => path? `https://image.tmdb.org/t/p/w185${path}`: null;

const apiCall = async (Url, params)=>{
    const options = {
        method : 'GET',
        url : Url,
        params : params? params:{}
    }

    try {
       const response = await axios.request(options); 
       return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {}
    }
}

export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMoviesUrl);
}

export const fetchUpcomingMovies  = ()=>{
    return apiCall(upcomingMoviesUrl);
}

export const fetchTopRatedMovies = ()=>{
    return apiCall(topReatedMoviesUrl);
}

export const fetchMovieDetail = (itemId)=>{
    return apiCall(`${baseurl}/movie/${itemId}?api_key=${apikey}`);
}

export const fetchCastDetail = (itemId)=>{
    return apiCall(`${baseurl}/movie/${itemId}/credits?api_key=${apikey}`);
}

export const fetchSimilarMovies = (itemId)=>{
    return apiCall(`${baseurl}/movie/${itemId}/similar?api_key=${apikey}`);
}

export const fetchPersonDetails = (itemId)=>{
    return apiCall(`${baseurl}/person/${itemId}?api_key=${apikey}`);
}

export const fetchPersonMovies = (itemId) =>{
    return apiCall(`${baseurl}/person/${itemId}/movie_credits?api_key=${apikey}`);
}

export const fetchSearchMovies = params =>{
    return apiCall(`${baseurl}/search/movie?api_key=${apikey}`, params);
}