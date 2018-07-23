// JavaScript Document


$(document).ready(function(){
	setFontSize();
	$(window).resize(function() {
	  setFontSize();
	});

	getAuthToken();
});

function setFontSize(){
	document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 18 + 'px';
}

function getAuthToken() {
    let authToken = "";
    if (isMobile.iOS()) {
    	console.log("iOS Detected");
    	try {
    		var name = "getIvleAuthToken";
    		var payload = {
    			functionName: name
    		};
    		authToken = prompt(JSON.stringify(payload));
    		console.log("AuthToken is  " + authToken);

    	} catch (err) {
    		console.log('The native context does not exist yet');
    		return null;
    	}

    }
	else if (isMobile.Android()) {
		console.log("Android Detected");
	}
	else {
		authToken = prompt("Token", "");
	}
	
    LocalStorageUtil.setItem("API_TOKEN", authToken);
    IVLEEventUtil.token_validate();
}

let isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
