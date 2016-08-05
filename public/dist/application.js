'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'BiinCMSApp';

	var applicationBackendURL = window.location.href.indexOf('dev') > -1 ? 'https://dev-biin-backend.herokuapp.com/' :
			window.location.href.indexOf('qa') > -1 ?'https://qa-biin-backend.herokuapp.com/' :
				window.location.href.indexOf('demo') > -1 ? 'https://demo-biin-backend.herokuapp.com/' :
					window.location.href.indexOf('production') > -1 ? 'https://www.biin.io/' :
						window.location.href.indexOf('biin.io') > -1 ? 'https://www.biin.io/' :
							window.location.href.indexOf('localhost') > -1 ? 'https://dev-biin-backend.herokuapp.com/' : '';



	var applicationModuleVendorDependencies = ['ngRoute', 'ngAnimate', 'ngStorage', 'ngTouch', 'ngCookies',
        'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ngSanitize',
        'ngResource', 'ngMessages', 'ui.utils','ngAnimate', 'toaster','textAngular','bootstrap-tagsinput','angular-bind-html-compile',
		'datePicker','ui.bootstrap-slider','ngDragDrop','nvd3','ngImgCrop','color.picker'];
	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule,
		applicationBackendURL: applicationBackendURL
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
/**
 * Created by Ivan on 8/17/15.
 */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('basiccms');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('biinUsers');

/**
 * Created by Ivan on 8/17/15.
 */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('biins');

/**
 * Created by Carlos on 7/28/16.
 */
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('cards');

'use strict';

ApplicationConfiguration.registerModule('app.charts');

(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.colors');

})();
(function () {
    'use strict';

    // Use Applicaion configuration module to register a new module
    ApplicationConfiguration.registerModule('app.core', [
        'app.routes',
        'app.sidebar',
        'app.navsearch',
        'app.preloader',
        'app.loadingbar',
        'app.translate',
        'app.settings',
        'app.forms',
        //'app.pages',
        'app.utils',
        'app.panels'
    ]);

})();

/**
 * Created by Ivan on 8/17/15.
 */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('dashboard');

/**
 * Created by Ivan on 8/17/15.
 */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('elements');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('app.forms');


'use strict';
ApplicationConfiguration.registerModule('gallery');

/**
 * Created by Carlos on 6/27/16.
 */
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('gifts');

'use strict';
ApplicationConfiguration.registerModule('gmaps');


(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.lazyload');
})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.loadingbar');
})();
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('maintenance');

(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.navsearch');
})();
/**
 * Created by Ivan on 8/19/15.
 */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('nps',['app.translate']);

/**
 * Created by Ivan on 8/17/15.
 */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('objectssidebar');

/**
 * Created by Ivan on 8/19/15.
 */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('organization',['app.translate']);

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('page');

(function() {
    'use strict';

    angular
        .module('app.panels', []);
})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.preloader');

})();


/**
 * Created by Ivan on 8/19/15.
 */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('profile',['app.translate']);

(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.routes',['app.lazyload']);

})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.settings');

})();
/**
 * Created by Ivan on 8/17/15.
 */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('showcases');

(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.sidebar');

})();
/**
 * Created by Ivan on 8/17/15.
 */
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('sites');

(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.translate');

})();
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');

(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.utils', [
          'app.colors'
          ]);

})();

/**
 * Created by Ivan on 8/27/15.
 */
'use strict';

// Setting up route
angular.module('basiccms').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.basiccms', {
                url: '/basiccms',
                templateUrl: 'modules/basiccms/views/basic.client.view.html',
                resolve: {
                    permissions: function(Permission) {
                        return Permission.getPermissions();
                    },
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            });
    }
]);

/**=========================================================
 * Module: biins.controller.js
 * Controller for biins section
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('basiccms')
        .controller('BasicCMSController', BasicCMSController);

    BasicCMSController.$inject = ['$http', '$state', '$scope','$uibModal', 'Authentication', 'Organization', 'ObjectsSidebar','Loading'];
    function BasicCMSController($http, $state, $scope,$modal, Authentication, Organization, ObjectsSidebar,Loading) {


        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/

        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.objectsSidebarService.enableAddButton = false;

        $scope.getSiteName = function (identifier) {
            var site = _.findWhere($scope.sites, {identifier: identifier});
            if (site) {
                return site.title1 + " " + site.title2;
            } else {
                return "";
            }
        };

        $scope.getObjectName = function (identifier, type) {
            if (identifier && type) {
                if (type === "1") {
                    var el = _.findWhere($scope.elements, {elementIdentifier: identifier});
                    if (el)
                        return el.title;
                }
                else {
                    var sh = _.findWhere($scope.showcases, {identifier: identifier});
                    if (sh)
                        return sh.name;
                }
            }
            return "name not available";
        };

        $scope.removeObject = function (index) {
            $scope.objectsSidebarService.selectedObject.objects.splice(index, 1);
            $scope.biins = $scope.objectsSidebarService.getObjects();
        };

        //Save The Biin Objects Changes
        $scope.save = function () {

            if ($scope.objectsSidebarService.selectedObject != null) {
                $http.put(ApplicationConfiguration.applicationBackendURL + 'api/venues/create', null, {
                    headers: {
                        name: $scope.objectsSidebarService.selectedObject.venue,
                        orgidentifier: $scope.organizationId
                    }
                }).success(function () {
                    $http.post(ApplicationConfiguration.applicationBackendURL + 'api/biins/' + $scope.objectsSidebarService.selectedObject.identifier + '/update', $scope.objectsSidebarService.selectedObject).success(function () {
                        console.log("success");
                    }).error(function (err) {
                       console.log(err);
                    });
                });
            }
        };

        var vm = this;
        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }

        /**=============================================================================================================
         * ObjectsSidebar Configuration
         *
         =============================================================================================================*/
        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.sidebarTemplate =
            "<div class='col-md-12 leftInformationArea' style='padding-left: 10px'>" +
                "<label class='threeRowTitle'>{{item.name}}</label>" +
                "<localization class='threeRowSubTitle' style='display: block'></localization>" +
                "<p class='threeRowThirdLine'>{{item.status}}</p>" +
            "</div>";
        $scope.objectsSidebarService.template = $scope.sidebarTemplate;
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.$on('organizationChanged', function () {
            $scope.objectsSidebarService.selectedObject = null;
            $scope.objectsSidebarService.objects = [];
            $scope.loadingService.isLoading = true;

            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            //Get the Sites Information
            if($scope.organizationId) {
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/sites/').success(function (data) {
                    $scope.sites = data.data.sites;
                    //Get the elements
                    $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElementser/').success(function (data) {
                        $scope.elements = data.data.elements;
                        //Get the showcases
                        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/showcases/').success(function (data) {
                            $scope.showcases = data.data;
                            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/biins/').success(function (data) {
                                $scope.biins = data.data;
                                $scope.objectsSidebarService.setObjects(data.data);
                                $scope.loadingService.isLoading = false;
                            }).error(function (err) {
                                console.log(err);
                            });
                        }).error(function (err) {
                            console.log(err);
                        });
                    }).error(function (err) {
                        console.log(err);
                    });
                }).error(function (err) {
                    console.log(err);
                });
            }
        });

        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {

        });

        /**=============================================================================================================
         * Variables
         *
         =============================================================================================================*/

            //Init the the sites
        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;

        /**=============================================================================================================
         * Self called functions
         *
         =============================================================================================================*/

        if($scope.organizationId) {
            //Get the Sites Information
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/sites/').success(function (data) {
                $scope.sites = data.data.sites;
                //Get the elements
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function (data) {
                    $scope.elements = data.data.elements;
                    //Get the showcases
                    $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/showcases/').success(function (data) {
                        $scope.showcases = data.data;
                        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/biins/').success(function (data) {
                            $scope.biins = data.data;
                            $scope.objectsSidebarService.setObjects(data.data);
                            $scope.loadingService.isLoading = false;
                        }).error(function (err) {
                            console.log(err);
                        });
                    }).error(function (err) {
                        console.log(err);
                    });
                }).error(function (err) {
                    console.log(err);
                });
            }).error(function (err) {
                console.log(err);
            });
        }
        
        //Add an object to the objects collection
        $scope.saveObject = function (obj) {
            if (obj)
                if ('isNew' in obj) {
                    delete obj.isNew;
                    $scope.objectsSidebarService.selectedObject.objects.push(obj);
                    $scope.biins = $scope.objectsSidebarService.getObjects();
                }
            //$scope.biins.push(obj);
            //Todo Do the method to save the save the data
        };

        $scope.getVenues = function (val) {
            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/venues/search', {
                headers: {
                    regex: val,
                    orgidentifier: $scope.organizationId
                }
            }).then(function (response) {
                return response.data;
            });
        };

        $scope.convertTime = function (time) {
            var hours = parseInt(time);
            var min = ( parseFloat(time) - hours )*60;
            var hoursString = hours < 10 ? "0"+hours : ""+ hours;
            var minString = min < 10 ? "0"+min : ""+ min;
            return hoursString+":"+minString;
        };

        //Modal to edit or create an Object
        $scope.biinObject = function (size, type, obj) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/biins/views/partials/biin.client.modal.view.html',
                controller: 'biinsModalController',
                size: size,
                resolve: {
                    selectedObj: function () {
                        if (type === 'create')
                            return {type: type};//name:$scope.sites[selectedIndex].title1,index:selectedIndex};
                        else
                            return {type: type, obj: obj};//name:$scope.sites[selectedIndex].title1,index:selectedIndex};
                    },
                    elements: function () {
                        return $scope.elements;
                    },
                    showcases: function () {
                        return $scope.showcases;
                    }
                }
            });


            modalInstance.result.then(function (objectToCreate) {
                $scope.saveObject(objectToCreate);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };
    }

})();

'use strict';

// Setting up route
angular.module('biinUsers').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('page.login', {
			url: '/login',
			templateUrl: 'modules/biinUsers/views/login.client.view.html'
		});
	}
]);

/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';
      
    angular
        .module('biinUsers')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$http', '$state','$location','$scope','$translate','Authentication','Organization'];

    function LoginFormController($http, $state,$location,$scope,$translate,Authentication,Organization) {
        var vm = this;
        $scope.authentication = Authentication;

        if ($scope.authentication.user) {
            $location.path('/dashboard');
        }

        activate();

        ////////////////

        function activate() {
            // Bind here all data from the form
            vm.account = {};
            // Place the message if something goes wrong
            vm.authMsg = '';

            vm.login = function() {
                vm.authMsg = '';

                if(vm.loginForm.$valid) {
                    $http
                    .post('api/account/login', {email: vm.account.email, password: vm.account.password})
                    .then(function(response) {
                    // Assumes if ok, response is an object with some data, if not, a string with error
                    // Customize according to your api
                    if ( !response.data.account ) {
                        vm.authMsg = $translate('LOGIN.INVALID_CREDENTIALS');
                    }else{
                        $scope.authentication.user = response.data.account;
                        Organization.getSelectedOrganization().then(function() {
                            Organization.getOrganizations().then( function() {
                                $state.go('app.dashboard');
                            });
                        });
                    }
                    }, function(reason) {
                        if (reason.status == "401") {
                            vm.authMsg = $translate.instant('LOGIN.INVALID_CREDENTIALS');
                        } else {
                            vm.authMsg = $translate.instant('SERVER_ERROR');
                        }
                        $state.go('page.login');
                    });
                }else {
                // Set as dirty if the user click directly to login so we show the validation messages
                /*jshint -W106*/
                vm.loginForm.account_email.$dirty = true;
                vm.loginForm.account_password.$dirty = true;
                }
            };
        }
    }
})();

/**
 * Created by Ivan on 8/27/15.
 */
'use strict';

// Setting up route
angular.module('biins').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.biins', {
                url: '/biins',
                templateUrl: 'modules/biins/views/biins.client.view.html',
                resolve: {
                    permissions: function(Permission) {
                        return Permission.getPermissions();
                    },
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            });
    }
]);

/**
 * Created by sofi on 10/8/15.
 */
/**=========================================================
 * Module: maintenance.js
 * Maintenance for biin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('biins')
        .controller('biinsModalController', BiinModalController);

    BiinModalController.$inject = ['$scope', '$uibModalInstance', 'selectedObj', 'elements', 'showcases'];
    function BiinModalController($scope, $modalInstance, selectedObj,elements,showcases) {

        $scope.type = selectedObj.type;
        $scope.elements=elements;
        $scope.showcases=showcases;
        $scope.timeEnabled = [0,24];
        //Create the modal for the creation Model
        if($scope.type==='create'){
            var obj={objectType:'1',notification:'', hasNotification:'0', isNew:true};
            var time = moment();
            time.minutes(0);
            time.hours(0);

            obj.onMonday='1';
            obj.onTuesday='1';
            obj.onWednesday='1';
            obj.onThursday='1';
            obj.onFriday='1';
            obj.onSaturday='1';
            obj.onSunday='1';
            obj.startTime=time.format();
            obj.endTime=time.format();
            obj.identifier = elements.length>0? elements[0].elementIdentifier : '';
            $scope.obj= obj;

        }else
        {
            $scope.obj =selectedObj.obj;
            $scope.timeEnabled = [Number($scope.obj.startTime),Number($scope.obj.endTime)];
        }
        //$scope.objects=[];
        $scope.hasNotificationBool=false;
        $scope.hasTimeOptionsBool=false;

        //Days Activation
        $scope.mondayBool=false;
        $scope.tuesdayBool=false;
        $scope.wednesdayBool=false;
        $scope.thursdayBool=false;
        $scope.fridayBool=false;
        $scope.saturdayBool=false;
        $scope.sundayBool=false;

        //Set the scope values
        $scope.hasNotificationBool = $scope.obj.hasNotification==='1';
        $scope.hasTimeOptionsBool = $scope.obj.hasTimeOptions==='1';

        $scope.mondayBool =$scope.obj.onMonday==='1';
        $scope.tuesdayBool =$scope.obj.onTuesday==='1';
        $scope.wednesdayBool = $scope.obj.onWednesday==='1';
        $scope.thursdayBool = $scope.obj.onThursday==='1';
        $scope.fridayBool = $scope.obj.onFriday==='1';
        $scope.saturdayBool = $scope.obj.onSaturday==='1';
        $scope.sundayBool = $scope.obj.onSunday==='1';

        //Change the Object Type
        $scope.changeObjectType=function(selected){
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.obj.identifier='';
                });
            }, 100);
        };

        //Change the notification State
        $scope.changeNotificationState=function(){
            $scope.obj.hasNotification= $scope.hasNotificationBool?'1':'0';
        };

        //Change the notification State
        $scope.changeTimeOptionsState=function(){
            $scope.obj.hasTimeOptions= $scope.hasTimeOptionsBool?'1':'0';
        };

        //Change the day State
        $scope.changeDayState=function(varName, boolVarName){
            $scope.obj[varName] =$scope[boolVarName]?'1':'0';
        };

        $scope.save = function () {
            if($scope.obj.hasTimeOptions == "1"){
                $scope.obj.startTime = $scope.timeEnabled[0]+"";
                $scope.obj.endTime = $scope.timeEnabled[1]+"";
            }else{
                $scope.obj.startTime = "0";
                $scope.obj.endTime = "24";
            }
            $modalInstance.close($scope.obj);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.validatesValues = function( value, event){
            if(value && Array.isArray(value)){
                if(value[1]-value[0] <= 0.5 && value[1] == 24){
                    $scope.timeEnabled = [23.5, 24];
                } else if(value[1]-value[0] < 0.5){
                    $scope.timeEnabled = [value[0], value[0]+0.5];
                }
            }
        };

    }
})();


/**=========================================================
 * Module: biins.controller.js
 * Controller for biins section
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('biins')
        .controller('BiinsController', BiinsController);

    BiinsController.$inject = ['$http', '$state', '$scope', '$translate', 'Authentication', 'Organization', 'ObjectsSidebar', 'Loading'];
    function BiinsController($http, $state, $scope, $translate, Authentication, Organization, ObjectsSidebar, Loading) {


        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/

        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.objectsSidebarService.enableAddButton = true;

        $scope.removeObject = function (index) {
            $scope.objectsSidebarService.selectedObject.objects.splice(index, 1);
            $scope.biins = $scope.objectsSidebarService.getObjects();
        };

        //Save The Biin Objects Changes
        $scope.save = function () {
            console.log($scope.objectsSidebarService.selectedObject);
            console.log($scope.days);
            console.log($scope.sitesAssigned);

            var objectToSave = $scope.objectsSidebarService.selectedObject;

            objectToSave.onMonday =  $scope.days.monday ? "1" : "0";
            objectToSave.onTuesday =  $scope.days.tuesday ? "1" : "0";
            objectToSave.onWednesday =  $scope.days.wednesday ? "1" : "0";
            objectToSave.onThursday =  $scope.days.thursday ? "1" : "0";
            objectToSave.onFriday =  $scope.days.friday ? "1" : "0";
            objectToSave.onSaturday =  $scope.days.saturday ? "1" : "0";
            objectToSave.onSunday =  $scope.days.sunday ? "1" : "0";

            objectToSave.startTime = $scope.time.timeEnabled[0] + "";
            objectToSave.endTime = $scope.time.timeEnabled[1] + "";

            var sitesToSave = $scope.sitesAssigned;

            var dataToSave = {};
            dataToSave.sites = sitesToSave;
            dataToSave.notice = objectToSave;



            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/notices/organizations/' + $scope.organizationId,dataToSave).success(function(data){
                console.log("data was saved succesfully");
                $scope.sites = data.sites;
                $scope.sitesAssigned = [];

                for(var i = 0; i < $scope.sites.length; i++){
                    if($scope.sites[i].isReady == 1){
                        var isAssigned = false;
                        if($scope.sites[i].notices)
                            isAssigned = $scope.sites[i].notices.indexOf($scope.objectsSidebarService.selectedObject.identifier) > -1;
                        $scope.sitesAssigned.push({"isAssigned":isAssigned, site:$scope.sites[i]});
                    }
                }

            }).error(function(){
                console.log("data wasnt saved succesfully");
            })
        };

        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }

        /**=============================================================================================================
         * ObjectsSidebar Configuration
         *
         =============================================================================================================*/
        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.sidebarTemplate =
            "<div class='col-md-12 leftInformationArea'>"+
            "<label class='twoRowTitle'>{{item.name}}</label>"+
            "<label ng-if='item.isActive' class='twoRowSubtitle'>Activado</label>"+
            "<label ng-if='!item.isActive' class='twoRowSubtitle'>Desactivado</label>"+
            "</div>";
        $scope.objectsSidebarService.template = $scope.sidebarTemplate;
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function () {
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.$on('organizationChanged', function () {
            $scope.objectsSidebarService.selectedObject = null;
            $scope.objectsSidebarService.objects = [];
            $scope.loadingService.isLoading = true;

            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            //Get the Sites Information
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/sites/').success(function (data) {
                $scope.sites = data.data.sites;
                //Get the elements
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function (data) {
                    $scope.elements = data.data.elements;
                    //Get the showcases
                    $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/showcases/').success(function (data) {
                        $scope.showcases = data.data;
                        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/notices/organizations/' + $scope.organizationId).success(function (data) {
                            $scope.notices = data.data;
                            $scope.objectsSidebarService.setObjects(data.data);

                            var elementsInShowcase = [];
                            for (var i = 0; i < $scope.showcases.length; i++) {
                                var showcase = $scope.showcases[i];
                                elementsInShowcase = elementsInShowcase.concat(showcase.elements);
                            }

                            var elementsIdentifierInShowcase = _.pluck(elementsInShowcase,"elementIdentifier");
                            elementsIdentifierInShowcase = _.uniq(elementsIdentifierInShowcase);

                            $scope.elements = _.filter($scope.elements,function(element){
                                return elementsIdentifierInShowcase.indexOf(element.elementIdentifier) > -1;
                            });

                            $scope.loadingService.isLoading = false;
                        }).error(function (err) {
                            console.error(err);
                        });
                    }).error(function (err) {
                        console.log(err);
                    });
                }).error(function (err) {
                    console.log(err);
                });
            }).error(function (err) {
                console.log(err);
            });
        });

        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {
            $scope.days.monday = objectClicked.onMonday == "1";
            $scope.days.tuesday = objectClicked.onTuesday == "1";
            $scope.days.wednesday = objectClicked.onWednesday == "1";
            $scope.days.thursday = objectClicked.onThursday == "1";
            $scope.days.friday = objectClicked.onFriday == "1";
            $scope.days.saturday = objectClicked.onSaturday == "1";
            $scope.days.sunday = objectClicked.onSunday == "1";

            if(isNaN(parseFloat(objectClicked.startTime))) {
                $scope.time.timeEnabled[0] = 0;
            }else{
                $scope.time.timeEnabled[0] = parseFloat(objectClicked.startTime);
            }

            if(isNaN(parseFloat(objectClicked.endTime))) {
                $scope.time.timeEnabled[1] = 24;
            } else{
                $scope.time.timeEnabled[1] = parseFloat(objectClicked.endTime);
            }

            $scope.sitesAssigned = [];


            if($scope.objectsSidebarService.selectedObject.elementIdentifier == "" && $scope.elements.length> 0){
                $scope.objectsSidebarService.selectedObject.elementIdentifier = $scope.elements[0].elementIdentifier;
            }

            for(var i = 0; i < $scope.sites.length; i++){
              if($scope.sites[i].isReady == 1){
                  var isAssigned = false;
                  if($scope.sites[i].notices)
                      isAssigned = $scope.sites[i].notices.indexOf($scope.objectsSidebarService.selectedObject.identifier) > -1;
                  $scope.sitesAssigned.push({"isAssigned":isAssigned, site:$scope.sites[i]});
              }
            }


        });

        $scope.$on("Biin: On Object Created", function () {
            $scope.create();
        });

        /**=============================================================================================================
         * Variables
         *
         =============================================================================================================*/

        //Init the the sites
        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
        $scope.days = {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        };

        $scope.time = {};
        $scope.time.timeEnabled = [0,24];

        $scope.sitesAssigned = [];

        $scope.validatesValues = function( event, value){
            if(value && Array.isArray(value)){
                if(value[1]-value[0] <= 0.5 && value[1] == 24){
                    value[0] = 23.5;
                    value[1] = 24;
                } else if(value[1]-value[0] < 0.5){
                    value[1] = value[0] + 0.5;
                }
            }
        };

        $scope.ticks = [0,6,12,18,24];
        $scope.ticksText = ['12:00 AM','6:00 AM','12:00 PM','6:00 PM','12:00 AM'];

        $scope.labels = [
            "12:00 AM",
            "12:30 AM",
            "1:00 AM",
            "1:30 AM",
            "2:00 AM",
            "2:30 AM",
            "3:00 AM",
            "3:30 AM",
            "4:00 AM",
            "4:30 AM",
            "5:00 AM",
            "5:30 AM",
            "6:00 AM",
            "6:30 AM",
            "7:00 AM",
            "7:30 AM",
            "8:00 AM",
            "8:30 AM",
            "9:00 AM",
            "9:30 AM",
            "10:00 AM",
            "10:30 AM",
            "11:00 AM",
            "11:30 AM",
            "12:00 PM",
            "12:30 PM",
            "1:00 PM",
            "1:30 PM",
            "2:00 PM",
            "2:30 PM",
            "3:00 PM",
            "3:30 PM",
            "4:00 PM",
            "4:30 PM",
            "5:00 PM",
            "5:30 PM",
            "6:00 PM",
            "6:30 PM",
            "7:00 PM",
            "7:30 PM",
            "8:00 PM",
            "8:30 PM",
            "9:00 PM",
            "9:30 PM",
            "10:00 PM",
            "10:30 PM",
            "11:00 PM",
            "11:30 PM",
            "12:00 AM"];


        $scope.hourFormatter = function(value){
            if(Array.isArray(value)){
                return $scope.labels[value[0]*2] +" : "+ $scope.labels[value[1]*2] ;
            }else{
                return $scope.labels[value*2];
            }
        };


        /**=============================================================================================================
         * Self called functions
         *
         =============================================================================================================*/

            //Get the Sites Information
        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/sites/').success(function (data) {
            $scope.sites = data.data.sites;
            //Get the elements
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function (data) {
                $scope.elements = data.data.elements;
                //Get the showcases
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/showcases/').success(function (data) {
                    $scope.showcases = data.data;
                    $http.get(ApplicationConfiguration.applicationBackendURL + 'api/notices/organizations/' + $scope.organizationId).success(function (data) {
                        $scope.notices = data.data;
                        $scope.objectsSidebarService.setObjects(data.data);

                        var elementsInShowcase = [];
                        for (var i = 0; i < $scope.showcases.length; i++) {
                            var showcase = $scope.showcases[i];
                            elementsInShowcase = elementsInShowcase.concat(showcase.elements);
                        }

                        var elementsIdentifierInShowcase = _.pluck(elementsInShowcase,"elementIdentifier");
                        elementsIdentifierInShowcase = _.uniq(elementsIdentifierInShowcase);

                        $scope.elements = _.filter($scope.elements,function(element){
                            return elementsIdentifierInShowcase.indexOf(element.elementIdentifier) > -1;
                        });

                        $scope.loadingService.isLoading = false;
                    }).error(function (err) {
                        console.error(err);
                    });
                }).error(function (err) {
                    console.error(err);
                });
            }).error(function (err) {
                console.error(err);
            });
        }).error(function (err) {
            console.error(err);
        });


        $scope.setAllDay = function () {
            $scope.time.timeEnabled = [0, 24];
        };

        $scope.create = function () {
            var titleText = $translate.instant("NOTICES.CREATING");
            swal({   title: titleText,  type: "info",   showConfirmButton: false });
            $http.put(ApplicationConfiguration.applicationBackendURL + 'api/notices/organizations/' + $scope.organizationId).success(function (data) {
                $scope.notices.push(data);
                $scope.objectsSidebarService.setObjects($scope.notices);
                $scope.objectsSidebarService.setSelectedObject(data);
                setTimeout(function(){
                    swal.close();
                },2000);
            }).error(function (err) {
                console.error(err);
            });
        };

        $scope.enableAllDays = function () {
            $scope.days = {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true
            };
        };

        $scope.disableAllDays = function () {
            $scope.days = {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            };
        };

        $scope.enableNoticeInAllSites = function(){
            for (var i = 0; i < $scope.sitesAssigned.length; i++) {
                $scope.sitesAssigned[i].isAssigned = true;
            }
        };

        $scope.disableNoticeInAllSites = function(){
            for (var i = 0; i < $scope.sitesAssigned.length; i++) {
                $scope.sitesAssigned[i].isAssigned = false;
            }
        };

        $scope.toggleIsActive = function(){
            $scope.objectsSidebarService.selectedObject.isActive = !$scope.objectsSidebarService.selectedObject.isActive;
        };


        $scope.deleteNotice = function(message, selectedObject) {
            var translatedTexts  = $translate.instant(["NOTICES.DELETE_TITLE","NOTICES.DELETE_CONFIRMATION"," NOTICES.DELETED","GENERIC.DELETE","GENERIC.CANCEL"]);

            swal({
                title: translatedTexts["NOTICES.DELETE_TITLE"],
                text: translatedTexts["NOTICES.DELETE_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#DD6B55",
                confirmButtonText: translatedTexts["GENERIC.DELETE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                $scope.removeNoticeAt($scope.objectsSidebarService.objects.indexOf(selectedObject));
            });
        };

        //Remove element at specific position
        $scope.removeNoticeAt = function(index){
            var translatedTexts  = $translate.instant(["NOTICES.DELETED_TEXT","GENERIC.DELETED"]);
            //var elementId = $scope.objectsSidebarService.objects[index].elementIdentifier;
            var noticeId = $scope.objectsSidebarService.objects[index].identifier;
            $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/notices/'+noticeId).success(function(data){
                    if($scope.objectsSidebarService.selectedObject==$scope.objectsSidebarService.objects[index]){
                        $scope.objectsSidebarService.selectedObject = null;
                    }
                    $scope.objectsSidebarService.objects.splice(index,1);
                    swal(translatedTexts["GENERIC.DELETED"], translatedTexts["NOTICES.DELETED_TEXT"], "success");
                }
            );
        };
    }

})();

(function() {
    'use strict';

    angular
        .module('biins')
        .directive('localization', organizationDropDown);

    organizationDropDown.$inject = ['$http','Organization'];
    function organizationDropDown ($http,Organization) {
        var directive = {
            link: link,
            restrict: 'E',
            template: "<text>{{getSiteName(item.siteIdentifier)}}</text>",
            transclude: false
        };
        return directive;

        function link(scope, element, attrs) {
            scope.organzationService = Organization;
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + scope.organzationService.selectedOrganization.identifier + '/sites/').success(function (data) {
                scope.sites = data.data.sites;
                scope.getSiteName = function (identifier) {
                    var site = _.findWhere(scope.sites, {identifier: identifier});
                    if (site) {
                        return site.title1 + " " + site.title2;
                    } else {
                        return "";
                    }
                };
                scope.$on('organizationChanged', function () {
                    $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + scope.organzationService.selectedOrganization.identifier + '/sites/').success(function (data) {
                        scope.sites = data.data.sites;
                    });
                });
            });

        }

    }


})();


/**
 * Created by Carlos on 7/28/15.
 */
'use strict';

// Setting up route
angular.module('cards').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
        state('app.cards', {
            url: '/cards',
            templateUrl: 'modules/cards/views/cards.client.view.html',
            resolve:{
                permissions: function(Permission) {
                    return Permission.getPermissions();
                },
                selectedOrganization: function (Organization) {
                    return Organization.getSelectedOrganization();
                },
                organization: function (Organization) {
                    return Organization.getOrganizations();
                }
            }
        });
    }
]);

