import authHeader from "./auth-header";

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
        const response = await axios.get(API_URL+"/profile/batch");

        console.log(response.data);

        return response.data;  
    }catch(e) {
        console.log(e);
    }
}

const updateProfile = async() => {
    try{
        const response = await axios.put(API_URL+"/profile", authHeader());

        console.log(response.data);

        return response.data;
    }catch(e){
        console.log(e);
    }   
}

export {getProfile, getAllProfiles, updateProfile};