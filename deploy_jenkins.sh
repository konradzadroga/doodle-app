#!/bin/bash
sudo apt upgrade -y
sudo apt update -y
sudo apt install docker.io docker-compose -y
sudo apt install gnupg2 pass -y
sudo docker pull konradzadroga/doodle-backend:latest
sudo docker pull konradzadroga/doodle-frontend
sudo docker stop $(sudo docker ps -a -q) || true && sudo docker rm $(sudo docker ps -a -q) || true
sudo docker-compose up -d
cd /home/kzadroga123
echo "Last deployed on $(date)" > deployment_date