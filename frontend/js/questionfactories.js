define([], function(){
	return {
		LatijnNederlands : function(q) {
			return {
				html: function() {
					return q.Latijn;
				},
				ask : function(setHtml) {
					setHtml(this.html());
				},
				verify : function(answer, onRight, onWrong) {
					if (q.Nederlands === answer || q.Nederlands.indexOf(answer) >= 0) {
						onRight(answer);
					} else {
						onWrong(answer);
					}
				},
				nr: q.nr
			};
		}
	};
});
