## Azure Functions setup
you can either host this code online or you could just setup it in localhost using azure-functions-core-tools.  
The dashboard I made was totally on localhost but as the arduino was connecting to internet i used ngrok for it.

```
npm install
func host start
ngrok http 7071
```
