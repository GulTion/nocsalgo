const axios  = require('axios');
const btoa = require('btoa');
const atob = require('atob');
const fs = require('fs');

const qs = require('qs');
var argv = require('minimist')(process.argv.slice(2));
const {log} = console


//node index.js URL2 LOCATION3 USERNAME4 PASSWORD5

// node index.js --url="https://archive.thehated7.workers.dev/0:/AlgoExpert.io/System%20Design%20Fundamentals/" --location=/test --username="@TheHatedOne" --password="@TheHatedOne"
// {
//   _: [],
//   url: 'https://archive.thehated7.workers.dev/0:/AlgoExpert.io/System%20Design%20Fundamentals/',
//   location: '/test',
//   username: '@TheHatedOne',
//   password: '@TheHatedOne'
// }
const URL = argv.url
const USERNAME = argv.username
const PASS = argv.password
const TOKEN = btoa(USERNAME+":"+PASS);
const LOC1 = argv.location

const NAME = decodeURI(URL.split("/")[URL.split('/').length-2])

const LOC = LOC1+"/"+NAME



function read(str) {
    var gdijsorg_0x1207 = ['join', '645298GrGsiK', '8269zzjDhb', '28wpErfD', '11eoSBcm', '3578714TboDnQ', 'slice', '52214BJnTpj', '14039GFHzjM', '187451gnBzKk', 'substr', 'reverse', '1262156NwMIzh', '2nDedhJ', 'split'];
    var gdijsorg_0x570bf1 = gdijsorg_0x158f;

    function gdijsorg_0x158f(_0x32bcea, _0x29ebfd) {
        _0x32bcea = _0x32bcea - 0x150;
        var _0x1207c1 = gdijsorg_0x1207[_0x32bcea];
        return _0x1207c1;
    }(function(_0xbbe83c, _0xbbffd8) {
        var _0x2feec5 = gdijsorg_0x158f;
        while (!![]) {
            try {
                var _0x5d3639 = parseInt(_0x2feec5(0x15c)) * -parseInt(_0x2feec5(0x150)) + -parseInt(_0x2feec5(0x15b)) + -parseInt(_0x2feec5(0x157)) + parseInt(_0x2feec5(0x151)) * parseInt(_0x2feec5(0x152)) + parseInt(_0x2feec5(0x153)) * -parseInt(_0x2feec5(0x156)) + parseInt(_0x2feec5(0x158)) + parseInt(_0x2feec5(0x154));
                if (_0x5d3639 === _0xbbffd8) break;
                else _0xbbe83c['push'](_0xbbe83c['shift']());
            } catch (_0x2894d2) {
                _0xbbe83c['push'](_0xbbe83c['shift']());
            }
        }
    }(gdijsorg_0x1207, 0xd11e8));
    var sa = str[gdijsorg_0x570bf1(0x15d)](''),
        ra = sa[gdijsorg_0x570bf1(0x15a)](),
        ja = ra[gdijsorg_0x570bf1(0x15e)](''),
        aj = ja[gdijsorg_0x570bf1(0x159)](0x18)[gdijsorg_0x570bf1(0x155)](0x0, -0x14);
    return aj;
}

function gdidecode(str) {
    var gdijsorg_0x5579 = ['join', 'toString', '114773LJlqPi', 'charCodeAt', '1evaKJu', '128429mQiVMM', '179727icrnig', '1276161MsgKkV', 'map', '111987FmCZVm', '6IEPbgT', '1924817UdCjIN', '328673bHHLnC', '14sGLkvR'];
    var gdijsorg_0x22bf03 = gdijsorg_0x47d3;
    (function(_0x2015a9, _0x2d2e6f) {
        var _0x194131 = gdijsorg_0x47d3;
        while (!![]) {
            try {
                var _0x50490c = parseInt(_0x194131(0x167)) * -parseInt(_0x194131(0x165)) + parseInt(_0x194131(0x160)) + parseInt(_0x194131(0x15e)) + -parseInt(_0x194131(0x161)) * -parseInt(_0x194131(0x15f)) + parseInt(_0x194131(0x162)) * -parseInt(_0x194131(0x168)) + -parseInt(_0x194131(0x16a)) + parseInt(_0x194131(0x169));
                if (_0x50490c === _0x2d2e6f) break;
                else _0x2015a9['push'](_0x2015a9['shift']());
            } catch (_0x157d6c) {
                _0x2015a9['push'](_0x2015a9['shift']());
            }
        }
    }(gdijsorg_0x5579, 0xf40cd));

    function gdijsorg_0x47d3(_0x4aefd5, _0x2d1551) {
        _0x4aefd5 = _0x4aefd5 - 0x15e;
        var _0x557938 = gdijsorg_0x5579[_0x4aefd5];
        return _0x557938;
    }
    return decodeURIComponent(atob(str)['split']('')[gdijsorg_0x22bf03(0x16b)](function(_0x1cdc7a) {
        var _0x416153 = gdijsorg_0x22bf03;
        return '%' + ('00' + _0x1cdc7a[_0x416153(0x166)](0x0)[_0x416153(0x164)](0x10))['slice'](-0x2);
    })[gdijsorg_0x22bf03(0x163)](''));
}
fs.appendFileSync('data.py', `import os\n`)
fs.appendFileSync('data.py', `os.system('cd "${LOC1}" && mkdir "${NAME}"')\n`)

function Post(obj, callback){
  data1 = qs.stringify({q:"",password:null,page_token:obj.token,page_index:obj.index})
  headers={
    'Authorization': 'Basic '+TOKEN,
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  }

  axios.post(obj.url, data1,{headers:{...headers}}).then(e=>{
    // log(e.data)
    const {nextPageToken, data} = JSON.parse(gdidecode(read(e.data)));
    // log(gdidecode(read(e.data))))
    if(nextPageToken!=null){
      Post({...obj, token:nextPageToken, index:obj.index+1, files:[...obj.files,...data.files]}, callback);
      
    }else{
     callback([...obj.files, ...data.files]);
    }
  })
}


// 
// @TheHatedOne
// https://archive.thehated7.workers.dev/
// password=&page_token=&page_index=0




// Post({
//   url:URL,
//   surl:"",
//   token:null,
//   index:0,
//   files:[]
//   },cb=>{
//     log(cb)
//   })





function aPost(obj){
  Post(
  obj,e=>{
    for(let _ of e){
      if(_.mimeType=="application/vnd.google-apps.folder"){
          fs.appendFileSync("data.py",`os.system('cd "${LOC}" && mkdir "${_.name}"')\n`)
          // console.log(`cd "${LOC}" && mkdir "${_.name}"\n`)
        aPost({...obj,surl:_.name, url:obj.url+encodeURI(_.name)+"/"})
      }else{
        fs.appendFileSync("data.py",`os.system('cd "${LOC+'/'+obj.surl}" && wget -nc "${obj.url+encodeURI(_.name)}"')\n`)
        // console.log(`cd "${LOC+'/'+obj.surl}" && wget ${obj.url+encodeURI(_.name)}\n`)
      }
    }
  })

}


aPost({
  url:URL,
  surl:"",
  token:null,
  index:0,
  files:[]
  })





