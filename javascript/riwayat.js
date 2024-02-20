$(document).ready(function() {
    // $(".inputmask").inputmask();
    $('input,textarea').focus(function() {
        return $(this).select();
    });
    
    $('.tanggal').inputmask('dd/mm/yyyy', {
        'placeholder': 'dd/mm/yyyy'
    });
    $('.tanggal').datepicker({
        autoclose: true,
        dateFormat: "dd/mm/yy"
    });
    // $('.datepicker').inputmask('yyyy-mm-dd', {
    //     'placeholder': 'yyyy-mm-dd'
    // });
    $('.datepicker').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });
    $('.select2').select2({
        placeholder: '------------ Pilih option ------------'
    });
    
});
function getRuang(){
	var jnsLayanan=$('#jnslayanan').val();
	var url = base_url+"rekammedis/pasien/ruangan/"+jnsLayanan;
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    :  {},
	    success : function(data){
	        if(data.status==true){
                var res=data.data;
                
                var option="<option value=''>Pilih Ruangan</option>";
                for (let i = 0; i < res.length; i++) {
                    const ele = res[i];
                    option+="<option value='"+ele.idx+"'>"+ele.ruang+"</option>";
                }
                $('#ruang').html(option);
                
            }
	    }
	});
}
