define({
	data: function(){
		
		var data = 
		[ {text: "slaaf", correct_answer: "servus"}
		, {text: "heer", correct_answer: "dominus"}
		, {text: "servus", correct_answer: "slaaf"}
		, {text: "dominus", correct_answer: ["heer","meester"]}
		, {text: "amare", correct_answer: "houden van"}

		, {nr: 125+1, text: "Iuppiter", correct_answer: "Jupiter"}
		, {nr: 126+1, text: "mons", correct_answer: "berg"}
		, {nr: 127+1, text: "lux", correct_answer: "licht"}
		, {nr: 128+1, text: "soror", correct_answer: "zus"}
		, {nr: 129+1, text: "nomen", correct_answer: "naam"}
		, {nr: 130+1, text: "scelus", correct_answer: "misdaad"}
		, {nr: 131+1, text: "alius", correct_answer: "andere"}
		, {nr: 132+1, text: "ceteri", correct_answer: "de overige"}
		, {nr: 133+1, text: "adiuvare", correct_answer: "helpen"}
		, {nr: 134+1, text: "curare", correct_answer: "zorgen voor"}
		, {nr: 135+1, text: "monstrare", correct_answer: "wijzen"}
		, {nr: 136+1, text: "sicut", correct_answer: "zoals"}


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
					if (q.correct_answer===answer || q.correct_answer.indexOf(answer) >= 0){
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
