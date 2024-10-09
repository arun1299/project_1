export interface payment_transaction {
  id           :number;
  tran_date    :Date ;
  vendor_name  :string;
  bill_number  :string;
  po_number    :string;
  tran_mode    :number;
  credit       :number;
  balance      :number;
  tran_details :string;
  notes        :string;
  tran_type    :string;
}
