import strawberry
from datetime import datetime

@strawberry.type
class FeatureFlag:
    id: int
    name: str
    is_enabled: bool
    created_at: datetime