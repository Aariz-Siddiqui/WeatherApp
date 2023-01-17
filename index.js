const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("home.html","utf-8");
const replaceval=(html,arr)=>{
 let changedval = html.replace("{%temp%}",arr.main.temp);
 changedval = changedval.replace("{%mintemp%}",arr.main.temp_min);
 changedval = changedval.replace("{%maxtemp%}",arr.main.temp_max);
 changedval = changedval.replace("{%city%}",arr.name);
 changedval = changedval.replace("{%country%}",arr.sys.country);
 changedval = changedval.replace("{%weather%}",arr.weather[0].main); 
 return changedval;
}
const server = http.createServer((req,res)=>{
if(req.url="/"){
requests("https://api.openweathermap.org/data/2.5/weather?q=Bhiwandi&appid=0b2fef4e4695f8cf618b43ff57135688")
.on("data",(chunk)=>{
    let objdata = JSON.parse(chunk);
    let arr= [objdata];
    console.log(arr[0].main.temp);
    const realTimeData = arr.map((val)=>replaceval(homeFile,val)).join("");
    res.write(realTimeData);
})
.on("end",(err)=>{
    if(err){
        return (console.log('connection closed due to errors', err));
    }
        else{
            console.log("end");
            res.end();
        }

    }
)
}
}
)
server.listen(8000, "127.0.0.1");