/**=========================================================
 * Module: cards.client.controller.js
 * Controller of cards
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('cards')
        .controller('CardsController', CardsController);

    CardsController.$inject = ['$http', '$state', '$scope', 'Loading', 'Organization', 'ObjectsSidebar', 'Authentication', '$translate'];

    function CardsController($http, $state, $scope, Loading, Organization, ObjectsSidebar, Authentication, $translate) {
        var card = this;

        //Running init function
        init();

        /**=============================================================================================================
         * Init Function
         =============================================================================================================*/

        function init() {
            //----Services needed----//
            //Loading Service
            $scope.loadingService = Loading;
            //Organization Service
            $scope.organizationService = Organization;
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            //Objects Sidebar Service
            $scope.objectsSidebarService = ObjectsSidebar;
            //Authentication Service
            $scope.authentication = Authentication;
            //Card Object
            $scope.objectsSidebarService.selectedObject = {};
            //----Variables----//
            //Ready to fill
            $scope.ready = false;
            $scope.cards = [];
            $scope.slotsQuantities = [10,12,14];
            //State of loading screen
            $scope.loadingService.isLoading = true;
            //Current Date
            $scope.currentDate = new Date().getTime();
            //Default alerts/hints
            $scope.show_alert = true;
            //ObjectsSidebar card template
            $scope.sidebarTemplate =
                "<div class='col-md-3 thumbListImage'>" +
                    "<img ng-if='!item.gift' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
                    "<img ng-if='item.gift' ng-src='{{setProductImage(item.gift.productIdentifier)}}' pending-indicator='pending-indicator'/>"+
                "</div>" +
                "<div class='col-md-9 leftInformationArea'>"+
                    "<label class='twoRowTitle'>{{organizationService.selectedOrganization.name}}</label>"+
                    "<small>Cliente frecuente</small>"+
                "</div>";
            $scope.objectsSidebarService.template =$scope.sidebarTemplate;
        }

        /**=============================================================================================================
         * Event Listeners
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.$on("Biin: On Object Created", function(){
            $scope.create();
        });

        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {
            //All ready to show the gift info
            $scope.ready = true;
        });

        $scope.$on('organizationChanged',function(){
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            $scope.loadingService.isLoading = true;
            //Get the List of Gifts
            $scope.ready = false;
            if($scope.organizationId){
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards').success(function(cards) {
                    $scope.cards = cards;
                    $scope.objectsSidebarService.setObjects($scope.cards);
                    $state.reload();
                    $scope.loadingService.isLoading = false;
                });
                //Get the List of Products
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function(data) {
                    $scope.products = data.data.elements;
                });
                //Get the List of Gifts
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gifts) {
                    getAvailableGifts(gifts);
                });
            }
        });

        /**=============================================================================================================
         * Functions
         =============================================================================================================*/

        if($scope.organizationId){
            //Get the List of Cards
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards').success(function(cards) {
                console.log(cards);
                $scope.cards = cards;
                $scope.objectsSidebarService.setObjects($scope.cards);
                $scope.loadingService.isLoading = false;
            });
            //Get the List of Gifts
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gifts) {
                getAvailableGifts(gifts);
            });
        }

        //Create a card
        $scope.create = function(){
            var titleText = $translate.instant("CARD.CREATING");
            swal({   title: titleText,  type: "info",   showConfirmButton: false });
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards').success(function(card,status){
                if(status == 201){
                    var cards = $scope.objectsSidebarService.getObjects();
                    cards.push(card);
                    $scope.objectsSidebarService.setObjects(cards);
                    $scope.objectsSidebarService.setSelectedObject(card);
                    $scope.ready = true;

                    setTimeout(function(){
                        swal.close();
                    },2000);
                }
            });
        }

        //Function that display the swal as a confirmation to remove card
        $scope.deleteCard = function(message, selectedObject) {
            var translatedTexts  = $translate.instant(["GENERIC.DELETE_CARD_TITLE","GENERIC.DELETE_CARD_CONFIRMATION","GENERIC.DELETE","GENERIC.CANCEL"]);

            swal({
                title: translatedTexts["GENERIC.DELETE_CARD_TITLE"],
                text: translatedTexts["GENERIC.DELETE_CARD_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#DD6B55",
                confirmButtonText: translatedTexts["GENERIC.DELETE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                    $scope.removeCardAt($scope.objectsSidebarService.objects.indexOf(selectedObject));
            });
        };

        //Remove card at specific position
        $scope.removeCardAt = function(index){
            var cardToDelete = $scope.objectsSidebarService.objects[index];
            var translatedTexts  = $translate.instant(["CARD.DELETED_TEXT","GENERIC.DELETED"]);
            $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards/'+ cardToDelete.identifier,{data:cardToDelete}).success(function(data){
                    $scope.ready = false;
                    $scope.objectsSidebarService.objects.splice(index,1);
                    swal(translatedTexts["GENERIC.DELETED"], translatedTexts["CARD.DELETED_TEXT"], "success");
                }
            );
        };
        
        //Save gift information
        $scope.update = function(){
            var cardToUpdate = $scope.objectsSidebarService.selectedObject;
            // Don't do anything if there is no selected card
            if ($scope.ready == false)
                return;

            if(card.myForm.$valid && ($scope.objectsSidebarService.selectedObject.conditionsText || $scope.objectsSidebarService.selectedObject.conditionsURL)) {
                $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards/'+ cardToUpdate.identifier,cardToUpdate).success(function(data,status){
                    console.log('Actualizado');
                });
            }
        }

        //Function to activate a card
        $scope.activate = function () {
            var cardToUpdate = $scope.objectsSidebarService.selectedObject;
            var translatedTexts  = $translate.instant(["GENERIC.ACTIVATE_CARD_TITLE","GENERIC.ACTIVATE_CARD_CONFIRMATION","GENERIC.ACTIVATE","GENERIC.CANCEL","GENERIC.ACTIVATED","CARD.ACTIVATE_TEXT"]);
            swal({
                title: translatedTexts["GENERIC.ACTIVATE_CARD_TITLE"],
                text: translatedTexts["GENERIC.ACTIVATE_CARD_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#8CD4F5",
                confirmButtonText: translatedTexts["GENERIC.ACTIVATE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                $scope.objectsSidebarService.selectedObject.isActive = true;
                if(card.myForm.$valid && ($scope.objectsSidebarService.selectedObject.conditionsText || $scope.objectsSidebarService.selectedObject.conditionsURL)) {
                    $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards/'+cardToUpdate.identifier,{isActive:true}).success(function(data,status){
                        swal(translatedTexts["GENERIC.ACTIVATED"], translatedTexts["CARD.ACTIVATE_TEXT"], "success");
                    });
                }
            });
        }
        //Function to remove expire and spent gifts
        function getAvailableGifts(gifts) {
            console.log(gifts);
            $scope.gifts = [];
            for(var i in gifts){
                gifts[i].endDate = new Date();
                if((gifts[i].amount > gifts[i].amountSpent && $scope.currentDate < gifts[i].endDate.getTime()) || (gifts[i].amount ==-1 && $scope.currentDate < gifts[i].endDate.getTime())){
                   $scope.gifts.push(gifts[i]);
                }
            }
        }
        $scope.checkUnlimited = function() {
            $scope.objectsSidebarService.selectedObject.quantity = 1;
        }
    }
})();

/**=========================================================
 * Module: chart.js
 * Wrapper directive for chartJS. 
 * Based on https://gist.github.com/AndreasHeiberg/9837868
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        /* Aliases for various chart types */
        .directive('linechart',     chartJS('Line')      )
        .directive('barchart',      chartJS('Bar')       )
        .directive('radarchart',    chartJS('Radar')     )
        .directive('polarchart',    chartJS('PolarArea') )
        .directive('piechart',      chartJS('Pie')       )
        .directive('doughnutchart', chartJS('Doughnut')  )
        .directive('donutchart',    chartJS('Doughnut')  )
        ;

    function chartJS(type) {
        return function() {
            return {
                restrict: 'A',
                scope: {
                    data: '=',
                    options: '=',
                    id: '@',
                    width: '=',
                    height: '=',
                    resize: '=',
                    chart: '@',
                    segments: '@',
                    responsive: '=',
                    tooltip: '=',
                    legend: '='
                },
                link: function ($scope, $elem) {
                    var ctx = $elem[0].getContext('2d');
                    var autosize = false;

                    $scope.size = function () {
                        if ($scope.width <= 0) {
                            $elem.width($elem.parent().width());
                            ctx.canvas.width = $elem.width();
                        } else {
                            ctx.canvas.width = $scope.width || ctx.canvas.width;
                            autosize = true;
                        }

                        if($scope.height <= 0){
                            $elem.height($elem.parent().height());
                            ctx.canvas.height = ctx.canvas.width / 2;
                        } else {
                            ctx.canvas.height = $scope.height || ctx.canvas.height;
                            autosize = true;
                        }
                    };

                    $scope.$watch('data', function (newVal) {
                        if(chartCreated)
                            chartCreated.destroy();

                        // if data not defined, exit
                        if (!newVal) {
                            return;
                        }
                        if ($scope.chart) { type = $scope.chart; }

                        if(autosize){
                            $scope.size();
                            chart = new Chart(ctx);
                        }

                        if($scope.responsive || $scope.resize)
                            $scope.options.responsive = true;

                        if($scope.responsive !== undefined)
                            $scope.options.responsive = $scope.responsive;

                        chartCreated = chart[type]($scope.data, $scope.options);
                        chartCreated.update();
                        if($scope.legend)
                            angular.element($elem[0]).parent().after( chartCreated.generateLegend() );
                    }, true);

                    $scope.$watch('tooltip', function (newVal) {
                        if (chartCreated)
                            chartCreated.draw();
                        if(newVal===undefined || !chartCreated.segments)
                            return;
                        if(!isFinite(newVal) || newVal >= chartCreated.segments.length || newVal < 0)
                            return;
                        var activeSegment = chartCreated.segments[newVal];
                        activeSegment.save();
                        activeSegment.fillColor = activeSegment.highlightColor;
                        chartCreated.showTooltip([activeSegment]);
                        activeSegment.restore();
                    }, true);

                    $scope.size();
                    var chart = new Chart(ctx);
                    var chartCreated;

                    $scope.$on('$destroy', function() {
                        if(chartCreated)
                            chartCreated.destroy();
                    });
                }
            };
        };
    }
})();





/**=========================================================
 * Module: classy-loader.js
 * Enable use of classyloader directly from data attributes
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('classyloader', classyloader);

    classyloader.$inject = ['$timeout', 'Utils', '$window'];
    function classyloader ($timeout, Utils, $window) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var $scroller       = $($window),
              inViewFlagClass = 'js-is-in-view'; // a classname to detect when a chart has been triggered after scroll

          // run after interpolation  
          $timeout(function(){
      
            var $element = $(element),
                options  = $element.data();
            
            // At lease we need a data-percentage attribute
            if(options) {
              if( options.triggerInView ) {

                $scroller.scroll(function() {
                  checkLoaderInVIew($element, options);
                });
                // if the element starts already in view
                checkLoaderInVIew($element, options);
              }
              else
                startLoader($element, options);
            }

          }, 0);

          function checkLoaderInVIew(element, options) {
            var offset = -20;
            if( ! element.hasClass(inViewFlagClass) &&
                Utils.isInView(element, {topoffset: offset}) ) {
              startLoader(element, options);
            }
          }
          function startLoader(element, options) {
            element.ClassyLoader(options).addClass(inViewFlagClass);
          }
        }
    }

})();

/**=========================================================
 * Module: flot.js
 * Initializes the Flot chart plugin and handles data refresh
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('flot', flot);

    flot.$inject = ['$http', '$timeout'];
    function flot ($http, $timeout) {

        var directive = {
          restrict: 'EA',
          template: '<div></div>',
          scope: {
            dataset: '=?',
            options: '=',
            series: '=',
            callback: '=',
            src: '='
          },
          link: link
        };
        return directive;

        function link(scope, element, attrs) {
          var height, plot, plotArea, width;
          var heightDefault = 220;

          plot = null;

          width = attrs.width || '100%';
          height = attrs.height || heightDefault;

          plotArea = $(element.children()[0]);
          plotArea.css({
            width: width,
            height: height
          });

          function init() {
            var plotObj;
            if(!scope.dataset || !scope.options) return;
            plotObj = $.plot(plotArea, scope.dataset, scope.options);
            scope.$emit('plotReady', plotObj);
            if (scope.callback) {
              scope.callback(plotObj, scope);
            }

            return plotObj;
          }

          function onDatasetChanged(dataset) {
            if (plot) {
              plot.setData(dataset);
              plot.setupGrid();
              return plot.draw();
            } else {
              plot = init();
              onSerieToggled(scope.series);
              return plot;
            }
          }
          scope.$watchCollection('dataset', onDatasetChanged, true);

          function onSerieToggled (series) {
            if( !plot || !series ) return;
            var someData = plot.getData();
            for(var sName in series) {
              angular.forEach(series[sName], toggleFor(sName));
            }
            
            plot.setData(someData);
            plot.draw();
            
            function toggleFor(sName) {
              return function (s, i){
                if(someData[i] && someData[i][sName])
                  someData[i][sName].show = s;
              };
            }
          }
          scope.$watch('series', onSerieToggled, true);
          
          function onSrcChanged(src) {

            if( src ) {

              $http.get(src)
                .success(function (data) {

                  $timeout(function(){
                    scope.dataset = data;
                  });

              }).error(function(){
                $.error('Flot chart: Bad request.');
              });
              
            }
          }
          scope.$watch('src', onSrcChanged);

        }
    }


})();

/**=========================================================
 * Module: morris.js
 * AngularJS Directives for Morris Charts
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('morrisBar',   morrisChart('Bar')   )
        .directive('morrisDonut', morrisChart('Donut') )
        .directive('morrisLine',  morrisChart('Line')  )
        .directive('morrisArea',  morrisChart('Area')  );

    function morrisChart(type) {
      return function () {
        return {
          restrict: 'EA',
          scope: {
            morrisData: '=',
            morrisOptions: '='
          },
          link: function($scope, element) {
            // start ready to watch for changes in data
            $scope.$watch('morrisData', function(newVal) {
              if (newVal) {
                $scope.morrisInstance.setData(newVal);
                $scope.morrisInstance.redraw();
              }
            }, true);
            // the element that contains the chart
            $scope.morrisOptions.element = element;
            // If data defined copy to options
            if($scope.morrisData)
              $scope.morrisOptions.data = $scope.morrisData;
            // Init chart
            $scope.morrisInstance = new Morris[type]($scope.morrisOptions);

          }
        };
      };
    }

})();

/**=========================================================
 * Module: sparkline.js
 * SparkLines Mini Charts
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('sparkline', sparkline);

    function sparkline () {
        var directive = {
            restrict: 'EA',
            scope: {
              'sparkline': '='
            },
            controller: Controller
        };
        return directive;

    }
    Controller.$inject = ['$scope', '$element', '$timeout', '$window'];
    function Controller($scope, $element, $timeout, $window) {
      var runSL = function(){
        initSparLine();
      };

      $timeout(runSL);
  
      function initSparLine() {
        var options = $scope.sparkline,
            data = $element.data();
        
        if(!options) // if no scope options, try with data attributes
          options = data;
        else
          if(data) // data attributes overrides scope options
            options = angular.extend({}, options, data);

        options.type = options.type || 'bar'; // default chart is bar
        options.disableHiddenCheck = true;

        $element.sparkline('html', options);

        if(options.resize) {
          $($window).resize(function(){
            $element.sparkline('html', options);
          });
        }
      }

    }
    

})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide){
      
      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;
    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus) {
        // Add default menu entry
        //Menus.addMenuItem('sidebar', 'Home', 'home', null, '/home', true, null, null, 'icon-home');

        Menus.addMenuItem('sidebar', 'Resumen'    , 'dashboard'       , null, 'app.dashboard'    , false, null, null, 'icon-speedometer', "SIDEBAR.MENU_DASHBOARD");
        Menus.addMenuItem('sidebar', 'Productos'     , 'elements'        , null, 'app.elements'     , false, null, null, 'icon-book-open', "SIDEBAR.MENU_ELEMENTS");
        Menus.addMenuItem('sidebar', 'Vitrinas'     , 'showcases'       , null, 'app.showcases'     , false, null, null, 'icon-docs', "SIDEBAR.MENU_SHOWCASES");
        Menus.addMenuItem('sidebar', 'Avisos'        , 'biins'           , null, 'app.biins'        , false, null, null, 'icon-feed', "SIDEBAR.MENU_BIINS");
        Menus.addMenuItem('sidebar', 'Locales'        , 'sites'           , null, 'app.sites'        , false, null, null, 'icon-pointer', "SIDEBAR.MENU_SITES");
        Menus.addMenuItem('sidebar', 'Regalos'        , 'gifts'           , null, 'app.gifts'        , false, null, null, 'icon-present', "SIDEBAR.MENU_GIFTS");
        Menus.addMenuItem('sidebar', 'Tarjetas'        , 'cards'           , null, 'app.cards'        , false, null, null, 'icon-note', "SIDEBAR.MENU_CARDS");
        Menus.addMenuItem('sidebar', 'Organizaciones', 'organization'   , null, 'app.organization'  , false, null, null, 'icon-globe', "SIDEBAR.MENU_ORGANIZATIONS");
        Menus.addMenuItem('sidebar', 'Perfil'      , 'profile'         , null, 'app.profile'      , false, null, null, 'icon-user', "SIDEBAR.MENU_PROFILE");
        //Maintenance has role field: maintenance
        Menus.addMenuItem('sidebar', 'Mantenimiento', 'maintenance', null, 'app.maintenance', false, 'maintenance', null, 'icon-settings', "SIDEBAR.MENU_MAINTENANCE");
    }

})();

(function () {
    'use strict';

    angular
        .module('app.core')
        .config(appRoutes)
    ;
    appRoutes.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function appRoutes($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // default route
        $urlRouterProvider.otherwise('/page/login');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('app', {
                // url: '/',
                abstract: true,
                templateUrl: 'modules/core/views/core.client.view.html',
                resolve: helper.resolveFor('modernizr', 'icons', 'filestyle')
            })
            .state('app.home', {
                //url: '/home',
                templateUrl: 'modules/core/views/home.client.view.html',
                resolve: {
                    permissions: function(Permission) {
                        return Permission.getPermissions();
                    },
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            })
            .state('appleftbar', {
                abstract: true,
                templateUrl: 'modules/core/views/coreleftbar.client.view.html',
                resolve: helper.resolveFor('modernizr', 'icons', 'filestyle')
            })
            //
            // CUSTOM RESOLVES
            //   Add your own resolves properties
            //   following this object extend
            //   method
            // -----------------------------------
            // .state('app.someroute', {
            //   url: '/some_url',
            //   templateUrl: 'path_to_template.html',
            //   controller: 'someController',
            //   resolve: angular.extend(
            //     helper.resolveFor(), {
            //     // YOUR RESOLVES GO HERE
            //     }
            //   )
            // })
        ;

    }
})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();


'use strict';

angular.module('app.core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','Organization',
	function($scope, Authentication, Menus,Organization) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.organizationService = Organization;

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

	}
]);

/**
 * Created by Ivan on 3/4/16.
 */
'use strict';

angular.module('app.core').controller('LoadingController', ['$scope','Loading',
    function($scope, LoadingService) {
        $scope.loading = LoadingService;
    }
]);

// **Created by Carlos on 15/07/2016
/*  Modal directive  */
(function() {
    'use strict';

    angular /*  Module getter */
        .module('app.core')
        .directive('modal', modal);

    function modal() {
        return {
            restrict: 'A',

            link:function($scope, element, attributes){

                $scope.open = function() {
                    // console.log($scope.npsTimeout.$$timeoutId);
                    $('#' + attributes.target).modal({backdrop:'static',keyboard:false});
                    $('#' + attributes.target).modal('show');
                }
                $scope.close = function() {
                    $('#' + attributes.target).modal('hide');
                }

                var action = attributes['modal'];
                element.on('click', $scope[action]);
            }
        };
    }

})();

/**=========================================================
 * Module: scroll.js
 * Make a content box scrollable
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('scrollable', scrollable);

    function scrollable () {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var defaultHeight = 250;
          element.slimScroll({
              //height: (attrs.height || defaultHeight)
              position: 'right',
              height: '150px',
              railVisible: true,
              alwaysVisible: true
          });
        }
    }

})();

'use strict';

angular.module('app.core').service('Categories', ['$http', function (async) {
    return {
        getList: function () {
            var promise = async({method:'GET', url:ApplicationConfiguration.applicationBackendURL + 'api/categories'})
                .success(function (data, status, headers, config) {
                    return data;
                })
                .error(function (data, status, headers, config) {
                    return {"status": false};
                });
            return promise;
        }

    };
}]);

'use strict';

angular.module('app.core').service('Loading', [ function () {
    return {
        isLoading : false
    };
}]);

'use strict';

//Menu service used for managing  menus
angular.module('app.core').service('Menus', [

	function() {


		// Define the menus object
		this.menus = {};

		/*
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		}; */

		// Define a set of default roles
		this.defaultRoles = ['*'];

		// A private function for rendering decision
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var index in user.permissions) {
							var attr = user.permissions[index];
							if (attr.permission === this.roles) {
								return true;
							}
					}
					return false;
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Private function to check if menu sidebar option should be rendered
		this.userHasValidPermit = function(roles){
			if (roles === null || typeof roles === 'undefined') {
				return true;
			}
			else if(user.role === roles) {
				return true;
			}
			else {
				return false;
			}
		}


		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position,
																iconClass, translateKey, alert) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				//title: menuItemTitle,
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender,
				iconClass: iconClass || 'fa fa-file-o',
				translate: translateKey,
				alert: alert
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position, translateKey) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender,
						translate: translateKey
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
		//Adding the sidebar menu
		this.addMenu('sidebar');
	}
]);

'use strict';

angular.module('app.core').service('Organization', ['$http', '$q', '$rootScope', 'Authentication', 'GlobalFilters',


    function ($http, $q, $rootScope, Authentication, GlobalFilters) {

        var deferObject;

        var service = {

            selectedOrganization: 'undefined',
            selectedOrganizationId: 'undefined',
            organizationsList: [],

            getSelectedOrganization: function () {

                if (Authentication.user) {
                    var promise = $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + Authentication.user.accountIdentifier + '/selectedOrganization/');
                    deferObject = deferObject || $q.defer();

                    promise.then(function (result) {
                            service.selectedOrganizationId = result.data.data.selectedOrganization;
                            deferObject.resolve(result);
                        },
                        function (reason) {
                            deferObject.reject(reason);
                        });
                    return deferObject.promise;
                }
            },

            getOrganizations: function () {

                if (Authentication.user) {
                    var promise = $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations', {headers:{user: Authentication.user.accountIdentifier}});
                    deferObject = deferObject || $q.defer();

                    promise.then(function (result) {
                            service.organizationsList = result.data.data;

                            // Filter deleted sites
                            for (var orgIndex = 0; orgIndex < service.organizationsList.length; orgIndex++) {
                                var siteList = [];
                                for(var siteIndex = 0; siteIndex < service.organizationsList[orgIndex].sites.length; siteIndex++){
                                    if (service.organizationsList[orgIndex].sites[siteIndex].isDeleted == 0) {
                                        siteList.push(service.organizationsList[orgIndex].sites[siteIndex]);
                                    }
                                }
                                service.organizationsList[orgIndex].sites = siteList;
                            }

                            service.selectedOrganization = service.organizationsList[0];

                            // If last selected organization id has been retrieved
                            if (service.selectedOrganizationId != 'undefined') {

                                var orgFound = false;
                                var index = 0;
                                while (!orgFound && index < service.organizationsList.length) {
                                    if (service.organizationsList[index].identifier == service.selectedOrganizationId) {
                                        service.selectedOrganization = service.organizationsList[index];
                                        orgFound = true;
                                    }
                                    index++;
                                }

                            }
                            GlobalFilters.setDefaultSite(service.selectedOrganization.sites[0]);

                            deferObject.resolve(result);
                        },
                        function (reason) {
                            deferObject.reject(reason);
                        });
                    return deferObject.promise;
                }
            },

            setSelectedOrganization: function (index) {
                if (Authentication.user) {
                    if (!(index >= 0 && index < this.organizationsList.length)) {
                    } else {
                        this.selectedOrganization = this.organizationsList[index];
                        this.selectedOrganizationId = this.selectedOrganization.identifier;
                        GlobalFilters.setDefaultSite(service.selectedOrganization.sites[0]);

                        $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + Authentication.user.accountIdentifier + '/' + service.selectedOrganization.identifier, {});

                        $rootScope.$broadcast('organizationChanged');
                        //Update selected site when organization is changed
                        $rootScope.$broadcast('changeSelectedSite');
                    }
                }
            },

            removeOrganization: function (id) {
                for (var i = 0; i < this.organizationsList.length; i++) {
                    if (this.organizationsList[i].identifier == id) {
                        this.organizationsList.slice(i, 1);
                        break;
                    }
                }
                service.setSelectedOrganization(0);
            }
        };

        return service;

    }]);


'use strict';

angular.module('app.core').service('Permission', ['$http', '$q', 'Authentication',


    function ($http, $q, Authentication) {

        var deferObject;

        var service = {
            //permissions: {},

            getPermissions: function () {
                if (Authentication.user) {
                    var promise = $http.get(ApplicationConfiguration.applicationBackendURL + 'roles/' + Authentication.user.role + '/getpermission');
                    deferObject = deferObject || $q.defer();

                    promise.then(function (result) {

                            Authentication.user.permissions = result.data.data;

                            /*var list = result.data.data;

                            if (list.length > 0) {
                                var index;
                                for (index = 0; index < list.length; index++) {
                                    service.permissions[list[index]] = true;
                                }
                            }*/
                            deferObject.resolve(result);
                        },
                        function (reason) {
                            deferObject.reject(reason);
                        });
                    return deferObject.promise;
                }
            }
        };

        return service;

    }]);

'use strict';

// Setting up route
angular.module('dashboard').config(['$stateProvider',
    function ($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/dashboard/views/dashboard.client.view.html',
                resolve: {
                    permissions: function(Permission) {
                        return Permission.getPermissions();
                    },
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            });
    }
]);

/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization', 'ObjectsSidebar', 'GlobalFilters', 'Loading'];
    function DashboardController($http, $state, $scope, Authentication, Organization, ObjectsSidebar, GlobalFilters, Loading) {

        if (!Authentication.user) {
            $location.path('/');
        }

        $scope.authentication = Authentication;
        $scope.organizationService = Organization;
        $scope.globalFilters = GlobalFilters;
        $scope.objectsSidebar = ObjectsSidebar;

        $scope.objectsSidebar.isHidden = true;
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = false;


        $scope.presentialLoaderEnabled = true;
        $scope.virtualLoaderEnabled = true;

        var presentialChildren = {};
        presentialChildren.visitsGraph = true;
        presentialChildren.visitsTable = true;

        var virtualChildren = {};
        virtualChildren.visitsLiked = true;
        virtualChildren.visitsShared = true;
        virtualChildren.visitsTable = true;

        activate();

        ////////////////

        function activate() {
            $scope.globalFilters.dateRange = 30;
        }

        function resetValues(){
            $scope.presentialLoaderEnabled = true;
            $scope.virtualLoaderEnabled = true;

            presentialChildren.visitsGraph = true;
            presentialChildren.visitsTable = true;

            virtualChildren.visitsLiked = true;
            virtualChildren.visitsShared = true;
            virtualChildren.visitsTable = true;
        }

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebar.reset();
        });

        $scope.$on('Biin: Finished Presential Children To Load', function(scope, children){
            presentialChildren[children] = false;
            $scope.presentialLoaderEnabled = presentialChildren.visitsTable || presentialChildren.visitsGraph;
        });

        $scope.$on('Biin: Finished Virtual Children To Load', function(scope, children){
            virtualChildren[children] = false;
            $scope.virtualLoaderEnabled = virtualChildren.visitsLiked || virtualChildren.visitsTable || virtualChildren.visitsShared;
        });


        $scope.changeChartRange = function (numberDays) {
            resetValues();
            $scope.globalFilters.changeDateRange(numberDays);
        };

        $scope.changeSelectedSite = function () {
            $scope.globalFilters.changeSelectedSite($scope.globalFilters.selectedSite);
        };

        $scope.$on('organizationChanged', function () {
            $scope.globalFilters.selectedSite = $scope.organizationService.selectedOrganization.sites[0];
            $scope.globalFilters.changeSelectedSite($scope.organizationService.selectedOrganization.sites[0]);
        });

        $scope.setSelectedSite = function(site){
            resetValues();
            $scope.globalFilters.selectedSite = site;
            $scope.globalFilters.changeSelectedSite($scope.globalFilters.selectedSite);
        }


    }
})();

/**
 * Created by Ivan on 10/26/15.
 */
/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('mobileTotalBiinedController', mobileTotalBiinedController);

    mobileTotalBiinedController.$inject = ['$http', '$state','$scope','$rootScope', 'Authentication', 'Organization','GlobalFilters'];
    function mobileTotalBiinedController($http, $state, $scope,$rootScope, Authentication, Organization,GlobalFilters) {
        var vm = this;
        $scope.value = 0;

        activate();


        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.globalFilters = GlobalFilters;
        }

        $scope.$on('organizationChanged',function(){
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.reset();
            $scope.changeChartRange($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Site Changed',function(scope,site){
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.reset = function (){
            $scope.value = 0;
        };

        $scope.getChartData = function ( days )
        {
            var filters = {};
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;
            filters.siteId = $scope.globalFilters.selectedSite.identifier;

            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/mobile/totalbiined',
                { headers:{
                    filters : JSON.stringify(filters),
                    offset : new Date().getTimezoneOffset() } } ).success(function(data) {
                    $scope.value = data.data;
                    $rootScope.$broadcast('Biin: Finished Virtual Children To Load', 'visitsLiked');
                });
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData(days);
        };

        $scope.changeChartRange($scope.globalFilters.dateRange);
    }
})();

/**
 * Created by Ivan on 10/26/15.
 */
