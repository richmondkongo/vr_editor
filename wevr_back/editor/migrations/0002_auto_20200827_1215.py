# Generated by Django 3.1 on 2020-08-27 11:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('editor', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='image_vr',
            old_name='vr_id',
            new_name='vr',
        ),
    ]