import api from "./api";
 export default{
    register(){
        return api.post(register)
    },
    signup(login){
        return api.post(signup,login)
    }
 }