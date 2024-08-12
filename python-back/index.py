from flask import request, jsonify
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from flask import Flask
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor

app = Flask(__name__)

calories_data = pd.read_csv('./calories.csv')
exercise_data = pd.read_csv('./exercise.csv')
calories_data = pd.concat([exercise_data, calories_data["Calories"]], axis=1)

sns.set()
sns.countplot(x="Gender", data=calories_data)
sns.displot(calories_data["Age"])
sns.displot(calories_data["Height"])
sns.displot(calories_data["Weight"])
sns.displot(calories_data["Duration"])
calories_data["Gender"] = calories_data["Gender"].map({"female": 1, "male": 0})
correlation = calories_data.corr()
plt.figure(figsize=(10, 10))
sns.heatmap(correlation, cbar=True, square=True, fmt=".1f", annot=True, annot_kws={"size": 8}, cmap="Greens",
            linewidths=0.5, linecolor="blue")
X = calories_data.drop(columns=["User_ID", "Calories"], axis=1)
y = calories_data["Calories"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=2)

model = XGBRegressor()
model.fit(X_train, y_train)

# Cargar los datos y el modelo
calories_data = pd.read_csv('./calories.csv')
exercise_data = pd.read_csv('./exercise.csv')
calories_data = pd.concat([exercise_data, calories_data["Calories"]], axis=1)
calories_data["Gender"] = calories_data["Gender"].map({"female": 1, "male": 0})
X = calories_data.drop(columns=["User_ID", "Calories"], axis=1)
y = calories_data["Calories"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=2)
model = XGBRegressor()
model.fit(X_train, y_train)

@app.route('/predict', methods=['POST'])
def predict_calories():
    try:
        data = request.get_json()
        gender = data['gender']
        age = data['age']
        height = data['height']
        weight = data['weight']
        duration = data['duration']

        input_data = np.array([gender, age, height, weight, duration, 0, 0]).reshape(1, -1)
        prediction = model.predict(input_data)[0]

        return jsonify(prediction.item())

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
