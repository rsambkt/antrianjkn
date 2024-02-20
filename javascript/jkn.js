function ceknikbpjs(pesan = 0) {

	console.log(url);
	// alert(alert)
	var nik = $("#u_nik").val();

	var tgllayanan = $('#u_sekarang').val();
	var url = base_url + "/vclaim/peserta/nik/" + nik + "/" + tgllayanan;
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			get_param: 'value'
		},
		success: function (data) {
			console.log(data);
			if (data.metaData.code == 200) {
				var x = data["response"];
				$('#u_no_bpjs').val(x.peserta.noKartu);
				$('#u_nama').val(x.peserta.nama);
				$('#u_no_telpon').val(x.peserta.mr.noTelepon);
				if (x.peserta.sex == 'P') {
					$("#pgwWanita").prop("checked", true);
				} else {
					$("#pgwPria").prop("checked", true);
				}
				$('#u_id_jenis_peserta').val("2." + x.peserta.jenisPeserta.kode);
				$('#u_jenis_peserta').val(x.peserta.jenisPeserta.keterangan);
				
				$('#u_kodeppk').val(x.peserta.provUmum.kdProvider);
				$('#u_namappk').val(x.peserta.provUmum.nmProvider);
				

				$('#u_e-id_jenis_peserta').val("2." + x.peserta.jenisPeserta.kode);
				$('#u_e-jenis_peserta').val(x.peserta.jenisPeserta.keterangan);
				$('#u_e-kodeppk').val(x.peserta.provUmum.kdProvider);
				$('#u_e-namappk').val(x.peserta.provUmum.nmProvider);
				var tgllahir = x.peserta.tglLahir;
				var tgl = tgllahir.split("-");
				$('#u_tgl_lahir').val(tgl[2] + "-" + tgl[1] + "-" + tgl[0]);
				// if (x.peserta.statusPeserta.kode == 0) $('#u_status').html('<a id="cekStatus" href="Javascript:cekPeserta()"><i class="fa fa-check">' + x.peserta.statusPeserta.keterangan + '</a>');
				// else $('#u_status').html('<a id="cekStatus" href="Javascript:cekPeserta()"><i class="fa fa-remove">' + x.peserta.statusPeserta.keterangan + '</a>');
				$('.statusjkn').html(x.peserta.statusPeserta.keterangan);
				if(pesan==1) tampilkanPesan('success', x.peserta.statusPeserta.keterangan);
				$('#u_tempat_lahir').focus();
			} else {
				$('#u_no_bpjs').focus();
				if (pesan == 1) tampilkanPesan('warning', data.metaData.message);
			}
		}
	});

}

