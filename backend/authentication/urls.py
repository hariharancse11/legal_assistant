# urls.py

from django.urls import path
from .views import UserSignUp, UserSignIn,UserLogout,SummaryView,LetterView,ChatView,ChangePasswordView #,document_list,document_detail


urlpatterns = [
    path('signup/', UserSignUp.as_view(), name='user-signup'),
    path('signin/', UserSignIn.as_view(), name='user-signin'),
    path('logout/', UserLogout.as_view(), name='user-logout'),
    path('summary/', SummaryView.as_view(), name='summary'),
    path('letter/', LetterView.as_view(), name='letter'),
    path('chat/', ChatView.as_view(), name='chat'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
]
