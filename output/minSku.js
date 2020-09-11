const fs=require("fs");
const csvtojson=require("csvtojson");
const ObjectsToCsv = require('objects-to-csv');
const dirfile = "filteredCountry.csv";
const converter = require('json-2-csv');

var obj=[],flag=true;

csvtojson()
.fromFile(dirfile)
.then((jsonObj)=>{

for(let i=0; i<jsonObj.length;i++){
    var objSku ={
        SKU:0,
        fMin:0,
        sMin:0
    }
    for(var j=i+1;j<jsonObj.length-1;j++){

        if(flag){
        if(jsonObj[i].SKU==jsonObj[j].SKU){
            
            objSku.SKU=jsonObj[i].SKU;
            objSku.fMin=jsonObj[i].PRICE;
            objSku.sMin=jsonObj[j].PRICE;
            obj.push(objSku);
            
            flag=false;
            break;

        }
        else{
            objSku.SKU=jsonObj[i].SKU;
            objSku.fMin=jsonObj[i].PRICE;
            objSku.sMin=jsonObj[i].PRICE;
            obj.push(objSku);
            flag=true;
            break;
        }
        break;
    }
    if(jsonObj[i].SKU!=jsonObj[j].SKU){
        flag=true;
        break;
    }
}
    i=j-1;
    
       
}
converter.json2csv(obj, (err, csv) => {
    if (err) {
        throw err;
    }else{
      fs.writeFile("minimumSku.csv",csv,(err)=>{
        if(err){
          console.log(err.code);
        }else{
          console.log("csv file written");
        }
      })
    }
});
});