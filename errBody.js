var config = require("./config_testih.js");

module.exports = {
  "/users/me/": { //chris / dali1234 로 로그인 필요  //대조군 other / dali1234
    "get" : {
      "notfound" : {
        "param" : "2",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "unAuthorized" : {
        "precondition" : "logout",
        "expectedErr" : {
          "statusCode" : "401"
        }
      }
    }
  },
  "/users/" : {
    "get" :{
      "forbidden" : {
        "param" : config.other.userId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : "10000",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    }
  },
  "/gatewayModels/" : {
    "get" : {
      "notfound" : {
        "param" : "70",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    }
  },
  "/sensorTypes/" : {
    "get" : {
      "notfound" : {
        "param" : "70",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    }
  },
  "/sensorDrivers/" : {
    "get" : {
      "notfound" : {
        "param" : "70",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    }
  },
  "/gateways/" : {
    "get" : {
      "unAuthorized" :{
        "param" : config.other.gwId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound":{
        "param" : "1423432423",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    },
    "put": {
      "missingParam" : {
        "reqBody" : {"tree":"914af1c57e5a4caf8ab42756cddb5267","_site":"1","devices":["a394cdf011134317a365118abf258e2b"],"virtual":"y","ctime":"1492577379016","name":"api test","status":"status.gateway.fmZH57","model":"32","sensors":["temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267","humidityDaliworks-914af1c57e5a4caf8ab42756cddb5267","onoff-914af1c57e5a4caf8ab42756cddb5267-1"],"_service":"1","autoCreateDiscoverable":"n","reportInterval":1200000,"deviceModels":[{"id":"a394cdf011134317a365118abf258e2b","model":"sensorSimulator"}],"mtime":"1492577384020","id":"914af1c57e5a4caf8ab42756cddb5267","location":{"longitude":-74.0059413,"latitude":40.7127837,"address":"미국 뉴욕"}},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "unAuthorized" :{
        "param" : config.other.gwId,
        "reqBody" : {"tree":"914af1c57e5a4caf8ab42756cddb5267","_site":"1","devices":["a394cdf011134317a365118abf258e2b"],"virtual":"y","ctime":"1492577379016","name":"api test","status":"status.gateway.fmZH57","model":"32","sensors":["temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267","humidityDaliworks-914af1c57e5a4caf8ab42756cddb5267","onoff-914af1c57e5a4caf8ab42756cddb5267-1"],"_service":"1","autoCreateDiscoverable":"n","reportInterval":1200000,"deviceModels":[{"id":"a394cdf011134317a365118abf258e2b","model":"sensorSimulator"}],"mtime":"1492577384020","id":"914af1c57e5a4caf8ab42756cddb5267","location":{"longitude":-74.0059413,"latitude":40.7127837,"address":"미국 뉴욕"}},
        "expectedErr" : {
          "statusCode" :"403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound":{
        "param" : "1423432423",
        "reqBody" : {"tree":"914af1c57e5a4caf8ab42756cddb5267","_site":"1","devices":["a394cdf011134317a365118abf258e2b"],"virtual":"y","ctime":"1492577379016","name":"api test","status":"status.gateway.fmZH57","model":"32","sensors":["temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267","humidityDaliworks-914af1c57e5a4caf8ab42756cddb5267","onoff-914af1c57e5a4caf8ab42756cddb5267-1"],"_service":"1","autoCreateDiscoverable":"n","reportInterval":1200000,"deviceModels":[{"id":"a394cdf011134317a365118abf258e2b","model":"sensorSimulator"}],"mtime":"1492577384020","id":"914af1c57e5a4caf8ab42756cddb5267","location":{"longitude":-74.0059413,"latitude":40.7127837,"address":"미국 뉴욕"}},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "schemaErr01" : { // autoCreateDiscoverable: "test"
        "param" : config.me.gwId,
        "reqBody" : {"tree":"914af1c57e5a4caf8ab42756cddb5267","_site":"1","devices":["a394cdf011134317a365118abf258e2b"],"virtual":"y","ctime":"1492577379016","name":"api test","status":"status.gateway.fmZH57","model":"32","sensors":["temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267","humidityDaliworks-914af1c57e5a4caf8ab42756cddb5267","onoff-914af1c57e5a4caf8ab42756cddb5267-1"],"_service":"1","autoCreateDiscoverable":"test","reportInterval":1200000,"deviceModels":[{"id":"a394cdf011134317a365118abf258e2b","model":"sensorSimulator"}],"mtime":"1492577384020","id":"914af1c57e5a4caf8ab42756cddb5267","location":{"longitude":-74.0059413,"latitude":40.7127837,"address":"미국 뉴욕"}},
        "expectedErr" :{
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { // name: 123
        "param" : config.me.gwId,
        "reqBody" : {"tree":"914af1c57e5a4caf8ab42756cddb5267","_site":"1","devices":["a394cdf011134317a365118abf258e2b"],"virtual":"y","ctime":"1492577379016","name":123,"status":"status.gateway.fmZH57","model":"32","sensors":["temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267","humidityDaliworks-914af1c57e5a4caf8ab42756cddb5267","onoff-914af1c57e5a4caf8ab42756cddb5267-1"],"_service":"1","autoCreateDiscoverable":"n","reportInterval":1200000,"deviceModels":[{"id":"a394cdf011134317a365118abf258e2b","model":"sensorSimulator"}],"mtime":"1492577384020","id":"914af1c57e5a4caf8ab42756cddb5267","location":{"longitude":-74.0059413,"latitude":40.7127837,"address":"미국 뉴욕"}},
        "expectedErr" :{
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { // virtual: "test"
        "param" : config.me.gwId,
        "reqBody" : {"tree":"914af1c57e5a4caf8ab42756cddb5267","_site":"1","devices":["a394cdf011134317a365118abf258e2b"],"virtual":"test","ctime":"1492577379016","name":"api test","status":"status.gateway.fmZH57","model":"32","sensors":["temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267","humidityDaliworks-914af1c57e5a4caf8ab42756cddb5267","onoff-914af1c57e5a4caf8ab42756cddb5267-1"],"_service":"1","autoCreateDiscoverable":"n","reportInterval":1200000,"deviceModels":[{"id":"a394cdf011134317a365118abf258e2b","model":"sensorSimulator"}],"mtime":"1492577384020","id":"914af1c57e5a4caf8ab42756cddb5267","location":{"longitude":-74.0059413,"latitude":40.7127837,"address":"미국 뉴욕"}},
        "expectedErr" :{
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { // virtual: 123
        "param" : config.me.gwId,
        "reqBody" : {"tree":"914af1c57e5a4caf8ab42756cddb5267","_site":"1","devices":["a394cdf011134317a365118abf258e2b"],"virtual":123,"ctime":"1492577379016","name":"api test","status":"status.gateway.fmZH57","model":"32","sensors":["temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267","humidityDaliworks-914af1c57e5a4caf8ab42756cddb5267","onoff-914af1c57e5a4caf8ab42756cddb5267-1"],"_service":"1","autoCreateDiscoverable":"n","reportInterval":1200000,"deviceModels":[{"id":"a394cdf011134317a365118abf258e2b","model":"sensorSimulator"}],"mtime":"1492577384020","id":"914af1c57e5a4caf8ab42756cddb5267","location":{"longitude":-74.0059413,"latitude":40.7127837,"address":"미국 뉴욕"}},
        "expectedErr" :{
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { // delegate: "test"
        "param" : config.me.gwId,
        "reqBody" : {"tree":"914af1c57e5a4caf8ab42756cddb5267","delegate": "test","_site":"1","devices":["a394cdf011134317a365118abf258e2b"],"virtual":"y","ctime":"1492577379016","name":"api test","status":"status.gateway.fmZH57","model":"32","sensors":["temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267","humidityDaliworks-914af1c57e5a4caf8ab42756cddb5267","onoff-914af1c57e5a4caf8ab42756cddb5267-1"],"_service":"1","autoCreateDiscoverable":"n","reportInterval":1200000,"deviceModels":[{"id":"a394cdf011134317a365118abf258e2b","model":"sensorSimulator"}],"mtime":"1492577384020","id":"914af1c57e5a4caf8ab42756cddb5267","location":{"longitude":-74.0059413,"latitude":40.7127837,"address":"미국 뉴욕"}},
        "expectedErr" :{
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { // delegate: 123
        "param" : config.me.gwId,
        "reqBody" : {"tree":"914af1c57e5a4caf8ab42756cddb5267","delegate": 123,"_site":"1","devices":["a394cdf011134317a365118abf258e2b"],"virtual":"y","ctime":"1492577379016","name":"api test","status":"status.gateway.fmZH57","model":"32","sensors":["temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267","humidityDaliworks-914af1c57e5a4caf8ab42756cddb5267","onoff-914af1c57e5a4caf8ab42756cddb5267-1"],"_service":"1","autoCreateDiscoverable":"n","reportInterval":1200000,"deviceModels":[{"id":"a394cdf011134317a365118abf258e2b","model":"sensorSimulator"}],"mtime":"1492577384020","id":"914af1c57e5a4caf8ab42756cddb5267","location":{"longitude":-74.0059413,"latitude":40.7127837,"address":"미국 뉴욕"}},
        "expectedErr" :{
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr07" : { //add key "test":"test"
        "param" : config.me.gwId,
        "reqBody" : {"tree":"914af1c57e5a4caf8ab42756cddb5267","test":"test", "_site":"1","devices":["a394cdf011134317a365118abf258e2b"],"virtual":"y","ctime":"1492577379016","name":"api test","status":"status.gateway.fmZH57","model":"32","sensors":["temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267","humidityDaliworks-914af1c57e5a4caf8ab42756cddb5267","onoff-914af1c57e5a4caf8ab42756cddb5267-1"],"_service":"1","autoCreateDiscoverable":"n","reportInterval":1200000,"deviceModels":[{"id":"a394cdf011134317a365118abf258e2b","model":"sensorSimulator"}],"mtime":"1492577384020","id":"914af1c57e5a4caf8ab42756cddb5267","location":{"longitude":-74.0059413,"latitude":40.7127837,"address":"미국 뉴욕"}},
        "expectedErr" :{
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr08" : { //name -> names
        "param" : config.me.gwId,
        "reqBody" : {"tree":"914af1c57e5a4caf8ab42756cddb5267","_site":"1","devices":["a394cdf011134317a365118abf258e2b"],"virtual":"y","ctime":"1492577379016","names":"api test","status":"status.gateway.fmZH57","model":"32","sensors":["temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267","humidityDaliworks-914af1c57e5a4caf8ab42756cddb5267","onoff-914af1c57e5a4caf8ab42756cddb5267-1"],"_service":"1","autoCreateDiscoverable":"n","reportInterval":1200000,"deviceModels":[{"id":"a394cdf011134317a365118abf258e2b","model":"sensorSimulator"}],"mtime":"1492577384020","id":"914af1c57e5a4caf8ab42756cddb5267","location":{"longitude":-74.0059413,"latitude":40.7127837,"address":"미국 뉴욕"}},
        "expectedErr" :{
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    },
    "delete" : {
      "unAuthorized" :{
        "param" : config.other.gwId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound":{
        "param" : "1423432423",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    }
  },
  "/gateways/{gwId}/devices/" : {
    "paramObj": config.me,
    "get" : {
      "unAuthorized" : {
        "param" : config.other.deviceId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : "sdfdsfsdfdsfs",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    },
    "put" : {
      "unAuthorized" : {
        "param" : config.other.deviceId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : "sdfdsfsdfdsfs",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "schemaErr01" : { // add key "test":"test"
        "param" : config.me.deviceId,
        "reqBody" : {"test":"test", "name":"api test","model":"122", "owner":"914af1c57e5a4caf8ab42756cddb5267", "id":"a394cdf011134317a365118abf258e2b"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { // name - number
        "param" : config.me.deviceId,
        "reqBody" : {"name":123,"model":"122", "owner":"914af1c57e5a4caf8ab42756cddb5267", "id":"a394cdf011134317a365118abf258e2b"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { //model - number
        "param" : config.me.deviceId,
        "reqBody" : {"name":"api test","model":123, "owner":"914af1c57e5a4caf8ab42756cddb5267", "id":"a394cdf011134317a365118abf258e2b"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    },
    "post" : {
      "schemaErr01" : { //add key "test":"test"
        "reqBody" : {"test":"test","reqId":"e790aa116b634aa191a0ee20780cb713","name":"weater","model":"weather"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { // reqId missing
        "reqBody" : {"name":"weater","model":"weather"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { // name missing
        "reqBody" : {"reqId":"e790aa116b634aa191a0ee20780cb713","model":"weather"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { // model missing
        "reqBody" : {"reqId":"e790aa116b634aa191a0ee20780cb713","name":"weater"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { // reqId - number
        "reqBody" : {"reqId":123,"name":"weater","model":"weather"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { // name - number
        "reqBody" : {"reqId":"e790aa116b634aa191a0ee20780cb713","name":123,"model":"weather"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr07" : { // model - number
        "reqBody" : {"reqId":"e790aa116b634aa191a0ee20780cb713","name":"weater","model":123},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "conflict" : {
        "reqBody" : {"reqId":config.me.deviceId,"name":"weather","model":"test"},
        "expectedErr" : {
          "statusCode" : "409",
          "errCode" : "CONFLICT"
        }
      }
    },
    "delete" : {
      "unAuthorized" : {
        "param" : config.other.deviceId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : "sdfdsfsdfdsfs",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    }
  },
  "/gateways/{gwId}/sensors/" : {
    "paramObj" : config.me,
    "get" : {
      "unAuthorized" : {
        "param" : config.other.sensorId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : "fdsfdsfsdf",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    },
    "put" : {
      "unAuthorized" : {
        "param" : config.other.sensorId,
        "reqBody" : {"network": "daliworks","driverName": "daliworksWeather","model": "temperatureDaliworks","type": "temperature","category": "sensor","name": "temperature_1","deviceId": "a394cdf011134317a365118abf258e2b","virtual": "y","id": "temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267"},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : "fdsfdsfsdf",
        "reqBody" : {"network": "daliworks","driverName": "daliworksWeather","model": "temperatureDaliworks","type": "temperature","category": "sensor","name": "temperature_1","deviceId": "a394cdf011134317a365118abf258e2b","virtual": "y","id": "temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267"},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "schemaErr01" : { //add key "test":"test"
        "param" : config.me.sensorId,
        "reqBody" : {"test":"test","network": "daliworks","driverName": "daliworksWeather","model": "temperatureDaliworks","type": "temperature","category": "sensor","name": "temperature_1","deviceId": "a394cdf011134317a365118abf258e2b","virtual": "y","id": "temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { // network - number
        "param" : config.me.sensorId,
        "reqBody" : {"network": 123,"driverName": "daliworksWeather","model": "temperatureDaliworks","type": "temperature","category": "sensor","name": "temperature_1","deviceId": "a394cdf011134317a365118abf258e2b","virtual": "y","id": "temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { // driverName - number
        "param" : config.me.sensorId,
        "reqBody" : {"network": "daliworks","driverName": 123,"model": "temperatureDaliworks","type": "temperature","category": "sensor","name": "temperature_1","deviceId": "a394cdf011134317a365118abf258e2b","virtual": "y","id": "temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { //model - number
        "param" : config.me.sensorId,
        "reqBody" : {"network": "daliworks","driverName": "daliworksWeather","model": 123,"type": "temperature","category": "sensor","name": "temperature_1","deviceId": "a394cdf011134317a365118abf258e2b","virtual": "y","id": "temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : {//type - number
        "param" : config.me.sensorId,
        "reqBody" : {"network": "daliworks","driverName": "daliworksWeather","model": "temperatureDaliworks","type": 123,"category": "sensor","name": "temperature_1","deviceId": "a394cdf011134317a365118abf258e2b","virtual": "y","id": "temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { // virtual - "test"
        "param" : config.me.sensorId,
        "reqBody" : {"network": "daliworks","driverName": "daliworksWeather","model": "temperatureDaliworks","type": "temperature","category": "sensor","name": "temperature_1","deviceId": "a394cdf011134317a365118abf258e2b","virtual": "test","id": "temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr07" : { // virtual -number
        "param" : config.me.sensorId,
        "reqBody" : {"network": "daliworks","driverName": "daliworksWeather","model": "temperatureDaliworks","type": "temperature","category": "sensor","name": "temperature_1","deviceId": "a394cdf011134317a365118abf258e2b","virtual": 123,"id": "temperatureDaliworks-914af1c57e5a4caf8ab42756cddb5267"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    },
    "post" : {
      "conflict" : { //sensorId
        "reqBody" : {"network":"daliworks","driverName":"daliworksWeather","model":"humidityOpenAPI","type":"humidity","category":"sensor","name":"humidity_2","reqId": config.other.sensorId,"deviceId":"e790aa116b634aa191a0ee20780cb713","virtual":"y"},
        "expectedErr" : {
          "statusCode" : "409",
          "errCode" : "CONFLICT"
        }
      },
      "billing" : {
        "paramObj" : { gwId : config.me.limitGwId },
        "reqBody" : {"network":"daliworks","driverName":"daliworksEmulator","model":"doorEmulator","sequence":"1","type":"onoff","category":"sensor","name":"onoff_1","reqId":"onoff-777f869932564e4aa6b937a2a7f9cc2e-1","deviceId":config.me.limitDeviceId,"virtual":"y"},
        "expectedErr" : {
          "statusCode" : "471",
          "errCode" : "BILLING"
        }
      },
      "schemaErr01" : { // missing reqId
        "reqBody" : {"network":"daliworks","driverName":"daliworksWeather","model":"humidityOpenAPI","type":"humidity","category":"sensor","name":"humidity_2","deviceId":"e790aa116b634aa191a0ee20780cb713","virtual":"y"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { // network -number
        "reqBody" : {"network":123,"driverName":"daliworksWeather","model":"humidityOpenAPI","type":"humidity","category":"sensor","name":"humidity_2","reqId": "humidityOpenAPI-f5c85091f05d4da083db979cd4be62ab3","deviceId":"e790aa116b634aa191a0ee20780cb713","virtual":"y"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { // add key "test" : "test"
        "reqBody" : {"test" : "test", "network":"daliworks","driverName":"daliworksWeather","model":"humidityOpenAPI","type":"humidity","category":"sensor","name":"humidity_2","reqId": "humidityOpenAPI-f5c85091f05d4da083db979cd4be62ab3","deviceId":"e790aa116b634aa191a0ee20780cb713","virtual":"y"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { // drivername - number
        "reqBody" : {"network":"daliworks","driverName":123,"model":"humidityOpenAPI","type":"humidity","category":"sensor","name":"humidity_2","reqId": "humidityOpenAPI-f5c85091f05d4da083db979cd4be62ab3","deviceId":"e790aa116b634aa191a0ee20780cb713","virtual":"y"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { // model - number
        "reqBody" : {"network":"daliworks","driverName":"daliworksWeather","model":123,"type":"humidity","category":"sensor","name":"humidity_2","reqId": "humidityOpenAPI-f5c85091f05d4da083db979cd4be62ab3","deviceId":"e790aa116b634aa191a0ee20780cb713","virtual":"y"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { // category - number
        "reqBody" : {"network":"daliworks","driverName":"daliworksWeather","model":"humidityOpenAPI","type":"humidity","category":123,"name":"humidity_2","reqId": "humidityOpenAPI-f5c85091f05d4da083db979cd4be62ab3","deviceId":"e790aa116b634aa191a0ee20780cb713","virtual":"y"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr07" : { // virtual "test"
        "reqBody" : {"network":"daliworks","driverName":"daliworksWeather","model":"humidityOpenAPI","type":"humidity","category":"sensor","name":"humidity_2","reqId": "humidityOpenAPI-f5c85091f05d4da083db979cd4be62ab3","deviceId":"e790aa116b634aa191a0ee20780cb713","virtual":"test"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr08" : { // virtual -number
        "reqBody" : {"network":"daliworks","driverName":"daliworksWeather","model":"humidityOpenAPI","type":"humidity","category":"sensor","name":"humidity_2","reqId": "humidityOpenAPI-f5c85091f05d4da083db979cd4be62ab3","deviceId":"e790aa116b634aa191a0ee20780cb713","virtual":123},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },

    },
    "delete" : {
      "unAuthorized" : {
        "param" : config.other.sensorId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : "fdsfdsfsdf",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    }
  },
  "/gateways/{gwId}/status" : {
    "get" : {
      "unAuthorized" : {
        "paramObj": config.other,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "paramObj" : "dsfrewdsfdfds",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    },
    "put" : {
      "unAuthorized" : {
        "paramObj": config.other,
        "reqBody" : {"timeout": 90, "value" : "on"},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
       }
      },
      "notfound" : {
        "paramObj" : "dsfrewdsfdfds",
        "reqBody" : {"timeout": 90, "value" : "on"},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "schemaErr01" : { // add key "test":"test"
        "paramObj" : config.me,
        "reqBody" : {"test":"test","timeout": 90, "value" : "on"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { //timeout - string
        "paramObj" : config.me,
        "reqBody" : {"timeout": "90", "value" : "on"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { //value - number
        "paramObj" : config.me,
        "reqBody" : {"timeout": 90, "value" : 123},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { //value - "test"
        "paramObj" : config.me,
        "reqBody" : {"timeout": 90, "value" : "test"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { //missing timeout
        "paramObj" : config.me,
        "reqBody" : {"value" : "on"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { //missing value
        "paramObj" : config.me,
        "reqBody" : {"timeout": 90},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    }
  },
  "/gateways/{gwId}/sensors/{sensorId}/status" :{
    "get" : {  
      "unAuthorized01" : { //my gateway , others sensor
        "paramObj" : {
           gwId: config.me.gwId,
           sensorId : config.other.sensorId
        },
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized02" : { //others gateway , me sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : config.me.sensorId
        },
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized03" : { //others gateway , others sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : config.other.sensorId
        },
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized04" : { //others gateway , no sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : "234234dsfffdsdfs"
        },
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound01" :{ //my gateway , no sensor
        "paramObj" : {
          gwId : config.me.gwId,
          sensorId : "1234eeee54fa"
        },
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "notfound01" :{ //no gateway , my sensor
        "paramObj" : {
          gwId : "dsfdsfrw4edsfd",
          sensorId : config.me.sensorId
        },
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    },
    "put" : {
      "unAuthorized01" : { //my gateway , others sensor
        "paramObj" : {
           gwId: config.me.gwId,
           sensorId : config.other.sensorId
        },
        "reqBody" : {"timeout": 90, "value" : "on"},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized02" : { //others gateway , me sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : config.me.sensorId
        },
        "reqBody" : {"timeout": 90, "value" : "on"},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized03" : { //others gateway , others sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : config.other.sensorId
        },
        "reqBody" : {"timeout": 90, "value" : "on"},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized04" : { //others gateway , no sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : "234234dsfffdsdfs"
        },
        "reqBody" : {"timeout": 90, "value" : "on"},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound01" :{ //my gateway , no sensor
        "paramObj" : {
          gwId : config.me.gwId,
          sensorId : "fdsfdsertwdffds"
        },
        "reqBody" : {"timeout": 90, "value" : "on"},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "notfound01" :{ //no gateway , my sensor
        "paramObj" : {
          gwId : "dsfdsfrw4edsfd",
          sensorId : config.me.sensorId
        },
        "reqBody" : {"timeout": 90, "value" : "on"},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "schemaErr01" : { // add key "test":"test"
        "paramObj" : config.me,
        "reqBody" : {"test":"test","timeout": 90, "value" : "on"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { //timeout - string
        "paramObj" : config.me,
        "reqBody" : {"timeout": "90", "value" : "on"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { //value - number
        "paramObj" : config.me,
        "reqBody" : {"timeout": 90, "value" : 123},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { //value - "test"
        "paramObj" : config.me,
        "reqBody" : {"timeout": 90, "value" : "test"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { //missing timeout
        "paramObj" : config.me,
        "reqBody" : {"value" : "on"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { //missing value
        "paramObj" : config.me,
        "reqBody" : {"timeout": 90},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    }
  },
  "/gateways/{gwId}/sensors/{sensorId}/series/":{
    "get" : { //me other 403 other other 403 other me 403 xx xx 403
      "unAuthorized01" : { //my gateway , others sensor
        "paramObj" : {
           gwId: config.me.gwId,
           sensorId : config.other.sensorId
        },
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized02" : { //others gateway , me sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : config.me.sensorId
        },
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized03" : { //others gateway , others sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : config.other.sensorId
        },
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized04" : { //others gateway , no sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : "1111eeeeff34"
        },
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound01" :{ //my gateway , no sensor
        "paramObj" : {
          gwId : config.me.gwId,
          sensorId : "fdsfdsertwdffds"
        },
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "notfound01" :{ //no gateway , my sensor
        "paramObj" : {
          gwId : "dsfdsfrw4edsfd",
          sensorId : config.me.sensorId
        },
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    },
    "put" : {// past time, 
      "unAuthorized01" : { //my gateway , others sensor
        "paramObj" : {
           gwId: config.me.gwId,
           sensorId : config.other.sensorId
        },
        "reqBody" : {"value": "15","time": 1492668382336}, 
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized02" : { //others gateway , me sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : config.me.sensorId
        },
        "reqBody" : {"value": "15","time": 1492668382336}, 
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized03" : { //others gateway , others sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : config.other.sensorId
        },
        "reqBody" : {"value": "15","time": 1492668382336}, 
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized04" : { //others gateway , no sensor
        "paramObj" : {
           gwId: config.other.gwId,
           sensorId : "234234dsfffdsdfs"
        },
        "reqBody" : {"value": "15","time": 1492668382336}, 
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound01" :{ //my gateway , no sensor
        "paramObj" : {
          gwId : config.me.gwId,
          sensorId : "fdsfdsertwdffds"
        },
        "reqBody" : {"value": "15","time": 1492668382336}, 
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "notfound01" :{ //no gateway , my sensor
        "paramObj" : {
          gwId : "dsfdsfrw4edsfd",
          sensorId : config.me.sensorId
        },
        "reqBody" : {"value": "15","time": 1492668382336}, 
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "schemaErr01" : { // past time
        "paramObj" : config.me,
        "reqBody" : {"value": "15","time": 1492668382336}, 
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "INVALID_INPUT"
        }
      },
      "schemaErr02" : { // value - number
        "paramObj" : config.me,
        "reqBody" : {"value": 15,"time": 1492668382336}, 
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { // time - string
        "paramObj" : config.me,
        "reqBody" : {"value": "15","time": "1492668382336"}, 
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { // missing value
        "paramObj" : config.me,
        "reqBody" : {"time": 1492668382336}, 
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { // missing time
        "paramObj" : config.me,
        "reqBody" : {"value": "15"}, 
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { // add key "test":"test"
        "paramObj" : config.me,
        "reqBody" : {"test":"test", "value": "15","time": 1492668382336}, 
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    }
  },
  "/rules/" : {
    "get" : { 
      "unAuthorized" : {
        "param" : config.other.ruleId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : config.me.ruleIdNotFound,
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    },
    "put" : {
      "unAuthorized" : {
        "param" : config.other.ruleId,
        "reqBody" : {"name" : "changed name", "status": "activated","severity": "warning"},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : config.me.ruleIdNotFound,
        "reqBody" : {"name" : "changed name", "status": "activated","severity": "warning"},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "schemaErr01" : { // add key "test":"test"
        "param" : config.me.ruleId,
        "reqBody" : {"test":"test", "name" : "changed name", "status": "activated","severity": "warning"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { //"actions" :{}
        "param" : config.me.ruleId,
        "reqBody" : {"actions" :{}, "name" : "changed name", "status": "activated","severity": "warning"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { //"conditions":{}
        "param" : config.me.ruleId,
        "reqBody" : {"conditions":{}, "name" : "changed name", "status": "activated","severity": "warning"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { //"desc" - number
        "param" : config.me.ruleId,
        "reqBody" : {"desc":123, "name" : "changed name", "status": "activated","severity": "warning"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { // name - number
        "param" : config.me.ruleId,
        "reqBody" : {"name" : 123, "status": "activated","severity": "warning"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { //severity - "test"
        "param" : config.me.ruleId,
        "reqBody" : {"name" : "changed name", "status": "activated","severity": "test"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr07" : { //severity - number
        "param" : config.me.ruleId,
        "reqBody" : {"name" : "changed name", "status": "activated","severity": 123},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr08" : { //status - "test"
        "param" : config.me.ruleId,
        "reqBody" : {"name" : "changed name", "status": "test","severity": "warning"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr09" : { //status - numer
        "param" : config.me.ruleId,
        "reqBody" : {"name" : "changed name", "status": 123,"severity": "warning"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr10" : { //template - boolean
        "param" : config.me.ruleId,
        "reqBody" : {"name" : "changed name", "status": "activated","severity": "warning", "template":true},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr11" : { //template - "test"
        "param" : config.me.ruleId,
        "reqBody" : {"name" : "changed name", "status": "activated","severity": "warning", "template":"test"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr12" : { //timezone - number
        "param" : config.me.ruleId,
        "reqBody" : {"name" : "changed name", "status": "activated","severity": "warning", "timezone": 123},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr13" : { //"trigger" : {}
        "param" : config.me.ruleId,
        "reqBody" : {"trigger" : {}, "name" : "changed name", "status": "activated","severity": "warning"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    },
    "post" : {
      "schemaErr01" : { //missing actions
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"status":"deactivated","timezone":"+9.00","desc":"test","template":"false","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { //missing name
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","timezone":"+9.00","desc":"test","template":"false","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { //missing severity
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","timezone":"+9.00","desc":"test","template":"false"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { //missing status
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"timezone":"+9.00","desc":"test","template":"false","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { //missing timezone
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","desc":"test","template":"false","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { // missing trigger
        "reqBody" : {"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","timezone":"+9.00","desc":"test","template":"false","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr07" : { // trigger : {}
        "reqBody" : {"trigger":{},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","timezone":"+9.00","desc":"test","template":"false","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr08" : { //actions : []
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[],"status":"deactivated","timezone":"+9.00","desc":"test","template":"false","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr09" : { //desc - number
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","timezone":"+9.00","desc":123,"template":"false","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr10" : { // name - number
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":123,"conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","timezone":"+9.00","desc":"test","template":"false","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr11" : { //severity - "test"
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","timezone":"+9.00","desc":"test","template":"false","severity":"test"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr12" : { //severity - number
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","timezone":"+9.00","desc":"test","template":"false","severity":123},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr13" : { //status - number
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":123,"timezone":"+9.00","desc":"test","template":"false","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr14" : { //template - "test"
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","timezone":"+9.00","desc":"test","template":"test","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr15" : { //template - boolean
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","timezone":"+9.00","desc":"test","template":false,"severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr16" : { //timezone - number
        "reqBody" : {"trigger":{"agent":"timeScheduler","type":"timeScheduler","method":{"name":"test","id":"atEveryHour","params":{"minute":25}},"filter":{"type":["schedule"],"gateway":"*","sensor":"*"}},"name":"test","conditions":[[{"agent":"sensorValue","type":"temperature","method":{"name":"test","id":"under","params":{"degree":33,"target":{"type":"gateway","id":"b827eb5b8936","sensors":["b827eb5b8936-0-temp"]}}}}]],"actions":[[{"agent":"webPush","type":"webPush","method":{"name":"push","id":"push","params":{"body":"{{target}} <i class=\"fa fa-clock-o\"></i>{{time}} & {{conditionValue}} {{conditionSensor}}@{{conditionGateway}} ({{conditionIf}})"}}}]],"status":"deactivated","timezone":123,"desc":"test","template":"false","severity":"information"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    },
    "delete" : {
      "unAuthorized" : {
        "param" : config.other.ruleId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : config.me.ruleIdNotFound,
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    }
  },
  "/pushDevices/" : {
    "get" : {
      "unAuthorized" : {
        "param" : config.other.pushDeviceId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : "notfoundxxefdlfljkdfsjlkfjl",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    },
    "put" : {
      "unAuthorized" : {
        "param" : config.other.pushDeviceId,
        "reqBody" : {"provider":"g","activated":"n","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : "notfoundxxefdlfljkdfsjlkfjl",
        "reqBody" : {"provider":"g","activated":"n","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "schemaErr01" : { // add key "test" : "test"
        "param" : config.me.pushDeviceId,
        "reqBody" : {"test" : "test", "provider":"g","activated":"n","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { // provider - "test"
        "param" : config.me.pushDeviceId,
        "reqBody" : {"provider":"test","activated":"n","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { //provider - number
        "param" : config.me.pushDeviceId,
        "reqBody" : {"provider":123,"activated":"n","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { //activated -"test"
        "param" : config.me.pushDeviceId,
        "reqBody" : {"provider":"g","activated":"test","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { //activated - number
        "param" : config.me.pushDeviceId,
        "reqBody" : {"provider":"g","activated":123,"authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { //authClientId -number
        "param" : config.me.pushDeviceId,
        "reqBody" : {"provider":"g","activated":"n", "authClientId": 123},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    },
    "post": {
      "conflict" : {
        "reqBody" : {"reqId":config.me.pushDeviceId,"provider":"a","activated":"n","authClientId":"chrislee"},
        "expectedErr" : {
          "statusCode" : "409",
          "errCode" : "CONFLICT"
        }
      },
      "schemaErr01" : { // add key "test" : "test"
        "reqBody" : {"test" : "test", "reqId":"testjlsjldjflkdsjfljlkjklfj", "provider":"g","activated":"n","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { // provider - "test"
        "reqBody" : {"reqId":"testjlsjldjflkdsjfljlkjklfj","provider":"test","activated":"n","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { //provider - number
        "reqBody" : {"reqId":"testjlsjldjflkdsjfljlkjklfj","provider":123,"activated":"n","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { //activated -"test"
        "reqBody" : {"reqId":"testjlsjldjflkdsjfljlkjklfj","provider":"g","activated":"test","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { //activated - number
        "reqBody" : {"reqId":"testjlsjldjflkdsjfljlkjklfj","reqId":"testjlsjldjflkdsjfljlkjklfj","provider":"g","activated":123,"authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { //authClientId -number
        "reqBody" : {"reqId":"testjlsjldjflkdsjfljlkjklfj","provider":"g","activated":"n","authClientId":123},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr07" : { //missing reqId
        "reqBody" : {"provider":"g","activated":"n","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr08" : { //missing provider
        "reqBody" : {"reqId":"testjlsjldjflkdsjfljlkjklfj","activated":"n","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr09" : { //missing activated
        "reqBody" : {"reqId":"testjlsjldjflkdsjfljlkjklfj","provider":"g","authClientId":"admin"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr10" : { // missing authClientId 
        "reqBody" : {"reqId":"testjlsjldjflkdsjfljlkjklfj","provider":"g","activated":"n"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    },
    "delete" : {
      "unAuthorized" : {
        "param" : config.other.pushDeviceId,
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "param" : "notfoundxxefdlfljkdfsjlkfjl",
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      }
    }
  },
  "/controlActuator" : {
    "post" : {
      "timeout" : {
        "reqBody" : {"id":config.me.gwId,"act":"controlActuator","params":{"id":config.me.sensorId,"cmd":"get","options":{"row":1,"column":1,"text":"aaa"}}},
        "expectedErr" : {
          "statusCode" : "504", // --timeout 31000 option 필요
          "errCode" : "PROCESS_COMMAND_RESULT"
        }
      },
      "unAuthorized" : {
        "reqBody" : {"id":config.me.actGwId,"act":"controlActuator","params":{"id":config.other.sensorId,"cmd":"get","options":{"row":1,"column":1,"text":"aaa"}}},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound" : {
        "reqBody" : {"id":"dfdsfdsfsdfsdfdsffdsffsdf","act":"controlActuator","params":{"id":"ffsdfdsfsdffsfsd","cmd":"get","options":{"row":1,"column":1,"text":"aaa"}}},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" :"NOT_FOUND"
        }
      },
      "schemaErr01" : { //missing Id
        "reqBody" : {"act":"controlActuator","params":{"id":config.me.actSensorId,"cmd":"print","options":{"row":0,"column":0,"text":"test"}}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { // missing act
        "reqBody" : {"id":config.me.actGwId,"params":{"id":config.me.actSensorId,"cmd":"print","options":{"row":0,"column":0,"text":"test"}}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { // missing params
        "reqBody" : {"id":config.me.actGwId,"act":"controlActuator"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { // missing params.id
        "reqBody" : {"id":config.me.actGwId,"act":"controlActuator","params":{"cmd":"print","options":{"row":0,"column":0,"text":"test"}}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { // missing params.cmd
        "reqBody" : {"id":config.me.actGwId,"act":"controlActuator","params":{"id":config.me.actSensorId,"options":{"row":0,"column":0,"text":"test"}}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { // add additionalProperties "test" : "test"
        "reqBody" : {"test":"test", "id":config.me.actGwId,"act":"controlActuator","params":{"id":config.me.actSensorId,"cmd":"print","options":{"row":0,"column":0,"text":"test"}}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr07" : { // act - number
        "reqBody" : {"id":config.me.actGwId,"act":123,"params":{"id":config.me.actSensorId,"cmd":"print","options":{"row":0,"column":0,"text":"test"}}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr08" : { // params.cmd - number
        "reqBody" : {"id":config.me.actGwId,"act":"controlActuator","params":{"id":config.me.actSensorId,"cmd":123,"options":{"row":0,"column":0,"text":"test"}}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr09" : { //params.options - string
        "reqBody" : {"id":config.me.actGwId,"act":"controlActuator","params":{"id":config.me.actSensorId,"cmd":"print","options":"test"}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr10" : { // add additionalProperties "test" : "test" in params
        "reqBody" : {"id":config.me.actGwId,"act":"controlActuator","params":{"test" : "test","id":config.me.actSensorId,"cmd":"print","options":"test"}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    }
  },
  "/registerGateway" : {
    "post" : {
      "unAuthorized01" : {
        "reqBody" : {"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","siteId":config.other.siteId,"model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "unAuthorized02" : {
        "reqBody" : {"id":config.other.gwId,"params":{"name":"Sumul3","siteId":config.me.siteId,"model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "notfound01" : { //site
        "reqBody" : {"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","siteId":"10000","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "notfound02" : { //modelId
        "reqBody" : {"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","siteId":config.me.siteId,"model":"1000","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "notfound03" : { //site =" "
        "reqBody" : {"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","siteId":" ","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "404",
          "errCode" : "NOT_FOUND"
        }
      },
      "multistatus02" : {
        "reqBody" : {"id":"af135c176df24ed9a57412b1bdf7fef4","params":{"name":"Sumul3","siteId":config.me.siteId,"model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":config.other.deviceId,"name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "207",
          "errCode" : "CONFLICT"
        }
      },
      "multistatus03" : {
        "reqBody" : {"id":"af135c176df24ed9a23497b1bdf7fef4","params":{"name":"Sumul3","siteId":config.me.notPlanSiteId,"model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "471",
          "errCode" : "BILLING"
        }
      },
      "schemaErr01" : { //missing Id
        "reqBody" :{"params":{"name":"Sumul3","siteId":"10","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { //missing params
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { //missing params.siteId
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { //missing params.model
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","siteId":"10","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { //missing params.name
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"siteId":"10","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { //missing params.devicemodels.model
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","siteId":"10","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr07" : {// missing params.sensors.reqId
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","siteId":"10","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr08" : { // id -""
        "reqBody" :{"id":"","params":{"name":"Sumul3","siteId":"10","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr09" : { // site - ""
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","siteId":"","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"y","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr10" : { //virtual - test
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","siteId":"10","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"test","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr11" : { //delegate - "test"
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"delegate":"test","name":"Sumul3","siteId":"10","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"n","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr12" : { //"autoCreateDiscoverable":"test"
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"autoCreateDiscoverable":"test","name":"Sumul3","siteId":"10","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"n","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr13" : { //category : "test"
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","siteId":"10","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"n","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"test","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"y"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr14" : { //sensors.virtual = "test"
        "reqBody" :{"id":"af135c176df24ed9a57497b1bdf7fef4","params":{"name":"Sumul3","siteId":"10","model":"32","deviceModels":[{"id":"ebcf17cdbb39438a858b099cdf240611","model":"sensorSimulator"}],"virtual":"n","reportInterval":1200000,"devices":[{"reqId":"ebcf17cdbb39438a858b099cdf240611","name":"Simul Device 3","model":"sensorSimulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksWeather","model":"humidityDaliworks","type":"humidity","category":"sensor","name":"humidity_2","reqId":"humidityDaliworks-af135c176df24ed9a57497b1bdf7fef4","deviceId":"ebcf17cdbb39438a858b099cdf240611","virtual":"test"}]}},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    }
  },
  "/registerGatewayKey" : {
    "post" : {
      "unAuthorized" : {
        "reqBody" : {"id":config.other.gwId,"modelId":"32","authType":"apikey"},
        "expectedErr" : {
          "statusCode" : "403",
          "errCode" : "ACCESSGROUP_DENY"
        }
      },
      "schemaErr08" : { // invalid gateway id
        "reqBody" : {"id":"1111gfd111e1","modelId":"32","authType":"apikey"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr01" : { //add key "test":"test"
        "reqBody" : {"id":config.me.gwId,"modelId":"32","authType":"apikey", "test":"test"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr02" : { // missing id
        "reqBody" : {"modelId":"32","authType":"apikey"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr03" : { // missing modelId
        "reqBody" : {"id":config.me.gwId,"authType":"apikey"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr04" : { //missing authType
        "reqBody" : {"id":config.me.gwId,"modelId":"32"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr05" : { //authType = "test"
        "reqBody" : {"id":config.me.gwId,"modelId":"32","authType":"test"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr06" : { // model Id - number
        "reqBody" : {"id":config.me.gwId,"modelId":32,"authType":"apikey"},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      },
      "schemaErr07" : { // authType - number
        "reqBody" : {"id":config.me.gwId,"modelId":"32","authType":123},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "SCHEMA_VALIDATE"
        }
      }
    }
  },
  "/activateGatewayKey" : {
    "post" : { 
      "otherkey" : { //other vendorkey
        "reqBody" : {"gatewayId":config.me.gwId,"vendorKey":config.other.vendorKey},
        "expectedErr" : {
          "statusCode" : "400",
          "errCode" : "MISMATCH_ERROR"
        }
      },
      "othergw" : { // registered gateway by other vendor key
          "reqBody" : {"gatewayId":config.other.gwId,"vendorKey":config.me.vendorKey},
          "expectedErr" : {
            "statusCode" : "400",
            "errCode" : "MISMATCH_ERROR"
        }
      },
      "dummyGwId" : { //dummy gateway Id
          "reqBody" : {"gatewayId":"b324494bd2394aaab02fc540670f474c","vendorKey":config.other.vendorKey},
          "expectedErr" : {
            "statusCode" : "500",
            "errCode" : "QUERY_RESULT_EMPTY"
          }
       },
       "invalidGwId" : { //invalid gateway Id
          "reqBody" : {"gatewayId":"b324494bd2394aaddab02fc540670f474c","vendorKey":config.other.vendorKey},
          "expectedErr" : {
            "statusCode" : "400",
            "errCode" : "SCHEMA_VALIDATE"
          }
       },
       "dummyVendorKey" : { //dummy vendorkey 
          "reqBody" : {"gatewayId":config.me.gwId,"vendorKey":"h5z68lamBLBmvKUesdeiOA8DmQs="},
          "expectedErr" : {
            "statusCode" : "404",
            "errCode" : "NOT_FOUND"
          }
       },
       "notyet" : { // my vendorkey but not read to registerdkey yet
          "reqBody" : {"gatewayId":config.me.actGwId,"vendorKey":config.other.vendorKey},
          "expectedErr" : {
            "statusCode" : "500",
            "errCode" : "QUERY_RESULT_EMPTY"
          }
       },
       "schemaErr01" : { //missing gateway Id
          "reqBody" : {"vendorKey":config.other.vendorKey},
          "expectedErr" : {
            "statusCode" : "400",
            "errCode" : "SCHEMA_VALIDATE"
          }
       },
       "schemaErr02" : { //mising vendorKey
          "reqBody" : {"gatewayId":config.me.gwId},
          "expectedErr" : {
            "statusCode" : "400",
            "errCode" : "SCHEMA_VALIDATE"
          }
       },
       "schemaErr03" : { //number type -  gateway Id
          "reqBody" : {"gatewayId":123,"vendorKey":config.other.vendorKey},
          "expectedErr" : {
            "statusCode" : "400",
            "errCode" : "SCHEMA_VALIDATE"
          }
       },
       "schemaErr04" : { //Not string type -  gateway Id
          "reqBody" : {"gatewayId":{},"vendorKey":config.other.vendorKey},
          "expectedErr" : {
            "statusCode" : "400",
            "errCode" : "SCHEMA_VALIDATE"
          }
       },
       "schemaErr05" : { //number - vendorkey
          "reqBody" : {"gatewayId":config.me.gwId,"vendorKey":123},
          "expectedErr" : {
            "statusCode" : "400",
            "errCode" : "SCHEMA_VALIDATE"
          }
       }
     }
  }
}