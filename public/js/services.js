'use strict';

var app = angular.module('angularApp');

app.factory("authService", function(){
    return {
        getUser: function(){
            return $http.get('./api/users/profile');
        }
    };
});

app.service('userService', function($http) {
    var profile = {loggedin: false};
    var loggedIn = false;
    this.setProfile = function(myprofile) {
        profile = myprofile
    };
    this.getLoggedIn = function() {
        return loggedIn;
    };
    this.logInUser = function() {
        loggedIn = true;
    };
    this.logOutUser = function() {
        loggedIn = false;
    };
    this.getProfile = () => {
        return $http.get('./api/users/profile');
    };
    this.getAll = () => {
        return $http.get('./api/users');
    };

    this.register = newPost => {
        return $http.post('./api/users/register', {name: newPost.name,
        username: newPost.username, email: newPost.email, password: newPost.password, joinDate: newPost.joinDate, profilePic: newPost.profilePic });
    };
    this.registerAdmin = newPost => {
        console.log(newPost)
        return $http.post('./api/users/registeradmin', {name: newPost.name, username: newPost.username,
            email: newPost.email, password: newPost.password, admin: true
        });
    };
    this.deleteById = id => {
        return $http.delete(`./api/users/${id}`);
    };

    this.editById = (id, newPost) => {
        return $http.put(`./api/users/${id}`, {name: newPost.name,
            username: newPost.username, email: newPost.email});
    }

    this.login = (user) => {
        return $http.post('./api/users/login/', {email: user.email, password: user.password});
    };
    this.logout = () => {
        return $http.delete('./api/users/logout/');
    };

    this.admin = () => {
        return $http.get('./api/users/admin/');
    };
    this.adminPassword = (user,newpass) => {
        console.log(newpass)
        return $http.post('./api/users/admin/password',{user:user, password: newpass});
    };
    this.changeAdminEmail = (user, newemail) => {
        //console.log(newpass)
        return $http.post('./api/users/admin/changeemail',{user:user, email:newemail});
    };

});

app.service('listingService',function($http) {
    this.getAll = () => {
        return $http.get('./api/listings');
    };
    this.createListing = (item) => {
        return $http.post('./api/listings/newlisting', {listing: item}
        );
    };

    this.deleteById = id => {
        return $http.delete(`./api/listings/${id}`);
    };
    this.viewListing = id => {
   //     console.log(id);
        return $http.get(`./api/listings/${id}`);
    };
    this.editById = (id, newPost) => {
        return $http.put(`./api/listings/${id}`, {name: newPost.name,
            username: newPost.username, email: newPost.email,
            pic: newPost.pic, bio: newPost.bio});
    }


});

app.service('landingService',function($http) {
    this.getAll = () => {
        return $http.get('./api/devicetypes');
    };
    this.addDeviceType = (item) => {
        return $http.post('./api/devicetypes/newdevice', {device: item}
        );
    };

    this.deleteById = id => {
        return $http.delete(`./api/devicetypes/${id}`);
    };
    this.viewListing = id => {
        //     console.log(id);
        return $http.get(`./api/devicetypes/${id}`);
    };
    this.editById = (id, device) => {
        return $http.put(`./api/devicetypes/${id}`,{device: device});
    }


});

app.service('brandService',function($http) {
    this.getAll = () => {
        return $http.get('./api/brands');
    };
    this.getByType = (searchType) => {
        return $http.post('./api/brands/type',{type:searchType});
    };
    this.addBrand = (item, type) => {
       // console.log(type)
       return $http.post('./api/brands/newbrand', {brand: item, devicetype: type}
       );
    };

    this.deleteById = id => {
        return $http.delete(`./api/brands/${id}`);
    };
    this.viewListing = id => {
        //     console.log(id);
        return $http.get(`./api/brands/${id}`);
    };
    this.editById = (id, device) => {
        return $http.put(`./api/brands/${id}`,{device: device});
    }


});

app.service('modelService',function($http) {
    this.getAll = () => {
        return $http.get('./api/models');
    };
    this.addModel = (item,brand, type) => {
        return $http.post('./api/models/newmodel', {model: item, brand: brand, type: type}
        );
    };

    this.deleteById = id => {
        return $http.delete(`./api/models/${id}`);
    };
    this.viewListing = id => {
        //     console.log(id);
        return $http.get(`./api/models/${id}`);
    };
    this.editById = (id, device) => {
        return $http.put(`./api/models/${id}`,{device: device});
    }


});

app.service('quoteService',function($http) {
    this.getAll = () => {
        return $http.get('./api/quotes');
    };
    this.addQuote = (transaction,user) => {
        return $http.post('./api/quotes/newquote', {transaction: transaction, user: user});
    }
    this.deleteById = id => {
        return $http.delete(`./api/quotes/${id}`);
    };
    this.viewQuotes = id => {
        //     console.log(id);
        return $http.get(`./api/quotes/${id}`);
    };
    this.editById = (id, newPost) => {
        return $http.put(`./api/quotes/${id}`, {item: newPost});
    }

});

app.service('transactionService',function($http) {
    this.addTransaction = (transaction,user) => {
        return $http.post('./api/users/transactions/new', {transaction: transaction, user: user});
    }

});


app.service('messageService',function($http) {
    this.getAll = () => {
        return $http.get('./api/inbox');
    };
    this.sendToAdmin = (newMessage) => {
        return $http.post('./api/inbox/newmessage',{message: newMessage});
    };
    this.deleteById = id => {
        return $http.delete(`./api/inbox/${id}`);
    };
    this.viewMessage = id => {
        //     console.log(id);
        return $http.get(`./api/inbox/${id}`);
    };
    this.editById = (id, newPost) => {
        return $http.put(`./api/inbox/${id}`, {item: newPost});
    }


});

app.service('deviceService',function($http) {
    this.getAll = () => {
        return $http.get('./api/devices');
    };
    this.getByType = (searchType) => {
        return $http.post('./api/devices/type',{type:searchType});
    };
    this.addDevice = (device, model) => {
        return $http.post('./api/devices/newdevice', {device: device, model});
    };

    this.deleteById = id => {
        return $http.delete(`./api/devices/${id}`);
    };
    this.viewDevice = id => {
        //     console.log(id);
        return $http.get(`./api/devices/${id}`);
    };
    this.editById = (id, newPost) => {
        return $http.put(`./api/devices/${id}`, {item: newPost});
    }


});
