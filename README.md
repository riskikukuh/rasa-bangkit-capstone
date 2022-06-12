# RASA: Know It Better. Taste It Better

### Rasa BackEnd Bangkit 2022 Capstone
Indonesia’s traditional cuisine is one of the cultural heritage from our ancestors. Indonesia’s traditional foods have been utilized as a strategic means to boost Indonesia's tourism industry. Hence, we propose a mobile application aimed to introduce Indonesia’s traditional food to international tourists by using a food detection system. Additionally, the recommendation of the related cuisine restaurant will also be given. Hopefully, this application will be able to increase the economic growth especially in the culinary sector, more job opportunities will be available in the future and the food culture in Indonesia will be more known internationally.

### Our Team Member
| Name  | Bangkit ID | Path |
| ------------- | ------------- | ------------- |
| Shinta Kirana S. R. | M2012K1293 | Machine Learning |
| Maulin Nasari | M2012G1295  | Machine Learning  |
| Dewi Iswaratika | M7012G1296  | Machine Learning  |
| Riski Kukuh Wiranata | C2203F1897  | Cloud Computing  |
| Wahyu Wijaya | C2203F1898  | Cloud Computing |
| Dhimas Tri Cahya | A2203F1896  | Android  |

### API Endpoint
API Documentation : [Here](http://34.101.98.51/documentation)

### Tech, Tools, and Frameworks
- [NodeJs] - Evented I/O Backend
- [HAPI] - Framework to make RestAPI Endpoint 
- [PostgreSQL] - Database for saving data
- [JWT] - Method Used to autentication and authorization

### Google Cloud Platfrom
- [VM Instance] - Serving Rest API form NodeJs
- [Cloud Storage] - Save utilities (Image and model)
- [Cloud Fucntion] -  Used to predict image food

### How it Works
![](https://i.ibb.co/M88CkMQ/Flowgcp.png)

We use 3 service in GCP: Compute Engine, Cloud Storage, and Cloud Function. Compute engine used for serving Endpoint API, Cloud Storage used to save utilities like uploaded image by user for analyzing, and Cloud Function used to predict. And how the app work is user upload image by hit the endpoint /analyze in compute engine, image will save in cloud storage and after it's done compute engine will send request to cloud function analyze, it will run Machine Learning predicting food name by our model. And then we will get the result of name food picture by cloud function and the result will returned to Compute Engine for as a response analyze.

### Deployment Back-End
1. Clone the back-end project
    ```bash
    git clone https://github.com/riskikukuh/rasa-bangkit-capstone.git rasa-bangkit-capstone
    ```
2. Install all backend dependencies
    ```bash
    npm install
    ```
3. Create database ```rasa``` PostgreSql
    ```bash
    CREATE DATABASE rasa
    ```
4. Create secret token with node
    ```bash
    node 
    require('crypto').randomBytes(64).toString('hex');
    ```
5. Setup environment ( .env )
    ```bash
    echo """ 
        # server configuration
        GCP_PROJECT_ID=<GCP PROJECT ID>
        GCS_DEV_BUCKET_NAME=<BUCKET NAME>
        GCS_AUTH_PATH=<SERVICE ACCOUNT TOKEN FOR GCS>
        
        HOST=localhost
        PORT=8080
         
        # node-postgres configuration
        PGUSER=<YOUR POSTGRESQL USERNAME>
        PGHOST=<YOUR POSTGRESQL HOST>
        PGPASSWORD=<YOUR POSTGRESQL PASSWORD>
        PGDATABASE=rasa
        PGPORT=5432
        
        # JWT Token
        ACCESS_TOKEN_KEY=<SECRET TOKEN KEY>
        ACCESS_TOKEN_AGE=1800
        """ > .env
    ```
6. Run migration
    ```bash
    npm run migration up
    ```
7. To run in development mode
    ```bash
    npm run start-dev
    ```
8. Deploy application with Process Manager
    ```bash
    pm2 start src/server.js --name "rasa-app"
    ```
    
### Deployment Mechine Learning
1. Upload model.h5 in Cloud Storage
2. Make Cloud Function at least ram 1GB and Trigger is URL, ensure allow unauthentication
3. Select Python 3.8
4. Paste that code in main.py
    ```python
    import json
    import numpy as np
    from tensorflow.keras.preprocessing import image as image2
    from tensorflow.keras.models import load_model
    import tensorflow as tf
    from imageio import imread
    from PIL import Image
    from google.cloud import storage
    def api_predict(requests):
        storage_client = storage.Client()
        bucket = storage_client.get_bucket('dev-analyze-rasa-application')
        blob = bucket.blob('model.h5')
        blob.download_to_filename('/tmp/model.h5')
        if requests.method == "GET":
            valueJson = {
                "status": "error",
                "message": "Please use POST method"
            }
            result = json.dumps(valueJson)
            return result
        elif requests.method == "POST":
            food_list = ['Ayam Betutu','Beberuk Terong','Coto Makassar','Gudeg','Kerak Telor','Mie Aceh','Nasi Kuning','Nasi Pecel','Papeda','Pempek','Peuyeum','Rawon','Rendang','Sate Madura','Serabi','Soto Banjar','Soto Lamongan','Tahu Sumedang']
            model = load_model('/tmp/model.h5',compile = False)
            urlImage = requests.get_json()['url']
            img = imread(urlImage)
            # img = imread('https://storage.googleapis.com/dev-analyze-rasa-application/pic4.jpg')
            try:
                img = Image.fromarray(img).resize((224, 224))
                img = image2.img_to_array(img) / 255.0                  
                img = tf.expand_dims(img, axis=0)                                              
                pred = model.predict(img)
                index = np.argmax(pred)
                prediction = model(img)
                pred_idx = np.argmax(prediction)
                accuration = prediction[0][pred_idx] * 100
                food_list.sort()
                pred_value = food_list[index]
                if accuration > 70:
                    valueJson = {
                        "status": "success",
                        "data" : {
                            "prediction": f"{pred_value}",
                            "accuration": f"{accuration}"
                        }
                    }
                    return json.dumps(valueJson)
                else:
                    valueJson = {
                        "status": "error",
                        "message": "Failed to predict, try another picture"
                    }
                result = json.dumps(valueJson)
                return result
            except:
                valueJson = {
                    "status": "error",
                    "message": "Failed to predict, try another picture"
                }
                return json.dumps(valueJson)
5. Paste that code in requirements.txt
    ```bash
    imageio==2.19.3
    jsonschema==4.6.0
    numpy==1.19.5
    Pillow==8.3.2
    requests==2.27.1
    tensorflow==2.6.0rc0
    google-cloud-storage==2.4.0 
     ```
6. Deploy

