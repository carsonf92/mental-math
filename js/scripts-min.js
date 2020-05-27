function ready(e){"loading"!==document.readyState?e():document.addEventListener&&document.addEventListener("DOMContentLoaded",e)}ready(function(){function e(e,t){document.getElementById(e).addEventListener("keyup",function(e){13!==e.keyCode&&88!==e.keyCode||t()})}function n(e){"title"===document.querySelector("section.active").id&&document.querySelector("body").classList.remove("title"),"title"===e&&document.querySelector("body").classList.add("title"),document.querySelector("section.active").classList.remove("active"),document.getElementById(e).classList.add("active"),("highscores"!==e||e)&&document.querySelector("section.active input:checked").focus()}function o(e){if(27===e.keyCode||90===e.keyCode){var t=document.querySelector("section.active");"start"!==t.id&&"highscores"!==t.id||n("title"),"gametype"===t.id&&n("start"),"gameplay"===t.id&&(document.removeEventListener("keyup",o),document.getElementById("prompt").classList.add("active"),document.getElementById("resign").focus())}}function t(e){13!==e.keyCode&&88!==e.keyCode||(document.querySelector("#answers input:checked + span").innerText==l.equationArray[2]?(document.querySelectorAll("#answers input").forEach(function(e){e.removeEventListener("keyup",t)}),l.correctCount++,document.querySelector("#answers input:checked").parentNode.classList.add("is-success"),setTimeout(function(){u(l.discipline),document.querySelectorAll("#answers input").forEach(function(e){e.addEventListener("keyup",t)})},500)):(document.querySelectorAll("#answers input").forEach(function(e){e.removeEventListener("keyup",t)}),document.querySelector("#answers input:checked").parentNode.classList.add("is-error"),document.querySelector("#gameplay .nes-container").classList.add("wrong"),setTimeout(function(){document.querySelector("#gameplay .nes-container").classList.remove("wrong"),u(l.discipline),document.querySelectorAll("#answers input").forEach(function(e){e.addEventListener("keyup",t)})},500)))}function r(){10===l.timer&&(document.querySelector("#info progress").classList.remove("is-success"),document.querySelector("#info progress").classList.add("is-warning")),5===l.timer&&(document.querySelector("#info progress").classList.remove("is-warning"),document.querySelector("#info progress").classList.add("is-error")),0<l.timer?(l.timer--,document.querySelector("#info progress").setAttribute("value",60-l.timer)):s()}function c(){for("challenge"===l.mode?(document.querySelector("#info progress").setAttribute("value",0),document.querySelector("#info progress").classList.remove("is-error"),document.querySelector("#info progress").classList.remove("is-warning"),document.querySelector("#info progress").classList.add("is-success"),document.querySelector("#info progress").classList.add("active"),d=setInterval(r,1e3)):document.querySelector("#info progress").classList.remove("active"),i=0;i<3;i++)document.querySelectorAll("#answers label")[i].classList.remove("is-disabled");document.querySelector("section.active input:checked").focus(),u(l.discipline)}function s(){for("challenge"===l.mode&&(clearInterval(d),l.timer=60,document.getElementById("answer-total").innerHTML=l.correctCount+"/"+l.equationCount,document.getElementById("score-total").innerHTML=l.correctCount-(l.equationCount-l.correctCount),document.removeEventListener("keyup",o),document.getElementById("summary").classList.add("active"),document.getElementById("replay-challenge").focus()),i=0;i<3;i++)document.querySelectorAll("#answers label")[i].classList.add("is-disabled");l.equationCount=0,l.correctCount=0,l.equationArray=[0,0,0],l.equationAnswers=[0,0,0]}function u(e){switch(l.equationCount++,e){case"addition":!function(){if(l.equationArray[0]=a(1,99),l.equationArray[1]=a(1,100-l.equationArray[0]),l.equationArray[2]=l.equationArray[0]+l.equationArray[1],a(0,1)){var e=l.equationArray[0];l.equationArray[0]=l.equationArray[1],l.equationArray[1]=e}document.getElementById("operator").innerHTML="+",document.getElementById("digit-one").innerHTML=l.equationArray[0],document.getElementById("digit-two").innerHTML=l.equationArray[1]}()}!function(){document.querySelectorAll("#answers label").forEach(function(e){e.classList.remove("is-success"),e.classList.remove("is-error")}),l.equationAnswers[0]=l.equationArray[2];for(;l.equationAnswers[1]=a(0,100),l.equationAnswers[1]===l.equationAnswers[0];);for(;l.equationAnswers[2]=a(0,100),l.equationAnswers[2]===l.equationAnswers[0]||l.equationAnswers[2]===l.equationAnswers[1];);(function(e){var t,n,o=e.length;for(;0!==o;)n=Math.floor(Math.random()*o),t=e[o-=1],e[o]=e[n],e[n]=t})(l.equationAnswers),document.querySelector("#answer-one + span").innerHTML=l.equationAnswers[0],document.querySelector("#answer-two + span").innerHTML=l.equationAnswers[1],document.querySelector("#answer-three + span").innerHTML=l.equationAnswers[2]}()}function a(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var d,l={discipline:"addition",mode:"practice",equationArray:[0,0,0],equationAnswers:[0,0,0],equationCount:0,correctCount:0,timer:60};document.getElementById("press-start").focus(),document.addEventListener("mouseup",function(){document.querySelector("section.active input:checked").focus()}),e("press-start",function(){n("start")}),e("view-highscores",function(){n("highscores")}),e("addition",function(){l.discipline="addition",n("gametype")}),e("subtraction",function(){l.discipline="subtraction",n("gametype")}),e("multiplication",function(){l.discipline="multiplication",n("gametype")}),e("division",function(){l.discipline="division",n("gametype")}),e("practice",function(){l.mode="practice",c(),n("gameplay")}),e("challenge",function(){l.mode="challenge",c(),n("gameplay")}),e("resign",function(){document.getElementById("prompt").classList.remove("active"),s(),n("title"),document.addEventListener("keyup",o)}),e("dismiss",function(){document.getElementById("prompt").classList.remove("active"),document.querySelector("section.active input:checked").focus(),document.addEventListener("keyup",o)}),e("replay-challenge",function(){document.getElementById("summary").classList.remove("active"),c(),document.addEventListener("keyup",o)}),e("end-challenge",function(){document.getElementById("summary").classList.remove("active"),n("title"),document.addEventListener("keyup",o)}),document.addEventListener("keyup",o),document.querySelectorAll("#answers input").forEach(function(e){e.addEventListener("keyup",t)})});