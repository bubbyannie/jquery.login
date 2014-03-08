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

		var $username = $form.find('[name=username]');
		var $password = $form.find('[name=password]');
		var $button = $form.find('[type=submit]');

		var url = $form.attr('action') || options.url;
		var method = $form.attr('method') || options.method || 'POST';
		var username_field = $username.attr('name');
		var password_field = $password.attr('name');

		var signin = function(evt) {
			evt.preventDefault();
			$button.attr('disabled', 'disabled');

			var data = {};
			data[username_field] = $username.val();
			data[password_field] = $password.val();

			var $defer = $.ajax({
				url: url,
				type: method,
				data: data
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
			if($form.valid()) {
				signin(evt);
			}
		});
	};

	return $.fn.loginForm;
}));