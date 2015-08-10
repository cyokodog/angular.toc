//toc.module.js
;(function(){
  angular.module('angular-toc', []);
})();

//toc.directive.js
;(function(){
  angular.module('angular-toc').directive('toc', directiveFactory);
  function directiveFactory(){
    return {
      scope: {
        startHeadingElement: '@',
        fromHeadingLevel: '@',
        toHeadingLevel: '@',
        onFilter: '&'
      },
      link: function(scope, el, attr, vm){
        vm.init(scope, el, attr);
      },
      controller: controller
    }
    controller.$inject = ['$compile'];
    function controller($compile){
      this.init = function(scope, el, attr){
        var headingArray = TOC.createHeadingArray(
          document.querySelector(scope.startHeadingElement),
          scope.fromHeadingLevel,
          scope.toHeadingLevel
        )
        headingArray = headingArray.filter(function(heading){
          var ret = scope.onFilter({heading: heading});
          return ret == undefined || ret;
        });
        if(headingArray){
          TOC.addRelationShip(headingArray);
          var toc = TOC.toTocUi(headingArray);
          el.append(toc);
        }
      }
    }
  }
})();
