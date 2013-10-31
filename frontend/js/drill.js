require(["./util", "jquery", "database"], function(util, $, database) {
	var currentQuestionElement = $("#current_question .question_text");
	var inputElement = $("#current_question .answer_input");
	var feedBack = $("#current_question .feedback");
	var questionFactory = database.createQuestionFactory(database.questionList());

	var clearInput = function() {
		inputElement.val("");
		feedBack.removeClass("wrong");
		feedBack.removeClass("right");
		feedBack.text("");
	};

	var bindInputToQuestion = function(question, next) {
		var onChange = inputElement.bind('change', function() {
			var answer = inputElement.val();
			question.verify(answer, function(rightAnswer) {
				onChange.unbind();
				feedBack.text("$right$");
				feedBack.addClass("right");
				
				next();				
			}, function(wrongAnswer) {
				feedBack.text("$wrong$");
				feedBack.addClass("wrong");
			});
		});
		question.ask(function(html) {
			currentQuestionElement.text(html);
		});
	};

	ask = function(question) {
		clearInput();
		bindInputToQuestion(question, function(){
			ask(questionFactory.nextQuestion());
		});
	};

	ask(questionFactory.nextQuestion());
});
