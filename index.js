'use strict';

/* jshint quotmark: false */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var chakram = require('chakram'),
  prettyjson = require('prettyjson'),
	expect = chakram.expect,
	async = require('async'),
  $RefParser = require('json-schema-ref-parser'),
  Ajv = require('ajv'),
	_ = require('lodash');
  
var config = require('./config_sandbox'),
  swagger = require('./swagger.json'),
  tutil = require('./test-util'),
  ajv = new Ajv(),
  apiPaths = swagger.paths;
  
// 아래 TEST_API_LIST 와 결합해서 다음과 같은 순서로 API 테스트가 진행됨.
// 룰을 예로 들면, /rules post, /rules get (list), /rules/{id} get, /rules/{id} put, /rules/{id} delete
// 이와 같이 한 이유는 처음 post 데이터를 get하고 put 한 다음에 delete 하는 사이클로 테스트되도록 하고자 함임.
var REST_METHODS = ['post', 'get', 'put', 'delete'];  // order is important for test
// var REST_METHODS = ['post', 'get'];  // order is important for test

var TEST_API_LIST = [
  // oauth2 관련 테스트는 API 테스트로 자동화 하기 힘들어 수동으로 테스트 함.
  // '/oauth2/authClients',
  // '/oauth2/authorize',
  // '/oauth2/token',
  
  '/users/me',
  '/users/{id}',
  '/users',
  
  '/gatewayModels',
  '/gatewayModels/{id}',
  
  '/sensorTypes',
  '/sensorTypes/{id}',
  
  '/sensorDrivers',
  '/sensorDrivers/{id}',
  
  '/pushDevices',
  '/pushDevices/{id}',
  
  '/rules',
  '/rules/{id}',
  
  '/registerGateway',
  '/gateways',
  
  '/gateways/{owner}/devices',
  '/gateways/{owner}/sensors',
  
  '/gateways/{owner}/sensors/{id}/status',
  '/gateways/{owner}/sensors/{id}/series',
  
  '/gateways/{owner}/sensors/{id}',
  '/gateways/{owner}/devices/{id}',
  
  '/controlActuator',
  
  '/registerGatewayKey',
  // '/activateGatewayKey',  // 자동테스트가 너무 복잡해서 수동으로 테스트 할 것.
  // '/manageGateway',       // 이번에는 Open 대상에서 제외.

  '/gateways/{id}/status',
  
  '/gateways/{id}',
];

var METHOD_STATUS = {
  post: 201,
  get: 200,
  put: 200,
  delete: 204
};

function methodStatus(url, method) {
  switch (url + ':' + method) {
    case '/controlActuator:post': return 200;
    case '/registerGatewayKey:post': return 200;
  }
  
  return METHOD_STATUS[method];
}

// 여기서 선언된 request body를 swagger.json schema example의 데이터보다 우선적으로 사용함.
//schema 대신에 쓰고 싶은 request body는 여기에 다시 정의 
var preSetReqBody = {
  '/gateways/{owner}/sensors/{id}/status:put': function(opInfo) {
    return opInfo.parameters[0].schema.example;
  },
  '/gateways/{owner}/sensors/{id}/series:put': function() {
    return {
      value: '123',
      time: Date.now()
    };
  },
  '/controlActuator:post': function() {
    // 아래 데이터는 테스트 하는 환경에 맞게 바꿔줄 필요 있음.
    return {"id":"b827ebda7b2a","act":"controlActuator","params":{"id":"b827ebda7b2a-0-relay","cmd":"on","options":{"duration":3000}}};
  },
  '/registerGatewayKey:post': function() {
    return preSetReqBody['registerGatewayKey'];
  },
  '/gateways/{id}/status:put': function() {
    return {
      "timeout": 1000,
      "value": "on"
    };
  },
  '/registerGateway:post' : function (){
    // jshint -W101
    return {"id":"8cf8afabb6264e2d8ec15c5955e84e5c","params":{"name":"MyVirtualGateway","siteId":config.me.siteId,"model":"6","deviceModels":[{"id":"9944c36915f44a428b07e25c5e5e72c9","model":"emulator"}],"virtual":"y","reportInterval":3600000,"devices":[{"reqId":"9944c36915f44a428b07e25c5e5e72c9","name":"MySensorEmulDevice","model":"emulator"}],"sensors":[{"network":"daliworks","driverName":"daliworksEmulator","model":"temperatureEmulator","sequence":"1","type":"temperature","category":"sensor","name":"temperature_1","reqId":"temperature-8cf8afabb6264e2d8ec15c5955e84e5c-1","deviceId":"9944c36915f44a428b07e25c5e5e72c9","virtual":"y"},{"network":"daliworks","driverName":"daliworksEmulator","model":"co2Emulator","sequence":"1","type":"co2","category":"sensor","name":"co2_1","reqId":"co2-8cf8afabb6264e2d8ec15c5955e84e5c-1","deviceId":"9944c36915f44a428b07e25c5e5e72c9","virtual":"y"},{"network":"daliworks","driverName":"daliworksEmulator","model":"coEmulator","sequence":"1","type":"co","category":"sensor","name":"co_1","reqId":"co-8cf8afabb6264e2d8ec15c5955e84e5c-1","deviceId":"9944c36915f44a428b07e25c5e5e72c9","virtual":"y"}]}};
  },
  '/gateways/{id}/status:get': tutil.saveObjectForNextApiCall.bind(null, 'gateways-status'),
};

