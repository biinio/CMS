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

          $scope.$on('organizationReady', function(){
            $scope.selectedOrganization = Organization.selectedOrganization;
          });

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
