import axios from "axios";
import { BaseUrl, errorResponseCreater, responseCreater } from "../assets/constant";
class {RepoName}Repo {
    basePath = "{pathName}"
    // fetching all the {RepoName}s
  static async getAll(data){
    const headers = {Accept:"application/json",
    Authorization: `Bearer ${data.token}` ,
}
    const params = {lan:"all"}
        try {
            
         const response  = await axios.get(`${BaseUrl}/api/${this.basePath}`,{headers , params});
         return responseCreater(response,"Succes")  
        } catch (error) {
            return errorResponseCreater(error.response.status,"{RepoName}")    
        }
    }

    // creating new {RepoName} 

    static async addOne(data,rejectWithValue){
        const form = new FormData();
        const headers = {Accept:"application/json",
        Authorization: `Bearer ${data.token}` ,
    }
        try {
            const response  = await axios.post(`${BaseUrl}/api/${this.basePath}`,form,{headers});
            return responseCreater(response,"Succes")  
            
        } catch (error) {
            console.error(error);
            return rejectWithValue(errorResponseCreater(error.response.status,"{RepoName}"))
            
        }
    
    
    
    }
   


    // update one {RepoName}

    static async updateOne(data){
        const form = new FormData();
        form.append('_method', 'PUT');
        const headers = {Accept:"application/json",
        Authorization: `Bearer ${data.token}` ,
    }
        try {
            const response  = await axios.post(`${BaseUrl}/api/${this.basePath}/${data.id}`,form,{headers});
            return responseCreater(response,"Succes")     
            
        } catch (error) {
            return rejectWithValue(errorResponseCreater(error.response.status,"{RepoName}"))
        }
    }


    //  delete one {RepoName} 

    static async deleteOne(data){
        const headers = {Accept:"application/json",
        Authorization: `Bearer ${data.token}` ,
    }
        try {
            let response = await axios.delete(`${BaseUrl}/api/${this.basePath}/${data.id}`,{headers});
             response = {...response ,data:data.id}
            return responseCreater(response,"Deleted") 
        } catch (error) {
            return rejectWithValue(errorResponseCreater(error.response.status,"{RepoName}"))
            
        }
    }

}




export default {RepoName}Repo