var slideIndex = 1;
var currentToy = 0;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1} 
  currentToy = slideIndex-1;
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }
  x[slideIndex-1].style.display = "inline-block"; 
  $("#result").text("Qual é o brinquedo?");
  $("#gif").css("visibility", "hidden");
  $(".next").css("visibility", "hidden");
}

$("#speaker").click(function() {
	$("#speaker").addClass('speak-recording').removeClass('speak-standby');
	recognition.start();
});

$(".next").click(function() {
	plusDivs(1);
})

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
window.SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

// var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var toysJson = {
	"urso": ["urso", "ursinho", "ursinho de pelúcia"],
	"cavalo": ["cavalo", "cavalinho"],
	"trem": ["trem", "trenzinho"]
}
var toys = ['urso', 'cavalo', 'trem']
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + toys.join(' | ') + ' ;'

var recognition = new window.SpeechRecognition();
var speechRecognitionList = new window.SpeechGrammarList();
window.speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'pt-BR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.body.onclick = function() {
  
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  $("#speaker").addClass('speak-standby').removeClass('speak-recording');
  var last = event.results.length - 1;
  var toy = event.results[last][0].transcript;

  // diagnostic.textContent = 'Result received: ' + color + '.';
  $("#result").text(toy);
  let attr = toys[currentToy];
  let words = toysJson[attr];
  for(i in words) {
  	if(words[i] == toy) {
	  	$("#gif").attr("src", "img/check.gif");
	  	$(".next").css("visibility", "visible");
	  	break;
	  } 
	  else {
	  	$("#gif").attr("src", "img/error.gif");
	  }
	}
  $("#gif").css("visibility", "visible");
  console.log('Confidence: ' + event.results[0][0].confidence);
 
}

recognition.onspeechend = function() {
	$("#speaker").addClass('speak-standby').removeClass('speak-recording');
  recognition.stop();
}

recognition.onnomatch = function(event) {
  // diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  // diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
