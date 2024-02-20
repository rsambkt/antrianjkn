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
});
function getKamar(){
    var idkelas=$('#idkelas').val()
    $.ajax({
        url: base_url+'ranap/kunjungan/kamar/'+idkelas,
        dataType: "JSON",
        method: "GET",
        data: {},
        success: function(data) {
            //console.log(data);
            var option="<option value=''>Pilih Kamar</option>";
            var kamar=data.data;
            for (let i = 0; i < kamar.length; i++) {
                const e = kamar[i];
                option+=`<option value='`+e.id_kamar+`'>`+e.nama_kamar+`</option>`
            }
            $('#idkamar').html(option);
        },
        error: function(xhr) {
            $('#error').modal('show');
            $('#xhr').html(xhr.responseText)
        }
    });
}
function pilihStatusPulang(){
    var idcarakeluar=$('#idcarakeluar').val()
    $.ajax({
        url: base_url+'ranap/kunjungan/carakeluar/'+idcarakeluar,
        dataType: "JSON",
        method: "GET",
        data: {},
        success: function(data) {
            //console.log(data);
            var option="<option value=''>Pilih Keadaan Keluar</option>";
            var kamar=data.keadaankeluar;
            for (let i = 0; i < kamar.length; i++) {
                const e = kamar[i];
                option+=`<option value='`+e.idx+`'>`+e.keadaan_keluar+`</option>`
            }
            $('#idkeadaankeluar').html(option);
            if(data.idx==4) $('#meninggal').show(); else $('#meninggal').hide();
        },
        error: function(xhr) {
            $('#error').modal('show');
            $('#xhr').html(xhr.responseText)
        }
    });
}
function getTT(){
    var idkamar=$('#idkamar').val()
    $.ajax({
        url: base_url+'ranap/kunjungan/tt/'+idkamar,
        dataType: "JSON",
        method: "GET",
        data: {},
        success: function(data) {
            //console.log(data);
            var option="<option value=''>Pilih Tempat Tidur</option>";
            var kamar=data.data;
            for (let i = 0; i < kamar.length; i++) {
                const e = kamar[i];
                if(e.id_daftar==null) option+=`<option value='`+e.idtt+`'>`+e.namatt+`</option>`
                else option+=`<option value='`+e.idtt+`' disabled>`+e.namatt+`</option>`
            }
            $('#id_tt').html(option);
        },
        error: function(xhr) {
            $('#error').modal('show');
            $('#xhr').html(xhr.responseText)
        }
    });
}
function aprovePasien(regunit){
    $.ajax({
        url: base_url+'ranap/kunjungan/aprovepasien/'+regunit,
        dataType: "JSON",
        method: "GET",
        data: {},
        success: function(data) {
            if(data.status==true){
                $('#formaprove').modal('show');
                $('#v-id_daftar').html(data.data.id_daftar)
                $('#v-reg_unit').html(data.data.reg_unit)
                $('#v-nomr_pasien').html(data.data.nomr_pasien)
                $('#v-nama_pasien').html(data.data.nama_pasien)
                $('#v-ruangasal').html(data.data.ruangasal)
                $('#v-ruangpenerima').html(data.data.ruangtujuan)
                $('#v-dokterpengirim').html(data.data.namaDokterPengirim)
                $('#v-alasankonsul').html(data.data.alasankonsul)

                $('#idx').val(data.data.idx);
                $('#logidx').val(data.data.logidx);
                $('#idkelas').val(data.profile.id_kelas).trigger('change');
                $('#id_daftar').val(data.data.id_daftar);
                $('#reg_unit').val(data.data.reg_unit);
                $('#nomr_pasien').val(data.data.nomr_pasien);
                $('#nama_pasien').val(data.data.nama_pasien);
                $('#jns_kelamin').val(data.data.jns_kelamin);
                $('#tgl_lahir').val(data.data.tgl_lahir);
                $('#idruangasal').val(data.data.idruangasal);
                $('#ruangasal').val(data.data.ruangasal);
                // tampilkanPesan('success',data.message);
            }else{
                tampilkanPesan('error',data.message);
            }

        },
        error: function(xhr) {
            $('#error').modal('show');
            $('#xhr').html(xhr.responseText)
        }
    });
}
function simpanTT(){
    var url;
    url = base_url + "ranap/kunjungan/simpantt";
    var formdata = {
        'idx':$('#idx').val(),
        'id_daftar':$('#id_daftar').val(),
        'reg_unit':$('#reg_unit').val(),
        'nomr':$('#nomr').val(),
        'nama_pasien':$('#nama_pasien').val(),
        'tgl_lahir':$('#tgl_lahir').val(),
        'jns_kelamin':$('#jns_kelamin').val(),
        'id_cara_bayar':$('#id_cara_bayar').val(),
        'tgl_masuk':$('#tgl_masuk').val(),
        'idkelas':$('#idkelas').val(),
        'id_poli':$('#id_poli').val(),
        'nama_poli':$('#nama_poli').val(),
        'idkamar':$('#idkamar').val(),
        'nama_kamar':$('#idkamar :selected').html(),
        'id_tt':$('#id_tt').val(),
        'nama_tt':$('#id_tt :selected').html(),
        'id_kelas_lama':$('#id_kelas_lama').val(),
        'id_kamar_lama':$('#id_kamar_lama').val(),
        'id_tt_lama':$('#id_tt_lama').val(),
    };
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
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
                var idkamar=$('#idkamar').val();
                var idkamarlama=$('#id_kamar_lama').val();
                // if(idkamar!=id_kamar_lama)
                if(idkamar!=idkamarlama && idkamarlama!="") updateAplicare(idkamarlama,0);
                updateAplicare(idkamar);
                var idkel=$('#idkelas').val();
                var idkam=$('#idkamar').val();
                var idtt=$('#id_tt').val();
                $('#id_kelas_lama').val(idkel)
                $('#id_kamar_lama').val(idkam)
                $('#id_tt_lama').val(idtt)
            }
            else{
                $('#err_kelas').html(data.error.idkelas)
                $('#err_kamar').html(data.error.idkamar)
                $('#err_tt').html(data.error.idtt)
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
function terimaPermintaan(){
    var url;
    url = base_url + "ranap/kunjungan/terimapasien";
    var formdata = {
        'idx':$('#idx').val(), //idpermintaan
        'logidx':$('#logidx').val(), //idpermintaan
        'id_daftar':$('#id_daftar').val(),
        'reg_unit':$('#reg_unit').val(),
        'nomr':$('#nomr').val(),
        'nama_pasien':$('#nama_pasien').val(),
        'tgl_lahir':$('#tgl_lahir').val(),
        'jns_kelamin':$('#jns_kelamin').val(),
        'idkelas':$('#idkelas').val(),
        'idkamar':$('#idkamar').val(),
        'nama_kamar':$('#idkamar :selected').html(),
        'id_tt':$('#id_tt').val(),
        'nama_tt':$('#id_tt :selected').html()
    };
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
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
                updateAplicare(data.idkamar,0);
                updateAplicare(data.idkamarlama);
            }
            else{
                $('#err_kelas').html(data.error.idkelas)
                $('#err_kamar').html(data.error.idkamar)
                $('#err_tt').html(data.error.idtt)
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
function updateTglPulang(){
    var url;
    url = base_url + "ranap/kunjungan/pasienpulang";
    var formdata = {
        'idx':$('#idx').val(),
        'logidx':$('#logidx').val(),
        'id_daftar':$('#id_daftar').val(),
        'reg_unit':$('#reg_unit').val(),
        'nomr':$('#nomr').val(),
        'nama_pasien':$('#nama_pasien').val(),
        'tgl_lahir':$('#tgl_lahir').val(),
        'jns_kelamin':$('#jns_kelamin').val(),
        'id_cara_bayar':$('#id_cara_bayar').val(),
        'tgl_masuk':$('#tgl_masuk').val(),
        'idkelas':$('#idkelas').val(),
        'id_poli':$('#id_poli').val(),
        'nama_poli':$('#nama_poli').val(),
        'idkamar':$('#idkamar').val(),
        'nama_kamar':$('#idkamar :selected').html(),
        'id_tt':$('#id_tt').val(),
        'nama_tt':$('#id_tt :selected').html(),
        'id_kelas_lama':$('#id_kelas_lama').val(),
        'id_kamar_lama':$('#id_kamar_lama').val(),
        'id_tt_lama':$('#id_tt_lama').val(),
        'noSep':$('#noSep').val(),
        'idcarakeluar':$('#idcarakeluar').val(),
        'carakeluar':$('#idcarakeluar :selected').html(),
        'idkeadaankeluar':$('#idkeadaankeluar').val(),
        'keadaankeluar':$('#idkeadaankeluar :selected').html(),
        'tglPulang':$('#tglPulang').val(),
        'noLPManual':$('#noLPManual').val(),
        'noSuratMeninggal':$('#noSuratMeninggal').val(),
        'tglMeninggal':$('#tglMeninggal').val(),
    };
    // console.clear();
    // console.log(formdata)
    // return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#u-btnsimpan').prop("disabled",true);
            $('#u-iconsimpan').removeClass('fa fa-save')
            $('#u-iconsimpan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.metaData.code==200){
                var idkamar=$('#idkamar').val();
                updateAplicare(idkamar);
                // swal({
                //     title: "Sukses",
                //     text: data.metaData.message,
                //     type: "success",
                //     timer: 5000
                // });
            }
            else if(data.metaData.code==201){
                swal({
                    title: "Peringatan",
                    text: data.metaData.message,
                    type: "error",
                    timer: 5000
                });
            }
            else{
                $('#err_carakeluar').html(data.error.carakeluar)
                $('#err_keadaankeluar').html(data.error.keadaankeluar)
                $('#err_nosurat').html(data.error.noSuratMeninggal)
                $('#err_tglmeninggal').html(data.error.tglMeninggal)
                $('#err_tglpulang').html(data.error.tglPulang)
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
            $('#u-btnsimpan').prop("disabled",false);
            $('#u-iconsimpan').removeClass('fa fa-spinner spin')
            $('#u-iconsimpan').addClass('fa fa-save')
        },
        complete: function() {
            $('#u-btnsimpan').prop("disabled",false);
            $('#u-iconsimpan').removeClass('fa fa-spinner spin')
            $('#u-iconsimpan').addClass('fa fa-save')
        }
    });
}
function simpanPermintaan(){
    var url;
    url = base_url + "ranap/kunjungan/simpanpermintaan";
    var formdata = {
        'idx':$('#idx').val(),
        'idxpindah':$('#idxpindah').val(),
        'logidx':$('#logidx').val(),
        'id_daftar':$('#id_daftar').val(),
        'reg_unit':$('#reg_unit').val(),
        'nomr_pasien':$('#nomr').val(),
        'nama_pasien':$('#nama_pasien').val(),
        'tgl_lahir':$('#tgl_lahir').val(),
        'jns_kelamin':$('#jns_kelamin').val(),
        'id_cara_bayar':$('#id_cara_bayar').val(),
        'tgl_masuk':$('#tgl_masuk').val(),
        'idkelas':$('#idkelas').val(),
        'idruangasal':$('#id_poli').val(),
        'ruangasal':$('#nama_poli').val(),
        'dokterPengirim':$('#dokterPengirim').val(),
        'namaDokterPengirim':$('#namaDokterPengirim').val(),
        'idruangtujuan':$('#idruang').val(),
        'ruangtujuan':$('#idruang :selected').html(),
        'alasanpemindahan':$('#alasanpemindahan').val(),
    };
    // console.clear();
    // console.log(formdata)
    // return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnPermintaan').prop("disabled",true);
            $('#iconBtnPermintaan').removeClass('fa fa-save')
            $('#iconBtnPermintaan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.metaData.code==200){
                
                swal({
                    title: "Sukses",
                    text: data.metaData.message,
                    type: "success",
                    timer: 5000
                });
            }
            else{
                $('#err_ruang').html(data.error.ruang)
                $('#err_alasan').html(data.error.alasan)
                swal({
                    title: "Peringatan",
                    text: data.metaData.message,
                    type: "warning",
                    timer: 5000
                });
            }
            
        },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#btnPermintaan').prop("disabled",false);
            $('#iconBtnPermintaan').removeClass('fa fa-spinner spin')
            $('#iconBtnPermintaan').addClass('fa fa-save')
        },
        complete: function() {
            $('#btnPermintaan').prop("disabled",false);
            $('#iconBtnPermintaan').removeClass('fa fa-spinner spin')
            $('#iconBtnPermintaan').addClass('fa fa-save')
        }
    });
}