/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('mobileAverageVisitedElementsController', mobileAverageVisitedElementsController);

    mobileAverageVisitedElementsController.$inject = ['$http', '$state','$scope','$rootScope', 'Authentication', 'Organization','GlobalFilters'];
    function mobileAverageVisitedElementsController($http, $state, $scope,$rootScope, Authentication, Organization,GlobalFilters) {
        var vm = this;
        $scope.value = 0;

        activate();

        ////////////////
        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.globalFilters = GlobalFilters;
        }

        $scope.$on('organizationChanged',function(){
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.reset();
            $scope.changeChartRange($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Site Changed',function(scope,site){
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.reset = function (){
            $scope.value = 0;
        };

        $scope.getChartData = function ( days )
        {
            var filters = {};
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;
            filters.siteId = $scope.globalFilters.selectedSite.identifier;

            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/mobile/sharedelements',
                { headers:{
                    filters : JSON.stringify(filters),
                    offset : new Date().getTimezoneOffset() } } ).success(function(data) {
                    $scope.value = data.data;
                    $rootScope.$broadcast('Biin: Finished Virtual Children To Load', 'visitsShared');
                });
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData(days);
        };

        $scope.changeChartRange($scope.globalFilters.dateRange);
    }
})();

/**
 * Created by Ivan on 10/26/15.
 */
/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('mobilePieVisitsController', mobilePieVisitsController);

    mobilePieVisitsController.$inject = ['$http', '$state','$scope','$rootScope', 'Authentication', 'Organization','GlobalFilters'];
    function mobilePieVisitsController($http, $state, $scope,$rootScope, Authentication, Organization,GlobalFilters) {

        var vm = this;
        $scope.value = 0;
        $scope.enoughData = false;
        $scope.news = 0;
        $scope.returning = 0;
        $scope.total = 0;
        activate();

        ////////////////
        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.globalFilters = GlobalFilters;
        }

        $scope.$on('organizationChanged',function(){
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.reset();
            $scope.changeChartRange($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Site Changed',function(scope,site){
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.reset = function () {
            $scope.news = 0;
            $scope.returning = 0;
            $scope.total = 0;
        };

        $scope.getChartData = function ( days )
        {
            var filters = {};
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;
            filters.siteId = $scope.globalFilters.selectedSite.identifier;

            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/mobile/newsvsreturning',{ headers:{
                filters : JSON.stringify(filters),
                offset : new Date().getTimezoneOffset() }
                } ).success(function(data) {
                var information  = data.data;
                $scope.enoughData = information.news || information.returning;

                $scope.news = information.news || 0;
                $scope.returning = information.returning || 0;
                $scope.total = information.totalSessions || 0;
                $rootScope.$broadcast('Biin: Finished Virtual Children To Load', 'visitsTable');
            });
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData(days);
        };

        $scope.changeChartRange($scope.globalFilters.dateRange);
    }
})();

/**
 * Created by Ivan on 10/26/15.
 */
/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('npsController', NPSController);

    NPSController.$inject = ['$http', '$state', '$scope', 'Authentication', 'Organization', 'GlobalFilters', 'toaster', '$timeout'];
    function NPSController($http, $state, $scope, Authentication, Organization, GlobalFilters, toaster, $timeout) {


        var NO_IMAGE_PROFILE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAZJElEQVR4Xu1dB3hVRdp+Z27JTaVIR4qCCAI2RGRBRGmikAQEVyABXRABBUkBBPwhioCQhpRlF2HBJOBiUJKAgAWkLL0I0gSkqvSWQpKbe8/M/8y5CX8IKfeeW8652X98kJKZr817pnzzzTcElazExMTQg2fvPMQZfwzAQ4DUGNA1BGc1QXgNMFQHpX5gzMgAo1CfAgWgtACM5QL0Bgi/AUKvAdIFQuhZAn6WWvmx1s2qnIuJiWGVyWTE25UJeSuyAST8BZx0AEFbcNYaoP7u0IsBOZTgCDjfQzjdTjnd8c3y2X+4g5enaHodADq/GWOqyrJf5Bw9AflXU08ZqzQ+hLBTnJP1nPP1Wfoqmzcvi8lXUx5HeXsFAPr3jzGafbJeJoS8DsaCQWmgo4p6qH4WGEunOvKVPi/o+9TUmAIP8VXMRtMA6DM4shkDfZszDCGE11SspQoNGdhVArqMSXTx2hWxp1QQwS6WWgQACQ6L6gqOKELRwy4tNF+JbCCMxaUtT9gEgGtJXM0AQF69/5bVh4NPAaGPa8lIrpKFcxykwEdpKfHpWgGCFgBAgsOiXwH4J4TgSVcZW8t0OLAfnH2YkZK4QW05VQVA7yERLXWMJnKgm9qGUIc/2UBhjVydPOe4OvwBVQDQPTza3xfSNAY6hgI6tZTXBl9mBdHNYaaAqWsWxeR6WiaPAyB0yLjukpX9k1I09rSyWubHgTOU8eFpyxM2elJOjwGg9/AYP5KXE0fAR3pSQe/jxedm6oImeMqh5BEA9AmLfIIR8m8Azb2vQ9SQmB+hoANWJ8cdcTd3twMgNDwqnDO2CJSa3K1MpaLPeC6ndGhGcpz4cNxW3AaAzp1j9FUaZCcAGO026f8LCBNOEgzm8+NTU1Mld6jrFgAE/218IAosKwmh4rDm/4uTFmDAGjPIgO+T4+44Seq+5i4HQN+wsXWt0K3TklOHEIJHHm6Als2boHGDOmhQvw6qBgXCz88EH6MBuXn5yMnJxa3MbJz/4xLOnr+II8dP449LV11tb8X0CPgBZpVeyfjysyuKiZTS0KUA6D14QkPKrWIbo+oRbZGeTR9qgB4vPod2bVoiKDDAYbtdvHwdO/f9gu827cLV6zcdbu/qBlzCST3RdXFlDILLABA6ZFwTbpU2gZKGrlbcUXpPtmqGga+9jGZNXCMK5xx7DhzFim++w/nfLzkqjkvrM4ZzRs66fL0i8YwrCLsEAPKXL1m2qd359evWxDuD++Lxlo+4wjb30RBA2LhtL5JWrkNWdo5beNhDVIDAAN3zrhgJnAaAmPMlotuq5rAv5vjePZ5HWL+eMBoN9tjQqTq3M7Mxf0kq9h085hQdZxqL6QDc2snZNYFTALCt9qWtai74TCYfRIwYiHZPt3TGnorarl63GUkrv4UYGdQo4lQxH+QFZ3YHigEg9vlBD2ZmqLnVq14tCFOi30bjBnXVsL/Mc/f+I0hYuBzmAosqMogtoin/Qh+lfgLFAAgJj5qrppOnWtUgTJ80EvXqqB8pdujoKUxPWIICi1UVEAhnUVpKXJQS5ooAILt3gSQlDF3RJsDfD59OeQ8P1q3lCnIuobH/0HHMmLMMkuQWh12FMnKQAUrcxg4DQD7Y4XyXWr59nY4iZvxwtG6hCVfDPR2z7sftWJS0usLOcksFxnMppe0cPUByCADiSJfmZe9X81RvWFgoenXv6BYbuoLo/MVf4cete1xBSgENfiRTF9TWkaNkhwAQEha1AASjFEjmkibCwSO+fi0XsRh8f1IcLl+9oYqYhOCztKT4sfYytxsAIpKHM/advYRdXU/47efNHIcHqlVxNWmX0zt64gw+nLFQte0hYbyrvZFFdgGgf/9RAflG38NqhnG9NaA3Qnq+4PLOchfBuZ+vxKZte91Fvly6jEunTWbSOjU1Ma8iAewCQEh4RAJAIyoi5q6f16n1AOZ/Oh56vffEj964mYmR42aqtjXkwOyM5PgJFfVJhQAQodtg9JCa0btjhr+Blzo+U5Eumvv50i/XIH39FpXkYlbODa0yUmafKE+AigBAQsOjvlMzbl94+z5PmAydznu+/iKDX795G+9EzYAkqZRSgLBv05MSeykGQHBY9KuE8LUqQVhmKw54+gV3UVMEp3jHLUjBf3YfdIqGM40JpT3Svoj9viwaZY4A4q7egd+y96t50CNO+RYnfogHqmt/5V+WgYWbeOqsfzrTh861lci+9BVxz5Z1F7FMAISGRb7GCVnlHHfnWrdq0QSfTPTuawSMMbw5+iNkZbs8nM9u43LOQzJSEjJKa1AWAEhIWMRBtW/pvh3eB69262C3olqt+Pelq/D9T7tUE0/EE6YlJ4hV9H3n1qUCIDgsqhshKHPe8JQm82eN19SBj1K9d+z9BbPnqXZ2JotNOHkxLSVuc0kdSgfAoKgNaidnEMe9S+dOUWpzTbXLzMrBkPdi1JWpjB3BfQCQ07JwUu7e0ROatGvTChPff9MTrDzCY9T4Wbh4+ZpHeJXFhHP2SEZK4m/Ff34fAEIGR8eC82hVJQXwekg3DHytkmSIAfDpZ8uwa7/br/qV322Ez0pPSvigTADYsnHl/KGFhEzR74ahY7vKkzAkJXUdVq0RKYJULVdq+2Y3WLRo0d34tXtGgOCwyGBCiMhfo3oRET/Nm1aeFAIiRkDECqhf+KvpyQnriuS4BwAh4VEpAAapLySwMPYD1K1dQwuiuEQGcbFkxpylLqHlDBHC8UVaSvzdxdVdAIgMnIFS9jUKOH6HyhmJSmkrTv2SF3wEX9/Kc6P82IkzmDT97y62lOPkGGGZ1irW2uvnzTOL1ncBEDo4qifnuDs0OE7aNS3E9u9/oobi4Ub1XUNQI1Ru3c7C+5MTVL1RVGQKztE9IyX+h3sAoHaYtxBGBHzOnvo+mjSuXJ1fZPjjp85h0icLVIsU+r9vgSWmJydGlgSASGeqaqhtp/ZPIXKkJpYgbhs3NLEdBH5NT45vcRcAcsp1K7ngNq3tJDz2nQHo3KGNnbW9s9oPm3djwb9SVRdex6V636TMuSSvAUIGR/4VXE7ipGr5+IMRePwxVQcht+v/8+ET+Cj2c7fzqZABQf/0pPhVNgCofM2rSNgp0cPw9OOVO5HY7gNHMVMD20EOPicjOSGicASI2gmO5ypEjZsrDBsUjF49OrmZi7rk09b9hGX//lZdIQBIwI61yfEdiIj8+fl0Zpa7nllxRNN2T7XAxIihjjTxurrTYv+B/YfvOY9RS4es9OT4qkRO7cKYJiTSEStWLJoNHx/5LadKV/Ly8jHw7Qng1P1JLOwxnk5CYxISHt0b4KWGC9lDxJV1CvLuYPTwAejZrXJOA2vWb8LCf30Fo6/qzla52wjBKwIAYwD+mSs7UiktizkPtaoH4vP506H3wjDw8vS2WKwY+u5E3MjMhcHHV6mJXNuO4F2i9q2f4hpJ1gJY8u9g+Ft/Rd/e3V2rrMrUVn6zDktTvobBNwA6nTamABASJ0aAVQB/TWX7yOxFrh3znUz4moxYmPgx6lSS08CLl65iRMRUmC1WmPyCIMLdtVAISCoJCYvcAkI0M+lazLmQLGY81rwpYqdNkM8HvLlYJQmRE2fi5G9noTOYtDP824z6k5gCjgJUPLOqicIZgzk3S45gDn7lJYwa5t1nA5u27sLsOcLzR+DjL75+7QCaERwmIYMiLoHSOpro/UIhxGJQstge4Bz9Tjhe7dFZS+I5JEvMzLnYtfcQ9EYT9EaNLP4KNZCASyQkPCoTQJBDWrm5srwWEKMAZ6hVozq++OdszcybjqiemZWNgUMjwRiB0S9QczowhttiBMhTK+FTecbkkhXmPJGOlWP6lEi0edLziSAd6ezS6q5K24DFSavkfT/V6Z0l5/L2DMgjvQdFSJRS7UxMxdS0WgpgNd/Bc22fQMzEMS43gDsJilHsb6Mm4uqNLBhMfu5kpZg2Y4xpGgBCM7ErYNYCLJ43HfXr1VasrKcb7th9AB/PWqCtfX8JI8gA0OoUUCQr50z2DXR/qSMi33vL0/2omN+YcdNw8vQFmAK0e7VdngK0uAgsaXVxRkBgxedzp6OehrKDloWOXXsPImbmPOgNJui14vYtRdiiRaDmtoElZZUkCyx5OejUoS0mRY1Q/FV6oqHIBzAyYirO/34RPn5VQLS5vJJNYdsGDoo6AgrNL7HNd7LAuYT4GRPRsrl2w8bWbvgJ8xelgOqNMJr8PYE5xTxsjiCNuYLL0ka4h8WCsHGjB7EgbqomXcRi3z/0vUnyA1RG30BNbv1K2Fe4grVzGFQRlItGgSED+mBA/3KTX1VEyi0/nx67ENt27gPVGTRz5l+eorbDIJWTQDrSE0XHxSJWYM6syWj6cCNHmru17qYtOzH7s8U2n7/w+lEvSGvHEUtCB0eN5hzi8QevKMI7yCUL6tetjXmx/wM/P/X9639evIL3xn0MEfKlwRO/svtVBIT0GRzZi3Gyxit6HwBjEgpys2UXcftnn8KUCe+q6mMXnT72g+nyqh+ghSd+2jjvr6hP5ZCw1wZGPGzV0dMVVdbSz60FebAW2E4L+4X0wLAhr6sinsgAKvb7ew/8IvM3mAKg02sk2scOizCibySHhe8/nZ2phWvhdsh8t4o5Nxuc2d7oGRreD/37ePaZYuHrj527BGLuF4XqfWDUqM+/NLuKa+JrkhKraepiiCMAEIEj+XnZINyWh3fY4P7oF/qyIyQU1xXOnoT5S/Hj5h0yDUJ0mjzuLVdBzrenpyR0LLwaFvkZQLzruE14sgo9hEWKjhkxGK90d++bAvn5ZnyauAjC3SsKJxQm3wDvWPXfgwjbFXEZAKFh0a9zwlcq/iRUbGi1mGE158oSRIx6Ez26Pu9WaTb8uBVz/v5FIQ8Cg6+/dqJ8HdCccN4vLSXhaxkAfQeNf1Ci0u8OtNdUVas5D1ZLPv61YKbbD4su/HEJw8d8KOtv8PGHzuCdt5gsOlp33bLYy8VSxESc5Jy659VlD8Clfq1qWBA32QOcgKHvTcbVG9le2/mMkeNrlsfJgcB3ARAS7p3rgKIeHzooRH5A2hPlm7UbkfTVek+wcguP4i+N3gVAcFjEy4RQr9QqKNAfi+InQTwk7YmSm5uP4VHTkXOnwjeZPCGO4zwI6ZaeFPfjPSOASBNXRcq+orUIYXu0GzGkL17u8hd7qrqszprvtmHJck3k1HRIJxEEYioIrJ2aGlNwDwDEX0IGRSSB0nCHKKpcWTwqMe2DER53BwtfwOQZC3H85FmVLeAge4Kl6UnxfytqdY/T2tvOBWpUr4q4j95H1SqBDlrBNdVv3spCdMwciN+9pXDOemakJG4oFQAiWXS+KfN3CqqdZ7nLsGy1KoGYNmmk6g9KXPjzsvxKqJpPwtgNPsYu1/a/07DMZNGCUHB41CwCjLebqAoV69WpKWcT1Uou4T8vXcO0+MWqvRdsbxcQ8JlpyQmTite/79yy18Bxj+h07KS9RD1dr0O7JzDqrX7w10AcQHHdxY5g3uKV2K32mwDldAihtGnaF7H3nPyWenAdEh69HuCeOVmxE0Hi6TjxdHz7Z1rb2UKdatt2HcTSLzM0ty7gwNqM5PjeJa1SKgBCB0V24ZTI+0S1i0geHdrzBfTs2gFGg/bu15VmH/GE/Lof/oP0DVtxO1MEr6hfKFjn1cmJ971jW+azccFhUQfUejRSZNAQGUO7dHoW7du2hkHvHR1fspstVit27DmEjVv34vDx0+oliS7n8chyHo6MCuUEqz2FXfFGQKvmTfBcm1Zo90xriFV+ZSoiXfzOfYflNcKRX89AkiSPqcc56ZWREldqdsrygtdIcHjUXgK4LXtzYIAf2jzRAm2fegxPtX4UfpXogYjyele4kkXO4D0/H8P+Q8eRc8d2nO2ewnanJye2d/jpWCGMO84H6tWpgXZtWqPd0y3xaNNGHvfgucfIyqkKj+KJ385D5BDete+wy7eShPGuacsTNpYlYYXhq67YEVQJCsBLHZ/BC395Go0b1lNurf+ClmfO/4kt2w/gp+37nHcuEWSkJ8WHlGe2CgHQJ3xsCyt0hymg6KaDcNYkfhIJUyVN/+ouTOblmzF2cjyuXLupiIXEYAGnLdeuiBUPgZRZKgSAaOnsY5LCeRM1chA0mohEkYHd2UiEm8ctSJYXjYoLwYz0pPgKI2TsAkDv4TF+JC/7MAEeViqQeApWgMBo9J64eaW6OtNO+BBi5ydj38FjiskQwk7dplUe37wsxnZ5wtkRQLR3zjnEIfL9NHvoQUz9YBSqBFWuLV5FRrb357duZ2LqzAU4c+ES9HqjnM1ZSSnrpfDSaDnEQWnYWF7ObZDCp+trPFANk6NHosWjTZToVmnbHDl2EjPi/4Gbt0TWvsJwczm1nGP5u4qHe9ljLIcAYIsaytoLkFb2EC+qY7vVK/a6XP4ncbt3yMA+8kUOreTNdUQfV9YV20CRSDplZTrE3G8rBAaTv8PXzDhwyFK1oF3Ro5D2yOkQAATBPuHRrRhju0GJQ7nPJKtFzgReBAJBS4wC0aOHelX2L3uMam+d3/+8hLi5S3DiVPGoImV3DRiQo4f07OrkOcft5W+DmoISGhY1gBOscLSpLfmjAEER0gGDQY9+IS/jjdderbQvhZS0k7hd9OXXa/F1+vewWm33G20fvk6+X6goqWThK2CO9okiAAgmShNLiEuVBfnijn8xxQE5JWz4gD7o2rl9pZ0WxHAv7hMmfZmG6zdu3dNXRGQVMfkr0p0DszOS4yc42vmKRwDRsH///rp8U8PVFLjvjNkeQYpu85Ss26hBPYT9NQQd27dRZAx7eHu6juj4/+zcL8/z4mbRvYVAb/RRnkia89VG8+/9U1NTFZ0uKR4BbCAYFWAxmbZwkKeVGFWMAgX5uXL2r5JFZAARi8QuLzwHo9E7r1+ZzQXYuGUnVqVvgHg0omQRaWQMPgqHfNtEuge+gS+uWRSj+DTJKQAIhYIHvF8bRL+V6NBMCQhEG5HswZbwwbZLKF4CAvzQ/cWO6Nm9ExrUr6uUhUfbicXduu+24Ieftpd60sfFKl9OH29SLJe43mUyml9IXTrvmmIiSheBJRmKy6UWSNsoRWOlwoiUsJaCfDCL/Kx9qaVZk8bo0rm9PD08UL2aUlZuaXfj5i1s27FfThhx8vS5MngQUIMRBqOvk9MbOysRPL82KfFPZ5VxegQoEkCkmikgdKMzIBC0OJPk0UD4DsoqwnfQrGljPNf2STmN/CNNGjtpUMfNKBazp86cx/6fj2DnnoM4dfpcORE/RN7Tiy/e+exh7CzR8ZfSls0pC2UOKeMyAAiu4hVybiY/OjMdFEkvMoCIK9+SRQDh/qmh5DTR+rFHZb9Ci2YPy+njfF0cXCK2br+dOY9fT57BsROn8cvRX+WEkOUXIt8gFjmDXZQy9leJsK6u+PKL5HYpAARReU2g13/rqkgi8aWJ0UBkChWjgz1FjBC1aj6Axg3ro26dmqhTq6b8d3GDSJxD+Pv7wscohmIDKCEoKLBAxO/l5NxBZlaOHMh55dp1XLl6HRcvXcH5Cxdx+ep1u2P6xFeuM/hApze6bGQSCz6TvqCXs3N+Sfu5HACCgdgd5Jt8VyjdIpbVyUyyymlhJIsFKGXnYA843FaHiE43yNlCFDlyyhOM89XMLyjMmdV+mdOpuwwi/AQWn0azOeGR7uAhwMAEGKzWu9nC3MGnPJqE6qHT6+XUsC7v9ELGwsnjk39hktJ9fkU2ccsIUJxpcHj0G0RiS6Bz7OygIsGL/1xME4xZwa1WSEySk0kWZQ9zhE65HyGI3Mk6qgPRiU7Xu2x4L42vJHz7nL8p8vi4SofS6LgdAIKpfIAE9qWjp4jOKC62lQIIYjEp/lz0OxiX53JOAMJti0vxf7FuEP+B2n4X87hYuIlflNj+7KkiTvW4Dm+sWRb/q7t5egQAtnVBhG+BiXzqjeno3N0J94xmQLylasFkR450nZHPYwAoElJEFjFKFjkTXuaMwlptK8K4wHTD01LiNntSRo8DQChXGGM4lYBFiiSrnlRYa7xE9K5Oh1hjHvskNTXR40mHVAFAUScEh41/lIMlUMJf0VrHeEQeggzJSqMrCt12pyyqAuDutDBkXHdu4dOh48+4U1nt0Ga7CSOTy7ux4ylZNQGAQmVJcFhkb0owVenxsqeMppiPRPZxipiMlLh1Ffq3FTNxrKGWAFAkOQkeHNmZMxpdWaYGkZxBBxa3Ojlxq1Y6/q6xHcOLZ2sHh0U0JZQMAydvAvCed2OFmRi7TChZCqpbUjIti2etWD43LY4A90k8fPhww5W8gG6Ek9clykIpp5p8j1UkYaQ6rOaMfVXH787G4tm4tNTpxWXxCgAUF7jn6NE+hlvGToSwngAVz4Q0V9O4IjJHR7CeU6w35gVsLcrAqaZMjvD2OgCUVK5v2Ni6EtV14Jx3YCDP6hhrDUrddfdMPF96GITvIZxsL9DrtouU644YXGt1vR4ApRiU9B0Y1ZDp8RgHHgLIQ4SjEQevwQhqcI4ahMFXPPAFxmzZpSk1g8HMKfIIwXXKcZ2AXOecnwPFOQKclaA/uiZplnhTofzoFK31cAXy/C9/dhxeaBFNkgAAAABJRU5ErkJggg==";

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/
        $scope.$on('organizationChanged', function () {
            $timeout.cancel($scope.npsTimeout);
            resetNPS();
            getGiftsData();
            getNPSData();
        });

        $scope.$on('Biin: Days Range Changed', function (scope, numberdays) {
            $timeout.cancel($scope.npsTimeout);
            resetNPS();
            getNPSData();
        });

        $scope.$on('Biin: Site Changed', function (scope, site) {
            $timeout.cancel($scope.npsTimeout);
            resetNPS();
            getGiftsData();
            getNPSData();
        });

        $scope.$on('$locationChangeStart', function(){
            $timeout.cancel($scope.npsTimeout);
        });

        //Current Date
        $scope.currentDate = new Date();
        //Tabs in the UI (nps comments)
        $scope.tabs = [{id:1, name:'Encuestados', active:true, status:undefined},
                       {id:2, name:'Enviados', active:false, status:'SENT'},
                       {id:3, name:'Reclamados', active:false, status:'CLAIMED'},
                       {id:5, name:'Entregados', active:false, status:'DELIVERED'}];
        //Status as filter
        $scope.status = undefined;
        $scope.indexBGColor = "";
        $scope.lineOptions = {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true,
                    radius: 4
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1
                }
            },
            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: function (label, x, y) {
                    return getDateString(new Date(x)) + ' : ' + y;
                }
            },
            xaxis: {
                tickColor: '#eee',
                mode: 'time',
                timeformat: '%d-%b',
                monthNames: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
            },
            yaxis: {
                position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                tickColor: '#eee'
            },
            shadowSize: 0
        };
        $scope.isLoading = true;

        activate();


        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.globalFilters = GlobalFilters;

            getGiftsData();
            getNPSData();
            resetNPS();
        }

        Date.prototype.addDays = function (days) {
            var dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        };

        function isSameDateAs(pDate1, pDate2) {
            return (
                pDate1.getFullYear() === pDate2.getFullYear() &&
                pDate1.getMonth() === pDate2.getMonth() &&
                pDate1.getDate() === pDate2.getDate()
            );
        }

        function getDates(startDate, stopDate) {
            var dateArray = new Array();
            var currentDate = startDate;
            while (currentDate <= stopDate) {
                dateArray.push(currentDate);
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }

        function getNPSData() {
            $scope.isLoading = true;
            getRatingsData();
        }

        function getRatingsData() {
            var filters = {};
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;

            //Get nps ratings
            if($scope.globalFilters.selectedSite){
                filters.siteId = $scope.globalFilters.selectedSite.identifier;

                $http.get(ApplicationConfiguration.applicationBackendURL + 'ratings/nps', {
                    headers: {
                        organizationid: $scope.organizationService.selectedOrganization.identifier,
                        filters : JSON.stringify(filters),
                        offset : new Date().getTimezoneOffset()
                    }
                }).success(function (data) {
                    $scope.isLoading = false;
                    if (data.result == "1") {
                        $scope.isGiftActive = data.data.gift;
                        updateNPSValues(data.data.ratings);
                    }
                });

                // Refresh data every s
                refreshingData();
            } else {
                $scope.isLoading = false;
            }
        }

        function getGiftsData() {
            var organizationId = $scope.organizationService.selectedOrganization.identifier;
            var siteId = $scope.globalFilters.selectedSite.identifier;

            if (organizationId) {
                //Get gifts fir automatic tasks
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + organizationId + '/sites/' + siteId + '/getavailablegifts/nps/true')
                    .success(function (data) {
                        $scope.npsGiftsAutomatic = data;
                    });
                //Get gifts for manual tasks
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + organizationId + '/sites/' + siteId + '/getavailablegifts/nps/false')
                    .success(function (data) {
                        console.log(data);
                        $scope.npsGiftsManual = data;
                    });
                //Get products to update gifts images
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + organizationId + '/readyElements/')
                    .success(function (data) {
                        $scope.products = data.data.elements;
                    });

            }
        }

        function updateNPSValues(data) {

            resetNPS();

            if (Array.isArray(data) && data.length > 0) {

                var dateArray = getDates((new Date()).addDays(-($scope.globalFilters.dateRange-1)), new Date());
                var totalCases = 0;
                for (var i = 0; i < dateArray.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (isSameDateAs(new Date(data[j].date), dateArray[i])) {
                            if (data[j].rating < 7) {
                                $scope.detractorsQuantity++;
                            } else if (data[j].rating < 9) {
                                $scope.passiveQuantity++;
                            } else {
                                $scope.promotersQuantity++;
                            }
                            totalCases++;
                        }
                    }
                }
                if (totalCases > 0) {
                    $scope.promotersPercentage = ($scope.promotersQuantity / totalCases) * 100;
                    $scope.passivePercentage = ($scope.passiveQuantity / totalCases) * 100;
                    $scope.detractorsPercentage = ($scope.detractorsQuantity / totalCases) * 100;
                    $scope.npsScore = $scope.promotersPercentage - $scope.detractorsPercentage;
                    $scope.totalCases = totalCases;

                    if($scope.npsScore < 70){
                        $scope.indexBGColor = "bg-danger";
                    }else if($scope.npsScore <90){
                        $scope.indexBGColor = "bg-warning";
                    }else{
                        $scope.indexBGColor = "bg-success";
                    }
                }

                generateLastComments(data);
            }
            generateChartData(data);

        }

        function generateLastComments(data){
            $scope.lastComments = [];
            if (Array.isArray(data)) {
                for(var i = 0; i < data.length; i++){
                    var newComment = {};
                    newComment.gift = data[i].gift? data[i].gift : 0;
                    newComment.userIdentifier = data[i].userIdentifier;
                    newComment.identifier = data[i].identifier;
                    newComment.date = generateElapsedTimeString(data[i].date);
                    newComment.user = data[i].user? data[i].user.name : "Usuario Eliminado de Biin";
                    newComment.comment = data[i].comment == "Optional" || data[i].comment.trim() == ""  ? "No hay comentario" : data[i].comment;
                    newComment.rating = data[i].rating;
                    var imageURL = "";


                    if( data[i].user && data[i].user.facebookAvatarUrl && data[i].user.facebookAvatarUrl != ""){
                        imageURL = data[i].user.facebookAvatarUrl;
                    } else if(data[i].user &&  data[i].user.url && data[i].user.url != "" ){
                        imageURL = data[i].user.url;
                    } else {
                        imageURL = NO_IMAGE_PROFILE;
                    }
                    newComment.image = imageURL;
                    $scope.lastComments.push(newComment);
                }
                $scope.lastComments.reverse();
                $scope.lastComments = $scope.lastComments.splice(0,20);
            }
        }

        function generateElapsedTimeString( stringDate ){
            var startDate = new Date(stringDate);
            var currentDate = Date.now();

            var diffDate = currentDate-startDate.getTime();

            diffDate = diffDate/1000;

            if(diffDate < 60){
                return parseInt(diffDate) + "sec";
            } else if(diffDate/60 < 60 ) {
                return parseInt(diffDate/60) + "min";
            } else if(diffDate/60/60 < 60 ) {
                return parseInt(diffDate/60/60) + "h";
            } else {
                return parseInt(diffDate/60/60/24) + "d";
            }
        }

        $scope.getGiftImage = function (productIdentifier){
            for(var i in $scope.products){
                if(productIdentifier == $scope.products[i].elementIdentifier){
                    return $scope.products[i].media[0].url;
                }
            }
        }

        //Display de gift when the modal is open, depending if is automatic or manual
        $scope.displayGifts = function (type, commentData) {
            //ClearTimeOut to stop receiving data
            clearTimeout($scope.npsTimeout.$$timeoutId);
            if (type=='manual') {
                $scope.currentComment = commentData;
                $scope.npsCommentIdentifier = commentData.identifier;
                $scope.userCommentIdentifier = commentData.userIdentifier;
            }
            $scope.giftDisplay = type;
            $scope.selectedGift = null;
        }
        //Set the value of the current selected gift in the modal
        $scope.setSelectedGift = function (giftIdentifier) {
            $scope.selectedGift = giftIdentifier;
        }
        //Assign a gift to an user
        $scope.assignGift = function () {
            if ($scope.giftDisplay=='manual') {
                $http.post(ApplicationConfiguration.applicationBackendURL + 'api/gift/assign/nps', {
                    npsCommentIdentifier: $scope.npsCommentIdentifier,
                    biinieIdentifier: $scope.userCommentIdentifier,
                    giftIdentifier: $scope.selectedGift
                })
                .success(function (data) {
                    toaster.pop('success', '', 'Su regalo fue enviado con éxito');
                })
                .error(function (data) {
                toaster.pop('warning', 'Acción no se puede llevar a cabo', 'Este usuario ya tiene asignado ese regalo, puede intentar con uno diferente');
                });
            } else if ($scope.giftDisplay=='automatic'){
                $http.post(ApplicationConfiguration.applicationBackendURL + 'api/gift/assign/auto/nps', {
                    siteIdentifier: $scope.globalFilters.selectedSite.identifier,
                    giftIdentifier: $scope.selectedGift
                })
                .success(function (data) {
                    toaster.pop('success', '', 'Su regalo automático fue activado con éxito');
                })
                .error(function (data) {
                    toaster.pop('warning', 'Acción no se puede llevar a cabo', 'Este usuario mantiene un regalo pendiente');
                });
            }
            refreshingData();
        }
        //Deliver a gift to an user
        $scope.deliverGift = function (commentData) {
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/gift/deliver/nps', {
                npsCommentIdentifier: commentData.identifier,
                biinieIdentifier: commentData.userIdentifier
            })
            .success(function (data) {
                toaster.pop('success', '', 'El regalo ha sido entregado exitósamente');
            });
        }
        //Desactivate an active automatic gift
        $scope.desactivateGift = function () {
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/gift/cancel/auto/nps', {
                relationIdentifier: $scope.isGiftActive.identifier
            })
            .success(function (data) {
                toaster.pop('success', '', 'El regalo automático ha sido desactivado');
                refreshingData();
            });
        }

        //Change tab status
        $scope.changeStatus = function (status) {
            $scope.status = status;
        }
        //Function to execute refreshing data from the view
        $scope.refresh = function () {
            refreshingData();
        }
        //Count comments depending of its state
        $scope.commentCount = function (tab) {
            var count = 0;
            for(var i in $scope.lastComments){
                if(tab == $scope.lastComments[i].gift.status){
                    count++;
                }
            }
            return count;
        }

        //Function to refresh data every second
        function refreshingData() {
            $scope.npsTimeout = $timeout(function(){
                getRatingsData();
            },1000)
        }

        function resetNPS() {
            $scope.promotersQuantity = 0;
            $scope.passiveQuantity = 0;
            $scope.detractorsQuantity = 0;
            $scope.npsScore = 0;
            $scope.promotersPercentage = 0;
            $scope.passivePercentage = 0;
            $scope.detractorsPercentage = 0;
            $scope.lastComments = [];
            $scope.totalCases = 0;
            $scope.indexBGColor = "bg-danger";
        }

        function getDateString(date) {
            var dd = date.getDate();
            var mm = date.getMonth() + 1; //January is 0!
            var yyyy = date.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            var stringDate = yyyy + '-' + mm + '-' + dd;
            return stringDate;
        }

        function generateChartData(data) {

            var dateArray = getDates((new Date()).addDays(-($scope.globalFilters.dateRange-1)), new Date());
            var npsDataForChart = [];
            for (var i = 0; i < dateArray.length; i++) {
                var npsObject = {};
                npsObject.date = dateArray[i];
                npsObject.nps = 0;
                var tempnpspromoter = 0;
                var tempnpspasive = 0;
                var tempnpsdetractor = 0;
                for (var j = 0; j < data.length; j++) {
                    if (isSameDateAs(new Date(data[j].date), dateArray[i])) {
                        if (data[j].rating < 7) {
                            tempnpsdetractor++;
                        } else if (data[j].rating < 9) {
                            tempnpspasive++;
                        } else {
                            tempnpspromoter++;
                        }
                    }
                }
                var totalnps = tempnpsdetractor + tempnpspasive + tempnpspromoter;
                if (totalnps > 0) {
                    var nps = (tempnpspromoter / totalnps * 100) - (tempnpsdetractor / totalnps * 100);
                    npsObject.nps = nps;
                }
                npsDataForChart.push(npsObject);
            }
            var graphData = [];
            for (i = 0; i < npsDataForChart.length; i++) {
                graphData.push([npsDataForChart[i].date, npsDataForChart[i].nps]);
            }
            $scope.lineData = [
                {
                    "label": "NPS",
                    "color": "#FE5621",
                    "data": graphData
                }
            ];
        }
    }
})();

