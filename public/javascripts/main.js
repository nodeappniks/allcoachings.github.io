var room = 1;
var arrId = [];
var jsonWar = {"name":"Nitish","director":"sdfsdf","mobile":"456456","mail":"asdasd@asd.vg","section":"location","address":"sdfsdf","time":[{"start":"2.30","end":"3.30"},{"start":"4.30","end":"5.30"},{"start":"6.30","end":"7.30"}]}

function education_fields() {
 
    room++;
    var objTo = document.getElementById('education_fields')
    var divtest = document.createElement("div");
	divtest.setAttribute("class", "form-group removeclass"+room);
	var rdiv = 'removeclass'+room;
    divtest.innerHTML = '<div class="cols-sm-12"><div class="col-sm-5 nopadding"><div class="form-group"><input type="text" class="form-control" id="subject'+room+'" name="Major[]" value="" placeholder="Subject"></div></div><div class="col-sm-2 nopadding"><div class="form-group"><input type="text" class="form-control" id="start'+room+'" name="Major[]" value="" placeholder="Start"></div></div><div class="col-sm-2 nopadding"><div class="form-group"><input type="text" class="form-control" id="end'+room+'" name="Major[]" value="" placeholder="End"></div></div> <button class="btn btn-danger" type="button" onclick="remove_education_fields('+ room +');"> <span class="glyphicon glyphicon-minus" aria-hidden="true"></span> </button></div></div></div></div><div class="clear"></div>';
    var id = room; 
    arrId.push(id);
    // console.log(arrId);
    objTo.appendChild(divtest)
}
   function remove_education_fields(rid) {
       $('.removeclass'+rid).remove();
       arrId = jQuery.grep(arrId, function(value) {
        return value != rid;
      });
    //   console.log(arrId);
   }

function getValues(){
    var name = $("#name").val();
    var director = $("#director").val();
    var mobile = $("#mobile").val();
    var mail = $("#mail").val();
    var section = $("#section").val();
    var address = $("#address").val();
    var teacher = $("#teacher").val();
    var web = $("#web").val();
    var tag = $("#tag").val();
    if(name == ""){
        alert("Please Enter Coaching name");
        return false;
    }

    if(director == ""){
        alert("Please Enter Director name");
        return false;
    }

    if(section == ""){
        alert("Please Select section ");
        return false;
    }

    if(mobile == ""){
        alert("Please Enter mobile ");
        return false;
    }

    if(address == ""){
        alert("Please Enter address ");
        return false;
    }


    if(teacher == ""){
        teacher = "NA"
    }
    if(web == ""){
        web = "NA"
    }
    if(mail == ""){
        mail = "NA"
    }
    if(tag == ""){
        tag = ""
    }

    
    var time = [];
    var jsonObj = {};
    var jsonObjArr = [];

    var objTime = {};
    objTime["subject"] = $("#subject1").val();
    objTime["start"] = $("#start1").val();
    objTime["end"] = $("#end1").val();
    time.push(objTime);

    $.each(arrId, function(key, val){
        var objTime = {};
        objTime["subject"] = $("#subject"+val).val();
        objTime["start"] = $("#start"+val).val();
        objTime["end"] = $("#end"+val).val();
        time.push(objTime);
    });
    


    jsonObj["name"] = name;
    jsonObj["director"] = director;
    jsonObj["mobile"] = mobile;
    jsonObj["mail"] = mail;
    jsonObj["section"] = section;
    jsonObj["address"] = address;
    jsonObj["time"] = time;
    jsonObj["teacher"] = time;
    
    jsonObjArr.push(jsonObj);

    $.post("/coaching", {
        name: name,
        director: director,
        mobile: mobile,
        mail: mail,
        section: section,
        address: address,
        teacher: teacher,
        web: web,
        tag: tag,
        time: JSON.stringify(time)
    }).done(function(data) {
       // if(data);
        // window.location.href = "/dashboard";
        if(data == "saved"){
            window.location.href = "/dashboard";
        }else{
            alert("Data not saved");
        }
    });

    // console.log(JSON.stringify(jsonObjArr));


}


