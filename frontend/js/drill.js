require(["./util", "jquery", "database", "questionfactories", "sequencers", "bind/settings"], function(util, $, database, questionfactories, sequencers, settings) {
	var currentQuestionElement = $("#current_question .question_text");
	var inputElement = $("#current_question .answer_input");
	var wrongCounterElement = $(".feedback .wrongcounter");
	var rightCounterElement = $(".feedback .rightcounter");
	var totalCounterElement = $(".feedback .totalcounter");
	var feedBack = $("#current_question .feedback .text");
	var sequenceInput = $("#settings_sequence");
	var rangeInput = $("#settings_sequence_range");
	var data, questionFactory;



	var values = {};
	values.sequential = {
		constructor : sequencers.createSequentialSelector,
		name : '$sequential$'
	};
	values.shuffled = {
		constructor : sequencers.createShuffledSelector,
		name : '$shuffled'
	}; 

	var settings = settings.bindToInputs({
		sequence : { input: sequenceInput, values: values },
		range : {input: rangeInput}
	});
	settings.connect();
	settings.onSequenceChanged(function() {
		questionFactory.setSequencer(constructor()(data));
	});
	settings.onRangeChanged(function() {
		questionFactory.setSequencer(constructor()(data));
	});

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

	var wrongList = {
		append : function(question) {
			var li = document.createElement("li");
			li.innerHTML = question.html();
			$("#wronglist").append(li);
		}
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
				wrongList.append(question);
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
