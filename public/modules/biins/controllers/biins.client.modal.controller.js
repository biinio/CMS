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

