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
async function  handleFormatting(body, response){
    const {format , data} = JSON.parse(body);
    if(format === "string") {
        sendResponse( {   
            content:`${greeting}, ${age},${occupation}`,
            format:`text/plain`
        }, response)
    }
    if(format === "html"){
        for(const [k,v] of Object.entries(data)){    
            template = template.replace(`{${k}}`, v);
        }
        await writeFileSync(`${__dirname}/update.html`, template);    
        sendResponse({
            content:data,
            format:`text/html`
        }, response);
    } 
    if(format === "json"){
        sendResponse({
            content:{
                format:`JSON`,
                ...data,
            },
            format:`application/json`
        }, response);
    }
    
}

function sendResponse({content,format}, response){
        response.writeHead(200, {'Content-Type': `${format}`});
        response.write(JSON.stringify(content));
        response.end();
}

function handlePOSTRequest(request, response){
    console.log(`Server Working Success`);
    let body = "";
    request.on(`data`, function(chunk){
        body += chunk;
    });

    request.on(`error`, function(error){
        console.log(`problem with request:${error.message}`);
    });
    request.on(`end`, function(){
        handleFormatting(body, response);
    })

   
}

let server = http.createServer(function(request, response){
    const {headers, method, url} = request;
  
    if(request.method === "POST"){
        handlePOSTRequest(request, response);
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