import numpy as np
import pandas as pd
from flask import Flask, request, render_template
import pickle
import requests, json
from sklearn.preprocessing import MinMaxScaler



BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q="
API = "&appid=37d99f4c8bd8fa96d4509c54c8a262d7"

app = Flask(__name__)
#model = pickle.load(open('RandomForest.pkl', 'rb'))
model = pickle.load(open('XGBoost.pkl', 'rb'))

centers = [0]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    center = request.form.get("center")        
    if center  =="Ahmedabad" :
        centers[0] = 4
    elif center == "Amritsar" :
        centers[0] = 0
    elif center == "Bangaluru" :
        centers[0] = 1
    elif center == "Bhopal" :
        centers[0] = 2
    elif center == "Chennai" :
        centers[0] = 3
    
    
    fts = [x for x in request.form.values()]
    iF = [ int(x) for x in fts[1:10]]
    Tmin = float(iF[4])
    Tmax = float(iF[5])
    humidity = float(iF[6])
    cloud = float(iF[8])
    windS = 1.3
    windD = 87
    
    URL = BASE_URL + center + API
    response = requests.get(URL)
    if response.status_code == 200:
       data = response.json()
       main = data['main']
       Tmin = main['temp_min']
       Tmax = main['temp_max']
       humidity = main['humidity']
       clouds = data['clouds']
       cloud = clouds['all']
       Tmin = Tmin - 273.15
       Tmax = Tmax - 273.15
       mainW = data['wind']
       windS = mainW['speed']
       windD = mainW['deg']
    else:
       print("Error in the HTTP request")
    
    IF = []
    IF.append(float(iF[1]))
    IF.append(float(Tmax))
    IF.append(float(iF[2]))
    IF.append(float(humidity))
    IF.append(float(iF[7]))
    IF.append(float(Tmin))
    IF.append(float(iF[3]))
    IF.append(float(cloud))
    
    final_IF = np.array(IF+ centers)
    finalIF = pd.DataFrame(final_IF)
    print(finalIF)        
    finalIF.info()
    
    ScallerN = MinMaxScaler()
    scalledN = ScallerN.fit_transform(finalIF)
    #scalledN = pd.DataFrame(scalledN.reshape(1,-1))
    scalledN = pd.DataFrame(scalledN.reshape(1,-1),columns=['f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'])
    #print(scalledN)
    
    #finalIP = pd.concat([scalledN,pd.DataFrame(centers)],axis=1)
    #print(finalIP)
    
    prediction = model.predict(scalledN)
    #print(prediction)

    Tmax = round(Tmax, 2)
    Tmin = round(Tmin, 2)
    h = round(humidity,2)
    
    Tmax = "{t} °C".format(t=Tmax)
    Tmin = "{t} °C".format(t=Tmin)
    h = "{t} %".format(t=h)
    cloud = "{t} %".format(t=cloud)
    windS = "{t} Km/h".format(t=windS*10)
    windD = "{t} °".format(t=windD)
    
    print(windS+" "+windD)
    
    if prediction == 0 :
        return render_template('index.html', prediction_text='A shortage is not expected', max_temp=Tmax, min_temp=Tmin,cld=cloud,hum=h, ws=windS, wd=windD)
    else :
        return render_template('index.html', prediction_text='A shortage is expected', max_temp=Tmax, min_temp=Tmin,cld=cloud,hum=h, ws=windS, wd=windD)
    
   

if __name__ == "__main__":
    app.run(debug=True)