import moment from 'moment';
import {countries} from "@/assets/coutries"

export function dateToHuman(date:Date|string):string|Date{
    try{
        return moment(date).format('Do MMMM YYYY, h:mm:ss a');

    }catch($e){
        console.error($e);
        return date;
    }
}

export function getCountryCompleteName(countryCode:string):string{
    try{
        const country=countries.find(country=>country.code===countryCode)
        return country?.country??countryCode;
    }
    catch($e){
        console.error($e);
        return countryCode;
    }
}

/**
 * how can we write docsblock and how to implemet typing for this method
 * as intellisence is only showing params and return for first method only and no details for rest;
 * @param matchKey()()()
 * @returns Function
 */
export const getCountry:Function=(matchKey:"code"|"country"):Function=>(matchValue:string):Function=>(getValue:"code"|"country"):string=>{
   try{
        const country=countries.find((country=>country[matchKey]===matchValue));
        return country?.[getValue]??matchValue;
    }
    catch($e){
        console.error($e);
        return matchValue;
    }
  }

  