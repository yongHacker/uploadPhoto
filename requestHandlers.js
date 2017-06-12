var exec=require('child_process').exec
var querystring=require('querystring')
var fs=require('fs')
var formidable=require('formidable')

function start(res){
    console.log('Request handler "start" was clled')

     var body ='<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    res.writeHead(200,{'Content-Type':'text/html'})
    res.write(body)
    res.end()
}

function upload(res,req){
    console.log('Request handler "upload" was clled')

    var form=new formidable.IncomingForm()
    form.parse(req,function(error,fields,files){
        console.log('parse done')
        fs.renameSync(files.upload.path,'./tmp/test.jpg')

        res.writeHead(200,{'Content-Type':'text/html'})
        res.write("receive img:<br>")
        res.write("<img src='/show'>")
        res.end()
    })

   
}

function show(res){
    console.log('Request handler "show" was called.')
    fs.readFile('./tmp/test.jpg','binary',function(error,file){
        if(error){
            res.writeHead(500,{'Content-Type':'text/plain'})
            res.write(error+'\n')
            res.end()
        }else{
            res.writeHead(200,{'Content-Type':'image/png'})
            res.write(file,'binary')
            res.end()
        }
    })
}

exports.start=start
exports.upload=upload
exports.show=show