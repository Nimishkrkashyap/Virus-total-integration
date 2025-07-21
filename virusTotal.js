const axios = require('axios');
// require('dotenv').config();

async function checkVT(ip) {
  const res = await axios.get(`https://www.virustotal.com/vtapi/v2/ip-address/report?apikey=${process.env.VIRUSTOTAL_API_KEY}&ip=${ip}`);

  const data = res.data

  // return data;
  return {
    ip,
    country: data.country || "Not Found",
    detected_urls: data.detected_urls?.length || 0,
    detected_downloaded_samples: data.detected_downloaded_samples?.length || 0,
    undetected_downloaded_samples: data.undetected_downloaded_samples?.length || 0,
    undetected_urls: data.undetected_urls?.length || 0
  };
}

module.exports = { checkVT };