/**
 * Created by Ivan on 10/26/15.
 */
/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('sitesPieVisitsController', sitesPieVisitsController);

    sitesPieVisitsController.$inject = ['$http', '$state','$scope','$rootScope', 'Authentication', 'Organization','GlobalFilters'];
    function sitesPieVisitsController($http, $state, $scope, $rootScope, Authentication, Organization,GlobalFilters) {

        var vm = this;
        $scope.value = 0;
        $scope.enoughData = false;

        $scope.news = 0;
        $scope.returning = 0;
        $scope.total = 0;

        activate();

        ////////////////
        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.globalFilters = GlobalFilters;
        }

        $scope.$on('organizationChanged',function(){
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.reset();
            $scope.changeChartRange($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Site Changed', function(){
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.reset = function () {
            $scope.news = 0;
            $scope.returning = 0;
            $scope.total = 0;
        };

        $scope.getChartData = function ( days )
        {
            var filters = {};
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;
            filters.siteId = $scope.globalFilters.selectedSite.identifier;

            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/local/newsvsreturning',{ headers:{
                filters : JSON.stringify(filters),
                offset : new Date().getTimezoneOffset() } } ).success(function(data) {
                var information  = data.data;

                $scope.news = information.news || 0;
                $scope.returning = information.returning || 0;
                $scope.total = information.totalSessions || 0;

                $rootScope.$broadcast('Biin: Finished Presential Children To Load', 'visitsTable');
            });
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData(days);
        };

        $scope.changeChartRange($scope.globalFilters.dateRange);
    }
})();

/**
 * Created by Ivan on 10/26/15.
 */
/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('VisitsGraphController', VisitsGraphController);

    VisitsGraphController.$inject = ['$http', '$state','$scope','$rootScope', 'Authentication', 'Organization','GlobalFilters'];
    function VisitsGraphController($http, $state, $scope,$rootScope, Authentication, Organization,GlobalFilters) {
        var vm = this;
        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.globalFilters = GlobalFilters;
        }

        $scope.$on('organizationChanged',function(){
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.reset();
            $scope.changeChartRange($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Site Changed',function(scope,site){
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });


        $scope.reset = function(){
            $scope.areaData = [{
                "label": "Visitas",
                "color": "#FE5621",
                "data": []
            }, {
                "label": "Notificaciones",
                "color": "#7dc7df",
                "data": []
            }];
        };

        function getDateString(date) {
            var dd = date.getDate();
            var mm = date.getMonth() + 1; //January is 0!
            var yyyy = date.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            var stringDate = yyyy + '-' + mm + '-' + dd;
            return stringDate;
        }

        $scope.getChartData = function ( days )
        {
            var today = new Date();
            var previusDate = new Date();
            previusDate.setTime(today.getTime() - days * 86400000);

            var filters = {};
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;
            filters.siteId = $scope.globalFilters.selectedSite.identifier;

            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/notifications', {
                headers: {
                    filters : JSON.stringify(filters),
                    offset : new Date().getTimezoneOffset()
                }
            }).success(function(dataNotifications) {

                $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/visits', {
                    headers: {
                        filters : JSON.stringify(filters),
                        offset : new Date().getTimezoneOffset()
                    }
                }).success(function(data) {
                    var visits = [];
                    var notifications =[];
                    var keys = Object.keys(data);

                    var maxValue = 1;
                    for (var i = 0; i < keys.length; i++) {
                        var s = new Date(keys[i]);
                        visits.push([s.getTime(), data[keys[i]]]);
                        notifications.push([s.getTime(), dataNotifications[keys[i]]]);
                    }
                    visits = visits.reverse();
                    notifications = notifications.reverse();

                    $scope.areaData = [{
                        "label": "Visitas",
                        "color": "#FE5621",
                        "data": visits
                    }, {
                        "label": "Notificaciones",
                        "color": "#7dc7df",
                        "data": notifications
                    }];

                    $rootScope.$broadcast('Biin: Finished Presential Children To Load', 'visitsGraph');
                });

            });
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData($scope.globalFilters.dateRange);
        };
        $scope.changeChartRange($scope.globalFilters.dateRange);

        $scope.areaOptions = {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true,
                    radius: 4
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.5
                }
            },
            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: function (label, x, y) { return getDateString(new Date(x)) + ' : ' + y; }
            },
            xaxis: {
                tickColor: '#fcfcfc',
                mode: 'time',
                timeformat: '%d-%b',
                monthNames: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
            },
            yaxis: {
                min: 0,
                tickColor: '#eee',
                position: ($scope.app.layout.isRTL ? 'right' : 'left')
                //tickFormatter: function (v) {
                  //  return v + ' visitors';
               // }
            },
            shadowSize: 0
        };

    }
})();

'use strict';

angular.module('dashboard').service('GlobalFilters', ['$http','$rootScope',

	function($http, $rootScope) {


        var service = {
            selectedSite : 'undefined',
            dateRange : 0,

            changeDateRange : function ( numberDays ){
                this.dateRange = numberDays;
                $rootScope.$broadcast('Biin: Days Range Changed', numberDays);
            },

            changeSelectedSite : function ( newSite ) {
                this.selectedSite = newSite;
                $rootScope.$broadcast('Biin: Site Changed', newSite);
            },
            setDefaultSite: function( site ) {
                this.selectedSite = site;
            }
        };

        return service;
	}
]);

/**
 * Created by Ivan on 8/27/15.
 */
'use strict';

// Setting up route
angular.module('elements').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
        state('app.elements', {
            url: '/elements',
            templateUrl: 'modules/elements/views/elements.client.view.html',
            resolve:{
                permissions: function(Permission) {
                    return Permission.getPermissions();
                },
                selectedOrganization: function (Organization) {
                    return Organization.getSelectedOrganization();
                },
                organization: function (Organization) {
                    return Organization.getOrganizations();
                }
            }
        });
    }
]);

/**=========================================================
 * Module: elements.controller.js
 * Controller of elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('elements')
        .controller('ElementsController', ElementsController);

    ElementsController.$inject = ['$http', '$state','$timeout','$scope','$translate', 'Authentication', 'Organization', 'Categories', 'ObjectsSidebar','Gallery','Loading','textAngularManager'];

    function ElementsController($http, $state, $timeout, $scope,$translate, Authentication, Organization,Categories, ObjectsSidebar,Gallery,Loading,textAngularManager) {
        activate();

        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.sidebarTemplate =
            "<div class='col-sm-3 thumbListImage'>" +
                "<img ng-if='item.media.length == 0' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
                "<img ng-if='item.media.length>0' ng-src='{{item.media[0].url}}' pending-indicator='pending-indicator'/>"+
            "</div>"+
            "<div class='col-sm-9 leftInformationArea'>"+
                "<label class='oneRowTitle'>{{item.title}}</label>"+
            "</div>";


        $scope.objectsSidebarService.template =$scope.sidebarTemplate;
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;
        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }
        //Constants
        $scope.maxMedia=0;

        //Draggable Properties

        $scope.dragGalleryIndex=-1;
        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
        $scope.newTagField=[];

        //Loading images service properties
        $scope.loadingImages =false;

        //Boolean values
        $scope.hasListPriceBool=false;
        $scope.hasDiscountBool=false;
        $scope.hasTimmingBool =false;
        $scope.hasQuantityBool=false;
        $scope.hasSavingBool=false;
        $scope.hasPriceBool=false;
        $scope.hasFromPriceBool=false;
        $scope.isHighlightBool=false;
        $scope.galleries = [];



        $scope.$on("Biin: galleryUpdate", function(a, modalInfo){
            $scope.galleries=modalInfo.galleries;
        });

        $scope.$on('$stateChangeStart', function(){
                $scope.objectsSidebarService.reset();
                $scope.objectsSidebarService.loadedInformation = true;
            });

        $scope.$on('organizationChanged',function(){
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            $scope.loadingService.isLoading = true;
            //Get the List of Objects
            $scope.objectsSidebarService.selectedObject = null;
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/elements').success(function(data){
                $scope.elements = data.data.elements;
                $scope.objectsSidebarService.setObjects($scope.elements);
                $scope.loadingService.isLoading = false;
            });

            $scope.galleries = [];
            Gallery.getList($scope.organizationId).then(function(promise){
                $scope.galleries = promise.data.data;
            });
        });

        $scope.$on("Biin: On Object Clicked", function(f,objectClicked){

            //I know it's ugly and I don't like this approach, it should be other way to  validate if the tag field is
            // rendered to call this code
            //TODO: Change this implementation for another safer way!!!
            $timeout(function(){
                var elemSearchTag =$('#elemSearchTag');
                elemSearchTag.tagsinput("removeAll");
                for(var i=0;i< $scope.objectsSidebarService.selectedObject.searchTags.length;i++){
                    elemSearchTag.tagsinput("add",$scope.objectsSidebarService.selectedObject.searchTags[i]);
                }
            },100);


            var textangulareditor = textAngularManager.retrieveEditor('detailselementeditor');
            if(textangulareditor) {
                textangulareditor.scope.$undoManagertaHtmlElement1._stack = [];
                textangulareditor.scope.$undoManagertaHtmlElement1._index = 0;
                textangulareditor.scope.$undoManagertaTextElement1._stack = [];
                textangulareditor.scope.$undoManagertaTextElement1._index = 0;
            }
            var a = 1;
        });

        $scope.$on("Biin: On Object Created", function(){
            $scope.create();
        });

        //Get the List of Objects
        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/elements').success(function(data){
            $scope.elements = data.data.elements;
            $scope.objectsSidebarService.setObjects($scope.elements);
            $scope.loadingService.isLoading = false;
        });

        //Push a new showcase in the list
        $scope.create = function(){
            var titleText = $translate.instant("ELEMENT.CREATING");
            swal({   title: titleText,  type: "info",   showConfirmButton: false });
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+"/elements").success(function(element,status){
                if(status==201){
                    var elemSearchTag =$('#elemSearchTag');
                    elemSearchTag.tagsinput("removeAll");
                    $scope.elements.push(element);
                    $scope.objectsSidebarService.setObjects($scope.elements);
                    $scope.objectsSidebarService.setSelectedObject(element);
                    setTimeout(function(){
                        swal.close();
                    },2000);
                }
            });
        };

        //Select Element Type function
        $scope.selectType=function(index){
            if($scope.objectsSidebarService.selectedObject.elementType!==''+index)
                $scope.objectsSidebarService.selectedObject.elementType=""+index;
            else
                $scope.objectsSidebarService.selectedObject.elementType="";

            $scope.validate(true);
        };

        $scope.deleteElement = function(message, selectedObject) {
            var translatedTexts  = $translate.instant(["GENERIC.DELETE_ELEMENT_TITLE","GENERIC.DELETE_ELEMENT_CONFIRMATION","ELEMENT.DELETED","GENERIC.DELETE","GENERIC.CANCEL"]);

            swal({
                title: translatedTexts["GENERIC.DELETE_ELEMENT_TITLE"],
                text: translatedTexts["GENERIC.DELETE_ELEMENT_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#DD6B55",
                confirmButtonText: translatedTexts["GENERIC.DELETE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                $scope.removeElementAt($scope.objectsSidebarService.objects.indexOf(selectedObject));
            });
        };

        //Remove element at specific position
        $scope.removeElementAt = function(index){
            var translatedTexts  = $translate.instant(["ELEMENT.DELETED_TEXT","GENERIC.DELETED"]);
            var elementId = $scope.objectsSidebarService.objects[index].elementIdentifier;
            $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationId+'/elements/'+elementId).success(function(data){
                    if($scope.objectsSidebarService.selectedObject==$scope.objectsSidebarService.objects[index]){
                        $scope.objectsSidebarService.selectedObject = null;
                    }
                    $scope.objectsSidebarService.objects.splice(index,1);
                    swal(translatedTexts["GENERIC.DELETED"], translatedTexts["ELEMENT.DELETED_TEXT"], "success");
                }
            );
        };
        
        //Check min data has been filled
        $scope.hasMissingData = function() {

            // Don't do anything if there is no selected element
            if ($scope.objectsSidebarService.selectedObject == null)
                return;

            var missingMinData = false;

            //Check if required data is ready for app
            if ($scope.objectsSidebarService.selectedObject.title == null) {
                missingMinData = true;
                $scope.objectsSidebarService.selectedObject.title = "";
            }

            else if ($scope.objectsSidebarService.selectedObject.title.trim() === ''){
                missingMinData = true;
                $scope.objectsSidebarService.selectedObject.title = "";
            }

            if ($scope.objectsSidebarService.selectedObject.media.length === 0){
                missingMinData = true;
            }

            if ($scope.objectsSidebarService.selectedObject.categories.length === 0) {
                missingMinData = true;
            }

            if ($scope.objectsSidebarService.selectedObject.media == null) {
                missingMinData = true;
            }

            else if ($scope.objectsSidebarService.selectedObject.media.length === 0) {
                missingMinData = true;
            }

            return missingMinData;

        };

        //Save detail model object
        $scope.save= function(){

            // Don't do anything if there is no selected element
            if ($scope.objectsSidebarService.selectedObject == null)
                return;

            if ($scope.hasMissingData()) {
                $scope.objectsSidebarService.selectedObject.isReady = 0;
            }

            else {
                $scope.objectsSidebarService.selectedObject.isReady = 1;
            }

            if ($scope.objectsSidebarService.selectedObject.callToActionTitle && $scope.objectsSidebarService.selectedObject.callToActionURL) {
                $scope.objectsSidebarService.selectedObject.hasCallToAction = true;
                var httpRegex = /^http[s]?:\/\//;
                if(!httpRegex.test($scope.objectsSidebarService.selectedObject.callToActionURL)){
                    $scope.objectsSidebarService.selectedObject.callToActionURL = "http://" + $scope.objectsSidebarService.selectedObject.callToActionURL;
                }

            }
            else {
                $scope.objectsSidebarService.selectedObject.hasCallToAction = false;
            }

            $scope.objectsSidebarService.selectedObject.isDeleted = 0;


            $scope.objectsSidebarService.selectedObject.hasPrice = $scope.objectsSidebarService.selectedObject.price > 0?'1':'0';

            var tags = $("#elemSearchTag").tagsinput('items');
            $scope.objectsSidebarService.selectedObject.searchTags = [];
            for(var i = 0; i < tags.length; i++){
                $scope.objectsSidebarService.selectedObject.searchTags.push(tags[i]);
            }

            $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationId+'/elements/'+$scope.objectsSidebarService.selectedObject.elementIdentifier,{model:$scope.objectsSidebarService.selectedObject}).success(function(data,status){
                if("replaceModel" in data){
                    $scope.objectsSidebarService.selectedObject = data.replaceModel;
                    $scope.elementPrototype =  $.extend(true, {}, $scope.elementPrototypeBkp);
                }
                if(data.state=="success")
                    $scope.succesSaveShow=true;
            });
        };



        //Get the List of Categories
        Categories.getList().then(function(promise){
            $scope.categories = promise.data.data;
        });

        //Return the categories of the selected element
        $scope.ownCategories=function(){
            var categories=[];
            //if($scope.objectsSidebarService.selectedObject && $scope.objectsSidebarService.selectedObject.categories)
              //  categories = $scope.objectsSidebarService.selectedObject.categories;
            return categories;
        };



        //Set the gallery index when start draggin
        $scope.setDragGallery=function(scopeIndex){
            $scope.dragGalleryIndex= scopeIndex;
        };



        //Select an sticker
        $scope.selectSticker=function(index){
            if($scope.objectsSidebarService.selectedObject.sticker.identifier !==$scope.stickers[index].identifier){
                $scope.objectsSidebarService.selectedObject.sticker.identifier= $scope.stickers[index].identifier;
                $scope.objectsSidebarService.selectedObject.sticker.color= $scope.stickers[index].color;
            }else{
                $scope.objectsSidebarService.selectedObject.sticker.identifier="";
                $scope.objectsSidebarService.selectedObject.sticker.color="";
            }
        };

        //Gallery Media Images

        //Insert a gallery item to site
        $scope.insertGalleryItem = function(index){
            if(($scope.objectsSidebarService.selectedObject.media.length < $scope.maxMedia &&  index < $scope.galleries.length && $scope.galleries[index])||$scope.maxMedia===0){
                var newObj = {};
                newObj.identifier = $scope.galleries[index].identifier;
                newObj.url = $scope.galleries[index].url;
                newObj.mainColor = $scope.galleries[index].mainColor;

                $scope.objectsSidebarService.selectedObject.media.push(newObj);

                $scope.wizard2IsValid= typeof($scope.objectsSidebarService.selectedObject.media)!='undefined'&& $scope.objectsSidebarService.selectedObject.media.length>0;
                //Apply the changes
                $scope.$digest();
                $scope.$apply();
            }


        };

        //Remove the media object at specific index
        $scope.removeMediaAt=function(index){
            if($scope.objectsSidebarService.selectedObject.media.length>=index) {
                $scope.objectsSidebarService.selectedObject.media.splice(index, 1);
            }
        };

        //Get the list of the gallery
        Gallery.getList($scope.organizationId).then(function(promise){
            $scope.galleries = promise.data.data;
        });

        //On gallery change method
        $scope.onGalleryChange= function(obj,autoInsert){
            //Do a callback logic by caller
            $scope.galleries = $scope.galleries.concat(obj);
            $scope.$digest();

            if(autoInsert)
            {
                //Insert the images to the preview
                var cantToInsert=$scope.maxMedia- $scope.objectsSidebarService.selectedObject.media.length;
                for(var i=0; i< cantToInsert; i++){
                    $scope.insertGalleryItem($scope.galleries.indexOf(obj[i]));
                }
            }
        };

        $scope.loadingImagesChange=function(state){
            $scope.loadingImages = state;
            $scope.$digest();
        };

        //Category return if contains a specific category
        $scope.containsCategory=function(category){
            if(typeof(_.findWhere($scope.objectsSidebarService.selectedObject.categories,{identifier:category.identifier}))!='undefined')
                return true;
            else
                return false;
        };

        //Change the state of the category relation with the Site
        $scope.updateSelectedCategories =function(category){
            var index =-1;
            var cat = _.findWhere($scope.objectsSidebarService.selectedObject.categories,{identifier:category.identifier});
            if(typeof(cat)!='undefined'){
                index=$scope.objectsSidebarService.selectedObject.categories.indexOf(cat);
            }

            if(index>=0)
                $scope.objectsSidebarService.selectedObject.categories.splice(index,1);
            else
                $scope.objectsSidebarService.selectedObject.categories.push(category);

            //$scope.validate();

            /**if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
                $scope.$digest();
            }**/
        };
        $scope.toggleIsHighlight = function(){
            $scope.objectsSidebarService.selectedObject.isHighlight = $scope.objectsSidebarService.selectedObject.isHighlight == "1"? "0":"1";
        };
    }
})();

/**=========================================================
 * Module: form-imgcrop.js
 * Image crop controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('ImageCropController', ImageCropController);

    ImageCropController.$inject = ['$scope'];
    function ImageCropController($scope) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.reset = function() {
            vm.myImage        = '';
            vm.myCroppedImage = '';
            vm.imgcropType    = 'square';
          };

          vm.reset();

          var handleFileSelect=function(evt) {
            var file=evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
              $scope.$apply(function(/*$scope*/){
                vm.myImage=evt.target.result;
              });
            };
            if(file)
              reader.readAsDataURL(file);
          };
          
          angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }
    }
})();

