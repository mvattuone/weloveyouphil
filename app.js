/* Hi, my name is Mike and I'm learning how to use Web Audio API and ThreeJS.
   He's better in Genesis, but you know.

   I mostly do front-end development, and I have a fair amount of experience w/ Django.
   If you need a website... I might be your guy. 

   Find me at https://github.com/mvattuone/
   or http://vattuo.net/

*/

window.onload = function() {
	window.audioContext = createAudioContext()
	getAudio("love.mp3")	
	createScene();
}
