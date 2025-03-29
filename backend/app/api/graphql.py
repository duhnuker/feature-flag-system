import strawberry
from datetime import datetime
from app.schemas.feature_flag import FeatureFlag
from app.services.feature_flag_service import get_feature_flag, set_feature_flag

@strawberry.type
class Query:
    @strawberry.field
    def feature_flag(self, name: str) -> FeatureFlag:
        flag = get_feature_flag(name)
        if flag:
            created_at = datetime.fromisoformat("2025-01-01T00:00:00")
            return FeatureFlag(id=1, name=flag["name"], is_enabled=flag["is_enabled"], created_at=created_at)
        else:
            created_at = datetime.fromisoformat("2025-01-01T00:00:00")
            return FeatureFlag(id=2, name=name, is_enabled=False, created_at=created_at)
        
@strawberry.type
class Mutation:
    @strawberry.mutation
    def update_feature_flag(self, name:str, is_enabled: bool) -> FeatureFlag:
        flag = set_feature_flag(name, is_enabled)
        created_at = datetime.fromisoformat("2025-01-01T00:00:00")
        return FeatureFlag(id=1, name=flag["name"], is_enabled=flag["is_enabled"], created_at=created_at)
    
schema = strawberry.Schema(query=Query, mutation=Mutation)
