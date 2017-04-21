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

var apiObjects = {};
function saveObjectForNextApiCall(apiStartName, obj) {
  if (_.isArray(obj)) {
    obj = obj[0];
  }
  
  if (apiStartName === 'gateways') {
    console.log('apiStartName=', apiStartName, obj);
  }
  
  apiObjects[apiStartName] = obj;
}

// path : "/gateways/{owner}/devices/{id}" => /gateways/aabbccddee/devices/12345
function renderUrl(path, obj) {
  var apiStartName = path.split('/')[1];
  obj = apiObjects[apiStartName];
  if (!obj) return path;
  
  // console.log('@apiStartName=', apiStartName, ' obj=', obj);
  return supplant(path, obj);
}

function getRequestBody(path, method, opInfo) {
  if (method === 'delete') { return {}; }
  
  var apiStartName = path.split('/')[1];
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
        removeValues(obj[key]);
      }
    }
  });
}

function login(config, done) {
  chakram.post(config.host + "/login", config.login).then(function(res) {
    chakram.expect(res).to.have.status(200);
    done({jar: res.jar});
  });
}

function logout(config, done) {
  chakram.post(config.host + "/logout").then(function(res) {
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
}
