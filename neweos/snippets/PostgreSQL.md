# PostgreSQL

```
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

```
sudo -u postgres psql
sudo -u postgres createuser --interactive
sudo -u postgres createdb codesktop
sudo -u postgres createdb codesktop_applause --owner=codesktop
```

```
sudo adduser codesktop
sudo -u codesktop psql
```

```
\c codesktop_applause
\password
\conninfo
```

```
pg_dump -W -U codesktop -h localhost codesktop_applause > "codesktop_applause_$(date '+%Y%m%d').dump"
psql -W -U codesktop -h localhost codesktop_applause < codesktop_applause_20190616.dump
```
