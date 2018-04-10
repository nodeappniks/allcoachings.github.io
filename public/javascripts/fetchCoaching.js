








function fetchAllCoaching(){
    $.post("/", {
    }).done(function(data) {
        // console.log(data);
        var totalupsc = 0;
        var totaltgt = 0;
        var totalssc = 0;
        var totalSSCJE = 0;
        var totalnew = 0;
        var totalother = 0;
        var totalboard = 0;
        var totaliit = 0;
        data = data.reverse();
        $.each(data, function(key, val){
            var ids = val._id;
            ids = ids.replace(/ /g,'');
            if((val.section == "UPSC/IAS/PCS") && (totalupsc < 10)){
                totalupsc++;
                $("#UPSCIASPCS").append('<li><a href="/details?i='+ids+'"  >'+val.name+'</a></li>');

            }
            if((val.section == "TGT/PGT/UGC") && (totaltgt < 10)){
                totaltgt++;
                $("#TGTPGTUGC").append('<li><a href="/details?i='+ids+'" >'+val.name+'</a></li>');
                
            }
            if((val.section == "SSC/BANK/RAILWAY/ALL") && (totalssc < 10)){
                totalssc++
                $("#SSCBANKRAILWAYALL").append('<li><a href="/details?i='+ids+'" >'+val.name+'</a></li>');
            }
            if((val.section == "SSCJE/AE") && (totalSSCJE < 10)){
                totalSSCJE++
                $("#SSCJEAE").append('<li><a href="/details?i='+ids+'" >'+val.name+'</a></li>');
            }
            if((val.section == "New Batch") && (totalnew < 10)){
                totalnew++;
                $("#NewBatch").append('<li><a href="/details?i='+ids+'" >'+val.name+'</a></li>');
            }
            if((val.section == "OTHER INDIVIDUAL") && (totalother < 10)){
                totalother++;
                $("#OTHERINDIVIDUAL").append('<li><a href="/details?i='+ids+'" >'+val.name+'</a></li>');
            }
            if((val.section == "IIT JEE/NEET") && (totaliit < 10)){
                totaliit++;
                $("#IITJEENEET").append('<li><a href="/details?i='+ids+'" >'+val.name+'</a></li>');
            }
            if((val.section == "BOARD 10/12") && (totalboard < 10)){
                totalboard++;
                $("#BOARD1012").append('<li><a href="/details?i='+ids+'" >'+val.name+'</a></li>');
            }

        });
    });



    var color = ["red", "pink", "blue", "orange", "purple", "green", "crimson", "#ff0066"];
    $.post("/newbatch", {
    }).done(function(data) {
        data = data.reverse();
        $.each(data,function(key,value){
            var ids = value._id;
            ids = ids.replace(/ /g,'');
            if(key<= color.length){
                $("#newBatch").append("<div class='col-sm-3' style='background:"+color[key]+";border:2px solid white;height:40px;height: 45px;color: white;text-align: center;' ><h5 style='margin-top: 14px;' ><a href='/details?i="+ids+"' style='color:white;margin-top:10px;font-weight: bold;' >"+value.name+"</a></h5></div>");
      
            }
              });
    });

    


}



// function sortingData(data){
//     data.sort(function(a, b) { 
//         return a.rate - b.id  ||  a.name.localeCompare(b.name);
//       });
// }


