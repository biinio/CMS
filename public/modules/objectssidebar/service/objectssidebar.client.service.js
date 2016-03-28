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
