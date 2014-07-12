#!/usr/bin/env node
"use strict";

//npm install file-encryptor
//npm install execSync
var sh = require('execSync');

var crypto = require("crypto"),
    argv = require("optimist").argv,
    fs = require('fs');	

var destinationDir="/tmp";

/// <summary>
/// Extrai o caminho do arquivo informado. Deve ser informado o caminho completo do arquivo
/// </summary>
/// <param name="pathAndFileName">Caminho completo do arquivo</param>
/// <returns>Caminho do aquivo</returns>
function filePath(pathAndFileName)
{
    var file = fileName(pathAndFileName);
    if (file == pathAndFileName)
        return "";
    return pathAndFileName.substr(0, pathAndFileName.length - file.length - 1);
}


/// <summary>
/// Extrai o nome de um arquivo do caminho informado
/// </summary>
/// <param name="pathAndFileName">Caminho do arquivo</param>
/// <returns>Nome do arquivo sem o caminho completo</returns>
function fileName(pathAndFileName)
{
    var idx = pathAndFileName.lastIndexOf("/");
    return pathAndFileName.substr(idx + 1, pathAndFileName.length - (idx + 1));
}

/// <summary>
/// returns file extension of a fie
/// </summary>
/// <param name="pathAndFileName">Caminho do arquivo</param>
/// <returns>Nome do arquivo sem o caminho completo</returns>
function fileExtension(pathAndFileName)
{
    var idx = pathAndFileName.lastIndexOf(".");
    return pathAndFileName.substr(idx + 1, pathAndFileName.length - (idx + 1)).toLowerCase();
}

function isImage(pathAndFileName){
    var e=fileExtension(pathAndFileName)
    if(e=="jpg" || e=="jpeg" || e=="png" || e=="bmp")
        return true
    else
        return false
}

function Stack()
{
  this.stac=new Array();
  this.pop=function(){
  	return this.stac.pop();
  }
  this.push=function(item){
  	this.stac.push(item);
  }
  this.count=function(){
    return this.stac.length;
  } 
}

function p(v){
  console.log(v);
}

function DirectoryGetFilesRecursive(b)
{
    // 1.
    // Store results in the file results list.
    var result = new Array();
    // 2.
    // Store a stack of our directories.
    var stack=new Stack();
    // 3.
    // Add initial directory.
    stack.push(b);
    // 4.
    // Continue while there are directories to process
    while (stack.count() > 0)
    {
        // A.
        // Get top directory
        var dir = stack.pop();
        try
        {
            // B
            // Add all files at this directory to the result List.
            var files = fs.readdirSync(dir);
            for(var i in files){
                if (!files.hasOwnProperty(i)) continue;
                var name = dir+'/'+files[i];
                if (fs.lstatSync(name).isSymbolicLink())  continue
                // C
                // Add all directories at this directory.
                if (fs.statSync(name).isDirectory()){
                    stack.push(name);
                } else {
                    result.push(name);
                }
            }
        }
      catch(err)
      {
            p(err)
      }
    }
    return result;
}


var files = DirectoryGetFilesRecursive("/home/j/lab/storager/media");
p("todos arquivos");
console.log(files);

//var hash = crypto.createHash("md5");
//hash.update("Man oh man do I love node!");
//var r=hash.digest("hex");
//console.log(r);

//var encryptor = require('file-encryptor');
//var key = 'My Super Secret Key';
var code;
for(var i in files){
    var f=files[i];
    var ext=fileExtension(f)
    var isImg=isImage(f)
    p("Processing " + f)
    code = sh.run("mkdir -p '" + destinationDir + filePath(f) + "'");
    if(isImg){
        code = sh.run("convert '" + f + "'  -resize '1024000@>' '" + destinationDir + f + "'");
    }
     console.log('return code ' + code);
}

