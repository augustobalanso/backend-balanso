import Redis from 'ioredis'

const redis = new Redis({
    host: 'redis-14428.c15.us-east-1-2.ec2.cloud.redislabs.com',
    port: 14428,
    password: process.env.REDIS_ACCESS
});
