we can use particle cloud logs to see the request

[X] deploy API on AWS
[X] API >> Particle Cloud >> API (on AWS)

---------

- AMI images
- linux 64bit
- micro
- 1 instance
- 8 gb

---------

- iot-workshop
- security group for iot workshop
- custom tcp rule, TCP, 8080, default

---------

**LAUNCH**

- create key pair
- save pem file
- `ssh -i "dialex-aws.pem" ec2-user@ec2-35-161-207-249.us-west-2.compute.amazonaws.com`

      ## [Install mongo](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/)
      cd /etc/yum.repos.d
      sudo vi filename
      ```
      [mongodb-org-3.4]
      name=MongoDB Repository
      baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.4/x86_64/
      gpgcheck=1
      enabled=1
      gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
      ```
      :wq
      sudo yum install -y mongodb-org
      sudo mkdir -p /data/db
      sudo chown -R $USER /data/db
      sudo service mongod start

      ## Install Node
      http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html

- wget downloadzip-from-git
- unzip master.zip
- cd api
- npm install

---------

- start and top resets IPs
- elastic IP
- create one, it costs
- right click on ip, associate AMI
