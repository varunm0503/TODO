const inputArea= document.getElementById("input");
let intervalHandler = undefined;
let save = function(txt){
	console.log(txt);
}
inputArea.addEventListener('keyup',function(){
	const that = this;
	if(intervalHandler!==undefined){
		clearTimeout(intervalHandler);
	}
	intervalHandler = setTimeout(function(){ save(that.value) }, 1000);
});

inputArea.addEventListener('keydown',function(){
	if(intervalHandler!==undefined){
		clearTimeout(intervalHandler);
	}
});