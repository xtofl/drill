define({
	data: function(){
		
		var data = [
		{text: "slaaf", correct_answer: "servus"},
		{text: "heer", correct_answer: "dominus"}
		];
		return data;
	},
	
	createQuestions: function(data) {
		var objects = [];
		
		data.forEach(function(q){
			objects.push({
				ask: function(setHtml){
					setHtml(q.text);
				},
				verify: function(answer, onRight, onWrong){ 
					if (q.correct_answer===answer){
						onRight(answer);
					} else {
						onWrong(answer);
					} 
				}
				
			});
		});
		return objects;
	},

	createQuestionFactory: function(data) {
		var questions = this.createQuestions(data);
		var nextQuestionIndex = 0;
		return {
			nextQuestion : function() {
				var q = questions[nextQuestionIndex];
				nextQuestionIndex++;
				if (nextQuestionIndex == questions.length) {
					nextQuestionIndex = 0;
				}
				return q;
			}
		};
	}
});
