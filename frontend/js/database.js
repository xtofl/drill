define(["jquery"], function($) {
	return {
		withData : function(url, then) {
			$.getJSON(url, function(data, textStatus, jqXHR) {
				then(data);
			});
		},

		Q_LatijnNederlands : function(q) {
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
		},

		createQuestions : function(data, creator) {
			var objects = [];

			data.forEach(function(q) {
				objects.push(creator(q));
			});
			return objects;
		},

		createQuestionFactory : function(data, creator) {
			var questions = this.createQuestions(data, creator);
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
