# Relationship Builder

## Stack

### Frontend

    React ReactStrap Bootstrap

### API

    NodeJS Express

### Database

    PostgreSQL

## [Demo Video](https://drive.google.com/file/d/1ruHftu_BCluAJzjIVyG5y_qiGSXmzjg-/view?usp=sharing)

## Install Dependancies

### `yarn install`

Install's dependency for runnng app, first run this command before running main install

### `yarn install:all`

This instruction will install dependencies in both client and api.

## Run Project

### `yarn start`

This command will start api on port [5000](http://localhost:5000) and client in development on port [3000](http://localhost:3000)

## Setup

Load the `db.pgsql` file located at the root in your postgresql local install

Update the credentials of PostgreSQL in `.env` at api/ , a sample .env file is at the api/ directory by the name `.env.example`

## Scaling on AWS

The best option for scaling in amazon if the users exceed 1M is AWS Lambda Service. You only need to pay for what you use
.
