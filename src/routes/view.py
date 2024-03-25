from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from serializer import BookSerializer
from services import BookService

class BookCreateAPIView(APIView):
    serializer_class = BookSerializer
    def post(self, request, *args, **kwargs):
        service = BookService(request)
        return Response(service, status=status.HTTP_201_CREATED)
