import pandas as pd
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt

# first load the data
df = pd.read_csv("../mission_data.csv")

# then select the features
features = ["pitch", "y_pos", "z_pos", "o2_level", "co2_level", "total_drain", "solar_input"]
X = df[features]

# initialize Isolation Forest model
model = IsolationForest(contamination=0.05, random_state=42)

# train the model and predict
model.fit(X)

df['scores'] = model.decision_function(X)
df['anomaly_pred'] = model.predict(X)

# visualize results
plt.figure(figsize=(10,6))
plt.plot(df['timestamp'], df['scores'], label='Anomaly Score')
plt.axhline(y=0, color='r', linestyle='--', label='Threshold')
plt.title("Spacecraft Health Score")
plt.xlabel("Mission Time (s)")
plt.ylabel("Health Score")
plt.legend()
plt.show()