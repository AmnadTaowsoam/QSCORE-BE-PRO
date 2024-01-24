# Use the official Python image as the base image
FROM python:3.9

# Set the working directory in the container to /app
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy all the project files into the container
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 8002

# Command to run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]
