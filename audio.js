var createAudioContext = function() {
	try {
    	if(typeof webkitAudioContext === 'function') { // webkit-based
        	return new webkitAudioContext();
    	} else { // other browsers that support AudioContext
    	    return new AudioContext();
    	}
	}
	catch(e) {
    	// Web Audio API is not supported in this browser
    	alert("Web Audio API is not supported in this browser");
	}
}

var getAudio = function(url) {

	source = audioContext.createBufferSource();
	request = new XMLHttpRequest();

	request.open('GET', url, true);

	request.responseType = 'arraybuffer';


	request.onload = function() {
	audioContext.decodeAudioData(
        request.response,
        function(buffer) {
            if(!buffer) {
                // Error decoding file data
                return;
            }

            sourceJs = audioContext.createScriptProcessor(2048);
            sourceJs.buffer = buffer;
            sourceJs.connect(audioContext.destination);
            analyser = audioContext.createAnalyser();
            analyser.smoothingTimeConstant = 0.6;
            analyser.fftSize = 512;

            source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.loop = true;

            source.connect(analyser);
            analyser.connect(sourceJs);
            source.connect(audioContext.destination);

            sourceJs.onaudioprocess = function(e) {
                window.array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
            };

            source.start(0);
        },

	  function(e){"Error with decoding audio data" + e.err});

	}

	request.send();
}



