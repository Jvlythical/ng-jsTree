
'use strict';

CDEjsTree.factory('CDEjsTreeEvents', ['jsTreeConstants', function(Constants) {

	var CDE_JSTREE_EVENTS_STATUS_SUCCESS = true;
	var CDE_JSTREE_EVENTS_STATUS_FAILURE = false;

	var Scope = undefined;
	var Statuses = {
		'init' : false,
		'tree' : false
	};

	var $jstree = undefined;
	var $target = undefined;

	var init = function(config) {
		
		if(typeof(config) !== 'object')
			return CDE_JSTREE_EVENTS_STATUS_FAILURE;
		
		Scope = (config.Scope === undefined ? {} : config.Scope);
		$target = config.$target;

		Statuses.init = true;
		
		return CDE_JSTREE_EVENTS_STATUS_SUCCESS;
	}

	var makeTree = function(event, data) {

		$.jstree.defaults.core.theme = 'proton';

		$jstree = $target.jstree({
			'core' : {
				'themes' : {
					'dots' : false
				},
				'data' : data
			},
		});

		$jstree.on('ready.jstree', function() { 
			Statuses.tree = true;
			Scope.$emit('jstree.ready');
		});

		return $jstree;
	}

	var wrapTree = function() {

		if(!Statuses.tree)
			return CDE_JSTREE_EVENTS_STATUS_FAILURE;

		var file = {
			'id' : undefined,
			'path' : undefined,
			'type' : undefined
		}

		$jstree
			.on('open_node.jstree', function(event, data) {
				Scope.$emit('jstree.node-opened', data);
			})
			.on('close_node.jstree', function(event, data) {
				Scope.$emit('jstree.node-closed', data);
			})
			.on('select_node.jstree', function(event, data) {
				
				Scope.$emit('jstree.node-selected', data);

			})
			.on('hover_node.jstree', function(event, data) {

				var $node = $(Constants.ROOT_NODE).find('li#' + data.node.id);

				$node.css('background', Constants.HOVER_STYLE);

				Scope.$emit('jstree.node-hovered', data);
			})
			.on('dehover_node.jstree', function(event, data) {

				var $node = $(Constants.ROOT_NODE).find('li#' + data.node.id);

				$node.css('background', '');

				Scope.$emit('jstree.node-dehovered', data);
			});
	}

	return {
		'init' : init,
		'makeTree' : makeTree,
		'wrapTree' : wrapTree
	}

}]);


