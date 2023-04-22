export interface TxnResponseFromBackEnd{
  amount : number;
  senderInfo : string;
  recepientInfo : string;
  transactionType : string;
  currency : string;
  status : string;
  date : string;
}
