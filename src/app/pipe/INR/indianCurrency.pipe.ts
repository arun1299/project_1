/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'indianCurrency'})
export class IndianCurrency implements PipeTransform {
  transform(value: number, args: string[]): any {

        if (! isNaN(value)) {
            // eslint-disable-next-line no-var
            var currencySymbol = '₹';
            var result = value.toString().split('.');

            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

            if (result.length > 1) {
                output += "." + result[1];
            }

            return currencySymbol + output;
        }

  }
}