function ceknomorbpjs(pesan = 0) {
	
	var nobpjs = $("#no_bpjs").val();
	var tgllayanan = $('#u_sekarang').val();
	var url = base_url + "/vclaim/peserta/nokartu/"+nobpjs+"/"+tgllayanan;
	console.log(url);
	// tampilkanPesan('warning',tgllayanan);
	$.ajax({
		url: url,
		type: "POST",
		dataType: "json",
		data: {
			param1: nobpjs,
			param2: tgllayanan
		},
		success: function (data) {
			console.log(data);
			if (data.metaData.code == 200) {
				var x = data["response"];
				$('#u_nik').val(x.peserta.nik);
				$('#u_nama').val(x.peserta.nama);
				$('#u_no_telpon').val(x.peserta.mr.noTelepon);
				if (x.peserta.sex == 'P') {
					var jekel=2;
				} else {
					var jekel=1;
				}
                $('#jns_kelamin').val(jekel)
				var tgllahir = x.peserta.tglLahir;
				var tgl = tgllahir.split("-");
				$('#u_tgl_lahir').val(tgl[2] + "-" + tgl[1] + "-" + tgl[0]);
				$('.statusjkn').html(x.peserta.statusPeserta.keterangan);
				$('#u_id_jenis_peserta').val(x.peserta.jenisPeserta.kode)
				$('#u_jenis_peserta').val(x.peserta.jenisPeserta.keterangan)
				$('#u_kodeppk').val(x.peserta.provUmum.kdProvider)
				$('#u_namappk').val(x.peserta.provUmum.nmProvider)
				$('#u_tempat_lahir').focus();
			} else {
				$('#u_no_bpjs').focus();
				if (pesan == 1) tampilkanPesan('warning', data.metaData.message);
			}
		}
	});

}
function getPoli(){
    var start = 0;
	var url = base_url+"jkn/mobile/poli";
	$.ajax({
		url     : url,
		type    : "GET",
		dataType: "json",
		data    : {get_param : 'value'},
        beforeSend: function() {
            // setting a timeout
            $('#getdata').html('<tr><td colspan="5"><span class="fa fa-spinner fa-spin"></span> Menunggu...</td></tr>');
        },
		success : function(data){
		    //menghitung jumlah data
		    console.clear();
		    if(data.metadata.code==1){
		        var poli    = data.response;
		        // console.log(barang);
		        var jmlData=poli.length;
		        
		        var tabel   = "";
		        //Create Tabel
		        if(jmlData>0){
		        	for(var i=0; i<jmlData;i++){
			            start++;
                        if(poli[i].kdpoli!=poli[i].kdsubspesialis || poli[i].kdsubspesialis=='007') {
                            var bg='';
                            var dis='disabled';
                        }else {
                            var bg='';
                            var dis='';
                        }

			            tabel+='<tr class="'+bg+'">';
			            
                        tabel+="<td>"+start+"</td>";
                        tabel+="<td>"+poli[i].kdpoli+"</td>";
                        tabel+="<td>"+poli[i].nmpoli+"</td>";
                        tabel+="<td>"+poli[i].kdsubspesialis+"</td>";
                        tabel+="<td>";
                        tabel+=poli[i].nmsubspesialis;
                        tabel+="</td>";
                        tabel+="<td>";
                        tabel+="<button class='btn btn-primary btn-sm' "+dis+" onclick='openJadwal("+start+",\""+poli[i].kdsubspesialis+"\")'><span class='fa fa-search'></span> Lihat Jadwal</button>";
                        tabel+="</td>";
                        tabel+="</tr>";
                        tabel+='<tr style="display:none;" class="baris" id="baris'+start+'"><td colspan="6" id="detail'+start+'">'+
                        '<ul class="nav nav-tabs">'+
                            '<li class="active"><a data-toggle="tab" href="#senin'+start+'" onclick="getJadwal('+start+',\''+poli[i].kdsubspesialis+'\',\'2022-04-18\',1)" >Senin</a></li>'+
                            '<li><a data-toggle="tab" href="#selasa'+start+'" onclick="getJadwal('+start+',\''+poli[i].kdsubspesialis+'\',\'2022-04-19\',2)">Selasa</a></li>'+
                            '<li><a data-toggle="tab" href="#rabu'+start+'" onclick="getJadwal('+start+',\''+poli[i].kdsubspesialis+'\',\'2022-04-20\',3)">Rabu</a></li>'+
                            '<li><a data-toggle="tab" href="#kamis'+start+'" onclick="getJadwal('+start+',\''+poli[i].kdsubspesialis+'\',\'2022-04-21\',4)">Kamis</a></li>'+
                            '<li><a data-toggle="tab" href="#jumat'+start+'" onclick="getJadwal('+start+',\''+poli[i].kdsubspesialis+'\',\'2022-04-22\',5)">Jumat</a></li>'+
                            '<li><a data-toggle="tab" href="#sabtu'+start+'" onclick="getJadwal('+start+',\''+poli[i].kdsubspesialis+'\',\'2022-04-23\',6)">Sabtu</a></li>'+
                            '<li><a data-toggle="tab" href="#minggu'+start+'" onclick="getJadwal('+start+',\''+poli[i].kdsubspesialis+'\',\'2022-04-17\',7)">Minggu</a></li>'+
                        '</ul>'+
                        '<div class="tab-content">'+
                            '<div id="senin'+start+'" class="tab-pane fade in active">'+
                            '<table class="table">'+
                            '<thead class="bg-blue"><tr><td>Nama Dokter</td><td>Jam</td><td>Quota</td><td>Libur</td></tr></thead>'+
                            '<tbody id="detailjadwal'+start+'1"></tbody>'+
                            '</table>'+
                            '</div>'+
                            '<div id="selasa'+start+'" class="tab-pane fade">'+
                            '<table class="table">'+
                            '<thead class="bg-blue"><tr><td>Nama Dokter</td><td>Jam</td><td>Quota</td><td>Libur</td></tr></thead>'+
                            '<tbody id="detailjadwal'+start+'2"></tbody>'+
                            '</table>'+
                            '</div>'+
                            '<div id="rabu'+start+'" class="tab-pane fade">'+
                            '<table class="table">'+
                            '<thead class="bg-blue"><tr><td>Nama Dokter</td><td>Jam</td><td>Quota</td><td>Libur</td></tr></thead>'+
                            '<tbody id="detailjadwal'+start+'3"></tbody>'+
                            '</table>'+
                            '</div>'+
                            '<div id="kamis'+start+'" class="tab-pane fade">'+
                            '<table class="table">'+
                            '<thead class="bg-blue"><tr><td>Nama Dokter</td><td>Jam</td><td>Quota</td><td>Libur</td></tr></thead>'+
                            '<tbody id="detailjadwal'+start+'4"></tbody>'+
                            '</table>'+
                            '</div>'+
                            '<div id="jumat'+start+'" class="tab-pane fade">'+
                            '<table class="table">'+
                            '<thead class="bg-blue"><tr><td>Nama Dokter</td><td>Jam</td><td>Quota</td><td>Libur</td></tr></thead>'+
                            '<tbody id="detailjadwal'+start+'5"></tbody>'+
                            '</table>'+
                            '</div>'+
                            '<div id="sabtu'+start+'" class="tab-pane fade">'+
                            '<table class="table">'+
                            '<thead class="bg-blue"><tr><td>Nama Dokter</td><td>Jam</td><td>Quota</td><td>Libur</td></tr></thead>'+
                            '<tbody id="detailjadwal'+start+'6"></tbody>'+
                            '</table>'+
                            '</div>'+
                            '<div id="minggu'+start+'" class="tab-pane fade">'+
                            '<table class="table">'+
                            '<thead class="bg-blue"><tr><td>Nama Dokter</td><td>Jam</td><td>Quota</td><td>Libur</td></tr></thead>'+
                            '<tbody id="detailjadwal'+start+'7"></tbody>'+
                            '</table>'+
                            '</div>'+
                        '</div>'+
                        '</td></tr>';
			            //console.log(tabel);
			        }
		        }else{
		        	tabel+="<tr><td colspan='6'>Data Tidak ada</td></tr>"
		        }
		        
		        $('#getdata').html(tabel);
		        
		    }else{
                $('#getdata').html("<tr><td colspan='6'>"+data.metadata.message+"</td></tr>");
            }
		}
	});
}

