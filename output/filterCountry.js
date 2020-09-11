const converter = require('json-2-csv');
const fs=require("fs");
const csvtojson=require("csvtojson");
const ObjectsToCsv = require('objects-to-csv');
const dirfile = "main.csv";

var obj=[],j=0;

csvtojson()
.fromFile(dirfile)
.then((jsonObj)=>{
    
  for(let i=0;i<jsonObj.length;i++){
    
    let str = jsonObj[i].COUNTRY;
    let res=str.match(/USA/);
    if(res){
       obj[j]=jsonObj[i];
       j++
      }
  }      

  
  converter.json2csv(obj, (err, csv) => {
    if (err) {
        throw err;
    }else{
      fs.writeFile("filteredCountry.csv",csv,(err)=>{
        if(err){
          console.log(err.code);
        }else{
          console.log("csv file written");
        }
      })
    }
});
});


