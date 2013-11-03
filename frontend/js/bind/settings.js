define(["jquery"], function($) {

	return {
		// required argument elements:
		// { sequence: S, range: R }
		// S: { input, values }
		// R: { input }
		bindToInputs : function(elements) {
			var rangeNotifies = [];
			var sequenceNotifies = [];

			var constructor = function() {
				var option = elements.sequence.values[elements.sequence.input.val()];
				return option.constructor;
			};

			var bindToSequenceInput = function() {

				var output = [];
				for (key in elements.sequence.values) {
					output.push('<option value="' + key + '">' + elements.sequence.values[key].name + '</option>');
				};
				elements.sequence.input.html(output.join(''));

				elements.sequence.input.on('change', function(what) {
					sequenceNotifies.forEach(function(n) {
						n();
					});
				});
			};

			var bindToRangeInput = function() {
				elements.range.input.on('change', function() {
					rangeNotifies.forEach(function(n) {
						n();
					});
				});
			};
			return {
				connect : function(data, sequenceFactory) {
					bindToSequenceInput(data, sequenceFactory);
					bindToRangeInput();
				},
				onRangeChanged : function(notify) {
					rangeNotifies.push(notify);
				},
				onSequenceChanged : function(notify) {
					sequenceNotifies.push(notify);
				},
				constructor: constructor
			};
		}
	};
}); 