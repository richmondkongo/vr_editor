# Generated by Django 2.2.9 on 2020-09-02 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editor', '0017_visite_virtuelle_client'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visite_virtuelle',
            name='client',
            field=models.CharField(blank=True, default='no', help_text='Id du client concerné.', max_length=255, null=True),
        ),
    ]
