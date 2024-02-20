<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Users_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function getModul()
	{
		$this->db->select('idx,nama_modul');
		$this->db->where('status', 1);
		return $this->db->get('acc_modul')->result();
	}
	function cekUser($modulid, $userd, $password)
	{
		$this->db->where('a.nrp', $userd);
		$this->db->where('userStatus', 1);
		$this->db->where('userPasw', md5($password));
		$this->db->join('pegawai b', 'a.nrp=b.nrp');
		$this->db->join('acc_level c', 'a.levelid=c.idx');
		$users = $this->db->get('users_admin a')->row();
		if (empty($users)) return array('status' => false, 'users' => array(), 'message' => 'User Anda Belum Aktif Atau Belum Terdaftar Silahkan HUbingi Administrator');
		else {
			$modul = $users->modul_akses;
			$arr_modulid = explode(',', $modul);
			if (in_array($modulid, $arr_modulid)) {
				return array('status' => true, 'users' => $users, 'modul' => $this->getModulById($modulid), 'message' => 'Anda Berhasil Login');
			} else {
				return array('status' => false, 'users' => array(), 'message' => 'User Anda Belum Aktif Atau Belum Terdaftar Silahkan Hubungi Administrator','modul'=>$modul);
			}
		}
	}
	function getUsersInfo($nrp){
		return $this->db->where('nrp',$this->session->userdata('userid'))->get("users_admin")->row();

	}
	function getRuangAkses($listruang){
		return $this->db->where_in('idx',$listruang)->where('status_ruang',1)->get("ruang")->result();
	}
	function getDepoAkses($listruang){
		return $this->db->where_in('idx',$listruang)->where('statusdepo',1)->get("depo")->result();
	}
	function getModulById($modulid)
	{
		$this->db->where('idx', $modulid);
		return $this->db->get('acc_modul')->row();
	}

	function update_login_info($uid = null, $sid = null, $last_log = null)
	{
		if ($uid == null) return false;
		if ($sid == null) return false;
		if ($last_log == null) return false;

		$params = array(
			'session_id' => $sid,
			'last_login' => $last_log
		);
		$this->db->where('nrp', $uid);
		$query = $this->db->update('pegawai', $params);
		if ($query) {
			return true;
		} else {
			return false;
		}
	}

	function cek_session_id()
	{
		return $this->session->userdata('level');
		// $this->db->where('session_id', session_id());
		// $query = $this->db->get('pegawai');
		// if ($query->num_rows() > 0) {
		// 	$res = $query->row_array();
		// 	$this->db->where('nrp', $res['nrp']);
		// 	$queUsersAdmin = $this->db->get('users_admin');
		// 	if ($queUsersAdmin->num_rows() > 0) {
		// 		return true;
		// 	} else {
		// 		return false;
		// 	}
		// } else {
		// 	return false;
		// }
	}

	function getMenu($modul, $level, $ruang = "")
    {
        //Parameter menu idmodul, level, ruang
        /**
         * 1. Administrator Tabelload
         * 2. 
         */

        //$ruang = $this->session->userdata('kdlokasi');
        //echo $ruang;exit;
        if ($modul == 3) {
            $menu = $this->load_menu($modul, $ruang); //echo $menu; exit;
            //echo $menu;exit;
            $arr_menu = explode(',', $menu);
            $this->db->where_in('a.idmenu', $arr_menu);
        }
        $this->db->where('b.status', 1);
        $this->db->where('idmodul', $modul);
        $this->db->where('idlevel', $level);
        $this->db->select("a.`idmenu`,b.`judul_menu`,b.`kode`,SUBSTRING_INDEX(b.`kode`, '.', 1) AS index_menu,
            SUBSTRING_INDEX(b.`kode`, '.', -1) AS sub_index_menu ,b.`file_index`,b.`file_kontrol`,a.`hak_aksi`,b.icon");
        $this->db->join('acc_menu b', 'a.idmenu=b.idx');
        $this->db->order_by("CONVERT(SUBSTRING_INDEX(b.`kode`, '.', 1),UNSIGNED INTEGER) , CONVERT(SUBSTRING_INDEX(b.`kode`, '.', -1),UNSIGNED INTEGER)");
        return $this->db->get('acc_hakakses a')->result();
    }

	function load_menu($modul, $ruang)
    {
        $this->db->select('b.menu');
        $this->db->where('a.idx', $ruang);
        $this->db->join('group_ruang b', 'a.grid = b.idx');
        $data = $this->db->get('ruang a')->row();
		return $data;
    }
	function getAntrianDokter($lokasi){
		return $this->db->select("kodedokter,namadokter")
		->join("ruang","kodepoli=kode_jkn")
		->where("ruang.idx",$lokasi)
		->where("tanggalperiksa",date('Y-m-d'))
		->group_by("kodedokter")
		->get("jkn_antrian")->result();
	}
	function getLastAntrian($lokasi,$dokter,$jns=1){
		return $this->db->select("*")
			->join("ruang","kodepoli=kode_jkn")
			->where("ruang.idx",$lokasi)
			->where("kodedokter",$dokter)
			->where("jnsantrian",$jns)
			->where('taskid <=',4)
			->where("tanggalperiksa",date('Y-m-d'))
			->order_by("angkaantrean")
			->limit(1)
			->get("jkn_antrian")->row();
	}

	function getLastAntrianAdmisi($loket,$jns=1){
		return $this->db->select("*")
			->where("a.loketid",$loket)
			->where("jnsantrianadmisi",$jns)
			// ->where("statusadmisi",0)
			->group_start()
			->where('taskid <',3)
			->or_where("taskid IS NULL")
			->group_end()
			->where("tanggalperiksa",date('Y-m-d'))
			->order_by("angkaantreanadmisi")
			->limit(1)
			->get("jkn_antrian a")->row();
	}
	function getNextAntrianAdmisi($loket,$jns=1,$curent=""){
		return $this->db->select("*")
			->where("a.loketid",$loket)
			->where("jnsantrianadmisi",$jns)
			->where("angkaantreanadmisi >",$curent)
			->group_start()
			->where('taskid <',3)
			->or_where("taskid IS NULL")
			->group_end()
			->where("tanggalperiksa",date('Y-m-d'))
			->order_by("angkaantreanadmisi")
			->limit(1)
			->get("jkn_antrian a")->row();
	}
	function getLastAntrianfarmasi($jns=1){
		return $this->db->select("*")
			->where("jnsantrianfarmasi",$jns)
			->where("antreanfarmasi IS NOT NULL")
			->where('taskid <',7)
			// ->group_start()
			// ->where('taskid',6)
			// ->or_where("taskid IS NULL")
			// ->group_end()
			->where("tanggalperiksa",date('Y-m-d'))
			->order_by("angkaantreanadmisi")
			->limit(1)
			->get("jkn_antrian a")->row();
	}
	function getLoket(){
		return $this->db->get("loket")->result();
	}
	function getJadwalDokter($lokasi,$kodedokter){
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

		return $this->db->where("jadwal_poly_id",$lokasi)
		->where("dokterjkn",$kodedokter)
		->where("jadwal_hari",$hari[$hari_ini])
		->get("jkn_jadwalhafis")->row();
	}

	// function getListAntrean($poly,$dokter,$jenisantrean=1){
    //     $this->db->select("a.*,b.idx AS idx_daftar,b.reg_unit,b.tgl_masuk,b.nomr,b.no_ktp,b.nama_pasien,aktiftaskid AS taskid,jnsantrean,labelantrean");
    //     $this->db->join('tbl02_pendaftaran b','a.id_daftar=b.id_daftar');
    //     $this->db->where("tanggal",date('Y-m-d'));
    //     $this->db->where('antriandokter',$dokter);
    //     $this->db->where('antrianruang',$poly);
    //     $this->db->where('aktiftaskid <=',4);
    //     $this->db->where('jnsantrean',$jenisantrean);
    //     $this->db->order_by('no_antrian_poly');
    //     return $this->db->get('tbl02_antrian a')->result();
    // }
}
