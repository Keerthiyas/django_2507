from django.db import models
CATEGORY_CHOICES = [
    ('web', 'Web Development'),
    ('uiux', 'UI/UX Design'),
    ('data', 'Data Science'),
    ('mobile', 'Mobile App'),
]

class Project(models.Model):
    name = models.CharField(max_length=100, default='My Name')
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='project_images/')
    cv_link = models.URLField(blank=True, null=True)

    

class Service(models.Model):
    icon = models.CharField(max_length=100)  # e.g., "fas fa-code"
    title = models.CharField(max_length=100)
    description = models.TextField()


class Work(models.Model):  # ✅ You must define a model class
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to='work_images/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
class Skill(models.Model):
    SKILL_CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('tools', 'Tools'),
        ('programming', 'Programming Languages'),  # 👈 You can add this
    ]

    title = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=SKILL_CATEGORY_CHOICES)
    image = models.ImageField(upload_to='skill_images/')


    def __str__(self):
        return self.title


