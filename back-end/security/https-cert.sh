#!/bin/bash

cd ./security

# Install Certutil
apt install libnss3-tools -y

# Install mkcert
# --------------
wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64
cp mkcert-v1.4.3-linux-amd64 /usr/local/bin/mkcert
chmod +x /usr/local/bin/mkcert

# Mkcert will add valid certificates to Chrome & Firefox
mkcert -install

# Create local certificates
mkcert localhost 127.0.0.1

chmod 755 localhost+1.pem
chmod 755 localhost+1-key.pem

cd ..

echo -e '\nServer will run on https using trusted, self-signed certificate!\n'