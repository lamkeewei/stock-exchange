# Stock Exchange

## Folders

```
| - stock-exchange
  | - application (Main application source code)
  | - haproxy (Configuration files for HAProxy)
  | - mongodb (Configuration files for MongoDB)
  | - nginx (Configuration files for Nginx)
```

## API Endpoints
Here's a list of endpoints used by the AngularJS frontend. Just reimplement for any backend and we'll be able to swap them around.

| Endpoint | HTTP Method | Description |
| :------- | :---------: | :---------- |
| /api/buys | GET | Retrieve an array of all buy bids | 
| /api/buys/user/:userId | GET | Retrieve the bids of a particular user | 
| /api/buys | POST | Add a buy bid | 
| /api/buys/all | DELETE | Delete all bids (used for ending the trade day) | 
| /api/sells | GET | Retrieve an array of sell asks | 
| /api/sells/user/_:userId_ | GET | Retrieve the sell asks of a particular user | 
| /api/sells | POST | Add a sell ask | 
| /api/sells/all | DELETE | Delete all sell asks (used for ending the trade day) | 
| /api/stats/_:stock_ | GET | Get the min ask, max bid and latest price for a given stock | 


## Data Models

### Buy Bids
| Attribute | Type | Description |
| :-------: | :--: | :---------- |
| userId | String | User ID of the user submitting the bid |
| stock | String | Stock that user is buying. Valid values are: SMU, NUS, NTU. Using uppercase for now. Might have to change |
| price | Number | Price at which the bid is being placed at |
| date | Date | Date at which the bid is being added |
| match | Foreign Key | Reference to the sell ask that the bid is matched against. Null if no match |

### Sell Asks
| Attribute | Type | Description |
| :-------: | :--: | :---------- |
| userId | String | User ID of the user submitting the sell ask |
| stock | String | Stock that user is buying. Valid values are: SMU, NUS, NTU. Using uppercase for now. Might have to change |
| price | Number | Price at which the user is willing to sell the stock for |
| date | Date | Date at which the sell ask is being added |
| match | Foreign Key | Reference to the buy bid that the sell ask is matched against. Null if no match |