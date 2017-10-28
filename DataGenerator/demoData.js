//////////////////
//
// Generator Data
//
//////////////////
module.exports = {
    getCountry : function() {
        return getRandomValue(Countries)
    },
    getDeviceModel : function (){
        return getRandomValue(Devices)
    },
    getOSVersion : function(){
        return getRandomValue(OSVersions)
    },
    getAppVersion : function(){
        return getRandomValue(AppVersion)
    },
    getLanguage : function(){
        return getRandomValue(Languages)
    }
}

function getRandomValue(obj){
    var sum = 0
    for(i=0; i < Object.values(obj).length; i++){
        sum += Object.values(obj)[i]
    }

    var pos = Math.random()*sum
    var tmp = 0
    for(i=0; i < Object.values(obj).length; i++){
        tmp += Object.values(obj)[i]
        if(pos < tmp){
            return Object.keys(obj)[i]
        }
    }
}

Countries = {
    "US": 5280,
    "DE":1023,  
    "FR":902,  
    "PT":891,  
    "JP":836,  
    "CN":638,  
    "MX":400
}
Languages = {
    "en": 5800,
    "sp":1061,  
    "de":941,  
    "fr":951,  
    "pt":841,  
    "ja":809,  
    "zh":437
}
Devices = {
    "iPhone 8":	2523,
    "iPhone 7":	2019,
    "iPhone 6s":1647,
    "iPhone 6":	1364
}
OSVersions = {
    "11.0.3":	6873,
    "10.3.3":	1537,
    "9.3.5":	583,
    "10.2.1":	539,
    "10.1.1":	385    
}
AppVersion = {
    "1.3.2":	5905,
    "1.3.1":	338,
    "1.3.0":	509,
    "1.2.6":	3147,
    "1.2.5":	178,
    "1.2.4":	99,
    "1.2.3":	45    
}