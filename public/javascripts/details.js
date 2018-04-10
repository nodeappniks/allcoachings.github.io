$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}
// console.log($.urlParam('i'));

$.post("/details", {
    id: $.urlParam('i')
}).done(function(data) {
    // console.log(data);
    $.each(data, function(ind, value){
        if($.urlParam('i') == value._id){
            $("#Heading").text(value.name);
            $("#by").text(value.director);
            $("#mobile").text(value.mobile);
           if(value.section == "New Batch"){
                $("#batch").text("New Batch");
           }else{
            $("#batch").text("Batch");
           }
            $("#email").text(value.mail);
            $("#web").text(value.web);
            $("#address").text(value.address);
            $("#tag").text("-- "+value.tag);
            var total = 0;
            if( value.time != null || value.time != "null" || value.time != "" ){
                $.each(value.time, function(key, val){
                    total++;
                     $("#displayTbody").append("<tr><td>"+ total +"</td><td>"+val.subject+"</td><td>"+val.start+" TO "+val.end+"</td><td>NA</td></tr>");
                });
            }
        }
    });


    $.post("/getRatings", {
        coachingId: $.urlParam('i')
    }).done(function(data) {
            //console.log(data);
            var total=0;
            var average;
            var sum = 0;;
            data =  data.reverse();
            $.each(data,function(key, value){
                if($.urlParam('i') == value.coachingId){
                    total++;
                    sum = sum + (+value.rating);
                    $("#rated").append("<div class='col-sm-12' id='review"+key+"' style='border: 1px solid #ccc;border-radius: 4px;background: #ddd;margin-top:10px' ></div>");
                    $("#review"+key).append("<div class='col-sm-1' id='imgDiv"+key+"' ></div><div class='col-sm-11' id='mainDiv"+key+"' ></div>");
                    $("#imgDiv"+key).append("<img src='http://www.clearcredentials.com/static/images/userlogin.png' style='height: 80px;margin-top: 15px;' >");
                    
                    $("#mainDiv"+key).append("<div class='col-sm-12' id='populateRatingGraph"+key+"' style='font-weight:bold'>");
                    $("#mainDiv"+key).append("<div class='col-sm-12' id='populateRating"+key+"' style='font-weight:bold'>");
                    $("#mainDiv"+key).append("<div class='col-sm-12' id='populateName"+key+"'></div>");
                    $("#mainDiv"+key).append("<div class='col-sm-12' id='populateComment"+key+"'></div>");

                    $("#populateRatingGraph"+key).append("<div class='rate' data-rate-value='"+value.rating+"' id='rating"+key+"' ></div>");
                    $("#populateRating"+key).append("<h5 style='font-weight:bold' >Rating:  "+value.rating+"</h5>");
                    $("#populateName"+key).append("<h5 style='font-weight:bold' >Name:  "+value.rateName+"</h5>");
                    $("#populateComment"+key).append("<h5 style='font-weight:bold;margin-bottom:20px' >Comment:  "+value.rateComment+"</h5>");
                }
            })

            average = sum/total;
            $("#total").text(total);
            $("#totalRating").text(average);
    });

    
    

    // $.each(data.time, function(key, val){
    //     $("#displayTbody").append("<tr><td>"+key+"</td><td>"+val.subject+"</td><td>"+val.start+" TO "+val.end+"</td></tr>");
    // })
    
});


function rateCoaching(){
    var rateName = $("#rateName").val();
    var rateComment = $("#rateComment").val();
    var rating = $(".rate").attr("data-rate-value");
    if(rateName == ""){
        alert("Please Enter Name");
        return false;
    }
    
    if(rateComment == ""){
        alert("Please Enter Comment");
        return false;
    }


    $.post("/rate", {
        rateName : rateName,
        rateComment : rateComment,
        rating: rating,
        coachingId: $.urlParam('i') 
    }).done(function(data) {
        if(data == "success"){
            window.location.href = "/details?i="+$.urlParam('i');
        }
        
    });
}



$(document).ready(function(){
    var options = {
        max_value: 6,
        step_size: 0.5,
        selected_symbol_type: 'hearts',
        url: 'http://localhost/test.php',
        initial_value: 3,
        update_input_field_name: $("#input2"),
    }
    $(".rate").rate();

    // $(".rate").rate("setFace", 5, 'ðŸ˜Š');
    // $(".rate").rate("setFace", 1, 'ðŸ˜’');

    $(".rate2").rate(options);

    $(".rate2").on("change", function(ev, data){
        console.log(data.from, data.to);
    });

    $(".rate2").on("updateError", function(ev, jxhr, msg, err){
        console.log("This is a custom error event");
    });

    $(".rate2").rate("setAdditionalData", {id: 42});
    $(".rate2").on("updateSuccess", function(ev, data){
        console.log(data);
    });

    var options3 = {
        selected_symbol_type: 'utf8_emoticons',
        max_value: 4,
        step_size: 1,
        convert_to_utf8: true,
        only_select_one_symbol: true,
    };
    $("#rate3").rate(options3);

    setTimeout(function(){
        $("#rate4").rate({
            selected_symbol_type: 'fontawesome_beer',
            max_value: 5,
            step_size: 0.25,
        });

        $("#rate6").rate({
            selected_symbol_type: 'fontawesome_star',
            max_value: 5,
            step_size: 0.25,
        });
    }, 2000);

    $("#rate5").rate({
        selected_symbol_type: 'image',
        max_value: 5,
        step_size: 1,
        symbols: {
            image: {
                base: '<div class="im">&nbsp;</div>',
                hover: '<div class="im">&nbsp;</div>',
                selected: '<div class="im">&nbsp;</div>',
            },
        }
    });

    $("#rate7").rate({
        selected_symbol_type: 'image2',
        max_value: 5,
        step_size: 1,
        update_input_field_name: $("#input1"),
        only_select_one_symbol: true,
        symbols:{
            image2: {
                base: ['<div style="background-image: url(\'./images/emoji1.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji2.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji3.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji4.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji5.png\');" class="im2">&nbsp;</div>',],
                hover: ['<div style="background-image: url(\'./images/emoji1.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji2.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji3.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji4.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji5.png\');" class="im2">&nbsp;</div>',],
                selected: ['<div style="background-image: url(\'./images/emoji1.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji2.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji3.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji4.png\');" class="im2">&nbsp;</div>',
                       '<div style="background-image: url(\'./images/emoji5.png\');" class="im2">&nbsp;</div>',],
            },
        },
    });

    $(".rate").attr("style","width: 187px;height: 45px;position: relative;cursor: default;user-select: none;font-size: 45px;");

$(".rate-base-layer").attr("style","width: 100%;height: 51px;overflow: hidden;position: absolute;top: 0px;display: block;white-space: nowrap;");

$(".rate-hover-layer").attr("style","width: 20%; height: 83px; overflow: hidden; position: absolute; top: 0px; display: none; white-space: nowrap; font-size: 45px;");



});


function openDisclaimer(){
    $("#disclaimer").click();
}


function openAbout(){
    $("#about").click();
}