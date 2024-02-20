<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Console extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->model("Console_model");
		$this->load->model("vclaim_model");
	}
    function index(){
		$data=array();
		$x['content']		= $this->load->view('view_console',$data,true);
		$x["title"]			="CONSOLE ANTRIAN ".COMPANY_NAME;
		$this->load->view('view_display',$x);
    }
    function caripasien(){
		$nomor=$this->input->post("nomor");
		$jenisantrian=$this->input->post("jenisantrian");
		if($jenisantrian=="JKN"){
			// Jika antrian jkn
			if(strlen($nomor)!=13){
				$response=json_encode(array(
					"metaData"=>array(
						"code"=>203,
						"message"=>"Nomor Kartu Yang Anda Masukkan Tidak Valid",
						
					)
				));
			}else{
				$sekarang=date('Y-m-d');
				$finger=bridgingbpjs("SEP/FingerPrint/Peserta/".$nomor."/TglPelayanan/".$sekarang,"GET","","vclaim");
				if(isJSON($finger)){
					$arr=json_decode($finger);
					if($arr->metaData->code==200){
						if($arr->response->kode==1){
							// echo $finger; exit;
							$fktp=bridgingbpjs("Rujukan/List/Peserta/".$nomor,"GET","","vclaim");
							// echo $fktp; exit;
							if(isJSON($fktp)){
								$arr=json_decode($fktp);
								if($arr->metaData->code==200) {
									$metaData=$arr->metaData;
									// $faskes1=$arr->response;
									$nomr=$arr->response->rujukan[0]->peserta->mr->noMR;
									if($nomr==null){
										// echo "pasien baru"; exit;
										$pasien=$this->Console_model->getPasienByNik($arr->response->rujukan[0]->peserta->nik);
										if(empty($pasien)) $pasienbaru=1;
										else $pasienbaru=0;
										// echo $pasienbaru; exit;
									}else {
										$pasienbaru=0;
										$pasien=array();
									}
									foreach ($arr->response->rujukan as $r ) {
										$tgl1 = new DateTime($r->tglKunjungan);
										$sekarang=date('Y-m-d');
										$tgl2 = new DateTime($sekarang);
										$jarak = $tgl2->diff($tgl1);
										if($jarak->days<=90){
											$faskes1["rujukan"][]=$r;
										}else{
											break;
										}
									}

									$fkrtl=bridgingbpjs("Rujukan/RS/List/Peserta/".$nomor,"GET","","vclaim");
									$arr2=json_decode($fkrtl);
									if($arr2->metaData->code==200){
										// $faskes2=$arr2->$response;
										foreach ($arr2->response->rujukan as $r ) {
											$tgl1 = new DateTime($r->tglKunjungan);
											$sekarang=date('Y-m-d');
											$tgl2 = new DateTime($sekarang);
											$jarak = $tgl2->diff($tgl1);
											if($jarak->days<=90){
												$faskes2["rujukan"][]=$r;
											}else{
												break;
											}
										}
									}else $faskes2="";
									if(empty($faskes1)) $faskes1="";
									if(!empty($faskes1) || !empty($faskes2)){
										$response=json_encode(array(
											'metaData'=>$metaData,
											'faskes1'=>$faskes1,
											'faskes2'=>$faskes2,
											'pasienbaru'=>$pasienbaru,
											'jnsKunjungan'=>'Kontrol Ulang',
											'response'=>$arr->response
										));
									}else{
										$response=json_encode(array(
											'metaData'=>array(
												'code'=>201,
												'message'=>'Tidak ada rujukan yang masih aktif'
											)
										));
									}
									
								}
								else {
									$faskes1="";
									$fkrtl=bridgingbpjs("Rujukan/RS/List/Peserta/".$nomor,"GET","","vclaim");
									// echo $fkrtl; exit;
									$arr2=json_decode($fkrtl);
									// print_r($arr2); exit;
									
									if($arr2->metaData->code==200){
										$nomr=$arr2->response->rujukan[0]->peserta->mr->noMR;
										if($nomr==null){
											$pasien=$this->Console_model->getPasienByNik($arr2->response->rujukan[0]->peserta->nik);
											if(empty($pasien)) $pasienbaru=1;
											else $pasienbaru=0;
										}else {
											$pasienbaru=0;
											$pasien=array();
										}
										// echo "OK"; exit;
										// $faskes2=$arr2->response;
										foreach ($arr2->response->rujukan as $r ) {
											$tgl1 = new DateTime($r->tglKunjungan);
											$sekarang=date('Y-m-d');
											$tgl2 = new DateTime($sekarang);
											$jarak = $tgl2->diff($tgl1);
											if($jarak->days<=90){
												$faskes2["rujukan"][]=$r;
											}else{
												break;
											}
										}
										// print_r($arr2->response); exit;
										$response=json_encode(array(
											'metaData'=>$arr2->metaData,
											'faskes1'=>$faskes1,
											'faskes2'=>$faskes2,
											'jnsKunjungan'=>'Kontrol Ulang',
											'rujukan'=>$arr2->response,
											'pasienbaru'=>$pasienbaru,
											'pasien'=>$pasien
										));
									}else{
										$response=$fkrtl;
										// Cek Post ranap

									}
								}
							}else{
								$response=json_encode(array(
									"metaData"=>array(
										"code"=>504,
										"message"=>$fktp,
										
									)
								));
							}
						}else{
							$response=json_encode(array(
								"metaData"=>array(
									"code"=>400,
									"message"=>$arr->response->status,
									
								)
							));
						}
					}else{
						$response=json_encode(array(
							"metaData"=>array(
								"code"=>504,
								"message"=>$finger,
								
							)
						));
					}
				}else{
					$response=json_encode(array(
						"metaData"=>array(
							"code"=>504,
							"message"=>$finger,
							
						)
					));
				}
				
			}
		}else if($jenisantrian=="NON JKN"){
			if(strlen($nomor)<=10){
				// Cari Pasien Berdasarkan nomr
				$pasien=$this->Console_model->getPasienByNomr($nomor);
				if(!empty($pasien)){
					$response=json_encode(array(
						'metaData'=>array(
							'code'=>200,
							'message'=>"OK"
						),
						'response'=>$pasien,
						'poliklinik'=>$this->Console_model->getPoliklinikBuka()
					));
				}else{
					$response=json_encode(array(
						'metaData'=>array(
							'code'=>203,
							'message'=>"pasien Tidak Ditemukan"
						)
					));
				}
			}elseif(strlen($nomor)==13){
				// cari pasien berdasarkan Nokartu
				$pasien=$this->Console_model->getPasienByNoka($nomor);
				if(!empty($pasien)){
					$response=json_encode(array(
						'metaData'=>array(
							'code'=>200,
							'message'=>"OK"
						),
						'response'=>$pasien,
						'poliklinik'=>$this->Console_model->getPoliklinikBuka()
					));
				}else{
					$response=json_encode(array(
						'metaData'=>array(
							'code'=>203,
							'message'=>"Pasien Tidak Ditemukan"
						),
						'poliklinik'=>$this->Console_model->getPoliklinikBuka()
					));
				}
			}elseif(strlen($nomor)==16){
				// Cari Pasien Berdasarkan NIK
				$pasien=$this->Console_model->getPasienByNik($nomor);
				if(!empty($pasien)){
					$response=json_encode(array(
						'metaData'=>array(
							'code'=>200,
							'message'=>"OK"
						),
						'response'=>$pasien,
						'poliklinik'=>$this->Console_model->getPoliklinikBuka()
					));
				}else{
					$response=json_encode(array(
						'metaData'=>array(
							'code'=>203,
							'message'=>"pasien Tidak Ditemukan"
						),
						'poliklinik'=>$this->Console_model->getPoliklinikBuka()
					));
				}
			}else{
				$response=json_encode(array(
					'metaData'=>array(
						'code'=>203,
						'message'=>"Nomr/Nik/Noka Tidak valid"
					)
				));
			}
		}else if($jenisantrian=="CHECKIN"){
			$booking=$this->Console_model->getBooking($nomor);
			// print_r($booking); exit;
			$norujukan='';
			$ppkRujukan='';
			$ppkRujukanNama='';
			$kodeicd='';
			$icd='';
			$ok=0;
			if(!empty($booking)){
				if($booking['pasienbaru']==1){
					$wt=strtotime(date('Y-m-d H:i:s'))*1000;
					$task=array(
						'kodebooking'=>$booking['kodebooking'],
						'taskid'=>1,
						'waktu'=>$wt
					);
					$tsk=bridgingbpjs("antrean/updatewaktu","POST",json_encode($task),"antrian");
					// echo $tsk; exit;
					$arr=json_decode($tsk);
					if($arr->metadata->code==200){
						$response=json_encode(array(
							'metaData'=>$arr->metadata,
							'response'=>$booking,
							'estimasi'=>estimasi($booking['estimasidilayani']),
							"request"=>$booking,
							"sep"=>array(),
							'register'=>array()
						));
					}else{
						if($arr->metadata->message=="Kode Booking tidak ditemukan"){
							// $jampraktek=str_pad($jadwal,11,"0",STR_PAD_LEFT);
							// $kuotajkn=(80*$kapasitaspasien)/100;
							// $kuotanonjkn=(20*$kapasitaspasien)/100;
							
							// $waktu_awal        =strtotime(date('Y-m-d')." ".$jp[0].":00");
							// $waktu_akhir    =strtotime(date('Y-m-d')." ".$jp[1].":00"); 
							// $selisih=($waktu_akhir-$waktu_awal)/60; //dalam menit
							// $spm=$selisih/$kapasitaspasien;
							// $jmlpasien=$this->Console_model->countPasien($kodepoli,$kodedokter,$tgl);
							// $angkaantrean=(empty($jmlpasien->angkaantrean)?1:$jmlpasien->angkaantrean+1);
							// // $kodebooking="";
							// $labelantrianpoli=getLabeleAntrianPoli($kodepoli);
							// $nomorantrean=(empty($labelantrianpoli)?$angkaantrean:$labelantrianpoli .".".$angkaantrean);
							
							// $spm_ms=$spm*60*1000; //Convert SPM (Standar Pelayanan Minimal) dari menit ke milisecond
							
							// $waktutunggu_ms=($angkaantrean*$booking['spm_ms'])-$spm_ms; 
							// $jp=explode("-",$booking['jampraktek']);
							// $jm=date('Y-m-d') ." " .$jp[0].":00";
							// $jm_ms=strtotime($jm)*1000; 
							// $estimasidilayani=$jm_ms+$waktutunggu_ms;
							// $sisakuotajkn=empty($jmlpasien->jkn)?$kuotajkn:$kuotajkn-$jmlpasien->jkn;
							// $sisakuotanonjkn=empty($jmlpasien->nonjkn)?$kuotanonjkn:$kuotanonjkn-$jmlpasien->nonjkn;
							
							$book=array(
								'kodebooking'=>$booking['kodebooking'],
								'jenispasien'=>$booking['jenispasien'],
								'nomorkartu'=>$booking['nomorkartu'], //v
								'nik'=>$booking['nik'],//v
								'nohp'=>$booking['nohp'],//v
								'kodepoli'=>$booking['kodepoli'],//v
								'namapoli'=>$booking['namapoli'],//v
								'pasienbaru'=>$booking['pasienbaru'],
								'norm'=>$booking['norm']==null?'null':$booking['norm'],
								'tanggalperiksa'=>date('Y-m-d'),
								'kodedokter'=>$booking['kodedokter'],
								'namadokter'=>$booking['namadokter'],
								'jampraktek'=>$booking['jampraktek'],
								'jeniskunjungan'=>$booking['jeniskunjungan'],
								'nomorreferensi'=>$booking['nomorreferensi'],
								'nomorantrean'=>$booking['nomorantrean'],//generate
								'angkaantrean'=>$booking['angkaantrean'], //Generate
								'estimasidilayani'=>$booking['estimasidilayani'], //generate
								'sisakuotajkn'=>$booking['sisakuotajkn'], //generate
								'kuotajkn'=>$booking['kuotajkn'], //generate
								'sisakuotanonjkn'=>$booking['sisakuotanonjkn'], //generate
								'kuotanonjkn'=>$booking['kuotanonjkn'], //generate
								'keterangan'=>'Diharapkan hadir minimal 30 menit sebelum estimasi waktu layan', //generate
							);
							// echo json_encode($book);exit;
							$response=bridgingbpjs("antrean/add","POST",json_encode($book),"antrian");
							$arr=json_decode($response);
							$response=json_encode(array(
								'metaData'=>$arr->metadata,
								'response'=>$booking,
								'estimasi'=>estimasi($booking['estimasidilayani']),
								"request"=>$booking,
								"sep"=>array(),
								'register'=>array()
							));
						}else{
							$response=json_encode(array(
								'metaData'=>$arr->metadata,
								'response'=>$booking,
								'estimasi'=>estimasi($booking['estimasidilayani']),
								"request"=>$booking,
								"sep"=>array(),
								'register'=>array()
							));
						}
						
					}
				}else{
					// jika pasien jkn mobile  20230808-0003
					$cek=bridgingbpjs("antrean/pendaftaran/kodebooking/".$nomor,"GET",'',"antrian");
					$arrcek=json_decode($cek);
					if($arrcek->metadata->code!=200){
						// Jika Belum Booking Antrian
						$book=array(
							'kodebooking'=>$booking['kodebooking'],
							'jenispasien'=>$booking['jenispasien'],
							'nomorkartu'=>$booking['nomorkartu'], //v
							'nik'=>$booking['nik'],//v
							'nohp'=>$booking['nohp'],//v
							'kodepoli'=>$booking['kodepoli'],//v
							'namapoli'=>$booking['namapoli'],//v
							'pasienbaru'=>$booking['pasienbaru'],
							'norm'=>$booking['norm']==null?'null':$booking['norm'],
							'tanggalperiksa'=>date('Y-m-d'),
							'kodedokter'=>$booking['kodedokter'],
							'namadokter'=>$booking['namadokter'],
							'jampraktek'=>$booking['jampraktek'],
							'jeniskunjungan'=>$booking['jeniskunjungan'],
							'nomorreferensi'=>$booking['nomorreferensi'],
							'nomorantrean'=>$booking['nomorantrean'],//generate
							'angkaantrean'=>$booking['angkaantrean'], //Generate
							'estimasidilayani'=>$booking['estimasidilayani'], //generate
							'sisakuotajkn'=>$booking['sisakuotajkn'], //generate
							'kuotajkn'=>$booking['kuotajkn'], //generate
							'sisakuotanonjkn'=>$booking['sisakuotanonjkn'], //generate
							'kuotanonjkn'=>$booking['kuotanonjkn'], //generate
							'keterangan'=>'Diharapkan hadir minimal 30 menit sebelum estimasi waktu layan', //generate
						);
						// echo json_encode($book);exit;
						$resbook=bridgingbpjs("antrean/add","POST",json_encode($book),"antrian");
						// echo $resbook; exit;
						$arrbook=json_decode($resbook);
						// print_r($arrbook); exit;
						if($arrbook->metadata->code!=200){
							$response=json_encode(array(
								'metaData'=>$arrbook->metadata,
							));
							header('Content-Type: application/json');
        					echo $response;
							exit;
						}
					}
					$norujukan='';
					$jeniskunjungan=$booking['jeniskunjungan']; // 1. FKTP 2. Rujuk Internal 3. Kontrol 4. FKRTL
					if($jeniskunjungan=="1" ||$jeniskunjungan=="4"){
						// Cek Rujukan Faskes 1
						// $rujukan=bridgingbpjs("Rujukan/".$booking['nomorreferensi'],"GET","","vclaim");
						$autoregister=getField('autoregister','kode_jkn',$booking['kodepoli'],'ruang');
						if($autoregister==1){
							$noKartu=$booking['nomorkartu'];
							$nomorreferensi=$booking['nomorreferensi'];
							$bulan=date('m');
							$tahun=date('Y');
							if($jeniskunjungan==1) $res=bridgingbpjs("Rujukan/".$booking['nomorreferensi'],"GET","","vclaim");
							else $res=bridgingbpjs("Rujukan/RS/".$booking['nomorreferensi'],"GET","","vclaim");
							// echo $res; exit;
							$arr=json_decode($res);
							if($arr->metaData->code==200){
								$cob="0";
								$katarak="0";
								$laklantas="0";
								$tglKejadian='';
								$keterangan='';
								$suplesi='';
								$noSepSuplesi='';
								$kdPropinsi='';
								$kdKabupaten='';
								$kdKecamatan='';
								$nokontrol="";
								$jeniskunjungan=$booking['jeniskunjungan'];
								$kodedokter=$booking['kodedokter'];
								$tujuanKunj="0";
								$flagProcedure="";
								$kdPenunjang="";
								$assesmentPel="";
								$nokontrol='';
								$nohp=empty(intval($booking['nohp']))?"080000000":$booking['nohp'];
								$kodeicd=$arr->response->rujukan->diagnosa->kode;
								$icd=$arr->response->rujukan->diagnosa->nama;
								// $peserta=bridgingbpjs("Peserta/nokartu/".$booking["nomorkartu"]."/tglSEP/".date("Y-m-d"),"GET",'',"vclaim");
								// echo $peserta; exit;
								// $cek=json_decode($peserta);
								// if($cek->metaData->code==200){
									$norujukan=$arr->response->rujukan->noKunjungan;
									$ppkRujukan=$arr->response->rujukan->provPerujuk->kode;
									$ppkRujukanNama=$arr->response->rujukan->provPerujuk->nama;
									$req=json_encode(array(
										'request'=>array(
											't_sep'=>array(
												'noKartu'=>$booking['nomorkartu'],
												'tglSep'=>date('Y-m-d'),
												'ppkPelayanan'=>KODERS_VC,
												'jnsPelayanan'=>"2",
												'klsRawat'=>array(
													'klsRawatHak'=>$arr->response->rujukan->peserta->hakKelas->kode,
													'klsRawatNaik'=>'',
													'pembiayaan'=>'',
													'penanggungJawab'=>''
												),
												'noMR'=>$booking['norm'],
												'rujukan'=>array(
													'asalRujukan'=>$arr->response->asalFaskes,
													'tglRujukan'=>$arr->response->rujukan->tglKunjungan,
													'noRujukan'=>$arr->response->rujukan->noKunjungan,
													'ppkRujukan'=>$arr->response->rujukan->provPerujuk->kode
												),
												'catatan'=>'-',
												'diagAwal'=>$kodeicd,
												'poli'=>array(
													'tujuan'=>$booking['kodepoli'],
													'eksekutif'=>"0",
												),
												'cob'=>array(
													'cob'=>$cob
												),
												'katarak'=>array(
													'katarak'=>$katarak
												),
												'jaminan'=>array(
													'lakaLantas'=>$laklantas,
													'penjamin'=>array(
														'tglKejadian'=>$tglKejadian,
														'keterangan'=>$keterangan,
														'suplesi'=>array(
															'suplesi'=>$suplesi,
															'noSepSuplesi'=>$noSepSuplesi,
															'lokasiLaka'=>array(
																'kdPropinsi'=>$kdPropinsi,
																'kdKabupaten'=>$kdKabupaten,
																'kdKecamatan'=>$kdKecamatan
															)
														)
													)
												),
												'tujuanKunj'=>$tujuanKunj,
												'flagProcedure'=>$flagProcedure,
												'kdPenunjang'=>$kdPenunjang,
												'assesmentPel'=>$assesmentPel,
												'skdp'=>array(
													'noSurat'=>$nokontrol,
													'kodeDPJP'=>$kodedokter
												),
												'dpjpLayan'=>$kodedokter,
												'noTelp'=>$nohp,
												'user'=>'userbridging'
											)
										)
									));
									// echo $req;
									// exit;
									$sep=bridgingbpjs("SEP/2.0/insert","POST",$req,"vclaim");
									// echo $sep; exit;
									$arrsep=json_decode($sep);
									
									if($arrsep->metaData->code==200){
										$data=$arrsep->response;
										$localsep=array(
											'catatan'=>$data->sep->catatan,
											'diagnosa'=>$data->sep->diagnosa,
											'jnsPelayanan'=>$data->sep->jnsPelayanan,
											'kelasRawat'=>$data->sep->kelasRawat,
											'noSep'=>$data->sep->noSep,
											'penjamin'=>$data->sep->penjamin,
											'asuransi'=>$data->sep->peserta->asuransi,
											'hakKelas'=>$data->sep->peserta->hakKelas,
											'jnsPeserta'=>$data->sep->peserta->jnsPeserta,
											'kelamin'=>$data->sep->peserta->kelamin,
											'nama'=>$data->sep->peserta->nama,
											'noKartu'=>$data->sep->peserta->noKartu,
											'noMr'=>$data->sep->peserta->noMr,
											'tglLahir'=>$data->sep->peserta->tglLahir,
											'Dinsos'=>$data->sep->informasi->dinsos,
											'prolanisPRB'=>$data->sep->informasi->prolanisPRB,
											'noSKTM'=>$data->sep->informasi->noSKTM,
											'poli'=>$data->sep->poli,
											'poliEksekutif'=>$data->sep->poliEksekutif,
											'tglSep'=>$data->sep->tglSep,
											'ppkPelayanan'=>KODERS_VC,
											'klsRawatHak'=>'',
											'klsRawatNaik'=>'',
											'pembiayaan'=>'',
											'penanggungJawab'=>'',
											'asalRujukan'=>$arr->response->asalFaskes,
											'tglRujukan'=>$arr->response->rujukan->tglKunjungan,
											'noRujukan'=>$arr->response->rujukan->noKunjungan,
											'ppkRujukan'=>$arr->response->rujukan->provPerujuk->kode,
											'namaPpkRujukan'=>$arr->response->rujukan->provPerujuk->nama,
											'tujuan'=>$booking['kodepoli'],
											'namaTujuan'=>$booking["namapoli"],
											'eksekutif'=>0,
											'cob'=>$cob,
											'katarak'=>$katarak,
											'lakaLantas'=>$laklantas,
											'tglKejadian'=>$tglKejadian,
											'keterangan'=>$keterangan,
											'suplesi'=>$suplesi,
											'noSepSuplesi'=>$noSepSuplesi,
											'kdPropinsi'=>$kdPropinsi,
											'kdKabupaten'=>$kdKabupaten,
											'kdKecamatan'=>$kdKecamatan,
											'tujuanKunj'=>$tujuanKunj,
											'flagProcedure'=>$flagProcedure,
											'kdPenunjang'=>$kdPenunjang,
											'assesmentPel'=>$assesmentPel,
											'noSurat'=>$nokontrol,
											'kodeDPJP'=>$booking['kodedokter'],
											'namaDPJP'=>$booking['namadokter'],
											'dpjpLayan'=>$booking['kodedokter'],
											'namaDpjpLayan'=>$booking['namadokter'],
											'noTelp'=>$nohp,
											'user'=>'userbriging'
										);

										// $localsep=array(
										// 	'catatan'=>$data->sep->catatan,
										// 	'diagnosa'=>$data->sep->diagnosa,
										// 	'jnsPelayanan'=>$data->sep->jnsPelayanan,
										// 	'kelasRawat'=>$data->sep->kelasRawat,
										// 	'noSep'=>$data->sep->noSep,
										// 	'penjamin'=>$data->sep->penjamin,
										// 	'asuransi'=>$data->sep->peserta->asuransi,
										// 	'hakKelas'=>$data->sep->peserta->hakKelas,
										// 	'jnsPeserta'=>$data->sep->peserta->jnsPeserta,
										// 	'kelamin'=>$data->sep->peserta->kelamin,
										// 	'nama'=>$data->sep->peserta->nama,
										// 	'noKartu'=>$data->sep->peserta->noKartu,
										// 	'noMr'=>$data->sep->peserta->noMr,
										// 	'tglLahir'=>$data->sep->peserta->tglLahir,
										// 	'Dinsos'=>$data->sep->informasi->dinsos,
										// 	'prolanisPRB'=>$data->sep->informasi->prolanisPRB,
										// 	'noSKTM'=>$data->sep->informasi->noSKTM,
										// 	'poli'=>$data->sep->poli,
										// 	'poliEksekutif'=>$data->sep->poliEksekutif,
										// 	'tglSep'=>$data->sep->tglSep,
										// 	'ppkPelayanan'=>$this->input->post('ppkPelayanan'),
										// 	'klsRawatHak'=>'',
										// 	'klsRawatNaik'=>'',
										// 	'pembiayaan'=>'',
										// 	'penanggungJawab'=>'',
										// 	'asalRujukan'=>$this->input->post('asalRujukan'),
										// 	'tglRujukan'=>$this->input->post('tglRujukan'),
										// 	'noRujukan'=>$this->input->post('noRujukan'),
										// 	'ppkRujukan'=>$this->input->post('ppkRujukan'),
										// 	'namaPpkRujukan'=>$this->input->post('ppkRujukanNama'),
										// 	'tujuan'=>$this->input->post('tujuan'),
										// 	'namaTujuan'=>$this->input->post('namapoli'),
										// 	'eksekutif'=>0,
										// 	'cob'=>$this->input->post('cob'),
										// 	'katarak'=>$katarak,
										// 	'lakaLantas'=>$laklantas,
										// 	'tglKejadian'=>$tglKejadian,
										// 	'keterangan'=>$keterangan,
										// 	'suplesi'=>$suplesi,
										// 	'noSepSuplesi'=>$noSepSuplesi,
										// 	'kdPropinsi'=>$kdPropinsi,
										// 	'kdKabupaten'=>$kdKabupaten,
										// 	'kdKecamatan'=>$kdKecamatan,
										// 	'tujuanKunj'=>$tujuanKunj,
										// 	'flagProcedure'=>$flagProcedure,
										// 	'kdPenunjang'=>$kdPenunjang,
										// 	'assesmentPel'=>$assesmentPel,
										// 	'noSurat'=>$nokontrol,
										// 	'kodeDPJP'=>$this->input->post('kodedokter'),
										// 	'namaDPJP'=>$this->input->post('namadokter'),
										// 	'dpjpLayan'=>$this->input->post('kodedokter'),
										// 	'namaDpjpLayan'=>$this->input->post('namadokter'),
										// 	'noTelp'=>$nohp,
										// 	'user'=>'userbriging'
										// );

										$this->simrs = $this->load->database('simrs', TRUE);
										$this->simrs->insert('tbl02_sep_response',$localsep);
										$nosep=$data->sep->noSep;
										$params['ket']="Sep Sudah Terbit ".$data->sep->noSep;
										$booking['ket']="Sep Sudah Terbit ".$data->sep->noSep;
										$booking['nosep']=$data->sep->noSep;
										$ok=1;
									}else{
										$exp=explode(" ",$arrsep->metaData->message);
										if(count($exp)==22){
											// echo json_encode($exp); exit;
										}
										$params["ket"]="Gagal Create Sep Karena ".$arrsep->metaData->message;
										$booking["ket"]="Gagal Create Sep Karena ".$arrsep->metaData->message;
										$booking["nosep"]="";
										$ok=0;
									}
								// }else{
								// 	$ok=0;
								// }
							}
						}else{
							$ok=0;
						}
					}else if($jeniskunjungan=="3"){
						// Cek Kontrol Ulang
						$nomor=$booking['nomorkartu'];
						// $res=bridgingbpjs("Rujukan/RS/List/Peserta/".$nomor,"GET","","vclaim");
						// echo $res; exit;
						$ok=0;
						$autoregister=getField('autoregister','kode_jkn',$booking['kodepoli'],'ruang');
						if($autoregister==1){
							$noKartu=$booking['nomorkartu'];
							$nomorreferensi=$booking['nomorreferensi'];
							$bulan=date('m');
							$tahun=date('Y');
							$res=bridgingbpjs("RencanaKontrol/noSuratKontrol/".$nomorreferensi,"GET","","vclaim");
							$arr=json_decode($res);
							// echo $res; exit;
							if($arr->metaData->code==200){
								$cob="0";
								$katarak="0";
								$laklantas="0";
								$tglKejadian='';
								$keterangan='';
								$suplesi='';
								$noSepSuplesi='';
								$kdPropinsi='';
								$kdKabupaten='';
								$kdKecamatan='';
								$nokontrol="";
								$jeniskunjungan=$booking['jeniskunjungan'];
								$kodedokter=$booking['kodedokter'];
								$tujuanKunj="2";
								$flagProcedure="";
								$kdPenunjang="";
								$assesmentPel="5";
								$nokontrol=$booking['nomorreferensi'];
								$nohp=empty(intval($booking['nohp']))?"080000000":$booking['nohp'];
								$diag=explode("-",$arr->response->sep->diagnosa);
								$kodeicd=trim($diag[0]);
								$icd=trim($diag[1]);
								$peserta=bridgingbpjs("Peserta/nokartu/".$booking["nomorkartu"]."/tglSEP/".date("Y-m-d"),"GET",'',"vclaim");
								// echo $peserta; exit;
								$cek=json_decode($peserta);
								if($cek->metaData->code==200){
									$norujukan=$arr->response->sep->provPerujuk->noRujukan;
									// echo"Rujukan/".$norujukan; exit;
									$asalRujukan=$arr->response->sep->provPerujuk->asalRujukan;
									if($asalRujukan==1) $res=bridgingbpjs("Rujukan/".$norujukan,"GET","","vclaim");
									else $res=bridgingbpjs("Rujukan/RS/".$norujukan,"GET","","vclaim");
									// echo $res; exit;
									$ppkRujukan=$arr->response->sep->provPerujuk->kdProviderPerujuk;
									$ppkRujukanNama=$arr->response->sep->provPerujuk->nmProviderPerujuk;
									$req=json_encode(array(
										'request'=>array(
											't_sep'=>array(
												'noKartu'=>$booking['nomorkartu'],
												'tglSep'=>date('Y-m-d'),
												'ppkPelayanan'=>KODERS_VC,
												'jnsPelayanan'=>"2",
												'klsRawat'=>array(
													'klsRawatHak'=>$cek->response->peserta->hakKelas->kode,
													'klsRawatNaik'=>'',
													'pembiayaan'=>'',
													'penanggungJawab'=>''
												),
												'noMR'=>$booking['norm'],
												'rujukan'=>array(
													'asalRujukan'=>$arr->response->sep->provPerujuk->asalRujukan,
													'tglRujukan'=>$arr->response->sep->provPerujuk->tglRujukan,
													'noRujukan'=>$arr->response->sep->provPerujuk->noRujukan,
													'ppkRujukan'=>$arr->response->sep->provPerujuk->kdProviderPerujuk
												),
												'catatan'=>'-',
												'diagAwal'=>$kodeicd,
												'poli'=>array(
													'tujuan'=>$booking['kodepoli'],
													'eksekutif'=>"0",
												),
												'cob'=>array(
													'cob'=>$cob
												),
												'katarak'=>array(
													'katarak'=>$katarak
												),
												'jaminan'=>array(
													'lakaLantas'=>$laklantas,
													'penjamin'=>array(
														'tglKejadian'=>$tglKejadian,
														'keterangan'=>$keterangan,
														'suplesi'=>array(
															'suplesi'=>$suplesi,
															'noSepSuplesi'=>$noSepSuplesi,
															'lokasiLaka'=>array(
																'kdPropinsi'=>$kdPropinsi,
																'kdKabupaten'=>$kdKabupaten,
																'kdKecamatan'=>$kdKecamatan
															)
														)
													)
												),
												'tujuanKunj'=>$tujuanKunj,
												'flagProcedure'=>$flagProcedure,
												'kdPenunjang'=>$kdPenunjang,
												'assesmentPel'=>$assesmentPel,
												'skdp'=>array(
													'noSurat'=>$nokontrol,
													'kodeDPJP'=>$kodedokter
												),
												'dpjpLayan'=>$kodedokter,
												'noTelp'=>$nohp,
												'user'=>'userbridging'
											)
										)
									));
									// echo $req;
									// exit;
									$sep=bridgingbpjs("SEP/2.0/insert","POST",$req,"vclaim");
									// echo $sep; exit;
									$arrsep=json_decode($sep);
									
									if($arrsep->metaData->code==200){
										$data=$arrsep->response;
										$localsep=array(
											'catatan'=>$data->sep->catatan,
											'diagnosa'=>$data->sep->diagnosa,
											'jnsPelayanan'=>$data->sep->jnsPelayanan,
											'kelasRawat'=>$data->sep->kelasRawat,
											'noSep'=>$data->sep->noSep,
											'penjamin'=>$data->sep->penjamin,
											'asuransi'=>$data->sep->peserta->asuransi,
											'hakKelas'=>$data->sep->peserta->hakKelas,
											'jnsPeserta'=>$data->sep->peserta->jnsPeserta,
											'kelamin'=>$data->sep->peserta->kelamin,
											'nama'=>$data->sep->peserta->nama,
											'noKartu'=>$data->sep->peserta->noKartu,
											'noMr'=>$data->sep->peserta->noMr,
											'tglLahir'=>$data->sep->peserta->tglLahir,
											'Dinsos'=>$data->sep->informasi->dinsos,
											'prolanisPRB'=>$data->sep->informasi->prolanisPRB,
											'noSKTM'=>$data->sep->informasi->noSKTM,
											'poli'=>$data->sep->poli,
											'poliEksekutif'=>$data->sep->poliEksekutif,
											'tglSep'=>$data->sep->tglSep,
											'ppkPelayanan'=>$arr->response->sep->provPerujuk->kdProviderPerujuk,
											'klsRawatHak'=>'',
											'klsRawatNaik'=>'',
											'pembiayaan'=>'',
											'penanggungJawab'=>'',
											'asalRujukan'=>$arr->response->sep->provPerujuk->asalRujukan,
											'tglRujukan'=>$arr->response->sep->provPerujuk->tglRujukan,
											'noRujukan'=>$arr->response->sep->provPerujuk->noRujukan,
											'ppkRujukan'=>$arr->response->sep->provPerujuk->kdProviderPerujuk,
											'namaPpkRujukan'=>$arr->response->sep->provPerujuk->nmProviderPerujuk,
											'tujuan'=>$booking['kodepoli'],
											'namaTujuan'=>$booking["namapoli"],
											'eksekutif'=>0,
											'cob'=>$cob,
											'katarak'=>$katarak,
											'lakaLantas'=>$laklantas,
											'tglKejadian'=>$tglKejadian,
											'keterangan'=>$keterangan,
											'suplesi'=>$suplesi,
											'noSepSuplesi'=>$noSepSuplesi,
											'kdPropinsi'=>$kdPropinsi,
											'kdKabupaten'=>$kdKabupaten,
											'kdKecamatan'=>$kdKecamatan,
											'tujuanKunj'=>$tujuanKunj,
											'flagProcedure'=>$flagProcedure,
											'kdPenunjang'=>$kdPenunjang,
											'assesmentPel'=>$assesmentPel,
											'noSurat'=>$nokontrol,
											'kodeDPJP'=>$booking['kodedokter'],
											'namaDPJP'=>$booking['namadokter'],
											'dpjpLayan'=>$booking['kodedokter'],
											'namaDpjpLayan'=>$booking['namadokter'],
											'noTelp'=>$nohp,
											'user'=>'userbriging'
										);
										$this->simrs = $this->load->database('simrs', TRUE);
										$this->simrs->insert('tbl02_sep_response',$localsep);
										$nosep=$data->sep->noSep;
										$params['ket']="Sep Sudah Terbit ".$data->sep->noSep;
										$booking['ket']="Sep Sudah Terbit ".$data->sep->noSep;
										$booking['nosep']=$data->sep->noSep;
										$ok=1;
									}else{
										$exp=explode(" ",$arrsep->metaData->message);
										if(count($exp)==22){
											// echo json_encode($exp); exit;
										}
										$params["ket"]="Gagal Create Sep Karena ".$arrsep->metaData->message;
										$booking["ket"]="Gagal Create Sep Karena ".$arrsep->metaData->message;
										$booking["nosep"]="";
										$ok=0;
									}
								}else{
									$ok=0;
								}
							}
						}else{
							$ok=0;
						}
						
					}else{
						// Rujukan Internal
						$ok=0;
					}
					
					if($ok==1){
						// Registrasi Pasien
						$idruang=getField('idx','kode_poli_jkn',$booking['kodepoli'],'ruang');
						$pasien=$this->Console_model->getPasienByNomr($booking['norm']);
						
						if(!empty($pasien)){
							$cek=$this->Console_model->cekKunjungan($idruang,$booking['norm']);
							if(empty($cek)){
								// Jika Belum ada kunjungan yang sama di poli tujuan
								$params['nomr'] = $booking['norm'];
								$params['id_daftar'] = $this->Console_model->getIdDaftar();
								$no_rujuk=$norujukan;
								if($booking['jeniskunjungan']==1) {
									$idrujuk=2;
									$rujukan="PUSKESMAS";
								}
								else if($booking['jeniskunjungan']==4) {
									$idrujuk=3;
									$rujukan="RUMAH SAKIT LAIN";
								}
								else if($booking['jeniskunjungan']==3) {
									$idrujuk=6;
									$rujukan="KONTROL ULANG";
								}
								else {
									$idrujuk=7;
									$rujukan="RUJUKAN INTERNAL";
								}
								if ($idrujuk == "7") {
									$this->simrs = $this->load->database('simrs', TRUE);
									$cKir = $this->simrs->from('tbl02_pendaftaran')->where('id_daftar', $no_rujuk)->get()->row_array();
									$params['ckir'] = $cKir['ckir'];
									$bayar = $cKir['id_cara_bayar'];
								} else {
									$params['ckir'] = $params['id_daftar'] . "R" . $params['nomr'];
									$bayar = $booking['jenispasien']=="JKN" ?2:1;
								}
								$params['c19'] = "0";
								$params['icdkode']=$kodeicd;
								$params['icd']=$icd;
								$params['no_ktp'] = $pasien->no_ktp;
								$params['nama_pasien'] = $pasien->nama;
								$params['tempat_lahir'] = $pasien->tempat_lahir;
								$params['tgl_lahir'] = $pasien->tgl_lahir;
								$params['jns_kelamin'] = $pasien->jns_kelamin;
								$params['jns_layanan'] = 'RJ';
								$params['id_ruang'] = $idruang;
								$params['nama_ruang'] = $booking['namapoli'];
									
								$params['no_rujuk'] = $norujukan;
								$params['no_suratkontrol'] = $nokontrol;
								$params['pjPasienNama'] = $pasien->penanggung_jawab;
								$params['pjPasienUmur'] = $pasien->umur_pj;
								$params['pjPasienPekerjaan'] = $pasien->pekerjaan_pj;
								$params['pjPasienAlamat'] =$pasien->alamat_pj;
								$params['pjPasienTelp'] = $pasien->no_penanggung_jawab;
								$params['pjPasienHubKel'] = $pasien->hub_keluarga;
								$params['pjPasienDikirimOleh'] = $ppkRujukan; //PPK Pengirim
								$params['pjPasienAlmtPengirim'] = $ppkRujukanNama; // Alamat PPK pengirim
								$dokter=getField("kode,namadokter,kodedokterrs","kode",$booking['kodedokter'],"jkn_dokter");
								if(!empty($dokter)){
									$params['dokterJaga'] = $dokter->kodedokterrs;
									$params['namaDokterJaga'] = $dokter->namadokter;
								}else{
									$params['dokterJaga'] = '';
									$params['namaDokterJaga'] = '';
								}
								$params['provinsi_id'] = $pasien->id_provinsi;
								$params['kabkota_id'] = $pasien->id_kab_kota;
								$params['kecamatan_id'] = $pasien->id_kecamatan;
								$params['kelurahan_id'] = $pasien->id_kelurahan;
								$params['nama_provinsi'] = $pasien->nama_provinsi;
								$params['nama_kab_kota'] = $pasien->nama_kab_kota;
								$params['nama_kecamatan'] = $pasien->nama_kecamatan;
								$params['nama_kelurahan'] = $pasien->nama_kelurahan;
								$params['rt'] = $pasien->rt;
								$params['alamat'] = $pasien->alamat;
								$params['rw'] = $pasien->rw;
								$params['kodepos'] = $pasien->kodepos;
								$params['provinsi_id_domisili'] = $pasien->id_provinsi_domisili;
								$params['kabkota_id_domisili'] = $pasien->id_kab_kota_domisili;
								$params['kecamatan_id_domisili'] = $pasien->id_kecamatan_domisili;
								$params['kelurahan_id_domisili'] = $pasien->id_kelurahan_domisili;
								$params['nama_provinsi_domisili'] = $pasien->nama_provinsi_domisili;
								$params['nama_kab_kota_domisili'] = $pasien->nama_kab_kota_domisili;
								$params['nama_kecamatan_domisili'] = $pasien->nama_kecamatan_domisili;
								$params['nama_kelurahan_domisili'] = $pasien->nama_kelurahan_domisili;
								$params['rt_domisili'] = $pasien->rt_domisili;
								$params['rw_domisili'] = $pasien->rw_domisili;
								$params['alamat_domisili'] = $pasien->alamat_domisili;
								$params['kodepos_domisili'] = $pasien->kodepos_domisili;
								if($booking['jenispasien']=="JKN"){
									$params['id_cara_bayar'] = 2;
									$params['cara_bayar'] = 'JKN';
									$params['id_rujuk'] = $idrujuk;
									$params['rujukan'] = $norujukan;
									$params['no_bpjs'] = $booking['nomorkartu'];
									$params['no_jaminan'] = $nosep;
								}else{
									$params['id_cara_bayar'] = 1;
									$params['cara_bayar'] = 'UMUM';
									$params['id_rujuk'] = 1;
									$params['rujukan'] = 'DATANG SENDIRI';
									$params['no_bpjs'] = '';
									$params['no_jaminan'] = '';
								}
								$params['tgl_daftar'] = $pasien->tgl_daftar;
								$params['status_tracert'] = 0;
								$params['erm'] = $pasien->erm;
								$params['user_daftar'] = "Anjungan Mandiri";
								$params['no_antrian_poly'] = $booking['angkaantrean'];
								$params['session_id'] = session_id();
								$params['id_ruanglama']=getField('koderuanglama','idx',$idruang,'tbl_ruang'); 
								// echo json_encode(array(
								// 	'booking'=>$booking,
								// 	'params'=>$params
								// ));
								// exit;
								$register=$this->Console_model->insertRegistrasi($params);
								$booking["idx_pendaftaran"]=$register->idx;
								if($booking['jenispasien']=="NON JKN"){
									$booking["keterangan"]="Silahkan Menuju Loket Untuk Pembayaran Karcis";
								}else{
									$booking["keterangan"]="Anda sudah checkin silahkan langsung menunggu poliklinik ".$booking['namapoli'] ." untuk mendapatkan layanan";
								}
								// Update Task 3
								$booking["taskid"]=3;
								$wt=strtotime(date('Y-m-d H:i:s'))*1000;
								$task=array(
									'kodebooking'=>$booking["kodebooking"],
									'taskid'=>3,										
									'waktu'=>$wt
								);
								$tsk=bridgingbpjs("antrean/updatewaktu","POST",json_encode($task),"antrian");

								// $booking['labelantrianadmisi']='';
								// $booking['angkaantreanadmisi']=null;
								// $booking['antreanadmisi']=null;
							}else{
								// JIka sudah terdaftar di poli tujuan
								if($booking['taskid'] ==null || $booking['taskid']<3){
									$booking["taskid"]=3;
									$wt=strtotime(date('Y-m-d H:i:s'))*1000;
									$task=array(
										'kodebooking'=>$booking["kodebooking"],
										'taskid'=>3,										
										'waktu'=>$wt
									);
									$tsk=bridgingbpjs("antrean/updatewaktu","POST",json_encode($task),"antrian");
								}
							}
						}else{
							// Buat antrian admisi karena data pasien belum ada
							$groupClient=getField('labelantrian','kode_jkn',$booking['kodepoli'],'ruang');
							$noAntrian=$this->Console_model->getAntrian($groupClient);
							$dataantrian=array(
								'groupClient'=>$groupClient,
								'noUrut'=>$noAntrian,
								'tglAntri'=>date('Y-m-d'),
								'noAntrian'=>$groupClient."-".$noAntrian,
							);
							// echo json_encode($dataantrian); exit;
							// $this->db->insert("tbl_antri",$dataantrian);
							$insert_id=$this->db->insert_id();

							$loketid=getField('loketid','loketlabel',$groupClient,'loket');
							$label=$groupClient;
							$booking['labelantrianadmisi']=$label;
							$booking['angkaantreanadmisi']=$noAntrian;
							$booking['antreanadmisi']=$groupClient."-".$noAntrian;
						}
					}else{
						if(empty($booking['antreanadmisi'])){
							$groupClient=getField('labelantrian','kode_jkn',$booking['kodepoli'],'ruang');
							$noAntrian=$this->Console_model->getAntrian($groupClient);
							$dataantrian=array(
								'groupClient'=>$groupClient,
								'noUrut'=>$noAntrian,
								'tglAntri'=>date('Y-m-d'),
								'noAntrian'=>$groupClient."-".$noAntrian,
							);
							// echo json_encode($dataantrian); exit;
							$this->db->insert("tbl_antri",$dataantrian);
							$insert_id=$this->db->insert_id();

							$loketid=getField('loketid','loketlabel',$groupClient,'loket');
							$label=$groupClient;
							$booking['labelantrianadmisi']=$label;
							$booking['angkaantreanadmisi']=$noAntrian;
							$booking['antreanadmisi']=$groupClient."-".$noAntrian;
						}
						
								
					}
					$this->db->where("kodebooking",$booking['kodebooking'])->update("jkn_antrian",$booking);
					// $response=json_encode(array(
					// 	'metaData'=>array(
					// 		'code'=>200,
					// 		'message'=>"OK"
					// 	),
					// 	'response'=>$this->db->where('kodebooking',$booking['kodebooking'])->get("jkn_antrian")->row(),
					// ));

					if(empty($req)) $req=array();
					if(empty($register)) $register=array('idx'=>'','id_daftar'=>'','no_jaminan'=>'');
					$response=json_encode(array(
						'metaData'=>array(
							'code'=>200,
							'message'=>'Antrian Berhasil Dibooking'
						),
						'response'=>$booking,
						'estimasi'=>estimasi($booking['estimasidilayani']),
						"request"=>$booking,
						"sep"=>$req,
						'register'=>$register
					));
					// $booking["taskid"]=2;
				}
			}else{
				$response=json_encode(array(
					'metaData'=>array(
						'code'=>202,
						'message'=>"Kodebooking Tidak Ditemukan"
					)
				));
			}
		}else{
			$booking=$this->Console_model->getBooking($nomor);
			if(!empty($booking)){
				if($booking['taskid']>=5){
					if(empty($booking->antreanfarmasi)){
						// jika belum ada antran farmasi
						// $labelfarmasi=$booking->jenisresep=="Non Racikan"?"N":"R";
						$nomorantri=$this->Console_model->getAntrianFarmasi();
						
						$req=array(
							'kodebooking'=>$nomor,
							'jenisresep'=>$booking['jenisresep'],
							'nomorantrean'=>$nomorantri,
							'keterangan'=>'Silahkan tunggu nomor antrian anda dipangggil untuk pengambilan obat'
						);
						
						$response=bridgingbpjs("antrean/farmasi/add","POST",json_encode($req),"antrian");
						$arr=json_decode($response);
						// print_r($arr); exit;
						if($arr->metadata->code==200){
							$antrian=array(
								'labelantrianfarmasi'=>'',
								'angkaantreanfarmasi'=>$nomorantri,
								'antreanfarmasi'=>$nomorantri,
							);
							$this->db->where("kodebooking",$nomor)->update("jkn_antrian",$antrian);
							$booking=$this->Console_model->getBooking($nomor);

							$response=json_encode(array(
								'metaData'=>array(
									'code'=>200,
									'message'=>"OK"
								),
								'response'=>$booking,
							));
						}else{
							$response=json_encode(array(
								'metaData'=>array(
									'code'=>202,
									'message'=>$arr->metadata->message
								)
							));
						}
						
						
					}else{
						$response=json_encode(array(
							'metaData'=>array(
								'code'=>200,
								'message'=>"OK"
							),
							'response'=>$booking,
						));
					}
				}else{
					$response=json_encode(array(
						'metaData'=>array(
							'code'=>202,
							'message'=>"Belum bisa ambil antrean farmasi karena layanan poli belum selesai"
						)
					));
				}
			}else{
				$response=json_encode(array(
					'metaData'=>array(
						'code'=>202,
						'message'=>"Kodebooking Tidak Ditemukan"
					)
				));
			}
		}
		header('Content-Type: application/json');
        echo $response;
	}

	function poliklinik($nomor,$kodepoli){
		$pasien=$this->Console_model->getPasienByNomr($nomor);
		$response=json_encode(array(
			'metadata'=>array(
				'code'=>200,
				'message'=>"OK"
			),
			'rujukan'=>$this->Console_model->kodeRujukInternal($nomor,$kodepoli),
			'response'=>$pasien,
			'poliklinik'=>$this->Console_model->getPoliklinikBuka()
		));
		header('Content-Type: application/json');
        echo $response;
	}
	function antrianranap(){
		$dataantrian=array(
			'groupClient'=>'A',
			'tglAntri'=>date('Y-m-d'),
		);
		$this->db->insert("tbl_antri",$dataantrian);
		$insert_id=$this->db->insert_id();
		$response=json_encode(array(
			'metadata'=>array(
				'code'=>200,
				'message'=>"OK"
			),
			'response'=>$this->db->where("id",$insert_id)->get("tbl_antri")->row_array(),
		));
		header('Content-Type: application/json');
        echo $response;
	}
	function antrianpenunjang(){
		$dataantrian=array(
			'groupClient'=>'C',
			'tglAntri'=>date('Y-m-d'),
		);
		$this->db->insert("tbl_antri",$dataantrian);
		$insert_id=$this->db->insert_id();
		$response=json_encode(array(
			'metadata'=>array(
				'code'=>200,
				'message'=>"OK"
			),
			'response'=>$this->db->where("id",$insert_id)->get("tbl_antri")->row_array(),
		));
		header('Content-Type: application/json');
        echo $response;
	}
	function cekrujukan($norujukan){
		$res=bridgingbpjs("Rujukan/RS/".$norujukan,"GET","","vclaim");
		echo $res;
	}
	function selisih($dari){
		$tgl1 = new DateTime($dari);
		$sekarang=date('Y-m-d');
		$tgl2 = new DateTime($sekarang);
		$jarak = $tgl2->diff($tgl1);
		echo "Jarak dari ".$dari ." - ".$sekarang," : ";
		print_r($jarak);
	}
	function peserta($nik){
		$res=bridgingbpjs("Peserta/nik/".$nik."/tglSEP/".date('Y-m-d'),"GET","","vclaim");
		echo $res;
	}
	function getheader(){
		$header ="";
		date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', 'simrs'."&".$tStamp, '12345', true);
        $encodedSignature = base64_encode($signature);

		$header .= "client-id: " . 'admin' . "\r\n";
		$header .= "timestamp: " . $tStamp . "\r\n";
		$header .= "signature: " . $encodedSignature ."\r\n";
		
		echo $header;
	}
	function rujukan($nobpjs){
		$fktp=bridgingbpjs("Rujukan/List/Peserta/".$nobpjs,"GET","","vclaim");
		if(isJSON($fktp)){
			$arr=json_decode($fktp);
			if($arr->metaData->code==200) {
				$metaData=$arr->metaData;
				$faskes[]=$arr->response;
				$fkrtl=bridgingbpjs("Rujukan/RS/List/Peserta/".$nobpjs,"GET","","vclaim");
				$arr2=json_decode($fkrtl);
				if($arr2->metaData->code==200){
					$faskes[]=$arr2->$response;
				}
			}
			else {
				$fkrtl=bridgingbpjs("Rujukan/RS/List/Peserta/".$nobpjs,"GET","","vclaim");
				$arr2=json_decode($fkrtl);
				if($arr2->metaData->code==200){
					$faskes[]=$arr2->response;
				}
			}
			
			if(!empty($faskes)){
				// Jika Rujukan Ditemukan
				if(count($faskes)==1){
					// echo "Rujukan Cuma 1";exit;
					if(count($faskes[0]->rujukan)==1){
						// cek jumlah sep terbit berdasarkan rujukan
						$response=bridgingbpjs("Rujukan/JumlahSEP/".$faskes[0]->asalFaskes."/".$faskes[0]->rujukan[0]->noKunjungan,"GET","","vclaim");
						$arr=json_decode($response);
						if($arr->metaData->code==200){
							if($arr->response->jumlahSEP==0){
								// Jika kunjungan Pertama cari dokter
								$jadwal=bridgingbpjs("jadwaldokter/kodepoli/".$faskes[0]->rujukan[0]->poliRujukan->kode."/tanggal/".date('Y-m-d'),"GET","","antrian");
								$arr_jadwal=json_decode($jadwal);
								if($arr_jadwal->metadata->code==200){
									if(count($arr_jadwal->response)==1){
										// Ambil Antrian
										$tgl=date('Y-m-d');
										$jampraktek=$arr_jadwal->response[0]->jadwal;
										$kuotajkn=(80*$arr_jadwal->response[0]->kapasitaspasien)/100;
										$kuotanonjkn=(20*$arr_jadwal->response[0]->kapasitaspasien)/100;
										$jp=explode("-",$jarr_jadwal->response->adwal);
										$waktu_awal        =strtotime(date('Y-m-d')." ".$jp[0].":00");
										$waktu_akhir    =strtotime(date('Y-m-d')." ".$jp[1].":00"); 
										$selisih=($waktu_akhir-$waktu_awal)/60; //dalam menit
										$spm=$selisih/$arr_jadwal->response[0]->kapasitaspasien;
										$jmlpasien=$this->Console_model->countPasien($faskes[0]->rujukan[0]->poliRujukan->kode,$arr_jadwal->response[0]->kodedokter,$tgl);
										$angkaantrean=(empty($jmlpasien->angkaantrean)?1:$jmlpasien->angkaantrean+1);
										// $kodebooking="";
										$labelantrianpoli='';
										$nomorantrean=(empty($labelantrianpoli)?$angkaantrean:$labelantrianpoli .".".$angkaantrean);
										
										$spm_ms=$spm*60*1000; //Convert SPM (Standar Pelayanan Minimal) dari menit ke milisecond
										
										$waktutunggu_ms=($angkaantrean*$spm_ms)-$spm_ms; 
										$jm=date('Y-m-d') ." " .$jp[0].":00";
										$jm_ms=strtotime($jm)*1000; 
										$estimasidilayani=$jm_ms+$waktutunggu_ms;
										$sisakuotajkn=empty($jmlpasien->jkn)?$kuotajkn:$kuotajkn-$jmlpasien->jkn;
										$sisakuotanonjkn=empty($jmlpasien->nonjkn)?$kuotanonjkn:$kuotanonjkn-$jmlpasien->nonjkn;

										$sekarang=date('Y-m-d H:i:s');
										$sekarang_ms=strtotime($sekarang)*1000; 
										
										if($faskes[0]->rujukan[0]->peserta->mr->noMR==null){
											$pasienbaru=1;
										}else{
											$pasienbaru=0;
										}
										$jeniskunjungan=$faskes[0]->rujukan[0]->asalRujukan==1?1:4;
										$booking=array(
											'kodebooking'=>$this->Console_model->getKodeBooking(),
											'jenispasien'=>'JKN',
											'nomorkartu'=>$faskes[0]->rujukan[0]->peserta->noKartu, //v
											'nik'=>$faskes[0]->rujukan[0]->peserta->nik,//v
											'nohp'=>$faskes[0]->rujukan[0]->peserta->mr->noTelepon,//v
											'kodepoli'=>$faskes[0]->rujukan[0]->poliRujukan->kode,//v
											'namapoli'=>$faskes[0]->rujukan[0]->poliRujukan->nama,//v
											'pasienbaru'=>$pasienbaru,
											'norm'=>$faskes[0]->rujukan[0]->peserta->mr->noMR,
											'tanggalperiksa'=>date('Y-m-d'),
											'kodedokter'=>$arr_jadwal->response[0]->kodedokter,
											'namadokter'=>$arr_jadwal->response[0]->namadokter,
											'jampraktek'=>$arr_jadwal->response[0]->jadwal,
											'jeniskunjungan'=>$jeniskunjungan,
											'nomorreferensi'=>$faskes[0]->rujukan[0]->noKunjungan,
											'nomorantrean'=>$nomorantrean,//generate
											'angkaantrean'=>$angkaantrean, //Generate
											'estimasidilayani'=>$estimasidilayani, //generate
											'sisakuotajkn'=>$sisakuotajkn, //generate
											'kuotajkn'=>$kuotajkn, //generate
											'sisakuotanonjkn'=>$sisakuotanonjkn, //generate
											'kuotanonjkn'=>$kuotanonjkn, //generate
											'keterangan'=>'Diharapkan hadir minimal 30 menit sebelum estimasi waktu layan', //generate
										);
										$response=json_encode(array(
											'metaData'=>array(
												'code'=>200,
												'message'=>"Ok",
												'proses'=>'ambilantrean'
											),
											'response'=>$booking
										));
									}else{
										$response=json_encode(array(
											'metaData'=>array(
												'code'=>200,
												'message'=>"Ok",
												'proses'=>'listjadwal'
											),
											'response'=>$arr_jadwal->response
										));
									}
								}else{
									$response=json_encode(array(
										'metaData'=>array(
											'code'=>201,
											'message'=>"Tidak bisa mengambil antrian karena jadwal ".$faskes[0]->rujukan[0]->poliRujukan->nama ." hari ini tidak ada"
										)
									));
								}
							}else{
								// Jika kunjungan Ke 2, dst
								$jadwal=bridgingbpjs("jadwaldokter/kodepoli/".$faskes[0]->rujukan[0]->poliRujukan->kode."/tanggal/".date('Y-m-d'),"GET","","antrian");
								$arr_jadwal=json_decode($jadwal);
								if($arr_jadwal->metadata->code==200){
									if(count($arr_jadwal->response)==1){
										// Ambil Antrian
										$tgl=date('Y-m-d');
										$jampraktek=$arr_jadwal->response[0]->jadwal;
										$kuotajkn=(80*$arr_jadwal->response[0]->kapasitaspasien)/100;
										$kuotanonjkn=(20*$arr_jadwal->response[0]->kapasitaspasien)/100;
										$jp=explode("-",$jarr_jadwal->response->adwal);
										$waktu_awal        =strtotime(date('Y-m-d')." ".$jp[0].":00");
										$waktu_akhir    =strtotime(date('Y-m-d')." ".$jp[1].":00"); 
										$selisih=($waktu_akhir-$waktu_awal)/60; //dalam menit
										$spm=$selisih/$arr_jadwal->response[0]->kapasitaspasien;
										$jmlpasien=$this->Console_model->countPasien($faskes[0]->rujukan[0]->poliRujukan->kode,$arr_jadwal->response[0]->kodedokter,$tgl);
										$angkaantrean=(empty($jmlpasien->angkaantrean)?1:$jmlpasien->angkaantrean+1);
										// $kodebooking="";
										$labelantrianpoli='';
										$nomorantrean=(empty($labelantrianpoli)?$angkaantrean:$labelantrianpoli .".".$angkaantrean);
										
										$spm_ms=$spm*60*1000; //Convert SPM (Standar Pelayanan Minimal) dari menit ke milisecond
										
										$waktutunggu_ms=($angkaantrean*$spm_ms)-$spm_ms; 
										$jm=date('Y-m-d') ." " .$jp[0].":00";
										$jm_ms=strtotime($jm)*1000; 
										$estimasidilayani=$jm_ms+$waktutunggu_ms;
										$sisakuotajkn=empty($jmlpasien->jkn)?$kuotajkn:$kuotajkn-$jmlpasien->jkn;
										$sisakuotanonjkn=empty($jmlpasien->nonjkn)?$kuotanonjkn:$kuotanonjkn-$jmlpasien->nonjkn;

										$sekarang=date('Y-m-d H:i:s');
										$sekarang_ms=strtotime($sekarang)*1000; 
										
										if($faskes[0]->rujukan[0]->peserta->mr->noMR==null){
											$pasienbaru=1;
										}else{
											$pasienbaru=0;
										}
										$jeniskunjungan=$faskes[0]->rujukan[0]->asalRujukan==1?1:4;
										$booking=array(
											'kodebooking'=>$this->Console_model->getKodeBooking(),
											'jenispasien'=>'JKN',
											'nomorkartu'=>$faskes[0]->rujukan[0]->peserta->noKartu, //v
											'nik'=>$faskes[0]->rujukan[0]->peserta->nik,//v
											'nohp'=>$faskes[0]->rujukan[0]->peserta->mr->noTelepon,//v
											'kodepoli'=>$faskes[0]->rujukan[0]->poliRujukan->kode,//v
											'namapoli'=>$faskes[0]->rujukan[0]->poliRujukan->nama,//v
											'pasienbaru'=>$pasienbaru,
											'norm'=>$faskes[0]->rujukan[0]->peserta->mr->noMR,
											'tanggalperiksa'=>date('Y-m-d'),
											'kodedokter'=>$arr_jadwal->response[0]->kodedokter,
											'namadokter'=>$arr_jadwal->response[0]->namadokter,
											'jampraktek'=>$arr_jadwal->response[0]->jadwal,
											'jeniskunjungan'=>$jeniskunjungan,
											'nomorreferensi'=>$faskes[0]->rujukan[0]->noKunjungan,
											'nomorantrean'=>$nomorantrean,//generate
											'angkaantrean'=>$angkaantrean, //Generate
											'estimasidilayani'=>$estimasidilayani, //generate
											'sisakuotajkn'=>$sisakuotajkn, //generate
											'kuotajkn'=>$kuotajkn, //generate
											'sisakuotanonjkn'=>$sisakuotanonjkn, //generate
											'kuotanonjkn'=>$kuotanonjkn, //generate
											'keterangan'=>'Diharapkan hadir minimal 30 menit sebelum estimasi waktu layan', //generate
										);
										$response=json_encode(array(
											'metaData'=>array(
												'code'=>200,
												'message'=>"Ok",
												'proses'=>'ambilantrean'
											),
											'response'=>$booking
										));
									}else{
										$response=json_encode(array(
											'metaData'=>array(
												'code'=>200,
												'message'=>"Ok",
												'proses'=>'listjadwal'
											),
											'response'=>$arr_jadwal->response
										));
									}
								}else{
									$response=json_encode(array(
										'metaData'=>array(
											'code'=>201,
											'message'=>"Tidak bisa mengambil antrian karena jadwal ".$faskes[0]->rujukan[0]->poliRujukan->nama ." hari ini tidak ada"
										)
									));
								}

								// $response=bridgingbpjs("jadwaldokter/kodepoli/".$faskes[0]->rujukan[0]->poliRujukan->kode."/tanggal/".date('Y-m-d'),"GET","","antrian");
							}
						}else{

						}
					}else{
						$response=json_encode(array(
							'metaData'=>array(
								'code'=>200,
								'message'=>'OK',
								'proses'=>'carirujukan'
							),
							'response'=>$faskes,
						));
					}
					
				}else{
					$response=json_encode(array(
						'metaData'=>array(
							'code'=>200,
							'message'=>'OK',
							'proses'=>'carirujukan'
						),
						'response'=>$faskes,
					));
				}
				
			}else{
				$response=json_encode(array(
					'metaData'=>array(
						'code'=>201,
						'message'=>'Rujukan Tidak Ditemukan',
						'proses'=>'carirujukan'
					)
				));
			}
		}else{
			$response=json_encode(array(
				"metaData"=>array(
					"code"=>504,
					"message"=>$fktp,
				)
			));
		}
		header('Content-Type: application/json');
        echo $response;
	}
	function jmlsep(){
		$faskes=$this->input->post("faskes");
		$noKunjungan=$this->input->post("noKunjungan");
		$response=bridgingbpjs("Rujukan/JumlahSEP/".$faskes."/".$noKunjungan,"GET","","vclaim");
		header('Content-Type: application/json');
        echo $response;
	}
	function rencanakontrol(){
		$noKartu=$this->input->post("noKartu");
		$bulan=date('m');
		$tahun=date('Y');
		$response=bridgingbpjs("RencanaKontrol/ListRencanaKontrol/Bulan/".$bulan."/tahun/".$tahun."/Nokartu/".$noKartu."/filter/2","GET","","vclaim");
		$arr=json_decode($response);
		// print_r($arr); exit;
		$poliAsalRujukan=$this->input->post('poliAsalRujukan');
		if($arr->metaData->code!=200){
			$bu=intVal($bulan)-1;
			$bulan=str_pad($bu,2,"0",STR_PAD_LEFT);
			$response=bridgingbpjs("RencanaKontrol/ListRencanaKontrol/Bulan/".$bulan."/tahun/".$tahun."/Nokartu/".$noKartu."/filter/2","GET","","vclaim");
			// echo $response; exit;
			$arr1=json_decode($response);
			// print_r($arr1); exit;
			if($arr1->metaData->code==200){
				foreach ($arr1->response->list as $sk ) {
					if($sk->jnsKontrol==2 && $sk->poliTujuan==$poliAsalRujukan && $sk->terbitSEP=="Belum"){
						$kontrol=$sk;
						$tglrencanakontrol=$sk->tglRencanaKontrol;
						break;
					}else if($sk->jnsKontrol==2 && $sk->jnsPelayanan=="Rawat Inap" && $sk->terbitSEP=="Belum"){
						// Surat Kontrol Pasca Rawat Inap
						$kontrol=$sk;
						$tglrencanakontrol=$sk->tglRencanaKontrol;
						break;
					}
				}
			}
		}else{
			// jika rujukan bulan ini
			foreach ($arr->response->list as $sk ) {
				if($sk->jnsKontrol==2 && $sk->poliTujuan==$poliAsalRujukan ){
					// && $sk->terbitSEP=="Belum"
					if($sk->terbitSEP=="Belum") {
						$kontrol=$sk;
						$tglrencanakontrol=$sk->tglRencanaKontrol;
					}
					else if($sk->terbitSEP=="Sudah" && $sk->tglRencanaKontrol==date('Y-m-d')) {
						$kontrol=$sk;
						$tglrencanakontrol=$sk->tglRencanaKontrol;
					}
					break;
				}else if($sk->jnsKontrol==2 && $sk->jnsPelayanan=="Rawat Inap" && $sk->terbitSEP=="Belum"){
					// Surat Kontrol Pasca Rawat Inap
					$kontrol=$sk;
					$tglrencanakontrol=$sk->tglRencanaKontrol;
					
					break;
				}
			}
		}
		// 0001330958261
		if(!empty($sk)){
			$tgl1 = new DateTime($sk->tglRencanaKontrol);
			$sekarang=date('Y-m-d');
			$tgl2 = new DateTime($sekarang);
			$jarak = $tgl2->diff($tgl1);
			if($jarak->invert==1){
				// jika pasien datang terlambat dari jadwal rencana kontrol
				$this->Console_model->autoUpdateSuratKontrol($sk);
			}
		}
		
		
		// if($sk->tglRencanaKontrol)
		$response_asli=json_decode($response);
		if(!empty($kontrol)){
			
			$response=json_encode(array(
				'metaData'=>array(
					"code"=>200,
					"message"=>"OK"
				),
				"response"=>array(
					"kontrol"=>$kontrol
				),
				"responsebpjs"=>$response_asli
			));
		}else{
			$response=json_encode(array(
				'metaData'=>array(
					"code"=>203,
					"message"=>"Surat Kontrol Pasien Belum Ada"
				),
				"responsebpjs"=>$response_asli
			));
		}
		header('Content-Type: application/json');
        echo $response;
	}
	
	function jadwalpoli($kpoli){
		// $jadwal=$this->Console_model->getJadwalPoly($kodepoli);
		$kodepoli=getField('kode_poli_jkn','kode_jkn',$kpoli,'ruang');
		$response=bridgingbpjs("jadwaldokter/kodepoli/".$kodepoli."/tanggal/".date('Y-m-d'),"GET",'',"antrian");
		// echo $response; exit;
		$arr=json_decode($response);
		if($arr->metadata->code==200){
			$dokter=$arr->response;
			foreach ($dokter as $d) {
				if($d->kodesubspesialis==$kpoli){
					$res[]=$d;
				}
			}
			if(empty($res)){
				$response=json_encode(array(
					'metadata'=>array(
						'code'=>202,
						'message'=>'Jadwal Untuk Poliklinik '.getField('ruang','kode_jkn',$kpoli,'ruang')." Tidak ada untuk hari ini"
					)
				));
			}else{
				$response=json_encode(array(
					'metadata'=>array(
						'code'=>200,
						'message'=>'OK'
					),
					'response'=>$res
				));
			}
		}
		// if(!empty($jadwal)){
		// 	$response=json_encode(array(
		// 		'metaData'=>array(
		// 			"code"=>200,
		// 			"message"=>"OK"
		// 		),
		// 		"response"=>$jadwal
		// 	));
		// }else{
		// 	$response=json_encode(array(
		// 		'metaData'=>array(
		// 			"code"=>203,
		// 			"message"=>"Jadwal Dokter Tidak Ditemukan"
		// 		),
		// 	));
		// }
		header('Content-Type: application/json');
        echo $response;
	}

	function ambilantrian(){
		$nomorkartu = $this->input->post("nomorkartu");
		$nik = $this->input->post("nik");
		$nohp = $this->input->post("nohp");
		$kodepoli = $this->input->post("kodepoli");
		$namapoli = $this->input->post("namapoli");
		$norm = $this->input->post("norm");
		$pasienbaru = $this->input->post("pasienbaru");
		$jeniskunjungan = $this->input->post("jeniskunjungan");
		$jenispasien = $this->input->post("jenispasien");
		$kodedokter = $this->input->post("kodedokter");
		$namadokter = $this->input->post("namadokter");
		$nomorreferensi = $this->input->post("nomorreferensi");
		$kapasitaspasien = $this->input->post("kapasitaspasien");
		$jadwal = $this->input->post("jadwal");
		$tgl=date('Y-m-d');
		// echo date('Y-m-d H:i:s'); exit;
		$antrian=$this->Console_model->cekAntrian($kodepoli,$nik);
		$nosep="";
		if(empty($antrian)){
			// $jadwal=$this->Console_model->getJadwal($kodepoli,$kodedokter);
			$jampraktek="";
			$kuotajkn=0;
			$kuotanonjkn=0;
			$spm=0;
			$angkaantrean=1;
			$nomorantrean="";
			$estimasidilayani=0;
			$sisakuotajkn=0;
			$sisakuotanonjkn=0;
			$labelantrianpoli="";
			if(!empty($kodepoli) && !empty($kodedokter)){
				// 07:30
				$pending=$this->input->post("pendingbooking");
				// echo $pending; exit;
				if(empty($pending)){
					$jampraktek=str_pad($jadwal,11,"0",STR_PAD_LEFT);
					
					$kuotajkn=(80*$kapasitaspasien)/100;
					$kuotanonjkn=(20*$kapasitaspasien)/100;
					$jp=explode("-",$jadwal);
					$waktu_awal        =strtotime(date('Y-m-d')." ".$jp[0].":00");
					$waktu_akhir    =strtotime(date('Y-m-d')." ".$jp[1].":00"); 
					$selisih=($waktu_akhir-$waktu_awal)/60; //dalam menit
					$spm=$selisih/$kapasitaspasien;
					$jmlpasien=$this->Console_model->countPasien($kodepoli,$kodedokter,$tgl);
					// $angkaantrean=(empty($jmlpasien->angkaantrean)?1:$jmlpasien->angkaantrean+1);
					$angkaantrean=$this->Console_model->get_antrian_poly($kodepoli,$tgl,$kodedokter);
					// $kodebooking="";
					$labelantrianpoli=getLabeleAntrianPoli($kodepoli);
					$nomorantrean=(empty($labelantrianpoli)?$angkaantrean:$labelantrianpoli .".".$angkaantrean);
					
					$spm_ms=$spm*60*1000; //Convert SPM (Standar Pelayanan Minimal) dari menit ke milisecond
					
					$waktutunggu_ms=($angkaantrean*$spm_ms)-$spm_ms; 
					$jm=date('Y-m-d') ." " .$jp[0].":00";
					$jm_ms=strtotime($jm)*1000; 
					$estimasidilayani=$jm_ms+$waktutunggu_ms;
					$sisakuotajkn=empty($jmlpasien->jkn)?$kuotajkn:$kuotajkn-$jmlpasien->jkn;
					$sisakuotanonjkn=empty($jmlpasien->nonjkn)?$kuotanonjkn:$kuotanonjkn-$jmlpasien->nonjkn;

					$sekarang=date('Y-m-d H:i:s');
					$sekarang_ms=strtotime($sekarang)*1000; 
					$booking=array(
						'kodebooking'=>$this->Console_model->getKodeBooking(),
						'jenispasien'=>$jenispasien,
						'nomorkartu'=>$nomorkartu, //v
						'nik'=>$nik,//v
						'nohp'=>$nohp,//v
						'kodepoli'=>$kodepoli,//v
						'namapoli'=>$namapoli,//v
						'pasienbaru'=>$pasienbaru,
						'norm'=>$norm,
						'tanggalperiksa'=>date('Y-m-d'),
						'kodedokter'=>$kodedokter,
						'namadokter'=>$namadokter,
						'jampraktek'=>$jampraktek,
						'jeniskunjungan'=>$jeniskunjungan,
						'nomorreferensi'=>$nomorreferensi,
						'nomorantrean'=>$nomorantrean,//generate
						'angkaantrean'=>$angkaantrean, //Generate
						'estimasidilayani'=>$estimasidilayani, //generate
						'sisakuotajkn'=>$sisakuotajkn, //generate
						'kuotajkn'=>$kuotajkn, //generate
						'sisakuotanonjkn'=>$sisakuotanonjkn, //generate
						'kuotanonjkn'=>$kuotanonjkn, //generate
						'keterangan'=>'Diharapkan hadir minimal 30 menit sebelum estimasi waktu layan', //generate
					);
					// print_r($booking);exit;
					// echo json_encode($booking); exit;
					$response=bridgingbpjs("antrean/add","POST",json_encode($booking),"antrian");
					$arr=json_decode($response);

					if($arr->metadata->code==200){
						$booking['terkirim']=1;
						$booking['failedmessage']='';
						if($booking["pasienbaru"]==1){
							//Update task 1
							$booking["taskid"]=1;
							$wt=strtotime(date('Y-m-d H:i:s'))*1000;
							$task=array(
								'kodebooking'=>$booking["kodebooking"],
								'taskid'=>1,
								'waktu'=>$wt
							);
							$tsk=bridgingbpjs("antrean/updatewaktu","POST",json_encode($task),"antrian");
						}else{
							$booking["taskid"]=2;
							// Jika Pasien Lama
							
							$autoregister=getField('autoregister','kode_jkn',$this->input->post('kodepoli'),'ruang');
							if($autoregister==1){
								// Create SEP
								$ok=1;
								$groupClient=getField('labelantrian','kode_jkn',$this->input->post('kodepoli'),'ruang');
								$noAntrian="";
								$loketid="";
								$label="";
								$katarak="0";
								$laklantas="0";
								$tglKejadian='';
								$keterangan='';
								$suplesi='';
								$noSepSuplesi='';
								$kdPropinsi='';
								$kdKabupaten='';
								$kdKecamatan='';
								$nokontrol="";
								$jeniskunjungan=$this->input->post('jeniskunjungan');
								$kodedokter=$this->input->post('kodedokter');
								if($jeniskunjungan=="1" ||$jeniskunjungan=="4"){
									// jika kunjungan pertama
									$tujuanKunj="0";
									$flagProcedure="";
									$kdPenunjang="";
									$assesmentPel="";
								}else if($jeniskunjungan=="3"){
									$tujuanKunj="2";
									$flagProcedure="";
									$kdPenunjang="";
									$assesmentPel="5";
									$nokontrol=$this->input->post("nomorreferensi");
								}else{
									$tujuanKunj="2";
									$flagProcedure="";
									$kdPenunjang="";
									$assesmentPel="2";
								}
								$nohp=empty(intval($this->input->post('nohp')))?"080000000":$this->input->post('nohp');
								if($jenispasien=="JKN"){
									$req=json_encode(array(
										'request'=>array(
											't_sep'=>array(
												'noKartu'=>$this->input->post('nomorkartu'),
												'tglSep'=>date('Y-m-d'),
												'ppkPelayanan'=>KODERS_VC,
												'jnsPelayanan'=>2,
												'klsRawat'=>array(
													'klsRawatHak'=>$this->input->post('klsRawatHak'),
													'klsRawatNaik'=>'',
													'pembiayaan'=>'',
													'penanggungJawab'=>''
												),
												'noMR'=>$this->input->post('norm'),
												'rujukan'=>array(
													'asalRujukan'=>$this->input->post('asalRujukan'),
													'tglRujukan'=>$this->input->post('tglRujukan'),
													'noRujukan'=>$this->input->post('noRujukan'),
													'ppkRujukan'=>$this->input->post('ppkRujukan')
												),
												'catatan'=>'-',
												'diagAwal'=>$this->input->post('diagAwal'),
												'poli'=>array(
													'tujuan'=>$this->input->post('kodepoli'),
													'eksekutif'=>"0",
												),
												'cob'=>array(
													'cob'=>empty($this->input->post('cob'))?"0":$this->input->post('cob')
												),
												'katarak'=>array(
													'katarak'=>$katarak
												),
												'jaminan'=>array(
													'lakaLantas'=>$laklantas,
													'penjamin'=>array(
														'tglKejadian'=>$tglKejadian,
														'keterangan'=>$keterangan,
														'suplesi'=>array(
															'suplesi'=>$suplesi,
															'noSepSuplesi'=>$noSepSuplesi,
															'lokasiLaka'=>array(
																'kdPropinsi'=>$kdPropinsi,
																'kdKabupaten'=>$kdKabupaten,
																'kdKecamatan'=>$kdKecamatan
															)
														)
													)
												),
												'tujuanKunj'=>$tujuanKunj,
												'flagProcedure'=>$flagProcedure,
												'kdPenunjang'=>$kdPenunjang,
												'assesmentPel'=>$assesmentPel,
												'skdp'=>array(
													'noSurat'=>$nokontrol,
													'kodeDPJP'=>$kodedokter
												),
												'dpjpLayan'=>$kodedokter,
												'noTelp'=>$nohp,
												'user'=>'userbridging'
											)
										)
									));
									$sep=bridgingbpjs("SEP/2.0/insert","POST",$req,"vclaim");
									$arrsep=json_decode($sep);
									
									if($arrsep->metaData->code==200){
										$data=$arrsep->response;
										$localsep=array(
											'catatan'=>$data->sep->catatan,
											'diagnosa'=>$data->sep->diagnosa,
											'jnsPelayanan'=>$data->sep->jnsPelayanan,
											'kelasRawat'=>$data->sep->kelasRawat,
											'noSep'=>$data->sep->noSep,
											'penjamin'=>$data->sep->penjamin,
											'asuransi'=>$data->sep->peserta->asuransi,
											'hakKelas'=>$data->sep->peserta->hakKelas,
											'jnsPeserta'=>$data->sep->peserta->jnsPeserta,
											'kelamin'=>$data->sep->peserta->kelamin,
											'nama'=>$data->sep->peserta->nama,
											'noKartu'=>$data->sep->peserta->noKartu,
											'noMr'=>$data->sep->peserta->noMr,
											'tglLahir'=>$data->sep->peserta->tglLahir,
											'Dinsos'=>$data->sep->informasi->dinsos,
											'prolanisPRB'=>$data->sep->informasi->prolanisPRB,
											'noSKTM'=>$data->sep->informasi->noSKTM,
											'poli'=>$data->sep->poli,
											'poliEksekutif'=>$data->sep->poliEksekutif,
											'tglSep'=>$data->sep->tglSep,
											'ppkPelayanan'=>$this->input->post('ppkPelayanan'),
											'klsRawatHak'=>'',
											'klsRawatNaik'=>'',
											'pembiayaan'=>'',
											'penanggungJawab'=>'',
											'asalRujukan'=>$this->input->post('asalRujukan'),
											'tglRujukan'=>$this->input->post('tglRujukan'),
											'noRujukan'=>$this->input->post('noRujukan'),
											'ppkRujukan'=>$this->input->post('ppkRujukan'),
											'namaPpkRujukan'=>$this->input->post('ppkRujukanNama'),
											'tujuan'=>$this->input->post('tujuan'),
											'namaTujuan'=>$this->input->post('namapoli'),
											'eksekutif'=>0,
											'cob'=>$this->input->post('cob'),
											'katarak'=>$katarak,
											'lakaLantas'=>$laklantas,
											'tglKejadian'=>$tglKejadian,
											'keterangan'=>$keterangan,
											'suplesi'=>$suplesi,
											'noSepSuplesi'=>$noSepSuplesi,
											'kdPropinsi'=>$kdPropinsi,
											'kdKabupaten'=>$kdKabupaten,
											'kdKecamatan'=>$kdKecamatan,
											'tujuanKunj'=>$tujuanKunj,
											'flagProcedure'=>$flagProcedure,
											'kdPenunjang'=>$kdPenunjang,
											'assesmentPel'=>$assesmentPel,
											'noSurat'=>$nokontrol,
											'kodeDPJP'=>$this->input->post('kodedokter'),
											'namaDPJP'=>$this->input->post('namadokter'),
											'dpjpLayan'=>$this->input->post('kodedokter'),
											'namaDpjpLayan'=>$this->input->post('namadokter'),
											'noTelp'=>$nohp,
											'user'=>'userbriging'
										);
										$this->simrs = $this->load->database('simrs', TRUE);
										$this->simrs->insert('tbl02_sep_response',$localsep);
										$nosep=$data->sep->noSep;
										$params['ket']="Sep Sudah Terbit ".$data->sep->noSep;
										$booking['ket']="Sep Sudah Terbit ".$data->sep->noSep;
										$booking['nosep']=$data->sep->noSep;
									}else{
										$params["ket"]="Gagal Create Sep Karena ".$arrsep->metaData->message;
										$booking["ket"]="Gagal Create Sep Karena ".$arrsep->metaData->message;
										$booking["nosep"]="";
										$ok=0;
									}
								}
								if($ok==1){
									// Registrasi Pasien
									$idruang=getField('idx','kode_poli_jkn',$this->input->post('kodepoli'),'ruang');
									$pasien=$this->Console_model->getPasienByNomr($this->input->post('norm'));
									if(!empty($pasien)){
										$cek=$this->Console_model->cekKunjungan($idruang,$this->input->post('norm'));
										if(empty($cek)){
											// Jika Belum ada kunjungan yang sama di poli tujuan
											$params['nomr'] = trim($this->input->post('norm', TRUE));
											$params['id_daftar'] = $this->Console_model->getIdDaftar();
											$no_rujuk=trim($this->input->post('noRujukan', TRUE));
											if($jeniskunjungan==1) {
												$idrujuk=2;
												$rujukan="PUSKESMAS";
											}
											else if($jeniskunjungan==4) {
												$idrujuk=3;
												$rujukan="RUMAH SAKIT LAIN";
											}
											else if($jeniskunjungan==3) {
												$idrujuk=6;
												$rujukan="KONTROL ULANG";
											}
											else {
												$idrujuk=7;
												$rujukan="RUJUKAN INTERNAL";
											}
											if ($idrujuk == "7") {
												$this->simrs = $this->load->database('simrs', TRUE);
												$cKir = $this->simrs->from('tbl02_pendaftaran')->where('id_daftar', $no_rujuk)->get()->row_array();
												$params['ckir'] = $cKir['ckir'];
												$bayar = $cKir['id_cara_bayar'];
											} else {
												$params['ckir'] = $params['id_daftar'] . "R" . $params['nomr'];
												$bayar = trim($this->input->post('id_cara_bayar', TRUE));
											}
											$params['c19'] = "0";
											$params['icdkode']=$this->input->post('diagAwal');
											$params['icd']=$this->input->post('diagNama');
											$params['no_ktp'] = trim($this->input->post('nik', TRUE));
											$params['nama_pasien'] = trim($this->input->post('nama', TRUE));
											$params['tempat_lahir'] = $pasien->tempat_lahir;
											$params['tgl_lahir'] = $pasien->tgl_lahir;
											$params['jns_kelamin'] = $pasien->jns_kelamin;
											$params['jns_layanan'] = 'RJ';
											$params['id_ruang'] = $idruang;
											$params['nama_ruang'] = trim($this->input->post('namapoli', TRUE));
											
											$params['no_rujuk'] = $this->input->post('noRujukan');
											$params['no_suratkontrol'] = $nokontrol;
											$params['pjPasienNama'] = $pasien->penanggung_jawab;
											$params['pjPasienUmur'] = $pasien->umur_pj;
											$params['pjPasienPekerjaan'] = $pasien->pekerjaan_pj;
											$params['pjPasienAlamat'] =$pasien->alamat_pj;
											$params['pjPasienTelp'] = $pasien->no_penanggung_jawab;
											$params['pjPasienHubKel'] = $pasien->hub_keluarga;
											$params['pjPasienDikirimOleh'] = trim($this->input->post('ppkRujukan', TRUE)); //PPK Pengirim
											$params['pjPasienAlmtPengirim'] = trim($this->input->post('ppkRujukanNama', TRUE)); // Alamat PPK pengirim
											$dokter=getField("kode,namadokter,kodedokterrs","kode",$booking['kodedokter'],"jkn_dokter");
											if(!empty($dokter)){
												$params['dokterJaga'] = $dokter->kodedokterrs;
												$params['namaDokterJaga'] = $dokter->namadokter;
											}else{
												$params['dokterJaga'] = '';
												$params['namaDokterJaga'] = '';
											}
											
											$params['provinsi_id'] = $pasien->id_provinsi;
											$params['kabkota_id'] = $pasien->id_kab_kota;
											$params['kecamatan_id'] = $pasien->id_kecamatan;
											$params['kelurahan_id'] = $pasien->id_kelurahan;
											$params['nama_provinsi'] = $pasien->nama_provinsi;
											$params['nama_kab_kota'] = $pasien->nama_kab_kota;
											$params['nama_kecamatan'] = $pasien->nama_kecamatan;
											$params['nama_kelurahan'] = $pasien->nama_kelurahan;
											$params['rt'] = $pasien->rt;
											$params['alamat'] = $pasien->alamat;
											$params['rw'] = $pasien->rw;
											$params['kodepos'] = $pasien->kodepos;
											$params['provinsi_id_domisili'] = $pasien->id_provinsi_domisili;
											$params['kabkota_id_domisili'] = $pasien->id_kab_kota_domisili;
											$params['kecamatan_id_domisili'] = $pasien->id_kecamatan_domisili;
											$params['kelurahan_id_domisili'] = $pasien->id_kelurahan_domisili;
											$params['nama_provinsi_domisili'] = $pasien->nama_provinsi_domisili;
											$params['nama_kab_kota_domisili'] = $pasien->nama_kab_kota_domisili;
											$params['nama_kecamatan_domisili'] = $pasien->nama_kecamatan_domisili;
											$params['nama_kelurahan_domisili'] = $pasien->nama_kelurahan_domisili;
											$params['rt_domisili'] = $pasien->rt_domisili;
											$params['rw_domisili'] = $pasien->rw_domisili;
											$params['alamat_domisili'] = $pasien->alamat_domisili;
											$params['kodepos_domisili'] = $pasien->kodepos_domisili;
											if($jenispasien=="JKN"){
												$params['id_cara_bayar'] = 2;
												$params['cara_bayar'] = 'JKN';
												$params['id_rujuk'] = $idrujuk;
												$params['rujukan'] = $rujukan;
												$params['no_bpjs'] = trim($this->input->post('nomorkartu', TRUE));
												$params['no_jaminan'] = $nosep;
											}else{
												$params['id_cara_bayar'] = 1;
												$params['cara_bayar'] = 'UMUM';
												$params['id_rujuk'] = 1;
												$params['rujukan'] = 'DATANG SENDIRI';
												$params['no_bpjs'] = '';
												$params['no_jaminan'] = '';
											}
											$params['tgl_daftar'] = $pasien->tgl_daftar;
											$params['status_tracert'] = 0;
											$params['erm'] = $pasien->erm;
											$params['user_daftar'] = "Anjungan Mandiri";
											$params['no_antrian_poly'] = $booking['angkaantrean'];
											$params['session_id'] = session_id();
											$params['id_ruanglama']=getField('koderuanglama','idx',$idruang,'tbl_ruang'); 
											$register=$this->Console_model->insertRegistrasi($params);
											$booking["idx_pendaftaran"]=$register->idx;
											if($jenispasien=="NON JKN"){
											$booking["keterangan"]="Silahkan Menuju Loket Untuk Pembayaran Karcis";
											}
											// Update Task 3
											$booking["taskid"]=3;
											$wt=strtotime(date('Y-m-d H:i:s'))*1000;
											$task=array(
												'kodebooking'=>$booking["kodebooking"],
												'taskid'=>3,
												'waktu'=>$wt
											);
											$tsk=bridgingbpjs("antrean/updatewaktu","POST",json_encode($task),"antrian");
										}
									}else{
										// Buat antrian admisi karena data pasien belum ada
										// $groupClient=getField('labelantrian','kode_jkn',$this->input->post('kodepoli'),'ruang');
										// // $noAntrian=$this->Console_model->getAntrian($groupClient);
										// $dataantrian=array(
										// 	'groupClient'=>$groupClient,
										// 	'tglAntri'=>date('Y-m-d'),
										// );
										// $this->db->insert("tbl_antri",$dataantrian);
										// $insert_id=$this->db->insert_id();
										// $adm=$this->db->where("id",$insert_id)->get("tbl_antri")->row_array();
										// $noAntrian=$adm['noAntrian'];
										// $loketid=getField('loketid','loketlabel',$groupClient,'loket');
										// $label=$groupClient;
										// $booking['labelantrianadmisi']=$label;
										// $booking['angkaantreanadmisi']=$adm['noUrut'];
										// $booking['antreanadmisi']=$adm["noAntrian"];
										$booking['labelantrianadmisi']='';
										$booking['angkaantreanadmisi']='';
										$booking['antreanadmisi']='';
									}
								}else{
									// $groupClient=getField('labelantrian','kode_jkn',$this->input->post('kodepoli'),'ruang');
									// $noAntrian=$this->Console_model->getAntrian($groupClient);
									// $dataantrian=array(
									// 	'groupClient'=>$groupClient,
									// 	'noUrut'=>$noAntrian,
									// 	'tglAntri'=>date('Y-m-d'),
									// 	'noAntrian'=>$groupClient."-".$noAntrian,
									// );
									// $this->db->insert("tbl_antri",$dataantrian);
									// $insert_id=$this->db->insert_id();
									// $adm=$this->db->where("id",$insert_id)->get("tbl_antri")->row_array();
									// $loketid=getField('loketid','loketlabel',$groupClient,'loket');
									// $label=$groupClient;
									// $booking['loketid']=$loketid;
									// $booking['labelantrianadmisi']=$label;
									// $booking['angkaantreanadmisi']=$adm['noUrut'];
									// $booking['antreanadmisi']=$adm["noAntrian"];
									$booking['loketid']='';
									$booking['labelantrianadmisi']='';
									$booking['angkaantreanadmisi']='';
									$booking['antreanadmisi']='';
									
								}
							}else{
								// $groupClient=getField('labelantrian','kode_jkn',$this->input->post('kodepoli'),'ruang');
								// // $noAntrian=$this->Console_model->getAntrian($groupClient);
								// $dataantrian=array(
								// 	'groupClient'=>$groupClient,
								// 	'tglAntri'=>date('Y-m-d'),
								// );
								// $this->db->insert("tbl_antri",$dataantrian);
								// $insert_id=$this->db->insert_id();
								// $adm=$this->db->where("id",$insert_id)->get("tbl_antri")->row_array();
								// $loketid=getField('loketid','loketlabel',$groupClient,'loket');
								// $label=$groupClient;
								// $booking['loketid']=$loketid;
								// $booking['labelantrianadmisi']=$label;
								// $booking['angkaantreanadmisi']=$adm['noUrut'];
								// $booking['antreanadmisi']=$adm["noAntrian"];
								$booking['loketid']='';
								$booking['labelantrianadmisi']='';
								$booking['angkaantreanadmisi']='';
								$booking['antreanadmisi']='';
							}
						}
					}else{
						// jika Gagal Kirim Antrian Buatkan Antrian Admisi

						// $groupClient=getField('labelantrian','kode_jkn',$this->input->post('kodepoli'),'ruang');
						// $noAntrian=$this->Console_model->getAntrian($groupClient);
						// $dataantrian=array(
						// 	'groupClient'=>$groupClient,
						// 	'tglAntri'=>date('Y-m-d'),
						// );
						// $this->db->insert("tbl_antri",$dataantrian);
						// $insert_id=$this->db->insert_id();

						// $adm=$this->db->where("id",$insert_id)->get("tbl_antri")->row_array();
						// $loketid=getField('loketid','loketlabel',$groupClient,'loket');
						// $label=$groupClient;

						// $booking['labelantrianadmisi']=$label;
						// $booking['angkaantreanadmisi']=$adm['noUrut'];
						// $booking['antreanadmisi']=$adm["noAntrian"];
						$booking['labelantrianadmisi']='';
						$booking['angkaantreanadmisi']='';
						$booking['antreanadmisi']='';
						$booking['terkirim']=0;
						$booking['failedmessage']=$arr->metadata->message;
						$booking['loketid']='';
					}
					$ruang=$this->Console_model->getRuangByKodeJkn($kodepoli);
					if(!empty($ruang)){
						// Sistem Antrian Lama
						$pasienbaru=$this->input->post("pasienbaru");
						if($pasienbaru==1) {
							$groupClient="B";
							$noAntrian=$this->Console_model->getAntrian($groupClient);
							$dataantrian=array(
								'groupClient'=>$groupClient,
								'tglAntri'=>date('Y-m-d'),
							);
							$this->db->insert("tbl_antri",$dataantrian);
							$insert_id=$this->db->insert_id();
							// $loketid=2;
							$adm=$this->db->where("id",$insert_id)->get("tbl_antri")->row_array();
							$loketid=getField('loketid','loketlabel',$groupClient,'loket');
							$label=$groupClient;
							$booking['labelantrianadmisi']=$label;
							$booking['angkaantreanadmisi']=$adm['noUrut'];
							$booking['antreanadmisi']=$adm["noAntrian"];
							$booking['loketid']=$loketid;
							// $booking['angkaantreanadmisi']=$this->Console_model->getAntrianAdmisi($loketid);
							// $booking['antreanadmisi']=$label.".".$booking['angkaantreanadmisi'];
						}
						else {
								
							// Create Sep
							// $groupClient=getField('labelantrian','kode_jkn',$this->input->post('kodepoli'),'ruang');
							// $loketid=getField('loketid','loketlabel',$groupClient,'loket');
							$loketid="";
							$label="";
							// $booking['loketid']=$loketid;
						}
					}else{
						$loketid="";
						$label="";
						// $booking['loketid']=$loketid;
					}
				}else{
					$sekarang=date('Y-m-d H:i:s');
					$sekarang_ms=strtotime($sekarang)*1000; 
					$jampraktek=str_pad($jadwal,11,"0",STR_PAD_LEFT);
					$booking=array(
						'kodebooking'=>$this->Console_model->getKodeBooking(),
						'jenispasien'=>$jenispasien,
						'nomorkartu'=>$nomorkartu, //v
						'nik'=>$nik,//v
						'nohp'=>$nohp,//v
						'kodepoli'=>$kodepoli,//v
						'namapoli'=>$namapoli,//v
						'pasienbaru'=>$pasienbaru,
						'norm'=>$norm,
						'tanggalperiksa'=>date('Y-m-d'),
						'kodedokter'=>$kodedokter,
						'namadokter'=>$namadokter,
						'jampraktek'=>$jampraktek,
						'jeniskunjungan'=>$jeniskunjungan,
						'nomorreferensi'=>$nomorreferensi,
						'nomorantrean'=>'',//generate
						'angkaantrean'=>0, //Generate
						'estimasidilayani'=>0, //generate
						'sisakuotajkn'=>0, //generate
						'kuotajkn'=>0, //generate
						'sisakuotanonjkn'=>0, //generate
						'kuotanonjkn'=>0, //generate
						'keterangan'=>'Diharapkan hadir minimal 30 menit sebelum estimasi waktu layan', //generate
					);
					// Antrian Admisi
					// $groupClient=getField('labelantrian','kode_jkn',$this->input->post('kodepoli'),'ruang');
					// $noAntrian=$this->Console_model->getAntrian($groupClient);
					// $dataantrian=array(
					// 	'groupClient'=>$groupClient,
					// 	'tglAntri'=>date('Y-m-d'),
					// );
					// $this->db->insert("tbl_antri",$dataantrian);
					// $insert_id=$this->db->insert_id();
					// $adm=$this->db->where("id",$insert_id)->get("tbl_antri")->row_array();
					// $loketid=getField('loketid','loketlabel',$groupClient,'loket');
					// $label=$groupClient;
					// $booking['labelantrianadmisi']=$label;
					// $booking['angkaantreanadmisi']=$adm['noUrut'];
					// $booking['antreanadmisi']=$adm["noAntrian"];
					// $booking['terkirim']=0;
					
					// $booking['loketid']=$loketid;
					// $booking['failedmessage']=$arr->metadata->message;

					$booking['labelantrianadmisi']='';
					$booking['angkaantreanadmisi']='';
					$booking['antreanadmisi']='';
					$booking['terkirim']=0;
					
					$booking['loketid']=$loketid;
					$booking['terkirim']=0;
					$booking['failedmessage']=$this->input->post('keterangan');
					$spm=6;
				}
				$booking['kapasitaspasien']=$kapasitaspasien;
				$booking['nama']=$this->input->post('nama');
				$booking['labelantrianpoli']=$labelantrianpoli;
				$booking['source']="ONSITE";
				$booking['jkn']=$jenispasien=="JKN"?1:0;
				$booking['spm']=$spm;
				$booking['checkin']=1;
				$booking['waktucheckin']=$sekarang_ms;
				$id=$this->Console_model->insertAntrian($booking);

				$ant=$this->Console_model->getAntrianById($id);
				if(empty($req)) $req=array();
				if(empty($register)) $register=array('idx'=>'','id_daftar'=>'','no_jaminan'=>'');
				$response=json_encode(array(
					'metadata'=>array(
						'code'=>200,
						'message'=>'Antrian Berhasil Dibooking'
					),
					'response'=>$ant,
					'estimasi'=>estimasi($ant->estimasidilayani),
					"request"=>$booking,
					"sep"=>$req,
					'register'=>$register
				));
			}else{
				$response=json_encode(array(
					'metadata'=>array(
						'code'=>202,
						'message'=>'Anda direncanakan kontrol dengan '.$namadokter ." sedangkan jadwalnya untuk hari ini tidak ada"
					),
					'response'=>$antrian,
				));
			}
			
		}else{
			if(!empty($antrian->idx_pendaftaran)) $register=$this->Console_model->getRegister($antrian->idx_pendaftaran);
			else $register=array('idx'=>'','id_daftar'=>'','no_jaminan'=>'');
			$response=json_encode(array(
				'metadata'=>array(
					'code'=>205,
					'message'=>'Anda Sudah Membooking Antrian Untuk hari ini'
				),
				'response'=>$antrian,
				'estimasi'=>estimasi($antrian->estimasidilayani),
				'sep'=>array(),
				'register'=>$register
			));
		}
		header('Content-Type: application/json');
        echo $response;
	}
	function antrianadmisi($loketid){
		$antrian = $this->Console_model->getAntrianAdmisi($loketid);
		echo $antrian;
	}
	function rujukaninternal($norujukan){
		$ri=$this->Console_model->getRujukanInternal($norujukan);
		if(empty($ri)){
			$response=json_encode(array(
				'metadata'=>array(
					'code'=>201,
					'message'=>'Tidak ada rujukan'
				),
				'response'=>$ri
			));
		}else{
			$response=json_encode(array(
				'metadata'=>array(
					'code'=>200,
					'message'=>'OK'
				),
				'response'=>$ri
			));
		}
		header('Content-Type: application/json');
        echo $response;
	}
	function cekpeserta($nokartu){
		$sekarang=date('Y-m-d');
		$response=bridgingbpjs("Peserta/nokartu/".$nokartu."/tglSEP/".$sekarang,"GET","","vclaim");
		header('Content-Type: application/json');
        echo $response;
	}
	function converdate(){
		$tgl='2023-06-09 12:00:00';
		$angka=strtotime($tgl);
		echo "Hasil : ".$angka;
	}
	function converdateutc(){
		date_default_timezone_set('UTC');
    	// $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));/
		$tgl='2023-06-09 12:00:00';
		$angka=strtotime($tgl)*1000;
		echo "Hasil : ".$angka;

		echo "<br>Sekarang v1 : ".strtotime(date('Y-m-d H:i:s'));
		echo "<br>Sekarang v2 : ".time();
	}

	function fp($nomor,$jnsidentitas='noka'){
		$response=bridgingbpjs("ref/pasien/fp/identitas/".$jnsidentitas."/noidentitas/".$nomor,'GET','','antrian');
		header('Content-Type: application/json');
        echo $response;
	}
	function kode($kode){
		// generatebarcode($kode);
		barcode::code39($kode,30,1);
	}
	function updatetask($kodebooking,$taskid){
		$wt=strtotime(date('Y-m-d H:i:s'))*1000;
		$task=array(
			'kodebooking'=>$kodebooking,
			'taskid'=>$taskid,
			'waktu'=>$wt
		);
		$response=bridgingbpjs("antrean/updatewaktu","POST",json_encode($task),"antrian");
		header('Content-Type: application/json');
        echo $response;
	}

	function listen(){
		$this->load->view('listen');
	}
	function auth(){
		date_default_timezone_set('UTC');
		$tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
		// Create Signature
		$contentType = "application/json";
		$signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
		$encodedSignature = base64_encode($signature);

		echo "<br>Time Stamp : ".$tStamp;
		echo "<br>Signature	 : ".$encodedSignature;
		
	}
}