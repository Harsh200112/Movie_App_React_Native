import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, KeyboardAvoidingView, ScrollView,  Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchSearchMovies, image500 } from '../api/moviedb';
import { debounce } from 'lodash';

var{width, height} = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = value=>{
    if(value && value.length>2){
      setLoading(true);
      fetchSearchMovies({
        query:value,
        include_adult:false,
        language:'en-US',
        page:1
      }).then(data=>{
        setLoading(false);
        if(data && data.results) setResults(data.results);
      })
    }
  }

  const handleSearchDebounce = useCallback(debounce(handleSearch,400));

  return (
    <View className="bg-neutral-900 h-full">
        <View className="mt-5 mb-3 mx-5 flex-row justify-between border border-neutral-500 rounded-full">
          <TextInput 
            onChangeText={handleSearchDebounce}
            placeholder='Search Movie'
            placeholderTextColor={'gray'}
            className="pb-1 pt-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider h-14"
          />
          <TouchableOpacity onPress={()=>navigation.goBack()} className="pb-1 pt-1 pr-1">
            <Image
              source={require('../assets/cancel.png')}
              />
          </TouchableOpacity>
        </View>
        

        {
          loading?(
            <Loading/>
          ):(
            results.length > 0 ? (
              <ScrollView
                contentContainerStyle={{paddingHorizontal:15}}
                showsHorizontalScrollIndicator={false}
                className="space-y-3 mb-2">
                    <Text className="text-white font-semibold ml-2">Results ({[results.length]}) </Text>
                    <View className="flex-row justify-center flex-wrap">
                    {
                        results.map((item, index)=>{
                            return(
                                <View key={index}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('Movie',item)}>
                                        <Image
                                            source={item.poster_path?{uri: image500(item.poster_path)} : require('../assets/dummyposter.png')}
                                            style={{height:height*0.3, width:width*0.4}}
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
            ) : (
              <View className="flex-row justify-center">
                <Image
                  source={require('../assets/movietime.png')}
                  className="h-96 w-96"/>
              </View>
            )
          )
        }
    </View>
  )
}
