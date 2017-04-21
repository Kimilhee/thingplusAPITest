'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var chakram = require('chakram'),
  prettyjson = require('prettyjson'),
	expect = chakram.expect,
	async = require('async'),
	_ = require('lodash');
  
var config = require('./config_testih'),
  errBody = require('./errBody'),
  tutil = require('./test-util');
  
var REST_METHODS = ['post', 'get', 'put', 'delete'];

describe("Rest API Error Test", function () {
  var authInfo;
  
  before("Error Test Start", function (done) {
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
    ], function(err) {
      expect(err).to.not.exist;
      done();
    });
  });
  
  describe("API error call", function () {
    beforeEach(function() {
      
    });
    
    _.forOwn(errBody, function(obj, url) {
      var paramObj = obj.paramObj;
      _.forOwn(obj, function(methodObj, method) {
        if (!_.includes(REST_METHODS, method)) { return; }
        
        paramObj = methodObj.paramObj || paramObj;
        _.forOwn(methodObj, function(caseObj, caseName) {
          paramObj = caseObj.paramObj || paramObj;
          console.log('@@@@@@@@@@@@@@@@@@####', url + ' (' + method + ') ' + caseName);
          
          var apiCall, reqBody;
          var renderedUrl = tutil.supplant(url, paramObj);
          
          if (caseObj.param) {
            renderedUrl += caseObj.param;
          } else if (_.endsWith(renderedUrl, '/')) {
            renderedUrl = renderedUrl.slice(0, -1); // remove ends of '/'
          }
          
          it(url + ' (' + method + ') ' + caseName + ' : ' + renderedUrl, function () {
            var loginAuth = authInfo;
            if (caseObj.precondition === 'logout') {
              console.log('@ caseObj.precondition=', caseObj.precondition);
              loginAuth = undefined;
            }
            
            var apiCall, reqBody;
            
            if (method === 'get') {
              // console.log('@loginAuth=', loginAuth);
              apiCall = chakram[method](config.host + renderedUrl, loginAuth);
            } else {
              reqBody = caseObj.reqBody || {};
              apiCall = chakram[method](config.host + renderedUrl, reqBody, loginAuth);
            }
            
            return apiCall.then(function(res) {
              var expectedStatusCode = +caseObj.expectedErr.statusCode;
              var expectedErrCode = caseObj.expectedErr.errCode;
              var body = res.body;
              var statusCode = res.response.statusCode;
              
              if (statusCode !== expectedStatusCode) {
                console.log('statusCode=', statusCode, ', expectedStatusCode=', expectedStatusCode);
                if (reqBody) {
                  console.log('req body:', prettyjson.render(reqBody));
                }
                console.log('res body:', prettyjson.render(body));
                expect(expectedStatusCode).to.be.equal(statusCode);
              }
              
              if (!_.isObject(body)) { return; }
              
              var errCode = body.errors[0].code;
              expect(expectedErrCode).to.be.equal(errCode);
            });
          });
        });
      });
    });
  });
  
  after("after hook", function (done) {
    tutil.logout(config, done)
    console.log('finished!');
  });
});
