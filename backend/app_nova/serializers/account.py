from rest_framework import serializers #Ananthu
from app_nova.models import UserSkill #Ananthu


##Serializer for sign up
#Author-Ananthu
class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=True, allow_blank=False)
    last_name = serializers.CharField(required=True, allow_blank=False)
    email = serializers.CharField(required=True, allow_blank=False)
    password = serializers.CharField(required=True, allow_blank=False)


##Serializer to get all skills
#Author-Ananthu
class AllSkillsGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()


##Serializer for user profile edit
#Author-Ananthu
class UserProfileEditSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=True, allow_blank=False)
    last_name = serializers.CharField(required=True, allow_blank=False)
    email = serializers.CharField(required=True, allow_blank=False)
    dob = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S.%fZ", required=False)
    profile_pic = serializers.CharField(required=False, allow_blank=True)
    skills_list = serializers.CharField(required=False, allow_blank=True)
    experience = serializers.CharField(required=True, allow_blank=False)
    per_hour_rate = serializers.CharField(required=True, allow_blank=False)
    availability = serializers.CharField(required=True, allow_blank=False)
    rating = serializers.CharField(required=True, allow_blank=False)


##Serializer for user profile get
#Author-Ananthu
class UserProfileGetSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    dob = serializers.SerializerMethodField()
    # profile_pic = serializers.CharField()
    skills_list = serializers.SerializerMethodField()
    experience = serializers.SerializerMethodField()
    per_hour_rate = serializers.SerializerMethodField()
    availability = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    def get_dob(self, obj):
        if obj.userprofile_set.get(is_active=True, user=obj).dob is not None:
            return obj.userprofile_set.get(is_active=True, user=obj).dob.strftime("%Y-%m-%d")
        else:
            return ''
    
    def get_skills_list(self, obj):
        user_skills_qs = UserSkill.objects.select_related('skill').filter(is_active=True, user=obj)
        return [{'skill': skill.skill.name, 'experience': skill.experience} for skill in user_skills_qs]
    
    def get_experience(self, obj):
        preference_qs = obj.searchpreference_set.filter(is_active=True, user=obj)
        return preference_qs[0].experience if preference_qs.exists() else ''

    def get_per_hour_rate(self, obj):
        preference_qs = obj.searchpreference_set.filter(is_active=True, user=obj)
        return preference_qs[0].per_hour_rate if preference_qs.exists() else ''
    
    def get_availability(self, obj):
        preference_qs = obj.searchpreference_set.filter(is_active=True, user=obj)
        return preference_qs[0].availability if preference_qs.exists() else ''
    
    def get_rating(self, obj):
        preference_qs = obj.searchpreference_set.filter(is_active=True, user=obj)
        return preference_qs[0].rating if preference_qs.exists() else ''