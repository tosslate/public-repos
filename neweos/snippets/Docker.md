# Docker

```
sudo systemctl status docker
sudo usermod -aG docker ${USER}
```

```
docker ps -a
docker system df
```

```
docker image ls
docker volume ls
docker network ls
docker container ls -aq
```

```
docker image prune
docker volume prune
docker container prune
```

```
docker run --rm -v $(pwd):/app composer composer install
docker run -p 9000:9000 -v $(pwd)/data:/data minio/minio server /data
```

```Dockerfile
FROM ubuntu:16.04
RUN apt update && apt install build-essential -y \
               && apt install python-pip -y \
               && pip install shadowsocks
EXPOSE 4567
ENTRYPOINT ["ssserver"]
```

- [x] [How To Install and Use Docker on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
- [x] [How To Install and Use Docker Compose on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)
