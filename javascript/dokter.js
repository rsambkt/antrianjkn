function tambah(){
    $('#modal').modal('show');
    resetForm();
}
function resetForm(){
    $('#nrp').val("");
    $('#idruang').val("");
    $('#dokter').prop("checked",false);
}
function simpan(){
    var url;
    url = base_url + "admin/dokter/insert";
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
                getdokter(1)
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
            url: base_url + "admin/dokter/hapus/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if(data.status==true){
                    tampilkanPesan('success',data.message)
                    getdokter(1);
                }else{
                    tampilkanPesan('error',data.message)
                }
                
            },
            error: function (jqXHR, textdokter, errorThrown) {
                alert('Error')
            }
        });
    }
}
function edit(id) {
    $.ajax({
        url: base_url + "admin/dokter/edit/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getdokter(1);
            if(data.status==true){
                $('#modal').modal('show');
                $('#idx').val(data.data.id)
                $('#nrp').val(data.data.nrp)
                $('#idruang').val(data.data.idruang)
                if(data.data.dokter==1) $('#dokter').prop('checked',true);
                else $('#dokter').prop('checked',false);
            }else{
                tampilkanPesan('danger',data.message);
            }
        },
        error: function (jqXHR, textdokter, errorThrown) {
            alert('Error')
        }
    });
}