# Importing Necessary Modules
from fastapi import FastAPI, HTTPException, Request, BackgroundTasks
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import pickle
import os
import pandas as pd
import uvicorn
from Civil_Aviation import Civil_Aviation
import numpy as np
import logging
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Load the prediction models
try:
    with open(r'C:\Users\ASUS\OneDrive\Semester 3\Innovation Project\Assign 3\venv\Weights\random_forest_delays.pkl', 'rb') as file:
        delay_model = pickle.load(file)

    with open(r'C:\Users\ASUS\OneDrive\Semester 3\Innovation Project\Assign 3\venv\Weights\random_forest_fares.pkl', 'rb') as file:
        fare_model = pickle.load(file)

    logging.info("Models loaded successfully.")

except Exception as e:
    logging.error(f"Error loading models: {str(e)}")


@app.get('/')
def index():
    return {'message': 'Delay and Fare Predictor ML API'}


# Load flight features
flight_features = pd.read_csv(r"C:\Users\ASUS\OneDrive\Semester 3\Innovation Project\Assign_02\flights_data.csv")
min_fare = flight_features['Average_Fare'].min()
max_fare = flight_features['Average_Fare'].max()

@app.post("/predict_fare")
async def predict_fare(data: Civil_Aviation):
    try:
        # Filter the feature data based on user input
        filtered_data = flight_features[
            (flight_features["Departing_Port"] == data.departing_port) &
            (flight_features["Arriving_Port"] == data.arriving_port) &
            (flight_features["Airline"] == data.airline) &
            (flight_features["Month"] == data.month) &
            (flight_features["Year"] == data.year)
        ]

        if filtered_data.empty:
            raise HTTPException(status_code=404, detail="No data found for given input.")
        
        input_features = filtered_data.iloc[0].to_dict()

        # One-hot encode ports and airlines
        for port in fare_model.feature_names_in_:
            if port in [data.departing_port, data.arriving_port, data.airline]:
                input_features[port] = 1
            elif port not in input_features:
                input_features[port] = 0

        prediction_input = pd.DataFrame([input_features])[fare_model.feature_names_in_]
        fare_prediction = fare_model.predict(prediction_input)[0]
        actual_fare = (fare_prediction * (max_fare - min_fare)) + min_fare

        return {
            "departing_port": data.departing_port,
            "arriving_port": data.arriving_port,
            "airline": data.airline,
            "predicted_fare": actual_fare,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict_delay")
async def predict_delay(data: Civil_Aviation):
    try:
        filtered_data = flight_features[
            (flight_features["Departing_Port"] == data.departing_port) &
            (flight_features["Arriving_Port"] == data.arriving_port) &
            (flight_features["Airline"] == data.airline) &
            (flight_features["Month"] == data.month) &
            (flight_features["Year"] == data.year)
        ]

        if filtered_data.empty:
            raise HTTPException(status_code=404, detail="No data found for given input.")
        
        input_features = filtered_data.iloc[0].to_dict()

        for feature in delay_model.feature_names_in_:
            if feature in [data.departing_port, data.arriving_port, data.airline]:
                input_features[feature] = 1
            elif feature not in input_features:
                input_features[feature] = 0

        prediction_input = pd.DataFrame([input_features])[delay_model.feature_names_in_]
        delay_prediction = delay_model.predict(prediction_input)[0]

        #average_delay = (flight_features ["Departure_Delays_%"] + flight_features ["Arrival_Delays_%"]) * 0.5
        delay_percentage = delay_prediction * 100
        

        return {
            "predicted_delay": delay_prediction,
            "predicted_delay_percentage": delay_percentage
        }
    
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict_time")
async def predict_time(data: Civil_Aviation):
    try:
        predictions = []

        for month in range(1, 13):
            data.month = month
            fare_response = await predict_fare(data)
            delay_response = await predict_delay(data)
            delay_percentile_response = await predict_delay(data)

            predictions.append({
                "Departing_Port": data.departing_port,
                "Arriving_Port": data.arriving_port,
                "Airline": data.airline,
                "Year": data.year,
                "Month": month,
                "Predicted_Fare": fare_response['predicted_fare'],
                "Predicted_Delay": delay_response['predicted_delay'],
                "Predicted_delay_percentage": delay_percentile_response['predicted_delay_percentage']
            })

        df = pd.DataFrame(predictions)
        csv_path = r"C:\Users\ASUS\OneDrive\Semester 3\Innovation Project\Assign 3\venv\predictions.csv"
        
        if os.path.exists(csv_path):
            os.remove(csv_path)
        df.to_csv(csv_path, index=False)

        return {"message": "Predictions saved to CSV successfully", "file_path": csv_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/predict_time")
async def get_predictions():
    try:
        csv_path = r"C:\Users\ASUS\OneDrive\Semester 3\Innovation Project\Assign 3\venv\predictions.csv"

        if not os.path.exists(csv_path):
            raise HTTPException(status_code=404, detail="Predictions CSV file not found.")

        df = pd.read_csv(csv_path)
        predictions = df.to_dict(orient='records')

        return {"predictions": predictions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
