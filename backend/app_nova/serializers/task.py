from rest_framework import serializers #Ananthu


##Serializer for task create
#Author-Ananthu
class TaskCreateSerializer(serializers.Serializer):
    task_name = serializers.CharField(required=True, allow_blank=False)
    hours = serializers.IntegerField(required=True)


##Serializer for task edit
#Author-Ananthu
class TaskEditSerializer(serializers.Serializer):
    task_id = serializers.IntegerField(required=True)
    task_name = serializers.CharField(required=True, allow_blank=False)
    hours = serializers.IntegerField(required=True)


##Serializer for task details get
#Author-Ananthu
class TaskDetailsGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    task_name = serializers.CharField()
    hours = serializers.IntegerField()