define([], function(){
	return {
		TranslateWord : function(q) {
			return {
				html: function() {
					return q.Latin;
				},
				ask : function(setHtml) {
					setHtml(this.html());
				},
				verify : function(answer, onRight, onWrong) {
					if (q.Dutch === answer || q.Dutch.indexOf(answer) >= 0) {
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
