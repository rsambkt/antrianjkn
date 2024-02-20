$(function () {
    // Replace the <textarea id="editor1"> with a CKEditor
    // instance, using default configuration.
    // CKEDITOR.replace('editor1')
    //bootstrap WYSIHTML5 - text editor
	$('.tanggal').inputmask('yyyy-mm-dd', {
        'placeholder': 'yyyy-mm-dd'
    });
    $('.tanggal').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });
	$('.clockpicker').clockpicker();
    $('.textarea').wysihtml5()
	
  })
function simpanHasilPemeriksaanLabor(){
	var url;
    url = base_url + "laboratorium/permintaan/simpanhasil";
    var formData = new FormData($('#hasil')[0]);
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
                tampilkanPesan('success',data.message)
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
function simpanHasilPemeriksaanRadiologi(idx_detail){
	var url;
    url = base_url + "radiologi/permintaan/simpanhasil/"+idx_detail;
    var formData = new FormData($('#hasil')[0]);
    $.ajax({
        url : url,
        type: "POST",
        data : formData,
        processData: false,
        contentType: false,
        dataType: 'JSON',
        beforeSend: function() {
            // setting a timeout
            $('#btnsimpan'+idx_detail).prop("disabled",true);
            $('#iconsimpan'+idx_detail).removeClass('fa fa-save')
            $('#iconsimpan'+idx_detail).addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                tampilkanPesan('success',data.message)
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
            $('#btnsimpan'+idx_detail).prop("disabled",false);
            $('#iconsimpan'+idx_detail).removeClass('fa fa-spinner spin')
            $('#iconsimpan'+idx_detail).addClass('fa fa-save')
        },
        complete: function() {
            $('#btnsimpan'+idx_detail).prop("disabled",false);
            $('#iconsimpan'+idx_detail).removeClass('fa fa-spinner spin')
            $('#iconsimpan'+idx_detail).addClass('fa fa-save')
        }
    });
}
