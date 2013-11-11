require(["./util", "jquery", "database", "questionfactories", "sequencers", "bind/settings", "util"], function(util, $, database, questionfactories, sequencers, settings, util) {

	// feedback section
	var wrongCounterElement = $(".feedback .wrongcounter");
	var rightCounterElement = $(".feedback .rightcounter");
	var totalCounterElement = $(".feedback .totalcounter");
	var feedBack = $("#current_question .feedback .text");
	
	// settings section
	var sequenceInput = $("#settings_sequence");
	var rangeInput = $("#settings_sequence_range");

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
		database : {
			input : $("#database_input")
		},
		sequence : {
			input : sequenceInput,
			values : values
		},
		range : {
			input : rangeInput
		}
	});
	settings.connect();
	var onNewSequencer = function(f) {
		sequencerNotifies.push(f);
	};

	var filter = function(data, predicate) {
		var newData = [];
		data.forEach(function(e) {
			if (predicate(e)) {
				newData.push(e);
			}
		});
		return newData;
	};

	var createQuestionWithinRangeFunction = function() {
		var parts = rangeInput.val().split("-");
		var from = parts[0] || -Infinity;
		var to = parts[1] || Infinity;

		return function(q) {
			return from <= q.nr && q.nr <= to;
		};
	};

	var setNewSequencer = function(questions) {
		var selectedSequencer = settings.constructor()(questions);
		questionFactory.setSequencer(sequencers.createFilteredSequencer(selectedSequencer, createQuestionWithinRangeFunction()));
		sequencerNotifies.forEach(function(f) {
			f();
		});
	};

	var sequencerNotifies = [];
	settings.onSequenceChanged(function() {
		setNewSequencer(questions);
	});
	settings.onRangeChanged(function() {
		setNewSequencer(questions);
	});

	// input section
	var currentQuestionElement = $("#current_question .question_text");
	var inputElement = $("#current_question .answer_input");
	var questions, questionFactory;


	var clearInput = function() {
		removeCurrentInputListener();
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
	var removeCurrentInputListener = function(){};
	var bindInputToQuestion = function(question, next) {
		var currentInputListener = inputElement.bind('change', function() {
			var answer = inputElement.val();
			question.verify(answer, function(rightAnswer) {
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
		removeCurrentInputListener = function(){ currentInputListener.unbind(); };
		question.ask(function(html) {
			currentQuestionElement.text(html);
		});
	};
	$("#start").on('click', function() {
		database.withData(settings.database(), function(questiondata) {
			questions = database.createQuestions(questiondata, questionfactories.TranslateWord);
			questionFactory = database.createQuestionFactory();

			var ask = function(question) {
				clearInput();
				bindInputToQuestion(question, function() {
					questionFactory.withNextQuestion(ask);
				});
			};

			onNewSequencer(function() {
				questionFactory.withNextQuestion(ask);
			});

			setNewSequencer(questions);
		});
	});
});
