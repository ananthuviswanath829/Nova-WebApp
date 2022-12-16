from rest_framework import serializers #Ananthu


##Serializer for work list
#Author-Ananthu
class UserListGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    full_name = serializers.CharField()
    email = serializers.CharField()
    dob = serializers.SerializerMethodField()
    is_active = serializers.BooleanField()

    def get_dob(self, obj):
        dob = obj.userprofile_set.get(is_active=True).dob
        return dob.strftime("%d %b %Y") if dob is not None else ''