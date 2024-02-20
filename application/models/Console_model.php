<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Console_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function getPasienByNomr($nomor){
		$this->simrs = $this->load->database('simrs', TRUE);
		return $this->simrs->where("nomr",$nomor)->get("tbl01_pasien")->row();
	}
	function kodeRujukInternal($nomr,$kodepoli){
		$this->simrs = $this->load->database('simrs', TRUE);
		return $this->simrs->select("a.nomr,a.id_daftar,a.reg_unit,LPAD(a.ckir,19,'0') as ckir,a.no_jaminan")
		->where("nomr",$nomr)
		->where("kodejkn",$kodepoli)
		->join("tbl01_ruang b","a.id_ruang=b.idx")
		->order_by('a.idx','DESC')
		->get("tbl02_pendaftaran a")->row();
	}
	function getPasienByNoka($nomor){
		$this->simrs = $this->load->database('simrs', TRUE);
		return $this->simrs->where("no_bpjs",$nomor)->get("tbl01_pasien")->row();
	}
	function insertRegistrasi($data){
		$this->simrs = $this->load->database('simrs', TRUE);
		$this->simrs->insert("tbl02_pendaftaran",$data);
		$insertid=$this->simrs->insert_id();
		return $this->simrs->select('idx,id_daftar,no_jaminan')->where('idx',$insertid)->get('tbl02_pendaftaran')->row();
	}
	function getRegister($insertid){
		$this->simrs = $this->load->database('simrs', TRUE);
		return $this->simrs->select('idx,id_daftar,no_jaminan')->where('idx',$insertid)->get('tbl02_pendaftaran')->row();
	}
	function getPasienByNik($nomor){
		$this->simrs = $this->load->database('simrs', TRUE);
		return $this->simrs->where("no_ktp",$nomor)->get("tbl01_pasien")->row();
	}
	function getBooking($kodebooking){
		$booking=$this->db->where("kodebooking",$kodebooking)->get("jkn_antrian")->row_array();
		if(!empty($booking)){
			$sekarang=date('Y-m-d');
			$waktu=strtotime($sekarang)*1000;
			$checkin=array(
				'checkin'=>1,
				'waktucheckin'=>$waktu
			);
			$this->db->where("kodebooking",$kodebooking)->update("jkn_antrian",$checkin);
		}
		return $booking;
	}
	function getJadwal($kodepoli,$kodedokter){
		$sekarang=date('Y-m-d');
		$hari_ini=date('D', strtotime($sekarang));
		$hari=array(
			'Sun' => 'Minggu',
			'Mon' => 'Senin',
			'Tue' => 'Selasa',
			'Wed' => 'Rabu',
			'Thu' => 'Kamis',
			'Fri' => 'Jumat',
			'Sat' => 'Sabtu'
		);

		$date = new DateTime($sekarang);
		$week = $date->format("W");
		$pekan=$week%2==0?2:1;

		return $this->db->where("jadwal_subspesialis_jkn",$kodepoli)
		->where("dokterjkn",$kodedokter)
		->where("jadwal_hari",$hari[$hari_ini])
		->group_start()
		->where("jadwal_pekan",0)
		->or_where("jadwal_pekan",$pekan)
		->group_end()
		->get("jkn_jadwalhafis")
		->row();
	}
	
	function getJadwalPoly($kodepoli){
		$sekarang=date('Y-m-d');
		$hari_ini=date('D', strtotime($sekarang));
		$hari=array(
			'Sun' => 'Minggu',
			'Mon' => 'Senin',
			'Tue' => 'Selasa',
			'Wed' => 'Rabu',
			'Thu' => 'Kamis',
			'Fri' => 'Jumat',
			'Sat' => 'Sabtu'
		);

		$date = new DateTime($sekarang);
		$week = $date->format("W");
		$pekan=$week%2==0?2:1;

		return $this->db->where("jadwal_subspesialis_jkn",$kodepoli)
		->where("jadwal_hari",$hari[$hari_ini])
		->group_start()
		->where("jadwal_pekan",0)
		->or_where("jadwal_pekan",$pekan)
		->group_end()
		->get("jkn_jadwalhafis")
		->result();
	}
	function getPoliklinikBuka(){
		$sekarang=date('Y-m-d');
		$hari_ini=date('D', strtotime($sekarang));
		$hari=array(
			'Sun' => 'Minggu',
			'Mon' => 'Senin',
			'Tue' => 'Selasa',
			'Wed' => 'Rabu',
			'Thu' => 'Kamis',
			'Fri' => 'Jumat',
			'Sat' => 'Sabtu'
		);

		$date = new DateTime($sekarang);
		$week = $date->format("W");
		$pekan=$week%2==0?2:1;

		return $this->db->select("jadwal_poly_id,jadwal_subspesialis_jkn as kodepoli,jadwal_poly_nama as namapoli,icon")
		->join("ruang","jadwal_poly_id=ruang.idx")
		->group_start()
		->where("jadwal_pekan",0)
		->or_where("jadwal_pekan",$pekan)
		->group_end()
		->group_by("jadwal_poly_id")
		->get("jkn_jadwalhafis")
		->result();
	}
	function countPasien($poly,$dokter,$tgl){
        $this->db->select("*,SUM(CASE WHEN jkn=1 THEN 1 ELSE 0 END) AS jkn,
		SUM(CASE WHEN jkn=0 THEN 1 ELSE 0 END) AS nonjkn, MAX(angkaantrean) AS angkaantrean");
        $this->db->where('kodepoli',$poly);
        $this->db->where('kodedokter',$dokter);
        $this->db->where('tanggalperiksa',$tgl);
        $this->db->where('batal',0);
        return $this->db->get('jkn_antrian')->row();
    }
	function get_antrian_poly($poly,$tgl_kunjungan,$dokter){
        // $this->db->where('batal',0);
        $this->db->where('kodepoli',$poly);
        $this->db->where('tanggalperiksa',$tgl_kunjungan);
        $this->db->where('kodedokter', $dokter);
        $this->db->order_by('angkaantrean','DESC');
        $row=$this->db->get('jkn_antrian')->row();
        if(!empty($row)){
            $antrian=$row->angkaantrean +1;
        }else{
            $antrian=1;
        }
        return $antrian;
    }
	function getRuangByKodeJkn($kode){
		return $this->db->where("kodejkn",$kode)->get("tbl_ruang")->row();
	}
	function getAntrianAdmisi($loketid){
		$antrian=$this->db->select("angkaantreanadmisi")
		->where("loketid",$loketid)
		->where('tanggalperiksa',date('Y-m-d'))
		->order_by("angkaantreanadmisi","DESC")
		->get("jkn_antrian")
		->row();
		if(empty($antrian)){
			return 1;
		}else{
			$an= $antrian->angkaantreanadmisi + 1;
			return $an;
		}

	}
	function getKodeBooking(){
        $sep=date('Ymd');
        $this->db->select('kodebooking as kodebooking');
        $this->db->like('kodebooking',$sep);
        $this->db->order_by('kodebooking', 'desc');
        $this->db->limit(1);
        $last_row=$this->db->get('jkn_antrian')->row();
        if($last_row){
            $last_kode=$last_row->kodebooking;
            $last_kode_exp=explode('-', $last_kode);
            $new_kode=$last_kode_exp[1] + 1;
            $new_kode_format=$sep ."-" .str_pad($new_kode, 4,'0',STR_PAD_LEFT);
        }else{
            $new_kode_format= $sep ."-0001";
        }
        return $new_kode_format;
    }
    function countPasienNonJkn($poly,$dokter,$tgl){
        $this->db->where('log_batal',0);
        $this->db->where('log_polyid',$poly);
        $this->db->where('log_dokterid',$dokter);
        $this->db->where('log_tglkunjungan',$tgl);
        $this->db->where('log_carabayarid !=',2);
        $this->db->where('log_batal',0);
        return $this->db->get('jkn_logdaftar')->num_rows();
    }
	function insertAntrian($data){
		$this->db->insert("jkn_antrian",$data);
		return $this->db->insert_id();
	}
	function getAntrianById($id){
		return $this->db->where("idx",$id)->get("jkn_antrian")->row();
	}
	function cekAntrian($kodepoli,$nik){
		return $this->db->where("tanggalperiksa",date('Y-m-d'))
		->where("batal",0)
		->where("taskid !=",99)
		->where("kodepoli",$kodepoli)
		->where("nik",$nik)
		->get("jkn_antrian")
		->row();
	}
	function getRujukanInternal($norujukan){
		return $this->db->where("norujukan_pasien",$norujukan)
		->get("permintaankonsul")
		->result();
	}
	function getAntrian($groupClient){
        $antrian=$this->db->where("groupClient",$groupClient)
        ->where("tglAntri",date('Y-m-d'))
        ->order_by("noAntrian","DESC")
        ->limit(1)
        ->get("tbl_antri")
        ->row();
        if(empty($antrian)) return "001";
        else{
            $last=intval($antrian->noUrut)+1;
            return str_pad($last,"3","0",STR_PAD_LEFT);
        }
    }
	function getAntrianFarmasi(){
		$antrian=$this->db->select("angkaantreanfarmasi")
		->where('tanggalperiksa',date('Y-m-d'))
		->order_by("angkaantreanfarmasi","DESC")
		->get("jkn_antrian")
		->row();
		if(empty($antrian)){
			return 1;
		}else{
			$an= $antrian->angkaantreanfarmasi + 1;
			return $an;
		}

	}

	function cekKunjungan($idruang,$nomr){
		$this->simrs = $this->load->database('simrs', TRUE);
		return $this->simrs->select("*,(CASE WHEN (DATE_FORMAT(tgl_masuk,'%Y-%m-%d')=tgl_daftar) THEN 1 ELSE 0 END) AS pasienbaru")
                ->where("DATE_FORMAT(tgl_masuk,'%Y-%m-%d')",date('Y-m-d'))
                ->where('id_ruang',$idruang)
                ->where('nomr',$nomr)
                ->where('status_pasien',1)
                ->get('tbl02_pendaftaran')
                ->row();
	}
	public function getIdDaftar() {
		$this->simrs = $this->load->database('simrs', TRUE);
        if(date("Y") == '2017'){
            $query = $this->simrs->query("SELECT MAX(id_daftar) as max_daftar FROM tbl02_pendaftaran"); 
            $row = $query->row_array();
            $max_daftar = $row['max_daftar']; 
            $max_daftar1 =(int) substr($max_daftar,5,5);
            $iddaftar = $max_daftar1 +1;
            $max_iddaftar = sprintf("%05s",$iddaftar);
            $tahun = date("Y");
            $no_daftar = $tahun."-".$max_iddaftar;
        }else{
            $query = $this->simrs->query("SELECT MAX(id_daftar) as max_daftar FROM tbl02_pendaftaran"); 
            $row = $query->row_array();
            $num = $query->num_rows();
            $thn = date("Y");
            $kode= substr($row['max_daftar'],0,5);
            if($num == 0 || $kode == $thn."-"){
                $no_daftar = $thn."000001";
            }else{
                $thn_sistem = substr($row['max_daftar'],0,4);
                if($thn > $thn_sistem){
                    $nobaru = "1";
                }else{
                    $nobaru = substr($row['max_daftar'],4,6)+1;
                }
                $max_iddaftar = sprintf("%06d",$nobaru);
                $no_daftar = $thn.$max_iddaftar;
            }
        }
        
        return $no_daftar;
    }
	function autoUpdateSuratKontrol($sk){
		/**
		 * {
            "noSuratKontrol":"0117R0770122K000004",
            "jnsPelayanan":"Rawat Inap",
            "jnsKontrol":"2",
            "namaJnsKontrol":"Surat Kontrol",
            "tglRencanaKontrol":"2022-01-06",
            "tglTerbitKontrol":"2022-01-05",
            "noSepAsalKontrol":"0117R0770122V000003",
            "poliAsal":"INT",
            "namaPoliAsal":"-",
            "poliTujuan":"INT",
            "namaPoliTujuan":"PENYAKIT DALAM",
            "tglSEP":"2022-01-04",
            "kodeDokter":"296676",
            "namaDokter":"ABD KADIR",
            "noKartu":"0002035874204",
            "nama":"ANI AZKIA",
            "terbitSEP":"Belum"
         }
		*/
		$response=bridgingbpjs("RencanaKontrol/JadwalPraktekDokter/JnsKontrol/".$sk->jnsKontrol."/KdPoli/".$sk->poliTujuan."/TglRencanaKontrol/".date('Y-m-d'),"GET","","vclaim");
		$arr=json_decode($response);
		if($arr->metaData->code==200){
			// jika ada jadwal dokter untuk poli tujuan
			$listjadwal=$arr->response->list;
			$dokter=$listjadwal[0]->kodeDokter;
			if(count($listjadwal)>1){
				foreach ($listjadwal as $l) {
					if($l->kodeDokter==$sk->kodeDokter){
						$dokter=$l->kodeDokter;
						break;
					}
				}
			}
			$request=array(
				'noSuratKontrol'=>$sk->noSuratKontrol,
				'noSEP'=>$sk->noSepAsalKontrol,
				'kodeDokter'=>$dokter,
				'poliKontrol'=>$sk->poliTujuan,
				'tglRencanaKontrol'=>date('Y-m-d'),
				'user'=>'antrol',
			);
			$response=bridgingbpjs("RencanaKontrol/Update","PUT",json_encode($request),"vclaim");
		}
		return $response;
	}
}
