const axios  = require('axios');
const btoa = require('btoa');
const fs = require('fs');
const URL = "https://csalgo.dark1.workers.dev/0:/Accelerated%20JavaScript%20Training/"
const USERNAME = "GoaInquisition"
const PASS = "GoaInquisition"
const TOKEN = btoa(USERNAME+":"+PASS);
const LOC1 = "/content"

const NAME = decodeURI(URL.split("/")[URL.split('/').length-2])

const LOC = LOC1+"/"+NAME

fs.appendFileSync('data.txt', `cd "${LOC}" mkdir "${NAME}"`)

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
          fs.appendFileSync("data.txt",`cd "${LOC+'/'+_.name}" && mkdir "${_.name}"@@`)
    
        aPost({...obj, url:obj.url+encodeURI(_.name)+"/"})
      }else{
        fs.appendFileSync("data.txt",`cd "${LOC+'/'+_.name}" && wget ${obj.url+encodeURI(_.name)}@@`)
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




