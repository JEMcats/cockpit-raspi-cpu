#!/bin/bash

set -e  # Exit on error
set -u  # Error on unset vars

function step() {
  echo -ne "\r\033[K[ $1 ] $2"
  sleep 0.5
}

function die() {
  echo -e "\n Error: $1"
  exit 1
}

echo " Installing cockpit-raspi-cpu..."

step "1/6" "Removing any previous installation..."
sudo rm -rf /usr/share/cockpit/cockpit-raspi-cpu || die "Failed to remove old files"

step "2/6" "Making cpuinfo executable..."
chmod +x cpuinfo || die "Failed to chmod cpuinfo"

step "3/6" "Going up a directory..."
cd ../ || die "Failed to change directory"

step "4/6" "Copying files to /usr/share/cockpit..."
sudo cp -r cockpit-raspi-cpu /usr/share/cockpit || die "Failed to copy files"

step "5/6" "Fixing permissions..."
sudo chmod -R a+r /usr/share/cockpit/cockpit-raspi-cpu || die "Failed to chmod read"
sudo chmod +x /usr/share/cockpit/cockpit-raspi-cpu/cpuinfo || die "Failed to chmod cpuinfo exec"

step "6/6" "Restarting cockpit service..."
sudo systemctl restart cockpit || die "Failed to restart cockpit"

echo -e "\r\033[K Installed successfully!"