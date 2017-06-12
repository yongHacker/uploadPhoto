/*定义一个服务器*/
var http=require('http')
var url=require('url')

function start(route,handle){
    http.createServer(function(req,res){
       /* var postData=''*/
        var pathname=url.parse(req.url).pathname
        console.log('Request路径收到了：'+pathname)

       /* req.setEncoding('utf8')*/

      /*  req.on('data',function(chunk){
            postData+=chunk
            console.log('Receive POST data chunk '+chunk+'.')
        })*/
       // req.on('end',function(){
            route(handle,pathname,res,req)
       // })

        
              
    }).listen(8888)
    console.log('Server已成功启动')
}

exports.start=start