/**=========================================================
 * Module: FormValidationController
 * Input validation with UI Validate
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FormValidationController', FormValidationController);

    function FormValidationController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.notBlackListed = function(value) {
            var blacklist = ['some@mail.com','another@email.com'];
            return blacklist.indexOf(value) === -1;
          };

          vm.words = function(value) {
            return value && value.split(' ').length;
          };

          vm.submitted = false;
          vm.validateInput = function(name, type) {
            var input = vm.formValidate[name];
            return (input.$dirty || vm.submitted) && input.$error[type];
          };

          // Submit form
          vm.submitForm = function() {
            vm.submitted = true;
            if (vm.formValidate.$valid) {
              console.log('Submitted!!');
            } else {
              console.log('Not valid!!');
              return false;
            }
          };
        }
    }
})();

/**=========================================================
 * Module: form-xeditable.js
 * Form xEditable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FormxEditableController', FormxEditableController);

    FormxEditableController.$inject = ['$scope', 'editableOptions', 'editableThemes', '$filter', '$http'];
    function FormxEditableController($scope, editableOptions, editableThemes, $filter, $http) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {

          editableOptions.theme = 'bs3';

          editableThemes.bs3.inputClass = 'input-sm';
          editableThemes.bs3.buttonsClass = 'btn-sm';
          editableThemes.bs3.submitTpl = '<button type="submit" class="btn btn-success"><span class="fa fa-check"></span></button>';
          editableThemes.bs3.cancelTpl = '<button type="button" class="btn btn-default" ng-click="$form.$cancel()">'+
                                           '<span class="fa fa-times text-muted"></span>'+
                                         '</button>';

          vm.user = {
            email: 'email@example.com',
            tel: '123-45-67',
            number: 29,
            range: 10,
            url: 'http://example.com',
            search: 'blabla',
            color: '#6a4415',
            date: null,
            time: new Date(),
            datetime: null,
            month: null,
            week: null,
            desc: 'Sed pharetra euismod dolor, id feugiat ante volutpat eget. '
          };

          // Local select
          // ----------------------------------- 

          vm.user2 = {
            status: 2
          };

          vm.statuses = [
            {value: 1, text: 'status1'},
            {value: 2, text: 'status2'},
            {value: 3, text: 'status3'},
            {value: 4, text: 'status4'}
          ];

          vm.showStatus = function() {
            var selected = $filter('filter')(vm.statuses, {value: vm.user2.status});
            return (vm.user2.status && selected.length) ? selected[0].text : 'Not set';
          };

          // select remote
          // ----------------------------------- 

          vm.user3 = {
            id: 4,
            text: 'admin' // original value
          };

          vm.groups = [];

          vm.loadGroups = function() {
            return vm.groups.length ? null : $http.get('server/xeditable-groups.json').success(function(data) {
              vm.groups = data;
            });
          };

          $scope.$watch('user3.id', function(newVal, oldVal) {
            if (newVal !== oldVal) {
              var selected = $filter('filter')(vm.groups, {id: vm.user3.id});
              vm.user3.text = selected.length ? selected[0].text : null;
            }
          });

          // Typeahead
          // ----------------------------------- 

          vm.user4 = {
            state: 'Arizona'
          };

          vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        }
    }
})();


(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FormDemoCtrl', FormDemoCtrl);

    FormDemoCtrl.$inject = ['$resource'];
    function FormDemoCtrl($resource) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          // the following allow to request array $resource instead of object (default)
          var actions = {'get': {method: 'GET', isArray: true}};
          
          // Tags inputs
          // ----------------------------------- 
          var Cities = $resource('server/cities.json', {}, actions);

          Cities.get(function(data){

              vm.cities = data;

          });
          // for non ajax form just fill the scope variable
          // vm.cities = ['Amsterdam','Washington','Sydney','Beijing','Cairo'];

          // Slider demo values
          vm.slider1 = 5;
          vm.slider2 = 10;
          vm.slider3 = 15;
          vm.slider4 = 20;
          vm.slider5 = 25;
          vm.slider6 = 30;
          vm.slider7 = 10;
          vm.slider8 = [250,750];

          // Chosen data
          // ----------------------------------- 

          var States = $resource('server/chosen-states.json', {},  {'query':    {method:'GET', isArray:true} });

          vm.states = States.query();


          vm.alertSubmit = function(){
            alert('Form submitted!');
            return false;
          };

          // Angular wysiwyg 
          // ----------------------------------- 

          vm.wysiwygContent = '<p> Write something here.. </p>';

          // Text Angular (wysiwyg)
          // ----------------------------------- 
          
          vm.htmlContent = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><a href="https://github.com/fraywing/textAngular">Source</a> </p>';

        }
    }
})();

/**=========================================================
 * Module: uiselect.js
 * uiSelect controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('uiSelectController', uiSelectController);

    uiSelectController.$inject = ['$scope', '$http'];
    function uiSelectController($scope, $http) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.disabled = undefined;

          vm.enable = function() {
            vm.disabled = false;
          };

          vm.disable = function() {
            vm.disabled = true;
          };

          vm.clear = function() {
            vm.person.selected = undefined;
            vm.address.selected = undefined;
            vm.country.selected = undefined;
          };

          vm.person = {};
          vm.people = [
            { name: 'Adam',      email: 'adam@email.com',      age: 10 },
            { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
            { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
            { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
            { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
            { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
            { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
            { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
          ];

          vm.address = {};
          vm.refreshAddresses = function(address) {
            var params = {address: address, sensor: false};
            return $http.get(
              'http://maps.googleapis.com/maps/api/geocode/json',
              {params: params}
            ).then(function(response) {
              vm.addresses = response.data.results;
            });
          };

          vm.country = {};
          vm.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Åland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'Andorra', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Antigua and Barbuda', code: 'AG'},
            {name: 'Argentina', code: 'AR'},
            {name: 'Armenia', code: 'AM'},
            {name: 'Aruba', code: 'AW'},
            {name: 'Australia', code: 'AU'},
            {name: 'Austria', code: 'AT'},
            {name: 'Azerbaijan', code: 'AZ'},
            {name: 'Bahamas', code: 'BS'},
            {name: 'Bahrain', code: 'BH'},
            {name: 'Bangladesh', code: 'BD'},
            {name: 'Barbados', code: 'BB'},
            {name: 'Belarus', code: 'BY'},
            {name: 'Belgium', code: 'BE'},
            {name: 'Belize', code: 'BZ'},
            {name: 'Benin', code: 'BJ'},
            {name: 'Bermuda', code: 'BM'},
            {name: 'Bhutan', code: 'BT'},
            {name: 'Bolivia', code: 'BO'},
            {name: 'Bosnia and Herzegovina', code: 'BA'},
            {name: 'Botswana', code: 'BW'},
            {name: 'Bouvet Island', code: 'BV'},
            {name: 'Brazil', code: 'BR'},
            {name: 'British Indian Ocean Territory', code: 'IO'},
            {name: 'Brunei Darussalam', code: 'BN'},
            {name: 'Bulgaria', code: 'BG'},
            {name: 'Burkina Faso', code: 'BF'},
            {name: 'Burundi', code: 'BI'},
            {name: 'Cambodia', code: 'KH'},
            {name: 'Cameroon', code: 'CM'},
            {name: 'Canada', code: 'CA'},
            {name: 'Cape Verde', code: 'CV'},
            {name: 'Cayman Islands', code: 'KY'},
            {name: 'Central African Republic', code: 'CF'},
            {name: 'Chad', code: 'TD'},
            {name: 'Chile', code: 'CL'},
            {name: 'China', code: 'CN'},
            {name: 'Christmas Island', code: 'CX'},
            {name: 'Cocos (Keeling) Islands', code: 'CC'},
            {name: 'Colombia', code: 'CO'},
            {name: 'Comoros', code: 'KM'},
            {name: 'Congo', code: 'CG'},
            {name: 'Congo, The Democratic Republic of the', code: 'CD'},
            {name: 'Cook Islands', code: 'CK'},
            {name: 'Costa Rica', code: 'CR'},
            {name: 'Cote D\'Ivoire', code: 'CI'},
            {name: 'Croatia', code: 'HR'},
            {name: 'Cuba', code: 'CU'},
            {name: 'Cyprus', code: 'CY'},
            {name: 'Czech Republic', code: 'CZ'},
            {name: 'Denmark', code: 'DK'},
            {name: 'Djibouti', code: 'DJ'},
            {name: 'Dominica', code: 'DM'},
            {name: 'Dominican Republic', code: 'DO'},
            {name: 'Ecuador', code: 'EC'},
            {name: 'Egypt', code: 'EG'},
            {name: 'El Salvador', code: 'SV'},
            {name: 'Equatorial Guinea', code: 'GQ'},
            {name: 'Eritrea', code: 'ER'},
            {name: 'Estonia', code: 'EE'},
            {name: 'Ethiopia', code: 'ET'},
            {name: 'Falkland Islands (Malvinas)', code: 'FK'},
            {name: 'Faroe Islands', code: 'FO'},
            {name: 'Fiji', code: 'FJ'},
            {name: 'Finland', code: 'FI'},
            {name: 'France', code: 'FR'},
            {name: 'French Guiana', code: 'GF'},
            {name: 'French Polynesia', code: 'PF'},
            {name: 'French Southern Territories', code: 'TF'},
            {name: 'Gabon', code: 'GA'},
            {name: 'Gambia', code: 'GM'},
            {name: 'Georgia', code: 'GE'},
            {name: 'Germany', code: 'DE'},
            {name: 'Ghana', code: 'GH'},
            {name: 'Gibraltar', code: 'GI'},
            {name: 'Greece', code: 'GR'},
            {name: 'Greenland', code: 'GL'},
            {name: 'Grenada', code: 'GD'},
            {name: 'Guadeloupe', code: 'GP'},
            {name: 'Guam', code: 'GU'},
            {name: 'Guatemala', code: 'GT'},
            {name: 'Guernsey', code: 'GG'},
            {name: 'Guinea', code: 'GN'},
            {name: 'Guinea-Bissau', code: 'GW'},
            {name: 'Guyana', code: 'GY'},
            {name: 'Haiti', code: 'HT'},
            {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
            {name: 'Holy See (Vatican City State)', code: 'VA'},
            {name: 'Honduras', code: 'HN'},
            {name: 'Hong Kong', code: 'HK'},
            {name: 'Hungary', code: 'HU'},
            {name: 'Iceland', code: 'IS'},
            {name: 'India', code: 'IN'},
            {name: 'Indonesia', code: 'ID'},
            {name: 'Iran, Islamic Republic Of', code: 'IR'},
            {name: 'Iraq', code: 'IQ'},
            {name: 'Ireland', code: 'IE'},
            {name: 'Isle of Man', code: 'IM'},
            {name: 'Israel', code: 'IL'},
            {name: 'Italy', code: 'IT'},
            {name: 'Jamaica', code: 'JM'},
            {name: 'Japan', code: 'JP'},
            {name: 'Jersey', code: 'JE'},
            {name: 'Jordan', code: 'JO'},
            {name: 'Kazakhstan', code: 'KZ'},
            {name: 'Kenya', code: 'KE'},
            {name: 'Kiribati', code: 'KI'},
            {name: 'Korea, Democratic People\'s Republic of', code: 'KP'},
            {name: 'Korea, Republic of', code: 'KR'},
            {name: 'Kuwait', code: 'KW'},
            {name: 'Kyrgyzstan', code: 'KG'},
            {name: 'Lao People\'s Democratic Republic', code: 'LA'},
            {name: 'Latvia', code: 'LV'},
            {name: 'Lebanon', code: 'LB'},
            {name: 'Lesotho', code: 'LS'},
            {name: 'Liberia', code: 'LR'},
            {name: 'Libyan Arab Jamahiriya', code: 'LY'},
            {name: 'Liechtenstein', code: 'LI'},
            {name: 'Lithuania', code: 'LT'},
            {name: 'Luxembourg', code: 'LU'},
            {name: 'Macao', code: 'MO'},
            {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
            {name: 'Madagascar', code: 'MG'},
            {name: 'Malawi', code: 'MW'},
            {name: 'Malaysia', code: 'MY'},
            {name: 'Maldives', code: 'MV'},
            {name: 'Mali', code: 'ML'},
            {name: 'Malta', code: 'MT'},
            {name: 'Marshall Islands', code: 'MH'},
            {name: 'Martinique', code: 'MQ'},
            {name: 'Mauritania', code: 'MR'},
            {name: 'Mauritius', code: 'MU'},
            {name: 'Mayotte', code: 'YT'},
            {name: 'Mexico', code: 'MX'},
            {name: 'Micronesia, Federated States of', code: 'FM'},
            {name: 'Moldova, Republic of', code: 'MD'},
            {name: 'Monaco', code: 'MC'},
            {name: 'Mongolia', code: 'MN'},
            {name: 'Montserrat', code: 'MS'},
            {name: 'Morocco', code: 'MA'},
            {name: 'Mozambique', code: 'MZ'},
            {name: 'Myanmar', code: 'MM'},
            {name: 'Namibia', code: 'NA'},
            {name: 'Nauru', code: 'NR'},
            {name: 'Nepal', code: 'NP'},
            {name: 'Netherlands', code: 'NL'},
            {name: 'Netherlands Antilles', code: 'AN'},
            {name: 'New Caledonia', code: 'NC'},
            {name: 'New Zealand', code: 'NZ'},
            {name: 'Nicaragua', code: 'NI'},
            {name: 'Niger', code: 'NE'},
            {name: 'Nigeria', code: 'NG'},
            {name: 'Niue', code: 'NU'},
            {name: 'Norfolk Island', code: 'NF'},
            {name: 'Northern Mariana Islands', code: 'MP'},
            {name: 'Norway', code: 'NO'},
            {name: 'Oman', code: 'OM'},
            {name: 'Pakistan', code: 'PK'},
            {name: 'Palau', code: 'PW'},
            {name: 'Palestinian Territory, Occupied', code: 'PS'},
            {name: 'Panama', code: 'PA'},
            {name: 'Papua New Guinea', code: 'PG'},
            {name: 'Paraguay', code: 'PY'},
            {name: 'Peru', code: 'PE'},
            {name: 'Philippines', code: 'PH'},
            {name: 'Pitcairn', code: 'PN'},
            {name: 'Poland', code: 'PL'},
            {name: 'Portugal', code: 'PT'},
            {name: 'Puerto Rico', code: 'PR'},
            {name: 'Qatar', code: 'QA'},
            {name: 'Reunion', code: 'RE'},
            {name: 'Romania', code: 'RO'},
            {name: 'Russian Federation', code: 'RU'},
            {name: 'Rwanda', code: 'RW'},
            {name: 'Saint Helena', code: 'SH'},
            {name: 'Saint Kitts and Nevis', code: 'KN'},
            {name: 'Saint Lucia', code: 'LC'},
            {name: 'Saint Pierre and Miquelon', code: 'PM'},
            {name: 'Saint Vincent and the Grenadines', code: 'VC'},
            {name: 'Samoa', code: 'WS'},
            {name: 'San Marino', code: 'SM'},
            {name: 'Sao Tome and Principe', code: 'ST'},
            {name: 'Saudi Arabia', code: 'SA'},
            {name: 'Senegal', code: 'SN'},
            {name: 'Serbia and Montenegro', code: 'CS'},
            {name: 'Seychelles', code: 'SC'},
            {name: 'Sierra Leone', code: 'SL'},
            {name: 'Singapore', code: 'SG'},
            {name: 'Slovakia', code: 'SK'},
            {name: 'Slovenia', code: 'SI'},
            {name: 'Solomon Islands', code: 'SB'},
            {name: 'Somalia', code: 'SO'},
            {name: 'South Africa', code: 'ZA'},
            {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
            {name: 'Spain', code: 'ES'},
            {name: 'Sri Lanka', code: 'LK'},
            {name: 'Sudan', code: 'SD'},
            {name: 'Suriname', code: 'SR'},
            {name: 'Svalbard and Jan Mayen', code: 'SJ'},
            {name: 'Swaziland', code: 'SZ'},
            {name: 'Sweden', code: 'SE'},
            {name: 'Switzerland', code: 'CH'},
            {name: 'Syrian Arab Republic', code: 'SY'},
            {name: 'Taiwan, Province of China', code: 'TW'},
            {name: 'Tajikistan', code: 'TJ'},
            {name: 'Tanzania, United Republic of', code: 'TZ'},
            {name: 'Thailand', code: 'TH'},
            {name: 'Timor-Leste', code: 'TL'},
            {name: 'Togo', code: 'TG'},
            {name: 'Tokelau', code: 'TK'},
            {name: 'Tonga', code: 'TO'},
            {name: 'Trinidad and Tobago', code: 'TT'},
            {name: 'Tunisia', code: 'TN'},
            {name: 'Turkey', code: 'TR'},
            {name: 'Turkmenistan', code: 'TM'},
            {name: 'Turks and Caicos Islands', code: 'TC'},
            {name: 'Tuvalu', code: 'TV'},
            {name: 'Uganda', code: 'UG'},
            {name: 'Ukraine', code: 'UA'},
            {name: 'United Arab Emirates', code: 'AE'},
            {name: 'United Kingdom', code: 'GB'},
            {name: 'United States', code: 'US'},
            {name: 'United States Minor Outlying Islands', code: 'UM'},
            {name: 'Uruguay', code: 'UY'},
            {name: 'Uzbekistan', code: 'UZ'},
            {name: 'Vanuatu', code: 'VU'},
            {name: 'Venezuela', code: 'VE'},
            {name: 'Vietnam', code: 'VN'},
            {name: 'Virgin Islands, British', code: 'VG'},
            {name: 'Virgin Islands, U.S.', code: 'VI'},
            {name: 'Wallis and Futuna', code: 'WF'},
            {name: 'Western Sahara', code: 'EH'},
            {name: 'Yemen', code: 'YE'},
            {name: 'Zambia', code: 'ZM'},
            {name: 'Zimbabwe', code: 'ZW'}
          ];


          // Multiple
          vm.someGroupFn = function (item){

            if (item.name[0] >= 'A' && item.name[0] <= 'M')
                return 'From A - M';

            if (item.name[0] >= 'N' && item.name[0] <= 'Z')
                return 'From N - Z';

          };

          vm.counter = 0;
          vm.someFunction = function (item, model){
            vm.counter++;
            vm.eventResult = {item: item, model: model};
          };

          vm.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];

          vm.multipleDemo = {};
          vm.multipleDemo.colors = ['Blue','Red'];
          vm.multipleDemo.selectedPeople = [vm.people[5], vm.people[4]];
          vm.multipleDemo.selectedPeopleWithGroupBy = [vm.people[8], vm.people[6]];
          vm.multipleDemo.selectedPeopleSimple = ['samantha@email.com','wladimir@email.com'];
        }
    }

})();

/**=========================================================
 * Module: upload.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FileUploadController', FileUploadController);

    FileUploadController.$inject = ['FileUploader'];
    function FileUploadController(FileUploader) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          var uploader = vm.uploader = new FileUploader({
              url: 'server/upload.php'
          });

          // FILTERS

          uploader.filters.push({
              name: 'customFilter',
              fn: function(/*item, options*/) {
                  return this.queue.length < 10;
              }
          });

          // CALLBACKS

          uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
              console.info('onWhenAddingFileFailed', item, filter, options);
          };
          uploader.onAfterAddingFile = function(fileItem) {
              console.info('onAfterAddingFile', fileItem);
          };
          uploader.onAfterAddingAll = function(addedFileItems) {
              console.info('onAfterAddingAll', addedFileItems);
          };
          uploader.onBeforeUploadItem = function(item) {
              console.info('onBeforeUploadItem', item);
          };
          uploader.onProgressItem = function(fileItem, progress) {
              console.info('onProgressItem', fileItem, progress);
          };
          uploader.onProgressAll = function(progress) {
              console.info('onProgressAll', progress);
          };
          uploader.onSuccessItem = function(fileItem, response, status, headers) {
              console.info('onSuccessItem', fileItem, response, status, headers);
          };
          uploader.onErrorItem = function(fileItem, response, status, headers) {
              console.info('onErrorItem', fileItem, response, status, headers);
          };
          uploader.onCancelItem = function(fileItem, response, status, headers) {
              console.info('onCancelItem', fileItem, response, status, headers);
          };
          uploader.onCompleteItem = function(fileItem, response, status, headers) {
              console.info('onCompleteItem', fileItem, response, status, headers);
          };
          uploader.onCompleteAll = function() {
              console.info('onCompleteAll');
          };

          console.info('uploader', uploader);
        }
    }
})();

/**=========================================================
 * Module: filestyle.js
 * Initializes the fielstyle plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('filestyle', filestyle);

    function filestyle () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var options = element.data();
          
          // old usage support
          options.classInput = element.data('classinput') || options.classInput;
          
          element.filestyle(options);
        }
    }

})();

/**=========================================================
 * Module: form-wizard.js
 * Handles form wizard plugin and validation
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('formWizard', formWizard);

    formWizard.$inject = ['$parse'];
    function formWizard ($parse) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
          var validate = $parse(attrs.validateSteps)(scope),
              wiz = new Wizard(attrs.steps, !!validate, element);
          scope.wizard = wiz.init();
        }

        function Wizard (quantity, validate, element) {
          
          var self = this;
          self.quantity = parseInt(quantity,10);
          self.validate = validate;
          self.element = element;
          
          self.init = function() {
            self.createsteps(self.quantity);
            self.go(1); // always start at fist step
            return self;
          };

          self.go = function(step) {
            
            if ( angular.isDefined(self.steps[step]) ) {

              if(self.validate && step !== 1) {
                var form = $(self.element),
                    group = form.children().children('div').get(step - 2);

                if (false === form.parsley().validate( group.id )) {
                  return false;
                }
              }

              self.cleanall();
              self.steps[step] = true;
            }
          };

          self.active = function(step) {
            return !!self.steps[step];
          };

          self.cleanall = function() {
            for(var i in self.steps){
              self.steps[i] = false;
            }
          };

          self.createsteps = function(q) {
            self.steps = [];
            for(var i = 1; i <= q; i++) self.steps[i] = false;
          };

        }
    }


})();

/**=========================================================
 * Module: masked,js
 * Initializes the masked inputs
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('masked', masked);

    function masked () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var $elem = $(element);
          if($.fn.inputmask)
            $elem.inputmask();
        }
    }

})();

/**=========================================================
 * Module: tags-input.js
 * Initializes the tag inputs plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('tagsinput', tagsinput);

    tagsinput.$inject = ['$timeout'];
    function tagsinput ($timeout) {
        var directive = {
            link: link,
            require: 'ngModel',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
          element.on('itemAdded itemRemoved', function(){
            // check if view value is not empty and is a string
            // and update the view from string to an array of tags
            if(ngModel.$viewValue && ngModel.$viewValue.split) {
              ngModel.$setViewValue( ngModel.$viewValue.split(',') );
              ngModel.$render();
            }
          });

          $timeout(function(){
            element.tagsinput();
          });
        }
    }

})();

/**=========================================================
 * Module: validate-form.js
 * Initializes the validation plugin Parsley
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('validateForm', validateForm);

    function validateForm () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var $elem = $(element);
          if($.fn.parsley)
            $elem.parsley();
        }
    }

})();

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */

(function() {
    'use strict';

    angular
        .module('app.forms')
        .filter('propsFilter', propsFilter);

    function propsFilter() {
        return filterFilter;

        ////////////////
        function filterFilter(items, props) {
          var out = [];

          if (angular.isArray(items)) {
            items.forEach(function(item) {
              var itemMatches = false;

              var keys = Object.keys(props);
              for (var i = 0; i < keys.length; i++) {
                var prop = keys[i];
                var text = props[prop].toLowerCase();
                if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                  itemMatches = true;
                  break;
                }
              }

              if (itemMatches) {
                out.push(item);
              }
            });
          } else {
            // Let the output be the input untouched
            out = items;
          }

          return out;
        }
    }

})();
'use strict';

angular
    .module('gallery')
    .controller('GalleryController', GalleryController);
GalleryController.$inject = ['$scope','$uibModalInstance','$http','galleries','Organization'];
function GalleryController($scope, $modalInstance,$http, galleries,Organization) {
    $scope.organizationService = Organization;
    $scope.render = true;
    $scope.loadingImages = false;
    $scope.croppingImages = false;
    $scope.galleries = galleries;
    console.log($scope.galleries);


    $scope.reset = function() {
        $scope.myImage        = '';
        $scope.myCroppedImage = '';
        $scope.imgcropType    = 'square';
    };
    $scope.image = {
        image: "",
        cropImage: ""
    };

    $scope.reset();

    $scope.$on("Biin: on fileUploaded",function(scope,event){
        $scope.image.image=event.target.result;
        $scope.filename = event.target.filename;
        $scope.croppingImages = true;
        $scope.loadingImages = false;
        $scope.$digest();
        //$scope.reset();
    });


    $scope.loadingImagesChange = function (state) {
        $scope.loadingImages = state;
        $scope.$digest();
    };

    $scope.onGalleryChange = function (obj, autoInsert) {

        //Do a callback logic by caller
        $scope.galleries = $scope.galleries.concat(obj);

        //Insert the images to the preview
        if (autoInsert) {
            var cantToInsert = obj.length;
            if (maxMedia > 0)
                cantToInsert = $scope.maxMedia - $scope.sites[$scope.selectedSite].media.length;

            for (var i = 0; i < cantToInsert; i++) {
                $scope.insertGalleryItem($scope.galleries.indexOf(obj[i]));
            }
        }
    };

    $scope.uploadImage = function(){

        var myImage = $scope.image.cropImage;

    };

    $scope.uploadImageToServer = function(){
        var myImage = $scope.image.cropImage;
        var filename = $scope.filename;
        $scope.croppingImages = false;
        $scope.loadingImages = true;
        $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/gallery/upload',
            {
                images:[
                    {
                        image:myImage,
                        fileName:filename
                    }
                ]
            }).success(function(data){
                $scope.onGalleryChange(data);
                $scope.croppingImages = false;
                $scope.loadingImages = false;
            }).error(function(){
                $scope.croppingImages = false;
                $scope.loadingImages = false;
            });
    };


    $scope.confirmDeleteImage = function(message) {
        if (confirm(message)) {
            $scope.delete();
        }
    };

    $scope.delete = function() {
        var imagesToDelete = [];
        var imageIndex = [];
        $(".galleryImageWrapper").each(function (index, element) {
            if ($(element).hasClass("selected")) {
                imagesToDelete.push($scope.galleries[index]);
                imageIndex.push(index);
            }
        });

        //var imagesInUse = "";

        for (var index = 0; index < imagesToDelete.length; index++) {

            // Check if image is in use.
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/checkImage/' + imagesToDelete[index].identifier).success(function(data) {
                    if (data.deleted == true ) // image deleted, remove from gallery
                    {
                        $scope.galleries.splice(imageIndex[index], 1);
                        //$http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/' + imageItem.identifier );
                    }

                }).error (function(msg) {
                console.log(msg)
            });

        }


        var modalInfo = {};
        //modalInfo.selectedImages = selectedImages;
        modalInfo.galleries = $scope.galleries;
        $modalInstance.dismiss(modalInfo);
    };

    $scope.apply = function () {
        var selectedImages = [];
        $(".galleryImageWrapper").each(function (index, element) {
            if ($(element).hasClass("selected")) {
                selectedImages.push($scope.galleries[index]);
            }
        });
        var modalInfo = {};
        modalInfo.selectedImages = selectedImages;
        modalInfo.galleries = $scope.galleries;
        $modalInstance.close(modalInfo);
    };

    $scope.close = function () {
        var modalInfo = {};
        modalInfo.galleries = $scope.galleries;
        $modalInstance.dismiss(modalInfo);
    };
}

/**
 * Created by Ivan on 9/22/15.
 */
/**=========================================================
 * Module: tags-input.js
 * Initializes the tag inputs plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('gallery')
        .directive('gallery', Gallery);

    Gallery.$inject = ['$uibModal','ObjectsSidebar', '$rootScope'];
    function Gallery ($modal,ObjectsSidebar, $rootScope) {
        var objectsSidebar  = ObjectsSidebar;
        var directive = {
            link: link,
            restrict: 'E',
            scope:{
                media : '=ngModel',
                gallery : '='
            },
            template:
            '<div class="row">'+
                '<div scrollbar="scrollbarOptionsStandard" class="ownedGalleryWrapper scrollbar-inner">'+
                    '<div ng-repeat="item in media" class="img-block" data-drop="true"  jqyoui-droppable="{index:{{$index}}}" data-drag="true" data-jqyoui-options="{revert: \'invalid\',zIndex: 100}" jqyoui-draggable="{insertInline:true, index:{{$index}}}" ng-model="media">'+
                        '<div class="moduleWrapper img-block-buttons">'+
                            '<img ng-src="{{item.url}}" pending-indicator="pending-indicator" class="imagegallery img-responsive"/>'+
                            '<div ng-click="removeMediaAt(media.indexOf(item))" class="btnShowcasePreview icon-round-control btnDelete btn-danger btn-on-hover">'+
                                '<i class="fa fa-trash fa-2x"></i>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="img-add-block">'+
                        '<div  ng-click="showImageModal()" class="btn-default img-add-block-wrapper dottedBorder">'+
                            '<span translate="GENERIC.ADD_IMAGE" class="btn-browse"></span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        };

        return directive;

        function link(scope, element, attrs)
        {

            scope.$watch('gallery', function(value){
                if(value){
                    //console.log(value);
                    scope.galleries = value;
                }
            });

            scope.removeMediaAt = function(index){
                scope.$parent.removeMediaAt(index);
            };

            scope.showImageModal = function(){
                var mapInstance = $modal.open({
                    scope:scope,
                    templateUrl: '/modules/gallery/views/partials/gallery.modal.html',
                    controller: 'GalleryController',
                    backdrop: 'static',
                    keyboard: false,
                    size:'lg',
                    resolve:{
                        loadingImages : function(){ return scope.loadingImages;},
                        organizationId : function(){ return scope.organizationId;},
                        galleries : function(){ return scope.gallery;}
                    }
                });
                mapInstance.result.then(function ( modalInfo ) {

                    for (var i = 0; i < modalInfo.selectedImages.length; i++) {
                        var newObj = {};
                        newObj.identifier = modalInfo.selectedImages[i].identifier;
                        newObj.url = modalInfo.selectedImages[i].url;
                        newObj.mainColor = modalInfo.selectedImages[i].mainColor;
                        newObj.vibrantColor = modalInfo.selectedImages[i].vibrantColor;
                        newObj.vibrantDarkColor = modalInfo.selectedImages[i].vibrantDarkColor;
                        newObj.vibrantLightColor = modalInfo.selectedImages[i].vibrantLightColor;
                        objectsSidebar.selectedObject.media.push(newObj);
                    }
                    //scope.gallery=modalInfo.galleries;
                    $rootScope.$broadcast("Biin: galleryUpdate", modalInfo);
                }, function (modalInfo) {
                    $rootScope.$broadcast("Biin: galleryUpdate", modalInfo);
                });
            };

        }
    }

})();

(function () {
    'use strict';

    angular
        .module('gallery')
        .directive('imageCheckbox', ImageCheckbox);

    ImageCheckbox.$inject = [];
    function ImageCheckbox() {
        return {
            restrict: 'A',
            link: function (scope, el, attr) {
                scope.isSelected = el.find('input').val() == 'false';
                el.on('click', function () {
                    scope.isSelected = !scope.isSelected;
                    scope.$apply();
                });
            }
        }

    }
})();

(function () {
    'use strict';

    angular
        .module('gallery')
        .directive('uploadFiles', UploadFiles);

    UploadFiles.$inject = ['$uibModal','Organization','$rootScope'];

    function UploadFiles($modal,Organization,$rootScope) {
        var organizationService = Organization;
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.uploadMedia = function(scope,formData, autoInsert){
                    scope.loadingImagesChange(true);
                    // now post a new XHR request
                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+organizationService.selectedOrganization.identifier+'/gallery');
                    xhr.onload = function (data) {
                        if (xhr.status === 200) {
                            var obj= $.parseJSON(xhr.response);

                            //Do a callback logic by caller
                            if(scope.onGalleryChange)
                                scope.onGalleryChange(obj,autoInsert);

                            //console.log('all done: ' + xhr.status);
                            scope.loadingImagesChange(false);
                        } else {
                            console.log('Something went terribly wrong...');
                        }
                    };

                    xhr.upload.onprogress = function (event) {
                        if (event.lengthComputable) {
                            var complete = (event.loaded / event.total * 100 | 0);
                            //progress.value = progress.innerHTML = complete;
                        }
                    };

                    xhr.send(formData);
                };

                var $inputFileElement = $(attrs['uploadFiles']);
                var autoInsert = false;//Set to false default auto insert
                //Change event when an image is selected
                $inputFileElement.on('change', function () {
                    console.log("Change beginning the upload");

                    var files = $inputFileElement[0].files;
                    var formData = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        var mediaFile = files[i];
                        mediaFile.originalFilename = files[i].name;
                        formData.append('file', mediaFile);
                    }

                    var file=files[0];
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        var filename = "";
                        var filenameSplitted = file.name.split(".");
                        filenameSplitted.pop();
                        for(var i = 0; i < filenameSplitted.length; i++){
                            filename += filenameSplitted[i];
                            if(i < filenameSplitted.length -1){
                                filename += ".";
                            }
                        }


                        evt.target.filename = filename;
                        $rootScope.$broadcast("Biin: on fileUploaded", evt);
                    };
                    if(file)
                        reader.readAsDataURL(file);
                });
                //Click event of the style button
                $(element[0]).on('click touch', function (e) {
                    $inputFileElement.trigger('click');
                });
            }
        };
    }
})();

/**
 * Created by Ivan on 9/23/15.
 */
(function() {
    'use strict';

    angular
        .module('gallery')
        .service('Gallery', Gallery);

    Gallery.$inject = ['$http'];
    function Gallery($http) {
        var service = {
            getList: function (organization) {
                var promise = $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+organization+'/gallery')
                    .success(function (data) {
                        return data.data;
                    })
                    .error(function (data) {
                        return {"status": false};
                    });

                return promise;
            }
            
        };
        return service;
    }
})();

/**
 * Created by Carlos on 6/27/15.
 */
'use strict';

