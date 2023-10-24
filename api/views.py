from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import  PostSerializer
from network.models import Post
from rest_framework import status
# Create your views here.


@api_view(['GET'])
def postOverview(request):
    api_urls = {
        'List': '/post-list/',
        'Detail View': '/post-detail/<str:pk>/',
        'Create': '/post-create/',
        'Update': '/post-update/<str:pk>/',
        'Delete': '/post-delete/<str:pk>/',
    }

    return Response(api_urls)  # Return the API URLs as a dictionary



@api_view(['GET'])
def postList(request):
    posts = Post.objects.all().order_by('-id')
    serializer = PostSerializer(posts,  many = True)
    return Response(serializer.data)

@api_view(['GET'])
def postDetail(request, pk):
    posts = Post.objects.get(id=pk)
    serializer = PostSerializer(posts,  many = False)
    return Response(serializer.data)


@api_view(['POST'])
def postCreate(request):
    serializer = PostSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['PUT'])
def postUpdate(request, pk):
    try:
        post = Post.objects.get(id=pk)
    except Post.DoesNotExist:
        return Response({'detail': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        updated_text = request.data.get('text', '')
        if updated_text!='':
            post.text = updated_text
            post.save()
            serializer = PostSerializer(post)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)












@api_view(['DELETE'])
def postDelete(request, pk):
    posts = Post.objects.get(id=pk)
    posts.delete()
    return Response('Item successfully deleted!')