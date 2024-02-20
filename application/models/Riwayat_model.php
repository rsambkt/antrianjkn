<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Riwayat_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countriwayat($keyword = "", $param = "",$jnslayanan="",$ruang="",$tanggal="")
	{
		$this->db->where('batal',0);
		if(!empty($jnslayanan)) $this->db->where("jns_layanan",$jnslayanan);
		if(!empty($ruang)) $this->db->where("id_poli",$ruang);
		if(!empty($tanggal)) $this->db->where("DATE_FORMAT(tgl_kunjungan,'%Y-%m-%d')",$tanggal);
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('nomr_pasien', $keyword);
			$this->db->or_like('a.nobpjs', $keyword);
			$this->db->or_like('nik', $keyword);
			$this->db->or_like('nama_pasien', $keyword);
			$this->db->or_like('carabayar', $keyword);
            $this->db->or_like('rujukan', $keyword);
            $this->db->or_like('nama_poli', $keyword);
            $this->db->or_like('nama_dokter', $keyword);
            $this->db->or_like('caradaftar', $keyword);
            $this->db->or_like('jenislayanan', $keyword);
			$this->db->or_like('a.tgl_lahir', $keyword);
			$this->db->or_like('a.alamat', $keyword);
			$this->db->group_end();
		}
        $this->db->join('jenis_layanan b','a.jns_layanan=b.idx');
        $this->db->join('cara_daftar c','a.id_cara_daftar=c.idx');
        $this->db->join('pasien d','a.idx_pasien=d.idx');
		return $this->db->get('pendaftaran a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getriwayat($limit = 0, $mulai = 1, $keyword = "", $param = "",$jnslayanan="",$ruang="",$tanggal="")
	{
        $this->db->select("a.*,b.jenislayanan,c.caradaftar,d.tempat_lahir,d.tgl_lahir,d.jns_kelamin,d.nik");
		$this->db->where('batal',0);
		if(!empty($jnslayanan)) $this->db->where("jns_layanan",$jnslayanan);
		if(!empty($ruang)) $this->db->where("id_poli",$ruang);
		if(!empty($tanggal)) $this->db->where("DATE_FORMAT(tgl_kunjungan,'%Y-%m-%d')",$tanggal);
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nomr_pasien', $keyword);
			$this->db->or_like('a.nobpjs', $keyword);
			$this->db->or_like('nik', $keyword);
			$this->db->or_like('nama_pasien', $keyword);
			$this->db->or_like('carabayar', $keyword);
            $this->db->or_like('rujukan', $keyword);
            $this->db->or_like('nama_poli', $keyword);
            $this->db->or_like('nama_dokter', $keyword);
            $this->db->or_like('jenislayanan', $keyword);
            $this->db->or_like('caradaftar', $keyword);
			$this->db->or_like('a.tgl_lahir', $keyword);
			$this->db->or_like('a.alamat', $keyword);
			$this->db->group_end();
		}
        $this->db->join('jenis_layanan b','a.jns_layanan=b.idx');
        $this->db->join('cara_daftar c','a.id_cara_daftar=c.idx');
        $this->db->join('pasien d','a.idx_pasien=d.idx');
		$this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('pendaftaran a')->result();
	}
	function getriwayatBynomr($nomr)
	{
		$this->db->where('nomr', $nomr);
		return $this->db->get('riwayat')->row();
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
		// $this->db->where('aktif',1);
		return $this->db->get('agama')->result();
	}
	function getSuku(){
		// $this->db->where('aktif',1);
		return $this->db->get('suku')->result();
	}
	function getRuang(){
		$this->db->where('status_ruang',1);
		return $this->db->get('ruang')->result();
	}
	function getBahasa(){
		// $this->db->where('aktif',1);
		return $this->db->get('bahasa')->result();
	}
	function getProvinsi(){
		$this->db->order_by("FIELD(provinsi,'Jambi','Riau','Sumatera Barat') DESC");
		$this->db->group_by('provinsi');
		return $this->db->get('wilayah')->result();
	}
	function getKabupaten($provinsi){
		$this->db->where('provinsi',$provinsi);
		$this->db->group_by('nama_kabkota');
		return $this->db->get('wilayah')->result();
	}
	function getKecamatan($kabupaten){
		$this->db->where('nama_kabkota',$kabupaten);
		$this->db->group_by('kecamatan');
		return $this->db->get('wilayah')->result();
	}
	function getKelurahan($kecamatan){
		$this->db->where('kecamatan',$kecamatan);
		$this->db->group_by('desa');
		return $this->db->get('wilayah')->result();
	}
	function getJenisLayanan(){
		$this->db->where('aktif',1);
		return $this->db->get('jenis_layanan')->result();
	}
	function getDokter($poli){
		$this->db->where('idruang',$poli);
		$this->db->join('pegawai','pegawai.NRP=dokter.nrp');
		return $this->db->get('dokter')->result();
	}
	function cariSEPLokal($nosep,$tgl)
    {
        $this->db->order_by('idx','desc');
        $this->db->where('tglSep',$tgl);
        $this->db->where('noSep', $nosep);
        return $this->db->get('sep_response')->row();
    }

	function cekKunjungan($id_poli,$nomr_riwayat){
		$this->db->where('id_poli',$id_poli);
		$this->db->where('nomr_riwayat',$nomr_riwayat);
		$this->db->where('tgl_kunjungan',date('Y-m-d'));
		return $this->db->get('pendaftaran')->num_rows();
	}
	function createIdDaftar(){
		$sep=date('Ym');
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
	function createRegUnit($poli){
		$sep=date('Ym');
		$this->db->select('reg_unit');
		$this->db->where("DATE_FORMAT(tgl_kunjungan,'%Y%m')",$sep);
		$this->db->where("id_poli",$poli);
		$this->db->order_by('reg_unit','DESC');
		$this->db->limit(1);
		$data=$this->db->get('pendaftaran')->row();
		if($data){
			$id=explode('-',$data->reg_unit);
			$urut=intVal($id[2])+1;
			$newid=$sep."-".$poli."-".str_pad($urut,4,'0',STR_PAD_LEFT);
		}else{
			$newid=$sep."-".$poli."-"."0001";
		}
		return $newid;
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
	function updateriwayat($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('riwayat',$data);
	}
	function insertriwayat($data){
		$this->db->insert('riwayat',$data);
		return $this->db->insert_id();
	}
	function getPendaftaran($id){
		$this->db->where('a.idx',$id);
		$this->db->join('riwayat b','a.idx_riwayat=b.idx');
		return $this->db->get('pendaftaran a')->row();
	}
	function generateNomr(){
		$query = $this->db->query("SELECT MAX(CONCAT(SUBSTR(nomr,5,2),SUBSTR(nomr,3,2),SUBSTR(nomr,1,2))) as max_nomr FROM riwayat");
        $row = $query->row_array();
        $max_nomr = $row['max_nomr'];
        $max_nomr1 = (int) substr($max_nomr, 0, 6);
        $kode_nomr = $max_nomr1 + 1;
        $maxkode = sprintf("%06s", $kode_nomr);
        $maxkode_nomr = substr($maxkode, 4, 2) . substr($maxkode, 2, 2) . substr($maxkode, 0, 2);
		return $maxkode_nomr;
        // $cek = $this->cek_from_arc($maxkode_nomr);
        // if ($cek == true) {
        //     $this->db->query("UPDATE riwayat SET arc=0 WHERE nomr='$maxkode_nomr'");
        //     $nomr = $this->get_nomr();
        //     return $nomr;
        // } else {
        //     return $maxkode_nomr;
        // }
	}
	
}
