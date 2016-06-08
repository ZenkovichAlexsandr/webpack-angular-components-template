const hello = angular.module('hello', []);

hello.component('hello', require('./hello_component'));

export default hello.name;
