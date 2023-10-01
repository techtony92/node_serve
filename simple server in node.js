let {readFileSync, writeFileSync} = require("fs");
let template = readFileSync(`${__dirname}/template.html`, {encoding:'utf-8'});
let http = require("http");
let supertest = require("supertest");

let host = '127.0.0.1';
let port = 3000;
let reqOptions = {
    hostname:"127.0.0.1",
    port:3000,
    method:"POST",
    path:"/return",
    headers:{
        "Content-Type":"application/json"
    }
}


function handleGETRequest(){

}
function handleFormatting(body){
    const {format , data} = JSON.parse(body);
    console.log(data);
    if(format === "string") 
        return {   
            content:`${greeting}, ${age},${occupation}`,
            format:`text/plain`
        };
    if(format === "html")
        
        return {
            content:data,
            format:`text/html`
        }
    
}

function handlerPOSTRequest(request, response){
    let body = "";
    request.on(`data`, function(chunk){
        body += chunk;
    });

    request.on(`error`, function(error){
        console.log(`problem with request:${error.message}`);
    });
    console.log(`Server Working Success`);
    request.on(`end`, async function(){
        
        let {content, format} = handleFormatting(body);
        // let data = {
        //     greeting:`Good Day Tony!`,
        // }
        for(const [k,v] of Object.entries(content)){
            
            template = template.replace(`{${k}}`, v);

        } 
        await writeFileSync(`${__dirname}/update.html`, template);
       
        response.writeHead(200, {'Content-Type': `text/html`});
        response.write(JSON.stringify(content));
        response.end();
    });
}

let server = http.createServer(function(request, response){
    const {headers, method, url} = request;
  
    if(request.method === "POST"){
        handlerPOSTRequest(request, response);
        console.log('POST');
    }
});

const request = supertest(server);

server.listen(port, host, function(error){
    if(error){
        return console.log(`Error Occured :`, error);
    }
    console.log(`Server is listening on port ${port}`);

})

module.exports = {
    request,
    http
}