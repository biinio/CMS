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

    VisitsGraphController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization'];
    function VisitsGraphController($http, $state, $scope, Authentication, Organization) {
        var vm = this;
        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }

        $scope.$on('organizationChanged',function(){
            $scope.getChartData($scope.currentDays);
        });

        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.changeChartRange($scope.currentDays);
        });

        $scope.currentDays = 0;

        $scope.firstCriteria = "Visits";
        $scope.secondCriteria = "Notifications";

        $scope.secondCriteriaChange = function(value)
        {
            $scope.getChartData($scope.currentDays);
        };

        $scope.firstCriteriaChange = function(value)
        {
            $scope.getChartData($scope.currentDays);
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

            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/notifications', {
                headers: {
                    organizationid: $scope.organizationService.selectedOrganization.identifier,
                    endDate: getDateString(today),
                    startDate: getDateString(previusDate)
                }
            }).success(function(dataNotifications) {

                $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/visits', {
                    headers: {
                        organizationid: $scope.organizationService.selectedOrganization.identifier,
                        endDate: getDateString(today),
                        startDate: getDateString(previusDate)
                    }
                }).success(function(data) {
                    var visits = [];
                    var notifications =[];
                    var keys = Object.keys(data.data);

                    var maxValue = 1;
                    for (var i = 0; i < keys.length; i++) {
                        var s = new Date(keys[i]);
                        visits.push({
                            x: s.getTime(),
                            y: data.data[keys[i]]
                        });
                        notifications.push({
                            x: s.getTime(),
                            y: dataNotifications.data[keys[i]]
                        });
                        if(data.data[keys[i]] > maxValue )
                            maxValue = data.data[keys[i]];
                    }
                    if($scope.secondCriteria == "Notifications")
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
                    else
                        $scope.data = [{
                            values: visits,
                            key: 'visits',
                            color: '#006699',
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
                            dispatch: {
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
                            },
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
                                console.log("!!! lineChart callback !!!");
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
