# Back-End

## Requirements - Packages
Every package was install with npm locally.
* **dotenv**
* **mangoose**
* **nodemon**
* **express**
* **...**

## Implementation

### Rest API

### Open Endpoints
Open endpoints require no Authentication.
* (1)
* (2)

### For MongoDB installation and deployment
```
sudo apt install mongodb
sudo mkdir -p /data/db
sudo chown `id -u` /data/db
mongod --port 27018
```

### For self-signed certificate
```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

### API URL
**https:/localhost:3000/api-control/**

All endpoints require authentication, except login, signup and forgot-password.

### Endpoints:
* (1)
* (2)
* (3)
