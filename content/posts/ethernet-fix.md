---
title: "Fixing ASIX USB Ethernet on Linux"
date: 2024-05-18
tags: ["linux", "kernel", "hardware"]
---

This is less of a blog post and more of a note on how I fixed my Anker 7 in 1 (with Ethernet) USB adapter, as the drivers don't work by default on Linux.

First, troubleshooting step is `lsusb`, it should show you the ASIX Ethernet device after plugging it in:
```bash
❯ lsusb
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 002 Device 002: ID 2109:0817 VIA Labs, Inc. USB3.0 Hub
Bus 002 Device 003: ID 0b95:1790 ASIX Electronics Corp. AX88179 Gigabit Ethernet
Bus 002 Device 004: ID 2537:1081 Norelsys NS1081
...
```

Ok, we can see the USB device, at least.

Next you'll probably see it missing from `ip addr`. This is how you'll know it's a problem with the kernel drivers.
(Skip to the end if it *does* show up in `ip addr`.)

## Kernel Module

I upgraded my kernel to Linux 6.6 and installed [this AUR package, ax-usb-nic-dkms](https://aur.archlinux.org/packages/ax-usb-nic-dkms).
I initially noticed you still can't `sudo modprobe ax_usb_nic` to get the module loaded, but after checking the AUR build logs, I realized I was missing linux66 headers: `sudo pacman -S linux66-headers` does the trick.

After the above, you should be able to load the module with the modprobe command above. You can run `lsmod | grep ax_usb` to verify it's loaded. At this point, the module should kick in and you should see the correct ethernet device in `ip addr`:

```bash
...
9: enp0s13f0u4u2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1472 qdisc fq_codel state UP group default qlen 1000
    ...
```

## UDEV script

Now the problem I still had was the ethernet wasn't being used. However restarting NetworkManager fixes this for me: `systemctl restart NetworkManager`. It's a tad annoying to do this every time I plug in the adapter, though, so I wrote a hacky udev rule:

```bash
❯ cat /etc/udev/rules.d/90-restart-networkmanager.rules
ACTION=="bind", SUBSYSTEM=="usb", ENV{ID_MODEL_ID}=="8352", ENV{ID_VENDOR}="AnkerInnovations_Limited" RUN+="/usr/local/bin/restart_networkmanager.sh"
```

Basically running this every time we see an Anker adapter plugged in:
```bash
❯ cat /usr/local/bin/restart_networkmanager.sh
#!/bin/bash

# Log (optional)
echo "$(date) - Restarting NetworkManager" >> /var/log/networkmanager_restart.log

sleep 5

ethtool enp0s13f0u4u2c2
if ethtool enp0s13f0u4u2c2 | grep -q "Link detected: yes"; then
        # Restart NetworkManager
        systemctl restart NetworkManager
fi
```

Yes the sleep and "pre-run" of `ethtool` seemed to be necessary to prep it sufficiently so the actual run of systemctl restart activates the ethernet.