// Setting up route
angular.module('gifts').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
        state('app.gifts', {
            url: '/gifts',
            templateUrl: 'modules/gifts/views/gifts.client.view.html',
            resolve:{
                permissions: function(Permission) {
                    return Permission.getPermissions();
                },
                selectedOrganization: function (Organization) {
                    return Organization.getSelectedOrganization();
                },
                organization: function (Organization) {
                    return Organization.getOrganizations();
                }
            }
        });
    }
]);
/**=========================================================
 * Module: gifts.controller.js
 * Controller of gifts
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('gifts')
        .controller('GiftsController', GiftsController);

    GiftsController.$inject = ['$http', '$state', '$scope', 'Loading', 'Organization', 'ObjectsSidebar', 'Authentication', '$translate'];

    function GiftsController($http, $state, $scope, Loading, Organization, ObjectsSidebar, Authentication, $translate) {
        var gift = this;

        //Running init function
        init();
        /**=============================================================================================================
         * Init Function
         =============================================================================================================*/

        function init() {
            //----Services needed----//
            //Loading Service
            $scope.loadingService = Loading;
            //Organization Service
            $scope.organizationService = Organization;
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            //Objects Sidebar Service
            $scope.objectsSidebarService = ObjectsSidebar;
            //Authentication Service
            $scope.authentication = Authentication;
            //Gift Object
            $scope.objectsSidebarService.selectedObject = {};
            //----Variables----//
            //Ready to fill
            $scope.ready = false;
            $scope.products = [];
            $scope.gifts = [];
            $scope.sites = [];
            //State of loading screen
            $scope.loadingService.isLoading = true;
            //Current Date
            $scope.currentDate = new Date().getTime();
            //Default alerts/hints
            $scope.show_alert = true;

            $scope.sidebarTemplate =
                "<div class='col-md-3 thumbListImage'>" +
                    "<img ng-if='item.productIdentifier.length==0' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
                    "<img ng-if='item.productIdentifier.length>0' ng-src='{{setProductImage(item.productIdentifier)}}' pending-indicator='pending-indicator'/>"+
                "</div>" +
                "<div class='col-md-9 leftInformationArea'>"+
                    "<label class='twoRowTitle'>{{item.name}}</label>"+
                    "<small ng-if='(item.amount==-1 || item.amount>item.amountSpent) && item.hasAvailablePeriod==false || (item.amount==-1 || item.amount>item.amountSpent) && (currentDate <= formDate(item.endDate)) && item.hasAvailablePeriod==true' class='valid-color'>Disponible</small>"+
                    "<small ng-if='item.amount>item.amountSpent && item.hasAvailablePeriod==false || item.amount>item.amountSpent && (currentDate <= formDate(item.endDate)) && item.hasAvailablePeriod==true'>{{item.amount-item.amountSpent}} u.</small>"+
                    "<small ng-if='item.amount==item.amountSpent && item.hasAvailablePeriod==false || item.amount==item.amountSpent && (currentDate <= formDate(item.endDate)) && item.hasAvailablePeriod==true' class='invalid-color'>Agotado</small>"+
                    "<small ng-if='(currentDate > formDate(item.endDate)) && item.hasAvailablePeriod==true' class='invalid-color'>Vencido</small>"+
                "</div>";
            $scope.objectsSidebarService.template =$scope.sidebarTemplate;
        }

        /**=============================================================================================================
         * Event Listeners
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.$on("Biin: On Object Created", function(){
            $scope.create();
        });

        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {
            //Parsing dates to work on AngularJS
            objectClicked.startDate = moment(new Date(objectClicked.startDate)).endOf("day").toDate();
            objectClicked.endDate = moment(new Date(objectClicked.endDate)).endOf("day").toDate();
            //All ready to show the gift info
            $scope.ready = true;
            //Validation variables
            $scope.spent = objectClicked.amount == objectClicked.amountSpent;
            $scope.expire = ($scope.currentDate > (objectClicked.endDate).getTime()) && objectClicked.hasAvailablePeriod==true;
        });
        
        $scope.$on('organizationChanged',function(){
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            $scope.loadingService.isLoading = true;
            //Get the List of Gifts
            $scope.ready = false;
            if($scope.organizationId){
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gifts) {
                    $scope.gifts = gifts;
                    $scope.objectsSidebarService.setObjects($scope.gifts);
                    $state.reload();
                    $scope.loadingService.isLoading = false;
                });
                //Get the List of Products
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function(data) {
                    $scope.products = data.data.elements;
                });
                //Get the List of Sites
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+ $scope.organizationId +'/sites').success(function(data){
                    $scope.locals = data.data.sites;
                });
            }
        });

        /**=============================================================================================================
         * Functions
         =============================================================================================================*/

        if($scope.organizationId){
            //Get the List of Products
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function(data) {
                $scope.products = data.data.elements;
            });
            //Get the List of Sites
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+ $scope.organizationId +'/sites').success(function(data){
                $scope.locals = data.data.sites;
            });
            //Get the List of Gifts
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gifts) {
                $scope.gifts = gifts;
                $scope.objectsSidebarService.setObjects($scope.gifts);
                $scope.loadingService.isLoading = false;
            });
        }
        
        //Create a gift
        $scope.create = function(){
            var titleText = $translate.instant("GIFT.CREATING");
            swal({   title: titleText,  type: "info",   showConfirmButton: false });
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gift,status){
                if(status == 201){
                    var gifts = $scope.objectsSidebarService.getObjects();
                    gift.startDate = new Date(gift.startDate);
                    gift.endDate = new Date(gift.endDate);
                    gifts.push(gift);
                    $scope.objectsSidebarService.setObjects(gifts);
                    $scope.objectsSidebarService.setSelectedObject(gift);

                    setTimeout(function(){
                        swal.close();
                    },2000);
                }
            });
        }

        //Function to send just the available types of gift mechanics
        $scope.availableIn = function (type) {
            var exist = false;
            $scope.types = $scope.objectsSidebarService.selectedObject.availableIn;

            if($scope.types.length == 0){
                //If any button is clicked
                if (type=='all'){
                    $scope.types = $scope.types = ['nps','mec','vip'];
                } else {
                    $scope.types.push(type);
                }
            }else if ($scope.types.length == 3){
                if (type=='all'){
                    $scope.types = [];
                } else {
                    $scope.types = [];
                    $scope.types.push(type);
                }
            } else if($scope.types.length == 2){
                $scope.types = $scope.types = ['nps','mec','vip'];
            } else {
                if (type=='all'){
                    $scope.types = $scope.types = ['nps','mec','vip'];
                } else {
                    for(var i in $scope.types){
                        if(type == $scope.types[i]){
                            $scope.types.splice(i, 1);
                            exist = true;
                        }
                    }
                    if(!exist){
                        $scope.types.push(type);
                    }
                }
            }
            $scope.objectsSidebarService.selectedObject.availableIn = $scope.types;
        }

        //Function to control the locals available for the gift
        $scope.availableLocal = function (local) {
            var exist = false;
            $scope.localsAvailable = $scope.objectsSidebarService.selectedObject.sites;

            if($scope.localsAvailable.length == 0){
                 $scope.localsAvailable.push(local);
            }else{
                 //Validate if the local was already selected
                for(var i in $scope.localsAvailable){
                    if(local == $scope.localsAvailable[i]){
                        $scope.localsAvailable.splice(i, 1);
                        exist = true;
                    }
                }
                if(!exist){
                    $scope.localsAvailable.push(local);
                }
            }
            $scope.objectsSidebarService.selectedObject.sites = $scope.localsAvailable;
        }

        //Function to activate a gift
        $scope.activate = function () {
            var giftToUpdate = $scope.objectsSidebarService.selectedObject;
            var translatedTexts  = $translate.instant(["GENERIC.ACTIVATE_GIFT_TITLE","GENERIC.ACTIVATE_GIFT_CONFIRMATION","GENERIC.ACTIVATE","GENERIC.CANCEL","GENERIC.ACTIVATED","GIFT.ACTIVATE_TEXT"]);
            swal({
                title: translatedTexts["GENERIC.ACTIVATE_GIFT_TITLE"],
                text: translatedTexts["GENERIC.ACTIVATE_GIFT_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#8CD4F5",
                confirmButtonText: translatedTexts["GENERIC.ACTIVATE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                $scope.objectsSidebarService.selectedObject.isActive = true;
                if(card.myForm.$valid) {
                    $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts/'+ giftToUpdate.identifier,{isActive:true}).success(function(data,status){
                        swal(translatedTexts["GENERIC.ACTIVATED"], translatedTexts["GIFT.ACTIVATE_TEXT"], "success");
                    });
                }
            });
        }

        //Function that display the swal as a confirmation to remove gift
        $scope.deleteGift = function(message, selectedObject) {
            var translatedTexts  = $translate.instant(["GENERIC.DELETE_GIFT_TITLE","GENERIC.DELETE_GIFT_CONFIRMATION","GENERIC.DELETE","GENERIC.CANCEL"]);

            swal({
                title: translatedTexts["GENERIC.DELETE_GIFT_TITLE"],
                text: translatedTexts["GENERIC.DELETE_GIFT_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#DD6B55",
                confirmButtonText: translatedTexts["GENERIC.DELETE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                if($scope.objectsSidebarService.selectedObject.amountSpent == 0 || $scope.spent || $scope.expire) {
                    $scope.removeGiftAt($scope.objectsSidebarService.objects.indexOf(selectedObject));
                }
            });
        };

        //Remove gift at specific position
        $scope.removeGiftAt = function(index){
            var giftToDelete = $scope.objectsSidebarService.objects[index];
            var translatedTexts  = $translate.instant(["GIFT.DELETED_TEXT","GENERIC.DELETED"]);
            $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts/'+ giftToDelete.identifier,{data:giftToDelete}).success(function(data){
                    $scope.ready = false;
                    $scope.objectsSidebarService.objects.splice(index,1);
                    swal(translatedTexts["GENERIC.DELETED"], translatedTexts["GIFT.DELETED_TEXT"], "success");
                }
            );
        };

        //Save gift information
        $scope.update = function(){
            var giftToUpdate = $scope.objectsSidebarService.selectedObject;
            // Don't do anything if there is no selected gift
            if ($scope.ready == false)
                return;

            if(gift.myForm.$valid  && $scope.objectsSidebarService.selectedObject.sites.length > 0 && $scope.objectsSidebarService.selectedObject.availableIn.length > 0) {
                $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts/'+giftToUpdate.identifier,giftToUpdate).success(function(data,status){
                    console.log('Actualizado');
                    //Validation variables
                    $scope.spent = $scope.objectsSidebarService.selectedObject.amount == $scope.objectsSidebarService.selectedObject.amountSpent;
                    if($scope.objectsSidebarService.selectedObject.endDate){
                        $scope.expire = ($scope.currentDate > ($scope.objectsSidebarService.selectedObject.endDate).getTime()) && $scope.objectsSidebarService.selectedObject.hasAvailablePeriod==true;
                    }
                });
            }
        }
        //Check locals in initial data
        $scope.checkLocal = function(local){
            if($scope.objectsSidebarService.selectedObject){
                $scope.localsAvailable = $scope.objectsSidebarService.selectedObject.sites;
                for(var i in $scope.localsAvailable){
                    if(local == $scope.localsAvailable[i]){
                        return true;
                    }
                }
            }
        }
    }
})();

'use strict';

angular
    .module('gmaps')
    .controller('GmapController', GmapController);
GmapController.$inject = ['$scope','$uibModalInstance'];
function GmapController($scope, $modalInstance) {

    $scope.render = true;
    $scope.lat = 0;
    $scope.lng = 0;
    $scope.changeLocation = function (lat, lng) {
        $scope.lat = lat;
        $scope.lng = lng;
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.apply = function () {
        var newPos = {};
        newPos.lat = $scope.lat;
        newPos.lng = $scope.lng;
        $modalInstance.close(newPos);
    }
}

/**=========================================================
 * Module: tags-input.js
 * Initializes the tag inputs plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('gmaps')
        .directive('map', StaticMap);

    StaticMap.$inject = ['ObjectsSidebar'];
    function StaticMap (ObjectsSidebar) {
        return{
            restrict:'A',
            link:function(scope, element, attrs){

                var local_lat = ObjectsSidebar.selectedObject.lat;
                var local_lng = ObjectsSidebar.selectedObject.lng;

                var zoom = eval(attrs['zoom']);

                var defPosition =new google.maps.LatLng(local_lat ,local_lng);
                var defOptions = {
                    center: defPosition,
                    zoom: zoom
                };
                var map=new google.maps.Map(element[0],defOptions);
                var marker;
                //Get the Geolocation
                function getLocation() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(showPosition,errorCallback,{timeout:10000});
                    } else {
                        element[0].innerHTML = "Geolocation is not supported by this browser.";
                    }
                }
                //Show the position in the map
                function showPosition(position,otherZoom) {
                    if(typeof(otherZoom)!=='undefined'){
                        zoom=otherZoom;
                    }
                    var myPosition =new google.maps.LatLng( position.coords.latitude ,  position.coords.longitude);
                    var mapOptions = {
                        center: myPosition,
                        zoom: zoom
                    };

                    map.setOptions(mapOptions);

                    marker = new google.maps.Marker({
                        map:map,
                        draggable:true,
                        animation: google.maps.Animation.DROP,
                        position: myPosition
                    });

                    //Change Location Event Refresh the model
                    google.maps.event.addListener(marker, 'position_changed', function(){
                        var newPosition = marker.getPosition();
                        scope.changeLocation(newPosition.lat(),newPosition.lng());
                    });


                    google.maps.event.addListenerOnce(map, 'idle', function() {
                        var newPosition = marker.getPosition();
                        google.maps.event.trigger(map, 'resize');
                        map.setCenter(newPosition);
                    });

                }

                function errorCallback(err){
                    var coords ={latitude:local_lat,longitude: local_lng};
                    showPosition({coords:coords},1);
                    console.warn('ERROR(' + err.code + '): ' + err.message);
                }

                //Call get location
                if(local_lat==0&& local_lng==0)
                    getLocation();
                else{
                    var coords ={latitude:local_lat, longitude:local_lng};
                    showPosition({coords:coords});
                }
            }
        }
    }

})();

/**=========================================================
 * Module: tags-input.js
 * Initializes the tag inputs plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('gmaps')
        .directive('staticmap', StaticMap);

    StaticMap.$inject = ['ObjectsSidebar','$uibModal'];
    function StaticMap (ObjectsSidebar,$modal) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var zoom = eval(attrs['zoom']);
                var marker;
                //Get the Geolocation
                function getLocation() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(showPosition, errorCallback, {timeout: 10000});
                    } else {
                        element[0].innerHTML = "Geolocation is not supported by this browser.";
                    }
                }

                scope.showMapModal = function ( ) {
                    var mapInstance = $modal.open({
                        templateUrl: '/modules/gmaps/views/partials/gmap.modal.client.partial.view.html',
                        controller: 'GmapController',
                        backdrop: 'static',
                        size:'lg'
                    });
                    mapInstance.result.then(function ( position ) {
                        if(position){
                            ObjectsSidebar.selectedObject.lng = position.lng;
                            ObjectsSidebar.selectedObject.lat = position.lat;
                        }
                    }, function () {

                    });
                };

                //Show the position in the map
                function showPosition(position, otherZoom) {
                    if (typeof(otherZoom) !== 'undefined') {
                        zoom = otherZoom;
                    }
                    if ($(element).children("img").length != 0) {
                        $(element).children("img")[0].remove();
                    }

                    var imageElement = document.createElement("img");
                    if(ObjectsSidebar.selectedObject){
                        imageElement.setAttribute("src", "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude +
                            "&zoom=" + zoom + "&size=1024x512&markers=" + ObjectsSidebar.selectedObject.lat + "," + ObjectsSidebar.selectedObject.lng);
                        imageElement.className += "img-responsive";
                        element[0].appendChild(imageElement);
                    }
                }

                function errorCallback(err) {
                    var coords = {latitude: local_lat, longitude: local_lng};
                    showPosition({coords: coords}, 1);
                    console.warn('ERROR(' + err.code + '): ' + err.message);
                }


                var local_lat = 0;
                var local_lng = 0;

                function showMap() {
                    if (attrs['lat'] && attrs['lng']) {
                        local_lat = eval(attrs['lat']);
                        local_lng = eval(attrs['lng']);
                    }

                    //Call get location
                    if (local_lat == 0 && local_lng == 0)
                        getLocation();
                    else {
                        var coords = {latitude: local_lat, longitude: local_lng};
                        showPosition({coords: coords});
                    }
                }

                showMap();

                attrs.$observe('lat', function (newValue, oldValue) {
                    showMap();
                });
                attrs.$observe('lng', function (newValue, oldValue) {
                    showMap();
                });
            }
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'modernizr': ['/lib/modernizr/modernizr.js'],
                'icons': ['/lib/fontawesome/css/font-awesome.min.css',
                    '/lib/simple-line-icons/css/simple-line-icons.css'],
                'filestyle': ['/lib/bootstrap-filestyle/src/bootstrap-filestyle.js']

            },
            // Angular based script (use the right module name)
            modules: [
                //{name: 'biinUsers', files: ['/modules/biinUsers/controllers/access-login.controller.js']},
                //{name: 'dashboard', files: ['/modules/dashboard/controllers/dashboard.controller.js']}

            ]
        })
    ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
/**
 * Created by sofi on 10/6/15.
 */
'use strict';

// Setting up route
angular.module('maintenance').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.maintenance', {
                url: '/maintenance',
                templateUrl: 'modules/maintenance/views/maintenance.client.view.html',
                resolve: {
                    permissions: function(Permission) {
                        return Permission.getPermissions();
                    },
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            });
    }
]);

/**=========================================================
 * Module: maintenance.js
 * Maintenance for biin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('maintenance')
        .controller('MaintenanceController', MaintenanceController);

    MaintenanceController.$inject = ['$http', '$state', '$timeout', '$scope', '$uibModal', 'Authentication', 'ObjectsSidebar','Loading'];
    function MaintenanceController($http, $state, $timeout, $scope, $modal, Authentication, ObjectsSidebar,Loading) {
        var vm = this;
        activate();

        function activate() {
            $scope.authentication = Authentication;
            $scope.loadingService = Loading;
            $scope.loadingService.isLoading = true;
        }

        /**=============================================================================================================
         * ObjectsSidebar Configuration
         *
         =============================================================================================================*/
        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.objectsSidebarService.template =
            "<div class='maintenanceList leftInformationArea'>" +
                "<label class='twoRowTitle'>{{item.name}}</label>" +
                "<label class='twoRowSubtitle'>{{item.assignedBeacons}} Beacons</label> " +
            "</div>";

        $scope.objectsSidebarService.enableAddButton = false;

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.$on("Biin: On Object Clicked", function(event,objectClicked){
            $scope.showBiinsPerOrganization(objectClicked);
        });


        /**=============================================================================================================
         * Variables
         =============================================================================================================*/


        /**=============================================================================================================
         * Self called functions
         =============================================================================================================*/

        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/

        $http.get(ApplicationConfiguration.applicationBackendURL + 'maintenance/organizations').success(function(data){
            $scope.objectsSidebarService.setObjects(data);
            $scope.loadingService.isLoading = false;
            //console.log($scope.objectsSidebarService.getObjects());

            for (var i = 0; i < $scope.objectsSidebarService.objects.length ; i++) {
                $scope.objectsSidebarService.objects[i].unassignedBeacons = $scope.objectsSidebarService.objects[i].biinsCounter - $scope.objectsSidebarService.objects[i].biinsAssignedCounter;
                $scope.objectsSidebarService.objects[i].assignedBeacons = $scope.objectsSidebarService.objects[i].biinsAssignedCounter;
            }

            $scope.selectedOrganization = null;
            $scope.biinsXOrganization = null;
            $scope.defaultUUID = "";

            $scope.getTypeName = function(type)
            {
                if(type == "1")
                {
                    return "External";
                }
                else if (type == "2")
                {
                    return "Internal";
                }
                else
                {
                    return "Product"
                }
            }


            $scope.showBiinsPerOrganization = function(selectedObject)
            {
                $http.get(ApplicationConfiguration.applicationBackendURL + 'maintenance/getBiinsOrganizationInformation/'+$scope.objectsSidebarService.selectedObject.identifier).success(function(data){
                    $scope.objectsSidebarService.selectedObject.biins = data.biins;
                    $scope.defaultUUID = data.defaultUUID;
                    $scope.biinsXOrganization = $scope.objectsSidebarService.selectedObject.biins;

                    for(var i = 0; i < $scope.biinsXOrganization.length; i++)
                    {
                        for(var j = 0; j < selectedObject.sites.length; j++)
                        {
                            if($scope.biinsXOrganization[i].siteIdentifier == selectedObject.sites[j].identifier)
                            {
                                $scope.biinsXOrganization[i].siteName = selectedObject.sites[j].title2;
                                break;
                            }
                        }
                    }
                });
            }

            $scope.showAddBiintoOrganizationModal = function ( mode, beacon)
            {
                var modalInstance = $modal.open({
                    templateUrl: '/modules/maintenance/views/partials/managebiintoorganization.client.modal.html',
                    controller: 'manageBiinToOrganization',
                    size:'lg',
                    resolve:{
                       selectedElement : function()
                        {
                            return { sites: $scope.objectsSidebarService.selectedObject.sites};
                        },
                        mode : function() { return mode },
                        beacon : function(){ return beacon},
                        selectedOrganization : function()
                        {
                            return { organization: $scope.objectsSidebarService.selectedObject};
                        },
                        defaultUUID : function() { return $scope.defaultUUID; }
                    }
                });

                modalInstance.result.then(function ( beacon ) {
                    $scope.showBiinsPerOrganization($scope.objectsSidebarService.selectedObject);
                    if(mode == "create" ){
                        $scope.objectsSidebarService.selectedObject.sites[beacon.siteIndex].minorCounter = $scope.objectsSidebarService.selectedObject.sites[beacon.siteIndex].minorCounter ? $scope.objectsSidebarService.selectedObject.sites[beacon.siteIndex].minorCounter+1 : 1;
                        $scope.objectsSidebarService.selectedObject.assignedBeacons = $scope.objectsSidebarService.selectedObject.assignedBeacons ? $scope.objectsSidebarService.selectedObject.assignedBeacons+1 : 1;

                    }
                    else{
                        if(beacon.minorHasChanged && beacon.biinType != "1"){
                            $scope.objectsSidebarService.selectedObject.sites[beacon.siteIndex].minorCounter = $scope.objectsSidebarService.selectedObject.sites[beacon.siteIndex].minorCounter+1;
                            delete beacon.minorHasChanged;
                        }
                    }
                }, function () {
                    $scope.showBiinsPerOrganization($scope.objectsSidebarService.selectedObject);
                });
            }
        }).error(function(err){
            console.log(err);
        });
    }
})();

/**
 * Created by sofi on 10/8/15.
 */
/**=========================================================
 * Module: maintenance.js
 * Maintenance for biin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('maintenance')
        .controller('manageBiinToOrganization', ManageBiinToOrganization);

    ManageBiinToOrganization.$inject = ['$scope', '$uibModalInstance', '$http', 'selectedElement', 'mode', 'beacon', 'selectedOrganization', 'defaultUUID'];
    function ManageBiinToOrganization($scope, $modalInstance, $http, selectedElement, mode, beacon, selectedOrganization, defaultUUID) {

        /**=============================================================================================================
         * ObjectsSidebar Configuration
         *
         =============================================================================================================*/

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/


        /**=============================================================================================================
         * Variables
         =============================================================================================================*/


        /**=============================================================================================================
         * Self called functions
         =============================================================================================================*/

        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/

        $scope.sites = selectedElement.sites;
        $scope.mode = mode;
        $scope.beacon = null;
        $scope.selectedOrganization = selectedOrganization.organization;
        $scope.minor = 0;
        $scope.siteIndexFromBeacon = 0;
        $scope.lockValues = false;
        $scope.minorHasChanged = false;
        $scope.siteMinor = 0;

        if (mode == "create") {
            if ($scope.sites.length > 0) {
                $scope.selectedSite = $scope.sites[0];
                $scope.minor = parseInt($scope.selectedSite.minorCounter) + 1;
                $scope.siteMinor = parseInt($scope.selectedSite.minorCounter) + 1;

            }

            $scope.beacon = {
                identifier: "",
                name: "",
                status: "No Programmed",
                proximityUUID: defaultUUID,
                registerDate: "",
                biinType: "3",
                venue: ""
            }
        }
        else {
            $scope.beacon = beacon;
            $scope.minor = parseInt(beacon.minor);
            $scope.lockValues = $scope.beacon.status != "No Programmed";
            $scope.initialBeaconType = $scope.beacon.biinType;
            $scope.isExternalBeaconType = $scope.beacon.biinType == "1";
            var end = false;
            var indiceSelect = -1;


            for (var i = 0; i < $scope.sites.length; i++) {
                if ($scope.sites[i].identifier == $scope.beacon.siteIdentifier) {
                    $scope.selectedSite = $scope.sites[i];
                    break;
                }
            }

            /*for (var i = 0; i < $scope.sites.length && !end; i++) {
                if ($scope.sites[i].identifier == $scope.beacon.siteIdentifier) {
                    indiceSelect = i;
                    end = true;

                    //Binding the value in the view
                    setTimeout(function () {
                        $scope.selectedSite = indiceSelect;
                        $scope.siteIndexFromBeacon = indiceSelect;
                        $scope.siteMinor = parseInt($scope.sites[indiceSelect].minorCounter);
                        $scope.$apply(); //this triggers a $digest

                    }, 100);
                }
            }*/
        }

        $scope.save = function () {
            $scope.beacon.major = $scope.selectedSite.major;
            $scope.beacon.siteIdentifier = $scope.selectedSite.identifier;
            $scope.beacon.siteIndex = $scope.sites.indexOf($scope.selectedSite);
            $scope.beacon.isAssigned = true;
            $scope.beacon.organizationIdentifier = $scope.selectedOrganization.identifier;
            $scope.beacon.accountIdentifier = $scope.selectedOrganization.accountIdentifier;
            $scope.beacon.minor = $scope.minor;
            $scope.beacon.siteMinor = $scope.siteMinor;

            if ($scope.mode == "create") {
                $scope.beacon.mode = "create";
                $http.put(ApplicationConfiguration.applicationBackendURL + 'maintenance/insertBiin', $scope.beacon).success(function (data, status) {
                    $modalInstance.close($scope.beacon);
                }).error(function (data, status) {
                    $scope.message = data.message;
                    console.log(data);
                    console.log(status);
                });
            }
            else {
                $scope.beacon.mode = "edit";
                $http.post(ApplicationConfiguration.applicationBackendURL + 'maintenance/insertBiin', $scope.beacon).success(function (data, status) {
                    console.log("success");
                    $scope.beacon.minorHasChanged = $scope.minorHasChanged;
                    $modalInstance.close($scope.beacon);
                }).error(function (data, status) {
                    console.log(data);
                    console.log(status);
                });
            }
        }

        $scope.selectSite = function (site) {
            if ($scope.beacon.biinType == "1") {
                $scope.minor = 1;
                $scope.siteMinor = mode == "create" ? parseInt(site.minorCounter) : parseInt(site.minorCounter) + 1;
            } else {
                if (mode == "create") {
                    $scope.minor = parseInt(site.minorCounter) + 1;
                    $scope.siteMinor = parseInt(site.minorCounter) + 1;
                } else {
                    if ($scope.siteIndexFromBeacon == $scope.sites.indexOf(site) && $scope.isExternalBeaconType) {
                        $scope.minor = parseInt($scope.beacon.minor);
                        $scope.siteMinor = parseInt(site.minorCounter);
                        $scope.minorHasChanged = false;
                    } else {
                        $scope.minor = parseInt(site.minorCounter) + 1;
                        $scope.siteMinor = parseInt(site.minorCounter) + 1;
                        $scope.minorHasChanged = true;
                    }
                }
            }
            $scope.selectedSite = site;
        }

        $scope.onTypeChange = function (value) {
            if (value == "1") {
                $scope.minor = 1;
                $scope.minorHasChanged = !$scope.isExternalBeaconType;
                //TODO: FIX INDEX
                // $scope.siteMinor = pmode == "create" ? parseInt($scope.sites[index].minorCounter) : parseInt($scope.sites[index].minorCounter) + 1;
            } else {
                if ($scope.siteIndexFromBeacon == $scope.selectedSite && $scope.isExternalBeaconType == (value == "1")) {
                    $scope.minor = parseInt($scope.beacon.minor);
                    $scope.siteMinor = parseInt($scope.selectedSite.minorCounter);
                    $scope.minorHasChanged = false;
                } else {
                    $scope.minorHasChanged = true;
                    $scope.minor = parseInt($scope.selectedSite.minorCounter) + 1;
                    $scope.siteMinor = parseInt($scope.selectedSite.minorCounter) + 1;
                }
            }
        }
        $scope.selectStatus = function (status) {
            $scope.lockValues = status != "No Programmed"
        }

        $scope.ok = function () {
            $modalInstance.close($scope.objectIndex);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
})();


/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

/**
 * Created by Ivan on 8/19/15.
 */
'use strict';

// Setting up route
angular.module('nps').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.nps', {
                url: '/nps',
                templateUrl: 'modules/nps/views/nps.client.view.html',
                resolve: {
                    permissions: function(Permission) {
                        return Permission.getPermissions();
                    },
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            });
        /*.
         state('page.signup', {
         url: '/signup',
         templateUrl: 'modules/users/views/authentication/signup.client.view.html'
         }).
         state('page.forgot', {
         url: '/password/forgot',
         templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
         }).
         state('page.reset-invalid', {
         url: '/password/reset/invalid',
         templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
         }).
         state('page.reset-success', {
         url: '/password/reset/success',
         templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
         }).
         state('page.reset', {
         url: '/password/reset/:token',
         templateUrl: 'modules/users/views/password/reset-password.client.view.html'
         }).
         state('app.password', {
         url: '/settings/password',
         templateUrl: 'modules/users/views/settings/change-password.client.view.html'
         }).
         state('app.profile', {
         url: '/settings/profile',
         templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
         }).
         state('app.accounts', {
         url: '/settings/accounts',
         templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
         });*/
    }
]);

/**
 * Created by Ivan on 8/19/15.
 */
