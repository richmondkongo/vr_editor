# Generated by Django 2.2.9 on 2020-09-02 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editor', '0016_auto_20200902_1521'),
    ]

    operations = [
        migrations.AddField(
            model_name='visite_virtuelle',
            name='client',
            field=models.TextField(blank=True, default='no', help_text='Id du client concerné.', null=True),
        ),
    ]