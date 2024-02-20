<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Kunjungan_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countkunjungan($keyword = "", $param = "",$tgl_kunjungan="")
	{
		$this->db->where('batal',0);
		if(!empty($tgl_kunjungan)) $this->db->where("DATE_FORMAT(tgl_kunjungan,'%Y-%m-%d')",$tgl_kunjungan);
		$this->db->where('id_poli',$this->session->userdata('lokasi'));
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
	function getkunjungan($limit = 0, $mulai = 1, $keyword = "", $param = "",$tgl_kunjungan="")
	{
        $this->db->select("a.*,b.jenislayanan,c.caradaftar,d.tempat_lahir,d.tgl_lahir,
		(CASE WHEN d.jns_kelamin=1 THEN 'Pria' WHEN d.jns_kelamin=2 THEN 'Wanita' WHEN d.jns_kelamin=3 THEN 'Tidak Dapat Ditentukan' ELSE 'Tidak Mengisi' END) as jns_kelamin,
		d.nik, DATE_FORMAT(a.tgl_lahir,'%d %M %Y') AS tgl_lahir, (CASE WHEN id_kamar IS NULL THEN '<i>Belum Ada Tempat Tidur</i>' ELSE CONCAT('<b>',nama_kamar,'</b><br><i>',nama_tt,'</i>') END) AS kamar,
		(CASE WHEN statuspasien=1  THEN '<span class=\"btn btn-success btn-xs\">Aktif</span>' WHEN statuspasien=2  THEN '<span class=\"btn btn-warning btn-xs\">Permintaan Pindah</span>' WHEN statuspasien=3  THEN '<span class=\"btn btn-info btn-xs\">Pindah</span>' WHEN statuspasien=4 THEN '<span class=\"btn btn-danger btn-xs\">Sudah Pulang</span>' ELSE '<span class=\"btn btn-success btn-xs\">Selesai Dilayani</span>' END) as statuspasien");
		$this->db->where('batal',0);
		if(!empty($tgl_kunjungan)) $this->db->where("DATE_FORMAT(tgl_kunjungan,'%Y-%m-%d')",$tgl_kunjungan);
		$this->db->where('id_poli',$this->session->userdata('lokasi'));
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
	function countDataKunjunganByMR($keyword = "", $nomr="")
	{
		$this->db->where('batal',0);
		$this->db->where("a.nomr",$nomr);
		$this->db->group_start();
			$this->db->like('carabayar', $keyword);
            $this->db->or_like('rujukan', $keyword);
            $this->db->or_like('nama_poli', $keyword);
            $this->db->or_like('nama_dokter', $keyword);
            $this->db->or_like('jenislayanan', $keyword);
			$this->db->group_end();
        $this->db->join('jenis_layanan b','a.jns_layanan=b.idx');
        $this->db->join('cara_daftar c','a.id_cara_daftar=c.idx');
        $this->db->join('pasien d','a.idx_pasien=d.idx');
		return $this->db->get('pendaftaran a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getDataKunjunganByMR($limit = 0, $mulai = 1,$keyword="", $nomr="")
	{
        $this->db->select("a.*,b.jenislayanan,c.caradaftar,d.tempat_lahir,d.tgl_lahir,
		(CASE WHEN d.jns_kelamin=1 THEN 'Pria' WHEN d.jns_kelamin=2 THEN 'Wanita' WHEN d.jns_kelamin=3 THEN 'Tidak Dapat Ditentukan' ELSE 'Tidak Mengisi' END) as jns_kelamin,
		d.nik, DATE_FORMAT(a.tgl_lahir,'%d %M %Y') AS tgl_lahir, (CASE WHEN id_kamar IS NULL THEN '<i>Belum Ada Tempat Tidur</i>' ELSE CONCAT('<b>',nama_kamar,'</b><br><i>',nama_tt,'</i>') END) AS kamar,
		(CASE WHEN statuspasien=1  THEN '<span class=\"btn btn-success btn-xs\">Aktif</span>' WHEN statuspasien=2  THEN '<span class=\"btn btn-warning btn-xs\">Permintaan Pindah</span>' WHEN statuspasien=3  THEN '<span class=\"btn btn-info btn-xs\">Pindah</span>' WHEN statuspasien=4 THEN '<span class=\"btn btn-danger btn-xs\">Sudah Pulang</span>' ELSE '<span class=\"btn btn-success btn-xs\">Selesai Dilayani</span>' END) as statuspasien");
		$this->db->where('batal',0);
		$this->db->where("a.nomr",$nomr);
		$this->db->group_start();
			$this->db->like('carabayar', $keyword);
            $this->db->or_like('rujukan', $keyword);
            $this->db->or_like('nama_poli', $keyword);
            $this->db->or_like('nama_dokter', $keyword);
            $this->db->or_like('jenislayanan', $keyword);
			$this->db->group_end();
        $this->db->join('jenis_layanan b','a.jns_layanan=b.idx');
        $this->db->join('cara_daftar c','a.id_cara_daftar=c.idx');
        $this->db->join('pasien d','a.idx_pasien=d.idx');
		$this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('pendaftaran a')->result();
	}
	function getKunjunganById($id,$field="*"){
		return $this->db->select($field)->where("idx",$id)->get("pendaftaran")->row();
	}
	function countPermintaanMasuk($keyword = "", $param = "")
	{
		$this->db->where('idruangtujuan',$this->session->userdata('lokasi'));
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nomr_pasien', $keyword);
			$this->db->or_like('nama_pasien', $keyword);
			$this->db->or_like('namaDokterPengirim', $keyword);
            $this->db->or_like('ruangasal', $keyword);
            $this->db->or_like('alasanpemindahan', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('permintaanpindah a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getPermintaanMasuk($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        $this->db->where('idruangtujuan',$this->session->userdata('lokasi'));
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nomr_pasien', $keyword);
			$this->db->or_like('nama_pasien', $keyword);
			$this->db->or_like('namaDokterPengirim', $keyword);
            $this->db->or_like('ruangasal', $keyword);
            $this->db->or_like('alasanpemindahan', $keyword);
			$this->db->group_end();
		}
        
		$this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('permintaanpindah a')->result();
	}
	function getDataPermintaanKonsul($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        $this->db->where('idruangtujuan',$this->session->userdata('lokasi'));
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nomr_pasien', $keyword);
			$this->db->or_like('nama_pasien', $keyword);
			$this->db->or_like('namaDokterPengirim', $keyword);
            $this->db->or_like('ruangasal', $keyword);
            $this->db->or_like('alasankonsul', $keyword);
			$this->db->group_end();
		}
        
		$this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('permintaankonsul a')->result();
	}
	function countDataPermintaanKonsul($keyword = "", $param = "")
	{
        $this->db->where('idruangtujuan',$this->session->userdata('lokasi'));
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nomr_pasien', $keyword);
			$this->db->or_like('nama_pasien', $keyword);
			$this->db->or_like('namaDokterPengirim', $keyword);
            $this->db->or_like('ruangasal', $keyword);
            $this->db->or_like('alasankonsul', $keyword);
			$this->db->group_end();
		}
        
		return $this->db->get('permintaankonsul a')->num_rows();
	}
	function getkunjunganBynomr($nomr)
	{
		$this->db->where('nomr', $nomr);
		return $this->db->get('pendaftaran')->row();
	}
	function getPermintaan($regunit){
		return $this->db->where("reg_unit",$regunit)->get("permintaanpindah")->row();
	}
	function getPermintaanKonsulByRegunit($regunit){
		return $this->db->where("reg_unit",$regunit)->get("permintaankonsul")->row();
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
	function getPoliklinik(){
		$this->db->where('status_ruang',1);
		$this->db->where('jns_layanan',2);
		return $this->db->get('ruang')->result();
	}
	function getRuangTujuan($idruang){
		$this->db->where('status_ruang',1);
		$this->db->where('jns_layanan',1);
		$this->db->where('idx !=',$idruang);
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
	function getJadwalDokter($tgl,$poli){
        $timestamp = strtotime($tgl);
        $day = date('D', $timestamp);
        $hari=array(
            'Sun'=>'Minggu',
            'Mon'=>'Senin',
            'Tue'=>'Selasa',
            'Wed'=>'Rabu',
            'Thu'=>'Kamis',
            'Fri'=>'Jumat',
            'Sat'=>'Sabtu'
        );
        $this->db->select("jadwal_dokter_id AS dokterid, jadwal_dokter_nama as namadokter");
        $this->db->where('jadwal_poly_id',$poli);
        $this->db->where('jadwal_hari',$hari[$day]);
        return $this->db->get('jkn_jadwalhafis a')->result();
	}
	function cariSEPLokal($nosep,$tgl)
    {
        $this->db->order_by('idx','desc');
        $this->db->where('tglSep',$tgl);
        $this->db->where('noSep', $nosep);
        return $this->db->get('sep_response')->row();
    }

	function cekKunjungan($id_poli,$nomr_kunjungan){
		$this->db->where('id_poli',$id_poli);
		$this->db->where('nomr_kunjungan',$nomr_kunjungan);
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
	function updateKunjungan($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('pendaftaran',$data);
	}
	function updateTT($data,$id){
		$this->db->where('idtt',$id);
		$this->db->update('tempattidur',$data);
	}
	function resetTTlama($id_daftar){
		$tt=array(
			'id_daftar'=>null,
            'reg_unit'=>null,
            'nomr'=>null,
            'namapasien'=>null,
            'tgllahir'=>null,
            'jnskelamin'=>null,
		);
		$this->db->where('id_daftar',$id_daftar);
		$this->db->update('tempattidur',$tt);
	}
	function getPulang($id_daftar){
		return $this->db->where('id_daftar',$id_daftar)
		->order_by("idx","DESC")
		->get("log_ranap")
		->row();
	}
	function getSep($sep){
		return $this->db->where("noSep",$sep)->get("sep_response")->row();
	}
	function getCaraKeluar(){
		return $this->db->where('idx <',6)->get("cara_keluar")->result();
	}
	function getCaraKeluarById($id){
		return $this->db->where('idx',$id)->get("cara_keluar")->row_array();
	}
	function getKeadaanKeluar($idcarakeluar){
		return $this->db->where("idcarakeluar",$idcarakeluar)
		->get("keadaan_keluar")
		->result();
	}
	function insertLog($data){
		$this->db->insert('log_ranap',$data);
	}
	function updatelog($data,$idx,$idtt){
		$this->db->where('idx_registrasi',$idx)
		->where('idtt',$idtt)
		->update('log_ranap',$data);
	}
	function updateLogById($data,$id){
		$this->db->where("idx",$id);
		$this->db->update("log_ranap",$data);
	}
	function insertPendaftaran($data){
		$this->db->insert('pendaftaran',$data);
		return $this->db->insert_id();
	}
	function getPendaftaran($id){
		$this->db->select("*,a.idx");
		$this->db->where('a.idx',$id);
		$this->db->join('pasien b','a.nomr=b.nomr');
		return $this->db->get('pendaftaran a')->row();
	}
	function getPendaftaranByRegUnit($regunit){
		$this->db->select("*,a.idx,b.idx as idx_pasien");
		$this->db->where('a.reg_unit',$regunit);
		$this->db->join('pasien b','a.nomr=b.nomr');
		return $this->db->get('pendaftaran a')->row();
	}
	function lokasiLogin($lokasiid){
		return $this->db->where("idx",$lokasiid)->get("ruang")->row();
	}
	function getKamar($ruangid,$idkelas){
		return $this->db->where("id_ruang",$ruangid)
		->group_start()
		->where('idx_kelaslayanan',$idkelas)
		->or_where('idx_kelaslayanan',0)
		->group_end()
		->join('kelas_kamar b','a.kelas_id=b.idx')
		->get('kamar a')->result();
	}
	
	function getTT($id_kamar){
		return $this->db->where("idkamartt",$id_kamar)->get('tempattidur')->result();
	}
	function getKelas(){
		return $this->db->get("kelas_kamar")->result();
	}
	function kirimPermintaan($data){
		$this->db->insert('permintaanpindah',$data);
		return $this->db->insert_id();
	}
	
	function updatePermintaan($data,$idx){
		$this->db->where("idx",$idx);
		$this->db->update("permintaanpindah",$data);
	}
	function updatePermintaanKonsul($data,$idx){
		$this->db->where("idx",$idx);
		$this->db->update("permintaankonsul",$data);
	}
	function kirimPermintaanLabor($data){
		$this->db->insert('rm_permintaanlabor',$data);
		return $this->db->insert_id();
	}
	function kirimPermintaanRadiologi($data){
		$this->db->insert('rm_permintaanradiologi',$data);
		return $this->db->insert_id();
	}
	function updatePermintaanLabor($data,$idx){
		$this->db->where("idx",$idx)->update("rm_permintaanlabor",$data);
	}
	function updatePermintaanRadiologi($data,$idx){
		$this->db->where("idx",$idx)->update("rm_permintaanradiologi",$data);
	}
	function hapusPermintaanLabor($idx){
		$this->db->trans_start();
		$this->db->where('idx',$idx)->delete("rm_permintaanlabor");
		$this->db->where('idx_permintaan',$idx)->delete("rm_permintaanlabordetail");
		$this->db->trans_complete();
	}
	function hapusPermintaanRadiologi($idx){
		$this->db->trans_start();
		$this->db->where('idx',$idx)->delete("rm_permintaanradiologi");
		$this->db->where('idx_permintaan',$idx)->delete("rm_permintaanradiologidetail");
		$this->db->trans_complete();
	}
	function hapusPermintaanKonsul($idx){
		$this->db->trans_start();
		$this->db->where('idx',$idx)->delete("permintaankonsul");
		$this->db->trans_complete();
	}
	function hapusDetailPermintaan($idx){
		$this->db->where('idx',$idx)->delete("rm_permintaanlabordetail");
	}
	function hapusDetailPermintaanRadiologi($idx){
		$this->db->where('idx',$idx)->delete("rm_permintaanradiologidetail");
	}
	function cekPemeriksaan($idx,$kode){
		return $this->db->where("idx_permintaan",$idx)->where("kode_pemeriksaan",$kode)->get("rm_permintaanlabordetail")->row();
	}
	function cekPemeriksaanRadiologi($idx,$kode){
		return $this->db->where("idx_permintaan",$idx)->where("kode_pemeriksaan",$kode)->get("rm_permintaanradiologidetail")->row();
	}
	function getPemeriksaanLabor($kode){
		return $this->db->where_in("kode",$kode)->get("pemeriksaan_labor")->result();
	}
	function getPemeriksaanRadiologi($kode){
		return $this->db->where_in("kode",$kode)->get("pemeriksaan_radiologi")->result();
	}
	// function getPemeriksaanLaborDetail($kode){
	// 	return $this->db->where_in("kode_pemeriksaan",$kode)->get("rm_permintaanlabordetail1")->result();
	// }
	function simpanDetailPermintaanLabor($data){
		$this->db->insert_batch("rm_permintaanlabordetail",$data);
	}
	function simpanDetailPermintaanRadiologi($data){
		$this->db->insert_batch("rm_permintaanradiologidetail",$data);
	}
	function simpanAsesmen($data,$idx=""){
		if(empty($idx)) {
			$this->db->insert('rm_asesmenawal',$data);
			return $this->db->insert_id();
		}else{
			$this->db->where("idx",$idx)->update("rm_asesmenawal",$data);
			return $idx;
		}
	}
	function simpanKonsul($data,$idx=""){
		if(empty($idx)) {
			$this->db->insert('permintaankonsul',$data);
			return $this->db->insert_id();
		}else{
			$this->db->where("idx",$idx)->update("permintaankonsul",$data);
			return $idx;
		}
	}
	function simpanCppt($data,$idx=""){
		if(empty($idx)) {
			$this->db->insert('rm_catatanperkembangan',$data);
			return $this->db->insert_id();
		}else{
			$this->db->where("idx",$idx)->update("rm_catatanperkembangan",$data);
			return $idx;
		}
	}
	function simpanResep($data,$idx=""){
		if(empty($idx)) {
			$this->db->insert('resep_obat',$data);
			return $this->db->insert_id();
		}else{
			$this->db->where("idx",$idx)->update("resep_obat",$data);
			return $idx;
		}
	}
	function getMetodeRacik(){
		return $this->db->get("resep_metoderacik")->result();
	}
	function getCppt($idx_pendaftaran){
		return $this->db->where("idx_pendaftaran",$idx_pendaftaran)->get("rm_catatanperkembangan")->row();
	}
	function getAsesmenAwalDokter($idx_pendaftaran){
		return $this->db->where('idx_pendaftaran',$idx_pendaftaran)->get("rm_asesmenawal")->row();
	}
	function getDiagnosa(){
		return $this->db->get("rm_diagnosa")->result();
	}
	function getResep($idx_pendaftaran,$jenisresep='Non Racikan',$statusresep=0){
		if($jenisresep=="Non Racikan"){
			return $this->db->select("*,b.idx AS idx_detail,GROUP_CONCAT(CONCAT('r/ ',b.obatnama,' ',b.signa1,' x ',b.signa2,' ',b.keterangan,'<br>') SEPARATOR '') AS komposisi")
			->where('idx_pendaftaran',$idx_pendaftaran)
			->where("statusresep",$statusresep)
			->where("a.jenisresep",$jenisresep)
			->join('pendaftaran d','d.idx=idx_pendaftaran')
			->join("resep_obat b","a.idx=b.idx_resep")
			->group_by('a.idx')
			->get("resep_master a")
			->result();
		}else{
			return $this->db->select("a.*,b.*,d.nama_pasien,d.nomr_pasien,b.idx AS idx_detail,CONCAT('r/ ',b.obatnama,' ',b.signa1,' x ',b.signa2,' ',b.keterangan,'<ol>',GROUP_CONCAT(CONCAT('<li>',c.obatnama,' (<b>',c.dosis,' ',c.satuan,'</b>)','</li>') SEPARATOR ''),'</ol>') AS komposisi,COUNT(c.idx) AS jmlbahan")
			->where('idx_pendaftaran',$idx_pendaftaran)
			->where("statusresep",$statusresep)
			->where("a.jenisresep",$jenisresep)
			->join('pendaftaran d','d.idx=idx_pendaftaran')
			->join("resep_obat b","a.idx=b.idx_resep")
			->join("resep_racikan c","c.idx_resep_detail=b.idx","LEFT")
			->group_by("b.idx")
			->get("resep_master a")
			->result();
		}
		
	}
	function getListPermintaanLabor($idx_pendaftaran){
		return $this->db->select("a.*,CONCAT('<ol>',GROUP_CONCAT(CONCAT('<li>',nama_pemeriksaan,'</li>') SEPARATOR ''),'</ol>') AS pemeriksaan,a.idx AS idx_minta")
		->where('idx_pendaftaran',$idx_pendaftaran)
		->join("rm_permintaanlabordetail b","a.idx=b.idx_permintaan")
		->group_by("a.idx")
		->get("rm_permintaanlabor a")->result();
	}
	function getDataPermintaanRadiologiById($idx){
		return $this->db->where("idx_permintaan",$idx)
		->get("rm_permintaanradiologidetail")
		->result();
	}
	function getListPermintaanKonsul($idx_pendaftaran){
		return $this->db->select("*")
		->where('idx_pendaftaran',$idx_pendaftaran)
		->group_by("a.idx")
		->get("permintaankonsul a")->result();
	}
	function getListPermintaanRadiologi($idx_pendaftaran){
		return $this->db->select("a.*,CONCAT('<ol>',GROUP_CONCAT(CONCAT('<li>',nama_pemeriksaan,'</li>') SEPARATOR ''),'</ol>') AS pemeriksaan,a.idx AS idx_minta")
		->where('idx_pendaftaran',$idx_pendaftaran)
		->join("rm_permintaanradiologidetail b","a.idx=b.idx_permintaan")
		->group_by("a.idx")
		->get("rm_permintaanradiologi a")->result();
	}
	function getListPermintaanRadiologiDetail($idx_pendaftaran){
		return $this->db->select("*,b.idx as idx_detail")
		->where('idx_pendaftaran',$idx_pendaftaran)
		->join("rm_permintaanradiologidetail b","a.idx=b.idx_permintaan")
		->get("rm_permintaanradiologi a")->result();
	}
	function hapusResep($idx){
		$this->db->where("idx_resep_detail",$idx)->delete("resep_racikan");
		return $this->db->where('idx',$idx)->delete("resep_obat");
	}
	function hapusTindakan($idx){
		return $this->db->where('idx',$idx)->delete("tindakanpasien");
	}
	function getTindakan($panjang=6,$kode=""){
		$sp=($panjang/3)-2;

		$this->db->where("LENGTH(kode)",$panjang)
			->where("RIGHT(kode,2)","00");
		$root=$this->db->get("pemeriksaan_labor")
			->result();
			// print_r($root);exit;
		foreach ($root as $r ) {
			$p=$panjang;
			$kode=str_replace(".00","",$r->kode);
			$child=$this->getChild($p,$kode,$r->kode);
			if(empty($child)){
				$data[]=array(
					'id'=>$r->kode,
					'text'=>$r->namapemeriksaan
				);
			}else{
				
				$data[]=array(
					'id'=>$r->kode,
					'text'=>$r->namapemeriksaan,
					'children'=>$child
				);
				// prit_r($data); exit;
			}
			
		}
		if(!empty($data))
		return $data;
		else
		return array();
	}
	function getChild($panjang,$kode="",$kecuali=""){
		$p=$panjang+3;
		$child=$this->db->select("kode as id,namapemeriksaan as text")
			->group_start()
			->where("SUBSTRING_INDEX(kode,'.',1)",$kode)
			->where("LENGTH(kode)",$p)	
			->where("RIGHT(kode,2)","00")
			->where("kode !=",$kecuali)
			->group_end()
			// ->group_start()
			// ->or_where("LENGTH(kode)",$p)
			// ->or_where("RIGHT(kode,2)","00")
			// ->group_end()
			->get("pemeriksaan_labor")
			->result_array();
			// print_r($child);exit;
		foreach ($child as $c ) {
			$newchild=$this->getChild($p,$c['id']);
			if(empty($newchild)){
				$children[]=array(
					'id'=>$c['id'],
					'text'=>$c['text']
				);
			}else{
				$children[]=array(
					'id'=>$c['id'],
					'text'=>$c['text'],
					'children'=>$newchild
				);
			}
			
		}
		if(empty($children)) return array();
		else return $children;
		// foreach ($root as $r ) {
		// 	// $p=$panjang+3;
		// 	$kode=str_replace(".00","",$r->kode);
		// 	$anak=$this->getChild($kode);
		// 	if(empty($anak)){
		// 		$child[]=array(
		// 			'id'=>$r->kode,
		// 			'text'=>$r->namapemeriksaan
		// 		);
		// 	}else{
		// 		// foreach ($child as $c ) {
		// 		// 	$children[]=array(
		// 		// 		'id'=>$c->kode,
		// 		// 		'text'=>$c->namapemeriksaan
		// 		// 	);
		// 		// }
		// 		$child[]=array(
		// 			'id'=>$r->kode,
		// 			'text'=>$r->namapemeriksaan,
		// 			'children'=>$child
		// 		);
		// 	}
		// }
		// if(!empty($child))
		// return $child;
		// else
		// return array();
	}
	function getPemeriksaan($panjang=6){
		return $this->db->where("LENGTH(kode)",$panjang)
			->where("RIGHT(kode,2)","00")
			->get("pemeriksaan_labor")
			->result();
	}
	function getPemeriksaanRad($panjang=6){
		return $this->db->where("LENGTH(kode)",$panjang)
			->where("RIGHT(kode,2)","00")
			->get("pemeriksaan_radiologi")
			->result();
	}
	function getSubRootPemeriksaan($panjang=6,$kode=""){
		return $this->db->where("LENGTH(kode)",$panjang)
		->where("SUBSTRING_INDEX(kode,'.',1)",$kode)
		->where("RIGHT(kode,2)","00")
		->get("pemeriksaan_labor")
		->result();
		
	}
	function getSubRootPemeriksaanRadiologi($panjang=6,$kode=""){
		return $this->db->where("LENGTH(kode)",$panjang)
		->where("SUBSTRING_INDEX(kode,'.',1)",$kode)
		->where("RIGHT(kode,2)","00")
		->get("pemeriksaan_radiologi")
		->result();
		
	}
	function getSubPemeriksaan($panjang=6,$kode="",$kecuali=""){
		// if($panjang==9)$err=1; else $err='';
		$idx=($panjang/3)-1;
		return $this->db->where("LENGTH(kode)",$panjang)
		->where("SUBSTRING_INDEX(kode,'.',$idx)",$kode)
		->where("RIGHT(kode,2)","00")
		->where("kode !=",$kecuali)
		->get("pemeriksaan_labor")
		->result();
		
	}
	function getSubPemeriksaanRadiologi($panjang=6,$kode="",$kecuali=""){
		// if($panjang==9)$err=1; else $err='';
		$idx=($panjang/3)-1;
		return $this->db->where("LENGTH(kode)",$panjang)
		->where("SUBSTRING_INDEX(kode,'.',$idx)",$kode)
		->where("RIGHT(kode,2)","00")
		->where("kode !=",$kecuali)
		->get("pemeriksaan_radiologi")
		->result();
		
	}
	function dataPemeriksaan($kode,$idx_permintaan){
		$panjang=strlen($kode);
		$idx=($panjang/3)-1;
		$k=str_replace(".00","",$kode);
		if($idx_permintaan=='') $idx_permintaan=0;
		return $this->db->where("SUBSTRING_INDEX(kode,'.',$idx)",$k)
		->join("(SELECT idx AS idx_detail,kode_pemeriksaan,nama_pemeriksaan FROM rm_permintaanlabordetail WHERE idx_permintaan=$idx_permintaan) AS permintaan","kode_pemeriksaan=kode","LEFT")
		->where("kode !=",$kode)
		->get("pemeriksaan_labor")
		->result();
	}
	function dataPemeriksaanRadiologi($kode,$idx_permintaan){
		$panjang=strlen($kode);
		$idx=($panjang/3)-1;
		$k=str_replace(".00","",$kode);
		if($idx_permintaan=='') $idx_permintaan=0;
		return $this->db->where("SUBSTRING_INDEX(kode,'.',$idx)",$k)
		->join("(SELECT idx AS idx_detail,kode_pemeriksaan,nama_pemeriksaan FROM rm_permintaanradiologidetail WHERE idx_permintaan=$idx_permintaan) AS permintaan","kode_pemeriksaan=kode","LEFT")
		->where("kode !=",$kode)
		->get("pemeriksaan_radiologi")
		->result();
	}
	function dataKategori($kode){
		return $this->db->where('kode',$kode)->get('pemeriksaan_labor')->row();
	}
	function dataKategoriRadiologi($kode){
		return $this->db->where('kode',$kode)->get('pemeriksaan_radiologi')->row();
	}
	function getPermintaanLabor($idx){
		$data=$this->db->where("idx",$idx)->get("rm_permintaanlabor")->row_array();
		$data["detail"] = $this->db->where("idx_permintaan",$idx)->get("rm_permintaanlabordetail")->result_array();
		return $data;
	}
	function getPermintaanKonsul($idx){
		return $this->db->where("idx",$idx)->get("permintaankonsul")->row_array();
		// $data["detail"] = $this->db->where("idx_permintaan",$idx)->get("rm_permintaanlabordetail")->result_array();
		// return $data;
	}
	function getPermintaanRadiologi($idx){
		$data=$this->db->where("idx",$idx)->get("rm_permintaanradiologi")->row_array();
		$data["detail"] = $this->db->where("idx_permintaan",$idx)->get("rm_permintaanradiologidetail")->result_array();
		return $data;
	}
	function getKategoritindakan(){
		return $this->db->where("tindakan=kategori")
		->where('tarif',0)
		->get('tindakan')->result();
	}
	function getLayanan($kategori){
		return $this->db->where("kategori",$kategori)
		->where("tindakan!=kategori")
		->get('tindakan')->result();
	}
	function getTenagaMedis($lokasi){
		return $this->db->where('idruang',$lokasi)
		->join('pegawai b','a.nrp=b.nrp')
		->get("dokter a")
		->result();
	}
	function getTarif($kode){
		return $this->db->where("no",$kode)->get("tindakan")->row();
	}
	function insertTindakan($data){
		$this->db->insert("tindakanpasien",$data);
		return $this->db->insert_id();
	}
	function updateTindakan($data,$idx){
		$this->db->where('idx',$idx)->update("tindakanpasien",$data);
		return $this->db->insert_id();
	}
	function getTindakanPasien($idx){
		return $this->db->where('idx_pendaftaran',$idx)->get("tindakanpasien")->result();
	}
	function getTindakanPasienById($idx){
		return $this->db->where('idx',$idx)->get("tindakanpasien")->row();
	}
	function getAntrian($idx){
		return $this->db->where("idx_pendaftaran",$idx)->where('tanggalperiksa',date('Y-m-d'))->get("jkn_antrian")->row();
	}
	function generateNoResep(){
		$data=$this->db->select('no_resep')
		->where('tgl_resep',date('Y-m-d'))
		->order_by('no_resep','DESC')
		->get('resep_master')
		->row();
		if(empty($data)){
			return date('Ymd').'00001';
		}else{
			return $data->no_resep+1;
		}
	}
	function insertResepMaster($data){
		$this->db->insert("resep_master",$data);
		return $this->db->insert_id();
	}
	function updateResepMaster($data,$idx){
		$this->db->where('idx',$idx)->update("resep_master",$data);
		
	}
	function simpanKomposisi($data,$idx=""){
		if(empty($idx)){
			$this->db->insert("resep_racikan",$data);
		}else{
			$this->db->where("idx",$idx)->update('resep_racikan',$data);
		}
	}
	function getDetailKomponen($detailid){
		return $this->db->where("idx_resep_detail",$detailid)->get("resep_racikan")->result();
	}
}
