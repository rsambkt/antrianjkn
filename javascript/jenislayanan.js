function tambah(){
    $('#modal').modal('show');
    resetForm();
}
function resetForm(){
    $('#idx').val("");
    $('#jenislayanan').val("");
    $('#kodejkn').val("");
    $('#aktif').prop('checked',false)
}
function simpan(){
    var url;
    url = base_url + "admin/jenislayanan/insert";
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
                getjenislayanan(1)
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
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
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
            url: base_url + "admin/jenislayanan/hapus/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if(data.status==true){
                    tampilkanPesan('success',data.message)
                    getjenislayanan(1);
                }else{
                    tampilkanPesan('error',data.message)
                }
                
            },
            error: function(xhr) { // if error occured
                $('#error').modal('show');
                $('#xhr').html(xhr.responseText)
            }
        });
    }
}
function edit(id) {
    $.ajax({
        url: base_url + "admin/jenislayanan/edit/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getjenislayanan(1);
            if(data.status==true){
                $('#modal').modal('show');
                $('#idx').val(data.data.idx)
                $('#jenislayanan').val(data.data.jenislayanan)
                $('#kodejkn').val(data.data.kodejkn)
                if(data.data.aktif==1) $('#aktif').prop('checked',true);
                else $('#aktif').prop('checked',false)
            }else{
                tampilkanPesan('danger',data.message);
            }
        },
		error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
        }
    });
}