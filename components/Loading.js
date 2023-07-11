import React from 'react'
import { View, Dimensions, Text } from 'react-native';
var{width, height} = Dimensions.get('window');

// Loading screen to display when the data is being fetch from the website
export default function Loading() {
  return (
    <View style={{height,width}} className="absolute flex-row justify-center items-center" >
        <Text className="text-white text-center text-2xl">Loading....</Text>
    </View>
  )
}
