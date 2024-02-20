<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Jkn_model extends CI_Model{
    function getData($url,$header){
        // echo HOST_JKN.$url; exit;
        $curl = curl_init(HOST_JKN.$url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array($header));
        $json_response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
        }
        curl_close($curl);
        if (!empty($error_msg)) {
            $error = array('metaData' => array('code' => 201, 'message' => $error_msg));
            $json_response = json_encode($error);
        }
        return $json_response;
    }
    function postData($url, $header, $jsonData)
    {
        // $contentType = "application/x-www-form-urlencoded";
        // $consID = getConsID();
        // $tStamp = getTimestamp();
        // $encodedSignature = getSignature();

        // $result = "";
        // $result .= "Content-Type: " . $contentType . "\r\n";
        // $result .= "X-cons-id: " . $consID . "\r\n";
        // $result .= "X-timestamp: " . $tStamp . "\r\n";
        // $result .= "X-signature: " . $encodedSignature;
        
        $curl = curl_init(HOST_JKN.$url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array($header));
        curl_setopt($curl, CURLOPT_POST, false);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonData);
        $return = curl_exec($curl);
        // $json_response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
        }
        curl_close($curl);
        return $return;
    }
    function putData($url, $header, $jsonData)
    {
        // $contentType = "application/x-www-form-urlencoded";
        // $consID = getConsID();
        // $tStamp = getTimestamp();
        // $encodedSignature = getSignature();

        // $result = "";
        // $result .= "Content-Type: " . $contentType . "\r\n";
        // $result .= "X-cons-id: " . $consID . "\r\n";
        // $result .= "X-timestamp: " . $tStamp . "\r\n";
        // $result .= "X-signature: " . $encodedSignature;

        $curl = curl_init(HOST_JKN.$url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($curl, CURLOPT_HTTPHEADER, array($header));
        curl_setopt($curl, CURLOPT_POST, false);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonData);
        $return = curl_exec($curl);
        curl_close($curl);
        echo $return;
    }
    function deleteData($url, $header, $jsonData)
    {
        // $contentType = "application/x-www-form-urlencoded";
        // $consID = getConsID();
        // $tStamp = getTimestamp();
        // $encodedSignature = getSignature();

        // $result = "";
        // $result .= "Content-Type: " . $contentType . "\r\n";
        // $result .= "X-cons-id: " . $consID . "\r\n";
        // $result .= "X-timestamp: " . $tStamp . "\r\n";
        // $result .= "X-signature: " . $encodedSignature;

        $curl = curl_init(HOST_JKN.$url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
        curl_setopt($curl, CURLOPT_HTTPHEADER, array($header));
        curl_setopt($curl, CURLOPT_POST, false);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonData);
        $return = curl_exec($curl);
        curl_close($curl);
        echo $return;
    }
    function stringDecrypt($key, $string){
        // echo base64_decode($string); exit;
        $encrypt_method = 'AES-256-CBC';
        // hash
        $key_hash = hex2bin(hash('sha256', $key));
        // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
        $iv = substr(hex2bin(hash('sha256', $key)), 0, 16);
        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key_hash, OPENSSL_RAW_DATA, $iv);
        return $output;
    }
    function getRujukanOnline($noSep){
        $this->db->where('batal',0);
        $this->db->where('noSep',$noSep);
        return $this->db->get('tbl02_rujukanonline')->row();
    }
    function countRiwayatPengajuan(){
        return $this->db->get('tbl02_pengajuansep')->num_rows();
    }
    function jmlRiwayatPengajuan($start,$limit){
        $this->db->order_by('idx','desc');
        $this->db->limit($limit, $start);
        return $this->db->get('tbl02_pengajuansep')->result();
    }
    function getSuratKontrol($no){
        $this->db->where('noSuratKontrol',$no);
        return $this->db->get('tbl02_suratkontrol')->row();
    }
    function getSepLokal($nosep){
        $this->db->where('noSep',$nosep);
        return $this->db->get('tbl02_sep_response')->row();
    }
    function countDataJadwal($q="",$poli="",$dokter="",$hari=""){
        // $this->db->join('pegawai b','jadwal_dokter_id=NRP');
		if(!empty($poli)) $this->db->where("jadwal_poly_id",$poli);
		if(!empty($dokter)) $this->db->where("jadwal_dokter_id",$dokter);
		if(!empty($hari)) $this->db->where("jadwal_hari",$hari);
		return $this->db->group_start()
            ->like('jadwal_dokter_id',$q)
            ->or_like('dokterjkn',$q)
			->or_like('jadwal_poly_nama',$q)
            ->or_like('jadwal_dokter_nama',$q)
			->group_end()
            ->group_by('jadwal_dokter_id,jadwal_poly_id')
            ->order_by("jadwal_dokter_id, FIELD(jadwal_hari,'Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu')")
            ->get('jkn_jadwalhafis a')->num_rows();
    }
    function getDataJadwal1($limit=10, $mulai=0, $q="",$poli="",$dokter="",$hari=""){
        $this->db->select("`jadwal_dokter_id` AS kodedokterrs,
        `dokterjkn` AS kodedokterjkn,jadwal_dokter_nama AS namadokter,jadwal_poly_id as kodepolirs,jadwal_subspesialis_jkn as kodepolijkn,jadwal_poly_nama as poliklinik,
        CONCAT('<ol>',GROUP_CONCAT(CONCAT('<li>',jadwal_poly_nama,' - ',jadwal_hari,' (',jadwal_jam_mulai,' - ',jadwal_jam_selesai,')</li>') SEPARATOR ' '),'</ol>') AS rincian_jadwal,
        GROUP_CONCAT(jadwal_hari) AS hari");
		if(!empty($poli)) $this->db->where("jadwal_poly_id",$poli);
		if(!empty($dokter)) $this->db->where("jadwal_dokter_id",$dokter);
		if(!empty($hari)) $this->db->where("jadwal_hari",$hari);
		return $this->db->group_start()
            ->like('jadwal_dokter_id',$q)
            ->or_like('dokterjkn',$q)
            ->or_like('jadwal_poly_nama',$q)
            ->or_like('jadwal_dokter_nama',$q)
			->group_end()
            ->limit($limit, $mulai)
            ->group_by('jadwal_dokter_id, jadwal_poly_id')
            ->order_by("jadwal_dokter_id, FIELD(jadwal_hari,'Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu')")
            ->get('jkn_jadwalhafis a')->result();
    }
    function getDataJadwal($limit=10, $mulai=0, $q="",$poli="",$dokter="",$hari=""){
        $this->db->select("`kodedokterrs` AS kodedokterrs,
        kodedokter AS kodedokterjkn,namadokter AS namadokter,kodepolirs as kodepolirs,kodesubspesialis as kodepolijkn,namasubspesialis as poliklinik,
        CONCAT('<ol>',GROUP_CONCAT(CONCAT('<li>',namasubspesialis,' - ',namahari,' (',jadwal,')</li>') SEPARATOR ' '),'</ol>') AS rincian_jadwal,
        GROUP_CONCAT(namahari) AS hari");
		if(!empty($poli)) $this->db->where("kodepolirs",$poli);
		if(!empty($dokter)) $this->db->where("kodedokterrs",$dokter);
		if(!empty($hari)) $this->db->where("namahari",$hari);
		return $this->db->group_start()
            ->like('kodedokterrs',$q)
            ->or_like('kodedokter',$q)
            ->or_like('namapoli',$q)
            ->or_like('namadokter',$q)
			->group_end()
            ->limit($limit, $mulai)
            ->group_by('kodedokter, kodesubspesialis')
            ->order_by("kodedokter, FIELD(namahari,'SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU','MINGGU')")
            ->get('jkn_jadwaldokter a')->result();
    }

    function getPoly(){
        return $this->db->where("status_ruang",1)->where('jns_layanan',2)
        ->get('ruang')->result();
    }
    // function getDokter($rid=""){
    //     return $this->db->where('dokter',1)
    //     ->where('b.idruang',$rid)
    //     ->join('tbl01_dokter b','a.NRP=b.NRP')
    //     ->get('pegawai a')->result();
    // }
    function getJadwalDokter($poli,$dokter){
        return $this->db->select("*,
        (SELECT SUBSTR(jadwal,1,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='SENIN') AS jam_mulai_senin,
        (SELECT SUBSTR(jadwal,7,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='SENIN') AS jam_selesai_senin,
        (SELECT SUBSTR(jadwal,1,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='SELASA') AS jam_mulai_selasa,
        (SELECT SUBSTR(jadwal,7,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='SELASA') AS jam_selesai_selasa,
        (SELECT SUBSTR(jadwal,1,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='RABU') AS jam_mulai_rabu,
        (SELECT SUBSTR(jadwal,7,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='RABU') AS jam_selesai_rabu,
        (SELECT SUBSTR(jadwal,1,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='KAMIS') AS jam_mulai_kamis,
        (SELECT SUBSTR(jadwal,7,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='KAMIS') AS jam_selesai_kamis,
        (SELECT SUBSTR(jadwal,1,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='JUMAT') AS jam_mulai_jumat,
        (SELECT SUBSTR(jadwal,7,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='JUMAT') AS jam_selesai_jumat,
        (SELECT SUBSTR(jadwal,1,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='SABTU') AS jam_mulai_sabtu,
        (SELECT SUBSTR(jadwal,7,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='SABTU') AS jam_selesai_sabtu,
        (SELECT SUBSTR(jadwal,1,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='MINGGU') AS jam_mulai_minggu,
        (SELECT SUBSTR(jadwal,7,5) as jadwal_jam_mulai FROM `jkn_jadwaldokter` WHERE kodedokter=a.kodedokter AND kodesubspesialis=a.kodesubspesialis AND namahari='MINGGU') AS jam_selesai_minggu")
        ->where('kodedokterrs',$dokter)
        ->where('kodepolirs',$poli)
        ->group_by('kodepoli,kodedokter')
        ->get('jkn_jadwaldokter a')->row();
    }
    function getDokterByNrp($nrp){
        return $this->db->where('nrp',$nrp)
            ->get('pegawai')->row();
    }
    function cekjadwalpoli($kodedokter,$kodepoli,$hari){
        return $this->db->where('kodedokter',$kodedokter)
            ->where('kodesubspesialis',$kodepoli)
            ->where('namahari',$hari)
            ->get('jkn_jadwaldokter')->row();
    }   
    function getDokter($where){
        return $this->db->where_in('profId',$where)->get('pegawai')->result();
    }
	function cekBooking($nik){
		return $this->db->where('nik',$nik)->get("jkn_antrian")->row();
	}
	function updatetask($kodebooking,$taskid,$idx_pendaftaran=0,$nomr="",$resep="Tidak Ada"){
		$wa=strtotime(date('Y-m-d H:i:s'))*1000;
		if($taskid==5){
			
			$request=array(
				'kodebooking'=>$kodebooking,
				'taskid'=>$taskid,
				'waktu'=>$wa,
				'jenisresep'=>$resep
			);
			if(!empty($idx_pendaftaran)){
				$statuspasien=array(
					'statuspasien'=>5
				);
				$this->db->where("idx",$idx_pendaftaran)->update("pendaftaran",$statuspasien);
			}
		}else{
			$request=array(
				'kodebooking'=>$kodebooking,
				'taskid'=>$taskid,
				'waktu'=>$wa
			);
			// print_r($request);
			// exit;
		}
		
		$response=bridgingbpjs("antrean/updatewaktu","POST",json_encode($request),"antrian");
		$arr=json_decode($response);
		if($arr->metadata->code==200){
			if(empty($idx_pendaftaran)){
				$task=array(
					'taskid'=>$taskid
				);
			}else{
				$task=array(
					'idx_pendaftaran'=>$idx_pendaftaran,
					'taskid'=>$taskid
				);
			}
			$this->db->where("kodebooking",$kodebooking)->update("jkn_antrian",$task);
		}
		// return json_encode($request);
		return $response;
	}
	function bookingFarmasi($req){
		$antrean=$this->db->where("kodebooking",$req["kodebooking"])
			->get("jkn_antrian")
			->row();
		if(!empty($antrean)){
			if(empty($antrean->antreanfarmasi)){
				$nomor = $this->db->select("angkaantrianfarmasi")
					->where("tanggalperiksa",date('Y-m-d'))
					->where("angkaantrianfarmasi IS NOT NULL")
					->order_by("angkaantrianfarmasi","DESC")
					->limit(1)
					->get("jkn_antrian")
					->row();
				if($req["taskaktif"]<5){
					// Jika belum kirim Task selesai layan poli (5)
					$this->updatetask($req["kodebooking"],5,"","",$req["jenisresep"],$req["idx_pendaftaran"]);
				}
				// booking antrean Poli
				if(empty($nomor)) $angkaantrianfarmasi=1;
				else{
					$angkaantrianfarmasi=intval($nomor->angkaantrianfarmasi)+1;
					
				}
				$book=array(
					"kodebooking"=>$req["kodebooking"],
					"jenisresep"=>$req["jenisresep"],
					"nomorantrean"=>$angkaantrianfarmasi,
					"keterangan"=>"Silahkan Mengambil Obat Ke Depo"
				);
				$response=bridgingbpjs("antrean/farmasi/add","POST",json_encode($book),"antrian");
				$arr=json_decode($response);
				if($arr->metadata->code==200){
					$antrean=array(
						'angkaantrianfarmasi'=>$angkaantrianfarmasi,
						'antreanfarmasi'=>$angkaantrianfarmasi
					);
					$this->db->where("kodebooking",$req['kodebooking'])->update("jkn_antrian",$antrean);
					$response=json_encode(array(
						'metadata'=>$arr->metadata,
						'response'=>$this->db->where("kodebooking",$req["kodebooking"])->get("jkn_antrian")->row(),
						'responsejkn'=>$arr
					));
				}
			}else{
				$response=json_encode(array(
					'metadata'=>array(
						'code'=>200,
						'message'=>'Cetak Ulang Antrean'
					),
					'response'=>$this->db->where("kodebooking",$req["kodebooking"])->get("jkn_antrian")->row(),
				));
			}
		}else{
			$response=json_encode(array(
				'metadata'=>array(
					'code'=>203,
					'message'=>"Kode Booking Tdak Ditemukan"
				)
			));
		}
		return $response;
	}
	function getLastAntrean($poly,$dokter,$jenisantrean=1,$curent=""){
        $this->db->select("a.*,b.idx AS idx_daftar,b.reg_unit,b.tgl_masuk,b.nomr,b.no_ktp,b.nama_pasien,aktiftaskid AS taskid,jnsantrean,labelantrean");
        $this->db->join('tbl02_pendaftaran b','a.id_daftar=b.id_daftar');
        $this->db->where("tanggal",date('Y-m-d'));
        $this->db->where('antriandokter',$dokter);
        $this->db->where('antrianruang',$poly);
        $this->db->where('aktiftaskid <=',4);
        $this->db->where('jnsantrean',$jenisantrean);
        if(!empty($curent)) $this->db->where('no_antrian_poly',$curent);
        $this->db->order_by('no_antrian_poly');
        $this->db->limit(1);
        return $this->db->get('tbl02_antrian a')->row();
    }
	function getJadwalOk($tanggalawal="",$tanggalakhir=""){
		$this->db->select("*,a.idx as idx_jadwal");
		if(!empty($tanggalawal)) $this->db->where("tanggaloperasi >=",$tanggalawal);
		if(!empty($tanggalakhir)) $this->db->where("tanggaloperasi <=",$tanggalakhir);
		return $this->db->join("pendaftaran b","a.idx_pendaftaran=b.idx")
		->order_by('a.idx','DESC')
		->get("jkn_jadwaloperasi a")
		->result();
	}
	function getJadwalOkByID($idx){
		$this->db->select("*,a.idx as idx_jadwal");
		$this->db->where("a.idx",$idx);
		return $this->db->join("pendaftaran b","a.idx_pendaftaran=b.idx")
		->order_by('a.idx','DESC')
		->get("jkn_jadwaloperasi a")
		->row();
	}
	function hapusJadwalOk($idx){
		return $this->db->where("idx",$idx)->delete("jkn_jadwaloperasi");
	}
	function getKodeBooking(){
		$data=$this->db->like("kodebooking",date('ymd'))
		->order_by("kodebooking",'DESC')
		->get("jkn_jadwaloperasi")
		->row();
		if(empty($data)){
			return date('ymd')."-00001";
		}else{
			$kode=explode("-",$data->kodebooking);
			$new=intval($kode[1])+1;
			return date('ymd')."-".str_pad($new,4,"0",STR_PAD_LEFT);
		}
	}
}
