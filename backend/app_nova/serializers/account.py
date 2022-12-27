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
    node_address = serializers.CharField(required=False, allow_blank=True)
    private_key = serializers.CharField(required=False, allow_blank=True)
    payment_method = serializers.CharField(required=False, allow_blank=True)
    per_hour_cost = serializers.CharField(required=False, allow_blank=True)


##Serializer for user profile get
#Author-Ananthu
class UserProfileGetSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    dob = serializers.SerializerMethodField()
    profile_pic = serializers.SerializerMethodField()
    skills_list = serializers.SerializerMethodField()
    experience = serializers.SerializerMethodField()
    per_hour_rate = serializers.SerializerMethodField()
    availability = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    eth_node_address = serializers.SerializerMethodField()
    eth_private_key = serializers.SerializerMethodField()
    user_per_hour_rate = serializers.SerializerMethodField()
    payment_method = serializers.SerializerMethodField()
    user_rating = serializers.SerializerMethodField()
    super_coin_node_address = serializers.SerializerMethodField()
    super_coins = serializers.SerializerMethodField()

    def get_profile_pic(self, obj):
        profile_pic = obj.userprofile_set.get(is_active=True, user=obj).profile_pic
        return profile_pic if profile_pic is not None else ''

    def get_dob(self, obj):
        dob = obj.userprofile_set.get(is_active=True, user=obj).dob
        return dob.strftime("%Y-%m-%d") if dob is not None else ''
    
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
    
    def get_eth_node_address(self, obj):
        crypto_credentials_qs = obj.cryptocredentials_set.filter(is_active=True, user=obj)
        return crypto_credentials_qs[0].eth_node_address if crypto_credentials_qs.exists() else ''
    
    def get_eth_private_key(self, obj):
        crypto_credentials_qs = obj.cryptocredentials_set.filter(is_active=True, user=obj)
        return crypto_credentials_qs[0].eth_private_key if crypto_credentials_qs.exists() else ''
    
    def get_payment_method(self, obj):
        payment_method_obj = obj.userprofile_set.get(is_active=True, user=obj).payment_method
        return payment_method_obj.name if payment_method_obj is not None else ''
    
    def get_user_per_hour_rate(self, obj):
        per_hour_rate = obj.userprofile_set.get(is_active=True, user=obj).per_hour_rate
        return str(per_hour_rate) if per_hour_rate is not None else ''
    
    def get_user_rating(self, obj):
        return str(obj.userprofile_set.get(is_active=True, user=obj).rating)
    
    def get_super_coin_node_address(self, obj):
        return obj.cryptocredentials_set.get(is_active=True, user=obj).super_coin_node_address
    
    def get_super_coins(self, obj):
        return obj.userprofile_set.get(is_active=True, user=obj).super_coins