from django.db.models import fields
from .models import *
from rest_framework import serializers
from django.contrib.auth.models import Group



class ListField(serializers.Field):
    def to_representation(self, value):
        if isinstance(value, str):
            return value.split(',')
        elif isinstance(value, list):
            return value
        return []
    
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.split(',')
        elif isinstance(data, list):
            return data
        self.fail('invalid', message='Invalid data type')


# class ListField(serializers.ListField):
#     def to_representation(self, value):
#         # convert list to comma-separated string
        
    
#     def to_internal_value(self, data):
#         # convert comma-separated string to list
#         if isinstance(data, str):
#             return data.split(',')
#         elif isinstance(data, list):
#             return data
#         self.fail('invalid', message='Invalid data type')



    
class MotherRelatedField(serializers.StringRelatedField):
    def to_internal_value(self, value):
        if isinstance(value, Girl):
            return value
        try:
            return Girl.objects.get(Name=value)
        except Girl.DoesNotExist:
            raise serializers.ValidationError(f"Girl object with name '{value}' does not exist")


    
class FamilyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Family_Details
        fields = '__all__'




# class FamilySerializers(serializers.ModelSerializer):
#     editor_family_details = serializers.SerializerMethodField()
#     watcher_family_details = serializers.SerializerMethodField()

#     def get_editor_family_details(self, obj):
#         editor_user = self.context['request'].user
#         editor_group = Group.objects.get(name='Editor')
#         return Family_Details.objects.filter(user__groups=editor_group, user__parent=obj.user)

#     def get_watcher_family_details(self, obj):
#         watcher_user = self.context['request'].user
#         watcher_group = Group.objects.get(name='Watcher')
#         return Family_Details.objects.filter(user__groups=watcher_group, user__parent=obj.user)

#     class Meta:
#         model = Family_Details
#         fields = ['editor_family_details', 'watcher_family_details', 'name']


# class BoySerializers(serializers.ModelSerializer):
#     pname = serializers.CharField(source='parent.Name', read_only=True)
#     Mother = MotherRelatedField(many=True)
#     Wife = serializers.StringRelatedField(many=True)
#     spous = serializers.PrimaryKeyRelatedField(many=True, queryset=Girl.objects.all(), source='Wife')
#     dads = serializers.SerializerMethodField()
#     moms = serializers.PrimaryKeyRelatedField(many=True, queryset=Girl.objects.all(), source='Mother')

#     class Meta:
#         model = Boy
#         fields = '__all__'

#     def get_dads(self, obj):
#         dads = Boy.objects.filter(Father=obj)
#         return [dad.id for dad in dads]
        
class BoySerializers(serializers.ModelSerializer):
    pname = serializers.CharField(source='parent.Name', read_only=True)
    Mother = serializers.StringRelatedField(read_only=True)
    Wife = serializers.StringRelatedField(many=True,read_only=True)

    spous = serializers.PrimaryKeyRelatedField(many=True, queryset=Girl.objects.all(), source='Wife', allow_null=True)
    childs = serializers.SerializerMethodField()
    moms = serializers.PrimaryKeyRelatedField(queryset=Girl.objects.all(), source='Mother', many=False, allow_null=True)

    class Meta:
        model = Boy
        fields = '__all__'

    def get_childs(self, obj):
        childs = Boy.objects.filter(parent=obj)
        return [dad.id for dad in childs]




class GirlSerializers(serializers.ModelSerializer):
    pname = serializers.CharField(source='parent.Name', read_only=True)
    Father = serializers.StringRelatedField(read_only=True)
    Husband = serializers.StringRelatedField(many=True, read_only=True)
    
    dads = serializers.PrimaryKeyRelatedField(queryset=Boy.objects.all(), source='Father', many=False, allow_null=True)
    childs = serializers.SerializerMethodField()
    spous = serializers.PrimaryKeyRelatedField(many=True, queryset=Boy.objects.all(), source='Husband', allow_null=True)

    class Meta:
        model = Girl
        fields = '__all__'
        SurName = ListField(read_only=False)

    def get_childs(self, obj):
        childs = Girl.objects.filter(parent=obj)
        return [mom.id for mom in childs]
