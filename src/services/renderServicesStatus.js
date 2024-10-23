require('dotenv').config();
const axios = require('axios');

const APIKEY = process.env.RENDERAPIKEY;

const GetCurrentStatusFromRender = async () =>{
    const config = {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${APIKEY}`
        }
    };
    const response = await axios.get('https://api.render.com/v1/services',config);
    return response.data;
}



module.exports = {
    GetCurrentStatusFromRender
}