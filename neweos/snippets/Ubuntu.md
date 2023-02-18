# Ubuntu

```
apt update
apt install nginx zsh -y
curl -L https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh
chsh -s /bin/zsh
```

```
adduser codesktop
usermod -a -G sudo codesktop
```

```
sudo nginx -t
sudo nginx -s reload
```

```
sudo ufw status
sudo ufw enable
sudo ufw allow 4567
sudo ufw allow 'OpenSSH'
sudo ufw allow 'Nginx Full'
```

```
less /var/log/auth.log
less /var/log/shadowsocks.log
```
