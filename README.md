# Requirements
- Python 3.6.
- NodeJS.
- Docker.
- Mysql.
- Access to Open AI API.

# Installation
1. Clone the repository.
2. Execute docker-builds.sh script, this will build all the images.
3. Configure .env file in back/.env, environment variable examples in .env-example, PORT=5139.
4. Install the database, script with all the required sql queries in the file sql/SQLdeclaration.sql.
5. Execute docker-start.sh script to run the containers. If it doens't work be sure you are not using the ports: [5000, 5139 & 5173]

