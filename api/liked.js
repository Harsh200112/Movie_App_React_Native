import AsyncStorage from '@react-native-async-storage/async-storage';

//The MovieId which is taken by these functions are encoded with 'm' or 'c' in front of the actual movie id inorder to distinguish between the liked cast and liked movie
// Using this function i store the movie detail by converting the json file into a string 
export const StoreData = async (movieId, data)=>{
    try {
        const jsonVal = JSON.stringify(data);
        await AsyncStorage.setItem(movieId, jsonVal);
    
    } catch (error) {
        console.log('Error adding:', error);
    }
    console.log('success');
}

// Remving the data which the already stored using the movieID
export const RemoveData = async (movieId)=>{
    try{
        await AsyncStorage.removeItem(movieId);
    }
    catch(error){
        console.log('Error removing', error);
    }
    console.log('removed');
}

// To export the data of the movie asked
export const GetData = async (movieId)=>{
    try {
        const data = await AsyncStorage.getItem(movieId);
        return data!=null? JSON.parse(data):null;
    } catch (error) {
        console.log('Error fetching the data ', error);
    }
}

// to fetch the Movies liked by user
export const fetchData = async () =>{
    let keys=[]
    let data = []
    try {
        keys = await AsyncStorage.getAllKeys();
        for (const key of keys){
            if(key.slice(0,1)=='m'){
                let item = await AsyncStorage.getItem(key);
                data.push(item!=null? JSON.parse(item):null);
            }
        }
        return data;
    } catch (error) {
        console.log("Error fetching the keys ", error);   
    }
}

// To fetch the movies liked by a user
export const fetchPersonData = async () =>{
    let keys=[]
    let data = []
    try {
        keys = await AsyncStorage.getAllKeys();
        for (const key of keys){
            if(key.slice(0,1)=='c'){
                let item = await AsyncStorage.getItem(key);
                data.push(item!=null? JSON.parse(item):null)
            }
        }
        return data;
    } catch (error) {
        console.log("Error fetching the keys ", error);   
    }
}