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
        toHeadingLevel: '@'
      },
      link: function(scope, el, attr, vm){
        vm.init(scope, el, attr);
      },
      controller: controller
    }
    function controller($compile){
      this.init = function(scope, el, attr){
        var headingArray = TOC.createHeadingArray(
          angular.element(scope.startHeadingElement)[0],
          scope.fromHeadingLevel,
          scope.toHeadingLevel
        )
        if(headingArray){
          TOC.addRelationShip(headingArray);
          var toc = TOC.toTocUi(headingArray);
          el.html(toc)
        }
      }
    }
  }
})();
