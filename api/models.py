from django.utils.translation import gettext_lazy as _
from django.db import models
from django_countries.fields import CountryField
# Create your models here.


class Industry(models.TextChoices):
    AEROSPACE = "AE", _("Aerospace")
    AGRICULTURE = "AG", _("Agriculture")
    AUTOMOTIVE = "AU", _("Automotive")
    BIOTECHNOLOGY = "BT", _("Biotechnology")
    CONSULTING = "CO", _("Consulting")
    ENTERTAINMENT = "EN", _("Entertainment")
    FINANCE = "FI", _("Finance")
    HEALTHCARE = "HE", _("Healthcare")
    HOSPITALITY = "HO", _("Hospitality")
    LOGISTICS = "LO", _("Logistics")
    MANUFACTURING = "MA", _("Manufacturing")
    MEDIA = "ME", _("Media")
    PHARMACEUTICAL = "PH", _("Pharmaceutical")
    REAL_ESTATE = "RE", _("Real Estate")
    SOCIAL_SERVICES = "SS", _("Social Services")
    SPORTS = "SP", _("Sports")
    TECHNOLOGY = "TE", _("Technology")
    TELECOMMUNICATIONS = "TC", _("Telecommunications")
    TOURISM = "TO", _("Tourism")


class Company(models.Model):
    name = models.CharField(max_length=256)
    website = models.URLField(blank=True, default="")
    email = models.EmailField(max_length=256)
    sector = models.CharField(
        max_length=128, choices=Industry.choices, default=Industry.AGRICULTURE
    )
    country = CountryField()
    location = models.CharField(max_length=256)
    description = models.TextField(blank=True)
    joined = models.DateTimeField()


class Student(models.Model):
    firstname = models.CharField(max_length=256)
    lastname = models.CharField(max_length=512)
    email = models.EmailField(max_length=256)
    sector = models.CharField(
        max_length=128, choices=Industry.choices, default=Industry.AGRICULTURE
    )
