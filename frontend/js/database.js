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
		
		createQuestionFactory : function(sequencer) {
			return {
				sequencer: sequencer,
				withNextQuestion : function(then) {
					var q = this.sequencer.nextQuestion();
					then(q);
				},
				setSequencer: function(sequencer) {
					this.sequencer = sequencer;
				}
			};
		}
	};
});
