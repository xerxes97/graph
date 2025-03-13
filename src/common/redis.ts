import redis from "redis";

const client = redis.createClient();

client.on("error", (err) => console.error("Redis Client Error", err));

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log("✅ Redis connected");
  }
};

const manageRedisData = async (key: string, callback: Function) => {
  const redisValues = await client.get("characters");
  if (redisValues) return JSON.parse(redisValues);
  const data = await callback();
  await client.set("characters", JSON.stringify(data));
  return data;
};

export { client, connectRedis, manageRedisData };
