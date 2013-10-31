require(["./util", "jquery", "database"], function(util, $, database) {
	var currentQuestionElement = $("#current_question .question_text");
	var inputElement = $("#current_question .answer_input");
	var feedBack = $("#current_question .feedback");

	var questionFactory = function() {
		var questions = database.questions();
		var nextQuestionIndex = 0;
		return {
			nextQuestion : function() {
				var q = questions[nextQuestionIndex];
				nextQuestionIndex++;
				if (nextQuestionIndex > questions.length) {
					nextQuestionIndex = 0;
				}
				return q;
			}
		};
	}();

	ask = function(question) {
		var onChange = inputElement.bind('change', function() {
			var answer = inputElement.val();
			question.verify(answer, function(rightAnswer) {
				feedBack.removeClass("hidden");
				feedBack.text("$right$");
				feedBack.addClass("right");
			}, function(wrongAnswer) {
				feedBack.removeClass("hidden");
				feedBack.text("$wrong$");
				feedBack.addClass("wrong");
			});
		});
		q.ask(function(html) {
			currentQuestionElement.text(html);
		});
	};

	ask(questionFactory.nextQuestion());
});
