var generatePerson = "<h5>Person Info</h5>" +
    "<div class='form-group'>" +
    "<div class='card'>" +
    "<div class='card-header'>Person</div>" +
    "<div class='card-block'>" +
    "Account Seed:<br><input type='text' readonly class='form-control' value='' id='base58SenderAccountSeed'>" +
    "Account address:<br><input type='text' readonly class='form-control'  value='' id='base58SenderAccountAddress'>" +
	"Name:<br><input class='form-control' type='text' value='' id='namePerson'>" +
	"Description:<br><textarea style='margin-bottom:10px;' rows=5 class='form-control' id='description'></textarea>" +
    //"Image<input class='form-control' type='file' id='files' name='files[];'/>"+
    "<div class='container' style='margin-top:10px;'>" +
    "<div class='row'>"+
    "<div class='col-sm'>" +
    "<div class='image-editor'>" +
    "<input type='file' class='cropit-image-input'>" +
    "<div class='cropit-preview'></div>" +
    "<div class='image-size-label'>Resize image</div>" +
    "<div class='input-group'><input style='margin-right:20px;' type='range' class='cropit-image-zoom-input'>" +
    "<input style='margin-top:10px;' type='submit' value='crop' id='submitImage'></div>" +
    "</div></div>"+
    "<div class='col-sm '>final image:<br><span id='img'></span></div>" +
    "</div></div>"+
    "<div class='container' style='margin-top:10px;'>" +
    "<div class='row'>"+
    "<div class='col-sm'>birthday:<br><input class='form-control' type='text' value='02/24/1812' id='birthday'></div>" +
    "<div class='col-sm'>deathday:<br><input class='form-control' type='text' value='06/17/1900' id='deathday'></div>" +
    "</div><div class='row'>"+
    "<div class='col-sm'>birthLatitude:<br><input class='form-control' type='text' value='31.2' id='birthLatitude'></div>" +
    "<div class='col-sm'>birthLongitude:<br><input class='form-control' type='text' value='141.3' id='birthLongitude'></div>" +
    "</div><div class='row'>"+
    "<div class='col-sm'>gender(0-m, 1-f):<br><input class='form-control' type='text' value='0' id='gender'></div>" +
    "<div class='col-sm'>race:<br><input class='form-control' type='text' value='white' id='race'></div>" +
    "</div><div class='row'>"+
    "<div class='col-sm'>height:<br><input class='form-control' type='text' value='176' id='heightperson'></div>" +
    "<div class='col-sm'>hairColor:<br><input class='form-control' type='text' value='black' id='hairColor'></div>" +
    "</div><div class='row'>"+
    "<div class='col-sm'>eyeColor:<br><input class='form-control' type='text' value='blue' id='eyeColor'></div>" + 
    "<div class='col-sm'>skinColor:<br><input class='form-control' type='text' value='white' id='skinColor'></div>" +
    "</div>" +
    "</div>" +
    "</div></div>" +
	"<h5 style='margin-top:10px;'>Person Info Byte:<h5>" +
	"<input class='btn btn-default btn-block' style='width:100%;' type='button' id='generateTransaction' value='Generate Person Info Bytes' OnClick='generatePersonDoPaymentTransaction()'>" +
    "<textarea style='margin-top: 10px' class='form-control' rows=5 id=txRaw></textarea><br>" +
    "</div>";
