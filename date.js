var moment = require('moment')

let t1 =  moment("Febuari 12, 2019", "MMMM D, YYYY").format(); 
console.log(t1 + '\n')

let t2 =  moment("Monday, 15 Februari 2021 09:38", "dddd, D MMMM YYYY HH:mm").format(); 
console.log(t2 + '\n')

let t3 =  moment("2019 Mar 12", "YYYY MMM D").format(); 
console.log(t3 + '\n')

let t4 =  moment("1 Januari 1999", "D MMMM YYYY").format(); 
console.log(t4 + '\n')