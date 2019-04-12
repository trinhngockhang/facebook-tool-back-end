const request = require('request');
const config = require('../config');

const autoPost =  async (id, access_token, message) => {
    const option = {
      baseUrl: config.baseUrl,
        qs : {
          access_token,
          message,
        },
    }
    return new Promise((resolve, reject) => {
      request.post(`${id}/feed`, option, (err, response) => {
          var body = JSON.parse(response.body);
          if(err) reject(err);
          resolve();
        });
    }) 
  }
  
module.exports = {
    autoPost
}