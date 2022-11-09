from rest_framework import serializers #Ananthu


##Serializer for user search
#Author-Ananthu
class UserSearchGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField(required=True, allow_blank=False)
    last_name = serializers.CharField(required=True, allow_blank=False)
    email = serializers.CharField(required=True, allow_blank=False)