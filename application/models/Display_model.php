<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Display_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}

    function getMonitoringAll1(){
		$kelas = $this->getKelas();
		$jmlkelas = $this->getMaxKelas();
		foreach ($kelas as $k ) {
			$header[]=array('kode'=> str_replace(' ','_',strtolower($k->kelas_kamar)),'alias'=>$k->kelas_kamar);
			$field[]="SUM(CASE WHEN `idx` = '".$k->idx."' THEN a.`jml_tt` ELSE 0 END) AS `jml_tt_".str_replace(' ','_',strtolower($k->kelas_kamar))."`";
			$field[]="SUM(CASE WHEN `idkelas_display` = '".$k->idx."' THEN IFNULL(b.`terisi_lk`,0) ELSE 0 END) AS `tlk_".str_replace(' ','_',strtolower($k->kelas_kamar))."`";
			$field[]="SUM(CASE WHEN `idkelas_display` = '".$k->idx. "' THEN IFNULL(b.`terisi_pr`,0) ELSE 0 END) AS `tpr_".str_replace(' ','_',strtolower($k->kelas_kamar))."`";
		}
		$pivot=implode(',',$field);
		$this->db->select("
			a.`id_ruang`,
			a.`nama_ruang`,
			SUM(a.`jml_tt`) AS jml_tt,$pivot
		");
		$this->db->join('view_bedterisi b','a.id_kamar=b.id_kamar','LEFT');
		$this->db->group_by('id_ruang');
		$this->db->where('status_kamar',1);
		return array('kelas'=>$header,'jmlkelas'=>$jmlkelas,'ruang'=>$this->db->get('tbl01_kamar a')->result());
	}
    function getKelas(){
        return $this->db->get("kelas_kamar")->result();
    }
	function getMonitoringAll()
	{
		$kelas = $this->getKelas();
		$jmlkelas = $this->getMaxKelas();
		foreach ($kelas as $k ) {
			$header[]=array('kode'=> str_replace(' ','_',strtolower($k->kelas_kamar)),'alias'=>$k->kelas_kamar);
			$field[]="SUM(CASE WHEN `kelas_id` = '".$k->idx."' AND id_daftar IS NULL AND idtt IS NOT NULL THEN 1 ELSE 0 END) AS `jml_tt_".str_replace(' ','_',strtolower($k->kelas_kamar))."`";
			$field[]="SUM(CASE WHEN `kelas_id` = '".$k->idx."' AND id_daftar IS NOT NULL AND jnskelamin=1  THEN 1 ELSE 0 END) AS `tlk_".str_replace(' ','_',strtolower($k->kelas_kamar))."`";
			$field[]="SUM(CASE WHEN `kelas_id` = '".$k->idx. "' AND id_daftar IS NOT NULL AND jnskelamin=2 THEN 1 ELSE 0 END) AS `tpr_".str_replace(' ','_',strtolower($k->kelas_kamar))."`";
		}
		$pivot=implode(',',$field);
		$this->db->select("a.*,COUNT(idtt) AS totaltt,$pivot");
        
        $this->db->join('tempattidur b','id_kamar=idkamartt','LEFT');
        $this->db->order_by('a.id_ruang');
        $this->db->group_by('a.id_ruang');
		$ruang= $this->db->get('kamar a')->result();
		return array('kelas'=>$header,'jmlkelas'=>$jmlkelas,'ruang'=>$ruang);
	}
	function getMaxKelas(){
		return $this->db->query("SELECT MAX(jmlkelas) AS maxkelas FROM(
			SELECT *,COUNT(kelas_id) jmlkelas FROM `kamar` GROUP BY kelas_id) AS temp")->row()->maxkelas;
	}
	function getAntrianPanggil(){
		
	}
}
