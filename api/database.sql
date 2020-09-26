-- Run these commands in your postgresql database

CREATE DATABASE "<give the database name given in .env file>";

CREATE TABLE people
(
    person_id SERIAL PRIMARY KEY,
    person_name VARCHAR(50)
);
CREATE TABLE tags
(
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(50)
);