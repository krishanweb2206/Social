export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + '=' + encodedValue); //[username:krishan,password:1234];
  }

  return formBody.join('&'); //'username:krishan&password:1234'
}

export function getAuthTokenFromLocalStorage(){
  return localStorage.getItem('token');
}