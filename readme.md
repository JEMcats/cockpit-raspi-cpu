# RasPi CPU - For Cockpit
A Cockpit plugin for Raspberry Pi that shows detailed CPU information, including current frequency, min/max frequencies, temperature, and average temperature per core.

## Features
- Displays per-core:
  - Current frequency
  - Min/Max frequency
  - Temperature
- Shows average CPU temperature
- Auto-updating with selectable refresh speed (Slow, Medium, Fast)
- Clean and responsive web UI (works on mobile)
- Easy install script

## Installation
Run:
```
git clone https://github.com/JEMcats/cockpit-raspi-cpu.git && cd cockpit-raspi-cpu && ./install.sh && cd ../ && sudo rm -r cockpit-raspi-cpu
```

## Uninstalling
Run:
```
sudo rm -rf /usr/share/cockpit/cockpit-raspi-cpu
```

## License
This project is licensed under the GPL-3.0 license.

You may:
- Modify and redistribute the code,
- Only if you keep it open-source and GPL-licensed,
- Provide credit to the original author (Your Name or Username).

No closed-source forks or redistributions allowed.