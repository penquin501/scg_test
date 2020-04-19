# scg_test

create docker-compose.yml file
version: "3.0"
services:
  webapp:
    build:
      context: ./webapp
    environment:
      - GOOGLE_API_KEY=your google api key
      - Authorization=Bearer your line's authorization
    ports:
      - "3000:3000"
