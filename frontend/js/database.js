define({
	questions: function(){
		
		var data = [{text: "slaaf", correct_answer: "servus"}];
		
		var objects = [];
		
		data.forEach(function(q){
			objects.push({
				ask: function(setHtml){
					setHtml(self.text);
				},
				verify: function(answer, onRight, onWrong){ 
					if (q.correct_answer===answer){
						onRight(answer);
					} else {
						onWrong(answer);
					} 
				}
				
			});
		});
		return objects;
	}
});
