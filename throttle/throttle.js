const inputArea= document.getElementById("input");
let intervalHandler;
let save = function(txt){
	console.log(txt);
}
inputArea.addEventListener('focus',function(){
	const that = this;
	intervalHandler = setInterval(function(){ save(that.value) }, 1000);
});

inputArea.addEventListener('blur',function(){
	clearInterval(intervalHandler);
});