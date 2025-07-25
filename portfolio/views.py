from django.shortcuts import render
from .models import Project, Service, Work, Skill
def home(request):
    projects = Project.objects.all()
    hero = Project.objects.first()
    services = Service.objects.all()
    skills = Skill.objects.all()  # Assuming you want to include skills in the context
    works = Work.objects.all()  # Assuming you want to include works in the context
    return render(request, 'portfolio/home.html', {'projects': projects, 'hero': hero, 'services': services, 'works': works, 'skills': skills})

