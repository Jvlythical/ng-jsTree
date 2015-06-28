
'use strict';

CDEjsTree.directive('fileTree', ['$rootScope', '$parse', 'CDEjsTreeEvents',
function($rootScope, $parse, CDEjsTreeEvents) {
	
	return {
		restrict : 'E',
		link : function(scope, element, attrs) {

			var $target = $('#' + attrs.target);

			CDEjsTreeEvents.init({
				'Scope' : scope,
				'$target' : $target
			});

			scope.$on('jstree.new-data', CDEjsTreeEvents.makeTree);
			scope.$on('jstree.ready', CDEjsTreeEvents.wrapTree);
			
			($parse(attrs.init)(scope))();
		
		}
	}

}]);
