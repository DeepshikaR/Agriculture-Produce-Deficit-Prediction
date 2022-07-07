#import tensorflow as tf
import pandas as pd
import numpy as np

rowData=pd.read_csv('VeggiePriceOnion.csv')
rowData.drop('Item',axis=1,inplace=True)
print(rowData.head())

rowData.iloc[:,:-1]= rowData.iloc[:,:-1].replace(0, np.nan)
rowData.iloc[:,:-2]=rowData.iloc[:,:-2].fillna(rowData.iloc[:,:-2].groupby('Center').transform('mean'))
xRow=rowData.iloc[:,:-1]
Y=rowData.iloc[:,-1]

from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import LabelEncoder
oneHotEnc= OneHotEncoder()
labelEnc=LabelEncoder()

oneValue=oneHotEnc.fit_transform(xRow.Center.values.reshape(-1,1)).toarray()
oneValue
oneValueDf=pd.DataFrame(oneValue,columns=[""+str(xRow.Center.unique()[i]) for i in range(len(rowData.Center.unique()))])
oneValueDf=oneValueDf.apply(lambda x:x.astype('int32'))
oneValueDf.head()

xOneHot=pd.concat([oneValueDf,xRow],axis=1)
xOneHot.drop('Center',axis=1,inplace=True)

from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import RobustScaler
ScallerN=MinMaxScaler()

toBeScalled=xOneHot.iloc[:,len(rowData.Center.unique()):-1]
oneHotCenters=xOneHot.iloc[:,:len(rowData.Center.unique())]

scalledN=ScallerN.fit_transform(toBeScalled)
scalledN=pd.DataFrame(scalledN,columns=[x for x in toBeScalled.columns])
xLab=pd.DataFrame(labelEnc.fit_transform(xRow.Center.copy()),columns=['Center'])
print(labelEnc.classes_)
xLabelEncN=pd.concat([xLab,scalledN],axis=1)

from sklearn.feature_selection import f_classif,SelectKBest
fs=SelectKBest(score_func=f_classif,k=10)
fs.fit(xLabelEncN,Y)
fsScore=pd.DataFrame(fs.scores_,columns=['Score'])
fsCol=pd.DataFrame(xLabelEncN.columns,columns=['Category'])
fsDf3=pd.concat([fsCol,fsScore],axis=1)
fsDf3.nlargest(10,columns='Score')

xChoosen=xLabelEncN[fsDf3.nlargest(10,columns='Score')['Category']]
xChoosen.drop(columns=['Year'],inplace=True)
xChoosen.head()

from sklearn.model_selection import train_test_split
from sklearn.metrics import plot_confusion_matrix

xt,xT,yt,yT=train_test_split(xChoosen,Y,test_size=0.3,random_state=108)

xtScale=ScallerN.fit_transform(xt)
xTScale=ScallerN.transform(xT)
xt.head()

"""
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier()
model.fit(xtScale, yt)

model.score(xTScale, yT)
"""

import xgboost as xgb 
model=xgb.XGBClassifier(objective='binary:logistic',missing=None)
model.fit(xtScale,yt,verbose=True,early_stopping_rounds=10,eval_metric='aucpr',eval_set=[(xTScale,yT)])

import pickle 

#pickle.dump(model,open('RandomForest.pkl','wb'))
pickle.dump(model,open('XGBoost.pkl','wb'))
#pickle.dump(ScallerN,open('scallerModel.sav','wb'))
