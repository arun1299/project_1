/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { routes } from '../../core.index';
import { SideBarData, apiResultFormat } from '../../models/models';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {


  constructor(private http: HttpClient, public api:ApiService) {}


  public getMenu() {
    return this.http.get<apiResultFormat>('assets/JSON/menu.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getEvents() {
    return this.http.get<apiResultFormat>('assets/JSON/scheduleevents.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getCustomers() {
    return this.http.get<apiResultFormat>('assets/JSON/customers.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActive() {
    return this.http.get<apiResultFormat>('assets/JSON/activecustomer.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDeactive() {
    return this.http.get<apiResultFormat>('assets/JSON/deactivecustomer.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }


  public getBlogs() {
    return this.http.get<apiResultFormat>('assets/JSON/blogs.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getCategories() {
    return this.http.get<apiResultFormat>('assets/JSON/categories.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getSalesReport() {
    return this.http.get<apiResultFormat>('assets/JSON/salesReport.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTaxReport() {
    return this.http.get<apiResultFormat>('assets/JSON/tax.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpensesList() {
    return this.http.get<apiResultFormat>('assets/JSON/expenses.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPaymentList() {
    return this.http.get<apiResultFormat>('assets/JSON/payments.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoiceItem() {
    return this.http.get<apiResultFormat>('assets/JSON/itemList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getEstimatesList() {
    return this.http.get<apiResultFormat>('assets/JSON/estimates.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getTicketList() {
    return this.http.get<apiResultFormat>('assets/JSON/ticket.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTicketPending() {
    return this.http.get<apiResultFormat>('assets/JSON/ticketsPending.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTicketOverdue() {
    return this.http.get<apiResultFormat>('assets/JSON/ticketsOverdue.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTicketCancelled() {
    return this.http.get<apiResultFormat>('assets/JSON/ticketCancelled.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTicketRecurring() {
    return this.http.get<apiResultFormat>('assets/JSON/ticketrecurring.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCountries() {
    return this.http.get<apiResultFormat>('assets/JSON/countries.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCities() {
    return this.http.get<apiResultFormat>('assets/JSON/city.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDeliverychallan() {
    return this.http.get<apiResultFormat>('assets/JSON/deliverychallens.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getMessages() {
    return this.http.get<apiResultFormat>('assets/JSON/message.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFaq() {
    return this.http.get<apiResultFormat>('assets/JSON/faq.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTestimonials() {
    return this.http.get<apiResultFormat>('assets/JSON/testimonials.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getVendors() {
    return this.http.get<apiResultFormat>('assets/JSON/vendors.json').pipe(
      map((res:apiResultFormat) => {
        return res;
      })
    );
  }
  public getLedger() {
    return this.http.get<apiResultFormat>('assets/JSON/ledger.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public recurringinvoice() {
    return this.http.get<apiResultFormat>('assets/JSON/recurringinvoice.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public recurringPending() {
    return this.http.get<apiResultFormat>('assets/JSON/recurringpending.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public recurringOverdue() {
    return this.http.get<apiResultFormat>('assets/JSON/recurringoverdue.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public recurring() {
    return this.http.get<apiResultFormat>('assets/JSON/recurring.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public recurringCancelled() {
    return this.http.get<apiResultFormat>('assets/JSON/recurringcancelled.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public recurringDraft() {
    return this.http.get<apiResultFormat>('assets/JSON/recurringdraft.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getUnits() {
    return this.http.get<apiResultFormat>('assets/JSON/units.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCategory() {
    return this.http.get<apiResultFormat>('assets/JSON/category.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getProductlist() {
    return this.http.get<apiResultFormat>('assets/JSON/productlist.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getcreditnotes() {
    return this.http.get<apiResultFormat>('assets/JSON/creditnotes.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEditcreditnotes() {
    return this.http.get<apiResultFormat>('assets/JSON/editcreditnotes.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCreditnotespending() {
    return this.http.get<apiResultFormat>('assets/JSON/creditnotespending.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCreditnotesoverdue() {
    return this.http.get<apiResultFormat>('assets/JSON/creditnotesoverdue.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCreditnotesdraft() {
    return this.http.get<apiResultFormat>('assets/JSON/creditnotesdraft.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCreditnoterecurring() {
    return this.http.get<apiResultFormat>('assets/JSON/creditnotesrecurring.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCreditnotecancel() {
    return this.http.get<apiResultFormat>('assets/JSON/creditnotescancel.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getinvoice() {
    return this.http.get<apiResultFormat>('assets/JSON/invoice.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getinvoicepaid() {
    return this.http.get<apiResultFormat>('assets/JSON/invoicepaid.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getinvoiceoverdue() {
    return this.http.get<apiResultFormat>('assets/JSON/invoiceoverdue.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getinvoicedraft() {
    return this.http.get<apiResultFormat>('assets/JSON/invoicedraft.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getinvoicerecurring() {
    return this.http.get<apiResultFormat>('assets/JSON/invoicerecurring.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getinvoicecancelled() {
    return this.http.get<apiResultFormat>('assets/JSON/invoicecancelled.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getinventory() {
    return this.http.get<apiResultFormat>('assets/JSON/inventory.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getpurchase() {
    return this.http.get<apiResultFormat>('assets/JSON/purchase.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getpurchaseorder() {
    return this.http.get<apiResultFormat>('assets/JSON/purchaseorder.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getdebitnotes() {
    return this.http.get<apiResultFormat>('assets/JSON/debitnotes.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getquotation() {
    return this.http.get<apiResultFormat>('assets/JSON/quotations.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getpaymentsummary() {
    return this.http.get<apiResultFormat>('assets/JSON/paymentsummary.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSubscribers() {
    return this.http.get<apiResultFormat>('assets/JSON/subscribers.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTransaction() {
    return this.http.get<apiResultFormat>('assets/JSON/transactions.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getrole() {
    return this.http.get<apiResultFormat>('assets/JSON/role.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getdeleteaccount() {
    return this.http.get<apiResultFormat>('assets/JSON/deleteaccount.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getUsers() {
    return this.http.get<apiResultFormat>('assets/JSON/user.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getaddpages() {
    return this.http.get<apiResultFormat>('assets/JSON/addpages.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getstates() {
    return this.http.get<apiResultFormat>('assets/JSON/states.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getblogcomments() {
    return this.http.get<apiResultFormat>('assets/JSON/blogcomments.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public sideBar = [];
  public getMenuItems()
  {
    this.api.get('menu_items.php?user_group=1').then((data: any) =>
    {
      this.sideBar = data;
      console.log("Menu Data : ", this.sideBar)
        return true;
    }).catch(error =>
    {
        console.log('Login Page : ', error);
    });
  }

  public getSideBarData: BehaviorSubject<Array<SideBarData>> = new BehaviorSubject<Array<SideBarData>>(this.sideBar);
}
