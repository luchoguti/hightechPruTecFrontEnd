import { API_BASE_URL  } from '../config';
import fetch from 'isomorphic-fetch';

 // Method request data
 export const methodRequet = async (data,url,methodRequest,id) =>{
  const resCreditCard = await fetch(`${API_BASE_URL}/${url}${id}`, {
      method: methodRequest,
      headers: {
          'Content-Type':'application/json',
      },
      body: JSON.stringify(data),
  });
  const dataResp = await resCreditCard.json();
  return dataResp;
}


//ReStart values data Init
export const reStartDataInit = (dataInit) => {
  const { data, errors } = dataInit;
  const newData = Object.values(data);
  for (let index = 0; index < newData.length; index++) {
      newData[index]['value'] = '';
  }
  let reOrganizeData = {};
  for (let j = 0; j < newData.length; j++) {
      reOrganizeData[newData[j]['var']] = newData[j];
  }
  let dataInitNew = {};
  dataInitNew['data'] = reOrganizeData;
  dataInitNew['errors'] = errors;
  return dataInitNew;
}

// Input onFocus append class handler
export const valideFocus = ( e ) => {
  e.target.parentElement.classList.add('focused');
}

// Input onBlur remove class handler
export const valideFocusOut = ( e ) => {
  const hasValue = e.target.value;

  if (!hasValue) {
    e.target.parentElement.classList.remove('focused');
  }
}

// Input onKeyDown numbers only handler
export const valideNumbersOnly = ( e ) => {
  let flag;

  if((e.keyCode === 8) ||
      (e.keyCode === 9) || 
      (e.keyCode === 16 && e.keyCode >= 9) ||
      (e.keyCode === 37) ||
      (e.keyCode === 39) ||
      (e.keyCode === 46) || 
      (e.keyCode >= 48 && e.keyCode <= 57) || 
      (e.keyCode >= 96 && e.keyCode <= 105)) {
    flag = false;
  } else {
    flag = true;
  }

  if(flag) {
    e.preventDefault();
  }
}

// Get card type based on card number
export const getCardType = ( number ) => {
  if (number !== '' || number !== null) {
    const amexReg   = new RegExp('^3[47]');
    const fbReg    = new RegExp('^35(2[89]|[3-8][0-9])');
    const masterReg = new RegExp('^5[1-5][0-9]');
    const visaReg   = new RegExp('^4');

    if (number.toString().match(amexReg)) {
      return 'amex';
    } else if (number.toString().match(fbReg)) {
      return 'fbl';
    } else if (number.toString().match(masterReg)) {
      return 'mastercard';
    } else if (number.toString().match(visaReg)) {
      return 'visa';
    } else {
      return 'invalid';
    }
  }
}