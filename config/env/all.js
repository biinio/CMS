'use strict';

module.exports = {
    app: {
        title: 'Biin',
        description: 'Biin Content Management System',
        keywords: 'MongoDB, Express, AngularJS, Node.js'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'ludusy secret',
    sessionCollection: 'cmsSessions',
    MAGIC_PASSWORD: 'isaias123',
    assets: {
        lib: {
            css: [
                // 'public/lib/bootstrap/dist/css/bootstrap.css',
                // 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
            ],
            js: [
                'public/lib/jquery/dist/jquery.js',
                'public/lib/angular/angular.js',
                'public/lib/angular-route/angular-route.js',
                'public/lib/angular-cookies/angular-cookies.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-touch/angular-touch.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/ngstorage/ngStorage.js',
                'public/lib/angular-messages/angular-messages.js',
                'public/lib/angular-ui-utils/index.js',
                'public/lib/angular-ui-mask/dist/mask.js',
                'public/lib/angular-ui-event/dist/event.js',
                'public/lib/angular-ui-validate/dist/validate.js',
                'public/lib/angular-ui-indeterminate/dist/indeterminate.js',
                'public/lib/angular-ui-scrollpoint/dist/scrollpoint.js',
                'public/lib/angular-ui-scroll/dist/ui-scroll.js',
                'public/lib/angular-ui-uploader/dist/uploader.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-translate/angular-translate.js',
                'public/lib/angular-translate-loader-url/angular-translate-loader-url.js',
                'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                'public/lib/angular-translate-storage-local/angular-translate-storage-local.js',
                'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                'public/lib/oclazyload/dist/ocLazyLoad.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/angular-loading-bar/build/loading-bar.js',
                'public/lib/jquery.browser/dist/jquery.browser.js',
                'public/lib/angularjs-toaster/toaster.js',
                'public/lib/node-uuid/uuid.js',
                'public/lib/animo.js/animo.js',
                'public/lib/textAngular/dist/textAngular.js',
                'public/lib/textAngular/dist/textAngular-rangy.min.js',
                'public/lib/textAngular/dist/textAngularSetup.js',
                'public/lib/textAngular/dist/textAngular-sanitize.js',
                'public/lib/underscore/underscore.js',
                'public/lib/bootstrap/dist/js/bootstrap.js',
                'public/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                'public/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput-angular.js',
                'public/lib/angular-bind-html-compile/angular-bind-html-compile.js',
                'public/lib/angular-moment/angular-moment.js',
                'public/lib/angular-datepicker/dist/angular-datepicker.js',
                'public/lib/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
                'public/lib/blueimp-tmpl/js/tmpl.min.js',
                'public/lib/blueimp-load-image/js/load-image.all.min.js',
                'public/lib/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
                'public/lib/blueimp-file-upload/js/jquery.iframe-transport.js',
                'public/lib/blueimp-file-upload/js/jquery.fileupload.js',
                'public/lib/blueimp-file-upload/js/jquery.fileupload-process.js',
                'public/lib/blueimp-file-upload/js/jquery.fileupload-angular.js',
                'public/lib/loaders.css/loaders.css.js',
                '//maps.googleapis.com/maps/api/js',
                'public/lib/moment/min/moment.min.js',
                'public/lib/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                'public/lib/angular-bootstrap-slider/slider.js',
                'public/lib/angular-dragdrop/src/angular-dragdrop.min.js',
                'public/lib/jquery-ui/jquery-ui.js',
                'public/lib/d3/d3.js',
                'public/lib/nvd3/build/nv.d3.js',
                'public/lib/angular-nvd3/dist/angular-nvd3.js',
                'public/lib/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js',
                'public/lib/ng-img-crop/compile/minified/ng-img-crop.js',
                'public/lib/tinycolor/dist/tinycolor-min.js',
                'public/lib/angular-color-picker/dist/angularjs-color-picker.min.js',
                'public/lib/sweetalert/dist/sweetalert.min.js',
                'public/lib/Flot/jquery.flot.js',
                'public/lib/flot.tooltip/js/jquery.flot.tooltip.min.js',
                'public/lib/Flot/jquery.flot.resize.js',
                'public/lib/Flot/jquery.flot.pie.js',
                'public/lib/Flot/jquery.flot.time.js',
                'public/lib/Flot/jquery.flot.categories.js',
                'public/lib/flot-spline/js/jquery.flot.spline.min.js',
                'public/lib/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
                'public/lib/slimScroll/jquery.slimscroll.min.js',
                'public/lib/qrcode-generator/js/qrcode.js',
                'public/lib/qrcode-generator/js/qrcode_UTF8.js',
                'public/lib/angular-qrcode/angular-qrcode.js',
                'public/lib/v-accordion/dist/v-accordion.min.js'
                // 'public/lib/jquery/dist/jquery.js',
                // 'public/lib/angular/angular.js',
                // 'public/lib/angular-resource/angular-resource.js',
                // 'public/lib/angular-cookies/angular-cookies.js',
                // 'public/lib/angular-animate/angular-animate.js',
                // 'public/lib/angular-touch/angular-touch.js',
                // 'public/lib/angular-sanitize/angular-sanitize.js',
                // 'public/lib/angular-ui-router/release/angular-ui-router.js',
                // 'public/lib/angular-ui-utils/ui-utils.js',
                // 'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
            ]
        },
        css: [
            // 'public/modules/**/css/*.css'
            'public/dist/application.min.css',
            'public/lib/angularjs-toaster/toaster.css',
            'public/lib/animo.js/animate+animo.css',
            'public/lib/textAngular/dist/textAngular.css',
            'public/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
            'public/lib/angular-datepicker/dist/angular-datepicker.css',
            'public/lib/loaders.css/loaders.css',
            'public/lib/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
            'public/lib/nvd3/build/nv.d3.css',
            'public/lib/ng-img-crop/compile/minified/ng-img-crop.css',
            'public/lib/angular-color-picker/dist/angularjs-color-picker.min.css',
            'public/lib/sweetalert/dist/sweetalert.css',
            'public/lib/v-accordion/dist/v-accordion.min.css'
        ],
        js: [
            'public/config.js',
            'public/application.js',
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ],
        tests: [
        ]
    }
};
