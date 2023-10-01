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