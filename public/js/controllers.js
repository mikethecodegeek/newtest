'use strict';
var app = angular.module('angularApp');


app.controller('mainCtrl', function ($scope, userService, deviceService, $state) {
   // //console.log('main');
    ////console.log(userLoggedIn);
    var currentUser = userService.getProfile()
        .then(stuff => {
            if(stuff) {
                $scope.loggedin=true;
                if (stuff.data.admin === true) {
                    $scope.admin = true;
                }
                else {
                    $scope.admin = false;
                }
            }
            else {$scope.loggedin = false; }

        });

    $scope.logout = function () {
        userService.logout()
            .then(stuff => {
                  $scope.loggedin = false;
                  $scope.admin = false;
                $state.go('home');
            });
    };

    $scope.loginUser=function() {
        $('#myModal').modal('show');
    };
    $scope.login = function() {
        var thisuser = {
            email: $scope.email,
            password: $scope.password
        };
        userService.login(thisuser)
            .then( (stuff) => {
                userService.setProfile(stuff);
                $state.go('home');
            })
            .then( function() {
                $scope.loggedin=true;
                $('#email').val('');
                $('#password').val('');
                $('#myModal').modal('hide');
                userService.getProfile()
                    .then( user =>{
                      if (user.data.admin) {
                          $scope.admin = true;
                      }
                    })
            })
    }



});


app.controller('homeCtrl', function(userService, brandService, $stateParams, $scope, $state) {

   // //console.log('home controller!');

   // console.log('home controller!');
    $scope.one = true;
 //79c533e9ad0cf0e2f0c3b271bf0669aefa0f2905
    var modelselect = false;
    var versionselect = false;
    $scope.devices = [];
    var type=$state.params;
    //console.log(type);
    brandService.getByType(type)
        .then(function(res) {
            //console.log(res.data)
            var devices = res.data;
            $scope.devices = devices;
    console.log('devices:', $scope.devices.name);
        })

    $scope.showModels = function(models) {

        //console.log(models);

        $scope.one = false;
        console.log('models',models);
// 79c533e9ad0cf0e2f0c3b271bf0669aefa0f2905
        $scope.selectedModels = models;
        modelselect = true;
        $scope.two = true;
    }
    $scope.showVersions = function(versions) {

        ////console.log(models);

        //console.log(models);
        $scope.two = false;
        $scope.three = true;
// 79c533e9ad0cf0e2f0c3b271bf0669aefa0f2905
        $scope.selectedVersions = versions;
        versionselect = true;

    }

});



app.controller('newListing', function(listingService, $scope, $state) {
    //console.log('listing Ctrl')


});
app.controller('landingCtrl', function(landingService, $scope, $state, devices) {
////console.log(devices);
    $scope.devicetypes = devices.data;

});
app.controller('settingsCtrl', function(listingService, $scope, $state, userLoggedIn, userService) {
    //console.log(userLoggedIn);


    $scope.changePassword = function() {
        ////console.log($scope.password)
        if ($scope.newpassword === $scope.confirmPassword) {
            var currentUser = userLoggedIn.data;
            var newpass = $scope.newpassword;
            userService.adminPassword(currentUser, newpass)
                .then(data => {
                    //console.log(data);
                });
        }
        else {
            alert('Password do not match');
        }

    };
    $scope.changeEmail = function() {
        var currentUser = userLoggedIn.data;
        var newemail=$scope.email;
        userService.changeAdminEmail(currentUser, newemail)
            .then(data => {
                //console.log(data);
            });
    };
    $scope.registerAdmin = function() {
        var newAdmin = {
            name: $scope.newAdminName,
            email: $scope.newAdminEmail,
            username: $scope.newAdminUser,
            password: $scope.newAdminPassword,
            admin: true
        };

        if ($scope.newAdminPassword === $scope.newAdminConfirmPassword) {
            console.log('hello')
            userService.registerAdmin(newAdmin)
                .then(data => {
                    console.log(data);
                });
        }
    };


});

app.controller('manageUsersCtrl', function(listingService, $scope, $state, userList, userService) {

    $scope.users = userList.data;
   // //console.log(users);
    $scope.deleteUser= function(selectedUser) {
        userService.deleteById(selectedUser)
            .then(users => {
                $scope.users = users.data;
            } );
    }

});

