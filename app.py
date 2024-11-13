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
import plotly.graph_objects as go

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
    with open(r'Weights\random_forest_delays.pkl', 'rb') as file:
        delay_model = pickle.load(file)

    with open(r'Weights\random_forest_fares.pkl', 'rb') as file:
        fare_model = pickle.load(file)

    logging.info("Models loaded successfully.")

except Exception as e:
    logging.error(f"Error loading models: {str(e)}")


@app.get('/')
def index():
    return {'message': 'Delay and Fare Predictor ML API'}


# Load flight features
if not os.path.exists("flights_data.csv"):
    raise FileNotFoundError("Flight data file not found.")
flight_features = pd.read_csv(r"flights_data.csv")
min_fare = flight_features['Average_Fare'].min()
max_fare = flight_features['Average_Fare'].max()

@app.post("/predict_fare")
async def predict_fare(data: dict):
    try:

        print("DATA:")
        print(data)

        #input_features = filtered_data.iloc[0].to_dict()
        input_features = data

        # One-hot encode ports and airlines
        for port in fare_model.feature_names_in_:
            if port in [data['departing_port'], data['arriving_port'], data['airline']]:
                input_features[port] = 1
            elif port not in input_features:
                input_features[port] = 0

        prediction_input = pd.DataFrame([input_features])[fare_model.feature_names_in_]
        fare_prediction = fare_model.predict(prediction_input)[0]
        actual_fare = (fare_prediction * (max_fare - min_fare)) + min_fare


        chart_data = {
            'x':[data['month']],  # For example, plotting fares by month
            'y':[actual_fare]
        }

        return {
            "departing_port": data['departing_port'],
            "arriving_port": data['arriving_port'],
            "airline": data['airline'],
            "predicted_fare": actual_fare,
            "chart": chart_data  # Add chart as part of response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict_delay")
async def predict_delay(data: dict):
    try:

        print("DATA:")
        print(data)

        input_features = data

        for feature in delay_model.feature_names_in_:
            if feature in [data['departing_port'], data['arriving_port'], data['airline']]:
                input_features[feature] = 1
            elif feature not in input_features:
                input_features[feature] = 0

        prediction_input = pd.DataFrame([input_features])[delay_model.feature_names_in_]
        delay_prediction = delay_model.predict(prediction_input)[0]

        #average_delay = (flight_features ["Departure_Delays_%"] + flight_features ["Arrival_Delays_%"]) * 0.5
        delay_percentage = delay_prediction * 100


        chart_data = {
            "x":list(range(1, 13)),  # For example, plotting delays across months
            "y":[delay_prediction] * 12,  # Placeholder for delay predictions
        }
        

        return {
            "predicted_delay": delay_prediction,
            "predicted_delay_percentage": delay_percentage,
            "chart": chart_data
        }
    
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict_time")
async def predict_time(data: dict):
    try:
        predictions = []

        for month in range(1, 13):
            data['month'] = month
            fare_response = await predict_fare(data)
            delay_response = await predict_delay(data)
            delay_percentile_response = await predict_delay(data)

            predictions.append({
                "departing_port": data['departing_port'],
                "arriving_port": data['arriving_port'],
                "airline": data['airline'],
                "year": data['year'],
                "month": month,
                "Predicted_Fare": fare_response['predicted_fare'],
                "Predicted_Delay": delay_response['predicted_delay'],
                "Predicted_delay_percentage": delay_percentile_response['predicted_delay_percentage']
            })

        df = pd.DataFrame(predictions)
        csv_path = r"predictions.csv"
        
        if os.path.exists(csv_path):
            os.remove(csv_path)
        df.to_csv(csv_path, index=False)

        return {"message": "Predictions saved successfully, check: ", "file_path": csv_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/predict_time")
async def get_predictions():
    try:
        csv_path = r"predictions.csv"

        if not os.path.exists(csv_path):
            raise HTTPException(status_code=404, detail="Predictions CSV file not found.")

        df = pd.read_csv(csv_path)
        predictions = df.to_dict(orient='records')

        return {"predictions": predictions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/predict_airline")
async def predict_airline(data: dict):
    try:
        print("DATA:")
        print(data)

        airlines = [
        'Jetstar', 'Qantas', 'QantasLink', 'Regional Express', 'Skywest', 'Tigerair Australia',
        'Virgin Australia', 'Virgin Australia - ATR/F100 Operations', 'Virgin Australia Regional Airlines' ];

        # empty dictionary to store predicted fares for each airline
        airline_fares = {}

        for airline in airlines:
            data['airline'] = airline
            fare_response = await predict_fare(data)
            predicted_fare = fare_response['predicted_fare']

            # Store the predicted fare for this airline
            airline_fares[airline] = predicted_fare

        # Find the airline with the lowest predicted fare
        lowest_fare_airline = min(airline_fares, key=airline_fares.get)
        lowest_fare = airline_fares[lowest_fare_airline]

        return {
            "departing_port": data['departing_port'],
            "arriving_port": data['arriving_port'],
            "predicted_airline": lowest_fare_airline,
            "predicted_fare": lowest_fare,
            "airline_fares" : airline_fares
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