/**=========================================================
 * Module: profile.js
 * Profile management for biin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('nps')
        .controller('NPSController', NPSController);

    NPSController.$inject = ['$http', '$state', '$scope', 'Authentication', 'toaster', '$location', 'Organization','ObjectsSidebar','Loading'];
    function NPSController($http, $state, $scope, Authentication, toaster, $location, Organization,ObjectsSidebar,Loading) {
        var vm = this;
        $scope.organizationService = Organization;
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;
        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/
        $scope.$on('organizationChanged', function () {
            //$scope.isLoadingNPSData = true;
            $scope.loadingService.isLoading = true;
            $http.get(ApplicationConfiguration.applicationBackendURL + 'ratings/organization',{ headers:{organizationid:$scope.organizationService.selectedOrganization.identifier}}).success(function(data){
                if(data.result == "1"){
                    updateNPSValues(data.data);
                    $scope.loadingService.isLoading = false;

                }
            });
        });

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });


        if (!Authentication.user) {
            $location.path('/');
        }


        Date.prototype.addDays = function(days) {
            var dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        };

        function isSameDateAs (pDate1, pDate2) {
            return (
                pDate1.getFullYear() === pDate2.getFullYear() &&
                pDate1.getMonth() === pDate2.getMonth() &&
                pDate1.getDate() === pDate2.getDate()
            );
        }

        function getDates(startDate, stopDate) {
            var dateArray = new Array();
            var currentDate = startDate;
            while (currentDate <= stopDate) {
                dateArray.push(currentDate);
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }

        activate();

        $scope.save = function(){
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationService.selectedOrganization.identifier, {model: $scope.organizationService.selectedOrganization}).success(function (data, status) {
                if (status === 200) {
                    $scope.succesSaveShow = true;
                } else
                    $scope.errorSaveShow = true;
            });
        };
        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $http.get(ApplicationConfiguration.applicationBackendURL + 'ratings/organization',{ headers:{organizationid:$scope.organizationService.selectedOrganization.identifier}}).success(function(data){
                if(data.result == "1"){
                    updateNPSValues(data.data);
                    $scope.loadingService.isLoading = false;
                }
            });
            resetNPS();
        }

        function updateNPSValues(data){

            resetNPS();

            if(Array.isArray(data) && data.length > 0){

                var dateArray = getDates((new Date()).addDays(-6),new Date() );
                var totalCases = 0;
                for(var i = 0; i < dateArray.length; i++ ) {
                    for(var j = 0; j< data.length; j++){
                        if(isSameDateAs(new Date(data[j].date),dateArray[i])){
                            if(data[j].rating < 7){
                                $scope.detractorsQuantity ++;
                            } else if(data[j].rating < 9){
                                $scope.passiveQuantity ++;
                            }else{
                                $scope.promotersQuantity ++;
                            }
                            totalCases++;
                        }
                    }
                }

                $scope.promotersPercentage = ($scope.promotersQuantity/totalCases) * 100;
                $scope.passivePercentage = ($scope.passiveQuantity/totalCases) * 100;
                $scope.detractorsPercentage = ($scope.detractorsQuantity/totalCases) * 100;
                $scope.npsScore = $scope.promotersPercentage - $scope.detractorsPercentage;
            }
            generateChartData(data);

        }

        function resetNPS(){
            $scope.promotersQuantity = 0;
            $scope.passiveQuantity = 0;
            $scope.detractorsQuantity = 0;
            $scope.npsScore = 0;
            $scope.promotersPercentage = 0;
            $scope.passivePercentage = 0;
            $scope.detractorsPercentage = 0;
        }

        function generateChartData(data){

            var dateArray = getDates((new Date()).addDays(-6),new Date() );
            var npsDataForChart = [];
            for(var i = 0; i < dateArray.length; i++ ){
                var npsObject = {};
                npsObject.date = dateArray[i];
                npsObject.nps = 0;
                var tempnpspromoter = 0;
                var tempnpspasive = 0;
                var tempnpsdetractor = 0;
                for(var j = 0; j< data.length; j++){
                    if(isSameDateAs(new Date(data[j].date),dateArray[i])){
                        if(data[j].rating < 7){
                            tempnpsdetractor ++;
                        } else if(data[j].rating < 9){
                            tempnpspasive ++;
                        }else{
                            tempnpspromoter ++;
                        }
                    }
                }
                var totalnps = tempnpsdetractor + tempnpspasive + tempnpspromoter;
                if(totalnps > 0){
                    var nps = (tempnpspromoter/totalnps * 100) - (tempnpsdetractor/totalnps*100);
                    npsObject.nps = nps;
                }
                npsDataForChart.push(npsObject);
            }
            var graphData = [];
            for( i = 0; i < npsDataForChart.length; i++){
                graphData.push({x:npsDataForChart[i].date,y:npsDataForChart[i].nps});
            }
            $scope.data = [
                {
                    values: graphData,
                    color: '#fe5621',
                    key: 'NPS',
                    area: true      //area - set to true if you want this line to turn into a filled area chart.
                }
            ];
        }

        $scope.options = {
            chart: {
                type: 'lineChart',
                height: 150,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    tickFormat: function(d) {
                        return d3.time.format('%d-%m-%y')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'NPS',
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    //console.log("!!! lineChart callback !!!");
                }
            }
        };
    }
})();

/**
 * Created by Ivan on 8/27/15.
 */
/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('objectssidebar')
        .controller('ObjectsSideBar', ObjectsSideBar);

    ObjectsSideBar.$inject = ['$http', '$state','$scope','$rootScope','ObjectsSidebar','Organization'];
    function ObjectsSideBar($http, $state, $scope,$rootScope,ObjectsSidebar,Organization) {
        var vm = this;
        activate();

        ////////////////

        function activate() {
            $scope.isHidden = false;
            $scope.objectsSidebarService = ObjectsSidebar;
            //Organization Service
            $scope.organizationService = Organization;
            //Draggable Properties
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            $scope.currentDate = new Date().getTime();

            if($scope.organizationId) {
                //----Functions----//
                //Get the List of Products
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function(data) {
                    $scope.products = data.data.elements;
                });
                //Get the List of Gifts
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gifts) {
                    $scope.gifts = gifts;
                });
            }
        }

        //Function to set the image of the current product into the thumbnail in the Objects Sidebar
        $scope.setProductImage = function (product) {
            for(var i in $scope.products){
                if(product == $scope.products[i].elementIdentifier){
                    return $scope.products[i].media[0].url;
                }
            }
        };

        //Formatting dates
        $scope.formDate = function(date) {
            return new Date(date).getTime();
        }

        $scope.onObjectClick = function( index ){
            var objectClicked = $scope.objectsSidebarService.getObjects()[index];
            $scope.objectsSidebarService.selectedObject = objectClicked;
            $rootScope.$broadcast("Biin: On Object Clicked", objectClicked);
        };

        $scope.create = function(){
            $rootScope.$broadcast("Biin: On Object Created");
        };

        $scope.hideObjectsMenu =function()
        {
            if($scope.isHidden){
                $(".right-section-content").removeClass("extended");
                $(".objects-sidebar").removeClass("contracted");
            }
            else{
                $(".right-section-content").addClass("extended");
                $(".objects-sidebar").addClass("contracted");
            }
            $scope.isHidden = !$scope.isHidden;
        };

        $scope.deleteItem = function(index , $event){
            console.warn("Delete clicked " + index);
            $event.stopPropagation();
            $rootScope.$broadcast("Biin: On Object Deleted",index);
        };
    }
})();


(function() {
    'use strict';

    angular
        .module('objectssidebar')
        .service('ObjectsSidebar', ObjectsSidebar);

    ObjectsSidebar.$inject = [];
    function ObjectsSidebar() {
        return  {
            objects: [],
            selectedObject: null,
            template: "",
            loadedInformation:false,
            enableAddButton: true,

            setObjects: function (objects) {
                this.objects = objects;
            },
            getObjects: function () {
                return this.objects;
            },
            setSelectedObject: function (selectedObject) {
                this.selectedObject = selectedObject;
            },
            getSelectedObject: function () {
                return this.selectedObject;
            },
            reset: function () {
                this.objects = [];
                this.selectedObject = null;
                this.template = "";
                this.enableAddButton = true;
            }
        };
    }
})();

/**
 * Created by Ivan on 8/19/15.
 */
'use strict';

// Setting up route
angular.module('organization').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.organization', {
                url: '/organization',
                templateUrl: 'modules/organization/views/organization.client.view.html',
                resolve: {
                    permissions: function(Permission) {
                        return Permission.getPermissions();
                    },
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            });
        /*.
         state('page.signup', {
         url: '/signup',
         templateUrl: 'modules/users/views/authentication/signup.client.view.html'
         }).
         state('page.forgot', {
         url: '/password/forgot',
         templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
         }).
         state('page.reset-invalid', {
         url: '/password/reset/invalid',
         templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
         }).
         state('page.reset-success', {
         url: '/password/reset/success',
         templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
         }).
         state('page.reset', {
         url: '/password/reset/:token',
         templateUrl: 'modules/users/views/password/reset-password.client.view.html'
         }).
         state('app.password', {
         url: '/settings/password',
         templateUrl: 'modules/users/views/settings/change-password.client.view.html'
         }).
         state('app.profile', {
         url: '/settings/profile',
         templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
         }).
         state('app.accounts', {
         url: '/settings/accounts',
         templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
         });*/
    }
]);

/**
 * Created by Ivan on 8/19/15.
 */
/**=========================================================
 * Module: profile.js
 * Profile management for biin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('organization')
        .controller('OrganizationController', OrganizationController);

    OrganizationController.$inject = ['$http', '$state', '$scope','$translate', 'Authentication', 'toaster', '$location', 'Organization','ObjectsSidebar','Loading'];
    function OrganizationController($http, $state, $scope,$translate, Authentication, toaster, $location, Organization,ObjectsSidebar,Loading) {
        var vm = this;
        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.organizationService = Organization;
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;

        /**=============================================================================================================
         * ObjectsSidebar Configuration
         =============================================================================================================*/

        $scope.sidebarTemplate =
            "<div class='col-md-3 thumbListImage'>" +
            "<img ng-if='item.media.length == 0  || item.media[0].media.length == 0 ' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
            "<img ng-if='item.media.length>0' ng-src='{{item.media[0].url}}'/>" +
            "</div>" +
            "<div class='col-md-9 leftInformationArea'>" +
            "<label class='oneRowTitle'>{{item.brand}}</label>" +
            "</div>";
        $scope.objectsSidebarService.template = $scope.sidebarTemplate;
        $scope.objectsSidebarService.setObjects($scope.organizationService.organizationsList);

        for (var permit = 0; permit < Authentication.user.permissions.length; permit++) {
            if (Authentication.user.permissions[permit].permission == "delete") {
                $scope.deletePermit = true;
                break;
            }
        }

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/


        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.$on('organizationChanged', function () {

        });

        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {
            $scope.editOrganization();
        });

        $scope.$on("Biin: On Object Created", function () {
            $scope.createOrganization();
        });

        $scope.$on("Biin: On Object Deleted", function (event, index) {
            $scope.removeOrganization(index);
        });

        $scope.$on('changeOrganizationImage',function(scope,newPicture){
            $scope.objectsSidebarService.selectedObject.media[0]=newPicture;
        });

        if (!Authentication.user) {
            $location.path('/');
        }

        $scope.saveOrganization = function () {
            if ($scope.objectsSidebarService.selectedObject == null)
                return;

            if (!$scope.isAnalazingOrg) {
                if (isOrganizationDirty()) {
                    var currentOrganization = $scope.objectsSidebarService.selectedObject;
                    currentOrganization.isUsingBrandColors = '1';

                    $scope.prevSaveOrganization = jQuery.extend({}, currentOrganization);
                    $scope.isAnalazingOrg = false;

                    currentOrganization.accountIdentifier = Authentication.user.accountIdentifier;
                    currentOrganization.isDeleted = 0;

                    $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization.identifier, {model: currentOrganization}).success(function (data, status) {
                        if (status === 200) {
                            $scope.succesSaveShow = true;
                        } else
                            $scope.errorSaveShow = true;
                    });
                }
                $scope.isAnalazingOrg = false;
            }
        };

        //Edit an site
        $scope.editOrganization = function () {
            $scope.prevSaveOrganization = jQuery.extend({}, $scope.objectsSidebarService.selectedObject);
        };

        //Push a new organization in the list
        $scope.createOrganization = function () {
            //Get the Mayor from server
            swal({   title: "Su organización se esta creando",  type: "info",   showConfirmButton: false });
            $http.put(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + Authentication.user.accountIdentifier).success(function (org, status) {
                if (status == 201 || status == 200) {
                    $scope.organizationService.organizationsList.push(org);
                    $scope.objectsSidebarService.setObjects($scope.organizationService.organizationsList);
                    $scope.objectsSidebarService.selectedObject = $scope.organizationService.organizationsList[$scope.organizationService.organizationsList.indexOf(org)];
                    setTimeout(function(){
                        swal.close();
                    },2000);
                } else {
                    displayErrorMessage(org, "Organizations Creation", status);
                }
            });
        };


        // Confirm before deleting organization
        $scope.deleteOrganization = function(message, selectedObject) {
            var translatedTexts  = $translate.instant(["GENERIC.DELETE_ORGANIZATION_TITLE","GENERIC.DELETE_ORGANIZATION_CONFIRMATION","GENERIC.DELETE","GENERIC.CANCEL"]);

            swal({
                title: translatedTexts["GENERIC.DELETE_ORGANIZATION_TITLE"],
                text: translatedTexts["GENERIC.DELETE_ORGANIZATION_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#DD6B55",
                confirmButtonText: translatedTexts["GENERIC.DELETE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                $scope.removeOrganization($scope.objectsSidebarService.objects.indexOf(selectedObject));
            });
        };

        //Remove showcase at specific position
        $scope.removeOrganization = function (index) {
            var translatedTexts  = $translate.instant(["ORGANIZATION.DELETED_TEXT","GENERIC.DELETED"]);
            var id = $scope.objectsSidebarService.objects[index].identifier;
            $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + id).success(function (data) {
                $scope.organizationService.removeOrganization(id);
                $scope.objectsSidebarService.objects.splice(index,1);
                swal(translatedTexts["GENERIC.DELETED"], translatedTexts["ORGANIZATION.DELETED_TEXT"], "success");
                /*if($scope.objectsSidebarService.selectedObject.identifier == id){
                    $scope.objectsSidebarService.selectedObject = null;
                }*/
            });
        };


        //Indicate if an organization data is changed
        var isOrganizationDirty = function () {
            $scope.isAnalazingOrg = true;
            var propertiesToCheck = ["name", "brand", "description", "extraInfo","isPublished","primaryColor","secondaryColor","hasNPS"];
            var foundChange = false;
            if ($scope.prevSaveOrganization !== null) {
                for (var i = 0; i < propertiesToCheck.length && !foundChange; i++) {
                    foundChange = $scope.objectsSidebarService.selectedObject[propertiesToCheck[i]] !== $scope.prevSaveOrganization[propertiesToCheck[i]];
                }
            }
            return foundChange;
        };

        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.editOrganization(0);
        }
        $scope.loadingService.isLoading = false;


        $scope.toggleIsPublished = function(){
            $scope.objectsSidebarService.selectedObject.isPublished = !$scope.objectsSidebarService.selectedObject.isPublished;
        };

        $scope.toggleNPS = function(){
            $scope.objectsSidebarService.selectedObject.hasNPS = $scope.objectsSidebarService.selectedObject.hasNPS == "1"? "0":"1";
        };
    }
})();

/**
 * Created by Ivan on 10/22/15.
 */
(function() {
    'use strict';

    angular
        .module('organization')
        .directive('uploadOrganizationImage', uploadOrganizationImage);
        uploadOrganizationImage.$inject = ['$rootScope','Authentication','ObjectsSidebar'];
    function uploadOrganizationImage($rootScope,Authentication,ObjectsSidebar){
        return{
            restrict:'A',
            link:function(scope, element, attrs){
                var $inputFileElement=$(attrs['uploadOrganizationImage']);

                //Change event when an image is selected
                $inputFileElement.on('change',function(){
                    console.log("Change beginning the upload");

                    var files = $inputFileElement[0].files;
                    var formData = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        var mediaFile = files[i];
                        mediaFile.originalFilename=files[i].name;
                        formData.append('file', mediaFile);
                    }

                    //Upload The media information

                    //scope.loadingImagesChange(true);
                    // now post a new XHR request
                    if(formData.get('file')){
                        var xhr = new XMLHttpRequest();

                        var organization= ObjectsSidebar.selectedObject.identifier;

                        xhr.open('POST', ApplicationConfiguration.applicationBackendURL +'api/organizations/'+organization+"/image");
                        xhr.setRequestHeader('accountidentifier',Authentication.user.accountIdentifier);
                        xhr.onload = function (data) {
                            if (xhr.status === 200) {
                                var obj= $.parseJSON(xhr.response);

                                $rootScope.$broadcast("changeOrganizationImage",obj.data);

                                console.log('all done: ' + xhr.status);
                                //scope.loadingImagesChange(false);
                            } else {
                                console.log('Something went terribly wrong...');
                            }
                        };

                        xhr.upload.onprogress = function (event) {
                            if (event.lengthComputable) {
                                var complete = (event.loaded / event.total * 100 | 0);
                                //progress.value = progress.innerHTML = complete;
                            }
                        };
                        xhr.send(formData);
                    }
                })
                //Click event of the style button
                $(element[0]).on('click touch',function(e){
                    $inputFileElement.trigger('click');
                });
            }
        }
    }
})();

'use strict';

// Setting up route
angular.module('page').config(['$stateProvider',
  function($stateProvider) {
    // Users state routing
    $stateProvider.
    state('page', {
      url: '/page',
      templateUrl: 'modules/page/views/page.client.view.html'
    });
  }
]);

/**=========================================================
 * Module: demo-panels.js
 * Provides a simple demo for panel actions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['$scope', '$timeout'];
    function PanelsCtrl($scope, $timeout) {

        activate();

        ////////////////

        function activate() {

          // PANEL COLLAPSE EVENTS
          // ----------------------------------- 

          // We can use panel id name for the boolean flag to [un]collapse the panel
          $scope.$watch('panelDemo1',function(newVal){
              
              console.log('panelDemo1 collapsed: ' + newVal);

          });


          // PANEL DISMISS EVENTS
          // ----------------------------------- 

          // Before remove panel
          $scope.$on('panel-remove', function(event, id, deferred){
            
            console.log('Panel #' + id + ' removing');
            
            // Here is obligatory to call the resolve() if we pretend to remove the panel finally
            // Not calling resolve() will NOT remove the panel
            // It's up to your app to decide if panel should be removed or not
            deferred.resolve();
          
          });

          // Panel removed ( only if above was resolved() )
          $scope.$on('panel-removed', function(event, id){

            console.log('Panel #' + id + ' removed');

          });


          // PANEL REFRESH EVENTS
          // ----------------------------------- 

          $scope.$on('panel-refresh', function(event, id) {
            var secs = 3;
            
            console.log('Refreshing during ' + secs +'s #'+id);

            $timeout(function(){
              // directive listen for to remove the spinner 
              // after we end up to perform own operations
              $scope.$broadcast('removeSpinner', id);
              
              console.log('Refreshed #' + id);

            }, 3000);

          });

          // PANELS VIA NG-REPEAT
          // ----------------------------------- 

          $scope.panels = [
            {
              id: 'panelRepeat1',
              title: 'Panel Title 1',
              body: 'Nulla eget lorem leo, sit amet elementum lorem. '
            },
            {
              id: 'panelRepeat2',
              title: 'Panel Title 2',
              body: 'Nulla eget lorem leo, sit amet elementum lorem. '
            },
            {
              id: 'panelRepeat3',
              title: 'Panel Title 3',
              body: 'Nulla eget lorem leo, sit amet elementum lorem. '
            }
          ];
        }

    } //PanelsCtrl

})();


/**=========================================================
 * Collapse panels * [panel-collapse]
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelCollapse', panelCollapse);

    function panelCollapse () {
        var directive = {
            controller: Controller,
            restrict: 'A',
            scope: false
        };
        return directive;
    }

    Controller.$inject = ['$scope', '$element', '$timeout', '$localStorage'];
    function Controller ($scope, $element, $timeout, $localStorage) {
      var storageKeyName = 'panelState';

      // Prepare the panel to be collapsible
      var $elem   = $($element),
          parent  = $elem.closest('.panel'), // find the first parent panel
          panelId = parent.attr('id');

      // Load the saved state if exists
      var currentState = loadPanelState( panelId );
      if ( typeof currentState !== 'undefined') {
        $timeout(function(){
            $scope[panelId] = currentState; },
          10);
      }

      // bind events to switch icons
      $element.bind('click', function(e) {
        e.preventDefault();
        savePanelState( panelId, !$scope[panelId] );

      });
  
      // Controller helpers
      function savePanelState(id, state) {
        if(!id) return false;
        var data = angular.fromJson($localStorage[storageKeyName]);
        if(!data) { data = {}; }
        data[id] = state;
        $localStorage[storageKeyName] = angular.toJson(data);
      }
      function loadPanelState(id) {
        if(!id) return false;
        var data = angular.fromJson($localStorage[storageKeyName]);
        if(data) {
          return data[id];
        }
      }
    }

})();

/**=========================================================
 * Dismiss panels * [panel-dismiss]
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelDismiss', panelDismiss);

    function panelDismiss () {

        var directive = {
            controller: Controller,
            restrict: 'A'
        };
        return directive;

    }

    Controller.$inject = ['$scope', '$element', '$q', 'Utils'];
    function Controller ($scope, $element, $q, Utils) {
      var removeEvent   = 'panel-remove',
          removedEvent  = 'panel-removed';

      $element.on('click', function (e) {
        e.preventDefault();

        // find the first parent panel
        var parent = $(this).closest('.panel');

        removeElement();

        function removeElement() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          
          // Communicate event destroying panel
          $scope.$emit(removeEvent, parent.attr('id'), deferred);
          promise.then(destroyMiddleware,function(resp){
              console.error(resp);
          });
        }

        // Run the animation before destroy the panel
        function destroyMiddleware() {
          if(Utils.support.animation) {
            parent.animo({animation: 'bounceOut'}, destroyPanel);
          }
          else destroyPanel();
        }

        function destroyPanel() {

          var col = parent.parent();
          parent.remove();
          // remove the parent if it is a row and is empty and not a sortable (portlet)
          col
            .filter(function() {
            var el = $(this);
            return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
          }).remove();

          // Communicate event destroyed panel
          $scope.$emit(removedEvent, parent.attr('id'));

        }

      });
    }
})();



/**=========================================================
 * Refresh panels
 * [panel-refresh] * [data-spinner="standard"]
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelRefresh', panelRefresh);

    function panelRefresh () {
        var directive = {
            controller: Controller,
            restrict: 'A',
            scope: false
        };
        return directive;

    }

    Controller.$inject = ['$scope', '$element'];
    function Controller ($scope, $element) {
      var refreshEvent   = 'panel-refresh',
          whirlClass     = 'whirl',
          defaultSpinner = 'standard';

      // catch clicks to toggle panel refresh
      $element.on('click', function (e) {
        e.preventDefault();

        var $this   = $(this),
            panel   = $this.parents('.panel').eq(0),
            spinner = $this.data('spinner') || defaultSpinner
            ;

        // start showing the spinner
        panel.addClass(whirlClass + ' ' + spinner);

        // Emit event when refresh clicked
        $scope.$emit(refreshEvent, panel.attr('id'));

      });

      // listen to remove spinner
      $scope.$on('removeSpinner', removeSpinner);

      // method to clear the spinner when done
      function removeSpinner (ev, id) {
        if (!id) return;
        var newid = id.charAt(0) === '#' ? id : ('#'+id);
        angular
          .element(newid)
          .removeClass(whirlClass);
      }
    }
})();



/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels. 
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('paneltool', paneltool);

    paneltool.$inject = ['$compile', '$timeout'];
    function paneltool ($compile, $timeout) {
        var directive = {
            link: link,
            restrict: 'E',
            scope: false
        };
        return directive;

        function link(scope, element, attrs) {

          var templates = {
            /* jshint multistr: true */
            collapse:'<a href="#" panel-collapse="" tooltip="Collapse Panel" ng-click="{{panelId}} = !{{panelId}}"> \
                        <em ng-show="{{panelId}}" class="fa fa-plus"></em> \
                        <em ng-show="!{{panelId}}" class="fa fa-minus"></em> \
                      </a>',
            dismiss: '<a href="#" panel-dismiss="" tooltip="Close Panel">\
                       <em class="fa fa-times"></em>\
                     </a>',
            refresh: '<a href="#" panel-refresh="" data-spinner="{{spinner}}" tooltip="Refresh Panel">\
                       <em class="fa fa-refresh"></em>\
                     </a>'
          };

          var tools = scope.panelTools || attrs;
      
          $timeout(function() {
            element.html(getTemplate(element, tools )).show();
            $compile(element.contents())(scope);
            
            element.addClass('pull-right');
          });
  
          function getTemplate( elem, attrs ){
            var temp = '';
            attrs = attrs || {};
            if(attrs.toolCollapse)
              temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')) );
            if(attrs.toolDismiss)
              temp += templates.dismiss;
            if(attrs.toolRefresh)
              temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
            return temp;
          }
        }// link
    } 

})();

/**=========================================================
 * Drag and drop any panel based on jQueryUI portlets
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('portlet', portlet);

    portlet.$inject = ['$timeout', '$localStorage'];
    function portlet ($timeout, $localStorage) {
      var storageKeyName = 'portletState';

      return {
        restrict: 'A',
        link: link
      };

      /////////////

      function link(scope, element) {
          
        // not compatible with jquery sortable
        if(!$.fn.sortable) return;

        element.sortable({
          connectWith:          '[portlet]', // same like directive 
          items:                'div.panel',
          handle:               '.portlet-handler',
          opacity:              0.7,
          placeholder:          'portlet box-placeholder',
          cancel:               '.portlet-cancel',
          forcePlaceholderSize: true,
          iframeFix:            false,
          tolerance:            'pointer',
          helper:               'original',
          revert:               200,
          forceHelperSize:      true,
          update:               savePortletOrder,
          create:               loadPortletOrder
        });

      }


      function savePortletOrder(event/*, ui*/) {
        var self = event.target;
        var data = angular.fromJson($localStorage[storageKeyName]);
        
        if(!data) { data = {}; }

        data[self.id] = $(self).sortable('toArray');

        if(data) {
          $timeout(function() {
            $localStorage[storageKeyName] = angular.toJson(data);
          });
        }
      }

      function loadPortletOrder(event) {
        var self = event.target;
        var data = angular.fromJson($localStorage[storageKeyName]);

        if(data) {
          
          var porletId = self.id,
              panels   = data[porletId];

          if(panels) {
            var portlet = $('#'+porletId);
            
            $.each(panels, function(index, value) {
               $('#'+value).appendTo(portlet);
            });
          }

        }
      }

    }

})();
 
(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>',
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 3000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**
 * Created by Ivan on 8/19/15.
 */
'use strict';

// Setting up route
angular.module('dashboard').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.profile', {
                url: '/profile',
                templateUrl: 'modules/profile/views/profile.client.view.html',
                resolve: {
                    permissions: function(Permission) {
                        return Permission.getPermissions();
                    },
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            });
        /*.
         state('page.signup', {
         url: '/signup',
         templateUrl: 'modules/users/views/authentication/signup.client.view.html'
         }).
         state('page.forgot', {
         url: '/password/forgot',
         templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
         }).
         state('page.reset-invalid', {
         url: '/password/reset/invalid',
         templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
         }).
         state('page.reset-success', {
         url: '/password/reset/success',
         templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
         }).
         state('page.reset', {
         url: '/password/reset/:token',
         templateUrl: 'modules/users/views/password/reset-password.client.view.html'
         }).
         state('app.password', {
         url: '/settings/password',
         templateUrl: 'modules/users/views/settings/change-password.client.view.html'
         }).
         state('app.profile', {
         url: '/settings/profile',
         templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
         }).
         state('app.accounts', {
         url: '/settings/accounts',
         templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
         });*/
    }
]);

/**
 * Created by Ivan on 8/19/15.
 */
/**=========================================================
 * Module: profile.js
 * Profile management for biin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$http', '$state', '$scope', 'Authentication', 'toaster', '$location', 'Organization','Loading', 'ObjectsSidebar'];
    function ProfileController($http, $state, $scope, Authentication, toaster, $location, Organization, Loading, ObjectsSidebar) {
        var vm = this;
        $scope.organizationService = Organization;
        $scope.objectsSidebarService = ObjectsSidebar;

        if (!Authentication.user) {
            $location.path('/');
        }
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.saveInformation = function () {
            if (typeof($scope.profile) !== 'undefined' && isProfileDirty()) {//If is Profile Dirty
                $http.put('api/account', {model: $scope.profile}).success(function (data, status) {
                    if (status === 200) {
                        if (data.needToRelog)
                            window.location.href = '/auth/signout';
                        else{
                            $scope.profileCopy = $.extend(true,{},$scope.profile);
                            toaster.pop('success', '', 'Your information has been saved');
                        }
                    } else
                        toaster.pop('error', 'Error', 'Your information has not been saved');
                }).error(function () {
                    toaster.pop('error', 'Error', 'Your information has not been saved');
                });
            }
        };

        var isProfileDirty = function () {
            return !_.isEqual($scope.profile, $scope.profileCopy);
        };

        $scope.$on('changeProfileImage', function(scope,image){
            $scope.profile.profilePhoto=image+ '?' + new Date().getTime();

            //Apply the changes
            $scope.$digest();
            $scope.$apply();
        });

        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $http.get("/api/account").success(function (data) {
                $scope.profile = data.data;
                $scope.profileCopy = $.extend(true,{},data.data);
                $scope.loadingService.isLoading = false;
            });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('profile')
        .directive('uploadProfileImage', uploadProfileImage);
    uploadProfileImage.$inject = ['$rootScope','Authentication','ObjectsSidebar'];
    function uploadProfileImage($rootScope,Authentication,ObjectsSidebar){
        return{
            restrict:'A',
            link:function(scope, element, attrs){
                var $inputFileElement=$(attrs['uploadProfileImage']);

                //Change event when an image is selected
                $inputFileElement.on('change',function(){
                    console.log("Change beginning the upload");

                    var files = $inputFileElement[0].files;
                    var formData = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        var mediaFile = files[i];
                        mediaFile.originalFilename=files[i].name;
                        formData.append('file', mediaFile);
                    }

                    //Upload The media information

                    //scope.loadingImagesChange(true);
                    // now post a new XHR request
                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', ApplicationConfiguration.applicationBackendURL + 'api/imageProfile');
                    xhr.setRequestHeader('accountidentifier', Authentication.user.accountIdentifier);
                    xhr.setRequestHeader('name', Authentication.user.name);
                    xhr.onload = function (data) {
                        if (xhr.status === 200) {
                            var obj= $.parseJSON(xhr.response);

                            $rootScope.$broadcast("changeProfileImage",obj.data);
                            //scope.changeProfileImage(obj.data);

                            console.log('all done: ' + xhr.status);
                            //scope.loadingImagesChange(false);
                        } else {
                            console.log('Something went terribly wrong...');
                        }
                    };

                    xhr.upload.onprogress = function (event) {
                        if (event.lengthComputable) {
                            var complete = (event.loaded / event.total * 100 | 0);
                            //progress.value = progress.innerHTML = complete;
                        }
                    };

                    xhr.send(formData);

                });
                //Click event of the style button
                $(element[0]).on('click touch',function(e){
                    $inputFileElement.trigger('click');
                });
            }
        }
    }
})();

/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage){

      // Global Settings
      // ----------------------------------- 
      $rootScope.app = {
        name: 'Biin',
        description: 'Biin Content Management System',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: 'themes/theme-e.css'
            //theme: null
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
      };

      // Setup the layout mode
      //$rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

/**
 * Created by Ivan on 8/27/15.
 */
