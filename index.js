const axios  = require('axios');
const btoa = require('btoa');
const fs = require('fs');

//node index.js URL2 LOCATION3 USERNAME4 PASSWORD5

const arg = process.argv

const URL = arg[2]
const USERNAME = arg[4]
const PASS = arg[5]
const TOKEN = btoa(USERNAME+":"+PASS);
const LOC1 = arg[3]

const NAME = decodeURI(URL.split("/")[URL.split('/').length-2])

const LOC = LOC1+"/"+NAME




fs.appendFileSync('data.txt', `cd "${LOC1}" && mkdir "${NAME}"@@`)

function Post(obj, callback){
  data = {q:"",password:null,page_token:obj.token,page_index:obj.index}
  headers={
    'Authorization': 'Basic '+TOKEN
  }
  axios.post(obj.url, data,{headers:{...headers}}).then(e=>{
    const {nextPageToken, data} = e.data;
    if(nextPageToken!=null){
      Post({...obj, token:nextPageToken, index:obj.index+1, files:[...obj.files,...data.files]}, callback);
      
    }else{
     callback([...obj.files, ...data.files]);
    }
  })
}


function aPost(obj){
  Post(
  obj,e=>{
    for(let _ of e){
      if(_.mimeType=="application/vnd.google-apps.folder"){
          fs.appendFileSync("data.txt",`cd "${LOC}" && mkdir "${_.name}"@@`)
          console.log(`cd "${LOC}" && mkdir "${_.name}"@@`)
        aPost({...obj, url:obj.url+encodeURI(_.name)+"/"})
      }else{
        fs.appendFileSync("data.txt",`cd "${LOC+'/'+_.name}" && wget ${obj.url+encodeURI(_.name)}@@`)
        console.log(`cd "${LOC+'/'+_.name}" && wget ${obj.url+encodeURI(_.name)}@@`)
      }
    }
  })

}


aPost({
  url:URL,
  token:null,
  index:0,
  files:[]
  })





