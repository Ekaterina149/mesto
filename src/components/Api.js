class Api {
  constructor (){

  }

getData(href,headers) {
  return (fetch(href, { headers: headers, })
  .then( (res) => {
     if(res.ok) { return res.json()}
     else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
    }))
}
setData(href, method, headers, bodyObject) {
return (fetch(href, {
  method: method,
  headers: headers,
  body: JSON.stringify(bodyObject), }
  )
  .then( (res) => {
    if(res.ok) { return res.json()}
    else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
   }))
}

}
export { Api };
