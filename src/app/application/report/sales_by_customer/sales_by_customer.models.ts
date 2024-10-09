export interface sales_report{
  s_no          :number
  Customer_Name :string
  Invoice_Count :number
  Without_Tax   :number
  Tax           :number
  Sales         :number
}

export interface invidual_customer_balances
{
  s_no             : number
  Date             : number
  Customer_Name    : string
  Reference_Number : string
  Payment_Mode     : number
  Invoive_No       : number
  Deposited_To     : number
  Amount           : number
}
