<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Resep_model extends CI_Model
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
		(CASE WHEN statuspasien=1  THEN '<span class=\"btn btn-success btn-xs\">Aktif</span>' WHEN statuspasien=2  THEN '<span class=\"btn btn-warning btn-xs\">Permintaan Pindah</span>' WHEN statuspasien=3  THEN '<span class=\"btn btn-info btn-xs\">Pindah</span>' ELSE '<span class=\"btn btn-danger btn-xs\">Sudah Pulang</span>' END) as statuspasien");
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
	function getDataResep($limit, $mulai, $keyword, $param,$tgl=""){
		// $this->db->select("a.idx,a.`id_daftar`,a.`reg_unit`,a.`nomr`,a.`nama_pasien`,(CASE WHEN b.jns_kelamin=1 THEN 'Pria' ELSE 'Wanita' END) AS `jns_kelamin`,a.`tgl_lahir`,b.`tempat_lahir`,a.`jns_layanan`,
		// a.`nama_poli`,a.`rujukan`,a.`carabayar`,a.`tgl_kunjungan`,a.`rujukan`,a.nama_dokter,
		// (CASE WHEN statuspasien=1  THEN '<span class=\"btn btn-success btn-xs\">Aktif</span>' WHEN statuspasien=2  THEN '<span class=\"btn btn-warning btn-xs\">Permintaan Pindah</span>' WHEN statuspasien=3  THEN '<span class=\"btn btn-info btn-xs\">Pindah</span>'  WHEN statuspasien=4  THEN '<span class=\"btn btn-info btn-xs\">Sudah Pulang</span>' ELSE '<span class=\"btn btn-info btn-xs\">Selesai Dilayani Di Poli</span>' END) as statuspasien,
		// (CASE WHEN ='Non Racikan' THEN 
		// CONCAT(GROUP_CONCAT(CONCAT('/r ',d.`obatnama`,' - ',d.`signa1`,'x',d.`signa2`,' - ',d.`keterangan`,'<br>') SEPARATOR ''))
		// ELSE
		// CONCAT('/r ',d.obatnama,' - ',d.`signa1`,'x',d.`signa2`,' - ',d.`keterangan`,'<ol>',GROUP_CONCAT(CONCAT('<li>',e.obatnama,' (<b>',e.dosis,' ',e.satuan,'</b>)','</li>') SEPARATOR ''),'</ol>')
		// END) AS resep");
		$this->db->select("c.idx AS idx_resep,a.idx,a.`id_daftar`,a.`reg_unit`,a.`nomr`,a.`nama_pasien`,(CASE WHEN b.jns_kelamin=1 THEN 'Pria' ELSE 'Wanita' END) AS `jns_kelamin`,a.`tgl_lahir`,b.`tempat_lahir`,a.`jns_layanan`,
		a.`nama_poli`,a.`rujukan`,a.`carabayar`,a.`tgl_kunjungan`,a.`rujukan`,a.nama_dokter,d.jenisresep,
		(CASE WHEN statuspasien=1  THEN '<span class=\"btn btn-success btn-xs\">Aktif</span>' WHEN statuspasien=2  THEN '<span class=\"btn btn-warning btn-xs\">Permintaan Pindah</span>' WHEN statuspasien=3  THEN '<span class=\"btn btn-info btn-xs\">Pindah</span>'  WHEN statuspasien=4  THEN '<span class=\"btn btn-info btn-xs\">Sudah Pulang</span>' ELSE '<span class=\"btn btn-info btn-xs\">Selesai Dilayani Di Poli</span>' END) as statuspasien,
		(CASE WHEN statusobat=1  THEN '<span class=\"btn btn-success btn-xs\">Sudah Disetujui</span>' ELSE '<span class=\"btn btn-danger btn-xs\">Belum Disetujui</span>' END) as statusobat,
		(CONCAT(GROUP_CONCAT(CONCAT('/r ',d.`obatnama`,' - ',d.`signa1`,'x',d.`signa2`,' - ',d.`keterangan`,'<br>') SEPARATOR ''))
		) AS resep");
		if(!empty($tgl)) $this->db->where("DATE_FORMAT(a.`tgl_kunjungan`,'%Y-%m-%d')",$tgl);
		if (!empty($param)) $this->db->like($param, $keyword);
		else{
			$this->db->group_start();
			$this->db->like("a.id_daftar",$keyword);
			$this->db->or_like("a.reg_unit",$keyword);
			$this->db->or_like("a.nomr",$keyword);
			$this->db->or_like("a.nama_pasien",$keyword);
			$this->db->or_like("a.nama_poli",$keyword);
			$this->db->or_like("a.rujukan",$keyword);
			$this->db->or_like("a.carabayar",$keyword);
			$this->db->or_like("a.rujukan",$keyword);
			$this->db->group_end();
		}
		$this->db->join("pasien b","a.`idx_pasien`=b.idx");
		$this->db->join("resep_master c","a.idx=c.`idx_pendaftaran`");
		$this->db->join("resep_obat d","c.idx=d.`idx_resep`");
		// $this->db->join("resep_racikan e","d.idx=e.`idx_resep_detail`","LEFT");
		$this->db->group_by("c.idx");
		// $this->db->group_by("d.idx");
		return $this->db->get("pendaftaran a")->result();
	}
	// function getResep($idx,){
	// 	return $this->db->where("idx_resep",$idx)->get("resep_obat")->result();
	// }
	function getResep($idx_resep,$jenisresep='Non Racikan'){
		if($jenisresep=="Non Racikan"){
			return $this->db->select("*,b.idx AS idx_detail")
			->where('idx_resep',$idx_resep)
			->where("a.jenisresep",$jenisresep)
			->join("resep_obat b","a.idx=b.idx_resep")
			->get("resep_master a")
			->result();
		}else{
			return $this->db->select("a.*,b.*,b.idx AS idx_detail,CONCAT('/r ',b.obatnama,'<ol>',GROUP_CONCAT(CONCAT('<li>',c.obatnama,' (<b>',c.dosis,' ',c.satuan,'</b>)','</li>') SEPARATOR ''),'</ol>') AS obatnama,COUNT(c.idx) AS jmlbahan")
			->where('b.idx_resep',$idx_resep)
			->where("a.jenisresep",$jenisresep)
			->join("resep_obat b","a.idx=b.idx_resep")
			->join("resep_racikan c","c.idx_resep_detail=b.idx","LEFT")
			->group_by("b.idx")
			->get("resep_master a")
			->result();
		}
		
	}

	function countDataResep($keyword, $param,$tgl=""){
		$this->db->select("COUNT(a.idx) AS jml");
		if(!empty($tgl)) $this->db->where("DATE_FORMAT(a.`tgl_kunjungan`,'%Y-%m-%d')",$tgl);
		if (!empty($param)) $this->db->like($param, $keyword);
		else{
			$this->db->group_start();
			$this->db->like("a.id_daftar",$keyword);
			$this->db->or_like("a.reg_unit",$keyword);
			$this->db->or_like("a.nomr",$keyword);
			$this->db->or_like("a.nama_pasien",$keyword);
			$this->db->or_like("a.nama_poli",$keyword);
			$this->db->or_like("a.rujukan",$keyword);
			$this->db->or_like("a.carabayar",$keyword);
			$this->db->or_like("a.rujukan",$keyword);
			$this->db->group_end();
		}
		$this->db->join("pasien b","a.`idx_pasien`=b.idx");
		$this->db->join("resep c","a.idx=c.`idx_pendaftaran`");
		$this->db->group_by("a.idx");
		$jml = $this->db->get("pendaftaran a")->row();
		if(empty($jml)) return 0;
		else return $jml->jml;
	}
	function getResepMaster($idx){
		return $this->db->select("*,a.idx as idx_resep")
		->where("a.idx",$idx)
		->join("pendaftaran b","b.idx=a.idx_pendaftaran")
		->join('pasien c','b.nomr=c.nomr')
		->get("resep_master a")
		->row();
	}
}
