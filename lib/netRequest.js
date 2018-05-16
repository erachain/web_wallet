function httpRequest(_methodType, _methodUrl, _processorFunc) {
	let httpRequest = typeof XMLHttpRequest != 'undefined'
			? new XMLHttpRequest()
		    : new ActiveXObject('Microsoft.XMLHTTP');
	let requestUrl = appData.nodeUrl + _methodUrl;
	httpRequest.open(_methodType, requestUrl, true);
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE && this.status === 200) {
            _processorFunc(this.responseText);
		} 
	};
	httpRequest.send();
}
