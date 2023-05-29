const NodeRSA = require('node-rsa');
const CryptoJS = require('crypto-js');
const fs = require('fs');
//定义待加密的数据
const register = '1057-5a84-9734-5f66';

//定义 AES 密钥和 IV
const aesKey = CryptoJS.enc.Utf8.parse('SecretPassphrase');
const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
console.log('aeskey:',aesKey);
console.log('iv:',iv);

//创建RSA实例
const RSA = new NodeRSA();

//首次调用导出密钥对，保存
function getkey(){
    const privateDer = key.exportKey('pkcs8-private-der'); // 导出私钥 DER 编码
    const publicDer = key.exportKey('pkcs8-public-der'); // 导出公钥 DER 编码

    // 将导出的密钥保存到文件中
    fs.writeFileSync('./private_key.der', privateDer);
    fs.writeFileSync('./public_key.der', publicDer);
}
const privateDer = fs.readFileSync('./private_key.der');
RSA.importKey(privateDer, 'pkcs8-private-der');


function getLic(){
    let lic = "";
    try{
        const timestamp = getTimeStampbyCompany();
        const aesData = encrypt(aesKey,timestamp+register,iv);
        const aesDataLength = aesData.length.toString(16);
        const sign = RSA.sign(aesData, 'base64', 'utf8'); // 通过私钥对数据进行签名
        const aesKeyBase64 = CryptoJS.enc.Base64.stringify(aesKey);
        const ivBase64 = CryptoJS.enc.Base64.stringify(iv);

        // console.log(iv);
        // console.log(aesKeyBase64.length);
        // console.log(ivBase64.length);
        // console.log('aesDataLength:',aesDataLength);
        // console.log('aesData:',aesData);
        // console.log('sign:',sign);

        lic = aesKeyBase64 + ivBase64 + aesDataLength + aesData + sign;
        return lic;
    }catch(e){
        console.error(e);
        return lic;
    }
}

// AES 加密
function encrypt(key, data,IV) {
    const cipher = CryptoJS.AES.encrypt(data, key,
        {iv:IV,mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
    // console.log('::::::::',cipher.toString());
    return cipher.toString();
}

function getTimeStampbyCompany(){
    //去数据库查询
    let res = 1905821386;
    return res
}


//将 AES 密钥和 IV 转换为 base64 字符串并输出
const keyBase64 = CryptoJS.enc.Base64.stringify(aesKey);
const ivBase64 = CryptoJS.enc.Base64.stringify(iv);

console.log('key:', keyBase64);
console.log('iv:', ivBase64);

const res = getLic()
console.log(res);
