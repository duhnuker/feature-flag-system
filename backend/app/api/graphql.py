import strawberry
from app.schemas.feature_flag import FeatureFlag
from app.services.feature_flag_service import get_feature_flag, set_feature_flag

@strawberry.type
class Query:
    @strawberry.field
    def feature_flag(self, name: str) -> FeatureFlag:
        flag = get_feature_flag(name)
        if flag:
            return FeatureFlag(id=1, name=flag["name"], is_enabled=flag["is_enabled"], created_at="2025-01-01T00:00:00Z")
        else:
            return FeatureFlag(id=2, name=name, is_enabled=False, created_at="2025-01-01T00:00:00Z")
        
@strawberry.type
class Mutation:
    @strawberry.mutation
    def update_feature_flag(self, name:str, is_enabled: bool) -> FeatureFlag:
        flag = set_feature_flag(name, is_enabled)
        return FeatureFlag(id=1, name=flag["name"], is_enabled=flag["is_enabled"], created_at="2025-01-01T00:00:00Z")
    
schema = strawberry.Schema(query=Query, mutation=Mutation)