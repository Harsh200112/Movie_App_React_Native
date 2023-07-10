import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Dimensions, FlatList, Image, ScrollView, StatusBar,interpolate, Text, TouchableOpacity, TouchableWithoutFeedback, View, Animated as Anim } from 'react-native';
import { image500, imageback } from '../api/moviedb';
import LinearGradient from 'react-native-linear-gradient';


var {width, height} = Dimensions.get('window');

const AnimatedFlatList = Anim.createAnimatedComponent(FlatList);
const backdrop_height = height*0.6;

export default function TrendingMovies({data}) {
    const [newData] = useState([{key: 'spacer-left'}, ...data, {key:'spacer-right'}])
    const navigation =useNavigation();
    const handleClick = (item)=>{
        navigation.navigate('Movie', item);
    }
    const size = width*0.7;
    const scrollX = React.useRef(new Anim.Value(0)).current;
    const spacer = (width-size)/2;
return (
    <View className="mb-8">
        <Text className="text-white absolute text-center font-bold mt-20 text-3xl mx-4 mb-5 z-20">Trending</Text>
        
        <View className="absolute flex-row">
            {
                data.map((item, index)=>{
                    const inputRange = [
                        (index-2)*size/1000,
                        (index-1)*size/1000,
                        
                    ];
    
                    const translateX = scrollX.interpolate({
                        inputRange,
                        outputRange:[width/999,0]
                    });
                    
                    return (
                        <Anim.View key={index} style={{transform:[{translateX}]}} >
                            <Image
                                blurRadius={1.1}
                                source={{uri:imageback(item.backdrop_path)}}
                                style={{width, height:backdrop_height}}/>
                            
                        </Anim.View>
                    )
                })
            }
        </View>
        <LinearGradient
                colors={['transparent', 'rgba(23,23,23,1)']}
                style={{width, height:height}}
                start={{x:0.5, y:0}}
                end={{x:0.5, y:0.4}}
                className="absolute"/>

        <AnimatedFlatList
            showsHorizontalScrollIndicator={false}
            data={newData}
            keyExtractor={(item, index) => item.key + index.toString()}
            horizontal
            onScroll={Anim.event(
                [{nativeEvent:{contentOffset: {x: scrollX}}}],
                {useNativeDriver:true}
            )}
            contentContainerStyle={{alignItems:'center',paddingTop:height*0.23}}
            decelerationRate={0}
            bounces={false}
            scrollEventThrottle={16}
            snapToInterval={size}
            renderItem={({item, index})=>{

                if(!item.poster_path){
                    return <View style={{width:spacer}} />
                }

                const inputRange = [
                    (index-2)*size,
                    (index-1)*size,
                    index*size
                ]

                const translateY = scrollX.interpolate({
                    inputRange,
                    outputRange:[0,-50,0]
                })

                return (
                    <View style={{width:size, marginTop:50}} key={index}>
                        <Anim.View className="items-center mx-5 overflow-hidden bg-white rounded-3xl" style={{transform:[{translateY}], 
                                shadowColor:'white',
                                shadowOffset:{
                                    width:0,
                                    height:2
                                },
                                shadowOpacity:0.5,
                                shadowRadius:20,
                                elevation:5
                            }}>
                            <TouchableWithoutFeedback onPress={()=>handleClick(item)}  >
                                <Image 
                                    style={{width:size, height:height*0.55}}
                                    source={{uri: image500(item?.poster_path)}}/>
                            </TouchableWithoutFeedback>
                        </Anim.View>
                    </View>
                )
            }}/>
        
    </View>
  )
}