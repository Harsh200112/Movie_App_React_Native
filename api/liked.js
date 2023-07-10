import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreData = async (movieId, data)=>{
    try {
        const jsonVal = JSON.stringify(data);
        await AsyncStorage.setItem(movieId, jsonVal);
    
    } catch (error) {
        console.log('Error adding:', error);
    }
    console.log('success');
}

export const RemoveData = async (movieId)=>{
    try{
        await AsyncStorage.removeItem(movieId);
    }
    catch(error){
        console.log('Error removing', error);
    }
    console.log('removed');
}

export const GetData = async (movieId)=>{
    try {
        const data = await AsyncStorage.getItem(movieId);
        return data!=null? JSON.parse(data):null;
    } catch (error) {
        console.log('Error fetching the data ', error);
    }
}

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