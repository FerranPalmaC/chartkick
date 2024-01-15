from django.shortcuts import render
from chartkick.django import ColumnChart
from django.urls import reverse


def index(request):
    url = reverse("api:companies")
    chart = ColumnChart(url, xtitle="Countries", ytitle="#Companies")
    return render(request, "data/index.html", {"chart": chart})
