详细方案：https://jhetux0ycl.feishu.cn/docx/VIdHdcxBFoL3ztxdjK4c0NcqnEd

# 目录文件
A机器：客户机器
B机器：授权服务器

## step1：客户机器生成注册ID
A.generate_register.js：
硬件信息 ==(MD5)=> 注册ID

## step2：授权服务器生成授权码
B.register2license.js：
AES(注册ID+时间戳) + RSA私钥签名信息 + 其他附加信息 ==> 授权码


## step3：客户机器验证授权码
A.check_license.js：

授权码 ==(截取)==> AES(注册ID+时间戳) + RSA私钥签名信息 + 其他附加信息
1. 公钥验证文件安全性
2. 解密 AES 加密
3. 验证时间戳是否过期
