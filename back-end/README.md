# Back-End

## Requirements - Packages
Every package was install with npm locally.
* **dotenv**
* **mangoose**
* **nodemon**
* **express**
* **...**

* **docker**
* **docker-compose**

## Implementation

### Create ssl certificate69

```
openssl genrsa -des3 -out server.key 2048
openssl rsa -in server.key -out server.key
openssl req -sha256 -new -key server.key -out server.csr -subj "/CN=localhost"
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

### For Docker and Docker-Compose installation on Linux
```
sudo apt update
sudo apt upgrade
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker–compose –version
```

### For self-signed certificate
```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

### API URL
**https:/localhost:3000/api-control/**

All endpoints require authentication, except login, signup and forgot-password.
