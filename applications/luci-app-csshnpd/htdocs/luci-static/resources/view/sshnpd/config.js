'use strict';
'require view';
'require form';

return view.extend({
	// Validator for strings starting with '@'
	validateAtSignPrefix: function(section_id, value) {
		let trimmedValue = (value || '').trim();

		if (!/^@/.test(trimmedValue)) {
			throw new Error(_('Must start with the "@" character.'));
		}

		if (trimmedValue.length < 2) {
			throw new Error(_('Must be at least 2 characters long (e.g., "@a").'));
		}

		if (!/^@[a-zA-Z0-9_-]+$/.test(trimmedValue)) {
			throw new Error(_('Can only contain letters, numbers, hyphens, and underscores after "@".'));
		}

		return true;
	};

	render: function() {
		let m, s, o;

		m = new form.Map('sshnpd', _('NoPorts'),
			_('Daemon Configuration'));

		s = m.section(form.TypedSection, 'sshnpd', _('sshnpd config'));
		s.anonymous = true;

		s.option(form.Value, 'atsign', _('Device atSign'),
			_('The device atSign e.g. @device'));
		o.validate = this.validateAtSignPrefix;

		s.option(form.Value, 'manager', _('Manager atSign'),
			_('The manager atSign e.g. @manager'));

		s.option(form.Value, 'device', _('Device name'),
			_('The name for this device e.g. openwrt'));

		s.option(form.Value, 'args', _('Additional arguments'),
			_('Further command line arguments for the NoPorts daemon'));

		s.option(form.Value, 'otp', _('Enrollment OTP/STP'),
			_('One Time Passcode (OTP) for device atSign enrollment'));

		o = s.option(form.Flag, 'enabled', _('Enabled'),
			_('Check here to enable the service'));
		o.default = '1';
		o.rmempty = false;

		return m.render();
	},
});
