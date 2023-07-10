import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, View, TouchableOpacity, Image, Text } from 'react-native'
import MovieList from '../components/MovieList';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../components/Loading';
import {GetData, StoreData, RemoveData} from '../api/liked'
import { fetchPersonDetails, image342, image500, fetchPersonMovies } from '../api/moviedb';

var {width, height} = Dimensions.get('window');

export default function Person() {
  const {params:item} = useRoute();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [personData, setPersonData] = useState({});
  const[personMovies, setpersonMovies] = useState([]);
  const [like, setLike] = useState(false);

  useEffect(()=>{
    navigation.addListener('focus',()=>{
      getPersonDetail(item.id);
      getPersonMovies(item.id);
      getData('c'+item?.id?.toString());
    })
  },[item])

  const getData = async (ItemId)=>{
    const data = await GetData(ItemId);
    if(data!=null){
        setLike(true);
    }
    else{
        setLike(false);
    }
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


  

  const getPersonMovies = async(itemId)=>{
    const data = await fetchPersonMovies(itemId);
    if (data && data.cast) setpersonMovies(data.cast);
    setLoading(false);
  }

  const getPersonDetail = async (itemId)=>{
    const data = await fetchPersonDetails(itemId);
    if (data) setPersonData(data);
    setLoading(false);
  }

  const handleClick = (ItemId,item,like)=>{
    !like?pushData(ItemId,item):(fetchData(ItemId)!=null?deleteData(ItemId):null);
  }

  return (
    <View className="bg-neutral-900 h-full">
        <ScrollView
        contentContainerStyle={{paddingBottom:20}}
    >
        <View className="flex-row bg-transparent justify-between items-center z-30 p-5 fixed">
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image
                    source={require('../assets/back.png')}
                    className="w-12 h-12 mt-2"/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=>{
                    like?setLike(false):setLike(true);
                    handleClick('c'+item?.id?.toString(),item,like);
                    }} >
                <Image
                    source={like? require('../assets/heartfilled.png'):require('../assets/heartoutline.png')}
                    className="w-9 h-9"/>
            </TouchableOpacity>
        </View>

        {
          loading?(
            <Loading/>
          ):(
            <View>
              <View>
                <View className="flex-row justify-center">
                  <View className="overflow-hidden items-center rounded-full w-72 h-72 border border-neutral-300">
                    <Image 
                      source={personData?.profile_path!=null?{uri: image500(personData?.profile_path)}:require('../assets/dummyprofile.png')}
                      style={{width:width*0.74, height:height*0.43}}
                      />
                  </View>
                </View>
              </View>

              <View className="mt-6">
                <Text className="text-white text-3xl text-center font-bold">
                  {personData?.name}
                </Text>

                <Text className="text-base text-neutral-500 text-center">
                  {personData?.place_of_birth}
                </Text>
              </View>

              <View className="mx-3 p-4 mt-6 flex-row justify-between bg-neutral-700 items-center rounded-full">
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Gender</Text>
                  <Text className="text-neutral-300 text-sm">{personData?.gender==1?'Female.':'Male.'}</Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Birthday</Text>
                  <Text className="text-neutral-300 text-sm">{personData?.birthday}</Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Known For</Text>
                  <Text className="text-neutral-300 text-sm">{personData?.known_for_department}</Text>
                </View>
                <View className="px-2 items-center">
                  <Text className="text-white font-semibold">Popularity</Text>
                  <Text className="text-neutral-300 text-sm">{personData?.popularity}</Text>
                </View>
              </View>

              <View className="my-6 mx-4 space-y-2">
                <Text className="text-white text-lg">Biography</Text>
                <Text className="text-neutral-400 tracking-wide">
                  {
                    personData?.biography
                  }
                </Text>
              </View>
              
              <MovieList data={personMovies} hideSeeAll={true} title={"Movies"}/>
            </View>
          )
        }

        

    </ScrollView> 
    </View>
  )
}
