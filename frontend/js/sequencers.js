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
			function shuffled(original){ //v1.0
				var r=original.slice(0);
			    for(var j, x, i = r.length; 
			    	i !== 0; 
			    	j = Math.floor(Math.random() * i), x = r[--i], r[i] = r[j], r[j] = x);
			    return r;
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
						index = 0;
					}
					return indices[i];
				}
			};
		}
	};
});
