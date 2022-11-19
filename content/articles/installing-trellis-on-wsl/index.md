---
title: "Roots Trellis on the WSL"
date: "2022-09-03T11:10:36+08:00"
draft: "false"
language: "en"
featured_image: "../assets/images/featured/featured-roots.png"
og_image: "/images/opengraph/featured-roots.png"
summary: "I’ve used Roots Trellis for a long time. When I first started using it I was designing and developing on a MacBook Pro. Developing on Apple products is a dream come true. It’s a fantastic environoment for development, and using libraries like Node.js."
description: "I’ve used Roots Trellis for a long time. When I first started using it I was designing and developing on a MacBook Pro. Developing on Apple products is a dream come true. It’s a fantastic environoment for development, and using libraries like Node.js."
author: "Grant County Economic Development"
authortitle: "Creative Director, Coder, Open-Source Fanatic"
socialshare: "true"
authorinfo: "true"
authorimage: "../assets/images/global/author.png"
categories: ['Featured', 'Blog']
tags: ['ansible', 'Roots', 'Roots Trellis', 'WSL', 'WordPress Development', 'WordPress']
featured: "true"
---

I’ve used Roots Trellis for a long time. It's a Complete WordPress server, that uses the same server along a sites life cycle, from local development, staging, and production environments. You have complete partity between every environment. You get a complete WordPress server running all the software you need configured according to the best practices. All of this is powered by Ansible for configuration management. You don’t have to use brittle and confusing Bash scripts or worry about commands you found to copy and paste.

When I first started using it, I was on a MacBook Pro. Developing on MacOS was always a dream come true. It’s an excellent environment for development and using libraries like Node.js. Eventually, I worked in-house for a Microsoft company and had to use Windows 10 while in the office. Finally, I switched full-full time back to Windows.

I’ve been able to get it working a few times with WSL2, but I spent a lot of time and had major headaches. You can install multiple Linux Distributions with different versions on the WSL. I wholeheartedly recommend using WSL 1 for Roots Trellis. I repeat, use WSL Version 1; you will thank me later.

Windows (WSL) Trellis, Bedrock, and Sage development on Windows is supported by several libraries and software packages.

## Install WSL
<a href="https://learn.microsoft.com/en-us/windows/wsl/install"  rel="noreferrer">Use this guide to install the WSL</a>.

Make sure install Ubuntu20.04 (not 22.04). Trellis currently runs on version 20.04. All commands must be run from WSL (Windows Subsystem for Linux). 

## Global Dependencies
Once you have Ubunto20.04 installed, these are the core services you'll need these dependencies:

### PHP
Install PHP 8.1:

```bash
sudo add-apt-repository ppa:ondrej/nginx
sudo apt update
sudo apt install php8.1 php8.1-mbstring php8.1-xml php8.1-zip
```

### Homebrew
Install the brew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Composer
Install Composer: If you have brew.sh installed, that is the fastest way. <a href="https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-ubuntu-20-04"  rel="noreferrer">Digital Ocean</a> has a great installer walk-through.

```bash
brew install composer
```

### NFS Server
Install NFS Kernel Server. <a href="https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nfs-mount-on-ubuntu-20-04"  rel="noreferrer">Digital Ocean</a> has a great walk-through.
```bash
sudo apt update
sudo apt install nfs-kernel-server
```

## Working with Trellis
Trellis relies on a few other software tools. Install these tools:

VirtualBox >= 6.1.38 (install on Windows)
Vagrant >= 2.2.16 (install on Windows and WSL)
Ansible >= 2.10.7 (install in WSL)

## VirtualBox
Download and install the latest version of VirtualBox for Windows. Versions 6.1.38 works with Trellis and WSL at the time of writing this. <a href="https://www.virtualbox.org/wiki/Downloads"  rel="noreferrer">Download it here</a>.

