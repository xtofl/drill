require(["./util", "jquery", "database", "questionfactories", "sequencers"], function(util, $, database, questionfactories, sequencers) {
	var currentQuestionElement = $("#current_question .question_text");
	var inputElement = $("#current_question .answer_input");
	var wrongCounterElement = $(".feedback .wrongcounter");
	var rightCounterElement = $(".feedback .rightcounter");
	var totalCounterElement = $(".feedback .totalcounter");
	var feedBack = $("#current_question .feedback .text");

	var data, questionFactory;
	var bindToSettings = function(data, questionFactory) {

		var rangeNotifies = [];
		var sequenceNotifies = [];

		var constructor = function() {
			var option = values[sequenceInput.val()];
			return option.constructor;
		};

		var bindToSequenceInput = function() {
			var sequenceInput = $("#settings_sequence");

			var values = {};
			values.sequential = {
				constructor : sequencers.createSequentialSelector,
				name : '$sequential$'
			};
			values.shuffled = {
				constructor : sequencers.createShuffledSelector,
				name : '$shuffled'
			};

			var output = [];
			for (key in values) {
				output.push('<option value="' + key + '">' + values[key].name + '</option>');
			};
			sequenceInput.html(output.join(''));

			sequenceInput.on('change', function(what) {
				sequenceNotifies.forEach(function(n) {
					n();
				});
			});
		};

		var bindToRangeInput = function() {
			var rangeInput = $("#settings_sequence_range");
			rangeInput.on('change', function() {
				var value = rangeInput.val();
				var from = value.split("-")[0];
				var to = value.split("-")[1];
				var newData = [];
				data.forEach(function(e) {
					if (from <= e.nr && e.nr <= to) {
						newData.push(e);
					}
				});
				rangeNotifiers.forEach(function(n){
					n();
				});
			});
		};
		return {
			connect : function(data, sequenceFactory) {
				bindToSequenceInput(data, sequenceFactory);
			},
			onRangeChanged : function(notify) {
				rangeNotifies.push(notify);
			},
			onSequenceChanged : function(notify) {
				sequenceNotifies.push(notify);
			},
		};
	};

	var settings = bindToSettings();
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
