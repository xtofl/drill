define(["jquery", "sequencers"], function($, sequencers) {

	return {
		bindToInputs : function(elements) {

			var rangeNotifies = [];
			var sequenceNotifies = [];

			var constructor = function() {
				var option = elements.sequence.values[sequenceInput.val()];
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
					var value = rangeInput.val();
					var from = value.split("-")[0];
					var to = value.split("-")[1];
					var newData = [];
					data.forEach(function(e) {
						if (from <= e.nr && e.nr <= to) {
							newData.push(e);
						}
					});
					rangeNotifiers.forEach(function(n) {
						n();
					});
				});
			};
			return {
				connect : function(data, sequenceFactory) {
					bindToSequenceInput(data, sequenceFactory);
				},
				onRangeChanged : function(notify) {
					rangeNotifies.push(notify);
				},
				onSequenceChanged : function(notify) {
					sequenceNotifies.push(notify);
				},
			};
		}
	};
}); 