const nodemailer = require('nodemailer');

// Tạo một transporter giả để tránh lỗi
const transporter = {
  verify: function(callback) {
    console.log('Email service đã bị vô hiệu hóa tạm thời');
    callback(null, true);
  },
  sendMail: function(mailOptions, callback) {
    console.log('Email đã được "gửi" (chế độ giả lập):', mailOptions);
    if (callback) callback(null, { response: 'Email giả lập thành công' });
    return Promise.resolve({ response: 'Email giả lập thành công' });
  }
};

module.exports = transporter; 