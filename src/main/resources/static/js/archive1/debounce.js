var i = 0;
const getData = () => {

	console.log("getting data:" + i++);
}

const debounce = function(fn, d) {
	let timer;
	return function() {
		let context = this, args = arguments;
		clearTimeout(timer);
	//	console.log(args[0]);
		timer = setTimeout(() => {
			fn.apply(context, args);
		}, d);
	}
}
const betterFunction = debounce(getData, 300);
let customer1 = { name: 'Leo', email: 'leo@gmail.com' };
let customer2 = { name: 'Nat', email: 'nat@hotmail.com' };

function greeting(text1, text2) {
	console.log(text1 + " " + this.name + " " + text2);
}
function one(x, callback){
	console.log("inside function one:"+callback(x));
}
function two(x){
	return "function two:"+2*x
}
function three(){
	console.log("function three:") ;
}
//one("lol",(x)=>"function two:"+x)
three()
//one(4,two)
/*greeting.call(customer1, 'Hello1', 'Hello2');
greeting.apply(customer2, ['Hello1', 'Hello2']); */