app.controller('dashboardCtrl', function(listingService, $scope, $state, userLoggedIn) {
 //   //console.log('dash Control')
    if (userLoggedIn){
     //   //console.log(userLoggedIn);
    }
    else {
        //console.log('Not Logged In');
        $state.go('home');
    }


});
app.controller('inboxCtrl', function(messageService, $scope, $state) {
    messageService.getAll()
        .then(stuff => {
            $scope.messages = stuff.data;
        });
    $scope.deleteMessage = function(message) {
        //console.log(message);
        messageService.deleteById(message)
            .then(stuff => {
                //console.log(stuff)
                $scope.messages = stuff.data;
            });
    }


});
app.controller('devicesCtrl', function(deviceService,landingService, brandService, modelService ,$scope, $state, devices) {
    //console.log(devices);

    var devicetype = false;
    $scope.adding = false;
    $scope.brands = false;
    $scope.models = false;

    $scope.toggleAddDevice = function() {
        if (!$scope.adding) {
            $scope.adding = true;
        }
        else {
            $scope.adding=false;
        }
    };
    $scope.toggleAddBrand = function() {
        if (!$scope.brands) {
            $scope.brands = true;
        }
        else {
            $scope.brands=false;
        }
    };
    $scope.toggleAddModel = function() {
        if (!$scope.models) {
            $scope.models = true;
        }
        else {
            $scope.models=false;
        }
    };

    deviceService.getAll()
        .then(stuff => {
            $scope.devices =stuff.data;
        });
    landingService.getAll()
        .then(deviceTypes => {
            $scope.devicetypes = deviceTypes.data;
            ////console.log(deviceTypes.data);
        });
    modelService.getAll()
        .then(deviceModels => {
            $scope.devicemodels = deviceModels.data;
      //      ////console.log(deviceModels.data);
        });
    brandService.getAll()
        .then(brands => {
            $scope.brands = brands.data;
        //    //console.log(brands.data);
        });

    $scope.setDeviceType= function(type) {
        devicetype= type.devicetype;
     //   //console.log(devicetype);
    };

    $scope.addBrand = function() {
        var brand = {
            name: $scope.newBrand,
            imgurl: $scope.newBrandImage,
            devicetype: $scope.newBrandType,
            models:[]
        };
        var device = $scope.newBrandType;
        //console.log(brand)
        brandService.addBrand(brand, device)
            .then(data => $scope.brands = data.data);
    };

    $scope.addNewDeviceModel = function() {
        var model = {
            name: $scope.newDeviceModel,
            imgurl: $scope.newDeviceModelImage,
            brand: $scope.modelSelectBrand,
            versions: []
        };
        //console.log(model);
        //console.log($scope.modelSelectType)
        modelService.addModel(model, $scope.newDeviceBrand, $scope.modelSelectType)
            .then(data => $scope.devicemodels = data.data)
    };

    $scope.addDevice = function(){
        var newDevice = {
            devicename: $scope.newDevice.name,
            description: $scope.newDevice.description,
            imgurl: $scope.newDevice.image,
            type: $scope.versionSelectType,
            brand: $scope.versionSelectBrand,
            model: $scope.versionSelectModel,
            new: $scope.newDevice.new,
            used: $scope.newDevice.used,
            broken: $scope.newDevice.broken
        };
        // //console.log(newDevice)
        // //console.log($scope.versionSelectModel)
        deviceService.addDevice(newDevice, $scope.versionSelectModel)
            .then(stuff => {
                $scope.devices =stuff.data;
               // //console.log(stuff);
            });
        $scope.newDevice.name = "";
        $scope.newDevice.description = "";
        $scope.newDevice.image = "";
        $scope.newDevice.new = "";
        $scope.newDevice.used = "";
        $scope.newDevice.broken = "";
    }

    $scope.addNewDeviceType = function() {
        
        var newDeviceType = {
            devicetype: $scope.newDeviceType,
            imgurl: $scope.newDeviceTypeImage
        };

        landingService.addDeviceType(newDeviceType)
            .then(device => {
                SweetAlert.swal("Here's a message");
                $scope.devicetypes = device.data
             //   //console.log(device);
            });
        $scope.newDeviceType = "";
        $scope.newDeviceTypeImage= "";
        
    
    };


});
app.controller('dashboardCtrl', function(quoteService, $scope, $state) {
    quoteService.getAll()
        .then(stuff => {
            //console.log(stuff)
            $scope.myOrders = stuff.data;
        });
    $scope.editModal = function(order){
        $scope.userName = order.username;
        $scope.quoteAmount = order.amount;
        $scope.device = order.device;
        $scope.date = order.date;
        $scope.description = order.description;
        $scope.condition = order.condition;
        $scope.status = order.status;
        $('#ordersModal').modal('show');
    };

    $scope.deleteOrder = function(order){
        quoteService.deleteById(order._id)
            .then(stuff => {
                //console.log(stuff);
                $scope.myOrders = stuff.data;
            });
    };


});

