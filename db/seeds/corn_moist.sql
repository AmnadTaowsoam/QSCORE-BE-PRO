CREATE SCHEMA IF NOT EXISTS corns_moist;

CREATE TABLE IF NOT EXISTS corns_moist.corns_moist_result (
    id SERIAL PRIMARY KEY,
    sensor_id character varying(20) COLLATE pg_catalog."default" NOT NULL,
    inslot character varying(20) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    batch character varying(20) COLLATE pg_catalog."default" NOT NULL,
    plant character varying(20) COLLATE pg_catalog."default" NOT NULL,
    vendor character varying(20) COLLATE pg_catalog."default" NOT NULL,
    moist_top_n NUMERIC(16,2) NOT NULL,
    moist_top_min NUMERIC(16,2) NOT NULL,
    moist_top_max NUMERIC(16,2) NOT NULL,
    moist_top_avg NUMERIC(16,2) NOT NULL,
    moist_top_mvavg NUMERIC(16,2) NOT NULL,
    moist_top_sd NUMERIC(16,2) NOT NULL,
    moist_bot_n NUMERIC(16,2) NOT NULL,
    moist_bot_min NUMERIC(16,2) NOT NULL,
    moist_bot_max NUMERIC(16,2) NOT NULL,
    moist_bot_avg NUMERIC(16,2) NOT NULL,
    moist_bot_mvavg NUMERIC(16,2) NOT NULL,
    moist_bot_sd NUMERIC(16,2) NOT NULL,
    moiscorn NUMERIC(16,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
