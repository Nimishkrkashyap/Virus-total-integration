const nodemailer = require('nodemailer');
const fs = require('fs');

async function sendEmail(vtData) {
  const tableRows = vtData.map(item =>
    `<tr><td>${item.ip}</td><td>${item.country}</td><td>${item.detected_urls}</td><td>${item.undetected_downloaded_samples}</td><td>${item.detected_downloaded_samples}</td><td>${item.undetected_urls}</td></tr>`
  ).join('');

  const html = `
  <p>Attached is the AbuseIPDB Report.</p>
  <p><strong>VirusTotal Summary:</strong></p>
  <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #dddddd; padding: 8px; text-align: left;">IP</th>
        <th style="border: 1px solid #dddddd; padding: 8px; text-align: left;">Country</th>
        <th style="border: 1px solid #dddddd; padding: 8px; text-align: left;">Detected URLs</th>
        <th style="border: 1px solid #dddddd; padding: 8px; text-align: left;">Un Detected Downloaded Samples</th>
        <th style="border: 1px solid #dddddd; padding: 8px; text-align: left;">Detected Downloaded Samples</th>
        <th style="border: 1px solid #dddddd; padding: 8px; text-align: left;">Undetected URLs</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>
`;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'lokesh.kumawat@optiv.com',
    subject: 'AbuseIPDB + VirusTotal IP Reputation Report',
    html,
    attachments: [
      {
        filename: 'AbuseIPDB_Results.xlsx',
        content: fs.createReadStream('./AbuseIPDB_Results.xlsx')
      }
    ]
  });
  console.log('Email sent successfully with VirusTotal data!');
}

module.exports = { sendEmail };
