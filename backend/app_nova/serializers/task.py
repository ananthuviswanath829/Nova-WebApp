from rest_framework import serializers #Ananthu


##Serializer for task create
#Author-Ananthu
class TaskCreateSerializer(serializers.Serializer):
    task_name = serializers.CharField(required=True, allow_blank=False)
    task_date = serializers.DateField(required=True)
    start_time = serializers.TimeField(required=True)
    end_time = serializers.TimeField(required=True)


##Serializer for task edit
#Author-Ananthu
class TaskEditSerializer(serializers.Serializer):
    task_id = serializers.IntegerField(required=True)
    task_name = serializers.CharField(required=True, allow_blank=False)
    task_date = serializers.DateField(required=True)
    start_time = serializers.TimeField(required=True)
    end_time = serializers.TimeField(required=True)


##Serializer for task details get
#Author-Ananthu
class TaskDetailsGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    task_name = serializers.CharField()
    task_date = serializers.SerializerMethodField()
    start_time = serializers.SerializerMethodField()
    end_time = serializers.SerializerMethodField()

    def get_task_date(self, obj):
        return obj.task_date.strftime('%Y-%m-%d')
    
    def get_start_time(self, obj):
        return obj.start_time.strftime('%H:%M')
    
    def get_end_time(self, obj):
        return obj.end_time.strftime('%H:%M')