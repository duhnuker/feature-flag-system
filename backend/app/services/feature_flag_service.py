import redis
import json
import os

from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import FeatureFlag

redis_host = os.getenv("REDIS_HOST", "redis")
redis_port = int(os.getenv("REDIS_PORT", 6379))
redis_client = redis.Redis(host=redis_host, port=redis_port, decode_responses=True)

def get_feature_flag(name: str):
    """
    Fetches flag from redis first, then PostgreSQL if not found.

    Args:
        name: feature flag name

    Returns:
        Dictionary containing feature flag data or none if not found
        
    """
    try:
        flag = redis_client.get(f"feature_flag:{name}")
        if flag:
            return json.loads(flag)
        
        # If not found in redis, tries postgresql
        db: Session = SessionLocal()
        try:
            flag = db.query(FeatureFlag).filter(FeatureFlag.name == name).first()

            if flag:
            # Put into redis cache for future
                flag_data = { "name": flag.name, "is_enabled": flag.is_enabled }
                redis_client.set(f"feature_flag:{name}", json.dumps(flag_data))
                return flag_data

            return None
        finally:
            db.close()

    except redis.exceptions.ConnectionError as e:
        print(f"Warning: Redis connection failed: {e}, falling back to database only")
    
        # Redis failed, try database directly
        db: Session = SessionLocal()
        try:
            flag = db.query(FeatureFlag).filter(FeatureFlag.name == name).first()

            if flag:
                return { "name": flag.name, "is_enabled": flag.is_enabled }
            
            return None
        except Exception as db_error:
            print(f"Error accessing database: {db_error}")
            # Default fallback
            return { "name": name, "is_enabled": False}
        finally:
            db.close()



def set_feature_flag(name: str, is_enabled: bool):
    """
    Update flag in PostgreSQL and Redis

    Args: 
        name: Feature flag name
        is_enabled: Flag is enabled or not

    Returns:
        Dictionary of updated feature flag data
    
    """

    db: Session = SessionLocal()
    try:
        flag = db.query(FeatureFlag).filter(FeatureFlag.name == name).first()

        if flag:
            flag.is_enabled = is_enabled
        else:
            flag = FeatureFlag(name=name, is_enabled=is_enabled)
            db.add(flag)

        db.commit()

        # Prepare response data

        flag_data = { "name": name, "is_enabled": is_enabled }

        # Sync to Redis

        try:
            redis_client.set(f"feature_Flag:{name}", json.dumps(flag_data))
        except redis.exceptions.ConnectionError as e:
            print(f"Warning Redis connection failed: {e}, data saved to database only")

        return flag_data
    
    except Exception as e:
        db.rollback()
        print(f"Error updating feature flag: {e}")
        return {"name": name, "is_enabled": is_enabled, "error": str(e)}
    finally:
        db.close()


        