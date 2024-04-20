CREATE SCHEMA IF NOT EXISTS corns;

CREATE TABLE corns.prediction_record (
    id SERIAL PRIMARY KEY,
    inslot VARCHAR(255),
    batch VARCHAR(255),
    plant VARCHAR(255),
    vendor VARCHAR(255),
    operation VARCHAR(255),
    sample_weight FLOAT,
    count_by_class JSONB,
    weight_by_class JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);