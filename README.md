# qrcode_secure

# Installation


To generate the public and private keys run the following script.

```console
user@server:~$ cd qrcode_secure
user@server:~$ cd qrcode_secure_keys
user@server:~$ npm install
user@server:~$ node generate-keys.js

```

Run in the terminal (Windows ou Linux):

```console

user@server:~$ sudo docker-compose up  --build

```

##Testing Encryption
```console
curl --location --request POST 'http://localhost:3050/api/encrypt?version=1&data=IlRlc3RlIGRlIGF1dGVudGljYcOnw6NvIGRlI
GRvY3VtZW50byBkaWdpdGFsIiwiSm9zw6kgZGEgU2lsdmEgT2xpdmVpcmEiLCIyMDIwMDQxMTEzMjIwMyIsIjEyMzQ1IiwiUmljYXJkbyBkZSBTb3V6
YSBNYWlhIiwiMTQwMDEzNSIsIkRvY3VtZW50byBUZXN0ZSIsIk9mw61jaW8iLCJkMmE5MzAxYzAxMGNhNmUwMzNiZTdhNzNhMWVmZjNiOWE0ODBhYjI
wYTZmYjc5NmY3YmY2Mjk2MCIKICAgIA%3D%3D'

```
The API must return:

```json
{"version":"1",
"data":"nmzA6ohZ67CIHCcWe7LSX2YO7eX2feMTSNGtY3IzixiCuCXUaEKjTdnMw2FuOKAUzWsV/4cV8H+dyUF+kpqVrsOLsjBHsKPYN0hbuODlgRN3oukwVA2RVoHrHmzNEkG+I6YrWZAu7R9BGGsa5iBH1RbDbb1w5/9jwhUxuc+IPohubwiNBAlOEUAJ5B7MOzezlgL39H0K5i81fvtuedUk95cvlZvwfxu5eqEYvOR3eYoSLJGf+MPO8E65hRl2pxyXuQaYPv5lTUeyaWH3fflaliu/lyK3VM0vEcVsvR3FIQWJkdRT8wWmgj0oV/uiVjsrss1votszv7tD21fMVoI/M5tG3Rdapqn/zGFdcJu/594F3piUXB9JBceITXdQe/40q7kgqm0FCysrf4DBmIbQUUqzjjKhRBtxnjcPm0+rt3+WIM95leFRQzjNMYNuHpshWEpYIe6NhRG4HoMUTUqPg9aWjrzeEvStHNmDm0wli8rX2QIQe47q2pAPiSTAAAlCuKdGIMulZ6mOi0zrXrFSlfRYT2GfgZ4urSNzFTcLoAYnazMaSOKC4WrNVRpiyeKWKD2jd1llikWL55AHV4+XkAGXD9uiRorJjGuacp4kPm61k/51xhA9x5jwJ7/RySGZh/UvcluY"
}
```

### QRCode - Browser

http://localhost:3050/api/qrcode?version=1&data=nmzA6ohZ67CIHCcWe7LSX2YO7eX2feMTSNGtY3IzixiCuCXUaEKjTdnMw2FuOKAUzWsV/4cV8H+dyUF+kpqVrsOLsjBHsKPYN0hbuODlgRN3oukwVA2RVoHrHmzNEkG+I6YrWZAu7R9BGGsa5iBH1RbDbb1w5/9jwhUxuc+IPohubwiNBAlOEUAJ5B7MOzezlgL39H0K5i81fvtuedUk95cvlZvwfxu5eqEYvOR3eYoSLJGf+MPO8E65hRl2pxyXuQaYPv5lTUeyaWH3fflaliu/lyK3VM0vEcVsvR3FIQWJkdRT8wWmgj0oV/uiVjsrss1votszv7tD21fMVoI/M5tG3Rdapqn/zGFdcJu/594F3piUXB9JBceITXdQe/40q7kgqm0FCysrf4DBmIbQUUqzjjKhRBtxnjcPm0+rt3+WIM95leFRQzjNMYNuHpshWEpYIe6NhRG4HoMUTUqPg9aWjrzeEvStHNmDm0wli8rX2QIQe47q2pAPiSTAAAlCuKdGIMul/Z6mOi0zrXrFSlfRYT2GfgZ4urSNzFTcLoAYnazMaSOKC4WrNVRpiyeKWKD2jd1llikWL55AHV4+XkAGXD9uiRorJjGuacp4kPm61k/51xhA9x5jwJ7/RySGZh/UvcluY


![Image of QRCODE](https://github.com/CBMDF/qrcode_secure_backend/blob/master/qrcode_example.png)

### Testing Client

http://localhost:3050

