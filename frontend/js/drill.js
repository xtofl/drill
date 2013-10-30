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

	var q = questionFactory.nextQuestion();
	var onChange = inputElement.bind('change', function() {
		var answer = inputElement.val();
		q.verify(
			answer,
			function(rightAnswer) {
				onChange.unbind();
				feedBack.removeClass("hidden");
				feedBack.text("$right$");
				feedBack.addClass("right");
			},
			function(wrongAnswer) {
				onChange.unbind();
				feedBack.removeClass("hidden");
				feedBack.text("$wrong$");
				feedBack.addClass("wrong");
			}
		);
	});
	q.ask(function(html) {
		currentQuestionElement.text(html);
	});
});
