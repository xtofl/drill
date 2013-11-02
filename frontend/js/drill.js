require(["./util", "jquery", "database", "questionfactories", "sequencers"], function(util, $, database, questionfactories, sequencers) {
	var currentQuestionElement = $("#current_question .question_text");
	var inputElement = $("#current_question .answer_input");
	var wrongCounterElement = $(".feedback .wrongcounter");
	var rightCounterElement = $(".feedback .rightcounter");
	var totalCounterElement = $(".feedback .totalcounter");
	var feedBack = $("#current_question .feedback .text");

	var data, questionFactory;
	var bindToSettings = function() {
		var sequenceInput = $("#settings_sequence");

		var values = {};
		values.sequential = {
			constructor : sequencers.createSequentialSelector,
			name : '$sequential$'
		};
		values.shuffled = {
			name : '$shuffled'
		};

		var output = [];
		for (key in values) {
			output.push('<option value="' + key + '">' + values[key].name + '</option>');
		};
		sequenceInput.html(output.join(''));

		sequenceInput.on('change', function(what) {
			var option = values[sequenceInput.val()];
			questionFactory.setSequencer(option.constructor(data));
			alert(sequenceInput.val());
		});
	};
	
	bindToSettings();

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
	database.withData("../resources/latijn_Pegasus.json", function(questiondata) {
		data = questiondata;
		questionFactory = database.createQuestionFactory(data, questionfactories.LatijnNederlands, sequencers.createSequentialSelector(0, data.length));

		var ask = function(question) {
			clearInput();
			bindInputToQuestion(question, function() {
				questionFactory.withNextQuestion(ask);
			});
		};

		questionFactory.withNextQuestion(ask);
	});
});