// API 호출 테스트에스 각 API 호출 간에 tracking할 데이터를 관리하기 위한 함수로,
// 각 API 호출전에 보관되어 request Object 혹은 paramemter Object로 사용될 객체를 저장해둠.
var afterEffect = {
  '/users/me:get': tutil.saveObjectForNextApiCall.bind(null, 'users'),
  '/gatewayModels:get': tutil.saveObjectForNextApiCall.bind(null, 'gatewayModels'),
  '/sensorTypes:get': tutil.saveObjectForNextApiCall.bind(null, 'sensorTypes'),
  '/sensorDrivers:get': tutil.saveObjectForNextApiCall.bind(null, 'sensorDrivers'),
  '/pushDevices:post': tutil.saveObjectForNextApiCall.bind(null, 'pushDevices'),
  '/rules:post': tutil.saveObjectForNextApiCall.bind(null, 'rules'),
  
  '/registerGateway:post': function(gwObj) {
    tutil.saveObjectForNextApiCall('gateways', gwObj);
    
    // for Gateway devices CRUD
    tutil.saveObjectForNextApiCall('gateways-devices', {owner: gwObj.id});
    // for Gateway sensors CRUD
    tutil.saveObjectForNextApiCall('gateways-sensors', {owner: gwObj.id});
    preSetReqBody['registerGatewayKey'] = {
      id: gwObj.id, modelId: gwObj.model, authType: "apikey"
    };
    
    tutil.saveObjectForNextApiCall('gateways-status', gwObj);
    
    // preSetReqBody['registerGatewayKey?authType=apikeyReady'] = {
    //   id: gwObj.id, modelId: gwObj.model, authType: "apikeyReady"
    // };
  },
  
  '/gateways/{owner}/devices:post': tutil.saveObjectForNextApiCall.bind(null, 'gateways-devices'),
  // '/gateways/{owner}/sensors:post': tutil.saveObjectForNextApiCall.bind(null, 'gateways-sensors'),
  '/gateways/{owner}/sensors:post': function(sensorObj) {
    
    tutil.saveObjectForNextApiCall('gateways-sensors', sensorObj);
    
    // for Gateway sensors status & series RU
    tutil.saveObjectForNextApiCall('gateways-sensors-status', sensorObj);
    tutil.saveObjectForNextApiCall('gateways-sensors-series', sensorObj);
  },
  '/gateways/{owner}/sensors/{id}/status:get': tutil.saveObjectForNextApiCall.bind(null, 'gateways-sensors-status'),
  '/gateways/{owner}/sensors/{id}/series:get': tutil.saveObjectForNextApiCall.bind(null, 'gateways-sensors-status'),
  '/gateways/{id}:get': tutil.saveObjectForNextApiCall.bind(null, 'gateways'),
};

var urlAndMethod;

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
          var apiCall, reqBody, getRequestBody;
          
          var renderedUrl = tutil.renderUrl(url);
          console.log(method.toUpperCase() + ':' + renderedUrl);
          if (method === 'get') {
            apiCall = chakram[method](config.host + renderedUrl, authInfo);
          } else {
            // console.log('@useSchemaExample[url+:+method]=', useSchemaExample[url+':'+method]);
            getRequestBody = preSetReqBody[url+':'+method] || tutil.getRequestBody;
            reqBody = getRequestBody(opInfo, url, method);
            // console.log('@reqBody=', reqBody);
            apiCall = chakram[method](config.host + renderedUrl, reqBody, authInfo);
          }
          
          return apiCall.then(function(res) {
            urlAndMethod = url+':'+method;
            var body = res.body;
            var statusCode = res.response.statusCode;
            var responseInfo = opInfo.responses[statusCode];
            var schema = responseInfo && responseInfo.schema;
            
            if (statusCode >= 300) {
              console.log('Error!! statusCode=', statusCode);
              console.log('======> req body:\n', reqBody && prettyjson.render(reqBody));
              console.log('<====== res body:\n', body && prettyjson.render(body));
            // } else {
            //   console.log('@@@@@@@@@@@ renderedUrl=', renderedUrl);
            //   console.log('======> req body:\n', reqBody && prettyjson.render(reqBody));
            //   console.log('<====== res body:\n', body && prettyjson.render(body));
            }
              
            expect(schema, ' statusCode=' + statusCode).to.be.an.object;
            expect(res, ' @statusCode=' + statusCode).to.have.status(methodStatus(url, method));
            
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
  
  afterEach('delay', function(done) {
    if (urlAndMethod === '/gateways/{owner}/sensors:post') {
      setTimeout(done, 6000);
    } else {
      done();
    }
  });
  
  after('after hook', function (done) {
    tutil.logout(config, done);
    console.log('finished!');
  });
});
