# ExpressSweaterWeather
# SweaterWeather

ExpressSweaterWeather is an API service that is intended to work as the backend for an weather app that mirrors yahoo weather:   https://www.yahoo.com/news/weather  
Visitors can request for forecast,background image for a given location and create account  
User can sign in to their account, create favorites, delete favorites using their API key they got during registration   process.  

# Getting Started
You access the SweaterWeather API through an HTTP interface. Following are examples of requests.  
Base URL: `https://express-sweaater-weather.herokuapp.com/`
## Forecast Lookup
The following example requests the forecast of  "denver, colorado".  
```
GET /api/v1/forecast?location=denver,colorado
Content-Type: application/json
Accept: application/json
```
You will receive a response that contains current, daily, and hourly forecast   
## Account Creation 
The following example requests sign up to the SweaterWeather API.  
```
 POST /api/v1/users 
 Content-Type: application/json
 Accept: application/json
 And the body must contain email, password and password_confirmation like below:
 { 
   "email": "whatever@example.com",
   "password": "password",
   "password_confirmation": "password"
 }
 ```
After a successful request for sign up, You will get an API key.   
Sample response, in JSON:  
```
{ 
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

## Login
The following example requests sign in to the SweaterWeather API.  
```
POST /api/v1/sessions
Content-Type: application/json
Accept: application/json
And the body must contain email, passwordlike below:
{
  "email": "whatever@example.com",
  "password": "password"
}
```
If your request is approved, you will see your API key within the response.  
Sample response, in JSON:  
```
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
## Favoriting Locations
User can favorite a location by sending body that contains location to favorite and user's api key to POST: `/api/v1/favorites` endpoint.  
The following example requests favoriting a location.  
``` 
  POST /api/v1/favorites
  Content-Type: application/json
  Accept: application/json
  body:
  {
    "location": "Denver, CO",
    "api_key": "jgn983hy48thw9begh98h4539h4"
  }
 ```
If your request is approved you will receive a success message within the response.  
Sample response, in JSON:  
```
{
    "success": "Denver, CO has been added to your favorites."
}
```
## Listing Favorites 
User can list all their favorites by sending body that contains their API key to GET: `/api/v1/favorites` endpoint.    
The following example requests favorites for a user with an API key.  
```
  GET /api/v1/favorites
  Content-Type: application/json
  Accept: application/json

  body:
  {
    "api_key": "jgn983hy48thw9begh98h4539h4"
  }
  ```
If your request is approved you will receive all your favorites along with forecast for each locations.  
## Removing Favorites  
User can delete their favorite by sending a body that contains location name and their API key to DELETE: `/api/v1/favorites` endpoint.  
The following example requests removing a favorites.  
```
  DELETE /api/v1/favorites
  Content-Type: application/json
  Accept: application/json

  body:
  {
    "location": "Denver, CO",
    "api_key": "jgn983hy48thw9begh98h4539h4"
  }
```
If your request is approved, You will receive a response that contains remaining favorites and their forecast.  
Sample response, in JSON:  
(In this case we only had one favorites and we deleted that)

```
{
    "data": []
}
``` 

## Set Up Locally 
### Prerequisites 
* postgresql database  
* node.js 
* express 


Clone the project   
```
 git clone git@github.com:manojpanta/SweaterWeather.git
```
Enter the directory  
```
cd ExpressSweaterWeather
```
Install dependencies  
```
npm install
```
Create, migrate, and seed  
```
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed

```
Next, create `.env` file on your root path of ExpressSweaterWeather dorectory. 
You will need  
[Geocoding API](https://developers.google.com/maps/documentation/geocoding/get-api-key),  
[Darksky API](https://darksky.net/dev), and  
You must set environment variable inside `.env` file like below.  
```
GEOCODING_API= your____api_____key
DARK_SKY_API_KEY= your____api_____key
```
Once you set up all the keys as an enviroment variables,  
Start up server locally  
```
npx nodemon start
```
## Contribute to the project
Please fork and clone this project, make changes you like, and make a PR.

