import * as soap from 'soap';

const url = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso?op=NumberToWords'; // URL del WSDL del servicio web
const args = { ubiNúm: 7 };
soap.createClient(url, (err, client) => {
  if (err) throw err;
  console.log(client.describe()); // muestra la descripción del servicio web
  client.miMetodoSOAP(args, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});
