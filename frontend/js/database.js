define({
	data: function(){
		
		var data = 
		[ {text: "slaaf", correct_answer: "servus"}
		, {text: "heer", correct_answer: "dominus"}
		, {text: "servus", correct_answer: "slaaf"}
		, {text: "dominus", correct_answer: "heer"}
		, {text: "amare", correct_answer: "houden van"}
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
			withNextQuestion : function(then) {
				var q = questions[nextQuestionIndex];
				nextQuestionIndex++;
				if (nextQuestionIndex == questions.length) {
					nextQuestionIndex = 0;
				}
				then(q);
			}
		};
	}
});
