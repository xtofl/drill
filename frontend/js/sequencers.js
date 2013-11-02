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
			//+ Jonas Raoni Soares Silva
			//@ http://jsfromhell.com/array/shuffle [v1.0]
			function shuffle(o){ //v1.0
			    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			    return o;
			};
			var indices = [];
			for(var i=0; i!=data.length; ++i){ indices.push(i); }
			shuffle(indices);
						
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
					return indices[i];
				}
			};
		}
	};
});
