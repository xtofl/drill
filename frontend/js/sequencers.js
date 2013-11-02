define([], function() {
	return {
		createSequentialSelector : function(data, onWrap) {
			var index = 0;
			return {
				nextIndex : function() {
					var i = index;
					index++;
					if (index == data.length) {
						if (onWrap) {
							onWrap();
						}
						index = from;
					}
					return i;
				}
			};
		},
		createShuffledSelector : function(data, onWrap) {
			var index = 10;
			return {
				nextIndex : function() {
					var i = index;
					index++;
					if (index == data.length) {
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
