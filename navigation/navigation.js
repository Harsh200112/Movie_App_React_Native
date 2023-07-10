import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import HomeScreen from '../screens/HomeScreen';
import Favourite from '../screens/Favourite';
import MovieScreen from '../screens/MovieScreen';
import person from '../screens/person';
import Movies from '../screens/Movies';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='Search' component={SearchScreen}/>
        <Stack.Screen name='Favourite' component={Favourite}/>
        <Stack.Screen name="Movie" component={MovieScreen}/>
        <Stack.Screen name='Person' component={person}/>
        <Stack.Screen name='Movies' component={Movies}/>
      </Stack.Navigator> 
    </NavigationContainer>
  )
}
