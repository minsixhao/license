const si = require('systeminformation');
const CryptoJS = require('crypto-js');

async function generateRegCode() {
  try {
    // 获取CPU信息
    let cpuInfo
    await si.cpu()
        .then(data => cpuInfo =data)
        .catch(error => console.error(error));

    // 获取内存信息
    let memInfo;
    await si.mem()
        .then(data => memInfo =data)
        .catch(error => console.error(error));

    // 获取磁盘信息
    let diskLayoutInfo;
    await si.diskLayout()
        .then(data => diskLayoutInfo =data)
        .catch(error => console.error(error));

    // 获取网卡信息
    let networkInterfacesInfo;
    await si.networkInterfaces()
        .then(data => networkInterfacesInfo =data)
        .catch(error => console.error(error));

    // 获取显卡信息
    let graphicsInfo;
    await si.graphics()
        .then(data => graphicsInfo =data)
        .catch(error => console.error(error));

    // 获取声卡信息
    let audioInfo;
    await si.audio()
        .then(data => audioInfo =data)
        .catch(error => console.error(error));

    // 获取主板信息
    let baseboardInfo;
    await si.baseboard()
        .then(data => baseboardInfo =data)
        .catch(error => console.error(error));

    // 获取 USB 设备信息
    let usbInfo;
    await si.usb()
        .then(data => usbInfo =data)
        .catch(error => console.error(error));
  
    const cpu = cpuInfo.brand;
    const mem = memInfo.total;
    const baseboard = baseboardInfo.model;


    console.log(baseboard)
    const regInfo = `${cpu}-${Math.round(mem)}-${baseboard}`; // 将 CPU、内存、磁盘等信息拼接
    console.log(regInfo)
    //const encrypted = CryptoJS.AES.encrypt(regInfo, 'secretKey'); // 对拼接后的信息进行加密处理
    const hash = CryptoJS.MD5(regInfo).toString(); // 对加密后的信息进行哈希处理

    const regCode = `${hash.substr(0, 4)}-${hash.substr(4, 4)}-${hash.substr(8, 4)}-${hash.substr(12, 4)}`; // 将哈希值格式化为注册码
    return regCode;
  } catch (err) {
    console.error(err);
  }
}

generateRegCode().then(regCode => {
  console.log(`注册码为：${regCode}`);
});
