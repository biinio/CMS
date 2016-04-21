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

    NPSController.$inject = ['$http', '$state', '$scope', 'Authentication', 'Organization', 'GlobalFilters'];
    function NPSController($http, $state, $scope, Authentication, Organization, GlobalFilters) {

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/
        $scope.$on('organizationChanged', function () {
            getNPSData();
        });

        $scope.$on('Biin: Days Range Changed', function (scope, numberdays) {
            getNPSData();
        });

        $scope.$on('Biin: Site Changed', function (scope, site) {
            getNPSData();
        });


        if (!Authentication.user) {
            $location.path('/');
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

        activate();

        $scope.save = function () {
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
            $scope.organizationService = Organization;
            $scope.globalFilters = GlobalFilters;
            getNPSData();
            resetNPS();
        }

        function getNPSData() {
            var filters = {};
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;
            filters.siteId = $scope.globalFilters.selectedSite.identifier;

            $http.get(ApplicationConfiguration.applicationBackendURL + 'ratings/nps', {
                    headers: {
                        organizationid: $scope.organizationService.selectedOrganization.identifier,
                        filters : JSON.stringify(filters),
                        offset : new Date().getTimezoneOffset()
                    }
                }).success(function (data) {
                if (data.result == "1") {
                    updateNPSValues(data.data);
                }
            });
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
                    newComment.date = generateElapsedTimeString(data[i].date);
                    newComment.user = data[i].userIdentifier;
                    newComment.comment = data[i].comment == "Optional" || data[i].comment.trim() == ""  ? "No hay comentario" : data[i].comment;
                    newComment.rating = data[i].rating;
                    $scope.lastComments.push(newComment);
                }
                $scope.lastComments.reverse();
                $scope.lastComments = $scope.lastComments.splice(0,10);
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

        function resetNPS() {
            $scope.promotersQuantity = 0;
            $scope.passiveQuantity = 0;
            $scope.detractorsQuantity = 0;
            $scope.npsScore = 0;
            $scope.promotersPercentage = 0;
            $scope.passivePercentage = 0;
            $scope.detractorsPercentage = 0;
            $scope.lastComments = [];
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
                timeformat: '%d-%m-%y'
            },
            yaxis: {
                position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                tickColor: '#eee'
            },
            shadowSize: 0
        };
    }
})();
