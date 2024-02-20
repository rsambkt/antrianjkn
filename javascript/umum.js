$(document).ready(function() {
    $('.datepicker').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });
	getListRujukanKeluar();
});
function getListRujukanKeluar(){
	var tglMulai=$('#tglMulai').val();
	var tglSelesai=$('#tglSelesai').val()
	var url = base_url+"vclaim/rujukan/listrujukankeluar/"+tglMulai+"/"+tglSelesai;
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    :  {},
        beforeSend: function() {
            $('#getdata').html('<tr><td colspan="9">Sedang mencari data silahkan tunggu...</td></tr>');
        },
	    success : function(data){
	        if(data.metaData.code==200){
	            var histori    = data.response.list;
	            var jmlData=histori.length;
	            var table   = "";
	            //Create Tabel
				var no=0;
	            for(var i=0; i<jmlData;i++){
					no++;
					table+='<tr>'+
                        '<td>'+no+'</td>'+
                        '<td>'+histori[i].noRujukan+'</td>'+
                        '<td>'+histori[i].tglRujukan+'</td>'+
                        '<td>'+histori[i].jnsPelayanan+'</td>';
						table+='<td>'+histori[i].noSep+'</td>';
						table+='<td>'+histori[i].noKartu+'</td>'+
                        '<td>'+histori[i].nama+'</td>'+
                        '<td>'+histori[i].ppkDirujuk+'-'+histori[i].namaPpkDirujuk+'</td>'+
                        '<td><div class="btn-group"><a href="'+base_url+'vclaim/sep/detail/'+histori[i].noSep+'" class="btn btn-primary btn-sm" > <span class="fa fa-search"></span> Lihat Rujukan</a>'+
						'<button class="btn btn-danger btn-sm" type="button" onclick="batalRujukan(\''+histori[i].noRujukan+'\')">Batalkan Rujukan</button>'+
						'</div></td>'+
                    '</tr>';
	            }
				$('#getdata').html(table);
				// var faskes=$('#r-faskes').val();
	        }else{
				$('#getdata').html('<tr><td colspan="9">Tidak Ada Data</td></tr>');
				tampilkanPesan('warning',data.metaData.message)
			}
	    },
        error: function(xhr) { // if error occured
            tampilkanPesan('error',xhr.responseText);
            $('#btncari').prop('disabled',false);
            $('#iconcari').removeClass('fa-spinner fa-spin');
            $('#iconcari').addClass('fa-search');
            // $(placeholder).append(xhr.statusText + xhr.responseText);
            // $(placeholder).removeClass('loading');
        },
        complete: function() {
            $('#btncari').prop('disabled',false);
            $('#iconcari').removeClass('fa-spinner fa-spin');
            $('#iconcari').addClass('fa-search');
        },
	});
}
function batalRujukan(norujukan=""){
	
	swal({
		title: "Konfirmasi",
		text: 'Apakah anda yakin akan membatalkan No Rujukan ' + norujukan + '?',
		type: "warning",
		showCancelButton: true,
		confirmButtonText: "Ya",
		cancelButtonText: "Tidak",
		closeOnConfirm: true,
		closeOnCancel: true
	},
	function(isConfirm) {
		if (isConfirm) {
			var url = base_url+"vclaim/rujukan/hapus/"+norujukan;
			$.ajax({
				url     : url,
				type    : "GET",
				dataType: "json",
				data    :  {},
				success : function(data){
					//menghitung jumlah data
					//console.clear();
					//alert(param1 +" " +param2 + " " + param3);
					console.log(url);
					if(data.metaData.code==200){
						hapusRujukanLokal(norujukan);
						getListRujukanKeluar()
					}else{
						tampilkanPesan('warning',data.metaData.message)
						// hapusRujukanLokal(norujukan);
						// var poli=$('#txtnmpoli').val();
						// alert("Error saat pencarian data dokter "+ poli + ' karena ' +data.metaData.message)
					}
				}
			});
		}
	});

	

}
function hapusRujukanLokal(norujukan=""){
	if(norujukan=="") var norujukan= $('#r-noRujukan').val()

	var url = base_url+"vclaim/rujukan/hapuslokal/"+norujukan;
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    :  {},
	    success : function(data){
	        //menghitung jumlah data
			//console.clear();
			//alert(param1 +" " +param2 + " " + param3);
	        console.log(url);
	        if(data.metaData.code==200){
				// hapusRujukanLokal();
	            tampilkanPesan('success',data.metaData.message)
				// var faskes=$('#r-faskes').val();
	        }else{
				tampilkanPesan('warning',data.metaData.message)
				// var poli=$('#txtnmpoli').val();
				// alert("Error saat pencarian data dokter "+ poli + ' karena ' +data.metaData.message)
			}
	    }
	});

}
