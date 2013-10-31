define(["jquery"], function($) {
	return {
		withData : function(then) {

			$.getJSON("../resources/latijn_Pegasus.json", function(data, textStatus, jqXHR){
				then(data);	
			});
		},

		createQuestions : function(data) {
			var objects = [];

			data.forEach(function(q) {
				objects.push({
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
				});
			});
			return objects;
		},

		createQuestionFactory : function(data) {
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
	};
});