function getDokter(){
    var start = 0;
	var url = base_url+"jkn/mobile/dokter";
	$.ajax({
		url     : url,
		type    : "GET",
		dataType: "json",
		data    : {get_param : 'value'},
        beforeSend: function() {
            // setting a timeout
            $('#getdata').html('<tr><td colspan="4"><span class="fa fa-spinner fa-spin"></span> Menunggu...</td></tr>');
        },
		success : function(data){
		    //menghitung jumlah data
		    console.clear();
		    if(data.metadata.code==1){
		        var poli    = data.response;
		        // console.log(barang);
		        var jmlData=poli.length;
		        
		        var tabel   = "";
		        //Create Tabel
		        if(jmlData>0){
		        	for(var i=0; i<jmlData;i++){
			            start++;
			            tabel+='<tr>';
			           	tabel+="<td>"+start+"</td>";
                        tabel+="<td>"+poli[i].kodedokter+"</td>";
			            tabel+="<td>"+poli[i].namadokter+"</td>";
			            tabel+="</tr>";
			            //console.log(tabel);
			        }
		        }else{
		        	tabel+="<tr><td colspan='3'>Data Tidak ada</td></tr>"
		        }
		        
		        $('#getdata').html(tabel);
		        
		    }else{
                $('#getdata').html("<tr><td colspan='3'>"+data.metadata.message+"</td></tr>");
            }
		}
	});
}


