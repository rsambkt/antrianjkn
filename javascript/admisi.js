function pilihLoket(){
	var formdata={
		loket:$('#loketpanggil').val(),
		loketnama: $('#loketpanggil :selected').html()
	}
	$.ajax({
		url: base_url+"rekammedis/home/pilihloket",
		type: "POST",
		data: formdata,
		dataType: "JSON",
		beforeSend  : function(){
			$('#daftar').prop("disabled",true);
			$('#iconCari').removeClass('fa-arrow-right')
			$('#iconCari').addClass('fa-spinner fa-spin')
		},
		success: function(data) {
			if (data.status == true) {
				location.reload();
			} else {
				tampilkanPesan('warning',data.message);
			}
		},
		error: function(xhr) { // if error occured
			$('#error').modal('show');
			$('#xhr').html(xhr.responseText)
			$('#btnCari').prop("disabled",false);
			$('#iconCari').removeClass('fa fa-spinner fa-spin')
			$('#iconCari').addClass('fa-arrow-right')
		},
		complete: function() {
			$('#btnCari').prop("disabled",false);
			$('#iconCari').removeClass('fa fa-spinner fa-spin')
			$('#iconCari').addClass('fa-arrow-right')
		},
	});
}

function cariPasien(nomr=""){
    if(nomr=="") nomr=$('#norm').val();
    else $('#norm').val(nomr)
    var url=base_url+"rekammedis/pasien/caripasien/"+nomr;
    // alert(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if (data["status"] == true) {
                // alert("OK")
                if(data.terdaftar==1){
                    var url=base_url+"rekammedis/pasien/registrasi/"+nomr;
                    location.href=url;
                }else{
                    var prov=data.data.state;
                    var exp=prov.split("_",2);
                    var dob=data.data.date_of_birth;
                    var dex = dob.split(" ");
                    var dex1=dex[0];
                    var dex2=dex1.split("-");
                    var tgl=dex2[2]+"/"+dex2[1]+"/"+dex2[0]
                    var jekel=data.data.gender=="M"?"1":"2";
                    $('#u_nama').val(data.data.title+" "+data.data.first_name+" "+ data.data.last_name)
                    $('#u_alamat').val(data.data.address)
                    $('#u_nama_provinsi').val(exp[1]).trigger('change')
                    $('#u_nama_provinsi_domisili').val(exp[1]).trigger('change')
                    $('#u_tempat_lahir').val(data.data.place_of_birth)
                    $('#u_tgl_lahir').val(tgl)
                    $('#u_jns_kelamin').val(jekel);
                    $('#u_tgldaftar').val(data.data.created_date);
                    $('#u_kodepos').val(data.data.post_code);
                    $('#u_nama_kab_kota').val(data.data.city);
                    $('#u_no_telpon').val(data.data.home_phone);
                    $('#u_no_hp').val(data.data.mobile_phone);
                    $('#u_agama').val(data.data.religion);
                    $('#u_status_kawin').val(data.data.marital);
                    $('#u_pekerjaan').val(data.data.occupation);
                    $('#u_pendidikan').val(data.data.education);
                    $('#u_rt').val(data.data.rt);
                    $('#u_rw').val(data.data.rw);
                    tampilkanPesan("warning","Pasien sudah terdaftar tapi data belum lengkap silahkan lengkapi data terlebih daulu");
                    $('#biodatapasien').show();
                }
            }else{
                tampilkanPesan("error","Nomor MR Pasien tidak ditemukan, silahkan daftarkan pasien sebagai pasien baru");
                $('#u_nomr').val("");
                $('#biodatapasien').show();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

