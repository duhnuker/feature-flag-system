import strawberry
from datetime import datetime
from typing import Optional

@strawberry.type
class FeatureFlag:
    id: int
    name: str
    is_enabled: bool
    created_at: datetime
