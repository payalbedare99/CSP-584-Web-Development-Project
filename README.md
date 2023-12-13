# Project Setup Instructions

## Frontend

1. Run `npm install` to download the dependencies.

2. In the project directory, execute:

   ```bash
   npm start
3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



## Backend

1. Run `npm install` to download the dependencies.

2. **Create Database:**
   - Execute the following command to create a database named `repairmate` before starting the backend application:

     ```bash
     mysql -u root -p -e "CREATE DATABASE repairmate;"
     ```

4. **Import Predefined Data:**
   - Run the `dump.sql` file provided with the project to get the predefined data.
   - Navigate to the folder containing `dump.sql` and execute the following command:

     ```bash
     mysql -u root -p repairmate < dump.sql
     ```



## Commands to Run for Importing Required Packages (Python)

Use the following commands to install the necessary Python packages:

```bash
python -m pip install faiss-cpu
python -m pip install openai
python -m pip install langchain
python -m pip install python-dotenv
python -m pip install tiktoken
python -m pip install numpy
pip install googlemaps
pip install geopy
```



## Signup with a New User to Start Using the Application

- To begin using the application, sign up with a new user through the application interface.

- **Note:** Since JWT tokens are used, users must be created from the application interface.

```bash
nodemon index.js
```


## OpenAI API New Key (Backup-only)

In case the provided API key in the code, located in the file named "getRecommendedRepairmates.py" under `backend/PythonScript`, is not valid, replace it with a new one.

```python
# Use your OpenAI API key here
os.environ["OPENAI_API_KEY"] = "YOUR-KEY-HERE"
```