app.controller('detailsCtlr', function(userService, quoteService, transactionService, deviceService, $rootScope, $stateParams, $scope, $state, $auth) {
    var currentUser = userService.getProfile()
        .then(stuff => {
            $scope.user =stuff;
        });
    deviceService.viewDevice($stateParams.id)
    .then(res => {
        //console.log(res);
        $scope.device = res.data;
    })
    .catch(err => {
        //console.log('err:', err);
    });


   //  $scope.addTransaction = function(transaction) {
   // //     //console.log("transaction:", transaction);
   //  }
    $scope.openModal = function() {
        if ($scope.condition = $('#dropdownMenu1').val() === 'new') {
            $scope.customQuote =  $scope.device.new;
        }
        else if ($scope.condition = $('#dropdownMenu1').val() === 'used') {
            $scope.customQuote =  $scope.device.used;
        }
        else if ($scope.condition = $('#dropdownMenu1').val() === 'broken') {
            $scope.customQuote =  $scope.device.broken;
        }
        $scope.condition = $('#dropdownMenu1').val();
        $scope.carrier = $('#dropdownMenu3').val();
        $scope.locked = $('#radio1').is(':checked');
        if($scope.locked === true) {
            $scope.locked = "locked";
        } else {
            $scope.locked = "unlocked";
        }

        $('#myModal1').modal('show');
        }
    $scope.addTransaction = function() {

        if($('#paypal').is(':checked')) {
            $scope.payment = "paypal";
        } else if($('#check').is(':checked')) {
            $scope.payment = "check";
        }
        else if($('#ach').is(':checked')) {
            $scope.payment = "ach";
        }
    //    //console.log($scope.payment);

    var transaction = {
        condition: $scope.condition,
        carrier: $scope.carrier,
        locked: $scope.locked,
        payment: $scope.payment,
        status: 'pending',
        quote: $scope.customQuote,
        paymentmethod: $scope.payment
    };
   // //console.log('transaction', transaction);
    transaction.date = moment().format();
    transaction.devicename = $scope.device.devicename;
    transactionService.addTransaction(transaction, $scope.user)
    .then( (stuff) => {
                $('#myModal1').modal('hide');
            });
        quoteService.addQuote(transaction, $scope.user)
            .then( (stuff) => {
                $('#myModal1').modal('hide');
            });
    }


    $scope.cancelTransaction = function(){
        $('#myModal1').modal('hide');
    }
});


app.controller('loginCtrl', function(userService, $scope, $state, $auth) {
    //console.log('stiff')

    $scope.login = function() {
        var thisuser = {
            email: $scope.email,
            password: $scope.password
        };
        userService.login(thisuser)
            .then( (stuff) => {
                userService.setProfile(stuff);
                $state.go('home');
            });
    }

});

app.controller('registerCtrl', function(userService, $scope, $state) {
    $scope.register = function() {
        var thisuser = {
            name: $scope.newName,
            email: $scope.newEmail,
            username: $scope.newUsername,
            password: $scope.newPassword,
            profilePic: $scope.profilePic
        };
        thisuser.joinDate = moment().format();
     //   //console.log(thisuser);
        userService.register(thisuser)
            ////console.log(thisuser)
            .then((stuff) => {
            $state.go('home');
         });
    }

});

app.controller('profileCtlr', function(userService, $scope, $state, messageService) {
    var currentUser = userService.getProfile()
    .then(stuff => {
       // //console.log(stuff.data);
        $scope.user=stuff.data;
        });
    $scope.askAQuestion = function() {
        var userMessage = {
            message: $scope.newMessage,
            user: $scope.user
        }
    //    //console.log(userMessage);
        messageService.sendToAdmin(userMessage);
    }


    });
