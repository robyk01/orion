### Research Notes
The first model used for anomaly detection is Isolation Forest. This is an unsupervised learning algorithm and variant of a Random Forest but optimised to look for outliars in our data. Instead of standard decision trees, it uses Random Partitions to isolate points which assigns each data point a score called *anomaly score*. In the model config we set a contamination parameter that represents our threshold for detecting anomalies.

#### Example
A contamination value of 0.05 means that the model takes the most 5% isolated data points and classifies as anomalies.

Because Isolation Forests are based on Random Forest, they share the same principle, splitting data upon features. If a data point is normal, it will take many splits to isolate it but for the anomalies it will be easy to isolate because they're far from other data points. 

Isolation Forests scores are based on the path length.
Here we use `model.decision_function(X)` to get values between -0.5 and 0.5 instead of simple Yes/No (1 for normal, -1 for anomaly) values. The higher the value, the more average and safe the telemetry data is. On the opposite side, the more negative the number, the more extreme the leak or the drain from the ship is.

#### Example
If the oxygen levels on the ship are rapidly decreasing, the predictions (model.fit_predict) might still say 1 (not anomaly) because they didn't hit that 5% threshold yet. However, looking at the scores we can see that the values are dropping towards zero and that can raise an alert before tripping the actual oxygen leaking alarm.

### First Attempt
![First attempt](plots/1_clean.png)

As we can see, even though the model was trained on clean data (no malfunctions) negative scores were still present. My guess is that the contamination rate was too high for this specific dataset. In the first 100s I think the model was getting used to the pitch noise and other variables, at 330s it found some discrepancy between CO2 scrubber activation and total power draining. False Positive Rate: 1.15%

I will add more features to the training (`is_scrubber_on`, `is_engine_on`) so that my model will correlate the power draining increase with CO2 buildup instead of guessing. Also I will set contamination to 0.01. 

This run will have around 10 minutes of clean data. The first 5 minutes the engine will be on, then I'll turn it off. I also added a counter for the false positives (a false positive is when the model says -1 but the truth is 0) - `false_positives = df[(df['anomaly_pred'] == -1) & (df['is_anomaly'] == 0)]`

### Second Attempt
![Second attempt](plots/2_clean.png)

The model succesfully detected a 1.0 second race condition in the simulation's telemetry pipeline. At T=652s, the propulsion state updated before the power system did, creating an anomality that the Isolation Forest identified despite individual sensors remining within nominal bounds. False Positive counters: 11 and False Positive Rate: 1.07%


### Third Attempt
![Third attempt](plots/3_clean.png)

The model maintained a consistent False Positive rate of approx. 1.04%. Analysis indicates that this represents the mathematical floor of Isolation Forest when the `contamination` is fixed at 0.01.