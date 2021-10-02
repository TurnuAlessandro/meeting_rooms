#include <ESP8266WiFi.h>
#include <time.h>
#include <PubSubClient.h>
#include "configuration.h"
#include <LiquidCrystal_I2C.h>
#include <ArduinoJson.h>
#include <TimeLib.h>
#define BUTTON 14
#define RLED 12
#define GLED 13


BearSSL::X509List client_crt(client_cert);
BearSSL::PrivateKey client_key(privkey);
BearSSL::X509List rootCert(cacert);

//Inizializzazione
const char* awsEndpoint = "a2rb2bl3y4if44-ats.iot.us-east-2.amazonaws.com";
const char* MQTT_SUB_TOPIC = "$aws/things/" THINGNAME "/shadow/events";
const char* MQTT_PUB_TOPIC = "$aws/things/" THINGNAME "/shadow/update";

//Variabili Globali utili per la stampa sullo Schermo LCD
String meetingNameGlobale = "Loading...";
String meetingTimeGlobale = "-1";
int meetingHourGlobale = -1;

//Variabile per controllare le corrispondenze tra riunioni
String dataTimeCorrente = "55555555";
//Valore iniziale del bottone
int value1 = 0;
  
WiFiClientSecure wiFiClient;
void msgReceived(char* topic, byte* payload, unsigned int len);
PubSubClient pubSubClient(awsEndpoint, 8883, msgReceived, wiFiClient); 

//Inizializzazione dello schermo LCD
LiquidCrystal_I2C lcd(0x27,16,2);

//Funzioni per stampare i dati necessari sullo schermo LCD
void printLCDsecondLine(const char* timeM);
void printLCDfirstLine(const char* nameX);

void setup() {
  //Inizializzazione Monitor Serial e componenti (Led e Bottone)
  Serial.begin(115200);
  pinMode(BUTTON,INPUT);
  pinMode(RLED,OUTPUT);
  pinMode(GLED,OUTPUT);
  //Connessione ad Internet
  Serial.print("Connecting to "); 
  Serial.print(ssid);
  WiFi.begin(ssid, password);
  WiFi.waitForConnectResult();
  Serial.print(", WiFi connected, IP address: "); 
  Serial.println(WiFi.localIP());
  
  // get current time, otherwise certificates are flagged as expired
  setCurrentTime();
  //Verifica dei certificati di AWS
  wiFiClient.setClientRSACert(&client_crt, &client_key);
  wiFiClient.setTrustAnchors(&rootCert);
  
  lcd.init();
  delay(500);// initialize the lcd 
  lcd.backlight();
  lcd.setCursor(0,0);
  delay(500);  

}

//stampare il nome del meeting 
void printLCDfirstLine(String nameX){
  lcd.setCursor(0,0);
  lcd.clear();
  lcd.print(nameX);
  
}
//stampare l'orario del meeting 
void printLCDsecondLine( int timeM){
  lcd.setCursor(0,1);
  if(timeM != -1){
      lcd.print(timeM);
      lcd.setCursor(2,1);
      lcd.print(":00");

    }
}

unsigned long lastPublish;
int msgCount;

void loop() {

  pubSubCheckConnect();
  if (millis() - lastPublish > 5000) {
      
    value1 = analogRead(BUTTON);
    String msg = (String)value1;
    pubSubClient.publish(MQTT_PUB_TOPIC, msg.c_str());
    lastPublish = millis();
  
    time_t now = time(nullptr);
    struct tm * timeinfo = localtime(&now);

    char* dayStr = "-1111";
    char* monthStr = "-2222";
    char* hourStr =  "-3333";

    sprintf(dayStr, timeinfo->tm_mday < 10 ? "0%d" : "%d", timeinfo->tm_mday);
    sprintf(monthStr, timeinfo->tm_mon+1 < 10 ? "0%d" : "%d", timeinfo->tm_mon+1);
    sprintf(hourStr, timeinfo->tm_hour +1 < 10 ? "0%d" : "%d", timeinfo->tm_hour +1);
    //sprintf(&dataTimeCorrente,"%s%s%s", monthStr,dayStr, hourStr);


    Serial.print("dayStr:  ");
    Serial.print(dayStr);
    Serial.println();
    Serial.print("monthStr:  ");
    Serial.print(monthStr);
    Serial.println();
    Serial.print("hourStr:  ");
    Serial.print(hourStr);
    Serial.println();
    
    dataTimeCorrente = String(monthStr) + String(dayStr) + String(hourStr);

    
    Serial.print("condizione  ");
    Serial.print(meetingTimeGlobale.toInt() == dataTimeCorrente.toInt());
    Serial.println();
    if(meetingTimeGlobale.toInt() == dataTimeCorrente.toInt()){
      Serial.println("Primo if");
      digitalWrite(RLED,HIGH);
      digitalWrite(GLED,LOW);
    
    }else if(meetingNameGlobale == "Loading..."){
            Serial.println("secondo if..");

     digitalWrite(RLED,LOW);
     digitalWrite(GLED,LOW);
  
  } else {
    Serial.println("else");
    
    digitalWrite(RLED,LOW);
     digitalWrite(GLED,HIGH);
    
    }
    printLCDfirstLine(meetingNameGlobale);
    printLCDsecondLine(meetingHourGlobale);

}

}
void msgReceived(char* topic, byte* payload, unsigned int length) {
 Serial.print("Message received on "); 
 Serial.print(topic); 
 Serial.print(": ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
  
  char* payload1 = (char*) payload;

  //COnversione JSON da Node in Stringhe per schermo LCD   
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc,payload1);
  String nameMeeting = doc["meetingName"];
  String timeX = doc["meetingTime"]; //100211
  const int hourX = doc["meetingHour"];
  
  /**
  Serial.println(nameMeeting);
  Serial.println(timeX);
  Serial.print(hourX);
  
- All'inizio dobbiamo sovrascrivere a prescindere
  - se l'oratempo è quella attuale il led è rosso
  - altrimenti è verde 
- ad ogni messaggio
  - se l'evento viene prima di quello attualmente nello schermo, sostituire
     - se l'oratempo è quella attuale il led è rosso
     - altrimenti è verde 
   - altrimenti niente 
   */
  

  
//Controllo Stringhe della data    
  if(timeX < meetingTimeGlobale || meetingTimeGlobale == "-1"){
    Serial.println("Entrato");
    meetingNameGlobale = nameMeeting;
    meetingTimeGlobale = timeX;
    meetingHourGlobale = hourX;
   }

    Serial.print("meetingNameGlobale:  ");
    Serial.print(meetingNameGlobale);
    Serial.println();
    Serial.print("meetingTimeGlobale:  ");
    Serial.print(meetingTimeGlobale);
    Serial.println();
    Serial.print("dataTimeCorrente:  ");
    Serial.print(dataTimeCorrente);
    Serial.println();

        
}
    

void pubSubCheckConnect() {
  if ( ! pubSubClient.connected()) {
    Serial.print("PubSubClient connecting to: "); 
    Serial.print(awsEndpoint);
    while ( ! pubSubClient.connected()) {
      Serial.print(".");
      pubSubClient.connect("ESPthing");
    }
    Serial.println(" connected");
    pubSubClient.subscribe(MQTT_SUB_TOPIC);
  }
  pubSubClient.loop();
}



void setCurrentTime() {
  configTime(3600, 0, "pool.ntp.org", "time.nist.gov");
  Serial.print("Waiting for NTP time sync: ");
  time_t now = time(nullptr);
  while (now < 8 * 3600 * 2) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("");
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);
  Serial.print("Current time: "); 
  Serial.print(asctime(&timeinfo));

}
