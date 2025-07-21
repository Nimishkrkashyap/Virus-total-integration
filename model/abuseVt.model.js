const mongoose = require('mongoose');

const vtSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    country: { type: String, required: true },
    detected_urls: { type: Number, required: true },
    detected_downloaded_samples: { type: Number, required: true },
    undetected_downloaded_samples: { type: Number, required: true },
    undetected_urls: { type: Number, required: true }
}, { timestamps: true });

const VTModel = mongoose.model('AbuseVT', vtSchema);
module.exports = VTModel;




// f2ef6874e9c5c5e041431cb11bab6137e288929335e163716379cbfc2571af385b24d6301e884033 - nimishjha
// 3efc1602dda1ad76f8a37c8120a41ade7fc055f2d9ddaafe480864773b69c0df22ac40d469bc4f23 - nimishkumar9534
// 8ec7b1a4ba921c164cf2cf8f3296094828b36321f9cab439da70c00582205fc3ef3718537e04431b - riteshmalakar5@gmail.com
// 7283be50920fffccfe0f4687feff54d9b1239db7cbb245bb04bcd01e5da40a71ea8705d2ccbaaf6a - ankush
// 645855cbe1ed57a3310c673a83141288831ba29e5183dbcf2bf7f8188adc6cb8471d5adbf131edbf - Pramod
// 4b821d1a40035c0563bcdebc48fce77bf062e37dccd483aeffd8eab8e50f972c1f9f4cc3a0aadddb - kashyap