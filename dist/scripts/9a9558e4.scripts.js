"use strict";angular.module("angularjsItcUtils",["ngResource","ngRoute","pl.itcrowd.directives","pl.itcrowd.services","pl.itcrowd.constants"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("angularjsItcUtils").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.credentials={email:null,password:null,passwordConfirmation:null},a.credentials2={email:null,password:null,passwordConfirmation:null},a.credentials3={email:null,password:null,passwordConfirmation:null},a.register=function(){a.registered=!0},a.tryAgain=function(){a.registered=!1,a.credentials={email:null,password:null,passwordConfirmation:null},a.credentials2={email:null,password:null,passwordConfirmation:null},a.credentials3={email:null,password:null,passwordConfirmation:null},a.registerForm.$setPristine(),a.registerForm2.$setPristine(),a.registerForm3.$setPristine()}}]),angular.module("pl.itcrowd.constants",[]),angular.module("pl.itcrowd.directives",[]),angular.module("pl.itcrowd.services",[]),function(){function a(){return{validationMessages:{en:{required:"Value is required!",email:"Please enter a valid email address!",minlength:"Enter more characters!",maxlength:"You have entered to many characters!",equals:"Password doesn't match!",unique:"Your email should be unique!",pattern:"Characters don't match to the pattern!"}}}}angular.module("pl.itcrowd.directives").constant("ValidationMessages",a)}(),function(){function a(){return{latinText:/^[\u0041-~\u0080-þĀ-ž ]+$/}}angular.module("pl.itcrowd.constants").constant("Patterns",a)}(),function(){function a(){return{restrict:"A",link:function(a){a.$on("Alert",function(a,b){window.alert(b)})}}}angular.module("pl.itcrowd.directives").directive("itcAlert",a)}(),function(){function a(a,b){return{restrict:"C",link:function(c,d){function e(){return d.find("#content").add(d.find("header"))}var f=d.find("#login-holder");f.hide(),c.$on("event:auth-loginRequired",function(){$.removeCookie("token",{path:clientContextPath}),delete a.defaults.headers.common.Authorization,!0!==c.$root.isLoginView&&(e().hide(),f.show(),f.find("#inputUsername").focus())}),c.$on("event:signupRequired",function(){e().hide(),f.show(),b(function(){f.find("#inputEmail2").focus()})}),c.$on("event:startChangeForgottenPassword",function(){e().hide(),f.show(),b(function(){f.find("#inputEmailForRemindPass").focus()})});var g=function(){e().show(),f.slideUp()};c.$on("event:auth-loginConfirmed",g),c.$on("event:hide-signup",g)}}}angular.module("pl.itcrowd.directives").directive("itcAuthentication",["$http","$timeout",a])}(),function(){function a(){return{restrict:"A",link:function(a,b){b.bind("click",function(){$(":file").val("")})}}}angular.module("pl.itcrowd.directives").directive("itcClearFileupload",a)}(),function(){function a(){return{priority:100,restrict:"A",link:{pre:function(a,b,c){b.bind("click touchstart",function(a){var b=c.itcConfirmation||"Are you sure?";b&&!window.confirm(b)&&(a.stopImmediatePropagation(),a.preventDefault())})}}}}angular.module("pl.itcrowd.directives").directive("itcConfirmation",a)}(),function(){function a(a){return{restrict:"A",link:function(b,c,d){if(!d.name)throw"Directive must be set on an element that has a 'name' attribute";var e=d.name,f=b[c.context.form.name][e],g=angular.element(c.context);c.bind("focus",function(){var a,b=l(g);(f.$valid||f.$pristine)&&(angular.isUndefined(b)?(h(g),j(g)):(a=b.$tip,angular.isUndefined(a)||(i(b),j(g))))}),c.bind("blur",function(){a(function(){(f.$valid||f.$pristine)&&k(g)},200)});var h=function(a){a.popover({placement:"right",trigger:"manual",content:d.itcDefaultMessage,template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})},i=function(a){a.options.content=d.itcDefaultMessage},j=function(a){a.popover("show")},k=function(a){a.popover("hide")},l=function(a){return a.data("bs.popover")}}}}angular.module("pl.itcrowd.directives").directive("itcDefaultMessage",["$timeout",a])}(),function(){function a(){return{restrict:"C",transclude:!1,scope:!1,link:function(a,b){b.draggable({revert:!0}),a.$on("$destroy",function(){try{b.draggable("destroy")}catch(a){}})},replace:!1}}angular.module("pl.itcrowd.directives").directive("itcDraggable",a)}(),function(){function a(){return{restrict:"C",transclude:!1,scope:!1,link:function(a,b){b.droppable({drop:function(b,c){var d=angular.element(c.draggable).scope();a.onBeforeDrop(d)!==!1&&a.onDrop(d)}}),a.$on("$destroy",function(){try{b.droppable("destroy")}catch(a){}})},replace:!1}}angular.module("pl.itcrowd.directives").directive("itcDroppable",a)}(),function(){function a(a){return{restrict:"E",transclude:!1,scope:{left:"@",href:"@",width:"@",height:"@",showFaces:"@",stream:"@",header:"@"},template:'<div><div class="fb-slidein-inner"><div id="fb-root"></div><div class="fb-like-box"></div></div></div>',link:function(b,c){var d=/^true$/i.test(b.left);c.addClass(d?"fb-slidein-left":"fb-slidein-right"),c.find(".fb-like-box").attr("data-show-faces",b.showFaces).attr("data-stream",b.stream).attr("data-header",b.header).attr("data-width",b.width).attr("data-height",b.height).attr("data-href",b.href);var e=function(){var a="-"+(parseInt(b.width,10)+15)+"px",e=d?{left:a}:{right:a};c.stop().animate(e,400)};c.css("right","-"+(parseInt(b.width,10)+15)+"px").hover(function(){var a=d?{left:"-15px"}:{right:"-15px"};c.stop().animate(a,400)},e),e(),function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="//connect.facebook.net/pl_PL/all.js#xfbml=1",e.parentNode.insertBefore(d,e))}(a.document,"script","facebook-jssdk")},replace:!0}}angular.module("pl.itcrowd.directives").directive("itcFacebookSlidein",["$window",a])}(),function(){function a(){return{restrict:"E",scope:{value:"@"},link:function(a){a.$watch("value",function(){var b=jQuery("head title");0===b.size()&&(b=jQuery("<title></title>"),jQuery("head").append(b)),b.html(a.value)})}}}angular.module("pl.itcrowd.directives").directive("itcHeadTitle",a)}(),function(){function a(){return{restrict:"A",scope:!1,link:function(a,b,c){function d(){if(!(b.filter(":visible").size()<1)){var a=b.parents(".ui-layout-pane"),d=b.parents(c.ngKeepInView);if(0!==d.size()){b.children().css({width:"100%"});var f=b.outerHeight();if(d.offset().top+d.innerHeight()+a.scrollTop()<=a.height())b.css({position:"static",width:"100%"}),d.css({paddingBottom:0});else{var g=e.innerHeight()-(a.innerHeight()+a.offset().top);b.css({position:"fixed",bottom:g,width:d.innerWidth()}),d.css({paddingBottom:f+"px"})}}}}var e=jQuery(window),f=b.parents(".ui-layout-pane");b.resize(d),e.resize(d),f.resize(d),a.$watch(c.ngModel,function(){d()}),a.$on("$destroy",function(){b.unbind("resize",d),e.unbind("resize",d),f.unbind("resize",d)})}}}angular.module("pl.itcrowd.directives").directive("itcKeepInView",a)}(),function(){function a(){return{restrict:"A",scope:!1,link:function(a,b,c){function d(a){a&&jQuery(b).keyTips()}for(var e=c.itcKeyTip.split(","),f=0;f<e.length;f++){var g=e[f];a.$watch(g,d)}}}}angular.module("pl.itcrowd.directives").directive("itcKeyTip",a)}(),angular.module("pl.itcrowd.directives").directive("itcLaddaButtons",["laddaConfig","$timeout",function(a){return{restrict:"A",link:function(b,c,d){if(d.style=d.style||a.style,c.attr("data-style",d.style),c.hasClass("ladda-button")||c.addClass("ladda-button"),!c[0].querySelector(".ladda-label")){var e=angular.element("<span class='ladda-label'></span>");angular.forEach(c.contents(),function(a){e.append(a)}),c.append(e)}var f=Ladda.create(c[0]);b.$watch(d.ladda,function(a){if(void 0!==a){var b=parseInt(a);b?(f.isLoading()||f.start(),f.setProgress(b/100)):a?f.start():f.stop()}})}}}]).constant("laddaConfig",{style:"slide-left"}),function(){function a(a,b,c){return{scope:{stayTime:"@"},template:'<div id="messages" ng-repeat="message in messages"></div>',link:function(d,e,f){function g(c,f){var g='<div class="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>'+c+"</div>",h=a(g)(d);h.addClass("alert-"+("error"===f?"danger":"warn"===f?"warning":f)),e.append(h),d.stayTime&&b(function(){h.fadeOut(400,function(){h.remove()})},d.stayTime)}d.$on("$destroy",function(){c.clean()}),c.subscribe(g,f.itcMessages)}}}angular.module("pl.itcrowd.directives").directive("itcMessages",["$compile","$timeout","MessageFactory",a])}(),function(){function a(){return{restrict:"E",scope:{name:"@",content:"@"},link:function(a){a.$watch("content",function(){var b=jQuery("meta[name="+a.name+"]");0===b.size()&&(b=jQuery('<meta name="'+a.name+'">'),jQuery("head").append(b)),b.attr("content",a.content)})}}}angular.module("pl.itcrowd.directives").directive("itcMetadata",a)}(),function(){function a(){return{restrict:"A",compile:function(){return function(a,b){b.find("a").smoothScroll({offset:-100}),angular.forEach(b.find("a"),function(a){jQuery(a).click(function(a){a.preventDefault()})})}}}}angular.module("pl.itcrowd.directives").directive("itcScrollTo",a)}(),function(){function a(){var a=/^\-?\d+((\.|\,)\d+)?$/;return{require:"ngModel",link:function(b,c,d,e){e.$parsers.unshift(function(b){return a.test(b)?(e.$setValidity("float",!0),"number"==typeof b?b:parseFloat(b.replace(",","."))):void e.$setValidity("float",!1)})}}}angular.module("pl.itcrowd.directives").directive("itcSmartFloat",a)}(),function(){function a(){return{restrict:"A",link:function(a,b,c){var d,e=function(){var a=b.height(),e={length:Math.round(a/8),radius:Math.round(a/5),width:Math.round(a/10),color:b.css("color"),className:"spinner"};c.$set("disabled",!0),d=new Spinner(e).spin(b[0])};a.$watch(c.itcSpinner,function(a){a?e():d&&(c.$set("disabled",!1),d.stop())})}}}angular.module("pl.itcrowd.directives").directive("itcSpinner",["$timeout",a])}(),function(){function a(){return{restrict:"A",link:function(a,b,c){b.bind(c.itcStopEventPropagation,function(a){a.stopPropagation()})}}}angular.module("pl.itcrowd.directives").directive("itcStopEventPropagation",a)}(),function(){function a(){return{restrict:"A",link:function(a,b,c){var d="ng-pristine",e="ng-dirty";if(!c.name)throw"Directive must be set on an element that has a 'name' attribute";angular.isUndefined(c.novalidate)&&c.$set("novalidate",""),b.bind("submit",function(f){f.preventDefault(),b.find(".ng-pristine").removeClass(d).addClass(e);var g=c.name,h=a[g];h.$setDirty(!0),angular.forEach(h,function(a,b){"$"!==b[0]&&(a.$dirty=!0,a.$pristine=!1)}),h.$invalid?(a.$apply(),angular.isUndefined(c.itcSubmitWithoutFocus)&&b.find(".ng-invalid").first().focus(),a.$emit("formValidationErrors",g)):a.$apply(c.itcSubmit)})}}}angular.module("pl.itcrowd.directives").directive("itcSubmit",a)}(),function(){function a(){return{restrict:"A",require:"^ngModel",link:function(a,b,c,d){var e=function(){var b=a.$eval(c.itcEquals),d=a.$eval(c.ngModel);return b===d};a.$watch(e,function(a){d.$setValidity("equals",a)})}}}function b(){return{restrict:"A",require:"^ngModel",link:function(a,b,c,d){var e=function(){var b=a.$eval(c.itcLessThan),d=a.$eval(c.ngModel);return b>d};a.$watch(e,function(a){d.$setValidity("lessthan",a)})}}}angular.module("pl.itcrowd.directives").directive("itcEquals",a),angular.module("pl.itcrowd.directives").directive("itcLessThan",b)}(),function(){function a(a){return{restrict:"A",link:function(b,c,d){var e="en";if(!d.name)throw new Error('Directive must be set on an element that has a "name" attribute');var f=d.itcValidationMessagesEvent,g=d.itcValidationMessagesType,h=d.name,i=b[h];b.$on("fieldValidationError",function(a,b){h===b.formName&&k(b.field,b.fieldName)}),b.$on("formValidationErrors",function(a,b){h===b&&j()}),angular.forEach(i,function(a,d){if("$"!==d[0]){var e=angular.element(c.context[d]);angular.isUndefined(f)?e.bind("blur",function(){k(a,d)}):b.$watch(function(){return e.attr("class")},function(){b.$emit("fieldValidationError",{formName:h,field:a,fieldName:d})})}});var j=function(){i.$pristine||angular.forEach(i,function(a,b){"$"!==b[0]&&k(a,b)})},k=function(a,b){var d={},e=angular.element(c.context[b]);if(angular.isUndefined(g)){var f,h=q(e);a.$valid&&!angular.isUndefined(h)?(p(e),f=h.$tip,f.removeClass("error")):a.$invalid&&a.$dirty&&(d=l(a),angular.isUndefined(h)?(m(e,d.key),o(e)):(f=h.$tip,angular.isUndefined(f)||(n(h,r(e,d.key)),f.hasClass("error")||f.addClass("error"),o(e))))}else{var i;i="block"!==g?$(g+"-"+b):w(e),a.$valid&&0!==i.length?v(i):a.$invalid&&a.$dirty&&(d=l(a),0===i.length?s(e,d.key):(t(i,r(e,d.key)),u(i)))}},l=function(a){var b={};return angular.forEach(a.$error,function(a,c){a&&$.isEmptyObject(b)&&(b={value:a,key:c})}),b},m=function(a,b){a.popover({placement:"right",trigger:"manual",content:r(a,b),template:'<div class="popover error"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})},n=function(a,b){a.options.content=b},o=function(a){a.popover("show")},p=function(a){a.popover("hide")},q=function(a){return a.data("bs.popover")},r=function(c,d){var f=c.attr(d+"-message");if(angular.isUndefined(f)){var g=b.selectedLanguage;return angular.isUndefined(g)?a.validationMessages[e][d]:a.validationMessages[g][d]}return f},s=function(a,b){a.after('<div class="alert alert-danger alert-'+a.attr("name")+'">'+r(a,b)+"</div>")},t=function(a,b){a.html(b)},u=function(a){a.show()},v=function(a){a.hide()},w=function(a){return a.parent().find(".alert-"+a.attr("name"))}}}}angular.module("pl.itcrowd.directives").directive("itcValidationMessages",["ValidationMessages",a])}(),function(){var a=angular.module("LocalStorageModule",[]);a.value("prefix","restBaseITC"),a.constant("cookie",{expiry:30,path:"/"}),a.constant("notify",{setItem:!0,removeItem:!1}),a.service("localStorageService",["$rootScope","prefix","cookie","notify",function(a,b,c,d){"."!==b.substr(-1)&&(b=b?b+".":"");var e=function(){try{return"localStorage"in window&&null!==window.localStorage}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),!1}},f=function(c,f){if(!e())return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),d.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:c,newvalue:f,storageType:"cookie"}),l(c,f);"undefined"==typeof f&&(f=null);try{(angular.isObject(f)||angular.isArray(f))&&(f=angular.toJson(f)),localStorage.setItem(b+c,f),d.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:c,newvalue:f,storageType:"localStorage"})}catch(g){return a.$broadcast("LocalStorageModule.notification.error",g.message),l(c,f)}return!0},g=function(c){if(!e())return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),m(c);var d=localStorage.getItem(b+c);return d&&"null"!==d?"{"===d.charAt(0)||"["===d.charAt(0)?angular.fromJson(d):d:null},h=function(c){if(!e())return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),d.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:c,storageType:"cookie"}),n(c);try{localStorage.removeItem(b+c),d.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:c,storageType:"localStorage"})}catch(f){return a.$broadcast("LocalStorageModule.notification.error",f.message),n(c)}return!0},i=function(){if(!e())return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),!1;var c=b.length,d=[];for(var f in localStorage)if(f.substr(0,c)===b)try{d.push(f.substr(c))}catch(g){return a.$broadcast("LocalStorageModule.notification.error",g.Description),[]}return d},j=function(){if(!e())return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),o();var c=b.length;for(var d in localStorage)if(d.substr(0,c)===b)try{h(d.substr(c))}catch(f){return a.$broadcast("LocalStorageModule.notification.error",f.message),o()}return!0},k=function(){try{return navigator.cookieEnabled||"cookie"in document&&(document.cookie.length>0||(document.cookie="test").indexOf.call(document.cookie,"test")>-1)}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),!1}},l=function(d,e){if("undefined"==typeof e)return!1;if(!k())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var f="",g=new Date;null===e?(g.setTime(g.getTime()+-864e5),f="; expires="+g.toGMTString(),e=""):0!==c.expiry&&(g.setTime(g.getTime()+24*c.expiry*60*60*1e3),f="; expires="+g.toGMTString()),d&&(document.cookie=b+d+"="+encodeURIComponent(e)+f+"; path="+c.path)}catch(h){return a.$broadcast("LocalStorageModule.notification.error",h.message),!1}return!0},m=function(c){if(!k())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var d=document.cookie.split(";"),e=0;e<d.length;e++){for(var f=d[e];" "===f.charAt(0);)f=f.substring(1,f.length);if(0===f.indexOf(b+c+"="))return decodeURIComponent(f.substring(b.length+c.length+1,f.length))}return null},n=function(a){l(a,null)},o=function(){for(var a=null,c=b.length,d=document.cookie.split(";"),e=0;e<d.length;e++){for(a=d[e];" "===a.charAt(0);)a=a.substring(1,a.length);var f=a.substring(c,a.indexOf("="));n(f)}};return{isSupported:e,set:f,add:f,get:g,keys:i,remove:h,clearAll:j,cookie:{set:l,add:l,get:m,remove:n,clearAll:o}}}])}.call(this),function(){function a(a,b){function c(a,b,c){return null!=c.groupingId||null!=a.options.groupingId?c.groupingId===a.options.groupingId:a.callback===b}function d(a,c,d){c=angular.extend({},c,d);var e=b(a,c.timeout);return e.then(function(){for(var a=0;a<h.length;a++)if(h[a].promise===e)return void h.splice(a,1)}),{callback:a,options:d,promise:e}}function e(e,f){f=angular.extend({queueId:g},f);for(var j=0;j<h.length;j++)if(c(h[j],e,f)){b.cancel(h[j].promise),h.splice(j,1);break}null==i[f.queueId]&&(a.warn("No queue `"+f.queueId+"` defined"),f.queueId=g);var k=angular.extend({},i[f.queueId],f);k.timeout>0?h.push(d(e,k,f)):e()}function f(a,b){null==b&&(b=g),i[b]=angular.extend(i[b]||{},a)}var g="default",h=[],i={};return i[g]={timeout:0},{add:e,configure:f}}angular.module("pl.itcrowd.services").factory("AsyncQueue",["$log","$timeout",a])}(),function(){function a(a,b,c){function d(b){a.defaults.headers.common.Authorization="Token "+c.encode(b)}function e(a){var b=/%20/g,c=[];return angular.forEach(a,function(a,b){c[c.length]=encodeURIComponent(b)+"="+encodeURIComponent(a)}),c.join("&").replace(b,"+")}var f=$.cookie("token");f&&d(f);var g={login:function(b,c,d,f){var h=e({username:b,password:c}),i={headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}};delete a.defaults.headers.common.Authorization,$.removeCookie("token",{path:clientContextPath});var j=a.post(doubleEscapedContextPath+"/api/user/auth",h,i).success(function(a){g.setToken(a),d instanceof Function&&d()});f instanceof Function&&j.error(f)},logout:function(){document.execCommand("ClearAuthenticationCache"),$.removeCookie("token",{path:clientContextPath}),delete a.defaults.headers.common.Authorization},setToken:function(a){if(null==a)throw new Error("Token may not be null or undefined");$.cookie("token",a,{path:clientContextPath}),d(a),b.$broadcast("RestBase:authentication-token-set")}};return g}function b(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return{encode:function(b){var c,d,e,f,g,h="",i="",j="",k=0;do c=b.charCodeAt(k++),d=b.charCodeAt(k++),i=b.charCodeAt(k++),e=c>>2,f=(3&c)<<4|d>>4,g=(15&d)<<2|i>>6,j=63&i,isNaN(d)?g=j=64:isNaN(i)&&(j=64),h=h+a.charAt(e)+a.charAt(f)+a.charAt(g)+a.charAt(j),c=d=i="",e=f=g=j="";while(k<b.length);return h},decode:function(b){var c,d,e,f,g,h="",i="",j="",k=0,l=/[^A-Za-z0-9\+\/=]/g;if(l.exec(b))throw new Error('There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, "+", "/",and "="\nExpect errors in decoding.');b=b.replace(/[^A-Za-z0-9\+\/=]/g,"");do e=a.indexOf(b.charAt(k++)),f=a.indexOf(b.charAt(k++)),g=a.indexOf(b.charAt(k++)),j=a.indexOf(b.charAt(k++)),c=e<<2|f>>4,d=(15&f)<<4|g>>2,i=(3&g)<<6|j,h+=String.fromCharCode(c),64!==g&&(h+=String.fromCharCode(d)),64!==j&&(h+=String.fromCharCode(i)),c=d=i="",e=f=g=j="";while(k<b.length);return h}}}var c=angular.module("pl.itcrowd.services.auth",[]);c.factory("Authenticator",["$http","$rootScope","Base64",a]),c.factory("Base64",b)}(),function(){angular.module("pl.itcrowd.services").config(["$httpProvider",function(a){function b(a,b,c){function d(a){return a}function e(d){var e=d.status;if(b.errorDate=new Date,null!=d.config&&null!=d.config.skipDefaultInterceptors&&null!=d.config.skipDefaultInterceptors.codes&&d.config.skipDefaultInterceptors.codes.indexOf(e)>-1)return c.reject(d);switch(e){case 400:b.errorMessage="Request cannot be fulfilled due to bad syntax!";break;case 401:return d;case 403:b.errorMessage="You don't have access to this page or resource!";break;case 404:b.errorMessage="The page or resource your are looking for does not exist!";break;case 405:b.errorMessage="Request method not supported!";break;case 408:b.errorMessage="The server timed out waiting for the request!";break;case 412:b.errorMessage="Precondition failed: "+d.data;break;case 415:b.errorMessage="This media type is not supported!";break;case 503:b.errorMessage="The server is currently unavailable (overloaded or down)!";break;case 505:b.errorMessage="The server does not support the HTTP protocol version used in the request!";break;default:b.errorMessage=d.message?d.message:"Internal Server Error! Something went really wrong..."}return a.path("/error"),a.replace(),c.reject(d)}return function(a){return a.then(d,e)}}a.responseInterceptors.push(["$location","$rootScope","$q",b])}])}(),function(){function a(){var a=[];return{notify:function(b,c){angular.forEach(a,function(a){a.type&&a.type!==b||a.cb(c,b)})},clean:function(){a=[]},subscribe:function(b,c){a.push({cb:b,type:c})},success:function(a){this.notify("success",a)},info:function(a){this.notify("info",a)},warn:function(a){this.notify("warn",a)},error:function(a){this.notify("error",a)}}}angular.module("pl.itcrowd.services").factory("MessageFactory",a)}(),function(){function a(){var a={maxResults:20};this.setDefaultConfig=function(b){a=b},this.$get=["AsyncQueue",function(b){function c(c,d,e){function f(){b.add(i,e)}function g(a,b){a!==b&&f()}function h(a,b){a!==b&&(c.currentPage=1,g(a,b))}c.filter=c.filter||{},c.filter=angular.extend({firstResult:0,maxResults:a.maxResults},c.filter);var i=angular.bind(null,d,function(a){c.resultCount=a});for(var j in c.filter)if(c.filter.hasOwnProperty(j)){var k="firstResult"===j||"maxResults"===j?g:h;c.$watch("filter."+j,k,!0)}return c.isPaginationNeeded=function(){return c.resultCount>c.filter.maxResults},c.$watch("currentPage",function(a,b){a!==b&&(c.filter.firstResult=(a-1)*c.filter.maxResults)},!0),f}return c}]}angular.module("pl.itcrowd.services").provider("paginationSupport",a)}();