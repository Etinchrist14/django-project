from django.urls import path
from . import views 
from .views import UserFollowView


urlpatterns = [
    # ... other URL patterns ...
    path('profile/<str:username>/', views.profile_detail, name='profile-detail'),
     path("<str:username>/follow/", UserFollowView.as_view(), name="user_follow"),
]