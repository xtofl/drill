define([], function(){
	return {
		LatijnNederlands : function(q) {
			return {
				ask : function(setHtml) {
					setHtml(q.Latijn);
				},
				verify : function(answer, onRight, onWrong) {
					if (q.Nederlands === answer || q.Nederlands.indexOf(answer) >= 0) {
						onRight(answer);
					} else {
						onWrong(answer);
					}
				}
			};
		}
	};
});
