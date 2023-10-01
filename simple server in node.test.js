const {request, http} = require("./simple server in node");

// describe("Server should be created and receive get requests", function(){

//     it(`Testing To see if jest is working`,function(){
//         expect(1).toBe(1);
//     });
    
//     it(`Should send a get request to the server`, async function(){
//         const res = await request.get("/");
//     });
// })

describe("Should POST data to the endpoint and return ",function(){
    const mockData = {
        "data":{
            "greeting":"Good Day Tony!",
        },
        "format":"html",
    }

    it("Should send data to the endpoint", async function(){
        const res = await request.post("/return").send(JSON.stringify(mockData));
        // console.log(`$test -- StatusCode: ${res.statusCode}`);
        // console.log(`$test -- Status: ${res.status}`);
        // console.log(`$test -- StatusType: ${res.statusType}`);
        // console.log(`$test -- StatusInfo: ${res.info}`);
        // console.log(`$test -- Type: ${res.type}`);
        // console.log(`$test -- Headers: ${res.headers}`);
        // console.log(`$test -- Path: ${res.path}`);
    });
})

describe("Should POST data to the endpoint and return a JSON format response", function(){
    const mockData = {
        "data":{
            "greeting":"Good Day Tony!",
        },
        "format":"json",
    }
    it("Should send data to the endpoint using application/json header and return a json response", async function(){
         const res = await request.post(`/json`).send(JSON.stringify(mockData));
         expect(res.statusCode).toBe(200);
         expect(res.status).toBe(200);
         expect(res.ok).toBeTruthy();
         expect(res.type).toBe("application/json");
         expect(res._body).toHaveProperty(`greeting`,`Good Day Tony!`);
    })
})

