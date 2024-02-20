$(document).ready(function() {
    // $(".inputmask").inputmask();
    $('input,textarea').focus(function() {
        return $(this).select();
    });
    
    $('.tanggal').inputmask('yyyy-mm-dd', {
        'placeholder': 'yyyy-mm-dd'
    });
    $('.tanggal').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });
    $('.datepicker').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });
	getListAntrian();
});
function lihatTask(kodebooking){
    var url = base_url+"jkn/antrean/listtask/"+kodebooking;
	$.ajax({
		url     : url,
		type    : "GET",
		dataType: "json",
		data    : {},
        beforeSend: function() {
            // setting a timeout
            // $('#detailjadwal'+hari).html('<tr><td colspan="5"><span class="fa fa-spinner fa-spin"></span> Menunggu...</td></tr>');
        },
		success : function(data){
		    //menghitung jumlah data
		    console.clear();
		    if(data.metadata.code==200){
		        var task=data.response;
				var table="";
				for (let i = 0; i < task.length; i++) {
					const e = task[i];
					table+=`<tr>
					<td>`+e.taskname+`</td>
					<td>`+e.wakturs+`</td>
					<td>`+e.waktu+`</td>
				</tr>`;
				}
				$('#listtask').html(table);
		        $('#tasklist').modal('show');
		    }else{
				$('#tasklist').modal('show');
                var tabel="<tr><td colspan='5'>"+data.metadata.message+"</td></tr>";
                $('#listtask').html(tabel);
            }
		}
	});
}
function getListAntrian(){
	var tanggal=$('#tanggal').val();
    var url = base_url+"jkn/antrean/dataantrian";
	$.ajax({
		url     : url,
		type    : "GET",
		dataType: "json",
		data    : {tanggal:tanggal},
        beforeSend: function() {
            // setting a timeout
            // $('#detailjadwal'+hari).html('<tr><td colspan="5"><span class="fa fa-spinner fa-spin"></span> Menunggu...</td></tr>');
        },
		success : function(data){
		    //menghitung jumlah data
		    console.clear();
		    if(data.metadata.code==200){
		        var task=data.response;
				var table="";
				var no=0;
				for (let i = 0; i < task.length; i++) {
					no++;
					const e = task[i];
					if(e.status=='Selesai dilayani') var cl="btn-success";
					else if(e.status=='Sedang dilayani') var cl='btn-warning';
					else  var cl='btn-danger'
					table+=`<tr>
					<td>`+no+`</td>
					<td>`+e.tanggal+`</td>
					<td>`+e.jeniskunjungan+`</td>
					<td>`+e.nomorreferensi+`</td>
					<td>`+e.kodebooking+`</td>
					<td>`+e.norekammedis+`</td>
					<td>`+e.nik+`</td>
					<td>`+e.nokapst+`</td>
					<td>`+e.nohp+`</td>
					<td>`+e.kodepoli+`</td>
					<td>`+e.jampraktek+`</td>
					<td>`+e.sumberdata+`</td>
					<td>`+e.noantrean+`</td>
					<td>`+e.status+`</td>
					
				</tr>`;
				var boton=`<td style="width:200px">
					<div class="btn-group">
					<button class='btn btn-primary btn-sm' onclick="lihatTask('`+e.kodebooking+`')"><span class='fa fa-search'></span> Lihat Task</button>
					<button class='btn btn-danger btn-sm' onclick="batalAntrean('`+e.kodebooking+`')"><span class='fa fa-remove'></span> Batal</button>
					</div>
				</td>`;
				}
				$('#vdataantrian').html(table);
		    }else{
                tabel+="<tr><td colspan='15'>"+data.metadata.message+"</td></tr>";
                $('#vdataantrian').html(tabel);
            }
		}
	});
}

function batalAntrean(kodebooking){
	// alert("Batalkan antrean")
    // $('#modalbatalantrean').modal('show');
    // var kodebooking=$('#kodebooking').val();
    // var id_daftar=$('#id_daftar').val();
    // var reg_unit=$('#reg_unit').val();
    // $('#btlkodebooking').val(kodebooking);
    // $('#btlid_daftar').val(id_daftar);
    // $('#btlreg_unit').val(reg_unit);
	swal({
		title: "Konfirmasi",
		text: "Apakah anda yakin akan mebatalkan antrian!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Ya Saya Yakin!',
		cancelButtonText: "Tidak, Batalkan!",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm){
		if (isConfirm){
			var postData = {}
			var url=base_url+"jkn/booking/updatetask/"+kodebooking+"/"+99;
			$.ajax({
				url: url,
				type: "GET",
				data: postData,
				dataType: 'JSON',
				beforeSend: function () {
					// setting a timeout
					$('#btnBatal').prop("disabled",true);
					$('#iconBatal').removeClass('fa fa-remove')
					$('#iconBatal').addClass('fa fa-spinner fa-spin')
				},
				beforeSend: function () {
					// setting a timeout
					$('#btnBatal').prop("disabled",true);
					$('#iconbatal').removeClass('fa fa-remove')
					$('#iconbatal').addClass('fa fa-spinner fa-spin')
				},
				success: function (data) {
					if(data.metadata.code==200){
						// location.reload(); 
						tampilkanPesan('success',data.metadata.message,'Berhasil');
						
						getLastAntrean();
						
					}else{
						tampilkanPesan('warning',data.metadata.message,'info');
					}
				},
				error: function(xhr) { // if error occured
					$('#btnBatal').prop("disabled",false);
					$('#iconbatal').removeClass('fa fa-spinner fa-spin')
					$('#iconbatal').addClass('fa fa-remove');
				},
				complete: function() {
					$('#btnBatal').prop("disabled",false);
					$('#iconbatal').removeClass('fa fa-spinner fa-spin')
					$('#iconbatal').addClass('fa fa-remove')
				},
			});
		} else {
			tampilkanPesan('warning','Ok')
		}
	 });
		
}
