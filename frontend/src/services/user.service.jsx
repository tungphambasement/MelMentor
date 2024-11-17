import authHeader from "./auth-header";
import axios from 'axios';
const API_URL = "http://localhost:8080/api/user";

const getProfile = async(id) => {
    try{
        const response = await axios.get(API_URL+`/profile/${id}`);

        console.log(response.data);

        return response.data;
    }catch(e){
        console.log(e);
    }
}

const getAllProfiles = async() => {
    try{
        const response = await axios.get(API_URL+"/profiles");

        console.log(response.data);

        return response.data;  
    }catch(e) {
        console.log(e);
    }
}

const updateProfile = async(newData) => {
    try{
        console.log(newData);
        console.log({headers: authHeader()});
        const response = await axios.put(API_URL+"/profile", newData, {headers: authHeader()});

        return response.data;
    }catch(e){
        console.log(e);
    }   
}

export {getProfile, getAllProfiles, updateProfile};