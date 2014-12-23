function rand(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

HTMLElement.prototype.setClass = function(ins, out){
	var cl = this.className;
	var clarr = cl.split(' ');

	if(out&&clarr.length>1) clarr = clarr.slice(0, clarr.length-1);
	else if(clarr.length===1) clarr = clarr.slice(0, 1);

	this.className = clarr.join(' ') + ' ' + ins;
}

HTMLElement.prototype.delClassLast = function(){
	var cl = this.className;
	var clarr = cl.split(' ');

	if(clarr.length>1) clarr = clarr.slice(0, clarr.length-1);
	else if(clarr.length===1) clarr = clarr.slice(0, 1);

	this.className = clarr.join(' ');
}
// PANE CLASS

	function pane(el){

		//DOM el
		this.el = el;

		this.coords = ['left','right','top','bottom'];

	}

var wel = document.getElementById('welcome');
setTimeout(function(){
	wel.style.opacity = 0;
	setTimeout(function(){
		wel.style.display = 'none';
	},800)
},3000);

function callback(self,ap,apn,coords){
	if(self.el.className.indexOf('click')!==-1)
		self.el.delClassLast();

	var apdiv = ap.getElementsByClassName('content')[0];
	var apndiv = apn.getElementsByClassName('content')[0];
	var colors = [];

	var word = self.words[rand(0, self.words.length-1)];
	var arr = word.split('');

	if(word==='TANYA')
		self.el.setClass('click');

	for(var i = 0; i<self.colors.length;i++)
		self.colors[i] !== ap.style.backgroundColor ? colors.push(self.colors[i])
														: null;

	apndiv.innerHTML = '';
	apdiv.style.color = colors[rand(0, colors.length-1)];
	setTimeout(function(){
		apn.setClass(coords[rand(0,coords.length-1)],true);
		apn.style.backgroundColor = colors[rand(0, colors.length-1)];
		setTimeout(function(){
			apn.style.zIndex = +ap.style.zIndex + 1;
		},1000);
	},1000);

	var i = 0;
	



	setTimeout(function(){
		var id = setInterval(function(){

		if(i<arr.length){

			apdiv.innerHTML += arr[i];
		}
		if(i>arr.length+2){
			clearInterval(id);
			self.animate();
			return;
		}
			i++;
		},200);
	},800);
}



// CATCH BLOCK
var catchBlock = (function(){
	var self = this;

	this.el =  document.getElementById('catch');
	this.btn = document.getElementById('sendMail');
	this.btn.className += ' rollIn animated';
	this.inputGroup = document.getElementById('inputGroup');
	this.sendText = document.getElementById('sendText');
	this.inputText = document.getElementById('inputText');
	this.textBelow = document.getElementById('textBelow');
	this.textAbove = document.getElementById('textAbove');


	return this;
})();

var matrixIn = (function(){
	var el = document.getElementById('matrix');
	return el;
})();

// BLOCKS CLASS

				
				var clickedcatch = false;

	function block(colors,words,element){
		var self = this;

		// DOM element
		this.el = element;

		//panes
		this.pane = [new pane(this.el.getElementsByClassName('pane')[0]),
						new pane(this.el.getElementsByClassName('pane')[1])];

		var p1 = this.pane[0];
			var p2 = this.pane[1];

		// colors array
		this.colors = colors;

		// word array
		this.words = words;

		//content div
		this.contentDiv = [this.pane[0].el.getElementsByClassName('content')[0],
							this.pane[1].el.getElementsByClassName('content')[0]];

		this.activePane = p1.el;

		this.pane[0].el.style.backgroundColor = this.colors[rand(0, this.colors.length-1)];
			this.pane[1].el.style.backgroundColor = this.colors[rand(0, this.colors.length-1)];

		this.animate = function(func){
			var ap, anp; // active pane, active next pane
			var coords = this.pane[0].coords

			if(this.activePane === this.pane[0].el){
				this.activePane = this.pane[1].el;
				anp = this.pane[0].el;
			} else {
				this.activePane = this.pane[0].el;
				anp = this.pane[1].el;
			}
			ap = this.activePane;

			ap.setClass('center',true);

			
			// var coords =  p1.coords;


			callback(self,ap,anp,coords);

			
		}

		this.el.onclick = function(){
			if(self.el.className.indexOf('click')!==-1&&!clickedcatch){
				var h = document.documentElement.clientHeight;
				
				catchBlock.el.style.marginTop = '0';
				matrixIn.style.marginTop = -h + 'px';

				setTimeout(function(){
					catchBlock.btn.style.display = 'block';
				},1000);

				setTimeout(function(){
					catchBlock.textAbove.style.display = 'block';
				},2000);

				setTimeout(function(){
					catchBlock.textBelow.style.display = 'block';
				},2500);



			} else {
				return false;
			}
		}
	};



// MAIN CLASS

(function(){
	function main(){
		var self = this;

		//colors array
		this.colors = ['rgb(222, 212, 185)','rgb(70, 67, 58)','rgb(206, 83, 77)','rgb(100, 182, 177)'];
		//blocks array
		this.blocks = [];

		//elements array
		this.els = document.getElementsByClassName('col');

		// words array
		this.words = ['Hello!','How old are you?','Whats up?','Hope for the best!',
						'Keep on!','Don\'t give up!','TANYA','Keep calm',
						'Do your best','Pick up','Go on',
						'Get up','Turn around','Hold on!','Let\'s start!',
						'TANYA','Come in'
						];

		// init func
		this.init = function(){
			
			for(var i=0;i<25;i++){

				this.blocks.push(new block( this.colors, this.words, this.els[i]));

				this.blocks[i].animate();
			}



		}

		this.init();
	}

	var main = new main();

})();
