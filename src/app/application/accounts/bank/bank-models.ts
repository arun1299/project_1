/* eslint-disable @typescript-eslint/no-explicit-any */



export interface bank_details {
  [x: string]: any;
  id            :any;
  bank_id       :number
  account_name  :string;
  balance       :number;
  status        :number;
}

export interface expense_details {
  id            :number;
  s_no          :number;
  account_name  :string;
  account_type  :number;
  status        :number;
}

export interface transaction {
  tran_id      :any;
  tran_date    :Date
  tran_mode    :number
  reference    :string;
  credit       :number;
  debit        :number;
  balance      :number;
  tran_details :string;
  notes        :string;
}

export interface exp_transaction {
  exp_id :number;
  exp_date:Date,
  exp_mode:number;
  amount :number;
  exp_type:number;
  tax_amount:number;
  name_of_expense :string;
  notes :string
}
