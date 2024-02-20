<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Pasien_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countPasien($keyword = "", $param = "")
	{
		$this->db->select("count(idx) as jmldata");
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->like('nomr', $keyword);
			$this->db->or_like('nobpjs', $keyword);
			$this->db->or_like('nik', $keyword);
			$this->db->or_like('nama', $keyword);
			$this->db->or_like('tempat_lahir', $keyword);
			$this->db->or_like('tgl_lahir', $keyword);
			$this->db->or_like('alamat', $keyword);
		}
		$res = $this->db->get('pasien')->row();
		// print_r($res); exit;
		if(!empty($res)) return $res->jmldata;
		else return 0;
		//$this->db->limit($limit, $start);
	}
	function getPasien($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nomr', $keyword);
			$this->db->or_like('nobpjs', $keyword);
			$this->db->or_like('nik', $keyword);
			$this->db->or_like('nama', $keyword);
			$this->db->or_like('tempat_lahir', $keyword);
			$this->db->or_like('tgl_lahir', $keyword);
			$this->db->or_like('alamat', $keyword);
			$this->db->group_end();
		}
		$this->db->order_by('idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('pasien')->result();
	}
	function getPasienBynomr($nomr)
	{
		$this->db->where('nomr', $nomr);
		return $this->db->get('pasien')->row();
	}

	function countRiwayat($nomr, $keyword = "", $param = "")
	{
		$this->db->where('nomr_pasien', $nomr);
		$this->db->where('batal',0);
		$this->db->group_start();
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->like('id_daftar', $keyword);
			$this->db->or_like('reg_unit', $keyword);
			$this->db->or_like('jns_layanan', $keyword);
			$this->db->or_like('nama_poli', $keyword);
			$this->db->or_like('nama_dokter', $keyword);
			$this->db->or_like('carabayar', $keyword);
		}
		$this->db->group_end();
		return $this->db->get('pendaftaran')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getRiwayat($nomr, $limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
		$this->db->where('batal',0);
		$this->db->where('nomr_pasien', $nomr);
		$this->db->group_start();
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->like('id_daftar', $keyword);
			$this->db->or_like('reg_unit', $keyword);
			$this->db->or_like('jns_layanan', $keyword);
			$this->db->or_like('nama_poli', $keyword);
			$this->db->or_like('nama_dokter', $keyword);
			$this->db->or_like('carabayar', $keyword);
		}
		$this->db->group_end();
		$this->db->order_by('idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('pendaftaran')->result();
	}
	function getCaraBayar($param = array())
	{
		if (!empty($param)) $this->db->where($param);
		return $this->db->get('cara_bayar')->result();
	}
	function getRujukan($param = array())
	{
		if (!empty($param)) $this->db->where($param);
		return $this->db->get('rujukan')->result();
	}
	function pilihRujukan($id){
		$this->db->where('idx',$id);
		return $this->db->get('rujukan')->row();
	}
	function getCaraDaftar(){
		$this->db->where('aktif',1);
		return $this->db->get('cara_daftar')->result();
	}
	function getAgama(){
		return $this->db->get('agama')->result();
	}
	function getNegara(){
		return $this->db->get('negara')->result();
	}
	function getPendidikan(){
		return $this->db->get('pendidikan')->result();
	}
	function getPekerjaan(){
		return $this->db->get('pekerjaan')->result();
	}
	function getStatus(){
		return $this->db->get('status_kawin')->result();
	}
	function getSuku(){
		return $this->db->get('suku')->result();
	}
	function getRuang($jns_layanan=2){
		if($jns_layanan==2){
			// $sekarang=date_create(date('Y-m-d'));
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
			return $this->db->select("jadwal_poly_id AS idx,jadwal_subspesialis_jkn AS kode_jkn,jadwal_poly_nama AS ruang")
			->where("jadwal_hari",$hari[$hari_ini])
			->group_by('jadwal_poly_id')
			->get('jkn_jadwalhafis')->result();
		}else{
			return $this->db->where('jns_layanan',$jns_layanan)
			->where('status_ruang',1)
			->get('ruang')->result();
		}
		
	}
	function getBahasa(){
		// $this->db->where('aktif',1);
		return $this->db->get('bahasa')->result();
	}
	function getProvinsi(){
		return $this->db->where("LENGTH(kode)",2)->get('wilayah')->result();
	}
	function getKabupaten($provinsi){
        $this->db->where("SUBSTR(kode,1,2)",$provinsi);
        $this->db->where("LENGTH(kode)",5);
        return $this->db->get('wilayah')->result();
	}
	function getKecamatan($kabupaten){
        $this->db->where('SUBSTR(kode,1,5)',$kabupaten);
        $this->db->where("LENGTH(kode)",8);
        return $this->db->get('wilayah')->result();
	}
	function getKelurahan($kecamatan){
		$this->db->where('SUBSTR(kode,1,8)',$kecamatan);
        $this->db->where("LENGTH(kode)",13);
        return $this->db->get('wilayah')->result();
	}
	function getJenisLayanan(){
		$this->db->where('aktif',1);
		return $this->db->get('jenis_layanan')->result();
	}
	function getDokter($poli,$jns_layanan=2){
		if($jns_layanan==2) {
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
			return $this->db->select("jadwal_dokter_id AS nrp,dokterjkn AS dokterjkn,jadwal_dokter_nama AS pgwNama")
			->where("jadwal_hari",$hari[$hari_ini])
			->where("jadwal_poly_id",$poli)
			->group_start()
			->where("jadwal_pekan",0)
			->or_where("jadwal_pekan",$pekan)
			->group_end()
			->group_by('jadwal_dokter_id')
			->get('jkn_jadwalhafis')->result();
		}else{
			$this->db->where('dokter',1);
			$this->db->join('pegawai','pegawai.NRP=dokter.nrp');
			return $this->db->get('dokter')->result();
		}
		
		
		
	}
	function getDokterSubSpesialis($poli,$jns_layanan=2){
		if($jns_layanan==2) {
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
			return $this->db->select("jadwal_dokter_id AS nrp,dokterjkn AS dokterjkn,jadwal_dokter_nama AS pgwNama")
			->where("jadwal_hari",$hari[$hari_ini])
			->where("jadwal_subspesialis_jkn",$poli)
			->group_start()
			->where("jadwal_pekan",0)
			->or_where("jadwal_pekan",$pekan)
			->group_end()
			->group_by('jadwal_dokter_id')
			->get('jkn_jadwalhafis')->result();
		}else{
			$this->db->where('dokter',1);
			$this->db->join('pegawai','pegawai.NRP=dokter.nrp');
			return $this->db->get('dokter')->result();
		}
		
		
		
	}
	function getJadwalDokter($poli,$dokter){
		return $this->db->where("jadwal_poly_id",$poli)
		->where("jadwal_dokter_id",$dokter)
		->get("jkn_jadwalhafis")
		->row();
	}
	function getRujukanOnline($reg_unit){
		return $this->db->where('reg_unit',$reg_unit)->where('batal',0)->get("rujukanonline")->row();
	}
	function gtetPolyById($poliid){
		return $this->db->where('idx',$poliid)->get('ruang')->row();
	}	
	function cariSEPLokal($nosep,$tgl)
    {
        $this->db->order_by('idx','desc');
        $this->db->where('tglSep',$tgl);
        $this->db->where('noSep', $nosep);
        return $this->db->get('sep_response')->row();
    }

	function cekKunjungan($id_poli,$nomr_pasien){
		$this->db->where('batal',0);
		$this->db->where('id_poli',$id_poli);
		$this->db->where('nomr_pasien',$nomr_pasien);
		$this->db->where('tgl_kunjungan',date('Y-m-d'));
		return $this->db->get('pendaftaran')->num_rows();
	}
	function createIdDaftar($sep=""){
		if(empty($sep)) $sep=date('Ym');
		$this->db->select('id_daftar');
		$this->db->where("DATE_FORMAT(tgl_kunjungan,'%Y%m')",$sep);
		$this->db->order_by('id_daftar','DESC');
		$this->db->limit(1);
		$data=$this->db->get('pendaftaran')->row();
		if($data){
			$id=$data->id_daftar;
			$newid=$id+1;
		}else{
			$newid=$sep."0001";
		}
		return $newid;
	}
	function createRegUnit($poli,$sep=""){
		if(empty($sep)) $sep=date('Ymd');
		$this->db->select('reg_unit');
		$this->db->where("DATE_FORMAT(tgl_kunjungan,'%Y%m')",$sep);
		$this->db->where("id_poli",$poli);
		$this->db->order_by('reg_unit','DESC');
		$this->db->limit(1);
		$data=$this->db->get('pendaftaran')->row();
		if($data){
			$id=explode('-',$data->reg_unit);
			$urut=intVal($id[2])+1;
			$newid=$sep."-".str_pad($poli,3,'0',STR_PAD_LEFT)."-".str_pad($urut,4,'0',STR_PAD_LEFT);
		}else{
			$newid=$sep."-".str_pad($poli,3,'0',STR_PAD_LEFT)."-"."0001";
		}
		return $newid;
	}
	function getBooking($nomr,$nik,$nobpjs){
		return $this->db->where("tanggalperiksa",date('Y-m-d'))
		->group_start()
		->where("batal",0)
		->or_where("taskid !=",99)
		->group_end()
		->group_start()
		->where('norm',$nomr)
		->or_where("nik",$nik)
		->or_where("nomorkartu",$nobpjs)
		->group_end()
		->get("jkn_antrian")
		->row();
	}
	function getBookingByKode($kodebooking){
		return $this->db->where("tanggalperiksa",date('Y-m-d'))
		->where("batal",0)
		->where('kodebooking',$kodebooking)
		->get("jkn_antrian")
		->row();
	}
	function updateAntrian($data,$kodebooking){
		$this->db->where('kodebooking',$kodebooking)->update("jkn_antrian",$data);
	}
	function createAntrian($poli,$dokter,$mulai){
		$this->db->select('no_antrian');
		$this->db->where("tgl_kunjungan",date('Y-m-d'));
		$this->db->where("id_poli",$poli);
		$this->db->where("id_dokter",$dokter);
		$this->db->where("no_antrian >",$mulai);
		$this->db->order_by('no_antrian','DESC');
		$this->db->limit(1);
		$data=$this->db->get('pendaftaran')->row();
		if($data){
			$newid=intval($data->no_antrian)+1;
		}else{
			$newid=$mulai+1;
		}
		return $newid;
	}
	function insertPendaftaran($data){
		$this->db->insert('pendaftaran',$data);
		return $this->db->insert_id();
	}
	function updatePasien($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('pasien',$data);
	}
	function insertPasien($data){
		$this->db->insert('pasien',$data);
		return $this->db->insert_id();
	}
	function getPendaftaran($id){
		$this->db->select("*,a.idx,DATE_FORMAT(tgl_kunjungan,'%Y-%m-%d') AS tgl_masuk");
		$this->db->where('a.idx',$id);
		$this->db->join('pasien b','a.idx_pasien=b.idx');
		return $this->db->get('pendaftaran a')->row();
	}
	function getRanap($nomr){
		return $this->db->where("nomr",$nomr)
		->join("kamar","id_kamar=idkamartt")
		->get("tempattidur")->row();
	}
	function generateNomr(){
		// $query = $this->db->query("SELECT MAX(CONCAT(SUBSTR(nomr,5,2),SUBSTR(nomr,3,2),SUBSTR(nomr,1,2))) as max_nomr FROM pasien");
        // $row = $query->row_array();
        // $max_nomr = $row['max_nomr'];
        // $max_nomr1 = (int) substr($max_nomr, 0, 6);
        // $kode_nomr = $max_nomr1 + 1;
        // $maxkode = sprintf("%06s", $kode_nomr);
        // $maxkode_nomr = substr($maxkode, 4, 2) . substr($maxkode, 2, 2) . substr($maxkode, 0, 2);
		// return $maxkode_nomr;

		$query = $this->db->query("SELECT MAX(CONCAT(SUBSTR(nomr,5,2),SUBSTR(nomr,3,2),SUBSTR(nomr,1,2))) as max_nomr FROM pasien WHERE arc=0");
        $row = $query->row_array();
        $max_nomr = $row['max_nomr'];
        $max_nomr1 = (int) substr($max_nomr, 0, 6);
        $kode_nomr = $max_nomr1 + 1;
        $maxkode = sprintf("%06s", $kode_nomr);
        $maxkode_nomr = substr($maxkode, 4, 2) . substr($maxkode, 2, 2) . substr($maxkode, 0, 2);
        $cek = $this->cek_from_arc($maxkode_nomr);
        if ($cek == true) {
            $this->db->query("UPDATE pasien SET arc=0 WHERE nomr='$maxkode_nomr'");
            $nomr = $this->generateNomr();
            return $nomr;
        } else {
            return $maxkode_nomr;
        }

        // $cek = $this->cek_from_arc($maxkode_nomr);
        // if ($cek == true) {
        //     $this->db->query("UPDATE pasien SET arc=0 WHERE nomr='$maxkode_nomr'");
        //     $nomr = $this->get_nomr();
        //     return $nomr;
        // } else {
        //     return $maxkode_nomr;
        // }
	}

	public function cek_from_arc($nomr)
    {
        $query = $this->db->query("SELECT nomr FROM pasien WHERE arc=1 AND nomr='$nomr'")->row();
        if (empty($query)) {
            return false;
        } else {
            return true;
        }
    }
	function getRujukanBySep($noSep){
		$this->db->where('noSep',$noSep);
		$this->db->where('batal',0);
		return $this->db->get('rujukanonline')->row();
	}

	function getNomr(){
		$nomr=$this->db->select('nomr')->order_by('nomr','DESC')
		->like('nomr','100','after')->get('pasien')->row();
		if(empty($nomr)){
			return MULAI_NOMR;
		}else{
			$newmr=$nomr->nomr+1;
			return $newmr;
		}

	}

	function getRujukanByLayanan($layanan){
		return $this->db->select("a.*")
		->join('rujukan a','a.idx=b.rujukanid')
		->where('rujukanjenislayanan',$layanan)
		->get('maping_rujukan b')->result();
	}
	function getKelas(){
		return $this->db->get('kelas_layanan')->result();
	}
	function getReservasiRajal($nomr){
		return $this->db->select('a.idx,id_daftar,reg_unit,tgl_kunjungan,id_poli,nama_poli,jns_layanan,id_dokter,nama_dokter,jenislayanan,id_cara_bayar,no_sep')
		->where('nomr',$nomr)
		->where_in('jns_layanan',array(2,3))
		->order_by('idx','DESC')
		->join('jenis_layanan b','a.jns_layanan=b.idx')
		->limit(10)
		->get('pendaftaran a')->result();
	}
}
