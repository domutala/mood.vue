importScripts('./jsencript.js');

self.onmessage = function (ev) {
  var crypt;

  if (ev.data.fn === 'encrypt') {
    crypt = encrypt(ev.data.key, ev.data.data);
  } else {
    crypt = decrypt(ev.data.key, ev.data.data);
  }

  postMessage(crypt);
};


function decrypt(key, data) {
  if (Array.isArray(data)) {
    var datas = "";

    for (var i = 0; i < data.length; i++) {
      datas += decrypt(key, data[i]);
    }

    return datas;
  }

  var decrypter = new JSEncrypt({ default_key_size: "512" });
  decrypter.setPrivateKey(key);
  var decrypted = decrypter.decrypt(data);

  return decrypted;
}

function encrypt(key, data) {
  var max_length = 86;

  if (typeof data === "string" && data.length > max_length) {
    var datas = [];

    for (var i = 0; i < data.length; i += max_length) {
      var dt = data.slice(i, i + max_length);
      var enc = encrypt(key, dt);
      datas.push(enc);
    }

    return datas;
  }


  var encrypter = new JSEncrypt({ default_key_size: "512" });
  encrypter.setPublicKey(key);
  var encrypted = encrypter.encrypt(data);


  return encrypted;
}

