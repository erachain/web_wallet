var casheTimestamp = ""
var casheFee = ""
var casheAmount = ""


function generatePersonDoUpdate() {
  $("#base58SenderAccountAddress").html(appData.base58AccountAddress)
}

function generatePersonDoPaymentTransaction() {
  var base58SenderAccountAddress = getAccountAddressFromPublicKey(
    appData.keyPair.publicKey
  )
  $("#base58SenderAccountAddress").html(base58SenderAccountAddress)
  var description = appData.getDescriptionValue() //$('#description').val();
  var head = $("#namePerson").val()
  var icon = []
  var image = imagebyte
  var datab
  var ss
  var currentDate = new Date()
  tzOffset = currentDate.getTimezoneOffset() * 60000
  ss = Date.parse($("#birthday").val())
  datab = new Date(ss - tzOffset)
  var birthdayBytes = datab.getTime() // ->;
  var datad
  var ssd
  ssd = Date.parse($("#deathday").val())
  datad = new Date(ssd - tzOffset)
  var deathdayBytes = datad.getTime() // ->;
  if (datad < new Date("01/01/1970") || datab < new Date("01/01/1971")) {
    alert("The dates should be no erlier than 1/1/1970")
    return
  }
  var gender = $("#gender").val() //0;
  var birthLatitude = $("#birthLatitude").val() //31.1;
  var birthLongitude = $("#birthLongitude").val() //140.1;
  var skinColor = ""
  var eyeColor = $("#eyeColor").val() //"карие";
  var hairColor = $("#hairColor").val() //"Светлый";
  var height = $("#heightperson").val() //183;
  var race = "0" //"White";
  // person to byte
  var a
  a = toBytePerson(
    appData.keyPair,
    head,
    icon,
    image,
    description,
    birthdayBytes,
    deathdayBytes,
    gender,
    race,
    birthLatitude,
    birthLongitude,
    skinColor,
    eyeColor,
    hairColor,
    height
  )
  $("#txRaw").val(Base58.encode(a)) //Base58.encode(
}

function saveRaw() {
  let imageData = $(".image-editor").cropit("imageSrc")
  let imageURIarray = imageData.split(",")
  let base64 = imageURIarray[1]
  let raw = atob(base64)
  let rawLength = raw.length
  let array = new Uint8Array(new ArrayBuffer(rawLength))
  for (i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i)
  }
  imagebyte = array
  console.log(imagebyte)
  console.log(imagebyte.length)
  if (imagebyte.length > 15360 && imagebyte.length < 20480) {
    $("#img").html(
      '<img src="' + imageData + '" style="max-width:250px; height: AUTO;"/>'
    )
    $("#imgsize").html(Math.round(rawLength / 1000) + "kB")
    console.log("Норма")
  } else {
    $("#imgwarn").html("<p>Размер изображения должен быть от 15 до 20 Кб</p>")
  }
}

function generatePersononLoad() {
  //document.getElementById('files').addEventListener('change', handleFileSelect, false);
  simplemde = new SimpleMDE({
    element: document.getElementById("MDdescription")
  })
  CKEDITOR.replace("description")
  $(function() {
    $(".image-editor").cropit()
    $("#submitImage").click(function() {
      var imageData = $(".image-editor").cropit("export", {
        type: "image/jpeg",
        quality: 0.7,
        originalSize: false
      })
      // var compressedImage = jic.compress(imageData, 80, 'jpg')
      var imageURIarray = imageData.split(",")
      var base64 = imageURIarray[1]
      var raw = atob(base64)
      var rawLength = raw.length
      var array = new Uint8Array(new ArrayBuffer(rawLength))
      for (i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
      }
      imagebyte = array
      console.log(imagebyte)
      console.log(imagebyte.length)
      if (imagebyte.length > 15360 && imagebyte.length < 20480) {
        var ss =
          '<img src="' +
          imageData +
          '" style="max-width:250px; height: AUTO;"/>'
        $("#img").html(ss)
      } else {
        $("#imgwarn").html(
          "<p>Размер изображения должен быть от 15 до 20 Кб</p>"
        )
      }
    })
  })
  $("#nodeUrl").val(appData.nodeUrl)
  $("#base58SenderAccountAddress").val(appData.base58AccountAddress)
  var hChanger = document.getElementById("heightChanger")
  hChanger.value = 100
  hChanger.addEventListener(
    "input",
    function() {
      var scale = document.getElementById("cropit-image-zoom-input")
      var scaleValue = scale.value
      $(".image-editor").cropit("previewSize", {
        width: 250,
        height: 250 + (85 * Number(hChanger.value)) / 100
      })
      $(".cropit-preview").height(250 + (85 * Number(hChanger.value)) / 100)
      scale.value = scaleValue
    },
    false
  )
}
