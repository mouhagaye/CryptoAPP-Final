# Generated by Django 2.2.10 on 2020-02-22 00:03

from django.db import migrations, models
import server.models


class Migration(migrations.Migration):

    dependencies = [
        ("server", "0002_auto_20200207_0002"),
    ]

    operations = [
        migrations.RemoveField(model_name="polarisuser", name="confirmation_token",),
        migrations.RemoveField(model_name="polarisuser", name="confirmed",),
        migrations.AddField(
            model_name="polarisstellaraccount",
            name="confirmation_token",
            field=models.CharField(default=server.models.get_new_token, max_length=36),
        ),
        migrations.AddField(
            model_name="polarisstellaraccount",
            name="confirmed",
            field=models.BooleanField(default=False),
        ),
    ]