function simpanAplicare(kamarid) {
    $.ajax({
        url: base_url + "applicare/bed/create/" + kamarid,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getTT();
            if(data.metadata.code==1){
                
                tampilkanPesan('success',data.metadata.message);
            }else{
                tampilkanPesan('error',data.metadata.message);
            }
        },
        error: function (jqXHR, textruang, errorThrown) {
            alert('Error')
        }
    });
}
function updateAplicare(kamarid,pesan=1) {
    $.ajax({
        url: base_url + "applicare/bed/update/" + kamarid,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getTT();
            if(data.metadata.code==1){
                if(pesan==1) tampilkanPesan('success',data.metadata.message);
            }else{
                tampilkanPesan('error',data.metadata.message);
            }
        },
        error: function (jqXHR, textruang, errorThrown) {
            alert('Error')
        }
    });
}

function getPermintaan(start=1){
    $('#start').val(start);
    var search = $('#qpermintaan').val();
    var limit = $('#limitpermintaan').val();
    var param = $('#parampermintaan').val();
    var url = base_url+'ranap/kunjungan/datapermintaan?keyword=' + search + "&start=" + start + "&limit=" + limit + "&param=" + param;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='12'><b>Loading...</b></td></tr>";
            $('#datapermintaan').html(tabel);
            $('#pageminta').html('');
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                $('#datapermintaan').html('');
                var res    = data["data"];
                var jmlData=res.length;
                var limit   = data["limit"];
                var tabel   = "";
                //Create Tabel
                var no = (parseInt(start)*parseInt(limit))-parseInt(limit);
                var dari = no+1;
                var sampai = no+parseInt(limit);
                var desc = "<button class='btn btn-default btn-sm' type='button'>Showing "+ dari + " To " + sampai + " of " +data["row_count"]+"</button>";
                for(var i=0; i<jmlData;i++){
                    no++;
                    tabel="<tr>";tabel+="<td>"+no+"</td>";
                    tabel+="<td>"+res[i]['id_daftar']+"</td>";
                    tabel+="<td>"+res[i]['reg_unit']+"</td>";
                    tabel+="<td><b>"+res[i]["nomr_pasien"]+"</b><br><i>"+res[i]["nama_pasien"]+"</i></td>";
                    tabel+="<td>"+res[i]['jns_kelamin']+"</td>";
                    tabel+="<td>"+res[i]["tgl_lahir"]+"</td>";
                    tabel+="<td>"+res[i]['ruangasal']+"</td>";
                    tabel+="<td>"+res[i]['alasanpemindahan']+"</td>";
                    if(res[i]['statusresponse']==1) {
                        tabel+="<td><span class='btn btn-success btn-xs'>Sudah Diterima</span></td>";
                        tabel+="<td><button type='button' class='btn btn-default btn-sm' disabled ><span class='fa fa-plus'></span> Registrasikan Pasien</button></td>";
                    }
                    else {
                        tabel+="<td><span class='btn btn-danger btn-xs'>Belum Diterima</span></td>";
                        tabel+="<td><button type='button' class='btn btn-default btn-sm' onclick='aprovePasien(\""+res[i]["reg_unit"]+"\")'><span class='fa fa-plus'></span> Registrasikan Pasien</button></td>";
                    }
                    
                    tabel+="</tr>";
                    $('#datapermintaan').append(tabel);
                }
                //Create Pagination
                if(data["row_count"]<=limit){
                    $('#pageminta').html("");
                }else{
                    console.log("buat Pagination");
                    var pagination="";
                    var btnIdx="";
                    jmlPage = Math.ceil(data["row_count"]/limit);
                    offset  = data["start"] % limit;
                    
                    var curIdx = start;
                    var btn="btn-default";
                    //var lastSt=jmlPage;
                    var btnFirst="<button class='btn btn-default btn-sm' onclick='getkunjungan(1)'><span class='fa fa-angle-double-left'></span></button>";
                    if (curIdx > 1) {
                        var prevSt=curIdx-1;
                        btnFirst+="<button class='btn btn-default btn-sm' onclick='getkunjungan("+prevSt+")'><span class='fa fa-angle-left'></span></button>";
                    }
        
                    var btnLast="";
                    if(curIdx<jmlPage){
                        var nextSt=curIdx+1;
                        btnLast+="<button class='btn btn-default btn-sm' onclick='getkunjungan("+nextSt+")'><span class='fa fa-angle-right'></span></button>";
                    }
                    console.log(curIdx);
                    btnLast+="<button class='btn btn-default btn-sm' onclick='getkunjungan("+jmlPage+")'><span class='fa fa-angle-double-right'></span></button>";
                    
                    if(jmlPage>=5){
                        console.clear();
                        console.log('Jumlah Halaman > 5');
                        if(curIdx>=3){
                            console.log('Cur Idx >= 3');
                            var idx_start=curIdx - 2;
                            var idx_end=curIdx + 2;
                            if(idx_end>=jmlPage) idx_end=jmlPage;
                        }else{
                            var idx_start=1;
                            var idx_end=5;
                        }
                        for (var j = idx_start; j<=idx_end; j++) {
                            if(curIdx==j)  btn="btn-success"; else btn= "btn-default";
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='getkunjungan("+ j +")'>" + j +"</button>";
                        }
                    }else{
        
                        for (var j = 1; j<=jmlPage; j++) {
                            if(curIdx==j)  btn="btn-success"; else btn= "btn-default";
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='getkunjungan("+ j +")'>" + j +"</button>";
                        }
                    }
                    pagination+="<div class='btn-group'>"+desc+btnFirst + btnIdx + btnLast+"</div>";
                    $('#pageminta').html(pagination);
                }
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}

