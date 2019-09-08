import axios from 'axios';


export default async (url, data = {}, methodType = 'GET', config={}) => {
    const method = methodType.toLowerCase();
    const { headers={} } = config;

    if(method === 'get'){
        config.params = data;
    }else{
        config.data = data;
    }

    const result = {
        response: null,
        error: null,
    };

    try {
        result.response = await axios({ method, url, ...config });
    }catch (error){
        result.error = error.response;
    }

    return result;
};