function openJadwal(no,kodepoli){
    $('.baris').hide();
    $('#baris'+no).show();
    getJadwal('2022-04-18',1)
}
function lihatJadwal(kdpoli,kdsubspesialis){
    $('#kdsubspesialis').val(kdsubspesialis);
    $('#kdpoli').val(kdpoli)
    $('#modaljadwal').modal('show');
    // getJadwal('2022-04-18',1)
}
function getJadwal(tgl,hari){
    var kdpoli=$('#kdpoli').val();
    var url = base_url+"jkn/mobile/jadwaldokter";
	$.ajax({
		url     : url,
		type    : "GET",
		dataType: "json",
		data    : {poli : kdpoli, tgl: tgl},
        beforeSend: function() {
            // setting a timeout
            $('#detailjadwal'+hari).html('<tr><td colspan="5"><span class="fa fa-spinner fa-spin"></span> Menunggu...</td></tr>');
        },
		success : function(data){
		    //menghitung jumlah data
		    console.clear();
		    if(data.metadata.code==200){
		        var jadwal    = data.response;
		        console.log(jadwal);
		        var jmlData=jadwal.length;
		        var start=0;
		        var tabel   = "";
		        //Create Tabel
		        if(jmlData>0){
		        	for(var i=0; i<jmlData;i++){
			            start++;
			            tabel+='<tr>';
			           	tabel+="<td>"+jadwal[i].kodedokter+' - '+jadwal[i].namadokter+"</td>";
			           	tabel+="<td>"+jadwal[i].kodesubspesialis+' - '+jadwal[i].namasubspesialis+"</td>";
                        tabel+="<td>"+jadwal[i].jadwal+"</td>";
                        tabel+="<td>"+jadwal[i].kapasitaspasien+"</td>";
			            tabel+="<td>"+jadwal[i].libur+"</td>";
			            tabel+="</tr>";
			            //console.log(tabel);
			        }
		        }else{
		        	tabel+="<tr><td colspan='4'>Data Tidak ada</td></tr>"
		        }
		        console.log(tabel)
		        $('#detailjadwal'+hari).html(tabel);
		        
		    }else{
                tabel+="<tr><td colspan='5'>"+data.metadata.message+"</td></tr>";
                $('#detailjadwal'+hari).html(tabel);
            }
		}
	});
}

function editJadwal(){
    var kdpoli=$('#kdpoli').val();
    var url = base_url+"jkn/mobile/jadwaldokter";
	$.ajax({
		url     : url,
		type    : "GET",
		dataType: "json",
		data    : {poli : kdpoli},
        beforeSend: function() {
            // setting a timeout
            $('#listjadwal').html('<tr><td colspan="5"><span class="fa fa-spinner fa-spin"></span> Menunggu...</td></tr>');
        },
		success : function(data){
		    //menghitung jumlah data
		    console.clear();
		    if(data.metadata.code==200){
		        var jadwal    = data.response;
		        console.log(jadwal);
		        var jmlData=jadwal.length;
		        var start=0;
		        var tabel   = "";
		        //Create Tabel
		        if(jmlData>0){
		        	for(var i=0; i<jmlData;i++){
			            start++;
			            tabel+='<tr>';
			           	tabel+="<td>"+jadwal[i].namadokter+"</td>";
                        tabel+="<td>"+jadwal[i].jadwal+"</td>";
                        tabel+="<td>"+jadwal[i].kapasitaspasien+"</td>";
			            tabel+="<td>"+jadwal[i].libur+"</td>";
			            tabel+="</tr>";
			            //console.log(tabel);
			        }
		        }else{
		        	tabel+="<tr><td colspan='4'>Data Tidak ada</td></tr>"
		        }
		        console.log(tabel)
		        $('#detailjadwal'+hari).html(tabel);
		        
		    }else{
                tabel+="<tr><td colspan='5'>"+data.metadata.message+"</td></tr>";
                $('#detailjadwal'+hari).html(tabel);
            }
		}
	});
}
function batalkanAntrean(){
	var formData = {
		kodebooking : $('#kodebooking').val(),
		taskid : 99
	}
	var url = base_url+"jkn/mobile/updatewaktuantrean";
	$.ajax({
		url         : url,
		type        : "POST",
		data        : formData,
		dataType    : "JSON",
		success     : function(data){
			console.clear();
			
			console.log(data);
			if(data.metadata.code==200){
				tampilkanPesan('success',data.metadata.message);
				$('#editsep').modal('hide');
			}else{
				//alert(data.metaData.message);
				tampilkanPesan('warning',data.metadata.message);
			}  
		},
		error       : function(jqXHR,ajaxOption,errorThrown){
			console.log(jqXHR.responseText);                    
		}
	});
}

function batalkanAntreanv2(){
	var formData = {
		kodebooking : $('#kodebookingv2').val(),
		keterangan : $('#keterangan').val()
	}
	var url = base_url+"jkn/mobile/batalantrean";
	$.ajax({
		url         : url,
		type        : "POST",
		data        : formData,
		dataType    : "JSON",
		success     : function(data){
			console.clear();
			
			console.log(data);
			if(data.metadata.code==200){
				tampilkanPesan('success',data.metadata.message);
				$('#editsep').modal('hide');
			}else{
				//alert(data.metaData.message);
				tampilkanPesan('warning',data.metadata.message);
			}  
		},
		error       : function(jqXHR,ajaxOption,errorThrown){
			console.log(jqXHR.responseText);                    
		}
	});
}
