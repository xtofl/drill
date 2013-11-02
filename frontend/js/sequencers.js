define([], function() {
	return {
		createSequentialSelector : function(from, to, onWrap) {
			var index = from;
			return {
				nextIndex : function() {
					var i = index;
					index++;
					if (index == to) {
						if (onWrap) {
							onWrap();
						}
						index = from;
					}
					return i;
				}
			};
		}
	};
});
