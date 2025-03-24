import redis
import json
import os

redis_host = os.getenv("REDIS_HOST", "redis")
redis_port = int(os.getenv("REDIS_PORT", 6379))
redis_client = redis.Redis(host=redis_host, port=redis_port, decode_responses=True)

def get_feature_flag(name: str):
    try:
        flag = redis_client.get(f"feature_flag:{name}")
        if flag:
            return json.loads(flag)
        return None
    except redis.exceptions.ConnectionError as e:
        print(f"Warning: Redis connection failed: {e}, returning default value for {name}")
        return {"name": name, "is_enabled": False}

def set_feature_flag(name: str, is_enabled: bool):
    try:
        flag_data = {
            "name": name,
            "is_enabled": is_enabled
        }
        redis_client.set(f"feature_flag:{name}", json.dumps(flag_data))
        return flag_data
    except redis.exceptions.ConnectionError as e:
        print(f"Warning: Redis connection failed: {e}, returning data without saving")
        return {"name": name, "is_enabled": is_enabled}
        