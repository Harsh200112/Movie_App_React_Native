import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { image185, image500 } from '../api/moviedb';


// A Function to return the List of cast that worked in a particular movie in a scrollable view
export default function Cast({cast, navigation}) {
  return (
    <View className="my-6">
        <Text className="text-white mx-4 mb-5 text-lg">Top Cast</Text>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
        >
            {
                cast && cast?.cast?.map((person, index)=>{
                    return(
                        <TouchableOpacity
                            key={index}
                            className="mr-4 items-center"
                            onPress={()=>navigation.navigate('Person', person)}
                        >
                            <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                                <Image
                                    className="rounded-2xl h-24 w-20"
                                    source={person?.profile_path!=null?{uri: image500(person?.profile_path)}:require('../assets/dummyprofile.png')}/>
                            </View>
                            

                            <Text className="text-white text-center text-xs mt-1">
                                {
                                    person?.character?.length>10 ? person?.character?.slice(0,10)+'...' : person?.character
                                }
                            </Text>
                            <Text className="text-neutral-400 text-center text-xs mt-1">
                                {
                                    person?.name?.length>10 ? person?.name?.slice(0,10)+'...' : person?.name
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </View>
  )
}
