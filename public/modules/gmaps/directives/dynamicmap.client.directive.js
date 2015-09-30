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
                var zoom = eval(attrs['zoom']);
                var defPosition =new google.maps.LatLng(0 ,0);
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

                    google.maps.event.addDomListener(window, 'resize', function(){

                        //scope.changeLocation(newPosition.lat(),newPosition.lng());
                    });
                    google.maps.event.trigger(map, 'resize');
                }

                function errorCallback(err){
                    var coords ={latitude:local_lat,longitude: local_lng};
                    showPosition({coords:coords},1);
                    console.warn('ERROR(' + err.code + '): ' + err.message);
                }
                var local_lat =0;

                var local_lng=0;

                if(attrs['lat'] && attrs['lng']){
                    local_lat = eval(attrs['lat']);
                    local_lng = eval(attrs['lng']);
                }

                //Call get location
                if(local_lat==0&& local_lng==0)
                    getLocation();
                else{
                    var coords ={latitude:local_lat,longitude: local_lng};
                    showPosition({coords:coords});
                }
            }
        }
    }

})();
