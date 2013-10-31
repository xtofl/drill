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
		
		createSequentialSelector: function(from, to){
			var index = from;
			return {
				nextIndex: function(){
					var i = index;
					index++;
					if (index == to) {index = from;}
					return i;
				}
			};
		},

		createQuestionFactory : function(data, creator, selector) {
			var questions = this.createQuestions(data, creator);
			var nextQuestionIndex = 0;
			return {
				withNextQuestion : function(then) {
					var q = questions[selector.nextIndex()];
					then(q);
				}
			};
		}
	};
});
