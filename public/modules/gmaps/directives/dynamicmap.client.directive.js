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
