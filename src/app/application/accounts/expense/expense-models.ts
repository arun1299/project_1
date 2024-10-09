export interface expense_account {
  id :number,
  exp_id:number,
  account_name :string
}

export interface bank_account {
  id :number,
  bank_id:number,
  account_name :string
}


export interface bills {
  id :number,
  bill_id:number,
  bill_no :string
}

export interface invoice {
  id :number,
  invoice_id:number,
  invoice_no :string
}


export interface projects {
  id :number,
  project_id:number,
  name :string
}

export interface tax {
  id :number,
  name :string,
  type:string,
  rate:number
}

export interface expense_list {
  id               : number
  transaction_date :number,
  bill             :string,
  invoice          :string,
  project          :string,
  referense        :string,
  transaction_mode :string,
  amount           :number,
  exp_type         :number,
  tax_amount       :number
  expence_account  :string
  paid_account     :string
  name_of_expense  :string
  notes            :string
}