## Vagrant
Install the latest version of Vagrant in WSL and Windows. The WSL version will depend on your Linux distribution; for instance, if you’re using Ubuntu, you’ll want the Debian package. You must install the same version of Vagrant in both Windows and WSL; even a single patch number difference will prevent it from working. You must install both versions because VMs cannot exist “within” WSL; they must be created “outside” in Windows. To do this, Vagrant-in-WSL needs to communicate with Vagrant-in-Windows. Download the 2.2.16 version from the bottom of the downloads page on Vagrant. Choose the dropdown to grab the 2.2.16 version, not the latest. <a href="https://www.vagrantup.com/downloads"  rel="noreferrer">Download it here</a>.

WSL Vagrant install:

```bash
curl -O https://releases.hashicorp.com/vagrant/2.2.16/vagrant_2.2.16_x86_64.deb
curl -O https://releases.hashicorp.com/vagrant/2.2.16/vagrant_2.2.16_SHA256SUMS
curl -O https://releases.hashicorp.com/vagrant/2.2.16/vagrant_2.2.16_SHA256SUMS.sig
curl -sS https://keybase.io/hashicorp/key.asc | gpg --import
gpg --verify vagrant_2.2.16_SHA256SUMS.sig vagrant_2.2.16_SHA256SUMS
shasum -a 256 -c <(cat vagrant_2.2.16_SHA256SUMS | grep 64.deb) -s
sudo apt install ./vagrant_2.2.16_x86_64.deb
```

Follow the instructions on the Vagrant site to configure Vagrant to communicate correctly with Windows and VirtualBox. This will likely involve adding something like the following to .bashrc or a similar file executed when your WSL shell boots up:

```bash
export PATH="$PATH:/mnt/c/Program Files/Oracle/VirtualBox"
export VAGRANT_WSL_ENABLE_WINDOWS_ACCESS="1"
```
The above should be taken as examples and not just copied and pasted into your configuration. Read the linked document and make sure you're configuring your system correctly.

## Ansible
**Note:** *The following commands must be run from WSL.*

Install pip (Python package manager) if you don't already have it:
```bash
brew install pipx
```
# Install Ansible Core:
```bash
pip3 install ansible-core==2.10.7 --user
```
If it doesn't find the ansibile install, just run the apt install.
```bash
sudo apt install ansible
```

## Troubleshooting

If vagrant ssh doesn't work, try:
```bash
echo 'alias vssh="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no vagrant@127.0.0.1 -i ./.vagrant/machines/default/virtualbox/private_key -p"' >> ~/.bashrc
source ~/.bashrc
```

### Slow Site
Sometimes this plugin can cause problems, so you may need to uninstall it if things worsen.

```bash
vagrant plugin install vagrant-winnfsd
vagrant reload # if Vagrant was already running
```
If vagrant-winnfsd causes problems, before uninstalling it you can try forcing it to mount using TCP instead of UDP by adding nfs_udp: false to the NFS mount point configuration lines in your Vagrantfile.

### Ansible or Vagrant complains about permissions
Windows and Linux use different permission models, and mapping Windows permissions to Linux is imperfect. In some cases, Vagrant or Ansible will refuse to run if your permissions inside WSL are too...permissive. WSL offers a way to apply Linux permissions to files stored in the Windows filesystem through the use of metadata. I encourage you to read more about it in Microsoft's WSL docs, but the short version is that adding the following to /etc/wsl.conf in your WSL instance and then restarting it will allow you to apply Linux permissions:

```bash
sudo touch /etc/wsl.conf
sudo nano /etc/wsl.conf
```

Paste this:

```bash
[automount]
options = "metadata,umask=22,fmask=11"
```

Once you've done that, you can then use chmod to apply the correct permissions. For instance, Ansible may complain that it will ignore Trellis's ansible.cfg becuase it is in a world-writable directory; You can fix this by running chmod -R 744 trellis. Vagrant may complain that the ssh keys generated for it to log into the VM are too permissive: chmod 600 on the key file should fix that issue.

## Final Thoughts

This article is a modified version of the old docs that used to be on the Roots.io site. I’ve removed some steps, like showing you how to set up SSH Keys. These are the steps I’ve used to get Trellis up in the WSL1. I hope this helps and saves you some time and from beating your head on your desk. Trellis is such a great development tool. Sites are blazing fast on VPS and NGINX. Composer and the Twelve-factor Methodology is the right way to run a scalable WordPress server.