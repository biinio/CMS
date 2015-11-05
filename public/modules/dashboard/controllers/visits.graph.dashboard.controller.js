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

    VisitsGraphController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization','GlobalFilters'];
    function VisitsGraphController($http, $state, $scope, Authentication, Organization,GlobalFilters) {
        var vm = this;
        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.globalFilters = GlobalFilters;
        }

        $scope.$on('organizationChanged',function(){
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.changeChartRange($scope.globalFilters.dateRange);
        });

        $scope.secondCriteriaChange = function(value)
        {
            $scope.getChartData($scope.globalFilters.dateRange);
        };

        $scope.firstCriteriaChange = function(value)
        {
            $scope.getChartData($scope.globalFilters.dateRange);
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


            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/notifications', {
                headers: {
                    filters : JSON.stringify(filters)
                }
            }).success(function(dataNotifications) {

                $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/visits', {
                    headers: {
                        filters : JSON.stringify(filters)
                    }
                }).success(function(data) {
                    var visits = [];
                    var notifications =[];
                    var keys = Object.keys(data);

                    var maxValue = 1;
                    for (var i = 0; i < keys.length; i++) {
                        var s = new Date(keys[i]);
                        visits.push({
                            x: s.getTime(),
                            y: data[keys[i]]
                        });
                        notifications.push({
                            x: s.getTime(),
                            y: dataNotifications[keys[i]]
                        });
                        if(data[keys[i]] > maxValue )
                            maxValue = data[keys[i]];
                    }
                        $scope.data = [{
                            values: visits,
                            key: 'visits',
                            color: '#006699',
                            area: true
                        },
                        {
                            values: notifications,
                            key: 'Notifications',
                            color: '#ffa500',
                            area: true
                        }];

                    $scope.options = {
                        chart: {
                            type: 'lineChart',
                            height: 250,
                            margin: {
                                top: 20,
                                right: 20,
                                bottom: 40,
                                left: 55
                            },
                            x: function(d) {
                                return d.x;
                            },
                            y: function(d) {
                                return d.y;
                            },
                            //useInteractiveGuideline: true,
                           /* dispatch: {
                                stateChange: function(e) {
                                    console.log("stateChange");
                                },
                                changeState: function(e) {
                                    console.log("changeState");
                                },
                                tooltipShow: function(e) {
                                    console.log("tooltipShow");
                                },
                                tooltipHide: function(e) {
                                    console.log("tooltipHide");
                                }
                            }, */
                            xAxis: {
                                axisLabel: 'Date',
                                tickFormat: function(d) {
                                    return d3.time.format('%d-%m-%y')(new Date(d));
                                },
                                showMaxMin:false,
                                axisLabelDistance: 30
                            },
                            yAxis: {
                            },
                            callback: function(chart) {
                                //console.log("!!! lineChart callback !!!");
                            },
                            forceY:[0,maxValue]
                        }
                    };
                });

            });
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData(days);
            $scope.currentDays = days;
        };
        $scope.changeChartRange(30);

    }
})();
