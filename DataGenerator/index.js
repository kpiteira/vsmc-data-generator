var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var console
var params = require('./params.js')

module.exports = function (context, myTimer) {
    console = context
    var timeStamp = new Date().toISOString();
    var device = getDevice();
    sendStartService(device, context);
    var sid = sendStartSession(device, context);
    sendEvent(device, sid, context);
    
    context.done();
};

function getDevice(){
    return  {
        "oem_name" : "Apple",
        "os_name" : "iOS",
        "app_version" : "1.0",
        "time_zone_offset" : -420,
        "sdk_version" : "0.13.0",
        "screen_size" : "2208x1242",
        "locale" : getRandomValue(Countries),
        "os_build" : "16G29",
        "app_namespace" : "com.colbylwilliams.MobileAzureDevDays",
        "os_version" : "11.0.1",
        "sdk_name" : "mobilecenter.ios",
        "model" : "specialMac",
        "app_build" : "1"  
    }
}
function sendStartService(device, context){
    var messagePayload = {};
    messagePayload.device = device;
    messagePayload.timestamp = new Date().toISOString();
    messagePayload.type = "start_service";
    messagePayload.services = ["Crashes", "Analytics"];
    send(messagePayload, context);
}
function sendStartSession(device, context){
    var sid = getGuid();
    var messagePayload = {};
    messagePayload.device = device;
    messagePayload.timestamp = new Date().toISOString();
    messagePayload.type = "start_session";
    messagePayload.sid = sid;
    send(messagePayload, context);
    return sid;
}
function sendEvent(device, sid, context){
    var messagePayload = {};
    messagePayload.device = device;
    messagePayload.timestamp = new Date().toISOString();
    messagePayload.type = "event";
    messagePayload.sid = sid;
    messagePayload.name = 'Submit text';
    messagePayload.properties =  {
        "text" : "Hello"
    }
    send(messagePayload, context);
    return sid;
}

function getGuid() {
    function getFourDigits() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    guidStr =  getFourDigits() + getFourDigits() + 
        '-' + getFourDigits() + 
        '-' + getFourDigits() + 
        '-' + getFourDigits() + 
        '-' + getFourDigits() + getFourDigits() + getFourDigits();
    guidStr[14] = '4';
    return guidStr;
}
async function send(payloadObject, context){
    var http = new XMLHttpRequest();
    var url = "https://in.mobile.azure.com/logs?api_version=1.0.0-preview20160914";
    var payload = '{"logs":[' + JSON.stringify(payloadObject) + ']}';
    console.log(payload);
    http.open("POST", url, true);
    
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");
    http.setRequestHeader("Install-ID", "CA3BA120-0FBA-448F-93EE-82EA02CA49DA");
    http.setRequestHeader("App-Secret", params.appSecret;
    
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            context.log('Success: ', http.responseText)
        }else if(http.readyState == 4){
            context.log('Error: %d - %s', http.status, http.responseText)
        }
    }
    await http.send(payload);
}

//////////////////
//
// Generator Data
//
//////////////////
function getRandomValue(obj){
    var sum = 0
    for(i=0; i < Object.values(obj).length; i++){
        sum += Object.values(obj)[i]
    }

    console.log('Size: '+sum)
    var pos = Math.random()*sum
    console.log('Pos: '+pos)
    var tmp = 0
    for(i=0; i < Object.values(obj).length; i++){
        tmp += Object.values(obj)[i]
        console.log(tmp)
        if(pos < tmp){
            console.log('yeah: '+Object.keys(obj)[i])
            return Object.keys(obj)[i]
        }
    }
    console.log('oOHOH')
}

function getCountry(){
    var sum = 0
    for(i=0; i < Object.values(Countries).length; i++){
        sum += Object.values(Countries)[i]
    }

    console.log('Size: '+sum)
    var pos = Math.random()*sum
    console.log('Pos: '+pos)
    var tmp = 0
    for(i=0; i < Object.values(Countries).length; i++){
        tmp += Object.values(Countries)[i]
        console.log(tmp)
        if(pos < tmp){
            console.log('yeah: '+Object.keys(Countries)[i])
            return Object.keys(Countries)[i]
        }
    }
    console.log('oOHOH')
}
Countries = {
    "en_US": 5300,
    "de_DE":1035,  
    "fr_FR":902,  
    "br_PT":891,  
    "jp_JP":836,  
    "cn_CN":638,  
    "sp_MX":400
}