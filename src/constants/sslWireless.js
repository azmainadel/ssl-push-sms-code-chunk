const SMS_API_URL = 'https://sms.sslwireless.com/pushapi/dynamic/server.php';

const SSL_STATUS_CODE = {
  API_SUCCESS: '000',
  INVALID_INPUT: '001',
  DUPLICATE_INPUT: '405',
  INVALID_TXN_ID: '413',
  PAYMENT_SUCCESS: '111',
};

module.exports = {
  SMS_API_URL,
  SSL_STATUS_CODE,
};
