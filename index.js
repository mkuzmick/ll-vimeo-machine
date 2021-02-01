const fs = require("fs")
const path = require("path")

require('dotenv').config()
var Vimeo = require('vimeo').Vimeo;
var client = new Vimeo(process.env.VIMEO_CLIENT_ID, process.env.VIMEO_CLIENT_SECRET, process.env.VIMEO_API_KEY);


function doTheThing(){
    console.log(`all ready to go`);
    console.log(process.env.VIMEO_CLIENT_SECRET);
    client.request({
        path: `/users/${process.env.VIMEO_CLIENT_ID}/videos`,
        query: {
          page: 1,
          per_page: 10,
          fields: 'uri,name,description,duration,created_time,modified_time,type,link,width,height,release_time, pictures, tags, stats, categories, metadata'
        }
      }, function (error, body, status_code, headers) {
        if (error) {
          console.log('error');
          console.log(error);
        } else {
          console.log('body');
          console.log(body);
        //   const videos = JSON.parse(body);
            console.log(JSON.stringify(body, null, 8));
            fs.writeFileSync("./output/test-3.json", JSON.stringify(body, null, 4))
        }        
      });
}


function getVideoPage(pageNumber){
    const options = {
        path: `/users/${process.env.VIMEO_CLIENT_ID}/videos`,
        query: {
          page: pageNumber,
          per_page: 10,
          fields: 'uri,name,description,duration,created_time,modified_time,type,link,width,height,release_time, pictures, tags, stats, categories'
        }
    }
    return new Promise((resolve, reject) => {
        client.request(options, (error, body, status_code, headers) => {
            if(error) {
                console.log(`there was a problem`);
                console.log(error);
            } else {
                console.log(`got the data`);
                resolve(body)
            }
        })
    })
}

async function doTheThingAsync (page) {
    const now = new Date()
    const result = await getVideoPage(page)
    fs.writeFileSync(`./output/test-${now.getTime()}`, JSON.stringify(result, null, 4))
    return result
}

module.exports.doTheThing = doTheThing
module.exports.doTheThingAsync = doTheThingAsync


