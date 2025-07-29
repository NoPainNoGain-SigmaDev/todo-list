import { reconstructUserData } from "./user-rehydration";

export const saveUserData = (user) =>{
    localStorage.clear();
    const userData = JSON.stringify(user.getSerializableData());
    console.log(user.getSerializableData())
    console.log(userData)
    localStorage.setItem("SAVED_USER", userData);
}
export const loadUserData = () =>{
    try{
        const serializedData = localStorage.getItem("SAVED_USER");
        if(serializedData){
            const parsedData = JSON.parse(serializedData);
            return reconstructUserData(parsedData);
        }
    }catch (e){
        console.error("Error loading or parsing data from local storage:", e);
    }
}