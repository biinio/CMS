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
