$(document).ready(function() {
	
    $('.tanggal').inputmask('dd/mm/yyyy', {
        'placeholder': 'dd/mm/yyyy'
    });
    $('.tanggal').datepicker({
        autoclose: true,
        dateFormat: "dd/mm/yy"
    });
	
    $('.datepicker').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });

	$('.select2').select2({
        placeholder: '------------ Pilih option ------------'
    });	
	
});
function checkAll(){
	// alert("all")
    var checkall=$('#checkall').prop("checked");
	// alert(checkall)
	$('.obatid').prop("checked",checkall);
	if(checkall==true){
		$('.jumlah').prop("readonly",false);
	}else{
		$('.jumlah').prop("readonly",true);
	}
}
function aproveResep(){
    var url;
    url = base_url + "farmasi/resep/aprove";
    var formData = new FormData($('#aproveresep')[0]);
    $.ajax({
        url : url,
        type: "POST",
        data : formData,
        processData: false,
        contentType: false,
        dataType: 'JSON',
        beforeSend: function() {
            // setting a timeout
            $('#btnEtiket').prop("disabled",true);
            $('#iconEtiket').removeClass('fa fa-print')
            $('#iconEtiket').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                
                tampilkanPesan('success',data.message);
                // $('#modal').modal('hide');
				var idx=$('#idx_resep').val();
				var url=base_url+"farmasi/resep/etiket/"+idx
				window.open(url)
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
            $('#btnEtiket').prop("disabled",false);
            $('#iconEtiket').removeClass('fa fa-spinner spin')
            $('#iconEtiket').addClass('fa fa-print')
        },
        complete: function() {
            $('#btnEtiket').prop("disabled",false);
            $('#iconEtiket').removeClass('fa fa-spinner spin')
            $('#iconEtiket').addClass('fa fa-print')
        }
    });
}
