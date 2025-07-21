# 🛡️ IP Reputation Monitoring API

This Node.js service integrates with [AbuseIPDB](https://www.abuseipdb.com/) and [VirusTotal](https://www.virustotal.com/) to detect, store, and report potentially malicious IP addresses. It includes endpoints for fetching IP data, sending reports via email, and combining both in an automated pipeline.

---

## 📌 Endpoints

### 1. GET `/api/v1/get-data`

**Purpose**:  
Fetches all stored IP reputation data from the MongoDB database.

**Description**:  
This endpoint returns all previously fetched and stored IP information including reputation metadata.

**Response**:
- ✅ **200 OK**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "abc123",
      "ip": "8.8.8.8",
      "country": "US",
      "detectedUrls": 10,
      "undetectedUrls": 3,
      "detectedSamples": 2
    }
  ]
}
```

### 2. GET `/api/v1/send-data`

**Purpose**:  
Email the stored data to the user.

**Description**:  
Finds all IP data in the database and sends it via email as a styled HTML table and Excel attachment.

**Response**:
- ✅ **200 OK**
```json
{
  "success": true,
  "message": "Data sent to client successfully",
  "data": [
    {
      "_id": "abc123",
      "ip": "8.8.8.8",
      "country": "US",
      "detectedUrls": 10,
      "undetectedUrls": 3,
      "detectedSamples": 2
    }
  ]
}
```

### 3. GET `/api/v1/fetch-and-send`

**Purpose**:  
Fetches high-confidence malicious IPs from AbuseIPDB, checks them on VirusTotal, stores them in the DB, and sends the result to the recipient via email.

**Description**:  
This endpoint returns all previously fetched and stored IP information including reputation metadata.

**Response**:
- ✅ **200 OK**
```json
{
  "success": true,
  "message": "Data fetched, stored, and sent to client successfully",
  "data": [
    {
      "_id": "abc123",
      "ip": "8.8.8.8",
      "country": "US",
      "detectedUrls": 10,
      "undetectedUrls": 3,
      "detectedSamples": 2
    }
  ]
}
