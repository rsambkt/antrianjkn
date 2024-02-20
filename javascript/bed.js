function getTT(){
    var id_kamar = $('#id_kamar').val();
    var url = base_url+'admin/kamar/datatt/' + id_kamar;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='13'><b>Loading...</b></td></tr>";
            $('#datatt').html(tabel);
            $('#pagination').html('');
        },success : function(data){
            //menghitung jumlah data
            if(data["status"]==true){
                $('#datatt').html('');
                var res    = data["data"];
                var jmlData=res.length;
                var tabel   = "";
                //Create Tabel
                var no=0;
                for(var i=0; i<jmlData;i++){
                    no++;
                    var dis=(res[i]['id_daftar']!=null ? "disabled":"");
                    tabel="<tr>";
                    tabel+="<td>"+no+"</td>";
                    tabel+="<td>"+res[i]['namatt']+"</td>";
                    tabel+="<td>"+res[i]['statustt']+"</td>";
                    if(res[i]['id_daftar']==null) tabel+="<td><span class='btn btn-success btn-xs'>Kosong</span></td>";
                    else tabel+="<td><span class='btn btn-danger btn-xs'>Terisi</span></td>";
                    if(res[i]['publish']) tabel+="<td><span class='btn btn-success btn-xs'>Publish</span></td>";
                    else tabel+="<td><span class='btn btn-danger btn-xs'>Non Publish</span></td>";
                    tabel+=`<td>
                    <div class='btn-group'> 
                    <a href='#' class='btn btn-warning btn-xs'  onclick='edit(`+res[i]['idtt']+`)'><span class='fa fa-pencil'></span> Edit</a>
                    <button onclick='hapus(`+res[i]['idtt']+`,`+id_kamar+`)' class='btn btn-danger btn-xs' `+dis+`><span class='fa fa-trash'></span> Hapus</button>
                    </div>
                    </td>`;
                    tabel+="</tr>";
                    $('#datatt').append(tabel);
                }
                
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
getTT()
function tambah(){
    $('#modal').modal('show');
    resetForm();
}
function resetForm(){
    $('#idtt').val("");
    $('#kelas_id').val("");
    $('#namatt').val("");
    $('#statustt').prop('checked',false);
    $('#publish').prop('checked',false);
}
function simpan(){
    var url=base_url + "admin/kamar/inserttt";
    var statustt = $("#statustt").prop("checked");
    var publish = $("#publish").prop("checked");
    var st = (statustt==true ? 1:0);
    var p = (publish==true ? 1:0);
    var formData = {
        idtt:$('#idtt').val(),
        id_kamar:$('#id_kamar').val(),
        namatt:$('#namatt').val(),
        statustt: st,
        publish: p
    };
    $.ajax({
        url : url,
        type: "POST",
        data : formData,
        dataType: 'JSON',
        beforeSend: function() {
            // setting a timeout
            $('#btnsimpan').prop("disabled",true);
            $('#iconsimpan').removeClass('fa fa-save')
            $('#iconsimpan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                getTT()
                // tampilkanPesan('warning',data.message);
                var idkamar=$('#id_kamar').val();
                updateAplicare(idkamar);
                $('#modal').modal('hide');
            }
            else{
                swal({
                    title: "Peringatan",
                    text: data.message,
                    type: "warning",
                    timer: 5000
                });
            }
            
        },
        error: function(xhr) { // if error occured
            tampilkanPesan('error',xhr.statusText+' - '+xhr.responseText)
            $('#btnsimpan').prop("disabled",false);
            $('#iconsimpan').removeClass('fa fa-spinner spin')
            $('#iconsimpan').addClass('fa fa-save')
        },
        complete: function() {
            $('#btnsimpan').prop("disabled",false);
            $('#iconsimpan').removeClass('fa fa-spinner spin')
            $('#iconsimpan').addClass('fa fa-save')
        }
    });
}
function hapus(id,idkamar) {
    var isConfirm = confirm("Apakah anda yakin akan menghapus")
    if (isConfirm) {
        $.ajax({
            url: base_url + "admin/kamar/hapustt/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if(data.status==true){
                    // tampilkanPesan('success',data.message)
                    updateAplicare(idkamar);
                    getTT();
                }else{
                    tampilkanPesan('error',data.message)
                }
                
            },
            error: function (jqXHR, textruang, errorThrown) {
                alert('Error')
            }
        });
    }
}
function edit(id) {
    $.ajax({
        url: base_url + "admin/kamar/edittt/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getTT();
            if(data.status==true){
                $('#modal').modal('show');
                $('#idtt').val(data.data.idtt)
                $('#namatt').val(data.data.namatt)
                if(data.data.statustt==1) $('#statustt').prop('checked',true);
                else  $('#statustt').prop('checked',false)

                if(data.data.publish==1) $('#publish').prop('checked',true);
                else  $('#publish').prop('checked',false)
            }else{
                tampilkanPesan('danger',data.message);
            }
        },
        error: function (jqXHR, textruang, errorThrown) {
            alert('Error')
        }
    });
}
function simpanAplicare(kamarid) {
    $.ajax({
        url: base_url + "applicare/bed/create/" + kamarid,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getTT();
            if(data.metadata.code==1){
                getTT();
                tampilkanPesan('success',data.metadata.message);
            }else{
                tampilkanPesan('error',data.metadata.message);
            }
        },
        error: function (jqXHR, textruang, errorThrown) {
            alert('Error')
        }
    });
}
function updateAplicare(kamarid) {
    $.ajax({
        url: base_url + "applicare/bed/update/" + kamarid,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getTT();
            if(data.metadata.code==1){
                getTT();
                tampilkanPesan('success',data.metadata.message);
            }else{
                tampilkanPesan('error',data.metadata.message);
            }
        },
        error: function (jqXHR, textruang, errorThrown) {
            alert('Error')
        }
    });
}