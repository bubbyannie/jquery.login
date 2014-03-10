'use strict';

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(root.jQuery);
	}
}(this, function ($) { // jshint ignore:line
	$.fn.loginForm = function(options) {
		var $form = this;

		var parameters = $.extend({
			username: '[name=username]',
			password: '[name=password]'
		}, options.parameters);

		$.each(parameters,function(param){
			parameters[param] = $form.find(parameters[param]);
		});

		var $button = $form.find('[type=submit]');
		var url = $form.attr('action') || options.url;
		var method = $form.attr('method') || options.method || 'POST';
		var validate = options.validate || $form.valid;

		var signin = function(evt) {
			$button.attr('disabled', 'disabled');

			var data = {};
			$.each(parameters,function(param){
				data[param] = parameters[param].val();
			});

			var $defer = $.ajax({
				url: url,
				type: method,
				data: data,
				datatype: 'json'
			});

			if($.isFunction(options.success)) {
				$defer.success(options.success);
			}

			$defer.fail(function(data, status, msg) {
				if(data.status === 401) {
					if($.isFunction(options.unauthorized)) {
						options.unauthorized.call(this, data, msg);
					}
				} else {
					if($.isFunction(options.error)) {
						options.error.call(this, data, msg);
					}
				}
			});

			$defer.always(function() {
				$button.removeAttr('disabled');
			});
		};

		return $form.submit(function(evt) {
			evt.preventDefault();

			if($.isFunction(validate) && validate()) {
				signin(evt);
			}
		});
	};

	return $.fn.loginForm;
}));