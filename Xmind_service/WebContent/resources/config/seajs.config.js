seajs.config({
    alias:{
        'bootstrapcss':'../../../lib/bootstrap/3.0.3/css/bootstrap.css',
        'commoncss':'../../../common/css/common.css',
        'uicss':'../../../common/css/ui.css',
        'animatecss':'../../../common/css/animate.css',
        'jquery':'../../../lib/jquery/1.11.0/jquery.js',
        'bootstrapjs':'../../../lib/bootstrap/3.0.3/js/bootstrap.js',
        'angular':'../../lib/angular/1.1.5/angular.js',
        'commonjs':'../../../common/js/common.js',
        'uijs':'../../../common/js/ui.js'
    },
    preload:['bootstrapcss','commoncss','uicss','animatecss','jquery'],
    debug:true
});