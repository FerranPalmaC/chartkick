from rest_framework import serializers
from .models import Company, Student


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = [
            "name",
            "website",
            "email",
            "sector",
            "country",
            "location",
            "description",
            "joined",
        ]


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["firstname", "lastname", "email", "sector"]
