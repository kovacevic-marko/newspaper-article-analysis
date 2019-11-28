from AnalizaNovinskihClanaka import models
from AnalizaNovinskihClanaka.lemma_tokenizer import LemmaTokenizer

import pandas as pd
import numpy as np

import nltk
nltk.download('vader_lexicon')
nltk.download('punkt')
nltk.download('wordnet')
from nltk.sentiment.vader import SentimentIntensityAnalyzer

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelBinarizer
from sklearn.externals import joblib

import keras
from keras.models import Sequential
from keras import layers
from keras.layers import Dense
from keras.models import load_model

import os.path
import pickle

class AnaliziranjeNovinskihClanaka:
    
    sa = SentimentIntensityAnalyzer()
    cv = CountVectorizer(
        tokenizer=LemmaTokenizer(),
        stop_words = 'english'
    )
    label_binarizer = LabelBinarizer()

    putanja_fajla = os.path.abspath(os.path.dirname(__file__))

    analiza_clanka = models.AnalizaClanka()

    putanja_treniranog_modela = os.path.join(putanja_fajla, "../Podaci/model_za_predvidjanje.h5")
    putanja_count_vectrozier = os.path.join(putanja_fajla, "../Podaci/count_vectorizer.pkl")
    putanja_label_binarizer = os.path.join(putanja_fajla, "../Podaci/label_binarizer.pkl")
    putanja_preciznosti_modela = os.path.join(putanja_fajla, "../Podaci/preciznost_modela.pkl")

    def ucitaj_podatke(self):
        putanja_dataset_fajla = os.path.join(self.putanja_fajla, "../Podaci/bbc_dataset.csv")

        df = pd.read_csv(putanja_dataset_fajla)

        return df

    def treniraj_model(self):
        keras.backend.clear_session()

        if(not os.path.exists(self.putanja_treniranog_modela)):
            df = self.ucitaj_podatke()

            X = df['text']
            y = df['category']

            X = self.cv.fit_transform(X)

            y = self.label_binarizer.fit_transform(y)

            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30)

            input_dim = X_train.shape[1]  # Broj nezavisnih varijabli

        
            model = Sequential()
            model.add(Dense(512, input_dim=input_dim, activation='relu')) # input_dim je broj input-a a 512 je broj output-a
            model.add(Dense(32, activation='relu'))
            model.add(Dense(16, activation='relu'))
            model.add(Dense(5, activation='softmax'))

            model.compile(loss='categorical_crossentropy', 
                        optimizer='adam', 
                        metrics=['accuracy'])
            model.summary()

            model.fit(X_train, y_train,
                        epochs=20,
                        verbose=False,
                        validation_data=(X_test, y_test),
                        batch_size=32)

            model.save(self.putanja_treniranog_modela)

            loss, accuracy = model.evaluate(X_test, y_test, verbose=False)

            self.analiza_clanka.predvidjanje_clanka.preciznost_modela = round((accuracy*100), 2)
            self.sacuvaj_trenirane_modele()
        else:
            model = load_model(self.putanja_treniranog_modela)
            self.ucitaj_trenirane_modele()

        return model

    def sacuvaj_trenirane_modele(self):
        joblib.dump(self.cv, self.putanja_count_vectrozier)
        joblib.dump(self.label_binarizer, self.putanja_label_binarizer)
        joblib.dump(self.analiza_clanka.predvidjanje_clanka.preciznost_modela, self.putanja_preciznosti_modela)

    def ucitaj_trenirane_modele(self):
        self.cv = joblib.load(self.putanja_count_vectrozier)
        self.label_binarizer = joblib.load(self.putanja_label_binarizer)
        self.analiza_clanka.predvidjanje_clanka.preciznost_modela = joblib.load(self.putanja_preciznosti_modela)

    def predvidjanje_clanka(self, tekst):
        model = self.treniraj_model()

        tekst_transformisan = self.cv.transform([tekst])

        predvidjanje = model.predict(tekst_transformisan)

        self.analiza_clanka.predvidjanje_clanka.predvidjanje = self.label_binarizer.inverse_transform(predvidjanje)[0]


    def sentiment_analiza(self, text):
        sentiment_analiza_rezultat = self.sa.polarity_scores(text)

        self.analiza_clanka.sentiment_analiza.pozitivno = round(sentiment_analiza_rezultat['pos']*100, 2)
        self.analiza_clanka.sentiment_analiza.negativno = round(sentiment_analiza_rezultat['neg']*100, 2)
        self.analiza_clanka.sentiment_analiza.neutralno = round(sentiment_analiza_rezultat['neu']*100, 2)

    def analiziranje_clanka(self, tekst):
        self.predvidjanje_clanka(tekst)
        self.sentiment_analiza(tekst)

        return self.analiza_clanka