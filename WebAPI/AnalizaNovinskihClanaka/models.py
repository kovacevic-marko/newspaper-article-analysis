from django.db import models

# Create your models here.
class SentimentAnaliza(models.Model):
    pozitivno = models.FloatField()
    negativno = models.FloatField()
    neutralno = models.FloatField()

class PredvidjanjeClanka(models.Model):
    predvidjanje = models.TextField()
    preciznost_modela = models.FloatField()

class AnalizaClanka(models.Model):
    predvidjanje_clanka = PredvidjanjeClanka()
    sentiment_analiza = SentimentAnaliza()