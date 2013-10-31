define({
	questionList: function(){
		
		var data = [
		{text: "slaaf", correct_answer: "servus"},
		{text: "heer", correct_answer: "dominus"}
		];
		
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

	createQuestionFactory: function(questions) {
		var questions = questions;
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