function batalRujukan(norujukan=""){
	if(norujukan=="") norujukan= $('#r-noRujukan').val()
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
						getRujukanKeluar();
						// tampilkanPesan('success',data.metaData.message)
						// var faskes=$('#r-faskes').val();
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
function updateRujukan(){
	var jnsPelayanan = $("input[name='jnsPelayanan']:checked").val();
	var diagnosanama=$('#r-diagRujukan').val();
	var namapoliTujuan=$('#r-poliRujukan :selected').html();
	var namatujuanRujukan=$('#r-poliRujukan :selected').html();
	// tampilkanPesan('error','Diagnosa Awal : '+ diagnosanama+" Tujuan Poli "+ namapoliTujuan+" Tujuan Rujukan : " + namatujuanRujukan)
	var formData = {
		id_daftar : $('#id_daftar').val(),
		reg_unit : $('#reg_unit').val(),
		noRujukan 	: $('#r-noRujukan').val(),
		tglRujukan: $('#r-tglRujukan').val(),
        tglRencanaKunjungan:$('#r-tglRencanaKunjungan').val(),
        ppkDirujuk: $('#ppkDirujuk').val(),
		namappkDirujuk: $('#r-ppkDirujuk').val(),
        jnsPelayanan: jnsPelayanan,
        catatan: $('#r-catatan').val(),
        diagRujukan: $('#diagRujukan').val(),
		diagnosanama: diagnosanama,
        tipeRujukan: $('#r-tipeRujukan').val(),
        poliRujukan: $('#r-poliRujukan').val(),
		namapoliRujukan: namatujuanRujukan,
		
	}
	// alert('Nilai Diagnosa Awal '+formData['diagnosanama']);
	console.clear();
	console.log(formData);
	// return false
	// var formData = new FormData($('#theform')[0]);
	$.ajax({
		url         : base_url+"vclaim/rujukan/update",
		type        : "POST",
		data        : formData,
		dataType    : "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnBuatRujukan').prop("disabled",true);
            $('#iconBuatrujukan').removeClass('fa fa-save')
            $('#iconBuatrujukan').addClass('fa fa-spinner spin')
        },
		success     : function(data){
			// console.clear();
			// console.log(data);
			if(data.metaData.code==200){
				// location.reload();
				updateRujukanLokal();
				// tampilkanPesan('success',data.metaData.message);
			}else{
				//alert(data.metaData.message);
				tampilkanPesan('warning',data.metaData.message);
			}  
		},
		error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#btnBuatRujukan').prop("disabled",false);
            $('#iconBuatrujukan').removeClass('fa fa-spinner spin')
            $('#iconBuatrujukan').addClass('fa fa-save')
            // $(placeholder).append(xhr.statusText + xhr.responseText);
            // $(placeholder).removeClass('loading');
        },
        complete: function() {
            $('#btnBuatRujukan').prop("disabled",false);
            $('#iconBuatrujukan').removeClass('fa fa-spinner spin')
            $('#iconBuatrujukan').addClass('fa fa-save')
        },
	});
}
function updateRujukanLokal(){
	var jnsPelayanan = $("input[name='jnsPelayanan']:checked").val();
	var diagnosanama=$('#r-diagRujukan').val();
	// var namapoliTujuan=$('#r-poliRujukan :selected').html();
	var namatujuanRujukan=$('#namaPoliRujukan').val();
	var formData = {
		id_daftar : $('#id_daftar').val(),
		reg_unit : $('#reg_unit').val(),
		noRujukan 	: $('#r-noRujukan').val(),
		tglRujukan: $('#r-tglRujukan').val(),
        tglRencanaKunjungan:$('#r-tglRencanaKunjungan').val(),
        ppkDirujuk: $('#ppkDirujuk').val(),
		namappkDirujuk: $('#r-ppkDirujuk').val(),
        jnsPelayanan: jnsPelayanan,
        catatan: $('#r-catatan').val(),
        diagRujukan: $('#diagRujukan').val(),
		diagnosanama: diagnosanama,
        tipeRujukan: $('#r-tipeRujukan').val(),
        poliRujukan: $('#r-poliRujukan').val(),
		namapoliRujukan: namatujuanRujukan,
	}
	console.clear();
	// console.log(formData);
	// var formData = new FormData($('#theform')[0]);
	$.ajax({
		url         : base_url+"vclaim/rujukan/updatelokal",
		type        : "POST",
		data        : formData,
		dataType    : "JSON",
		success     : function(data){
			console.clear();
			console.log(data);
			if(data.metaData.code==200){
				// location.reload();
				// updateRujukanLokal();
				tampilkanPesan('success',data.metaData.message);
			}else{
				//alert(data.metaData.message);
				tampilkanPesan('warning',data.metaData.message);
			}  
		},
		error       : function(jqXHR,ajaxOption,errorThrown){
			console.log(jqXHR.responseText);                    
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
function cetakRujukan(norujuk){
    window.open(base_url+"vclaim/rujukan/cetakrujukan/"+norujuk);
}
function getRujukanKeluar(norujuk='') {
    // var layanan = $('input[name="jns_layanan"]:checked').val();
    // var jkn = $('#jkn').val();
	if(norujuk=="") {
		norujuk=$('#r-noRujukan').val();
	}else{
		$('#r-noRujukan').val(norujuk)
	}
	// alert(norujuk)
	if(norujuk!=""){
		var url = base_url + "vclaim/rujukan/rujukanonline/"+norujuk;
		$.ajax({
			url: url,
			type: "GET",
			dataType: "JSON",
			success: function (data) {
				if(data.metaData.code==200){
					$('#r-tglRujukan').val(data.response.rujukan.tglRujukan);
					$('#r-tglRencanaKunjungan').val(data.response.rujukan.tglRencanaKunjungan);
					$('#r-tipeRujukan').val(data.response.rujukan.tipeRujukan);
					$('#r-tglRencanaKunjungan').val(data.response.rujukan.tglRencanaKunjungan);
					$('#ppkDirujuk').val(data.response.rujukan.ppkDirujuk);
					$('#r-ppkDirujuk').val(data.response.rujukan.namaPpkDirujuk);
					if(data.response.rujukan.jnsPelayanan==1) $('#gd').prop("checked",true);
					else $('#rj').prop("checked",true);
					$('#r-catatan').val(data.response.rujukan.catatan);
					$('#diagRujukan').val(data.response.rujukan.diagRujukan);
					$('#r-diagRujukan').val(data.response.rujukan.namaDiagRujukan);
					$('#r-poliRujukan').val(data.response.rujukan.poliRujukan);
					$('#namaPoliRujukan').val(data.response.rujukan.namaPoliRujukan);
					// var btn=`<button type="button" class="btn btn-primary" id="btnBuatRujukan" onclick="updateRujukan()"><span class="fa fa-save" id="iconBuatrujukan"></span> Buat Rujukan</button>`;
					var tombol='<button type="button" class="btn btn-primary" id="btnBuatRujukan" onclick="updateRujukan()"><span class="fa fa-save" id="iconBuatrujukan"></span> Update Rujukan</button>'+
					'<button type="button" class="btn btn-warning" id="btnCetakRujukan" onclick="cetakRujukan(\''+data.response.rujukan.noRujukan+'\')"><span class="fa fa-print" ></span> Cetak Rujukan</button>'+
					'<button type="button" class="btn btn-danger" id="btnBatalRujukan"  onclick="batalRujukan(\''+data.response.rujukan.noRujukan+'\')"><span class="fa fa-remove"></span> Batal</button>';
					$('#btnRujukan').html(tombol)
				}else{
					$('#r-noRujukan').val("")
					var tombol='<button type="button" class="btn btn-primary" id="btnBuatRujukan" onclick="createRujukan()"><span class="fa fa-save" id="iconBuatrujukan"></span> Buat Rujukan</button>';
					$('#btnRujukan').html(tombol)
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {

			}
		});
	}
    
}
