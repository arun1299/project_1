export interface payment_transaction {
  id             :number;
  tran_date      :Date ;
  customer_name  :string;
  invoice_number :string;
  tran_mode      :number;
  debit          :number;
  balance        :number;
  tran_details   :string;
  notes          :string;
  tran_type      :string;
}
