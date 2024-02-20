function tambah(){
    $('#modal').modal('show');
    resetForm();
}
function resetForm(){
    $('#idx').val();
    $('#status').val();
}
function simpan(){
    var url;
    url = base_url + "admin/statuskawin/insert";
    var formData = new FormData($('#form')[0]);
    $.ajax({
        url : url,
        type: "POST",
        data : formData,
        processData: false,
        contentType: false,
        dataType: 'JSON',
        beforeSend: function() {
            // setting a timeout
            $('#btnsimpan').prop("disabled",true);
            $('#iconBuatrujukan').removeClass('fa fa-save')
            $('#iconBuatrujukan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                getstatuskawin(1)
                tampilkanPesan('warning',data.message);
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
            $('#iconBuatrujukan').removeClass('fa fa-spinner spin')
            $('#iconBuatrujukan').addClass('fa fa-save')
        },
        complete: function() {
            $('#btnsimpan').prop("disabled",false);
            $('#iconBuatrujukan').removeClass('fa fa-spinner spin')
            $('#iconBuatrujukan').addClass('fa fa-save')
        }
    });
}
function hapus(id) {
    var isConfirm = confirm("Apakah anda yakin akan menghapus")
    if (isConfirm) {
        $.ajax({
            url: base_url + "admin/statuskawin/hapus/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if(data.status==true){
                    tampilkanPesan('success',data.message)
                    getstatuskawin(1);
                }else{
                    tampilkanPesan('error',data.message)
                }
                
            },
            error: function (jqXHR, textstatuskawin, errorThrown) {
                alert('Error')
            }
        });
    }
}
function edit(id) {
    $.ajax({
        url: base_url + "admin/statuskawin/edit/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getstatuskawin(1);
            if(data.status==true){
                $('#modal').modal('show');
                $('#Id').val(data.data.Id)
                $('#status').val(data.data.status)
            }else{
                tampilkanPesan('danger',data.message);
            }
        },
        error: function (jqXHR, textstatuskawin, errorThrown) {
            alert('Error')
        }
    });
}