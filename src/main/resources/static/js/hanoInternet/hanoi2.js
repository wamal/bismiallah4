window.onload = function() {
	var gg=1
	go = 0
	var robot=document.getElementById("robotDiv")
	/**
	 * *************************convert a dimension fom Pixel To
	 * Percentage******************************
	 */
	function fomPixelToPercentage(dimension, direction) {
		var e = document.getElementById("container")
		var h = parseFloat(window.getComputedStyle(e).getPropertyValue("height"));
		var w = parseFloat(window.getComputedStyle(e).getPropertyValue("width"));
		var f = 0
		if (direction == "top") {
			f = h
		} else {
			f = w
		}
		return dimension * 100 / f;
	}

    var bar0 = ["disk0", "disk1", "disk2", "disk3", "disk4", "disk5"]
    var bar1 = []
	var bar2 = []
	var moveInfo = []
	bar0.name = "bar0"
	bar1.name = "bar1"
	bar2.name = "bar2"
	var callStack = []
	var elementt = []

/**
 * ************************hanoi
 * function*****************************************************
 */
	function hanoi(a, b, c, n) {
		if (n == 1) {
			callStack.push([a, b])
			return
		}
		hanoi(a, c, b, n - 1)
		callStack.push([a, b])
		hanoi(c, b, a, n - 1)
	}
  
	/**
	 * ********************************************Set*
	 * moveInfo*********************************************
	 */
 function setCallStack(){
    	for(let i=0;i<callStack.length;i++){
    		moveInfo[i] = { from: callStack[i][0], to: callStack[i][1], yEnd: 1, xEnd: 1 }
    		var a = parseInt(moveInfo[i].from.name.charAt(3))
    		var b = parseInt(moveInfo[i].to.name.charAt(3))
    		var disk = moveInfo[i].from.pop()
    		elementt[i] = document.getElementById(disk)
    		var xStartPx = parseFloat(window.getComputedStyle(elementt[i]).getPropertyValue("left"));
    		var xStart = fomPixelToPercentage(xStartPx, "left")
    		var lf = moveInfo[i].to.length
    		moveInfo[i].xEnd = xStart + b * 33.3332
    		moveInfo[i].yEnd = 82 - lf * 15
    		moveInfo[i].to.push(elementt[i].id)
    	}
    }
	
	/**
	 * *******************************************End Set
	 * moveInfo**************************************
	 */
	// for(let i=0;i<callStack.length;i++){
	 
	 document.getElementById("cmdRoomn").addEventListener('click', function (evi) {
		 document.getElementById("robotDiv").style.display = "block";
		 document.getElementById("practiceMode").checked=true
			 hanoi(bar0, bar1, bar2, bar0.length)
			setCallStack()
			var j=0
			for (let i = 0;  i <callStack.length ; i++) {
		    mooveNew(0.5, elementt[i], 5 , "top",j)
		 // mooveNew(5, robot, 20 , "top",j)
		    mooveNew(3, elementt[i], moveInfo[i].xEnd , "left",j+1)
		    mooveNew(0.5, elementt[i], moveInfo[i].yEnd , "top",j+2)
		    	j=j+3
			}
		});
if(document.getElementById("practiceMode").checked){


}
	
/** *********************************************moveV*********************************************** */
function moveV(inc, element, startPosition,endPosition){

	var c = startPosition
	robot.style.left = window.getComputedStyle(element).getPropertyValue("left")
	if (startPosition > endPosition) {
		document.getElementById("helicopterAudio1").play();
		repeat()
	function repeat(){
		if (c > endPosition) {
			c = c - inc
			element.style.top = c + "%"
			robot.style.top = c + "%"
			
		} else{
			go++
			console.log(go)
				element.style.top = endPosition + "%"
				document.getElementById("helicopterAudio1").pause();
				document.getElementById("helicopterAudio1").currentTime = 0;
				document.getElementById("helicopterAudio2").pause();
				document.getElementById("helicopterAudio2").currentTime = 0;
			return
		} 
			requestAnimationFrame(repeat)
	}
	} else {
		document.getElementById("helicopterAudio2").play();
		document.getElementById("helicopterAudio2").currentTime = 20;
		repeatt()
		function repeatt(){
		if (c < endPosition) {
			c = c + inc
			element.style.top = c + "%"
			robot.style.top = c + "%"
		// element.innerHTML=c
		} else {
			go++
			console.log(go)
			element.style.top = endPosition + "%"
			document.getElementById("helicopterAudio1").pause();
			document.getElementById("helicopterAudio1").currentTime = 0;
			document.getElementById("helicopterAudio2").pause();
			document.getElementById("helicopterAudio2").currentTime = 0;
			return
		}
		requestAnimationFrame(repeatt)
		}
	}
}
/** ************************************************moveH************************************************ */
function moveH(inc, element, startPosition,endPosition){
	var c = startPosition
	document.getElementById("helicopterAudio").play();
	if (startPosition > endPosition) {
		repeat()
	function repeat(){
		if (c > endPosition) {
			c = c - inc
			element.style.left = c + "%"
			robot.style.left = c + "%"
		} else{
			go++
			console.log(go)
				element.style.left = endPosition + "%"
				document.getElementById("helicopterAudio").pause();
			document.getElementById("helicopterAudio").currentTime = 0;
			return
		} 
			requestAnimationFrame(repeat)
	}
	} else {
		repeatt()
		function repeatt(){
		if (c < endPosition) {
			c = c + inc
			element.style.left = c + "%"
			robot.style.left = c + "%"
		} else {
			go++
			console.log(go)
				element.style.left = endPosition + "%"
				document.getElementById("helicopterAudio").pause();
			document.getElementById("helicopterAudio").currentTime = 0;
			return
		}
		requestAnimationFrame(repeatt)
		}
	}
}




/**
 * ****************************************************moove
 * New********************************************
 */
function mooveNew(inc, element, endPosition, direction,k){

	var idf=setInterval(waitUntilTurn)
	function waitUntilTurn(){
		let startPositionPx = parseFloat(window.getComputedStyle(element).getPropertyValue(direction));
		let startPosition = fomPixelToPercentage(startPositionPx, direction)
	// element.innerHTML=startPosition
		if(go==k){
			if (direction == "top") {
				moveV(inc, element, startPosition,endPosition)
			// moveV(inc, robot, startPosition,endPosition)
				clearInterval(idf)
			}else{
				moveH(inc, element, startPosition,endPosition)
				// moveH(inc, robot, startPosition,endPosition)
				clearInterval(idf)
			}
		}else{
		}
	}
}




document.getElementById("increD").addEventListener('click', function myFunction() {
	// console.log(bar0.length)
	if (bar0.length < 6) {
		
		bar0.push("disk"+bar0.length)
	
		var divC = document.createElement("div")
		divC.id = "disk" + (bar0.length-1)
	// console.log(divC.id)
		divC.classList.add("disk");
		document.getElementById("container").appendChild(divC)
// var string="nAb".concat(2,1)
			
		var r=document.getElementById(string)
		// console.log(r)
		for(let i=0;i<6-(bar0.length-1);i++){
			var string="nAb".concat(bar0.length-1,i+1)
			console.log(string)
				var smiley = document.createElement("img")
	     	smiley.id=string
	     	smiley.src="/img/myVersionHanoiTower/bored.png" 
		   if(bar0.length-1==2){
			   smiley.src="/img/myVersionHanoiTower/sadSmiley.webp" 
		   }
			   if(bar0.length-1==3){
				   smiley.src="/img/myVersionHanoiTower/sadCat.webp" 
			   }
			   if(bar0.length-1==4){
				   smiley.src="/img/myVersionHanoiTower/emojiSad3.webp" 
			   }
			smiley.classList.add("sadSmiley".concat(bar0.length-1))
			console.log("sadSmiley".concat(bar0.length-1))
			divC.appendChild(smiley)
		}
	}
});


document.getElementById("decD").addEventListener('click', function myFunction() {
console.log(bar0.length )
	if (bar0.length > 2) {
		var disk=bar0.pop()
		var divC = document.getElementById(disk)
	// console.log(divC.id)
		divC.remove()
	}
});


/** ***************************************Mission********************************** */
document.getElementById("mission").addEventListener('click', function myFunction() {
	function end(){
		document.getElementById("arrow").style.visibility = "hidden";
	}
	document.getElementById("arrow").style.visibility = "visible";
	setTimeout(end,3500)
});


document.getElementById("cmdRoomn").addEventListener('mouseover', function myFunction() {

	document.getElementById("computerAudio").play();
console.log("ok")
});

document.getElementById("cmdRoomn").addEventListener('mouseout', function myFunction() {

	document.getElementById("computerAudio").pause();
console.log("ok")
});



document.getElementById("mission").addEventListener('mouseover', function myFunction() {
document.getElementById("missionAudio").play();
});

document.getElementById("mission").addEventListener('mouseout', function myFunction() {
document.getElementById("missionAudio").pause();
});


/**
 * ********************************************Drag and
 * Drop**************************
 */

var dropTarget = document.querySelector("#container");
var draggables = document.querySelectorAll(".disk");


for (let i = 0; i < bar0.length; i++) {
	var t=document.getElementById(bar0[i])
// console.log("before dragstart="+t.id)
	t.addEventListener("dragstart", function (evv) {
		var element=evv.target
		let startPositionPx = parseFloat(window.getComputedStyle(element.parentElement).getPropertyValue("left"))
		let x = fomPixelToPercentage(startPositionPx, "left")
		evv.dataTransfer.setData("srcId", element.parentElement.id);
		evv.dataTransfer.setData("x", x);
// console.log("element.id="+element.parentElement.id+",x="+x)
	});
}



dropTarget.addEventListener('dragover', function (ev) {
	ev.preventDefault();
});

dropTarget.addEventListener('drop', function (evi) {
	
	evi.preventDefault();
	let target = evi.target;
	let srcId = evi.dataTransfer.getData("srcId");
	 console.log(target.id)
	let x = parseFloat(evi.dataTransfer.getData("x"));
	let element=document.getElementById(srcId)
	// console.log("eeeee"+element.id)
	let droppable=((target.id=="beach3")||(target.id=="desert0")||(target.id=="frame2"))
	// console.log("droppable="+droppable)
	if (droppable) {
		
		switch (target.id) {
		
		  case "beach3":
			// console.log("inside beach3")
			  let lb1=bar1.length
			  if(x<33.33){
				  
				  let l0=bar0.length
					let a0=bar0[l0-1]
				 let b0=(element.id==a0)
			//	console.log("element.id="+element.id+","+"a0="+a0)
				if(b0){
					 element.style.left=(x+33.33)+"%"
					 element.style.top=(82-(lb1)*15)+"%"
					 bar1.push(element.id)
					 bar0.pop()
					 checkIfAddToArrayConform(bar1)
					 	audioF(0.2,1000,"bloopAudio")
					 
				}	
					  }
			  else{
				  if(x>66.66){ 
					  let l2=bar2.length
						let a2=bar2[l2-1]
					 let b2=(element.id==a2)
					//  console.log("element.id="+element.id+","+"a2="+a2)
					 if(b2){
						 element.style.left=(x-33.33)+"%"
						 element.style.top=(82-(lb1)*15)+"%"
						  bar1.push(element.id)
						  bar2.pop()
						checkIfAddToArrayConform(bar2)
							  	audioF(0.2,1000,"bloopAudio")
					 }
					 
					  }
			  }
		    break;
		  case "desert0":
			  let lb0=bar0.length
			// console.log("inside desert")
			  if(x>66.66){
				  let l2=bar2.length
					let a2=bar2[l2-1]
				 let b2=(element.id==a2)
				  //console.log("element.id="+element.id+","+"a2="+a2)
				 if(b2){
					 element.style.left=(x-66.66)+"%"
					 element.style.top=(82-(lb0)*15)+"%"
					  bar0.push(element.id)
					  bar2.pop()
					 checkIfAddToArrayConform(bar2)
					 	 audioF(0.2,1000,"bloopAudio")
				 }
					
					  }
			  else{
				  if(x>33.33){
					// console.log("inside x>33.33")
					  let l1=bar1.length
						let a1=bar1[l1-1]
					 let b1=(element.id==a1)
					//  console.log("element.id="+element.id+","+"a1="+a1)
					// console.log("bar1.length="+l1)
					// console.log(a1)
					 if(b1){
						  element.style.left=(x-33.33)+"%"
						  element.style.top=(82-(lb0)*15)+"%"
						  bar0.push(element.id)
						  bar1.pop()
						checkIfAddToArrayConform(bar0)
						 	audioF(0.2,1000,"bloopAudio")
					 }
					
					  }
			  }
			  
		    break;
		  case "frame2":
			//  console.log("inside desertF")
			  let lb2=bar2.length
	//	console.log("element.id="+element.id+","+"a0="+bar0[bar0.length-1])
			  if(x<33.33){
				  let l0=bar0.length
					let a0=bar0[l0-1]
				 let b0=(element.id==a0)
				 //  console.log("element.id="+element.id+","+"a0="+a0+", b0="+b0)
				 if(b0){
					 element.style.left=(x+66.66)+"%"
					 element.style.top=(82-(lb2)*15)+"%"
					  bar2.push(element.id)
					  bar0.pop()
					 checkIfAddToArrayConform(bar2)
					 	 	audioF(0.2,1000,"bloopAudio")
				 }
					  }
			  else{
				  if(x<66.66){ 
					  let l1=bar1.length
						let a1=bar1[l1-1]
					 let b1=(element.id==a1)
					    console.log("element.id="+element.id+","+"a1="+a1)
					 if(b1){
						  element.style.left=(x+33.33)+"%"
						  element.style.top=(82-(lb2)*15)+"%"
						  bar2.push(element.id)
						  bar1.pop()
						  checkIfAddToArrayConform(bar2)
						
						  	audioF(0.2,1000,"bloopAudio")
					 }
					  }
			  }
		}
	//	console.log("bar0="+bar0+"***bar1="+bar1+"***bar2="+bar2)
	}
	
});




// document.addEventListener('mousemove', myListener, false);
// increase()
// decrease()
/**
 * ************************Animate
 * increase*********************************************
 */
function increase(){
	let j=0
	setInterval(animateInscreaseDecrease,600)
	function animateInscreaseDecrease(){
		
		var a="/img/myVersionHanoiTower/increaseNdecrease/".concat("incDec").concat(j+2,"rows.png")
		document.getElementById("increD").src=a
		j=(j+1)%5
	}
}
/**
 * ************************Animate
 * decrease*********************************************
 */
function decrease(){
	let j=4
	setInterval(animateInscreaseDecrease,600)
	function animateInscreaseDecrease(){
		
		var a="/img/myVersionHanoiTower/increaseNdecrease/".concat("incDec").concat(j+2,"rows.png")
		document.getElementById("decD").src=a
		j=j-1
		if (j==-1) j=4
	}
}

function pressDisk(element,elementt){
	var expl= document.getElementById("explosionDiv")
		var pain= document.getElementById("feelingPain2")
	var feel= document.getElementById("feelingPain")
	pain.style.display = "block";

	document.getElementById("squeezingAudio").currentTime=0.5;
	document.getElementById("squeezingAudio").play()
	let hs = parseFloat(window.getComputedStyle(element).getPropertyValue("height"))
	let h0 = fomPixelToPercentage(hs, "top")
		let ws = parseFloat(window.getComputedStyle(element).getPropertyValue("width"))
	let w0 = fomPixelToPercentage(ws, "left")
	
		let ts = parseFloat(window.getComputedStyle(element).getPropertyValue("top"))
	let t0 = fomPixelToPercentage(ts, "top")
	
		let ls = parseFloat(window.getComputedStyle(element).getPropertyValue("left"))
	let l0 = fomPixelToPercentage(ls, "left")
	
	let tts = parseFloat(window.getComputedStyle(elementt).getPropertyValue("top"))
	let tt0 = fomPixelToPercentage(tts, "top")
	
		feel.style.top=t0-65+"%"
		feel.style.left=l0-40+"%"
		expl.style.top=t0+5+"%"
		expl.style.left=l0-20+"%"
		pain.style.left=l0-10+"%"
		pain.style.top=t0+"%"
	 let x=h0
	 let y=w0
	 let t=t0
	let tt=tt0
	 let l=l0
	 console.log("y="+y)
	 c=0.015
	// console.log("l0="+l0+" ,t0"+t0)
	 press()
	
	function press(){
		x=x-c
		y=y+c
		t=t+c/2
		tt=tt+c/2
		l=l-c/3
		element.style.height=x+"%"
		element.style.width=y+"%"
		element.style.top=t+"%"
		elementt.style.top=tt+"%"
		element.style.left=l+"%"
	//	console.log("y="+y+", comp= "+0.9*h0)
		if(x<(0.9*h0)){
			c=0.3
		//	console.log("finish2")
		}
		if(x<(0.3*h0)){
		//	console.log("finish")
			
			document.getElementById("Explosion").currentTime=2
			document.getElementById("Explosion").play()
			document.getElementById("squeezingAudio").pause()
			expl.style.display = "block";
			feel.style.display = "block";
			pain.style.display = "none";
			return
		}
		else{
			
			requestAnimationFrame(press)
		}
		
		
	}
	
	
	
	
}

/**
 * **************************check is adding to array is conform, otherwise
 * start press last disk***
 */
function checkIfAddToArrayConform(array){
if(array.length>1){
	console.log("array name="+array.name)
	console.log(array[array.length-1])
	console.log("gghhhg".charAt(4))
	let last=array[array.length-1].charAt(4)
	let previous=array[array.length-2].charAt(4)
	
	if(previous>last){
		
	pressDisk(document.getElementById(array[array.length-2]),document.getElementById(array[array.length-1]))
		//pressDisk(document.getElementById(array[array.length-2]))
	}
}else{
	return
}
	
}
/*******************************Audio sophisticated function***************************/

function audioF(currentTime,durration,audioId){
	var audioElement= document.getElementById(audioId)
	 audioElement.currentTime=2
	 audioElement.play()
	  setTimeout(()=> {

		  audioElement.pause();

	  }, 1000);
}

/** ********************************End******************************************** */
}


