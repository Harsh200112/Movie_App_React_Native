import axios from "axios";
import { apikey } from "../constants";


const baseurl = 'https://api.themoviedb.org/3';

// Url for different sets of movie data
const trendingMoviesUrl = `${baseurl}/trending/movie/day?api_key=${apikey}`;
const upcomingMoviesUrl = `${baseurl}/movie/upcoming?api_key=${apikey}`;
const topReatedMoviesUrl = `${baseurl}/movie/top_rated?api_key=${apikey}`;

// exporting the url of images in different sizes available on tmdb
export const imageback = path => path? `https://image.tmdb.org/t/p/w780${path}`: null;
export const image342 = path => path? `https://image.tmdb.org/t/p/w342${path}`: null;
export const image500 = path => path? `https://image.tmdb.org/t/p/w500${path}`: null;
export const image185 = path => path? `https://image.tmdb.org/t/p/w185${path}`: null;


// A function to call the api to get us the details of the url which is being asked to it
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

// export the details of different sets of data recieved from the tmdb api
export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMoviesUrl);
}

export const fetchUpcomingMovies  = ()=>{
    return apiCall(upcomingMoviesUrl);
}

export const fetchTopRatedMovies = ()=>{
    return apiCall(topReatedMoviesUrl);
}


// Exporting the details of A particular movie or cast or movies similar to that movie
export const fetchMovieDetail = (itemId)=>{
    return apiCall(`${baseurl}/movie/${itemId}?api_key=${apikey}`);
}

export const fetchCastDetail = (itemId)=>{
    return apiCall(`${baseurl}/movie/${itemId}/credits?api_key=${apikey}`);
}

export const fetchSimilarMovies = (itemId)=>{
    return apiCall(`${baseurl}/movie/${itemId}/similar?api_key=${apikey}`);
}


//fetching the persson/ cast or movies in which that cast has worked details from the api
export const fetchPersonDetails = (itemId)=>{
    return apiCall(`${baseurl}/person/${itemId}?api_key=${apikey}`);
}

export const fetchPersonMovies = (itemId) =>{
    return apiCall(`${baseurl}/person/${itemId}/movie_credits?api_key=${apikey}`);
}


// Fetching the search results from the api using the parameters which have been passed here i.e. text from input box/search box
export const fetchSearchMovies = params =>{
    return apiCall(`${baseurl}/search/movie?api_key=${apikey}`, params);
}