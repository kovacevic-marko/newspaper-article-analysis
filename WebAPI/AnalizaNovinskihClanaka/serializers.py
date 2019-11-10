from rest_framework import serializers
from AnalizaNovinskihClanaka.models import SentimentAnaliza, PredvidjanjeClanka, AnalizaClanka

class SentimentAnalizaSerializer(serializers.Serializer):
    pozitivno = serializers.FloatField()
    negativno = serializers.FloatField()
    neutralno = serializers.FloatField()

    class Meta:
        model = SentimentAnaliza
        fields = ['pozitivno', 'negativno', 'neutralno']

class PredvidjanjeClankaSerializer(serializers.Serializer):
    predvidjanje = serializers.CharField()
    preciznost_modela = serializers.FloatField()

    class Meta:
        model = PredvidjanjeClanka
        fields = ['predvidjanje', 'preciznost_modela']

class AnalizaClankaSerializer(serializers.Serializer):
    predvidjanje_clanka = PredvidjanjeClankaSerializer()
    sentiment_analiza = SentimentAnalizaSerializer()

    class Meta:
        model = AnalizaClanka
        fields = ['predvidjanje_clanka', 'sentiment_analiza']