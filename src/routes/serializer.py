from django.utils import timezone
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True, allow_null= False)
    author = serializers.CharField(required=True,max_length=255, allow_null= False)
    published_date = serializers.DateField(required = True)
    class Meta:
        model = Book
        fields = ['title', 'author', 'published_date']

    def validate_published_date(self, attrs):
       data = attrs.copy()
       published_date =  data.get("published_date")
       if published_date > timezone.now():
            raise serializers.ValidationError("Published date cannot be in the future.")
       return data
