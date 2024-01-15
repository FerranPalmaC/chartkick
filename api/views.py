from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
import requests
from .serializers import CompanySerializer
from .models import Company
from rest_framework.parsers import JSONParser


def parse_data(data):
    parsed_data = dict()
    for company in data:
        count = parsed_data.get(company["country"])
        parsed_data[company["country"]] = count + 1 if count else 1
    return parsed_data


@csrf_exempt
def companies_list(request):
    if request.method == "GET":
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        data = parse_data(serializer.data)
        return JsonResponse(data, safe=False, status=200)

    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = CompanySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    return HttpResponse(status=405)


@csrf_exempt
def students_list(request):
    print("Students list")
    if request.method == "GET":
        response = requests.get("http://localhost:3001/api/students")
        if response.status_code == 200:
            data = response.json()
            return JsonResponse(data, safe=False)
        else:
            return Response(
                {"error": "Failed to fetch data from origin server"},
                status=response.status_code,
            )

    return HttpResponse(status=405)
