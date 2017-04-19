'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var chakram = require('chakram'),
	expect = chakram.expect,
	async = require('async'),
  $RefParser = require('json-schema-ref-parser'),
  Ajv = require('ajv'),
	_ = require('lodash');
  
var config = require('./config_ihmini.js'),
  swagger = require('./swagger.json'),
  ajv = new Ajv(),
  apiPaths = swagger.paths;
  
var REST_METHODS = ['get', 'put', 'post', 'delete'];

var testAPIList = [
  // "/oauth2/authClients",
  // "/oauth2/authorize",
  // "/oauth2/token",
  "/users/me",
  "/users/{id}",
  "/users",
  
  "/gatewayModels",
  "/gatewayModels/{id}",
  "/sensorTypes",
  "/sensorTypes/{id}",
  "/sensorDrivers",
  "/sensorDrivers/{id}",
  "/gateways",
  
  // "/gateways/{id}",
  // "/gateways/{owner}/devices/{id}",
  // "/gateways/{owner}/devices",
  // "/gateways/{owner}/sensors/{id}",
  // "/gateways/{owner}/sensors",
  // "/gateway/{id}/status",
  // "/gateways/{owner}/sensors/{id}/status",
  // "/gateways/{owner}/sensors/{id}/series",
  // "/rules/{id}",
  // "/rules",
  // "/pushDevices",
  // "/pushDevices/{id}",
  // "/controlActuator",
  // "/registerGateway",
  // "/registerGatewayKey",
  // "/activateGatewayKey",
  // "/manageGateway",
];

var afterEffect = {
  "/users/me:get": afterPost.bind(null, 'users'),
  "/gatewayModels:get": afterPost.bind(null, 'gatewayModels'),
  "/sensorTypes:get": afterPost.bind(null, 'sensorTypes'),
  "/sensorDrivers:get": afterPost.bind(null, 'sensorDrivers'),
  "/gateways:get": afterPost.bind(null, 'gateways'),
};

/**
 * supplant("/gateways/{owner}/devices/{id}", {id: 'myId', owner: 'me'})
 * => /gateways/me/devices/myId
*/
function supplant(str, obj) {
  return str.replace(/\{([^{}]*)\}/g, function (asIs, key) {
    var val = obj[key];
    return _.isNumber(val) || _.isString(val) ? val : asIs;
  });
}

var apiObjects = {};
function afterPost(apiStartName, obj) {
  if (_.isArray(obj)) {
    obj = obj[0];
  }
  
  if (apiStartName === 'gateways') {
    console.log('apiStartName=', apiStartName, obj);
  }
  
  apiObjects[apiStartName] = obj;
}

// path : "/gateways/{owner}/devices/{id}" => /gateways/aabbccddee/devices/12345
function renderUrl(path) {
  var apiStartName = path.split('/')[1];
  var obj = apiObjects[apiStartName];
  if (!obj) return path;
  
  // console.log('@apiStartName=', apiStartName, ' obj=', obj);
  return supplant(path, obj);
}

function getRequestBody(url, method, opInfo) {
  var obj = opInfo.parameters[0].schema.example;
  if (method === 'put') {
    obj = apiObjects[apiStartName];
  }
  return obj;
}

// expect(respObj).to.have.schema(swagger.definitions.Errors) // validate against Errors

var removeKeys = ['x-stoplight']
function removeValues(obj) {
  _.forOwn(obj, function(val, key) {
    if (_.includes(removeKeys, key)) {
      delete obj[key];
    } else {
      if (_.isObject(obj)) {
        removeValues(obj[key]);
      }
    }
  });
}

// var definitions = {};
// _.forOwn(swagger.definitions, function(val, key) {
//   definitions['#/definitions/' + key ] = val;
// });
// 
removeValues(swagger);
// chakram.addSchema('http://example.com/schema', definitions); // add all definitions

var httplogin = config.login;
var authInfo;
function login(done) {
    chakram.post(config.host + "/login", httplogin).then(function(res) {
      expect(res).to.have.status(200);
      authInfo = {jar: res.jar};
      done();
    });
}

describe("Rest API Test", function () {
  before("Login", function (done) {
    async.series([
      login,
      function parseSchema(next) {
        $RefParser.dereference(swagger, function(err, parsedSchema) {
          swagger = parsedSchema;
          next(err);
        });
      }
    ], function(err) {
      expect(err).to.not.exist;
      done();
    })
  });
  
  describe("api call", function () {
    _.forEach(testAPIList, function(url) {
      var obj = apiPaths[url];
      // console.log('url=', url);
      // console.log('obj=', obj);
      
      _.forOwn(obj, function(opInfo, method) {
        if (!_.includes(REST_METHODS, method)) return;
        
        it(opInfo.summary + ' Test:' + url + ' (' + method + ')', function () {
          var apiCall, reqBody;
          
          var renderedUrl = renderUrl(url);
          console.log('@rendered url:', renderedUrl);
          if (method === 'get' || method === 'delete') {
            apiCall = chakram[method](config.host + renderedUrl, authInfo);
          } else {
            console.log('@method=', method);
            reqBody = getRequestBody(url, method, opInfo);
            console.log('@reqBody=', reqBody);
            apiCall = chakram[method](config.host + renderedUrl, reqBody, authInfo);
          }
          
          return apiCall.then(function(res) {
            var body = res.body;
            var statusCode = res.response.statusCode;
            var responseInfo = opInfo.responses[statusCode];
            var schema = responseInfo && responseInfo.schema;
            
            expect(schema, ' statusCode=' + statusCode).to.be.an.object;
            expect(res).to.have.status(200);
            expect(body).to.be.an.object;
            expect(body.data).to.be.an.object;
            
            var afterFn = afterEffect[url + ':' + method];
            afterFn && afterFn(body.data);
            
            var isValid = ajv.validate(schema, body);
            if (!isValid) {
              console.log('body=', body);
              console.log('schema=', schema);
            }
            expect(isValid, ajv.errorsText()).to.be.true;
          });
        });
      }); // forOwn
      
    }); // forEach
  });
  
  after("after hook", function () {
    console.log('finished!');
  });
});
