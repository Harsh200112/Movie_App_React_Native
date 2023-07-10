import { useNavigation } from '@react-navigation/native'
import React, {  useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import { fetchData } from '../api/liked';
import { fetchPersonData } from '../api/liked';
import { image500 } from '../api/moviedb';
import Loading from '../components/Loading';


var {width, height} = Dimensions.get('window');

export default function Favourite() {
    
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [pageSelect, setPageSelect] = useState(false);
  const [likedPersons, setLikedPersons] = useState([]);

  useEffect(()=>{
    navigation.addListener('focus',()=>{
        getData();
        fetchPersoData();
    } )
  },[])

  const getData = async ()=>{
    const data = await fetchData();
    if(data) setLikedMovies(data);
    setLoading(false);
  }

  const fetchPersoData = async ()=>{
    const data = await fetchPersonData();
    if (data) setLikedPersons(data);
    setLoading(false);
  }


  return (
    <View className="flex-1 bg-neutral-900">
        <View className="flex-row justify-center mt-2 mb-2">
            <Text className="text-white font-bold text-4xl">
                <Text className="text-red-500">Fav</Text>ourite</Text>
        </View>

        <View className="flex-row justify-between">
            <TouchableOpacity onPress={()=>setPageSelect(false)} style={{marginLeft:width*0.17}}>
                <Text style={{color:!pageSelect?'rgba(239,68,68,1)':'white'}} className="text-white text-center text-xl">Movies</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setPageSelect(true)} style={{marginRight:width*0.21}}>
                <Text style={{color:pageSelect?'rgba(239,68,68,1)':'white'}} className="text-white text-center text-xl">Cast</Text>
            </TouchableOpacity>
        </View>

        {
          loading?(
            <Loading/>
          ):(
              !pageSelect?(
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}
                className="space-y-3 mb-16 mt-4">
                  <View className="flex-row justify-between flex-wrap">
                    {
                        likedMovies.map((item, index)=>{
                            return(
                                <View key={index}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('Movie', item)}>
                                        <Image
                                            source={item.poster_path!=null?{uri: image500(item.poster_path)} : require('../assets/dummyposter.png')}
                                            style={{height:height*0.33, width:width*0.4}}
                                            className="rounded-3xl mx-2"/>
                                    </TouchableOpacity>
                                    <Text className='text-neutral-400 text-sm text-center mt-1 mb-2'>
                                        {
                                            item?.title?.length>15? item?.title?.slice(0,15) + '...' :item?.title
                                        }
                                    </Text>
                                </View>
                            )
                        })
                    }
                  </View>
              </ScrollView>
              ):(
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}
                className="space-y-3 mb-16 mt-4">
                  <View className="flex-row justify-between flex-wrap">
                    {
                        likedPersons.map((item, index)=>{
                            return(
                                <View key={index}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('Person', item)}>
                                        <Image
                                            source={item?.profile_path!=null?{uri: image500(item?.profile_path)}:require('../assets/dummyprofile.png')}
                                            style={{height:height*0.33, width:width*0.4}}
                                            className="rounded-3xl mx-2"/>
                                    </TouchableOpacity>
                                    <Text className='text-neutral-400 text-sm text-center mt-1 mb-2'>
                                        {
                                            item?.name
                                        }
                                    </Text>
                                </View>
                            )
                        })
                    }
                  </View>
              </ScrollView>
              )
            ) 
        }
        

        <View className="absolute bg-neutral-800 items-center p-3 bottom-0 w-full">
                <View className="flex-row justify-between">
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')} className="mr-20">
                        <Image source={require('../assets/homeoutline.png')} className="w-8 h-8"/>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={()=>navigation.navigate('Search')} className="mr-20">
                        <Image source={require('../assets/searchoutline.png')} className="w-7 h-7"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Favourite')}>
                        <Image source={require('../assets/favouritefilled.png')} className="w-7 h-7"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  )
}
