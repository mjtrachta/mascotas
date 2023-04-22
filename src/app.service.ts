import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'soap';
import * as util from 'util';


@Injectable()
export class AppService {

  constructor(@Inject('MY_SOAP_CLIENT') private readonly mySoapClient: Client) {}

  async callService(numero: number): Promise<string> {
    const result = await this.mySoapClient.NumberToWordsAsync({ubiNum: numero});
    return result[0].NumberToWordsResult;
  }

  async priceDelivery(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.mySoapClient.NumberToWords({}, (err, res) => {
        if(res){
          const inspectedRes = util.inspect(res, { depth: null });
          resolve(inspectedRes);
        }else{
          reject(err);
        }
      })
    })
  }
}
