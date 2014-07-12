#!/usr/bin/env node
"use strict";

var fs = require('fs');

function p(v){
  console.log(v);
}

var fp = '/usr/bin/nautilus'


//function storeData(err,_data) {
//  if (err) {
//    return console.log(err);
//  }
//  console.log(_data);
//  global.data = _data
//   
//}

global.data = fs.readFileSync(fp);

foreach(b in global.data){
    console.log (b)
}

console.log(global.data.length);
//fs.writeFileSync('nau', dec)
//console.warn("encrypt length: ", enc.length);
//console.warn("encrypt in Base64:", enc);
//console.warn("decrypt all: " + dec); 
 

