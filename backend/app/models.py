from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from app.database import Base

class FeatureFlag(Base):
    __tablename__ = "feature_flags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    is_enabled = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())