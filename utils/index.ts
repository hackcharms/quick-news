import moment from 'moment';
import {countries} from "@/assets/coutries"

export function dateToHuman(date:Date|string):string|Date{
    try{
        // return new Intl.DateTimeFormat('en-US', {
        //     year: 'numeric', month: 'numeric', day: 'numeric',
        //         hour: 'numeric', minute: 'numeric', second: 'numeric',
        //         hour12: true,
        //         timeZone: 'Asia/Kolkata'
        // }).format(new Date(date));
        return moment(date).format('Do MMMM YYYY, h:mm:ss a');

    }catch($e){
        console.error($e);
        return date;
    }
}

export function getCountryCompleteName(countryCode:string):string{
    try{
        const country=countries.find(el=>el.code===countryCode)
        return country?.country??countryCode;
    }
    catch($e){
        console.error($e);
        return countryCode;
    }
}