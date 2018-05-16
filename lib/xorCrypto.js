function xorEncrypt(data, key) {
  let byteArray = new Uint8Array(data);
  byteArray = byteArray.map(function(num) {
    return num ^ key;
  });
  return byteArray;
}

function xorDecrypt(data, key) {
  let byteArray = new Uint8Array(data.split(','));
  byteArray = byteArray.map(function(num) {
    return num ^ key;
  });
  return byteArray;
} 