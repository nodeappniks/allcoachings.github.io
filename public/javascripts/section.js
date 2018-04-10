$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

$.post("/section", {
    id: $.urlParam('s').replace("_", " ")
}).done(function(data) {
    // console.log(data);
    $.each(data, function(key, val){
        var ids = val._id;
            ids = ids.replace(/ /g,'');
        $("#sectionDetail").append('<li><a href="/details?i='+ids+'" >'+val.name+'</a></li>');
    });
    
});