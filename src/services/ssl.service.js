const axios = require('axios');
const { v4: uuid } = require('uuid');
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const { SMS_API_URL } = require('../constants/sslWireless');
const { parseXml } = require('../utils/xmlUtil');
const ApiError = require('../utils/apiError');
const { convertBanglaToUnicode } = require('../utils/stringUtil');

const sslKeys = {
  USERNAME: config.ssl_sms_gw.user,
  PASSWORD: config.ssl_sms_gw.pass,
  SID: config.ssl_sms_gw.sid,
};

const sendSmsEn = async (smsTextBn, phoneNumber) => {
  try {
    const smsBody = smsTextBn;
    const response = await sendSmsRequestToSSL(smsBody, phoneNumber);
    const parsedResponse = await parseXml(response.data);
    logger.info(parsedResponse);
    return parsedResponse;
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const sendSmsBn = async (smsTextBn, phoneNumber) => {
  try {
    const smsBody = convertBanglaToUnicode(smsTextBn);
    const response = await sendSmsRequestToSSL(smsBody, phoneNumber);
    const parsedResponse = await parseXml(response.data);
    logger.info(parsedResponse);
    return parsedResponse;
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const sendSmsRequestToSSL = async (smsBody, phoneNumber) => {
  const params = {
    user: encodeURI(sslKeys.USERNAME),
    pass: encodeURI(sslKeys.PASSWORD),
    sid: encodeURI(config.ssl_sms_gw.sidWma),
    msisdn: `88${phoneNumber}`,
    sms: smsBody,
    csmsid: uuid().toString(),
  };

  try {
    const response = await axios.get(SMS_API_URL, { params });
    return response;
  } catch (error) {
    throw new ApiError(`Error sending SMS request to SSL: ${error.message}`);
  }
};

module.exports = {
  sendSmsEn,
  sendSmsBn,
};
