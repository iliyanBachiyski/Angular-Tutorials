/**
 * Created by admin on 16.06.2017.
 */

var application = angular.module('weatherApp');

application.service('UserService',function () {
   var self = this;
   var registeredUsers = [];

    if(localStorage['usersList']){
        registeredUsers = JSON.parse(localStorage['usersList']);
    }

   self.getRegisteredUsers = function () {
        return registeredUsers;
   };

   self.isUserContains = function (obj) {
       var isUserContains = false;
       registeredUsers.forEach(function (user) {
           if(user.username === obj.username) {
               isUserContains = true;
           }
       });
       return isUserContains;
   };

   self.registerUser = function (obj) {
       registeredUsers.push(obj);
       localStorage['usersList'] = JSON.stringify(registeredUsers);
   };

   self.isValidCredentials = function (username,password) {
       var obj = {username:username, password:password};
       if(self.isUserContains(obj)) {
            if(checkUserPassword(obj.password)) {
                return true;
            } else {
                return false;
            }
       } else {
           return false;
       }
   };

   var checkUserPassword = function(password){
       var isPasswordCorrect = false;
       registeredUsers.forEach(function (user) {
           if(user.password === password) {
               isPasswordCorrect = true;
           }
       });
       return isPasswordCorrect;
   };

});