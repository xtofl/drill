define(["jquery"], function($) {
	return {
		withData : function(url, then) {
			$.getJSON(url, function(data, textStatus, jqXHR) {
				then(data);
			});
		},

		createQuestions : function(data, creator) {
			var objects = [];

			data.forEach(function(q) {
				objects.push(creator(q));
			});
			return objects;
		},
		
		createQuestionFactory : function(data, creator, sequencer) {
			var questions = this.createQuestions(data, creator);
			var nextQuestionIndex = 0;
			return {
				sequencer: sequencer,
				withNextQuestion : function(then) {
					var q = questions[this.sequencer.nextIndex()];
					then(q);
				},
				setSequencer: function(sequencer) {
					this.sequencer = sequencer;
				}
			};
		}
	};
});
