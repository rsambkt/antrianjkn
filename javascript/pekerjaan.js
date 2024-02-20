function tambah(){
    $('#modal').modal('show');
    resetForm();
}
function resetForm(){
    $('#pekerjaan_id').val();
    $('#pekerjaan_nama').val();
}
function simpan(){
    var url;
    url = base_url + "admin/pekerjaan/insert";
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
            $('#iconsimpan').removeClass('fa fa-save')
            $('#iconsimpan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                getpekerjaan(1)
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
function hapus(id) {
    var isConfirm = confirm("Apakah anda yakin akan menghapus")
    if (isConfirm) {
        $.ajax({
            url: base_url + "admin/pekerjaan/hapus/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if(data.status==true){
                    tampilkanPesan('success',data.message)
                    getpekerjaan(1);
                }else{
                    tampilkanPesan('error',data.message)
                }
                
            },
            error: function (jqXHR, textpekerjaan, errorThrown) {
                alert('Error')
            }
        });
    }
}
function edit(id) {
    $.ajax({
        url: base_url + "admin/pekerjaan/edit/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getpekerjaan(1);
            if(data.status==true){
                $('#modal').modal('show');
                $('#pekerjaan_id').val(data.data.pekerjaan_id)
                $('#pekerjaan_nama').val(data.data.pekerjaan_nama)
            }else{
                tampilkanPesan('danger',data.message);
            }
        },
        error: function (jqXHR, textpekerjaan, errorThrown) {
            alert('Error')
        }
    });
}