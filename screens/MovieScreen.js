import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import { fetchCastDetail, fetchMovieDetail, fetchSimilarMovies, image185, image342, image500, imageback } from '../api/moviedb';
import { RemoveData, StoreData, GetData, GetAllKeys } from '../api/liked';
import Loading from '../components/Loading';


var {width,height} = Dimensions.get('window');
export default function MovieScreen() {
    const {params:item} = useRoute();
    const navigation = useNavigation();
    const [movieData, setMovieData] = useState({});
    const [cast, setcast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [like, setLike] = useState(false);
    const [similarMovies, setSimilarMovies] = useState([]);
    useEffect(()=>{
        navigation.addListener('focus', ()=>{
            getMovieDetail(item.id);
            getCastDetail(item.id);
            getSimilarMovies(item.id);
            getData('m'+item?.id?.toString());
        })
    },[item]);

    const getData = async (ItemId)=>{
        const data = await GetData(ItemId);
        if(data!=null){
            setLike(true);
        }
        else{
            setLike(false);
        }
        setLoading(false);
    }

    const pushData = async (ItemId, item)=>{
        await StoreData(ItemId, item);
    }

    const fetchData = async (ItemId)=>{
        return await GetData(ItemId);
    }

    const deleteData = async(ItemId)=>{
        await RemoveData(ItemId);
    }

    const getSimilarMovies = async (itemId)=>{
        const data = await fetchSimilarMovies(itemId);
        if(data && data.results) setSimilarMovies(data.results);
        setLoading(false);
    }

    const getCastDetail = async (itemId)=>{
        const data = await fetchCastDetail(itemId);
        if(data && data.cast) setcast(data); 
        setLoading(false);
    }

    const getMovieDetail = async (itemId)=>{
        const Moviedata = await fetchMovieDetail(itemId);
        if (Moviedata) setMovieData(Moviedata);
        setLoading(false);
    }

    const handleClick = (ItemId,item,like)=>{
        !like?pushData(ItemId,item):(fetchData(ItemId)!=null?deleteData(ItemId):null);
    }

  return (
    <View className="bg-neutral-900">
        <ScrollView
        contentContainerStyle={{paddingBottom:20}}
    >
        <View className="flex-row bg-transparent justify-between items-center z-30 p-5">
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image
                    source={require('../assets/back.png')}
                    className="w-12 h-12 mt-2"/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=>{
                    like?setLike(false):setLike(true);
                    handleClick('m'+item?.id?.toString(),item,like);
                    }} >
                <Image
                    source={like? require('../assets/heartfilled.png'):require('../assets/heartoutline.png')}
                    className="w-9 h-9"/>
            </TouchableOpacity>
        </View>

        <Image
                source={item.backdrop_path!=null?{uri: imageback(item.backdrop_path)} : (item.poster_path?{uri:image500(item.poster_path)}:require('../assets/dummyposter.png')) }
                style={{
                    width:width,
                    height:height*0.55
                }}
                className="absolute z-10"/>

        <LinearGradient
            colors={['transparent', 'rgba(23,23,23,1)']}
            style={{width, height:height}}
            start={{x:0.5, y:0}}
            end={{x:0.5, y:0.45}}
            className="absolute z-20"/>

        {
            loading?(
                <Loading/>
            ):(
                <View>
                    <View style={{marginTop: height*0.36}} className="z-50 space-y-3">
                        <Text className="text-white z-50 text-center text-3xl font-bold mx-3">
                            {movieData?.title}
                        </Text>

                        {
                            movieData?.id ? (
                                <Text className="text-neutral-400 text-center font-semibold">
                                    {movieData?.status} · {movieData?.release_date?.split('-')[0]} · {movieData?.runtime} min
                                </Text>
                            ):null
                        }

                        <View className="flex-row justify-center">
                            {
                                movieData?.genres?.map((genre, index)=>{
                                    let dot = index+1 != movieData?.genres?.length;
                                    return (
                                        <Text key={index} className="text-neutral-400 text-center font-semibold">
                                            {' '+genre?.name} {dot?'·':null}
                                        </Text>
                                    )
                                })
                            }
                        </View>

                        

                        <Text className="text-neutral-400 text-center mx-4 tracking-wide">
                            {movieData?.overview}
                        </Text>

                    </View>

                    <View className="z-50">
                        <Cast navigation={navigation} cast={cast}/>

                        <MovieList title="Similar-Movies." hideSeeAll={true} data={similarMovies}/>
                    </View>
                </View>
            )
        }
    </ScrollView> 
    </View>
  )
}
