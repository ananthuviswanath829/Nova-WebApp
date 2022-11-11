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
            return 'Not friends'
        
        if friends_qs[0].is_accepted:
            return 'Friends'
        else:
            return 'Request sent'


##Serializer for add friend
#Author-Ananthu
class FriendSerializer(serializers.Serializer):
    friend_id = serializers.IntegerField()


##Serializer for friends list
#Author-Ananthu
class FriendsGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user_id = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    def get_user_id(self, obj):
        if self.context['type'] == 'request received':
            return obj.user.id
        else:
            return obj.friend.id
    
    def get_first_name(self, obj):
        if self.context['type'] == 'request received':
            return obj.user.first_name
        else:
            return obj.friend.first_name
    
    def get_last_name(self, obj):
        if self.context['type'] == 'request received':
            return obj.user.last_name
        else:
            return obj.friend.last_name
    
    def get_email(self, obj):
        if self.context['type'] == 'request received':
            return obj.user.email
        else:
            return obj.friend.email

    def get_status(self, obj):
        if obj.is_accepted:
            return 'friends'
        else:
            return self.context['type']