'use strict';

// Setting up route
angular.module('showcases').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.showcases', {
                url: '/showcases',
                templateUrl: 'modules/showcases/views/showcases.client.view.html',
                resolve: {
                    permissions: function(Permission) {
                        return Permission.getPermissions();
                    },
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            });
    }
]);

/**=========================================================
 * Module: showcases.controller.js
 * controller for the showcases page
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('showcases')
        .controller('ShowcasesController', ShowcasesController);

    ShowcasesController.$inject = ['$http', '$scope', '$translate', 'Authentication', 'Organization', 'ObjectsSidebar','ElementsService','BiinsService','Loading'];
    function ShowcasesController($http, $scope, $translate, Authentication, Organization, ObjectsSidebar,ElementsService,BiinsService,Loading) {
        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.objectsSidebarService = ObjectsSidebar;
        }
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;



        /**=============================================================================================================
         * ObjectsSidebar Configuration
         =============================================================================================================*/

        $scope.sidebarTemplate =
            "<div class='col-md-3 thumbListImage'>" +
            "<img ng-if='item.elements.length == 0  || item.elements[0].media.length == 0 ' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
            "<img ng-if='item.elements[0].media.length>0' ng-src='{{item.elements[0].media[0].url}}'/>" +
            "</div>" +
            "<div class='col-md-9 leftInformationArea'>" +
            "<label class='oneRowTitle'>{{item.name}}</label>" +
            /*"<div class='btnShowcasePreview icon-round-control btn-on-hover'>" +
            "<div class='icon icon-arrange-1'></div>" +
            "</div>" +*/
            "</div>";
            /*"<div ng-click=\"deleteItem(objectsSidebarService.objects.indexOf(item),$event)\" class=\"icon-round-control btnDelete  btn-danger btn-on-hover\">" +
            "<i class=\"fa fa-close\"></i>" +
            "</div>";*/
        $scope.objectsSidebarService.template = $scope.sidebarTemplate;

        /**=============================================================================================================
         * Events Listeners
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.$on('organizationChanged', function () {
            //Get list of showcases
            $scope.loadingService.isLoading = true;
            $http.get(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/showcases').success(function (data) {
                $scope.objectsSidebarService.setObjects(data.data);
                $scope.objectsSidebarService.loadedInformation = true;
                $scope.showcasePrototype = data.prototypeObj;
                $scope.showcasePrototypeBkp = $.extend(true, {}, data.prototypeObj);
            });

            $http.get(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/sites').success(function (data) {
                $scope.sites = data.data.sites;
                $scope.sitesBooleanArray = [];
                for(var i= 0; i < $scope.sites.length; i++){
                    $scope.sitesBooleanArray.push(false);
                }
            });

            //Get the List of Elements
            ElementsService.getList($scope.organizationService.selectedOrganization.identifier).then(function (promise) {
                $scope.elements = promise.data.data.elements;
            });

            //Get the List of Biins
            BiinsService.getList($scope.organizationService.selectedOrganization.identifier).then(function(promise){
                $scope.biinSite = promise.data.data;
            });
        });

        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {
            $scope.sitesBooleanArray = [];
            for(var i= 0; i < $scope.sites.length; i++){
                $scope.sitesBooleanArray.push($scope.isShowcaseAssigned($scope.sites[i],objectClicked));
            }
        });

        $scope.$on("Biin: On Object Created", function () {
            $scope.create();
        });

        /*$scope.$on("Biin: On Object Deleted", function (event, index) {
            $scope.removeShowcaseAt(index);
        });*/

        /**=============================================================================================================
         * Variables
         =============================================================================================================*/
        $scope.slider1 = '50';

        /**=============================================================================================================
         * Self called functions
         =============================================================================================================*/
        //Get list of showcases
        $http.get(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/showcases').success(function (data) {
            $scope.objectsSidebarService.setObjects(data.data);
            $scope.showcasePrototype = data.prototypeObj;
            $scope.showcasePrototypeBkp = $.extend(true, {}, data.prototypeObj);
            $scope.loadingService.isLoading = false;
        });

        $http.get(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/sites').success(function (data) {
            $scope.sites = data.data.sites;
            $scope.sitesBooleanArray = [];
            for(var i= 0; i < $scope.sites.length; i++){
                $scope.sitesBooleanArray.push(false);
            }
        });

        //Get the List of Elements
        ElementsService.getList($scope.organizationService.selectedOrganization.identifier).then(function (promise) {
            $scope.elements = promise.data.data.elements;
        });

        //Get the List of Biins
        BiinsService.getList($scope.organizationService.selectedOrganization.identifier).then(function(promise){
            $scope.biinSite = promise.data.data;
        });



        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/


        //Push a new showcase in the list
        $scope.create = function () {
            //Create a new Showcase
            swal({   title: "Su vitrina se esta creando",  type: "info",   showConfirmButton: false });
            $http.post(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + "/showcases").success(function (showcase, status) {
                if (status == 201) {
                    $scope.objectsSidebarService.objects.push(showcase);
                    setTimeout(function(){
                        swal.close();
                    },2000);
                }
            });

        };

        $scope.deleteShowcase = function(message, selectedObject) {
            var translatedTexts  = $translate.instant(["GENERIC.DELETE_SHOWCASE_TITLE","GENERIC.DELETE_SHOWCASE_CONFIRMATION","GENERIC.DELETE","GENERIC.CANCEL"]);

            swal({
                title: translatedTexts["GENERIC.DELETE_SHOWCASE_TITLE"],
                text: translatedTexts["GENERIC.DELETE_SHOWCASE_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#DD6B55",
                confirmButtonText: translatedTexts["GENERIC.DELETE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                $scope.removeShowcaseAt($scope.objectsSidebarService.objects.indexOf(selectedObject));
            });

        };

        //Remove showcase at specific position
        $scope.removeShowcaseAt = function (index) {

            var translatedTexts  = $translate.instant(["SHOWCASE.DELETED_TEXT","GENERIC.DELETED"]);
            var showcaseId = $scope.objectsSidebarService.objects[index].identifier;
            if ($scope.objectsSidebarService.selectedObject == $scope.objectsSidebarService.objects[index]) {
                $scope.objectsSidebarService.selectedObject = null;
            }

            $scope.objectsSidebarService.objects.splice(index, 1);
            swal(translatedTexts["GENERIC.DELETED"], translatedTexts["SHOWCASE.DELETED_TEXT"], "success");
            //TODO: BUG THIS METHOD IS RETURNING ERROR
            $http.delete(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/showcases/' + showcaseId).success(function (data) {
                    if (data.state == "success") {
                        //Todo: implement a pull of messages
                    }
                }
            );

        };

        $scope.hasValidElements = function(selectedShowcase) {
            var validElement = _.findWhere(selectedShowcase, {isReady: 1});
            if (validElement)
                return true;
            else
                return false;
        }

        //Check min data has been filled
        $scope.hasMissingData = function() {

            // Don't do anything if there is no selected element
            if ($scope.objectsSidebarService.selectedObject == null)
                return;

            var missingMinData = false;

            //Check if required data is ready for app
            if ($scope.objectsSidebarService.selectedObject.name == null) {
                $scope.objectsSidebarService.selectedObject.name = "";
                missingMinData = true;
            }

            else if ($scope.objectsSidebarService.selectedObject.name.trim() === ''){
                missingMinData = true;
            }

            /*if ($scope.objectsSidebarService.selectedObject.description == null) {
                $scope.objectsSidebarService.selectedObject.description = "";
                missingMinData = true;
            }

            else if ($scope.objectsSidebarService.selectedObject.description.trim() === ''){
                missingMinData = true;
            }*/

            if ($scope.objectsSidebarService.selectedObject.elements.length === 0){
                missingMinData = true;
            }

            else if (!$scope.hasValidElements($scope.objectsSidebarService.selectedObject.elements)) {
                missingMinData = true;
            }

            return missingMinData;
        };

        //Save detail model object
        $scope.save = function () {

            //Save showcases
            for(var i = 0; i< $scope.sites.length; i++){
                for(var j = 0; j<$scope.sites[i].showcases.length;j++){

                    var showcaseIdentifier = $scope.sites[i].showcases[j].showcaseIdentifier;
                    var elements = [];
                    var index = -1;

                    for(var k = 0; k < $scope.objectsSidebarService.objects.length; k++){
                        if($scope.objectsSidebarService.objects[k].identifier == showcaseIdentifier){
                            index = k;
                            break;
                        }
                    }
                    if(index > -1){
                        for(k = 0; k < $scope.objectsSidebarService.objects[index].elements.length; k++) {
                            elements.push({identifier:$scope.objectsSidebarService.objects[index].elements[k].elementIdentifier});
                        }
                    }
                    $scope.sites[i].showcases[j].elements=elements;
                }
            }

            if ($scope.hasMissingData()) {
                $scope.objectsSidebarService.selectedObject.isReady = 0;
            }else {
                $scope.objectsSidebarService.selectedObject.isReady = 1;
            }

            $scope.objectsSidebarService.selectedObject.isDeleted = 0;

            $http.put(ApplicationConfiguration.applicationBackendURL +'api/showcases/' + $scope.objectsSidebarService.selectedObject.identifier, {model: $scope.objectsSidebarService.selectedObject}).success(function (data) {
                if ("replaceModel" in data) {
                    $scope.objectsSidebarService.selectedObject = data.replaceModel;
                    $scope.showcasePrototype = $.extend(true, {}, $scope.showcasePrototypeBkp);
                }
            });
            $http.post(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/site/showcases', {
                model: {
                    identifier: $scope.organizationService.selectedOrganization.identifier,
                    sites: $scope.sites
                }
            }).success(function (data, status) {

            });
        };


        $scope.filteredElements = function ( element ) {
            var index = -1;
            if($scope.objectsSidebarService.selectedObject.elements){
                for(var i = 0; i < $scope.objectsSidebarService.selectedObject.elements.length; i++){
                    if($scope.objectsSidebarService.selectedObject.elements[i].elementIdentifier == element.elementIdentifier){
                        index = i;
                        break;
                    }
                }
            }

            return  index == -1;
        };

        //Remove an element of a Showcase
        $scope.removeElementAt = function (index) {
            $scope.objectsSidebarService.selectedObject.elements.splice(index, 1);
        };

        //Get the first element by position
        $scope.getFirstElementByPosition = function (element) {
            var foundPosition = 0;
            if (element.objects.length === 1)
                return element.objects[0];
            else {
                var foundFirst = false;
                for (var i = 0; i < element.objects.length && foundFirst === false; i++) {
                    if (eval(element.objects[i].position) === 1) {
                        foundFirst = true;
                        foundPosition = i;
                    }
                }
            }
            return element.objects[foundPosition];
        };
        $scope.isShowcaseAssigned = function( site, showcase ){
            var index = -1;
            for (var i = 0; i < site.showcases.length; i++) {
                if(site.showcases[i].showcaseIdentifier == showcase.identifier)
                {
                    index = i;
                    break;
                }
            }
            if( index > -1)
            {
                return "active";
            }
            return "";

        };

        $scope.sortShowcases = function(site ,showcase){
            return function(showcase){
                var index = -1;
                for (var i = 0; i < site.showcases.length; i++) {
                    if(site.showcases[i].showcaseIdentifier == showcase.identifier)
                    {
                        index = i;
                        break;
                    }
                }
                if(index > -1)
                {
                    return index;
                }
                else
                {
                    return site.showcases.length + $scope.objectsSidebarService.objects.indexOf(showcase);
                }}
        };

        $scope.setShowcaseAssigned = function ( site, showcase ) {
            var index = -1;
            for (var i = 0; i < site.showcases.length; i++) {
                if(site.showcases[i].showcaseIdentifier == showcase.identifier)
                {
                    index = i;
                    break;
                }
            }
            if( index > -1)
            {
                site.showcases.splice(index,1);
            }
            else
            {
                site.showcases.push({showcaseIdentifier:showcase.identifier});
            }
        };

        $scope.moveShowcaseDown = function ( site, showcase ) {
            var index;
            for (var i = 0; i < site.showcases.length; i++) {
                if(site.showcases[i].showcaseIdentifier == showcase.identifier)
                {
                    index = i;
                    break;
                }
            }
            if(index+1 < site.showcases.length){
                site.showcases.splice(index,1);
                site.showcases.splice(index+1,0,{showcaseIdentifier:showcase.identifier});
            }
        };

        $scope.moveShowcaseUp = function ( site, showcase ) {
            var index;
            for (var i = 0; i < site.showcases.length; i++) {
                if(site.showcases[i].showcaseIdentifier == showcase.identifier)
                {
                    index = i;
                    break;
                }
            }
            if(index >= 1){
                site.showcases.splice(index,1);
                site.showcases.splice(index-1,0,{showcaseIdentifier:showcase.identifier});
            }
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('showcases')
        .service('BiinsService', BiinsService);

    BiinsService.$inject = ['$http'];
    function BiinsService($http) {
        return {
            getList: function(organizationId){
                var promise = $http({method:'GET',url:ApplicationConfiguration.applicationBackendURL +'api/organizations/'+organizationId+'/biins'})
                    .success(function (data,status,headers,config){
                        return data;
                    }).error(function(data,status,headers,config){
                        return {"status":false};
                    });

                return promise;
            },
            saveList:function(organizationId,biinSite){
                var promise= $http({method:'POST',url:ApplicationConfiguration.applicationBackendURL +'api/organizations/'+organizationId+'/sites/biins', data:biinSite}).success(function(data,status,headers,config){
                    return data;
                }).error(function(data,status,headers,config){
                    return {"status":false};
                });

                return promise;
            }
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('showcases')
        .service('ElementsService', ElementsService);

    ElementsService.$inject = ['$http'];
    function ElementsService($http) {
        return {
            getList: function (organizationId) {
                var promise = $http({method:'GET', url:ApplicationConfiguration.applicationBackendURL +'api/organizations/'+organizationId+'/elements'})
                    .success(function (data, status, headers, config) {
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        return {"status": false};
                    });

                return promise;
            }
        };
    }
})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils', 'Authentication', 'Organization'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils, Authentication, Organization) {

        activate();

        ////////////////

        function activate() {
          var collapseList = [];

          $scope.authentication = Authentication;
          $scope.selectedOrganization = Organization.selectedOrganization;

          // demo: when switch from collapse to hover, close all items
          $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });

          //Load the selected Organization
          $rootScope.$watch(function(){
            return Organization.selectedOrganization
          }, function(newVal, oldVal){
            $scope.selectedOrganization = newVal;
          });

          // Load menu from json file
          // ----------------------------------- 

          SidebarLoader.getMenu(sidebarReady);
          
          function sidebarReady(items) {
            $scope.menu = items;
          }

          // Handle sidebar and collapse items
          // ----------------------------------
          
          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }
            
            $scope.lastEventFromChild = isChild($index);

            return true;
          
          };

          // Controller helpers
          // ----------------------------------- 

            // Check item and children active state
            function isActive(item) {

              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }
        
        } // activate
    }

})();

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope'];
    function UserBlockController($rootScope) {

        activate();

        ////////////////

        function activate() {
          $rootScope.user = {
            name:     'John',
            job:      'ng-developer',
            picture:  'app/img/user/02.jpg'
          };

          // Hides/show user avatar on sidebar
          $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
          };

          $rootScope.userBlockVisible = true;

          $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

            $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;

          });
        }
    }
})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar          
              sidebarAddBackdrop();

            }

          });

          scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {
            
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';
            
            $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }
        }
        
        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices 
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // ----------------------------------- 
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');
          
          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );
          
          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['Menus'];
    function SidebarLoader(Menus) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          onError = onError || function() { alert('Failure loading menu'); };
          
          var menu = Menus.getMenu('sidebar');

          if( menu )
            onReady( menu );
          else
            onError();

        }
    }
})();
/**
 * Created by Ivan on 8/27/15.
 */
'use strict';

// Setting up route
angular.module('sites').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.sites', {
                url: '/sites',
                templateUrl: 'modules/sites/views/sites.client.view.html',
                resolve: {
                    permissions: function(Permission) {
                        return Permission.getPermissions();
                    },
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            });
    }
]);

/**
 * Created by Ivan on 8/27/15.
 */
/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('sites')
        .controller('SitesController', SitesController);

    SitesController.$inject = ['$http', '$state','$timeout' ,'$scope','$translate', 'Authentication', 'Organization','Categories', 'ObjectsSidebar','Gallery','Loading'];
    function SitesController($http, $state, $timeout, $scope,$translate, Authentication, Organization,Categories, ObjectsSidebar,Gallery,Loading) {
        activate();

        function activate() {

            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.deletePermit = false;
            $scope.loadingService = Loading;
            $scope.loadingService.isLoading = true;

            for (var permit = 0; permit < Authentication.user.permissions.length; permit++) {
                if (Authentication.user.permissions[permit].permission == "delete") {
                    $scope.deletePermit = true;
                    break;
                }
            }

        }

        /**=============================================================================================================
         * ObjectsSidebar Configuration
         =============================================================================================================*/
        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.sidebarTemplate =
            "<div class='col-md-3 thumbListImage'>" +
            "<img ng-if='item.media.length == 0' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
            "<img ng-if='item.media.length>0' ng-src='{{item.media[0].url}}' pending-indicator='pending-indicator'/>"+
            "</div>"+
            "<div class='col-md-9 leftInformationArea'>"+
            "<label class='twoRowTitle'>{{item.title1}}</label>"+
            "<label class='twoRowSubtitle'>{{item.title2}}</label>"+
            "</div>";

        $scope.objectsSidebarService.template =$scope.sidebarTemplate;
        $scope.objectsSidebarService.isHidden = false;

        /**=============================================================================================================
         * Events Listeners
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.$on('organizationChanged',function(){
            $scope.loadingService.isLoading = true;
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            //Get the List of Objects
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/sites').success(function(data){
                var sites = data.data.sites;
                $scope.objectsSidebarService.setObjects(sites);
                $scope.loadingService.isLoading = false;
                if(sites.length > 0)
                    selectFirstSite(sites);
            });

            Gallery.getList($scope.organizationId).then(function(promise){
                $scope.galleries = promise.data.data;
            });
        });

        $scope.$on("Biin: On Object Clicked", function(event,objectClicked){
            //I know it's ugly and I don't like this approach, it should be other way to  validate if the tag field is
            // rendered to call this code
            //TODO: Change this implementation for another safer way!!!
            $timeout(function(){
                var siteSearchTag = $('#siteSearchTag');
                siteSearchTag.tagsinput("removeAll");
                for(var i=0;i< $scope.objectsSidebarService.selectedObject.searchTags.length;i++){
                    siteSearchTag.tagsinput("add",$scope.objectsSidebarService.selectedObject.searchTags[i]);
                }
            },100);

        });

        $scope.$on("Biin: On Object Created", function(){
            $scope.create();
        });

        $scope.$on("Biin: galleryUpdate", function(a, modalInfo){
            $scope.galleries=modalInfo.galleries;
        });

        /**=============================================================================================================
         * Variables
         =============================================================================================================*/

        //Init the the sites
        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;

        $scope.newTagField=[];

        //Loading images service property
        $scope.loadingImages =false;

        //Draggable Properties
        $scope.dragCategoryIndex =-1;
        $scope.dragGalleryIndex=-1;


        /**=============================================================================================================
         * Self called functions
         =============================================================================================================*/

        //Get the List of Sites
        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+ $scope.organizationService.selectedOrganization.identifier +'/sites').success(function(data){
            if(data.data) {
                $scope.objectsSidebarService.setObjects(data.data.sites);
                $scope.loadingService.isLoading = false;
                if(data.data.sites.length>0){
                    selectFirstSite(data.data.sites);
                }
            }
        });

        //Get the List of Categories
        Categories.getList().then(function(promise){
            $scope.categories = promise.data.data;
        });

        //Get the list of the gallery
        Gallery.getList($scope.organizationService.selectedOrganization.identifier).then(function(promise){
            $scope.galleries= promise.data.data;
        });

        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/

        var selectFirstSite = function( sites ) {

            $scope.objectsSidebarService.selectedObject = sites[0];
            //I know it's ugly and I don't like this approach, it should be other way to  validate if the tag field is
            // rendered to call this code
            //TODO: Change this implementation for another safer way!!!
            $timeout(function(){
                var siteSearchTag = $('#siteSearchTag');
                for(var i=0;i< $scope.objectsSidebarService.selectedObject.searchTags.length;i++){
                    siteSearchTag.tagsinput("add",$scope.objectsSidebarService.selectedObject.searchTags[i]);
                }
            },100);

        };

        //Return the categories of the sites
        $scope.ownCategories=function(){
            return $scope.objectsSidebarService.selectedObject.categories;
        };

        //Create a new Site
        $scope.create = function(){
            //Get the Mayor from server
            swal({   title: "Su local se esta creando",  type: "info",   showConfirmButton: false });
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+"/sites").success(function(site,status){
                if(status==201){

                    var siteSearchTag =$('#siteSearchTag');
                    siteSearchTag.tagsinput("removeAll");

                    var sites = $scope.objectsSidebarService.getObjects();
                    sites.push(site);
                    $scope.objectsSidebarService.setObjects(sites);
                    $scope.objectsSidebarService.setSelectedObject(site);
                    setTimeout(function(){
                        swal.close();
                    },2000);
                }
                else
                {
                    displayErrorMessage(site,"Sites Creation",status);
                }
            });
        };

        $scope.deleteSite = function(message, selectedObject) {

            var translatedTexts  = $translate.instant(["GENERIC.DELETE_SITE_TITLE","GENERIC.DELETE_SITE_CONFIRMATION","GENERIC.DELETE","GENERIC.CANCEL"]);

            swal({
                title: translatedTexts["GENERIC.DELETE_SITE_TITLE"],
                text: translatedTexts["GENERIC.DELETE_SITE_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#DD6B55",
                confirmButtonText: translatedTexts["GENERIC.DELETE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                $scope.removeSiteAt($scope.objectsSidebarService.objects.indexOf(selectedObject));
            });

        };

        //Remove site at specific position
        $scope.removeSiteAt = function(index){

            var sites = $scope.objectsSidebarService.getObjects();
            var siteIdToDelete = sites[index].identifier;
            var deleteSelectedObject = siteIdToDelete == $scope.objectsSidebarService.selectedObject.identifier;
            var translatedTexts  = $translate.instant(["SITES.DELETED_TEXT","GENERIC.DELETED"]);
            $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationId+'/sites/'+siteIdToDelete).success(
                function(data){
                    if(data.state=="success"){
                        swal(translatedTexts["GENERIC.DELETED"], translatedTexts["SITES.DELETED_TEXT"], "success");
                        sites.splice(index,1);
                        if(deleteSelectedObject){
                            $scope.objectsSidebarService.selectedObject = null;
                        }
                        $scope.objectsSidebarService.setObjects(sites);

                    }else{
                        console.error("Couldn't delete site");
                    }
                }
            );

        };

        //Check min data has been filled
        $scope.hasMissingData = function() {

            // Don't do anything if there is no selected element
            if ($scope.objectsSidebarService.selectedObject == null)
                return;

            var missingMinData = false;

            //Check if required data is ready for app
            if ($scope.objectsSidebarService.selectedObject.title1 == null) {
                $scope.objectsSidebarService.selectedObject.title1 = "";
                missingMinData = true;
            }

            else if ($scope.objectsSidebarService.selectedObject.title1.trim() === ''){
                $scope.objectsSidebarService.selectedObject.title1 = "";
                missingMinData = true;
            }

            if ($scope.objectsSidebarService.selectedObject.title2 == null) {
                $scope.objectsSidebarService.selectedObject.title2 = "";
                missingMinData = true;
            }

            else if ($scope.objectsSidebarService.selectedObject.title2.trim() === ''){
                $scope.objectsSidebarService.selectedObject.title2 = "";
                missingMinData = true;
            }

            if ($scope.objectsSidebarService.selectedObject.media.length == 0){
                missingMinData = true;
            }

            if ($scope.objectsSidebarService.selectedObject.country == null) {
                $scope.objectsSidebarService.selectedObject.country = "";
                missingMinData = true;
            }

            else if ($scope.objectsSidebarService.selectedObject.country.trim() === ''){
                $scope.objectsSidebarService.selectedObject.country = "";
                missingMinData = true;
            }

            if ($scope.objectsSidebarService.selectedObject.state == null) {
                $scope.objectsSidebarService.selectedObject.state = "";
                missingMinData = true;
            }

            else if ($scope.objectsSidebarService.selectedObject.state.trim() === ''){
                $scope.objectsSidebarService.selectedObject.state = "";
                missingMinData = true;
            }

            if ($scope.objectsSidebarService.selectedObject.city == null) {
                $scope.objectsSidebarService.selectedObject.city = "";
                missingMinData = true;
            }

            else if ($scope.objectsSidebarService.selectedObject.city.trim() === ''){
                $scope.objectsSidebarService.selectedObject.city = "";
                missingMinData = true;
            }

            if ($scope.objectsSidebarService.selectedObject.streetAddres == null) {
                $scope.objectsSidebarService.selectedObject.streetAddres = "";
                missingMinData = true;
            }

            else if ($scope.objectsSidebarService.selectedObject.streetAddres.trim() === ''){
                $scope.objectsSidebarService.selectedObject.streetAddres = "";
                missingMinData = true;
            }

            if($scope.objectsSidebarService.selectedObject.lat == 0 || $scope.objectsSidebarService.selectedObject.lng == 0) {
                missingMinData = true;
            }

            return missingMinData;
        };

        //Save detail model object
        $scope.save= function(){

            if ($scope.objectsSidebarService.selectedObject == null)
                return;

            var tags = $("#siteSearchTag").tagsinput('items');

            $scope.objectsSidebarService.selectedObject.searchTags = [];

            for(var i = 0; i < tags.length; i++){
                $scope.objectsSidebarService.selectedObject.searchTags.push(tags[i]);
            }

            if ($scope.hasMissingData()) {
                $scope.objectsSidebarService.selectedObject.isReady = 0;
            }

            else {
                $scope.objectsSidebarService.selectedObject.isReady = 1;
            }

            //$scope.objectsSidebarService.selectedObject.isReady = 0;

            $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/sites/'+$scope.objectsSidebarService.selectedObject.identifier,{model:$scope.objectsSidebarService.selectedObject}).success(function(data,status){
                if("replaceModel" in data){
                    $scope.objectsSidebarService.selectedObject = data.replaceModel;
                }
                if(data.state=="success")
                    $scope.succesSaveShow=true;
                /*else {
                    console.log("ERROR SAVING SITES: " + status);
                }*/
            });

        };

        // Function that limits in nutshell how many words can it be
        $scope.limitNutshell = function(){
            var value = $scope.objectsSidebarService.selectedObject.nutshell;

            if(value === null) {
                value = "";
            }

            value = value.trim();
            var words = value.split(" ");

            if(words.length > 8)
                words.splice(8, words.length-8);
            var sentence = "";

            for (var i = 0; i < words.length; i++) {
                sentence += words[i] + " ";
            }

            sentence = sentence.trim();
            $scope.objectsSidebarService.selectedObject.nutshell = sentence;
        };

        //Location Methods
        $scope.changeLocation=function(lat,lng){
            $scope.objectsSidebarService.selectedObject.lat=lat;
            $scope.objectsSidebarService.selectedObject.lng=lng;

            //Apply the changes
            $scope.$digest();
            $scope.$apply();
        };

        //Category return if contains a specific category
        $scope.containsCategory=function(category){
            if(typeof(_.findWhere($scope.objectsSidebarService.selectedObject.categories,{identifier:category.identifier}))!='undefined')
                return true;
            else
                return false;
        };


        //Change the state of the category relation with the Site
        $scope.updateSelectedCategories =function(category){
            var index =-1;
            var cat = _.findWhere($scope.objectsSidebarService.selectedObject.categories,{identifier:category.identifier});
            if(typeof(cat)!='undefined'){
                index=$scope.objectsSidebarService.selectedObject.categories.indexOf(cat);
            }

            if(index>=0)
                $scope.objectsSidebarService.selectedObject.categories.splice(index,1);
            else
                $scope.objectsSidebarService.selectedObject.categories.push(category);

        };

        //Remove the media object at specific index
        $scope.removeMediaAt=function(index){
            if($scope.objectsSidebarService.selectedObject.media.length>=index)
                $scope.objectsSidebarService.selectedObject.media.splice(index,1);
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){
  
      $translateProvider.useStaticFilesLoader({
          prefix : '/i18n/',
          suffix : '.json'
      });
      $translateProvider.preferredLanguage('es_AR');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);

    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
            'es_AR': 'Español',
            'en': 'English'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('page.signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('page.signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('page.forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('page.reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('page.reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('page.reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		}).
		state('app.password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		/*state('app.profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).*/
		state('app.accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		});
	}
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('click', function(){
            $timeout(function(){
              $window.dispatchEvent(new Event('resize'));
            });
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },
          
          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();
