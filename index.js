'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var chakram = require('chakram'),
  prettyjson = require('prettyjson'),
	expect = chakram.expect,
	async = require('async'),
  $RefParser = require('json-schema-ref-parser'),
  Ajv = require('ajv'),
	_ = require('lodash');
  
var config = require('./config_ihmini'),
  swagger = require('./swagger.json'),
  tutil = require('./test-util'),
  ajv = new Ajv(),
  apiPaths = swagger.paths;
  
// 아래 TEST_API_LIST 와 결합해서 다음과 같은 순서로 API 테스트가 진행됨.
// 룰을 예로 들면, /rules post, /rules get (list), /rules/{id} get, /rules/{id} put, /rules/{id} delete
// 이와 같이 한 이유는 처음 post 데이터를 get하고 put 한 다음에 delete 하는 사이클로 테스트되도록 하고자 함임.
var REST_METHODS = ['post', 'get', 'put', 'delete'];  // order is important for test

var TEST_API_LIST = [
  // "/oauth2/authClients",
  // "/oauth2/authorize",
  // "/oauth2/token",
  
  // "/users/me",
  // "/users/{id}",
  // "/users",
  // 
  // "/gatewayModels",
  // "/gatewayModels/{id}",
  // 
  // "/sensorTypes",
  // "/sensorTypes/{id}",
  // 
  // "/sensorDrivers",
  // "/sensorDrivers/{id}",
  // 
  // "/pushDevices",
  // "/pushDevices/{id}",
  // 
  // "/rules",
  // "/rules/{id}",
  
  '/registerGateway',
  '/gateways',
  
  // "/gateways/{owner}/devices",
  // "/gateways/{owner}/sensors",
  // "/gateways/{owner}/sensors/{id}",
  
  // "/gateways/{owner}/sensors/{id}/status",
  // "/gateways/{owner}/sensors/{id}/series",
  
  // "/gateways/{owner}/devices/{id}",
  
  // "/controlActuator",
  
  // "/registerGatewayKey",
  // "/activateGatewayKey",
  // "/manageGateway",
  
  // "/gateway/{id}/status",
  '/gateways/{id}',
];

var METHOD_STATUS = {
  post: 201,
  get: 200,
  put: 200,
  delete: 204
};

// API 호출 테스트에스 각 API 호출 간에 tracking할 데이터를 관리하기 위함.
var afterEffect = {
  '/users/me:get': tutil.saveObjectForNextApiCall.bind(null, 'users'),
  '/gatewayModels:get': tutil.saveObjectForNextApiCall.bind(null, 'gatewayModels'),
  '/sensorTypes:get': tutil.saveObjectForNextApiCall.bind(null, 'sensorTypes'),
  '/sensorDrivers:get': tutil.saveObjectForNextApiCall.bind(null, 'sensorDrivers'),
  '/pushDevices:post': tutil.saveObjectForNextApiCall.bind(null, 'pushDevices'),
  '/rules:post': tutil.saveObjectForNextApiCall.bind(null, 'rules'),
  '/registerGateway:post': tutil.saveObjectForNextApiCall.bind(null, 'gateways'),
  '/gateways/{id}:get': tutil.saveObjectForNextApiCall.bind(null, 'gateways'),
};

function removeSomeRestriction() {
  _.pull(swagger.definitions['rule-input'].properties.trigger.properties.method.required, 'params');
}

// output 체크시 불필요한 사항 제거
(function init() {
  removeSomeRestriction();
  tutil.removeValues(swagger, ['x-stoplight']);
}());

describe('Rest API Test', function () {
  var authInfo;
  
  before('Login', function (done) {
    async.series([
      function (next) {
        tutil.login(config, function(auth) {
          var err;
          authInfo = auth;
          if (!authInfo) {
            err = new Error('Login failed!');
          }
          next(err);
        });
      },
      function parseSchema(next) {
        $RefParser.dereference(swagger, function(err, parsedSchema) {
          swagger = parsedSchema;
          next(err);
        });
      }
    ], function(err) {
      expect(err).to.not.exist;
      done();
    });
  });
  
  describe('api call', function () {
    _.forEach(TEST_API_LIST, function(url) {
      var obj = apiPaths[url];
      // console.log('url=', url);
      // console.log('obj=', obj);
      
      _.forEach(REST_METHODS, function(method) {
        var opInfo = obj[method];
        if (!opInfo) { return; }
        
        it(opInfo.summary + ' Test:' + url + ' (' + method + ')', function () {
          var apiCall, reqBody;
          
          var renderedUrl = tutil.renderUrl(url);
          console.log(method.toUpperCase() + ':' + renderedUrl);
          if (method === 'get') {
            apiCall = chakram[method](config.host + renderedUrl, authInfo);
          } else {
            reqBody = tutil.getRequestBody(url, method, opInfo);
            // console.log('@reqBody=', reqBody);
            apiCall = chakram[method](config.host + renderedUrl, reqBody, authInfo);
          }
          
          return apiCall.then(function(res) {
            var body = res.body;
            var statusCode = res.response.statusCode;
            var responseInfo = opInfo.responses[statusCode];
            var schema = responseInfo && responseInfo.schema;
            
            if (statusCode >= 300) {
              console.log('Error!! statusCode=', statusCode);
              console.log('>>>>>>> req body:\n', reqBody && prettyjson.render(reqBody));
              console.log('<<<<<<< res body:\n', body && prettyjson.render(body));
            // } else {
              // console.log('@@@@@@@@@@@ renderedUrl=', renderedUrl);
              // console.log('>>>>>>> req body:\n', reqBody && prettyjson.render(reqBody));
              // console.log('<<<<<<< res body:\n', body && prettyjson.render(body));
            }
              
            expect(schema, ' statusCode=' + statusCode).to.be.an.object;
            expect(res, ' @statusCode=' + statusCode).to.have.status(METHOD_STATUS[method]);
            
            if (method === 'delete') { return; }
            
            expect(body).to.be.an.object;
            expect(body.data).to.be.an.object;
            
            var storeObj = afterEffect[url + ':' + method];
            storeObj && storeObj(body.data);
            
            // console.log('@schema=', schema);
            
            var isValid = ajv.validate(schema, body);
            if (!isValid) {
              console.log('body=', body);
              console.log('schema=', schema);
            }
            expect(isValid, ajv.errorsText()).to.be.true;
          });
        });
      });
      
    });
  });
  
  after('after hook', function (done) {
    tutil.logout(config, done);
    console.log('finished!');
  });
});
