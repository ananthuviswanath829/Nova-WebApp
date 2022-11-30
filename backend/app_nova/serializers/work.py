from rest_framework import serializers #Ananthu


##Serializer for work list
#Author-Ananthu
class WorkListGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    assigned_to = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()

    def get_assigned_to(self, obj):
        return f'{obj.assigned_to.first_name} {obj.assigned_to.last_name}'
    
    def get_created_by(self, obj):
        return f'{obj.created_by.first_name} {obj.created_by.last_name}'


##Serializer for work create
#Author-Ananthu
class WorkCreateSerializer(serializers.Serializer):
    work_name = serializers.CharField(required=True, allow_blank=False)
    start_date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S.%fZ", required=True)
    end_date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S.%fZ", required=True)
    status = serializers.CharField(required=True, allow_blank=False)
    user_id = serializers.IntegerField(required=True)
    description = serializers.CharField(required=True, allow_blank=False)


##Serializer for work list
#Author-Ananthu
class WorkDetailsGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    status = serializers.CharField()
    description = serializers.CharField()
    user_id = serializers.SerializerMethodField()
    start_date = serializers.SerializerMethodField()
    end_date = serializers.SerializerMethodField()

    def get_user_id(self, obj):
        return obj.assigned_to.id
    
    def get_start_date(self, obj):
        return obj.start_date.strftime("%Y-%m-%d")
    
    def get_end_date(self, obj):
        return obj.end_date.strftime("%Y-%m-%d")


##Serializer for work edit
#Author-Ananthu
class WorkEditSerializer(serializers.Serializer):
    work_id = serializers.IntegerField(required=True)
    work_name = serializers.CharField(required=True, allow_blank=False)
    start_date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S.%fZ", required=True)
    end_date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S.%fZ", required=True)
    status = serializers.CharField(required=True, allow_blank=False)
    user_id = serializers.IntegerField(required=True)
    description = serializers.CharField(required=True, allow_blank=False)