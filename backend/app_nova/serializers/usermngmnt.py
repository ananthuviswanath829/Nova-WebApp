from rest_framework import serializers #Ananthu
from django.db.models import Q #Ananthu
from app_nova.models import Friends #Ananthu


##Serializer for user search
#Author-Ananthu
class UserSearchGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    status = serializers.SerializerMethodField()

    def get_status(self, obj):
        user = self.context['request'].user
        friends_qs = Friends.objects.filter(Q(is_active=True,user=user,friend=obj)|Q(is_active=True,user=obj,friend=user))
        if not friends_qs.exists():
            return 'Not friend'
        
        if friends_qs[0].is_accepted:
            return 'Friend'
        else:
            return 'Request sent'


##Serializer for add friend
#Author-Ananthu
class AddFriendSerializer(serializers.Serializer):
    friend_id = serializers.IntegerField()