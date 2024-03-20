from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tasks(request):
    user = request.user
    tasks = Task.objects.all().order_by(user.sort_option)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_sort_option(request):
    user = request.user
    sort_option = request.data.get('sort_option')
    if sort_option not in ['title', 'description', 'started', 'completed', 'created_at', 'updated_at']:
        return Response({'error': 'Invalid sort option'}, status=status.HTTP_400_BAD_REQUEST)
    
    user.sort_option = sort_option
    user.save()
    return Response({'message': 'Sort option updated successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request):
    serializer = TaskSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)