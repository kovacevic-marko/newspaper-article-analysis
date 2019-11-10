from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

import json

from AnalizaNovinskihClanaka.serializers import AnalizaClankaSerializer
from AnalizaNovinskihClanaka.analiziranje_novinskih_clanaka import AnaliziranjeNovinskihClanaka

# Create your views here.
@api_view(['GET', 'POST'])
def analiziraj_clanak(request):
    request_data = json.loads(request.body)

    analiziranje_novinskih_clanaka = AnaliziranjeNovinskihClanaka()

    analiza = analiziranje_novinskih_clanaka.analiziranje_clanka(request_data['tekstClanka'])

    serializer = AnalizaClankaSerializer(analiza)

    return Response(serializer.data)