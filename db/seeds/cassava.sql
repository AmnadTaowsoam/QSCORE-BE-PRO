CREATE SCHEMA IF NOT EXISTS cassava;

CREATE TABLE cassava.predict_result (
    id SERIAL PRIMARY KEY,
    inslot VARCHAR(20) NOT NULL,
    batch VARCHAR(20) NOT NULL,
    months int NOT NULL,
    season VARCHAR(5) NOT NULL,
    plant VARCHAR(20) NOT NULL,
    vendor VARCHAR(20) NOT NULL,
    region VARCHAR(5) NOT NULL,
    fines numeric(16, 2) NOT NULL,
    bulk numeric(16, 4) NOT NULL,
    sand_predict_value numeric(16, 2) NOT NULL,
    total_sand_value numeric(16, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

