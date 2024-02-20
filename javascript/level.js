function tambah(){
    $('#modal').modal('show');
    resetForm();
}
function resetForm(){
    $('#idx').val();
    $('#level').val();
}
function simpan(){
    var url;
    url = base_url + "admin/level/insert";
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
                getlevel(1)
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
            url: base_url + "admin/level/hapus/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if(data.status==true){
                    tampilkanPesan('success',data.message)
                    getlevel(1);
                }else{
                    tampilkanPesan('error',data.message)
                }
                
            },
            error: function (jqXHR, textlevel, errorThrown) {
                alert('Error')
            }
        });
    }
}
function edit(id) {
    $.ajax({
        url: base_url + "admin/level/edit/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getlevel(1);
            if(data.status==true){
                $('#modal').modal('show');
                $('#idx').val(data.data.idx)
                $('#level').val(data.data.level)
                if(data.data.status==1) $('#status').prop('checked',true);
                else $('#status').prop('checked',false);
                let text = data.data.modul_akses;
                const mod_array = text.split(","); 
                console.log(mod_array);
                $('.modul_akses').prop('checked',false);
                for (let index = 0; index < mod_array.length; index++) {
                    const element = mod_array[index];
                    
                    $('#modul_akses'+element).prop('checked',true);
                }
            }else{
                tampilkanPesan('danger',data.message);
            }
        },
        error: function (jqXHR, textlevel, errorThrown) {
            alert('Error')
        }
    });
}