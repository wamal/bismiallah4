window.onload = function() {
	go = true
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

	function hanoi(a, b, c, n) {
		if (n == 1) {
			callStack.push([a, b])
			return
		}
		hanoi(a, c, b, n - 1)
		callStack.push([a, b])
		hanoi(c, b, a, n - 1)
	}
	hanoi(bar0, bar1, bar2, 6)
	/**
	 * ********************************************Set*
	 * moveInfo*********************************************
	 */
	function setMoveInfo(i) {
		moveInfo[i] = { from: callStack[i][0], to: callStack[i][1], yEnd: 1, xEnd: 1 }
		var a = parseInt(moveInfo[i].from.name.charAt(3))
		var b = parseInt(moveInfo[i].to.name.charAt(3))
		var disk = moveInfo[i].from.pop()
		elementt[i] = document.getElementById(disk)
		// console.log(i+","+elementt[i].id)
		
		var xStartPx = parseFloat(window.getComputedStyle(elementt[i]).getPropertyValue("left"));
		var xStart = fomPixelToPercentage(xStartPx, "left")
		var lf = moveInfo[i].to.length
		moveInfo[i].xEnd = xStart + b * 33.32
		moveInfo[i].yEnd = 82 - lf * 8
		moveInfo[i].to.push(elementt[i].id)
	// console.log(callStack[i][1])
		// console.log("lenght:"+moveInfo[i].to.lenght)
	//	console.log(i+" =>from-"+moveInfo[i] .from.name+":"+moveInfo[i] .from+"=>to-"+moveInfo[i] .to.name+","+moveInfo[i].to)
	}
	/**
	 * *********************************************End Set*
	 * moveInfo****************************************
	 */
	// for(let i=0;i<callStack.length;i++){
	for (let i = 0;  i < 2; i++) {
		var precedingElement = document.getElementById("barr4")
		if (i > 0) {
			precedingElement = elementt[i - 1]
		}
		setMoveInfo(i)
	// console.log(elementt[i].id+", "+precedingElement.id)
                    waitUntil(move, 0.01, elementt[i], 20, "top", 4,precedingElement)
					waitUntil(move, 0.1, elementt[i], moveInfo[i].xEnd, "left", 4,elementt[i])
					waitUntil(move, 0.04, elementt[i], moveInfo[i].yEnd, "top", 4,elementt[i])
		
		
		
	// console.log("i=" + i + ", precedingElement:" + precedingElement.id + " ,"
	// + elementt[i].id)
		// fullMove(0.1, elementt[i], moveInfo[i].xEnd,
		// moveInfo[i].yEnd,precedingElement)
	}
// fullMove(0.1, document.getElementById("disk5"), 80, 80,
// document.getElementById("disk0"))
	// waitUntil(move, 0.1, document.getElementById("disk4"), 20, "top", 4)
	// fullMove(0.1, document.getElementById("disk4"), 80,
	// 70,document.getElementById("disk5"))
	/** *****************************************FullMoveFunction***************************************** */
	function fullMove(inc, element, xEnd, yEnd, precedingElement) {
		idjk = setInterval(continuouslyCheckVariation, 20)
		function continuouslyCheckVariation() {
			var x0 = parseFloat(window.getComputedStyle(precedingElement).getPropertyValue("left"))
			var y0 = parseFloat(window.getComputedStyle(precedingElement).getPropertyValue("top"))
			setTimeout(measureVariation, 10);
			function measureVariation() {
				var x1 = parseFloat(window.getComputedStyle(precedingElement).getPropertyValue("left"))
				var y1 = parseFloat(window.getComputedStyle(precedingElement).getPropertyValue("top"))
				if ((x1 == x0)  && (y1 == y0) ) {
					clearInterval(idjk)
					waitUntil(move, inc, element, 20, "top", 4)
					waitUntil(move, inc, element, xEnd, "left", 4)
					waitUntil(move, inc, element, yEnd, "top", 4)
				}
			}
		}
	}
	/*
	 * *********************************************End Full*
	 * Move******************************************
	 */
	/** *********************************************move**************************************************** */
	function move(inc, element, endPosition, direction, t) {
		let startPositionPx = parseFloat(window.getComputedStyle(element).getPropertyValue(direction));
		let startPosition = fomPixelToPercentage(startPositionPx, direction)
		// console.log(endPosition)
		var id = setInterval(moove, t)
		var c = startPosition
		function moove() {
			if (direction == "top") {
				if (startPosition > endPosition) {
					if (c > endPosition) {
						c = c - inc
						element.style.top = c + "%"
					} else{
						return
					
					} 
				} else {
				// element.innerHTML = (c - endPosition)
					if (c < endPosition) {
						c = c + inc
						element.style.top = c + "%"
					} else {
						return
						
					}
				}
			} else {
				if (startPosition > endPosition) {
					if (c > endPosition) {
						c = c - inc
						element.style.left = c + "%"
					} else return
				} else {
					if (c < endPosition) {
						c = c + inc
						element.style.left = c + "%"
					} else return
				}
			}
			requestAnimationFrame(moove)
		}
	}
	/** *********************************************moveUp************************************************* */


	/** ******************************************waitUntilCondition******************************************* */
	 /**
		 * **************wait until a condition is satisfied then call a
		 * function***********************************
		 */
	function waitUntil(callback, inc, element, endPosition, direction, t,precedingElement) {
		var idd = setInterval(checkGo, 2)
		
		function checkGo() {
			// console.log(go+" ,"+direction)
			if (go == true) {
				go = false
				clearInterval(idd)
				idj = setInterval(continuouslyCheckVariation, 30)

			}
		}
		function continuouslyCheckVariation() {
			var x0 = parseFloat(window.getComputedStyle(precedingElement).getPropertyValue("left"))
			var y0 = parseFloat(window.getComputedStyle(precedingElement).getPropertyValue("top"))
			setTimeout(measureVariation, 20);
			function measureVariation() {
				// console.log(element.id)
				console.log("inside measureVariation")
				var y1 = parseFloat(window.getComputedStyle(precedingElement).getPropertyValue("top"))
				var x1 = parseFloat(window.getComputedStyle(precedingElement).getPropertyValue("left"))
				// precedingElement.innerHTML = (y0 - y1) // + " ," + x0 + " ,"
				// + x1
				if ((x1 == x0)  && (y1 == y0) ) {
					clearInterval(idj)
					// console.log("ok, waitUntil" + element.id)
					go = true
					callback(inc, element, endPosition, direction, t)
				}
			}
		}
	}
	/**
	 * ****************************************wait
	 * untilll****************************************************
	 */
	function waitUntill(callback, inc, element, endPosition, direction, t,precedingElement,k) {
		var iddd = setInterval(checkGo, 2)
		function checkGo() {
			if (go == k) {
				clearInterval(iddd)
               callback(inc, element, endPosition, direction, t)
			}
		}
	}
}