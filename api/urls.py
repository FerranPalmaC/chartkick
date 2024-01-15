from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path("companies/", views.companies_list, name="companies"),
    path("students/", views.students_list),
]
