(function(root, $) {
	'use strict';

	$.fn.onScreen = function(opts) {
		return this.each(function() {
			var $this = $(this);

			var defaults = {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				action: function() {},
				inAction: function() {}
			};

			opts = $.extend({}, defaults, opts);

			$(document).on('ready', actionFunc);
			$(window).on('resize scroll', actionFunc);

			// 화면 내에 노출되는 부분 체크
			function isScrolledIntoView() {
				var rect = $this[0].getBoundingClientRect();

				return (
					rect.top + opts.top >= 0 &&
					rect.left + opts.left >= 0 &&
					rect.bottom + opts.bottom <= $(window).height() &&
					rect.right + opts.right <= $(window).width()
				);
			}

			function actionFunc() {
				if (opts.action && isScrolledIntoView()) {
					// 화면 노출된 Elements
					opts.action.call($this);
				} else {
					// 화면 노출되지 않은 Elements
					opts.inAction.call($this);
				}
			}
		});
	}
}(window, jQuery));