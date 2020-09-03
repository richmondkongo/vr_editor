# Generated by Django 2.2.9 on 2020-09-03 12:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('editor', '0020_auto_20200902_1705'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotspot',
            name='origin',
            field=models.ForeignKey(help_text="Image où l'on verra le hotspot.", on_delete=django.db.models.deletion.CASCADE, related_name='hotpost', to='editor.Image_360'),
        ),
        migrations.AlterField(
            model_name='image_360',
            name='vr',
            field=models.ForeignKey(help_text='Visite virtuelle concernée à laquelle cette image est liée.', on_delete=django.db.models.deletion.CASCADE, related_name='image_360', to='editor.Visite_virtuelle'),
        ),
        migrations.AlterField(
            model_name='infospot',
            name='img',
            field=models.ForeignKey(help_text="Image où l'on verra l' infospot.", on_delete=django.db.models.deletion.CASCADE, related_name='infospot', to='editor.Image_360'),
        ),
    ]
