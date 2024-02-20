function pilihJenisAntrian(jenis){
	localStorage.setItem("jenispasien", jenis);
	$('#jenisantrian').val(jenis);
	$('.step').addClass("hide");
	$('#step2').removeClass("hide");
	if(jenis=="JKN") var ph="Masukkan Nomor Kartu";
	else if(jenis=="NON JKN") var ph="Masukkan Nomr / NIK / No Kartu";
	else var ph="Masukkan Kodebooking"
	$("#nomor").prop("placeholder", ph);
	$('#labelnomor').html(ph);
	$('#nomor').focus();
}
function enter_nomor(evt) {
	// var charCode = (evt.which) ? evt.which : event.keyCode;
	if (evt.keyCode == 13) {
		cekPasien();
	}
	return true;
}
function cekPasien()
{
	var url = base_url+"console/caripasien"
	var formData = {
        jenisantrian:$('#jenisantrian').val(),
        nomor:$('#nomor').val()
    };
    $.ajax({
        url : url,
        type: "POST",
        data : formData,
        dataType: 'JSON',
        beforeSend: function() {
            // setting a timeout
			$('#loading').removeClass("hide");
			var jenisantrian=$('#jenisantrian').val();
			if(jenisantrian=="JKN") $('#loading-proses').html("Proses Pencarian Rujukan Pasien ...")
            else if(jenisantrian=="NON JKN") $('#loading-proses').html("Proses Pencarian Data Pasien ...")
			else if(jenisantrian=="CHECKIN") $('#loading-proses').html("Proses Checkin Pasien ...")
			else $('#loading-proses').html("Proses Pengambilan Antrian Farmasi ...")
			$('#btnCari').prop("disabled",true);
            $('#iconCari').removeClass('fa-search');
            $('#iconCari').addClass('fa-spinner spin');
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.metaData.code==200){
				localStorage.setItem("jenispasien", formData["jenisantrian"]);
                if(formData["jenisantrian"]=="JKN"){
					// Priview Rujukan FKTP
					// alert("test")
					var rujukan="";
					var datarujukan=data.faskes1.rujukan;
					
					// console.log(datarujukan);
					// console.log(datarujukan.length)
					// return false;
					// alert(datarujukan.length)
					var jmlrujukanfaskes1=data.faskes1!=''?data.faskes1.rujukan.length:0;
					var jmlrujukanfaskes2=data.faskes2!=''?data.faskes2.rujukan.length:0;
					var totalrujukan=jmlrujukanfaskes1+jmlrujukanfaskes2;
					if(data.faskes1!=''){
						if(data.faskes1.rujukan.length>0){
							var peserta=data.faskes1.rujukan[0].peserta;
							if(peserta.sex=="L") var img=`<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/male.png" alt="User profile picture">`;
							else var img=`<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/female.png" alt="User profile picture">`;
							$('#img').html(img);
							$('.nama').html(peserta.nama)
							$('.nomr').html(peserta.mr.noMR)
							$('.nik').html(peserta.nik)
							$('.noKartu').html(peserta.noKartu)
							$('.tgllahir').html(peserta.tglLahir)
							$('.notelp').html(peserta.mr.noTelepon)
							var notelp=peserta.mr.noTelepon==null ? "08000000000": peserta.mr.noTelepon;
							var norm=peserta.mr.noMR;
							localStorage.setItem("nomorkartu", peserta.noKartu);
							localStorage.setItem("nik", peserta.nik);
							localStorage.setItem("nohp", notelp);
							localStorage.setItem("norm", norm);
							localStorage.setItem("nama", peserta.nama);
							localStorage.setItem("klsRawatHak", peserta.hakKelas.kode);
							localStorage.setItem("klsRawatHakKeterangan", peserta.hakKelas.keterangan);
							localStorage.setItem("pendingbooking", 0);
							if(peserta.mr.noMR==null) {
								if(data.pasienbaru==0) localStorage.setItem("norm", data.pasien.nomr);
								localStorage.setItem("pasienbaru", data.pasienbaru);
								localStorage.setItem("nomorreferensi", data.faskes1.rujukan[0].noKunjungan);
								localStorage.setItem("jeniskunjungan", 1);
								localStorage.setItem("kodepoli", data.faskes1.rujukan[0].poliRujukan.kode);
								localStorage.setItem("namapoli", data.faskes1.rujukan[0].poliRujukan.nama);
								localStorage.setItem("asalRujukan", 1);
								localStorage.setItem("tglRujukan", data.faskes1.rujukan[0].tglKunjungan);
								localStorage.setItem("noRujukan", data.faskes1.rujukan[0].noKunjungan);
								localStorage.setItem("ppkRujukan", data.faskes1.rujukan[0].provPerujuk.kode);
								localStorage.setItem("ppkRujukanNama", data.faskes1.rujukan[0].provPerujuk.nama);
								localStorage.setItem("diagAwal", data.faskes1.rujukan[0].diagnosa.kode);
								localStorage.setItem("diagNama", data.faskes1.rujukan[0].diagnosa.nama);
								localStorage.setItem("tujuan", data.faskes1.rujukan[0].poliRujukan.kode);
								var cob=data.faskes1.rujukan[0].peserta.cob.noAsuransi==null?0:1;
								localStorage.setItem("cob", cob);
								
								// jika pasien baru Munculkan list Doker
								// rujukan="LIST RUJUKAN";
								// alert("pasien Baru")
								getDokter(data.faskes1.rujukan[0].poliRujukan.kode,data.faskes1.rujukan[0].poliRujukan.nama);
							}else {
								localStorage.setItem("pasienbaru", 0)
								// jika pasien lama munculkan list rujukan
								// alert('Disini')
								if(data.faskes1.rujukan.length==1 && totalrujukan==1){
									// alert('pilihrujukan');
									// noKunjungan,tglKunjungan,poliRujukankode,poliRujukannama,noKartu,nomr,faskes,ppkRujukan,diagAwal,diagnama
									pilihRujukan(data.faskes1.rujukan[0].noKunjungan,
										data.faskes1.rujukan[0].tglKunjungan,
										data.faskes1.rujukan[0].poliRujukan.kode,
										data.faskes1.rujukan[0].poliRujukan.nama,
										data.faskes1.rujukan[0].peserta.noKartu,
										data.faskes1.rujukan[0].peserta.mr.noMR,'1',
										data.faskes1.rujukan[0].provPerujuk.kode,
										data.faskes1.rujukan[0].provPerujuk.nama,
										data.faskes1.rujukan[0].diagnosa.kode,
										data.faskes1.rujukan[0].diagnosa.nama)
								}else{
									for (let i = 0; i < data.faskes1.rujukan.length; i++) {
										const e = data.faskes1.rujukan[i];
										rujukan+=`
										<div class="col-md-6">
											<div class="kotak">
												<table class="table">
													<tr>
													<td rowspan="6" id="img" class="text-center">
													<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/poliklinik.png" alt="User profile picture">
													<br>
													<button class='btn btn-primary btn-block' type='button' onclick="pilihRujukan('`+e.noKunjungan+`','`+e.tglKunjungan+`','`+e.poliRujukan.kode+`','`+e.poliRujukan.nama+`','`+e.peserta.noKartu+`','`+e.peserta.mr.noMR+`','1','`+e.poliRujukan+`','`+e.diagnosa.kode+`','`+e.diagnosa.nama+`')"><span class='fa fa-print'></span> Ambil Antrean</button>
													</td>
													</tr>
													<tr>
														<td><i>No Rujukan</i></td>
														<td id="noRujukan"><b>`+e.noKunjungan+`</b></td>
													</tr>
													<tr>
														<td><i>Tgl Rujukan</i></td>
														<td id="tglrujukan"><b>`+e.tglKunjungan+`</b></td>
													</tr>
													<tr>
														<td><i>Asal Rujukan</i></td>
														<td id="asalRujukan"><b>`+e.provPerujuk.kode+`-<i>`+e.provPerujuk.nama+`</i></b></td>
													</tr>
													<tr>
														<td><i>Poli Rujukan</i></td>
														<td id="poliRujukan"><b>`+e.poliRujukan.kode+`-<i>`+e.poliRujukan.nama+`</i></b></td>
													</tr>
													<tr>
														<td><i>Perujuk</i></td>
														<td><b>FKTP</b></td>
													</tr>
												</table>
											</div>
										</div>`;
									}
									// if(data.faskes2!=''){
										
									// }
									// if(data.faskes2==''){
									// 	$('#listrujukan').html(rujukan)
									// 	goTo(3)
									// 	$('#profile').removeClass("hide")
									// 	$('#loading').addClass("hide");
									// 	$('#loading-proses').html("")
									// }
									
								}
							}
							
							// $('#listrujukan').html(rujukan)
						}
					}
					// faskes 2
					if(data.faskes2!=""){
						if(data.faskes2.rujukan.length>0){
							var peserta=data.faskes2.rujukan[0].peserta;
							
							if(peserta.sex=="L") var img=`<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/male.png" alt="User profile picture">`;
							else var img=`<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/female.png" alt="User profile picture">`;
							$('#img').html(img);
							$('.nama').html(peserta.nama)
							$('.nomr').html(peserta.mr.noMR)
							$('.nik').html(peserta.nik)
							$('.noKartu').html(peserta.noKartu)
							$('.tgllahir').html(peserta.tglLahir)
							$('.notelp').html(peserta.mr.noTelepon)
							localStorage.setItem("nomorkartu", peserta.noKartu);
							localStorage.setItem("nik", peserta.nik);
							localStorage.setItem("nohp", peserta.mr.noTelepon);
							localStorage.setItem("norm", peserta.mr.noMR);
							localStorage.setItem("nama", peserta.nama);
							localStorage.setItem("klsRawatHak", peserta.hakKelas.kode);
							localStorage.setItem("klsRawatHakKeterangan", peserta.hakKelas.keterangan);
							if(peserta.mr.noMR==null) {
								if(data.pasienbaru==0) localStorage.setItem("norm", data.pasien.nomr);
								localStorage.setItem("pasienbaru", data.pasienbaru);
								localStorage.setItem("nomorreferensi", data.faskes2.rujukan[0].noKunjungan);
								localStorage.setItem("kodepoli", data.faskes2.rujukan[0].poliRujukan.kode);
								localStorage.setItem("namapoli", data.faskes2.rujukan[0].poliRujukan.nama);
								
								localStorage.setItem("jeniskunjungan", 4);
								localStorage.setItem("kodepoli", data.faskes2.rujukan[0].poliRujukan.kode);
								localStorage.setItem("namapoli", data.faskes2.rujukan[0].poliRujukan.nama);
								localStorage.setItem("asalRujukan", 2);
								localStorage.setItem("tglRujukan", data.faskes2.rujukan[0].tglKunjungan);
								localStorage.setItem("noRujukan", data.faskes2.rujukan[0].noKunjungan);
								localStorage.setItem("ppkRujukan", data.faskes2.rujukan[0].provPerujuk.kode);
								localStorage.setItem("ppkRujukanNama", data.faskes2.rujukan[0].provPerujuk.nama);
								localStorage.setItem("diagAwal", data.faskes2.rujukan[0].diagnosa.kode);
								localStorage.setItem("diagNama", data.faskes2.rujukan[0].diagnosa.nama);
								localStorage.setItem("tujuan", data.faskes2.rujukan[0].poliRujukan.kode);
								var cob=data.faskes2.rujukan[0].peserta.cob.noAsuransi==null?0:1;
								localStorage.setItem("cob", cob);

								getDokter(data.faskes2.rujukan[0].poliRujukan.kode,data.faskes2.rujukan[0].poliRujukan.nama)
								// rujukan="LIST DOKTER";
							}
							else {
								localStorage.setItem("pasienbaru", 0)

								if(data.faskes2.rujukan.length==1 && totalrujukan==1){
									// alert('pilihrujukan');
									pilihRujukan(data.faskes2.rujukan[0].noKunjungan,
										data.faskes2.rujukan[0].tglKunjungan,
										data.faskes2.rujukan[0].poliRujukan.kode,
										data.faskes2.rujukan[0].poliRujukan.nama,
										data.faskes2.rujukan[0].peserta.noKartu,
										data.faskes2.rujukan[0].peserta.mr.noMR,'2',
										data.faskes2.rujukan[0].provPerujuk.kode,
										data.faskes2.rujukan[0].provPerujuk.nama,
										data.faskes2.rujukan[0].diagnosa.kode,
										data.faskes2.rujukan[0].diagnosa.nama)
								}else{
									for (let i = 0; i < data.faskes2.rujukan.length; i++) {
										const e = data.faskes2.rujukan[i];
										rujukan+=`
										<div class="col-md-6">
											<div class="kotak">
											
												<table class="table">
													<tr>
													<td rowspan="6" id="img" class="text-center">
													<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/poliklinik.png" alt="User profile picture">
													<button class='btn btn-primary btn-block' type='button' onclick="pilihRujukan('`+e.noKunjungan+`','`+e.tglKunjungan+`','`+e.poliRujukan.kode+`','`+e.poliRujukan.nama+`','`+e.peserta.noKartu+`','`+e.peserta.mr.noMR+`','2','`+e.poliRujukan+`','`+e.diagnosa.kode+`','`+e.diagnosa.nama+`')"><span class='fa fa-print'></span> Ambil Antrean</button>
													</td>
													</tr>
													<tr>
														<td><i>No Rujukan</i></td>
														<td id="noRujukan"><b>`+e.noKunjungan+`</b></td>
													</tr>
													<tr>
														<td><i>Tgl Rujukan</i></td>
														<td id="tglrujukan"><b>`+e.tglKunjungan+`</b></td>
													</tr>
													<tr>
														<td><i>Asal Rujukan</i></td>
														<td id="asalRujukan"><b>`+e.provPerujuk.kode+`-<i>`+e.provPerujuk.nama+`</i></b></td>
													</tr>
													<tr>
														<td><i>Poli Rujukan</i></td>
														<td id="poliRujukan"><b>`+e.poliRujukan.kode+`-<i>`+e.poliRujukan.nama+`</i></b></td>
													</tr>
													<tr>
														<td><i>Perujuk</i></td>
														<td><b>FKRTL</b></td>
													</tr>
												</table>
											</div>
										</div>`;
									}
									$('#listrujukan').html(rujukan)
									goTo(3)
									$('#profile').removeClass("hide")
									$('#loading').addClass("hide");
									$('#loading-proses').html("")
								}
							}
							
						}
					}else{
						$('#listrujukan').html(rujukan)
						goTo(3)
						$('#profile').removeClass("hide")
						$('#loading').addClass("hide");
						$('#loading-proses').html("")
					}
				}else if(formData["jenisantrian"]=="CHECKIN"){
					if(data.response.antreanadmisi!=null) {
						if(data.response.nomorantrean==''){
							$('#antriantitle').html("Antrian Admisi")
							$('#nomorantrian').html(data.response.antreanadmisi)
						}else{
							if(data.response.taskid < 3){
								$('#antriantitle').html("Antrian Admisi / Poli")
								$('#nomorantrian').html(data.response.antreanadmisi + "/"+data.response.nomorantrean)
							}else{
								$('#antriantitle').html("Antrian Poli")
								$('#nomorantrian').html(data.response.nomorantrean)
							}
							
						}
						
					}else {
						$('#antriantitle').html("Antrian Poli")
						$('#nomorantrian').html(data.response.nomorantrean)
					}
					// 
					if(data.response.labelantrianpoli!="") var ap=data.response.labelantrianpoli+"."+data.response.angkaantrean;
					else var ap=data.response.angkaantrean;
					if(data.register.no_jaminan==''){
						// jika tidak ada SEP
						if(data.register.id_daftar!='')
						var register='No Registrasi : '+data.register.id_daftar;
						else var register='';
					}else{
						var register='No Registrasi : '+data.register.id_daftar+"<br>No Sep : "+data.register.no_jaminan;
					}
					$('#nojaminan').html(register)
					$('#keterangan').html(data.response.keterangan)
					var img='<img src="'+base_url+"b39?kode="+data.response.kodebooking+'" />'
					$('#kodebooking').html(img)
					$('#politujuan').html(data.response.namapoli)
					// $('#modalantrian').modal('show');
					// localStorage.clear(); 
					
					// if(data.response.labelantrianpoli!="") var ap=data.response.labelantrianpoli+"."+data.response.angkaantrean;
					// else var ap=data.response.angkaantrean;
					// $('#estimasi').html("")
					// $('#keterangan').html(data.response.keterangan)
					// var img='<img src="'+base_url+"b39?kode="+data.response.kodebooking+'" />'
					// $('#kodebooking').html(img)
					// $('#politujuan').html(data.response.namapoli)
					cetakAntrian()
					localStorage.clear(); 
					$('#loading').addClass("hide");
				}else if(formData['jenisantrian']=="FARMASI"){
					$('#antriantitle').html("Antrian Farmasi")
					$('#nomorantrian').html(data.response.antreanfarmasi)
					$('#estimasi').html("")
					$('#keterangan').html("Silahkan menunggu panggilan di farmasi")
					var img='<img src="'+base_url+"b39?kode="+data.response.kodebooking+'" />'
					$('#kodebooking').html(img)
					$('#politujuan').html(data.response.namapoli)
					cetakAntrian()
					localStorage.clear(); 
					$('#loading').addClass("hide");
				}else{		
					// alert(formData["jenisantrian"])																																																	
					if(data.response.jns_kelamin=="1") var img=`<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/male.png" alt="User profile picture">`;
					else  var img=`<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/female.png" alt="User profile picture">`;
					$('#img').html(img);

					$('.nama').html(data.response.nama)
					$('.nomr').html(data.response.nomr)
					$('.nik').html(data.response.no_ktp)
					$('.noKartu').html(data.response.no_bpjs)
					$('.tgllahir').html(data.response.tgl_lahir)
					$('.notelp').html(data.response.no_hp)
					localStorage.setItem("nomorkartu", '');
					localStorage.setItem("nik", data.response.no_ktp);
					localStorage.setItem("nohp", data.response.no_hp);
					localStorage.setItem("norm", data.response.nomr);
					localStorage.setItem("nama", data.response.nama);
					localStorage.setItem("pasienbaru", 0);
					localStorage.setItem("nomorreferensi",'');
					localStorage.setItem("jeniskunjungan", 1);

					var poliklinik=data.poliklinik;
					var ruang="<div class='row'>";
					var jml=0;
					for (let i = 0; i < poliklinik.length; i++) {
						jml++;
						const e = poliklinik[i];
						// ruang+=`<div class='col-md-2'>
						// <a href='#' onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')">
						// <img class="img img-responsive img-circle" src='`+base_url+e.icon+`' />
						// </a>
						// <a href="#"class='btn btn-default btn-block text-center' onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')">
						// <b>`+e.kodepoli+`,</b>-`+e.namapoli+`
						// </a>
						// </div>`;
						ruang+=`<div class='col-md-3' class="text-center" style="padding:5px;">
						<div class="panel panel-danger bg-gray">
						<div class="panel-body text-center" style='padding:0px;min-height:80px;'>
						<h3 ><a href='#' onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')" style="color:#000;">
						<b>`+e.kodepoli+`,</b>-`+e.namapoli+`
						</a></h3>
						</div>
						
						</div>
						</div>
						`;
						if(jml%4==0){
							ruang+=`</div><div class='row'>`;
						}
					}
					ruang+=`</div>`
					$('#step-header').html('Pilih Polklinik')
					$('#listrujukan').html(ruang);
					goTo(3)
					$('#profile').removeClass("hide")
					$('#loading').addClass("hide");
					$('#loading-proses').html("")
				}
            }
			else if(data.metaData.code==201){
				if(data.metaData.message=="Rujukan Tidak Ada" && formData["jenisantrian"]=="JKN"){
					$konfirmasi="\nApakah anda memiliki surat kontrol pasca rawat inap ?";
					swal({
						title: "Konfirmasi",
						text: data.metaData.message+$konfirmasi,
						type: "warning",
						showCancelButton: true,
						confirmButtonText: "Ya",
						cancelButtonText: "Tidak",
						closeOnConfirm: true,
						closeOnCancel: true
					},
					function(isConfirm) {
						if (isConfirm) {
							// Jika Tujuan kontrol ulang
							// alert(formData['nomor'])
							localStorage.setItem("jeniskunjungan", 3);
							localStorage.setItem("jenispasien", formData["jenisantrian"]);
							cekPeserta(formData["nomor"]);
							
						}else{
							// Jika Rujukan Internalkontrol
							// localStorage.setItem("jeniskunjungan", 2);
							$('#loading').addClass("hide");
							$('#loading-proses').html("")
							return false;
						}
					});
				}else{
					$konfirmasi="";
					if(formData['nomor'].length==8){
						$('#loading').addClass("hide");
						$('#loading-proses').html("")
						tampilkanPesan("error",data.metaData.message +" Silahkan Masukkan NIK");
					}else if(formData['nomor'].length==16){
						// Lanjutkan pengambilan antrian pasien baru umum
						// alert("Test")
						var img=`<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/male.png" alt="User profile picture">`;
						$('#img').html(img);

						$('.nama').html('Pasien Baru')
						$('.nomr').html('Belum Ada')
						$('.nik').html(formData['nomor'])
						$('.noKartu').html('Tidak ada')
						$('.tgllahir').html('Belum ada')
						$('.notelp').html('Belum Ada')
						
						localStorage.setItem("nomorkartu", '');
						localStorage.setItem("nik", formData['nomor']);
						localStorage.setItem("nohp",'081300000000');
						localStorage.setItem("norm", '10000000');
						localStorage.setItem("nama", 'Pasien Baru');
						localStorage.setItem("pasienbaru", 0);
						localStorage.setItem("nomorreferensi",'');
						localStorage.setItem("jeniskunjungan", 1);

						var poliklinik=data.poliklinik;
						var ruang="<div class='row'>";

						for (let i = 0; i < poliklinik.length; i++) {
							const e = poliklinik[i];
							// ruang+=`<div class='col-md-2 poli'>
							// <a href='#' onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')">
							// <img class="img img-responsive img-circle" src='`+base_url+e.icon+`' />
							// </a>
							// <a href="#"  onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')">
							// <h4 class='text-center'><b>`+e.kodepoli+`,</b>-`+e.namapoli+`</h4>
							// </a>
							// </div>`;
							ruang+=`<div class='col-md-2' class="text-center" style="padding:5px;">
							<div class="panel panel-danger bg-gray">
							<div class="panel-body text-center" style='padding:0px;min-height:80px;'>
							<h3 ><a href='#' onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')" style="color:#000;">
							<b>`+e.kodepoli+`,</b>-`+e.namapoli+`
							</a></h3>
							</div>
							</div>
							</div>
							`;
							var a=i+1;
							if(a%6==0) ruang+=`<div class='row'><div class='col-md-12'><hr></div></div>`
						}
						$('#step-header').html('Pilih Polklinik')
						$('#listrujukan').html(ruang);
						goTo(3)
						$('#profile').removeClass("hide")
						$('#loading').addClass("hide");
						$('#loading-proses').html("")
					}else{
						// cekPesertaJkn(formData["nomor"]);
						tampilkanPesan('warning',data.metaData.message)
						$('#loading').addClass("hide");
						$('#loading-proses').html("")
					}
					
				}

				// $('#nomorantrian').html(data.response.antreanadmisi + "/"+data.response.nomorantrean)
				// if(data.response.labelantrianpoli!="") var ap=data.response.nomorantrean;
				// else var ap=data.response.angkaantrean;
				// $('#estimasi').html("Nomor Antrian Anda Di poliklinik <b>"+data.response.namapoli+" Adalah "+ap+"</b> ")
				// $('#keterangan').html(data.response.keterangan)
				// $('#kodebooking').html(data.response.kodebooking)
				// $('#politujuan').html(data.response.namapoli)
				// $('#modalantrian').modal('show');
				$('#loading').addClass("hide");
				$('#loading-proses').html("")
			}else if(data.metaData.code==400){
				tampilkanPesan('error','Tidak bisa ambil antrian karena \n'+data.metaData.message);
				$('#loading').addClass("hide");
				$('#loading-proses').html("")
			}
			else if(data.metaData.code==504){
				tampilkanPesan('error','Tidak bisa akses ke server bpjs\n'+data.metaData.message);
				$('#loading').addClass("hide");
				$('#loading-proses').html("")
			}
            else{
				console.log(data.metaData.message)
				$('#loading').addClass("hide");
				$('#loading-proses').html("")
				if(data.metaData.message!="Couldn't resolve host 'apijkn-dev.bpjs-kesehatan.go.id'" && formData["jenisantrian"]=="JKN"){
					$konfirmasi="\nApakah anda memiliki surat kontrol pasca rawat inap ?";
					swal({
						title: "Konfirmasi",
						text: data.metaData.message+$konfirmasi,
						type: "warning",
						showCancelButton: true,
						confirmButtonText: "Ya",
						cancelButtonText: "Tidak",
						closeOnConfirm: true,
						closeOnCancel: true
					},
					function(isConfirm) {
						if (isConfirm) {
							// Jika Tujuan kontrol ulang
							// alert(formData['nomor'])
							localStorage.setItem("jeniskunjungan", 3);
							localStorage.setItem("jenispasien", formData["jenisantrian"]);
							cekPeserta(formData["nomor"]);
							
						}else{
							// Jika Rujukan Internalkontrol
							// localStorage.setItem("jeniskunjungan", 2);
							$('#loading').addClass("hide");
							$('#loading-proses').html("")
							return false;
						}
					});
				}else{
					$konfirmasi="";
					if(formData['nomor'].length==8){
						$('#loading').addClass("hide");
						$('#loading-proses').html("")
						tampilkanPesan("error",data.metaData.message +" Silahkan Masukkan NIK");
					}else if(formData['nomor'].length==16){
						// Lanjutkan pengambilan antrian pasien baru umum
						// alert("Test")
						var img=`<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/male.png" alt="User profile picture">`;
						$('#img').html(img);

						$('.nama').html('Pasien Baru')
						$('.nomr').html('Belum Ada')
						$('.nik').html(formData['nomor'])
						$('.noKartu').html('Tidak ada')
						$('.tgllahir').html('Belum ada')
						$('.notelp').html('Belum Ada')
						
						localStorage.setItem("nomorkartu", '');
						localStorage.setItem("nik", formData['nomor']);
						localStorage.setItem("nohp",'081300000000');
						localStorage.setItem("norm", '10000000');
						localStorage.setItem("nama", 'Pasien Baru');
						localStorage.setItem("pasienbaru", 1);
						localStorage.setItem("nomorreferensi",'');
						localStorage.setItem("jeniskunjungan", 1);

						var poliklinik=data.poliklinik;
						var ruang="";

						for (let i = 0; i < poliklinik.length; i++) {
							const e = poliklinik[i];
							// ruang+=`<div class='col-md-2 poli'>
							// <a href='#' onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')">
							// <img class="img img-responsive img-circle" src='`+base_url+e.icon+`' />
							// </a>
							// <a href="#"  onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')">
							// <h4 class='text-center'><b>`+e.kodepoli+`,</b>-`+e.namapoli+`</h4>
							// </a>
							// </div>`;

							ruang+=`<div class='col-md-3' class="text-center" style="padding:5px;">
							<div class="panel panel-danger bg-gray">
							<div class="panel-body text-center" style='padding:0px;min-height:80px;'>
							<h3 ><a href='#' onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')" style="color:#000;">
							<b>`+e.kodepoli+`,</b>-`+e.namapoli+`
							</a></h3>
							</div>
							
							</div>
							</div>
							`;
							var a=i+1;
							if(a%6==0) ruang+=`<div class='row'><div class='col-md-12'><hr></div></div>`
						}
						$('#step-header').html('Pilih Polklinik')
						$('#listrujukan').html(ruang);
						goTo(3)
						$('#profile').removeClass("hide")
						$('#loading').addClass("hide");
						$('#loading-proses').html("")
					}else{
						// cekPesertaJkn(formData["nomor"]);
						tampilkanPesan('warning',data.metaData.message)
						$('#loading').addClass("hide");
						$('#loading-proses').html("")
					}
					
				}
                
            }
            
        },
        error: function(xhr) { // if error occured
            tampilkanPesan('error',xhr.statusText+' - '+xhr.responseText)
            $('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
			$('#loading').addClass("hide");
			$('#loading-proses').html("")
			
        },
        complete: function() {
            $('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        }
    });
}

function cekPeserta(nokartu){
	$.ajax({
        url: base_url + "console/cekpeserta/" + nokartu,
        type: "GET",
        dataType: "JSON",
		beforeSend: function() {
            // setting a timeout
			$('#loading').removeClass("hide");
			$('#loading-proses').html("Proses Pencarian Rujukan ...");
            $('#btnCari').prop("disabled",true);
            $('#iconCari').removeClass('fa-search')
            $('#iconCari').addClass('fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function (data) {
            // var start=$('#start').val();
            // getpekerjaan(1);
            if(data.metaData.code==200){
                var d=data.response;
				localStorage.setItem("nomorkartu", d.peserta.noKartu);
				localStorage.setItem("nik", d.peserta.nik);
				localStorage.setItem("nohp",d.peserta.mr.noTelepon);
				localStorage.setItem("norm", d.peserta.mr.noMR);
				localStorage.setItem("nama", d.peserta.nama);
				localStorage.setItem("jnspasien", d.peserta.nama);
				localStorage.setItem("pasienbaru", 0);
				getRencanaKontrol(d.peserta.noKartu,'','');
            }else{
				tampilkanPesan("warning",data.metaData.message);
            }
        },
        error: function (jqXHR, textpekerjaan, errorThrown) {
            alert('Error')
        }
    });
}
function getDokter(kodepoli, namapoli=""){
	$.ajax({
        url: base_url + "console/jadwalpoli/" + kodepoli,
        type: "GET",
        dataType: "JSON",
		beforeSend: function() {
            // setting a timeout
			$('#loading').removeClass("hide");
			$('#loading-proses').html("Proses Pencarian Dokter ...");
            $('#btnCari').prop("disabled",true);
            $('#iconCari').removeClass('fa-search')
            $('#iconCari').addClass('fa-spinner spin')
        },
        success: function (data) {
            // var start=$('#start').val();
            // getpekerjaan(1);
			// console.log(data);
            if(data.metadata.code==200){
				// alert("I'm Here")
                var d=data.response;
				var tabel="";
				if(d.length>1){
					for (let i = 0; i < d.length; i++) {
						const e = d[i];
						tabel+=`<div class="col-md-3">
							<div class="kotakdokter">
								<div class='row'>
								<div class="col-md-12">
								<div class="jekel" id="img-dokterjekel">
								<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/dokter.png" alt="User profile picture">
								</div>
								</div>
								</div>
								<div class="row ">
									<div class="col-xs-12 text-center" id="v-namadokter">`+e.namadokter+`</div>
									<div class="col-xs-12 text-center" id="v-jadwal">`+e.jadwal+`</div>
									<div class="col-xs-12 text-center" id="v-pilih"><button class="btn btn-default btn-block" type="button" onclick="pilihDokter('`+e.kodedokter+`','`+e.namadokter+`','`+e.kapasitaspasien+`','`+e.jadwal+`')"><span class="fa fa-file"></span> Ambil Antrian</button></div>
								</div>
							</div>
						</div>`;
						$('#listrujukan').html(tabel)
					}
					$('#step-header').html('Pilih Dokter')
					// $('#listrujukan').html(ruang);
					goTo(3)
					$('#profile').removeClass("hide")
					$('#loading').addClass("hide");
					$('#loading-proses').html("")
					// $('#loading').addClass("hide");
					// $('#loading-proses').html("");
				}else{
					// alert("pilih Dokter")
					// localStorage.setItem("noSurat", data.response.kontrol.noSuratKontrol);
					// alert(d[0].jadwal);
					// return false;
					pilihDokter(d[0].kodedokter,d[0].namadokter,d[0].kapasitaspasien,d[0].jadwal);
				}
            }else{
				$('#loading').addClass("hide");
				$('#loading-proses').html("");
				$('#btnCari').prop("disabled",false);
				$('#iconCari').removeClass('fa-spinner spin')
				$('#iconCari').addClass('fa-search')
				if(data.metadata.message=="No Content"){
					tampilkanPesan("warning", "Jadwal Dokter Untuk Poli "+namapoli+" Tidak Tersedia Untuk Hari ini")
					
				}else{
					tampilkanPesan('warning',data.metadata.message);
				}
                localStorage.clear(); 
				goTo(1);
            }
        },
        error: function (jqXHR, textpekerjaan, errorThrown) {
            alert('Error')
			$('#loading').addClass("hide");
			$('#loading-proses').html("");
        }
    });
}
function pilihRujukan(noKunjungan,tglKunjungan,poliRujukankode,poliRujukannama,noKartu,nomr,faskes,ppkRujukan,ppkRujukanNama,diagAwal,diagnama){
	var url = base_url+"console/jmlsep"
	localStorage.setItem("asalRujukan", faskes);
	localStorage.setItem("tglRujukan", tglKunjungan);
	localStorage.setItem("noRujukan", noKunjungan);
	localStorage.setItem("ppkRujukan", ppkRujukan);
	localStorage.setItem("ppkRujukanNama", ppkRujukanNama);
	localStorage.setItem("diagAwal", diagAwal);
	localStorage.setItem("diagNama", diagnama);
	var formData = {
        noKunjungan:noKunjungan,
        tglKunjungan:tglKunjungan,
        poliRujukankode:poliRujukankode,
        poliRujukannama:poliRujukannama,
        faskes:faskes,
    };
    $.ajax({
        url : url,
        type: "POST",
        data : formData,
        dataType: 'JSON',
        beforeSend: function() {
            // setting a timeout
            $('#btn'+noKunjungan).prop("disabled",true);
			$('#loading').removeClass("hide");
			$('#loading-proses').html("Proses Pengecekan Kunjungan ...");
            // $(placeholder).addClass('loading');
        },
		
        success: function(data)
        {
            if(data.metaData.code==200){
				if(data.response.jumlahSEP > 0){
					// Jika Kunjungan ke 2 dst munculkan pilihan surta rujukan
					swal({
						title: "Konfirmasi",
						text: "Apakah anda akan berkunjunjung ke poliklinik "+poliRujukannama+"?",
						type: "warning",
						showCancelButton: true,
						confirmButtonText: "Ya",
						cancelButtonText: "Tidak",
						closeOnConfirm: true,
						closeOnCancel: true
					},
					function(isConfirm) {
						if (isConfirm) {
							// Jika Tujuan kontrol ulang
							localStorage.setItem("jeniskunjungan", 3);
							getRencanaKontrol(noKartu,poliRujukankode,poliRujukannama,noKunjungan);
						}else{
							// Jika Rujukan Internalkontrol
							localStorage.setItem("jeniskunjungan", 2);
							// getRujukanInternal(noKunjungan);
							var norm=localStorage.getItem('norm');
							getPoliklinik(norm,poliRujukankode)
						}
					});
				}else{
					// Jika Kunjungan pertama munculkan pilihan dokter berdasarkan  poli
					goTo(4);
					if(faskes==1) localStorage.setItem("jeniskunjungan", 1);
					else localStorage.setItem("jeniskunjungan", 4);
					localStorage.setItem("kodepoli", poliRujukankode);
					localStorage.setItem("namapoli", poliRujukannama);
					localStorage.setItem("nomorreferensi", noKunjungan);
					getDokter(poliRujukankode,poliRujukannama)
				}
            }else{
				$('#loading').addClass("hide");
				$('#loading-proses').html("");
                swal({
                    title: "Peringatan",
                    text: data.metaData.message,
                    type: "warning",
                    timer: 5000
                });
				
            }
        },
        error: function(xhr) { // if error occured
            tampilkanPesan('error',xhr.statusText+' - '+xhr.responseText)
			$('#loading').addClass("hide");
			$('#loading-proses').html("");
            $('#btn'+noKunjungan).prop("disabled",false);
        },
        complete: function() {
            $('#btn'+noKunjungan).prop("disabled",false);
        }
    });
}
function pilihDokter(kode,nama,kapasitaspasien,jadwal){
	localStorage.setItem("kodedokter", kode);
	localStorage.setItem("namadokter", nama);
	localStorage.setItem("kapasitaspasien", kapasitaspasien);
	localStorage.setItem("jadwal", jadwal);
	// alert(jadwal); 
	// return false;
	ambilAntrian();
}
function pilihPoli(kode,nama){
	localStorage.setItem("kodepoli", kode);
	localStorage.setItem("namapoli", nama);
	getDokter(kode,nama);
}

function getRencanaKontrol(noKartu,poliRujukankode,poliRujukanNama=''){
	var url = base_url+"console/rencanakontrol";
	
	var formData = {
        noKartu : noKartu,
		poliAsalRujukan : poliRujukankode,
		poliAsalRujukanNama : poliRujukanNama,
    };
    $.ajax({
        url : url,
        type: "POST",
        data : formData,
        dataType: 'JSON',
        beforeSend: function() {
            // setting a timeout
			$('#loading').removeClass("hide");
			$('#loading-proses').html("Proses Pencarian Rencana Kontrol ...");
            $('#btnCari').prop("disabled",true);
            $('#iconCari').removeClass('fa-search')
            $('#iconCari').addClass('fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.metaData.code==200){
				localStorage.setItem("nomorreferensi", data.response.kontrol.noSuratKontrol);
				localStorage.setItem("kodedokter", data.response.kontrol.kodeDokter);
				localStorage.setItem("namadokter", data.response.kontrol.namaDokter);
				localStorage.setItem("kodepoli", data.response.kontrol.poliTujuan);
				localStorage.setItem("namapoli", data.response.kontrol.namaPoliTujuan);
				localStorage.setItem("noSurat", data.response.kontrol.noSuratKontrol);
				localStorage.setItem("kodeDPJP", data.response.kontrol.kodeDokter);
				localStorage.setItem("dpjpLayan", data.response.kontrol.kodeDokter);
				// $('#antrian').modal("show");
				
				localStorage.setItem("keterangan", '');

				var sekarang=$('#sekarang').val();
				getDokter(data.response.kontrol.poliTujuan,data.response.kontrol.namaPoliTujuan);
				// if(data.response.kontrol.tglRencanaKontrol==sekarang){
				// 	ambilAntrian(noKunjungan);
				// }else{
				// 	getDokter(data.response.kontrol.poliTujuan,data.response.kontrol.namaPoliTujuan);
				// }
				
				// ambilAntrian(noKunjungan);
			}else{
				
				// ambilAntrian(noKunjungan);
				swal({
					title: data.metaData.message,
					text: "Apakah anda akan melanjutkan ambil antrian ke poliklinik "+poliRujukanNama+"?",
					type: "warning",
					showCancelButton: true,
					confirmButtonText: "Ya",
					cancelButtonText: "Tidak",
					closeOnConfirm: true,
					closeOnCancel: true
				},
				function(isConfirm) {
					if (isConfirm) {
						// Jika Tujuan kontrol ulang
						localStorage.setItem("nomorreferensi", '-');
						localStorage.setItem("kodedokter", '-');
						localStorage.setItem("namadokter", '-');
						localStorage.setItem("jadwal", '-');
						localStorage.setItem("kodepoli",poliRujukankode);
						localStorage.setItem("namapoli",poliRujukanNama);
						localStorage.setItem("jeniskunjungan", 3);
						localStorage.setItem("pendingbooking", 1);
						localStorage.setItem("keterangan", data.metaData.message);
						getDokter(poliRujukankode,poliRujukanNama);
						ambilAntrian()
						// location.reload();
					}else{
						// Jika Rujukan Internalkontrol
						// localStorage.setItem("jeniskunjungan", 2);
						goTo(1);
						localStorage.clear(); 
						// tampilkanPesan("error",data.metaData.message);
						$('#loading').addClass("hide");
						$('#loading-proses').html("");
					}
				});

				
				
				// goTo(1);
				
			}
        },
        error: function(xhr) { // if error occured
            tampilkanPesan('error',xhr.statusText+' - '+xhr.responseText)
			$('#loading').addClass("hide");
			$('#loading-proses').html("");
            // $('#btn'+noKunjungan).prop("disabled",false);
        },
        complete: function() {
            // $('#btn'+noKunjungan).prop("disabled",false);
			$('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        }
    });
}

function ambilAntrian(noKunjungan=""){
	var nomorkartu = localStorage.getItem("nomorkartu");
	var nik = localStorage.getItem("nik");
	var nohp = localStorage.getItem("nohp");
	var kodepoli = localStorage.getItem("kodepoli");
	var namapoli = localStorage.getItem("namapoli");
	var norm = localStorage.getItem("norm");
	var pasienbaru = localStorage.getItem("pasienbaru");
	var jeniskunjungan = localStorage.getItem("jeniskunjungan");
	var jenispasien = localStorage.getItem("jenispasien");
	var kodedokter = localStorage.getItem("kodedokter");
	var namadokter = localStorage.getItem("namadokter");
	var nomorreferensi = localStorage.getItem("nomorreferensi");
	var kapasitaspasien = localStorage.getItem("kapasitaspasien");
	var jadwal = localStorage.getItem("jadwal");
	var nama = localStorage.getItem("nama");
	var pendingbooking = localStorage.getItem("pendingbooking");
	var keterangan = localStorage.getItem("keterangan");
	// alert(jadwal)
	// return false;
	var formData = {
        jenispasien:jenispasien,
        nomorkartu:nomorkartu,
        nik:nik,
        nohp:nohp,
        kodepoli:kodepoli,
        namapoli:namapoli,
        pasienbaru:pasienbaru,
        norm:norm,
        kodedokter:kodedokter,
        namadokter:namadokter,
        jeniskunjungan:jeniskunjungan,
        nomorreferensi:nomorreferensi,
        kapasitaspasien:kapasitaspasien,
        jadwal:jadwal,
        nama:nama,
		asalRujukan:localStorage.getItem("asalRujukan"),
		cob:localStorage.getItem("cob"),
		diagAwal:localStorage.getItem("diagAwal"),
		diagNama:localStorage.getItem("diagNama"),
		klsRawatHak:localStorage.getItem("klsRawatHak"),
		klsRawatHakKeterangan:localStorage.getItem("klsRawatHakKeterangan"),
		noRujukan:localStorage.getItem("noRujukan"),
		ppkRujukan:localStorage.getItem("ppkRujukan"),
		ppkRujukanNama:localStorage.getItem("ppkRujukanNama"),
		tglRujukan:localStorage.getItem("tglRujukan"),
		tujuan:localStorage.getItem("tujuan"),
		pendingbooking:pendingbooking,
		keterangan:keterangan,
    };
	console.clear();
	console.log(formData);
	// alert(jadwal)
	// return false;
	var url = base_url +"console/ambilantrian";
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data : formData,
        dataType: 'JSON',
		beforeSend: function() {
            // setting a timeout
			$('#loading').removeClass("hide");
			$('#loading-proses').html("Proses Pengambilan Antrian ...")
            $('#btnCari').prop("disabled",true);
            $('#iconCari').removeClass('fa-search')
            $('#iconCari').addClass('fa-spinner spin')
			$('#btn'+noKunjungan).prop("disabled",true);
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.metadata.code==200){
				if(data.response.antreanadmisi!=null) {
					if(data.response.nomorantrean==''){
						$('#antriantitle').html("Antrian Admisi")
						$('#nomorantrian').html(data.response.antreanadmisi)
					}else{
						if(data.response.taskid < 3){
							$('#antriantitle').html("Antrian Admisi / Poli")
							$('#nomorantrian').html(data.response.antreanadmisi + "/"+data.response.nomorantrean)
						}else{
							$('#antriantitle').html("Antrian Poli")
							$('#nomorantrian').html(data.response.nomorantrean)
						}
						// $('#antriantitle').html("Antrian Admisi / Poli")
						// $('#nomorantrian').html(data.response.antreanadmisi + "/"+data.response.nomorantrean)
					}
					// $('#antriantitle').html("Antrian Admisi / Poli")
					// $('#nomorantrian').html(data.response.antreanadmisi + "/"+data.response.nomorantrean)
				}else {
					$('#antriantitle').html("Antrian Poli")
					$('#nomorantrian').html(data.response.nomorantrean)
				}
				// 
				if(data.response.labelantrianpoli!="") var ap=data.response.labelantrianpoli+"."+data.response.angkaantrean;
				else var ap=data.response.angkaantrean;
				if(data.register.no_jaminan==''){
					// jika tidak ada SEP
					if(data.register.id_daftar!='')
					var register='No Registrasi : '+data.register.id_daftar;
					else var register='';
				}else{
					var register='No Registrasi : '+data.register.id_daftar+"<br>No Sep : "+data.register.no_jaminan;
				}
				$('#nojaminan').html(register)
				$('#keterangan').html(data.response.keterangan)
				var img='<img src="'+base_url+"b39?kode="+data.response.kodebooking+'" />'
				$('#kodebooking').html(img)
				$('#politujuan').html(data.response.namapoli)
				// $('#modalantrian').modal('show');
				localStorage.clear(); 
				
				goTo(1);
				cetakAntrian()

            }else if(data.metadata.code==205){
				// $('#antrian').modal("show");
				// alert(data.response.antreanadmisi)
				// $('#nomorantrian').html(data.response.antreanadmisi + "/"+data.response.nomorantrean)
				if(data.response.antreanadmisi!=null) {
					if(data.response.nomorantrean==''){
						$('#antriantitle').html("Antrian Admisi")
						$('#nomorantrian').html(data.response.antreanadmisi)
					}else{
						if(data.response.taskid < 3){
							$('#antriantitle').html("Antrian Admisi / Poli")
							$('#nomorantrian').html(data.response.antreanadmisi + "/"+data.response.nomorantrean)
						}else{
							$('#antriantitle').html("Antrian Poli")
							$('#nomorantrian').html(data.response.nomorantrean)
						}
						// $('#antriantitle').html("Antrian Admisi / Poli")
						// $('#nomorantrian').html(data.response.antreanadmisi + "/"+data.response.nomorantrean)
					}
					
					// $('#antriantitle').html("Antrian Admisi / Poli")
					// $('#nomorantrian').html(data.response.antreanadmisi + "/"+data.response.nomorantrean)
				}else {
					$('#antriantitle').html("Antrian Poli")
					$('#nomorantrian').html(data.response.nomorantrean)
				}
				if(data.response.labelantrianpoli!="") var ap=data.response.labelantrianpoli+"."+data.response.angkaantrean;
				else var ap=data.response.angkaantrean;
				if(data.register.no_jaminan==''){
					// jika tidak ada SEP
					if(data.register.id_daftar!='')
					var register='No Registrasi : '+data.register.id_daftar;
					else var register='';
				}else{
					var register='No Registrasi : '+data.register.id_daftar+"<br>No Sep : "+data.register.no_jaminan;
				}
				$('#nojaminan').html(register)
				$('#keterangan').html(data.response.keterangan)
				var img='<img src="'+base_url+"b39?kode="+data.response.kodebooking+'" />'
				$('#kodebooking').html(img)
				$('#politujuan').html(data.response.namapoli)
				$('#namapasien').html(data.response.nama)
				// $('#modalantrian').modal('show');
				
				localStorage.clear(); 
				goTo(1);
				cetakAntrian()
			}else{
				console.clear();
				alert(data.metadata.message)
                swal({
                    title: "Peringatan",
                    text: data.metadata.message,
                    type: "warning",
                    timer: 5000
                });
				localStorage.clear(); 
				goTo(1);
            }
        },
        error: function(xhr) { // if error occured
            tampilkanPesan('error',xhr.statusText+' - '+xhr.responseText)
            $('#btn'+noKunjungan).prop("disabled",false);
			$('#loading').addClass("hide");
			$('#loading-proses').html("")
        },
        complete: function() {
            $('#btn'+noKunjungan).prop("disabled",false);
			$('#loading').addClass("hide");
			$('#loading-proses').html("")
			$('#btnCari').prop("disabled",false);
            $('#iconCari').addClass('fa-search')
            $('#iconCari').removeClass('fa-spinner spin')
        }
    });

}

function getPoliklinik(nomr,kodepoli){
	$.ajax({
        url: base_url + "console/poliklinik/" + nomr+"/"+kodepoli,
        type: "GET",
        dataType: "JSON",
		beforeSend: function() {
            // setting a timeout
			$('#loading').removeClass("hide");
			$('#loading-proses').html("Proses Pencarian Rujukan Internal ...");
            $('#btnCari').prop("disabled",true);
            $('#iconCari').removeClass('fa-search')
            $('#iconCari').addClass('fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function (data) {
            // var start=$('#start').val();
            // getpekerjaan(1);
            if(data.metadata.code==200){
				if(data.response.jns_kelamin=="1") var img=`<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/male.png" alt="User profile picture">`;
					else  var img=`<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/female.png" alt="User profile picture">`;
					$('#img').html(img);

					$('.nama').html(data.response.nama)
					$('.nomr').html(data.response.nomr)
					$('.nik').html(data.response.no_ktp)
					$('.noKartu').html(data.response.no_bpjs)
					$('.tgllahir').html(data.response.tgl_lahir)
					$('.notelp').html(data.response.no_hp)
					localStorage.setItem("nik", data.response.no_ktp);
					localStorage.setItem("nohp", data.response.no_hp);
					localStorage.setItem("norm", data.response.nomr);
					localStorage.setItem("nama", data.response.nama);
					localStorage.setItem("pasienbaru", 0);
					localStorage.setItem("nomorreferensi",data.rujukan.ckir);
					localStorage.setItem("jeniskunjungan", 2);

					var poliklinik=data.poliklinik;
					var ruang="<div class='row'>";
					var jml=0;
					for (let i = 0; i < poliklinik.length; i++) {
						const e = poliklinik[i];
						jml++;
						// ruang+=`<div class='col-md-2' class="text-center">
						// <a href='#' onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')">
						// <img class="img img-responsive img-circle" src='`+base_url+e.icon+`' />
						// </a>
						// <a href="#"class='btn btn-default btn-block text-center' onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')">
						// <b>`+e.kodepoli+`,</b>-`+e.namapoli+`
						// </a>
						// </div>`;
						// ruang+=`<div class='col-md-2' class="text-center" style="padding:5px;">
						// <div class="panel panel-danger">
						// <div class="panel-body text-center" style='padding:0px;'>
						// <a href='#' onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')">
						// <img class="img img-circle" src='`+base_url+e.icon+`' /><br>
						// <b>`+e.kodepoli+`,</b>-`+e.namapoli+`
						// </a>
						// </div>
						
						// </div>
						// </div>
						// `;
						ruang+=`<div class='col-md-3' class="text-center" style="padding:5px;">
						<div class="panel panel-danger bg-gray">
						<div class="panel-body text-center" style='padding:0px;min-height:80px;'>
						<h3 ><a href='#' onclick="pilihPoli('`+e.kodepoli+`','`+e.namapoli+`')" style="color:#000;">
						<b>`+e.kodepoli+`,</b>-`+e.namapoli+`
						</a></h3>
						</div>
						
						</div>
						</div>
						`;
						if(jml%4==0){
							ruang+=`</div><div class='row'>`;
						}
					}
					ruang+=`</div>`;
					$('#step-header').html('Pilih Polklinik')
					$('#listrujukan').html(ruang);
					goTo(3)
					$('#profile').removeClass("hide")
					$('#loading').addClass("hide");
					$('#loading-proses').html("")
            }else{
				alert(data.metadata.message)
				console.clear();
				console.log(data.metadata.message)
				// swal({
				// 	title: 'Peringatan',
				// 	text: data.metadata.message,
				// 	type: "error",
				// 	confirmButtonColor: "#034a03",
				// 	confirmButtonText: "OK"
				// });
				tampilkanPesan('error',data.metadata.message)
                // tampilkanPesan('error',data.metadata.message);
				// tampilkanPesan("error","test");
				// swal({
                //     title: "Peringatan",
                //     text: data.metadata.message,
                //     type: "warning",
                //     timer: 5000
                // });
				$('#loading').addClass("hide");
				$('#loading-proses').html("");
				goTo(1);
            }
        },
        error: function (jqXHR, textpekerjaan, errorThrown) {
            alert('Error')
			$('#loading').addClass("hide");
			$('#loading-proses').html("");
			$('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        },
		complete: function() {
			$('#loading').addClass("hide");
			$('#loading-proses').html("")
			$('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        }
    });
}

function getRujukanInternal(norujukan){
	$.ajax({
        url: base_url + "console/rujukaninternal/" + norujukan,
        type: "GET",
        dataType: "JSON",
		beforeSend: function() {
            // setting a timeout
			$('#loading').removeClass("hide");
			$('#loading-proses').html("Proses Pencarian Rujukan Internal ...");
            $('#btnCari').prop("disabled",true);
            $('#iconCari').removeClass('fa-search')
            $('#iconCari').addClass('fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function (data) {
            // var start=$('#start').val();
            // getpekerjaan(1);
            if(data.metadata.code==200){
				// localStorage.setItem("nomorreferensi", data.response.kontrol.noSuratKontrol);
				// localStorage.setItem("kodedokter", data.response.kontrol.kodeDokter);
				// localStorage.setItem("namadokter", data.response.kontrol.namaDokter);
				// localStorage.setItem("kodepoli", data.response.kontrol.poliTujuan);
				// localStorage.setItem("namapoli", data.response.kontrol.namaPoliTujuan);
				// // $('#antrian').modal("show");
				// ambilAntrian(noKunjungan);
				var rujukan='';
				var result=data.response;
				if(result.length==1){
					var e=result[0];
					pilihRujukanInternal(e.norujukaninternal,e.kodedokterjkn,e.kode_subspesialis_tujuan,e.ruangtujuan);
				}else{
					for (let i = 0; i < result.length; i++) {
						const e = result[i];
						rujukan+=`
						<div class="kotak">
							<div class="col-md-12">
								<table class="table">
									<tr>
									<td rowspan="6" id="img">
									<img class="profile-user-img img-responsive img-circle" src="`+base_url+`assets/images/poliklinik.png" alt="User profile picture">
									<br>
									<button class='btn btn-danger btn-block' type='button' onclick="pilihRujukanInternal('`+e.norujukaninternal+`','`+e.kodedokterjkn+`','`+e.kode_subspesialis_tujuan+`','`+e.ruangtujuan+`')"><span class='fa fa-print'></span> Ambil Antrean</button>
									</td>
									</tr>
									<tr>
										<td><i>No Rujukan</i></td>
										<td id="noRujukan"><b>`+e.norujukaninternal+`</b></td>
									</tr>
									<tr>
										<td><i>Tgl Rujukan</i></td>
										<td id="tglrujukan"><b>`+e.tglkonsul+`</b></td>
									</tr>
									<tr>
										<td><i>Asal Rujukan</i></td>
										<td id="asalRujukan"><b>`+e.kode_subspesialis_asal+`-<i>`+e.ruangasal+`</i></b></td>
									</tr>
									<tr>
										<td><i>Poli Rujukan</i></td>
										<td id="poliRujukan"><b>`+e.kode_subspesialis_tujuan+`-<i>`+e.ruangtujuan+`</i></b></td>
									</tr>
									<tr>
										<td><i>Perujuk</i></td>
										<td><b>Rujukan Internal</b></td>
									</tr>
								</table>
							</div>
						</div>`;
					}
				}
				// alert("rujuk Internal")
				$('#listrujukan').html(rujukan)
				$('#loading').addClass("hide");
				$('#loading-proses').html("");
            }else{
				alert(data.metadata.message)
				console.clear();
				console.log(data.metadata.message)
				// swal({
				// 	title: 'Peringatan',
				// 	text: data.metadata.message,
				// 	type: "error",
				// 	confirmButtonColor: "#034a03",
				// 	confirmButtonText: "OK"
				// });
				tampilkanPesan('error',data.metadata.message)
                // tampilkanPesan('error',data.metadata.message);
				// tampilkanPesan("error","test");
				// swal({
                //     title: "Peringatan",
                //     text: data.metadata.message,
                //     type: "warning",
                //     timer: 5000
                // });
				$('#loading').addClass("hide");
				$('#loading-proses').html("");
				goTo(1);
            }
        },
        error: function (jqXHR, textpekerjaan, errorThrown) {
            alert('Error')
			$('#loading').addClass("hide");
			$('#loading-proses').html("");
			$('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        },
		complete: function() {
			$('#loading').addClass("hide");
			$('#loading-proses').html("")
			$('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        }
    });
}
// function pilihDokter(kode,nama,kapasitaspasien,jadwal){
// 	localStorage.setItem("kodedokter", kode);
// 	localStorage.setItem("namadokter", nama);
// 	localStorage.setItem("kapasitaspasien", kapasitaspasien);
// 	localStorage.setItem("jadwal", jadwal);
// 	ambilAntrian();
// }
function pilihRujukanInternal(norujuk,kodedokter,kodepoli,namapoli){
	localStorage.setItem("nomorreferensi", norujuk);
	localStorage.setItem("kodedokter", kodedokter);
	localStorage.setItem("kodepoli", kodepoli);
	localStorage.setItem("namapoli", namapoli);
	getDokter(kodepoli, namapoli)
	// ambilAntrian();
}
function goTo(idx){
	if(idx==1) $('#nomor').val("");
	$('.step').addClass("hide");
	$('#step'+idx).removeClass("hide");
	localStorage.setItem("step", idx);
}

function cetakAntrian()
{
	var printContents = document.getElementById('cetakantrian').innerHTML;
	var originalContents = document.body.innerHTML;
	document.body.innerHTML = printContents;
	window.print();
	document.body.innerHTML = originalContents;
}

function ambilAntrianRanap(){
	$.ajax({
        url: base_url + "console/antrianranap",
        type: "GET",
        dataType: "JSON",
		beforeSend: function() {
            // setting a timeout
			$('#loading').removeClass("hide");
			$('#loading-proses').html("Proses Pengambilan Antrian Rawat Inap ...");
            $('#btnCari').prop("disabled",true);
            $('#iconCari').removeClass('fa-search')
            $('#iconCari').addClass('fa-spinner spin')
        },
        success: function (data) {
			$('#antriantitle').html("Antrian Admisi")
			$('#nomorantrian').html(data.response.noAntrian)
			$('#keterangan').html('Silahkan Menunggu No Antrian anda dipanggil')
			$('#politujuan').html('Rawat Inap')
            cetakAntrian()
        },
        error: function (jqXHR, textpekerjaan, errorThrown) {
            alert('Error')
			$('#loading').addClass("hide");
			$('#loading-proses').html("");
			$('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        },
		complete: function() {
			$('#loading').addClass("hide");
			$('#loading-proses').html("")
			$('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        }
    });
}
function ambilAntrianPenunjang(){
	$.ajax({
        url: base_url + "console/antrianpenunjang",
        type: "GET",
        dataType: "JSON",
		beforeSend: function() {
            // setting a timeout
			$('#loading').removeClass("hide");
			$('#loading-proses').html("Proses Pengambilan Antrian Rawat Inap ...");
            $('#btnCari').prop("disabled",true);
            $('#iconCari').removeClass('fa-search')
            $('#iconCari').addClass('fa-spinner spin')
        },
        success: function (data) {
			$('#antriantitle').html("Antrian Admisi")
			$('#nomorantrian').html(data.response.noAntrian)
			$('#keterangan').html('Silahkan Menunggu No Antrian anda dipanggil')
			$('#politujuan').html('Penunjang')
            cetakAntrian()
        },
        error: function (jqXHR, textpekerjaan, errorThrown) {
            alert('Error')
			$('#loading').addClass("hide");
			$('#loading-proses').html("");
			$('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        },
		complete: function() {
			$('#loading').addClass("hide");
			$('#loading-proses').html("")
			$('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        }
    });
}