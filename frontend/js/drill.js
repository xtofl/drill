require(["./util", "jquery", "database"], function(util, $, database) {
	var currentQuestionElement = $("#current_question .question_text");
	var inputElement = $("#current_question .answer_input");
	var wrongCounterElement = $(".feedback .wrongcounter");
	var rightCounterElement = $(".feedback .rightcounter");
	var totalCounterElement = $(".feedback .totalcounter");
	var feedBack = $("#current_question .feedback .text");
	var clearInput = function() {
		inputElement.val("");
		feedBack.removeClass("wrong");
		feedBack.removeClass("right");
		feedBack.text("");
	};

	var right = 0;
	var wrong = 0;
	var updateTotals = function() {
		wrongCounterElement.text(wrong);
		rightCounterElement.text(right);
		totalCounterElement.text(100 * right / (right + wrong) + "%");
	};

	var bindInputToQuestion = function(question, next) {
		var onChange = inputElement.bind('change', function() {
			var answer = inputElement.val();
			question.verify(answer, function(rightAnswer) {
				onChange.unbind();
				feedBack.text("$right$");
				feedBack.addClass("right");
				right++;
				updateTotals();
				next();
			}, function(wrongAnswer) {
				feedBack.text("$wrong$");
				feedBack.addClass("wrong");
				wrong++;
				updateTotals();
			});
		});
		question.ask(function(html) {
			currentQuestionElement.text(html);
		});
	};


	var Q_LatijnNederlands = function(q) {
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
	};

	database.withData("../resources/latijn_Pegasus.json", function(data) {

		var questionFactory = database.createQuestionFactory(data, Q_LatijnNederlands, 
			database.createSequentialSelector(0, data.length));

		var ask = function(question) {
			clearInput();
			bindInputToQuestion(question, function() {
				questionFactory.withNextQuestion(ask);
			});
		};

		questionFactory.withNextQuestion(ask);
	});
});
