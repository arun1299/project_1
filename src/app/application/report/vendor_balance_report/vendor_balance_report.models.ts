
export interface vendor_balances
{
  s_no             : number
  Vendor_Name      : string
  Bill_Count       : number
  Paid_Amount      : number
  Bill_Amount      : number
  Balance          : number
}

export interface invidual_vendor_balances
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

