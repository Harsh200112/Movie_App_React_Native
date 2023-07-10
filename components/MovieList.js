import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { image500 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');

export default function MovieList({title, data, hideSeeAll}) {
    const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
            <Text className="text-white text-xl">{title}</Text>
            {
                !hideSeeAll &&(
                    <TouchableOpacity onPress={()=>navigation.navigate('Movies',data)}>
                        <Text className="text-red-500">See-All.</Text>
                    </TouchableOpacity>
                )
            }
            
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
            >
                {
                    data.map((item, index)=>{
                        return(
                            <View key={index}>
                                <TouchableWithoutFeedback 
                                onPress={()=>navigation.push('Movie', item)}>
                                <Image
                                    source={ item.poster_path!=null?{uri: image500(item.poster_path)} : require('../assets/dummyposter.png')}
                                    style={{
                                        width:width*0.33,
                                        height:height*0.3
                                    }}
                                    className="rounded-2xl mx-2"
                                    />
                            </TouchableWithoutFeedback>
                            <Text className="text-neutral-400 text-center mt-1" >
                                {
                                    item?.title?.length>15 ? item?.title?.slice(0,15) + "..." : item?.title
                                }
                            </Text>
                            </View>
                        )
                    })
                }
        </ScrollView>
    </View>
  )
}
