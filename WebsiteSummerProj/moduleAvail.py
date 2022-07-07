#Import packages
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn import metrics
import pickle 

#Read data from csv file
dt = pd.read_csv('VeggiePriceOnion.csv')
dt.head()

#Data cleaning
dt.iloc[:,:-1]= dt.iloc[:,:-1].replace(0, np.nan)
dt.iloc[:,:-2]= dt.iloc[:,:-2].fillna(dt.iloc[:,:-2].groupby('Center').transform('mean'))
#dt.iloc[:,2:]= dt.iloc[:,2:].replace(0,dt.iloc[:,2:].mean())

#split into input and output sets
X2 = dt.drop(columns=["Item", "Yield", "Year", "Min Temp", "Max Temp", "Wind Speed( )", "Humidity( )", "Cloud( )", "RainFall(   )", "Pressure(  )", "Min Price", "Max Price"])
Y2 = dt["Yield"]

#one-hot encoding 'Center'
X2_new = pd.get_dummies(X2, columns=['Center'])

#Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X2_new,Y2,test_size=0.2, random_state=90)

#Run the decision tree model
model = DecisionTreeClassifier()
model.fit(X_train,y_train)

pickle.dump(model, open('dTreeAvail.pkl','wb'))