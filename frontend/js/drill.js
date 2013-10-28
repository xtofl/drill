require(
	[ "./util"
	, "jquery"
	, "database"
	], 
	function
	( util
	, $
	, database
	)
{
	var currentQuestionElement = $("#current_question .question_text");
	var inputElement = $("#current_question .answer_input");
	var feedBack = $("#current_question .feedback");
	
	var questions = [];
	database.questions().forEach(function(q){
		questions.push({
			start: function(){
				q.ask(function(html){
						feedBack.addClass("hidden");
						currentQuestionElement.text(html);
					}
				);
				inputElement.on('change', function(){ 
					q.verify(
						inputElement.text(),
						function(){
							feedBack.removeClass("hidden");
							feedBack.text("$right$");
							feedBack.addClass("right");
						},
						function(wrongAnswer){
							feedBack.removeClass("hidden");
							feedBack.text("$wrong$");
							feedBack.addClass("wrong");
						}
					);
				});
			}
		});
	});
	questions[0].start();
});
