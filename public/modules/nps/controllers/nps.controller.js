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

    NPSController.$inject = ['$http', '$state', '$scope', 'Authentication', 'toaster', '$location', 'Organization','ObjectsSidebar'];
    function NPSController($http, $state, $scope, Authentication, toaster, $location, Organization,ObjectsSidebar) {
        var vm = this;
        $scope.organizationService = Organization;

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/
        $scope.$on('organizationChanged', function () {
            $scope.isLoadingNPSData = true;
            $http.get(ApplicationConfiguration.applicationBackendURL + 'ratings/organization',{ headers:{organizationid:$scope.organizationService.selectedOrganization.identifier}}).success(function(data){
                $scope.isLoadingNPSData = false;
            });
        });


        if (!Authentication.user) {
            $location.path('/');
        }


        Date.prototype.addDays = function(days) {
            var dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        };

        Date.prototype.isSameDateAs = function(pDate) {
            return (
                this.getFullYear() === pDate.getFullYear() &&
                this.getMonth() === pDate.getMonth() &&
                this.getDate() === pDate.getDate()
            );
        };

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
        $scope.isLoadingNPSData = true;

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
                    $scope.isLoadingNPSData = false;
                }
            });
            resetNPS();
        }

        function updateNPSValues(data){

            resetNPS();

            if(Array.isArray(data) && data.length > 0){

                var dateArray = getDates((new Date()).addDays(-6),new Date() );

                for(var i = 0; i < dateArray.length; i++ ) {
                    for(var j = 0; j< data.length; j++){
                        if(data[j].date.isSameDateAs(dateArray[i])){
                            if(data[j].rating < 7){
                                $scope.detractorsQuantity ++;
                            } else if(data[j].rating < 9){
                                $scope.passiveQuantity ++;
                            }else{
                                $scope.promotersQuantity ++;
                            }
                        }
                    }
                }

                $scope.promotersPercentage = ($scope.promotersQuantity/data.length) * 100;
                $scope.passivePercentage = ($scope.passiveQuantity/data.length) * 100;
                $scope.detractorsPercentage = ($scope.detractorsQuantity/data.length) * 100;
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
                    if(data[j].date.isSameDateAs(dateArray[i])){
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
                    color: '#7777ff',
                    area: true      //area - set to true if you want this line to turn into a filled area chart.
                }
            ];
        }

        $scope.options = {
            chart: {
                type: 'lineChart',
                height: 138,
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
                    axisLabel: 'Date',
                    tickFormat: function(d) {
                        return d3.time.format('%d-%m-%y')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'NPS',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    //console.log("!!! lineChart callback !!!");
                }
            }
        };
    }
})();
