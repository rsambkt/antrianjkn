
$(document).ready(function() {
    // $(".inputmask").inputmask();
    $('input,textarea').focus(function() {
        return $(this).select();
    });
    
    // $('.tanggal').inputmask('dd/mm/yyyy', {
    //     'placeholder': 'dd/mm/yyyy'
    // });
    // $('.tanggal').datepicker({
    //     autoclose: true,
    //     format: "dd/mm/yyyy"
    // });
    $('.datepicker').inputmask('yyyy-mm-dd', {
        'placeholder': 'yyyy-mm-dd'
    });
    $('.datepicker').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });
    
});
function tambah(){
    $('#modal').modal('show');
    resetForm();
}
function resetForm(){
    $('#nrp').val("");
    $('#nip').val("");
    $('#pgwNama').val("");
    $('#pgwJenkel').val("");
    $('#pgwTmpLahir').val("");
    $('#pgwTglLahir').val("");
    $('#pgwAgama').val("");
    $('#pgwtelp').val("");
    $('#profId').val("");
}
function simpan(){
    var url;
    url = base_url + "admin/pegawai/insert";
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
                getpegawai(1)
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
            url: base_url + "admin/pegawai/hapus/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if(data.status==true){
                    tampilkanPesan('success',data.message)
                    getpegawai(1);
                }else{
                    tampilkanPesan('error',data.message)
                }
                
            },
            error: function (jqXHR, textpegawai, errorThrown) {
                alert('Error')
            }
        });
    }
}
function edit(id) {
    $.ajax({
        url: base_url + "admin/pegawai/edit/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getpegawai(1);
            if(data.status==true){
                $('#modal').modal('show');
                $('#nrp').val(data.data.nrp)
                $('#nip').val(data.data.nip)
                $('#pgwNama').val(data.data.pgwNama)
                $('#pgwJenkel').val(data.data.pgwJenkel)
                $('#pgwTmpLahir').val(data.data.pgwTmpLahir)
                $('#pgwTglLahir').val(data.data.pgwTglLahir)
                $('#pgwAgama').val(data.data.pgwAgama)
                $('#pgwAlmt').val(data.data.pgwAlmt)
                $('#pgwTelp').val(data.data.pgwTelp)
                $('#profId').val(data.data.profId)
            }else{
                tampilkanPesan('danger',data.message);
            }
        },
        error: function (jqXHR, textpegawai, errorThrown) {
            alert('Error')
        }
    });
}
