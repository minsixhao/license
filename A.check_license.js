const NodeRSA = require('node-rsa');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const {time} = require("systeminformation");

//获取从授权服务器传递过来的 AES 密钥、IV 和密文
const keyBase64 = 'U2VjcmV0IFBhc3NwaHJhc2U=';
const ivBase64 = 'MTIzNDU2Nzg5MDEyMzQ1Ng==';
const lic = 'U2VjcmV0UGFzc3BocmFzZQ==MTIzNDU2Nzg5MDEyMzQ1Ng==2cSJgyEQ1S8RMftt0zFcsQQTQHhnOdWLpZd+SEhvzITsI=dXRKLDBQhl0BBxo76qpsei8ru1pxW+mi3r0bvTs73woIhc7n1ZakMM9EahlxO4nbRmsXoQS8eLrY1eNfwegqLA==';
const publicDer = fs.readFileSync('./public_key.der');


//将 AES 密钥和 IV 转换为 Utf8 字符串再转换为 WordArray 对象类型
const aesKey = CryptoJS.enc.Utf8.parse(CryptoJS.enc.Base64.parse(keyBase64).toString());
const iv = CryptoJS.enc.Utf8.parse(CryptoJS.enc.Base64.parse(ivBase64).toString());



function checkLic(lic){
    if (!lic) {
        return false;
      }
      try {
        const aesKeyBase64 = lic.substring(0, 24);
        const ivBase64 = lic.substring(24,48)
        const aesDataLength = parseInt(lic.substring(48, 50), 16);
        const aesData = lic.substring(50, 50 + aesDataLength);
        const sign = lic.substring(50 + aesDataLength);

        // console.log('aesKeyBase64:',aesKeyBase64);
        // console.log('ivBase64:',ivBase64);
        // console.log('aesDataLength:',aesDataLength);
        // console.log('aesData:',aesData);
        // console.log('sign:',sign);
        // console.log('verify:',verifySignRSA(publicDer,aesData,sign));


        const code = decryptAES(aesData,aesKeyBase64,ivBase64)
        const timestamp = code.slice(0,10)
        const companyID = code.slice(10)
        console.log(timestamp)
        console.log(companyID)
      }catch(e){
        console.error(e);
        return false;
      }
}


  // RSA 验证签名
  function verifySignRSA(publicKey, data, sign) {
    const RSA = new NodeRSA();
    RSA.importKey(publicKey, 'pkcs8-public-der');
    return RSA.verify(data, sign, 'utf8', 'base64');
  }

  // AES 解密
  function decryptAES(aesData,keyBase64,ivBase64) {
    const key = CryptoJS.enc.Base64.parse(keyBase64);
    const iv = CryptoJS.enc.Base64.parse(ivBase64);

    const aesDataParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(aesData),
      });
    // console.log(aesDataParams);
    const bytes = CryptoJS.AES.decrypt(aesDataParams,key,{iv:iv,mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
    // console.log(CryptoJS.enc.Utf8.stringify(bytes));
    return CryptoJS.enc.Utf8.stringify(bytes)
  }



let res = checkLic(lic)
console.log(res);
