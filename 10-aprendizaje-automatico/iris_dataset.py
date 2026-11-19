# ---
# jupyter:
#   jupytext:
#     formats: py:percent
#     text_representation:
#       extension: .py
#       format_name: percent
#       format_version: '1.3'
#       jupytext_version: 1.19.5
#   kernelspec:
#     display_name: Python (M.L.)
#     language: python
#     name: mlenv
# ---

# %% [markdown]
# # Instalar librerias

# %%
# !pip install numpy pandas seaborn matplotlib scikit-learn

# %% [markdown]
# # Importar librerias

# %%
import numpy as np # Linear algebra
import pandas as pd # Data processing, CSV file I/O 
import seaborn as sns # Data visualization and exploratory data analysis
import matplotlib.pyplot as plt # Data visualization and graphical plotting
from sklearn.datasets import make_classification # Generate a random n-class classification problem
from sklearn.tree import DecisionTreeClassifier # Import Decision Tree Classifier
from sklearn.model_selection import train_test_split # Splits data into random subsets for train and test data
from sklearn import metrics #Import scikit-learn metrics module for accuracy calculation
from sklearn.metrics import classification_report # Measure the quality of predictions from a classification algorithm
from sklearn.metrics import r2_score # Measuring the MSE and R-Squared values
from sklearn.metrics import mean_squared_error #The average of the square of the difference between the observed and predicted values of a variable
from sklearn import tree # non-parametric supervised learning method used for classification and regression
from sklearn.metrics import confusion_matrix #equal to the number of observations known to be in group and predicted to be in group

# %% [markdown]
# # Load the data from a file:

# %%
df = pd.read_csv('/home/zapata/Documents/Uni/Fundamentos_IA/Unidad_2/machine_learning/data/diabetes.csv') # Retrieves data in the form of the Dataframe

# %% [markdown]
# # Performing Simple EDA

# %%
df.head() # Returns the first 5 rows of the data

# %%
df.describe() # Returns description of the data in the DataFrame

# %%
df.info() # Prints information about the DataFrame

# %%
df.duplicated().sum() #returns values that describe which rows in the DataFrame are duplicated and not.

# %%
df.isnull().sum() # Returns a DataFrame object where all the values are replaced with a Boolean value True for NULL values, and otherwise False

# %%
df.dtypes # Used to find the dtypes in the DataFrame

# %%
corr=df.corr(numeric_only=True) 
sns.heatmap(corr, annot=True) # an array of the same shape as data which is used to annotate the heatmap

# %%
ax = sns.histplot(df["Glucose"])
plt.show() # Plot histogram to show distributions of dataset

# %%
# pair plot to visulize pair-wise relationships to see how columns are related
sns.pairplot(df)

# %%
df.duplicated().sum() #returns values that describe which rows in the DataFrame are duplicated and not.

# %%
ax = sns.countplot(y="Outcome", data=df) # Method used to Show the counts of observations (distribution of the location)

# %%
ax = sns.countplot(y="Pregnancies", data=df)

# %%
sns.lineplot(data=df, x="Age", y="Glucose") # plot to see the rent trend

# %% [markdown]
# # Feature extractions

# %%
# split dataset in features and target variable
feature_cols = ['Pregnancies', 'Insulin', 'BMI', 'Age','Glucose','BloodPressure','DiabetesPedigreeFunction']
X = df[feature_cols] # Features
y = df.Outcome # Target variable

# %% [markdown]
# # Splitting data

# %%
# Split dataset into training and testing 
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1) # 70% training and 30% test

# %% [markdown]
# # Model evaluation

# %%
# Create Decision Tree classifer object
clf = DecisionTreeClassifier(criterion="entropy", max_depth=3)

# Train Decision Tree Classifer
clf = clf.fit(X_train,y_train)

#Predict the response for test dataset
y_pred = clf.predict(X_test)

# Model Accuracy, how often is the classifier correct?
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
score=r2_score(y_test,y_pred)
print("The value of R squared is ",score)
print("The MSE is=",mean_squared_error(y_test,y_pred))
print("The RMSE value is=",np.sqrt(mean_squared_error(y_test,y_pred)))
score_data =score
report=classification_report(y_test,y_pred)
print(report)

# %% [markdown]
# # Model Visulization

# %%
plt.figure(figsize=(25,20))
tree.plot_tree(clf)
plt.show()

# %% [markdown]
# # Ahora con Iris dataset

# %%
iris = pd.read_csv('/home/zapata/Documents/Uni/Fundamentos_IA/Unidad_2/machine_learning/data/iris.data.csv')

# %%
iris.head() # Returns the first 5 rows of the dataframe

# %%
iris.info() # Prints information about the DataFrame

# %%
iris.duplicated().sum() #returns values that describe which rows in the DataFrame are duplicated and not.

# %%
iris.isnull().sum() # Returns a DataFrame object where all the values are replaced with a Boolean value True for NULL values, and otherwise False

# %%
iris.dtypes # Used to find the dtypes in the DataFrame

# %%
corr=iris.corr(numeric_only=True) 
sns.heatmap(corr, annot=True) # an array of the same shape as data which is used to annotate the heatmap

# %%
# pair plot to visulize pair-wise relationships to see how columns are related
sns.pairplot(iris)

# %%
from sklearn.datasets import load_iris
iris = load_iris()
X, y = iris.data, iris.target
clf = tree.DecisionTreeClassifier()
clf = clf.fit(X, y)
plt.figure(figsize=(25,20))
tree.plot_tree(clf)
plt.show()
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
score=r2_score(y_test,y_pred)
print("The value of R squared is ",score)
print("The MSE is=",mean_squared_error(y_test,y_pred))
print("The RMSE value is=",np.sqrt(mean_squared_error(y_test,y_pred)))
score1=score
report=classification_report(y_test,y_pred)
print(report)
mat=confusion_matrix(y_test, y_pred)
print(mat)
