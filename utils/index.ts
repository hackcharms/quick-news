export function dateToHuman(date:Date|string):string|Date{
    try{
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: true,
                timeZone: 'Asia/Kolkata'
        }).format(new Date(date));

    }catch($e){
        console.error($e);
        return date;
    }
}