#include <Arduino.h>

#include "DHT.h"

#define DHTPIN                                                                                                       2 
#define DHTTYPE DHT11 

#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

DHT dht(DHTPIN, DHTTYPE);
 
void setup() {
 
   Serial.begin(115200);                            //Serial connection
  WiFi.begin("JioFi2_0B9548", "12345678");   //WiFi connection
 
  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
  
    delay(500);
    Serial.println("Waiting for connection");
 
  }
    dht.begin();
}

void loop() {

  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).

  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.print(" *C ");
  Serial.print("Heat index: ");
  Serial.print(hic);
  Serial.print(" *C ");
 
if (WiFi.status() == WL_CONNECTED &&  (!isnan(h) && !isnan(t)) ) 
{//Check WiFi connection status
 
    StaticJsonBuffer<300> JSONbuffer;   //Declaring static JSON buffer
    JsonObject& JSONencoder = JSONbuffer.createObject(); 

    JsonObject& data = JSONbuffer.createObject();
    data["temperature"] = t;
    data["humidity"] = h;

    char JSONmessageBuffer[300];
    JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));

  delay(5000);  //Send a request every 30 seconds
 
 HTTPClient http;    //Declare object of class HTTPClient
 
        http.begin("https://976c17ac.ngrok.io/api/store?temp="+(String) t+"&humid="+(String) h); //Specify request destination
        http.addHeader("Content-Type", "application/json");
 
    int httpCode = http.POST(JSONmessageBuffer);   //Send the request
    String payload = http.getString();                                        //Get the response payload
 
    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);    //Print request response payload
 
    http.end();  //Close connection
 
  } else {
 
    Serial.println("Error in WiFi connection");
        Serial.println("Failed to read from DHT sensor!");
 
  } 

  delay(10000);
}
