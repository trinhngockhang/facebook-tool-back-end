const request = require('request');
const config = require('../config');
const getIdPage =  async (access_token) => {
  const option = {
    baseUrl: config.baseUrl,
      qs : {
        access_token,
      },
  }
  return new Promise((resolve, reject) => {
    request.get('/me', option, (err, response) => {
        var body = JSON.parse(response.body);
        if(err) reject(err);
        resolve(body.id);
      });
  }) 
}

const getPostPage = async (access_token,pageId) => {
  const subRoute = `/${pageId}/posts`;
  const option = {
    baseUrl: config.baseUrl,
      qs : {
        access_token,
      },
  }
  return new Promise((resolve, reject) => {
    request.get(subRoute, option, (err, response) => {
        var body = JSON.parse(response.body);
        if(err) reject(err);
        resolve(body);
      });
  }) 
}
  
module.exports = {
    getIdPage,
    getPostPage
}