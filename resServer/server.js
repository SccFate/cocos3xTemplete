//  server.js    
var config = require('./common/config').config;    
var http   = require('http');    
var fs     = require('fs');    
var url    = require('url');    
var path   = require('path');    
var FServer   = require('./server/FServer');    
function index(){    
	var indexPath = './index.html';    
	fs.exists(indexPath, function(exists){    
		if( !exists ) {    
			throw err;    
		} else {    
			fs.readFile(indexPath, function(err, data){  
				if (err) {    
					throw err;      
				} else {    
					function onRequest(req, res){    
						// ȡ���ļ�·��					
						var pathname = url.parse(req.url).pathname;    		
						// ��ȡ�ļ���չ��(����ǰ��.)    
						var extname = path.extname( pathname );    
						var type = extname.slice(1);    
						// ��ȡ�����ļ��ڴ����ϵ�·����    
						var realPath = config.root + pathname;    
						//console.log('realPath:', realPath)
						//console.log('extname:', extname)
						
						if ( extname === '' ) {    
							res.writeHead(200, {'Content-Type':'text/html'});    
							res.write(data);    
							res.end();    
						} else {    
							FServer.filesLoad(realPath, type, req, res);    
						}    
					}   
					http.createServer(onRequest).listen(config.port);    
				}    
			})    
		}    
	})    
 }  
 
index();