export interface customer_balances
{
  s_no             : number
  Customer_Name    : string
  Sales            : number
  Received         : number
  Balance          : number
}

export interface invidual_customer_balances
{
  s_no          : number
  date          : number
  transaction   : string
  description   : string
  amount        : number
  payments      : number
  balance       : number
  bank          :string
}
