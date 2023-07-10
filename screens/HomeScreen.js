import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

var{width, height} = Dimensions.get('window');

export default function HomeScreen() {
    const navigation = useNavigation();
    const [trending, setTrending] = useState([]);
    const [Upcoming, setUpcoming] = useState([]);
    const [TopRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        navigation.addListener('focus',()=>{
            getTrendingMovies();
            getUpcomingMovies();
            getTopRatedMovies();
        })
    },[])

    const getTrendingMovies = async ()=>{
        const data = await fetchTrendingMovies();
        if (data && data.results) setTrending(data.results);
        setLoading(false);
    }

    const getUpcomingMovies  = async ()=>{
        const data = await fetchUpcomingMovies();
        if (data && data.results) setUpcoming(data.results);
        setLoading(false);
    }

    const getTopRatedMovies  = async ()=>{
        const data = await fetchTopRatedMovies();
        if (data && data.results) setTopRated(data.results);
        setLoading(false);
    }

    return (
        <View className="flex-1 bg-neutral-900">

            {
                loading?(
                    <Loading />
                ):(
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:40}}>

                        {/* Trending Movies */}
                        {trending.length>0 && <TrendingMovies data={trending}/>}

                        {/* Top Rated Movies */}
                        {TopRated.length>0 && <MovieList title="Top-Rated." data={TopRated}/>}

                        {/* Upcoming Movies */}
                        {Upcoming.length>0 && <MovieList title="Upcoming." data={Upcoming}/>}

                    </ScrollView>
                )
            }

            
            <View className=" bg-neutral-800 items-center p-3 absolute w-full bottom-0">
                <View className="flex-row justify-between">
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')} className="mr-20">
                        <Image source={require('../assets/homefilled.png')} className="w-10 h-10"/>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={()=>navigation.navigate('Search')} className="mr-20">
                        <Image source={require('../assets/searchoutline.png')} className="w-9 h-9"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Favourite')}>
                        <Image source={require('../assets/favouriteoutline.png')} className="w-9 h-9"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
