const AbuseVt = require('../model/abuseVt.model');
const asyncHandler = require('../middleware/asyncHandler');
const { sendEmail } = require('../helpers/mailer');
const axios = require('axios');
const { checkVT } = require('../virusTotal');
const ExcelJS = require('exceljs');

// Controller for Sending stored data to the client using mail
exports.sendStoredData = asyncHandler(async (_req, res) => {
  const data = await AbuseVt.find();
  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'No data found' });
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data
  });
});

// Controller for sending data to the client using mail
exports.sendDataToClient = asyncHandler(async (req, res) => {
  const data = await AbuseVt.find();
  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'No data found' });
  }

  await sendEmail(data);

  res.status(200).json({
    success: true,
    message: 'Data sent to client successfully',
    data
  });
});

// Controller for fetch data after that store and send to client using mail
exports.fetchAbuseVtDataAndSend = asyncHandler(async (_req, res) => {
  // Fetch data from abuse vt
  try {
    const response = await axios.get('https://api.abuseipdb.com/api/v2/blacklist', {
      headers: {
        'Key': process.env.ABUSE_IPDB_API_KEY,
        'Accept': 'application/json'
      },
      params: {
        confidenceMinimum: 98,
        limit: 5
      }
    });
    console.log(response.data);
    if (!response.data || !response.data.data || response.data.data.length === 0) {
      return res.status(404).json({ message: 'No high-confidence IPs found in AbuseIPDB' });
    }

    const abuseData = response.data.data;

    const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Abusive IPs');
      sheet.columns = [
        { header: 'IP Address', key: 'ipAddress' },
        { header: 'Abuse Score', key: 'abuseConfidenceScore' },
        { header: 'Country', key: 'countryCode' },
        { header: 'Domain', key: 'domain' }
      ];
    
      response.data.data.forEach(ip => sheet.addRow(ip));
      await workbook.xlsx.writeFile('AbuseIPDB_Results.xlsx');

    const vtData = [];

    for (let ip of abuseData) {
      const result = await checkVT(ip.ipAddress);
      console.log(`Checked:`, result);
      vtData.push(
        typeof result === 'object' && result !== null
          ? JSON.parse(JSON.stringify(result))
          : result
      );
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Store data in DB
    const storedData = await AbuseVt.insertMany(vtData);
    if (!storedData || storedData.length === 0) {
      return res.status(500).json({ message: 'Failed to store data' });
    }

    // Send data to client using mail
    await sendEmail(storedData);

    res.status(200).json({
      success: true,
      message: 'Data fetched, stored, and sent to client successfully',
      data: vtData
    });
  } catch (err) {
    console.error("Error fetching from AbuseIPDB:", err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})