'use strict';

var _ = require('lodash'),
  chakram = require('chakram');
  
/**
 * supplant("/gateways/{owner}/devices/{id}", {id: 'myId', owner: 'me'})
 * => /gateways/me/devices/myId
*/
function supplant(str, obj) {
  if (!obj) { return str; }
  
  return str.replace(/\{([^{}]*)\}/g, function (asIs, key) {
    var val = obj[key];
    return _.isNumber(val) || _.isString(val) ? val : asIs;
  });
}

var apiObjects = {
  gateways: { id: '8cf8afabb6264e2d8ec15c5955e84e5c'}  // 임시 test 용. 지워도 관계 없음.
};
function saveObjectForNextApiCall(apiStartName, obj) {
  if (_.isArray(obj)) {
    obj = obj[0];
  }
  
  apiObjects[apiStartName] = obj;
}

var PARAM_PATH = new RegExp('/{[^{}]*}/', 'g');
var END_PARAM_PATH = new RegExp('/{[^{}]*}$');
function getApiStartName(path) {
  path = path.replace(PARAM_PATH, '-');
  path = path.replace(END_PARAM_PATH, '');
  return path.slice(1);
}

// path : "/gateways/{owner}/devices/{id}" => /gateways/aabbccddee/devices/12345
function renderUrl(path, obj) {
  var apiStartName = getApiStartName(path);
  obj = apiObjects[apiStartName];
  // console.log('################@apiStartName=', apiStartName, ' obj=', obj);
  
  if (!obj) { return path; }
  
  return supplant(path, obj);
}

function getRequestBody(opInfo, path, method) {
  if (method === 'delete') { return {}; }
  
  var apiStartName = getApiStartName(path);
  var obj = opInfo.parameters[0].schema.example;
  if (method === 'put') {
    obj = apiObjects[apiStartName];
  }
  return obj;
}

// var removeKeys = ['x-stoplight']
function removeValues(obj, removeKeys) {
  _.forOwn(obj, function(val, key) {
    if (_.includes(removeKeys, key)) {
      delete obj[key];
    } else {
      if (_.isObject(obj)) {
        removeValues(obj[key], removeKeys);
      }
    }
  });
}

function login(config, done) {
  chakram.post(config.host + '/login', config.login).then(function(res) {
    chakram.expect(res).to.have.status(200);
    done({jar: res.jar});
  });
}

function logout(config, done) {
  chakram.post(config.host + '/logout').then(function(res) {
    chakram.expect(res).to.have.status(200);
    console.log('Logout OK!');
    done();
  });
}

module.exports = {
  login: login,
  logout: logout,
  removeValues: removeValues,
  supplant: supplant,
  saveObjectForNextApiCall: saveObjectForNextApiCall,
  renderUrl: renderUrl,
  getRequestBody: getRequestBody,
};
