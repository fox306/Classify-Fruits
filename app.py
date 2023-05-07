from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
from flask_cors import CORS, cross_origin
import base64
import numpy as np
from collections import Counter


app = Flask(__name__)
CORS(app,  supports_credentials=True)

# initialize model
model1 = YOLO("classify.pt")
model2 = YOLO("quality.pt")

@app.route('/detect_objects', methods=['POST'])
@cross_origin(supports_credentials=True)
def detect_objects():
    # check if image file is present
    image_file = request.files['image']

    # Convert the image file to a numpy array
    image_data = np.fromstring(image_file.read(), np.uint8)
    image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        

    # Perform object detection on the image
    results = model1(image)

    # Plot the results on the image
    results_plotted = results[0].plot()

    # Convert the result image to base64
    _, buffer = cv2.imencode('.jpg', results_plotted)
    img_str = base64.b64encode(buffer).decode()
    
    boxes = results[0].boxes
    labels = [int(box.cls) for box in boxes]

    # Count number of occurrences of each label
    label_counts = dict(Counter(labels))

    # Return the base64 encoded result image
    return jsonify({'result': img_str, 'label_counts': label_counts})

@app.route('/detect_quality', methods=['POST'])
@cross_origin(supports_credentials=True)
def detect_qualily():
    # check if image file is present
    image_file = request.files['image']

    # Convert the image file to a numpy array
    image_data = np.fromstring(image_file.read(), np.uint8)
    image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        

    # Perform object detection on the image
    results = model2(image)

    # Plot the results on the image
    results_plotted = results[0].plot()

    # Convert the result image to base64
    _, buffer = cv2.imencode('.jpg', results_plotted)
    img_str = base64.b64encode(buffer).decode()
    
    boxes = results[0].boxes
    labels = [int(box.cls) for box in boxes]

    # Count number of occurrences of each label
    label_counts = dict(Counter(labels))

    # Return the base64 encoded result image
    return jsonify({'result': img_str, 'label_counts': label_counts})

if __name__ == '__main__':
    app.run(debug=True)