import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { View, TouchableOpacity, Image, Text, ScrollView,Dimensions } from 'react-native'
import { image500 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');

export default function Movies() {

  const {params:data} = useRoute();
  const navigation = useNavigation();  

  return (
    <View className="bg-neutral-900 h-full">

        <View className="flex-row bg-transparent items-center z-30 p-5">
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image
                    source={require('../assets/back.png')}
                    className="w-12 h-12 mt-2"/>
            </TouchableOpacity>
            <Text className="text-white text-3xl text-center mt-3">Movies.</Text>
        </View>

        
        <ScrollView
            contentContainerStyle={{paddingHorizontal:15}}
            showsHorizontalScrollIndicator={false}
            className="space-y-3 mb-2">
                <View className="flex-row justify-center flex-wrap">
                {
                    data.map((item, index)=>{
                        return(
                            <View key={index}>
                                <TouchableOpacity onPress={()=>navigation.navigate('Movie',item)}>
                                    <Image
                                        source={{uri: image500(item.poster_path)} || require('../assets/dummyposter.png')}
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



        
        
    </View>
  )
}
