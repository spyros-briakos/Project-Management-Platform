#!/bin/bash

# # Install Go language
# apt install golang

# # Set up Go environment variable server-wide
# touch /etc/profile.d/goenv.sh
# source ./security/golang-env.sh
# source /etc/profile.d/goenv.sh

# Install Certutil
apt install libnss3-tools -y

# Install mkcert
# --------------
# wget https://github.com/FiloSottile/mkcert/archive/v1.0.0.tar.gz
wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64

# Extract tar.gz file
# tar -xf v1.0.0.tar.gz
# cd ./mkcert-1.0.0/
cp mkcert-v1.4.3-linux-amd64 /usr/local/bin/mkcert
chmod +x /usr/local/bin/mkcert

# make
# cd bin/
# sudo cp mkcert /usr/bin/
# cd ../../
# Mkcert will add valid certificates to Chrome & Firefox
mkcert -install

# # Copy certificates to /etc/ssl
# cp ./localhost+1.pem /etc/ssl/certs/
# cp ./localhost+1-key.pem /etc/ssl/private/

# # Remove unnecessary files
# rm -f v1.0.0.tar.gz

echo -e '\nServer will run on https using trusted, self-signed certificate!\n'