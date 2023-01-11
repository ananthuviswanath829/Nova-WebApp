from rest_framework import serializers #Ananthu


##Serializer for user list
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


##Serializer for transactions list
#Author-Ananthu
class TransactionListGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    transaction_id = serializers.CharField()
    status = serializers.CharField()
    amount = serializers.SerializerMethodField()
    work_name = serializers.SerializerMethodField()
    paid_from = serializers.SerializerMethodField()
    paid_to = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    def get_amount(self, obj):
        payment_method = 'ETH' if obj.payment_method.name == 'Ethereum' else 'SC'
        return f'{payment_method} {str(round(obj.amount, 2))}'

    def get_work_name(self, obj):
        return obj.work.name
    
    def get_paid_from(self, obj):
        return f'{obj.paid_from.first_name} {obj.paid_from.last_name}'
    
    def get_paid_to(self, obj):
        return f'{obj.paid_to.first_name} {obj.paid_to.last_name}'
    
    def get_rating(self, obj):
        return '' if obj.work.rating is None else str(obj.work.rating)


##Serializer for payment pending list
#Author-Ananthu
class PaymentPendingListGetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    status = serializers.CharField()
    amount = serializers.SerializerMethodField()
    pay_to = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    
    def get_amount(self, obj):
        payment_method = 'ETH' if obj.payment_method.name == 'Ethereum' else 'SC'
        return f'{payment_method} {str(round(obj.amount, 2))}'

    def get_paid_from(self, obj):
        return f'{obj.paid_from.first_name} {obj.paid_from.last_name}'
    
    def get_pay_to(self, obj):
        return f'{obj.assigned_to.first_name} {obj.assigned_to.last_name}'
    
    def get_rating(self, obj):
        return '' if obj.rating is None else str(obj.rating)


##Serializer for payment
#Author-Ananthu
class PayUserSerializer(serializers.Serializer):
    work_id = serializers.IntegerField()