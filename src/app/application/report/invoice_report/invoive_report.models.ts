export interface invoice_details{
  s_no             : number
  Date             : number
  Invoice_No       : string
  Due_date         : number
  Reference_number : string
  Customer_name    : string
  Status           : string
  Total            : number
  Balance          : number
  Paid_Amount      : number
  Tax_amount       : number
  Amount_without_tax:number
  price_precision  : number
}


export interface invoice_transaction{
  s_no             : number
  tran_date        : number
  reference        : string
  tran_mode        : number
  debit            : number
  balance          : number
  tran_details     : number
  notes            : number
}
