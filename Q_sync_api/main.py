import secrets
import pandas as pd
from datetime import datetime, timedelta
from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jose import JWTError, jwt
from typing import Optional
import bcrypt
from dateutil import tz
import configparser

config = configparser.ConfigParser()
config.read('config.ini')

# Pydantic models
class Token(BaseModel):
    access_token: str
    token_type: str
class TokenData(BaseModel):
    username: Optional[str] = None
class User(BaseModel):
    username: str
class UserInDB(User):
    hashed_password: str
class QScoreRequest(BaseModel):
    Vendor: str
    Material: str
class QScoreResponse(BaseModel):
    q_score: str
    sampling: str

# FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # อนุญาติทุก origins หรือระบุเฉพาะที่อนุญาต
    allow_credentials=True,
    allow_methods=["*"],  # หรือระบุเฉพาะ methods ที่อนุญาต ('GET', 'POST', ...)
    allow_headers=["*"],  # หรือระบุเฉพาะ headers ที่อนุญาต
)

# JWT Secret Key
SECRET_KEY = secrets.token_urlsafe(16)
ALGORITHM = "HS256"
# Load data
df = pd.read_csv('./qscore/Quality_score.csv')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_password_hash(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

users_db = {}
if 'confidential' in config.sections():
    section = 'confidential'
    username = config[section]['username']
    hashed_password = config[section]['hashed_password']
    users_db[username] = {
        "username": username,
        "hashed_password": get_password_hash(hashed_password)
    }

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

# Token endpoint
@app.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    contents = await file.read()
    file_location = f"./qscore/{file.filename}"
    with open(file_location, "wb") as f:
        f.write(contents)
    
    # อัปเดต DataFrame
    global df
    df = pd.read_csv(file_location)

    return {"info": f"file '{file.filename}' saved at '{file_location}'"}

# QScore endpoint
@app.post("/qscore", response_model=QScoreResponse)
async def get_qscore(request: QScoreRequest, current_user: User = Depends(get_current_user)):
    vendor = request.Vendor
    material = request.Material
    current_date = datetime.now()
    start_date = datetime(2024, 1, 1)
    days_passed = (current_date - start_date).days
    three_months_period = 90  # Approximately 3 months
    matching_rows = df[(df['Vendor'] == vendor) & (df['Material'] == material)]
    
    if not matching_rows.empty:
        evaluate = matching_rows['Evaluate'].iloc[0]
        sampling = matching_rows['Sampling'].iloc[0]
        if material.startswith('P'):
            if days_passed % three_months_period < 30:
                evaluate = 'Normal Inspection' if evaluate == 'Pass Through 100%' else evaluate
                sampling = 'Sampling' if sampling == 'No Sampling' else sampling
            else:
                evaluate = 'Pass Through 100%' if evaluate == 'Normal Inspection' else evaluate
                sampling = 'No Sampling' if sampling == 'Sampling' else sampling
    else:
        evaluate = 'Normal Inspection'
        sampling = 'Sampling'
    return {'q_score': evaluate, 'sampling': sampling}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
