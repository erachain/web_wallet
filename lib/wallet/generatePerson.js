    var casheBase58addressSeed = '';
	var casheBase58SenderAccountAddress = '';
	var casheBase58RecipientAccountAddress = '';
	var casheTimestamp = '';
	var casheFee = '';
	var casheAmount = '';

	function generatePersonDoUpdate() 
	{
		var base58addressSeed = $('#base58SenderAccountSeed').val();
		if ((base58addressSeed != '') && (casheBase58addressSeed != base58addressSeed)) {
			casheBase58addressSeed = base58addressSeed;
			if (Base58.decode(base58addressSeed).length == 32) {
				keyPair = getKeyPairFromSeed(base58addressSeed, false);
				var base58SenderAccountAddress = getAccountAddressFromPublicKey(keyPair.publicKey);
				$('#base58SenderAccountAddress').html(base58SenderAccountAddress);	
			} else {
				$('#base58SenderAccountAddress').val('');
			}
		}
		var base58SenderAccountAddress = $('#base58SenderAccountAddress').html();
		if ((base58SenderAccountAddress != '') && (casheBase58SenderAccountAddress != base58SenderAccountAddress)) {
			casheBase58SenderAccountAddress = base58SenderAccountAddress;
		}
	}

	function generatePersonDoPaymentTransaction() {
		var base58SenderAccountSeed = document.getElementById('base58SenderAccountSeed').value;
		var senderAccountSeed = Base58.decode(base58SenderAccountSeed);
		if(senderAccountSeed.length != 32) {
			$('#base58SenderAccountAddress').val('');
			$("#output").val("invalid seed!");
			alert("Invalid seed!");
			return;
		}
		keyPair = getKeyPairFromSeed(senderAccountSeed);
		var base58SenderAccountAddress = getAccountAddressFromPublicKey(keyPair.publicKey);
		$('#base58SenderAccountAddress').html(base58SenderAccountAddress);
		var description = $('#description').val();
		var head = $("#namePerson").val();
		var icon = [];
		var image = imagebyte;
		var datab;
		var ss;
		ss =  Date.parse($('#birthday').val());
		datab = new Date(ss);
		var birthdayBytes = datab.getTime();// ->;
		var datad;
		datad = new Date($('#deathday').val());
		var deathdayBytes = datad.getTime();// ->;
		if (datad < new Date("01/01/1970") || datab < new Date("01/01/1971")) {
			alert("The dates should be no erlier than 1/1/1970");
			return;
		}
		var gender = $('#gender').val(); //0;
		var birthLatitude = $('#birthLatitude').val();//31.1;
		var birthLongitude = $('#birthLongitude').val(); //140.1;
		var skinColor = "";
		var eyeColor = $('#eyeColor').val();//"карие";
		var hairColor = $('#hairColor').val(); //"Светлый";
		var height = $('#heightperson').val();//183;
		var race = "0"; //"White";				
    	// person to byte
	    var a;
	    a = toBytePerson(keyPair, head, icon, image , description, birthdayBytes, deathdayBytes, gender, race, birthLatitude, birthLongitude, skinColor, eyeColor, hairColor, height);
		$("#txRaw").val(Base58.encode(a)); //Base58.encode(
	}

	function saveRaw() {
		var imageData = $(".image-editor").cropit('imageSrc');
		var imageURIarray = imageData.split(",");
		var base64 = imageURIarray[1];
		var raw = atob(base64);
		  var rawLength = raw.length;
		  var array = new Uint8Array(new ArrayBuffer(rawLength));
		  for (i = 0; i < rawLength; i++) {
			array[i] = raw.charCodeAt(i);
		  }
		imagebyte = array;
		var ss = '<img src="' + imageData + '" style="max-width:250px; height: AUTO;"/>';
		$("#img").html(ss);
	}

	function generatePersononLoad() {
		//document.getElementById('files').addEventListener('change', handleFileSelect, false);
		$(function() {
			$(".image-editor").cropit();
			$("#submitImage").click(function() {
				var imageData = $(".image-editor").cropit("export", {
					type: 'image/jpeg',
					quality: .9,
					originalSize: true
				  });
				var imageURIarray = imageData.split(",");
				var base64 = imageURIarray[1];
				var raw = atob(base64);
      			var rawLength = raw.length;
      			var array = new Uint8Array(new ArrayBuffer(rawLength));
      			for (i = 0; i < rawLength; i++) {
        			array[i] = raw.charCodeAt(i);
      			}
				imagebyte = array;
				var ss = '<img src="' + imageData + '" style="max-width:250px; height: AUTO;"/>';
	  			$("#img").html(ss);
			});
		});  
		$("#nodeUrl").val(appData.nodeUrl);
		$("#base58SenderAccountSeed").val(appData.base58AccountSeed);
		$("#base58SenderAccountAddress").val(appData.base58AccountAddress);
		doNowTime();
		
		var hChanger = document.getElementById("heightChanger");
		hChanger.value = 100;
		hChanger.addEventListener("input", function() {
			var mult = hChanger.value / 100;
			$(".image-editor").cropit('previewSize', { width: 250, height: 250 + 85 * mult });
			$(".cropit-preview").height(250 + 85 * mult);
		}, false); 

	}
