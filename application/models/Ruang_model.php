<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Ruang_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countruang($keyword = "", $statusruang = "1",$jnslayanan = "")
	{
        
		if (!empty($statusruang)) $this->db->where('status_ruang', $statusruang);
		if (!empty($jnslayanan)) $this->db->where('jns_layanan', $jnslayanan);
		$this->db->group_start();
		$this->db->like('kode_jkn', $keyword);
        $this->db->or_like('ruang', $keyword);
        $this->db->or_like('jenislayanan', $keyword);
		$this->db->group_end();
        $this->db->join('jenis_layanan b','a.jns_layanan=b.idx');
		return $this->db->get('ruang a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getruang($limit = 0, $mulai = 1, $keyword = "", $statusruang = "", $jnslayanan = "")
	{
        $this->db->select("a.*,b.jenislayanan, CONCAT(loketlabel,'-',loketnama) as loketnama,d.display");
        if (!empty($statusruang)) $this->db->where('status_ruang', $statusruang);
		if (!empty($jnslayanan)) $this->db->where('jns_layanan', $jnslayanan);
			$this->db->group_start();
			$this->db->like('kode_jkn', $keyword);
            $this->db->or_like('ruang', $keyword);
            $this->db->or_like('jenislayanan', $keyword);
			$this->db->group_end();
        $this->db->join('jenis_layanan b','a.jns_layanan=b.idx');
        $this->db->join('loket c','a.loketid=c.loketid','LEFT');
        $this->db->join('display d','a.displayid=d.idx','LEFT');
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('ruang a')->result();
	}
	function getruangById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('ruang')->row();
	}

	function getLoket(){
		return $this->db->get("loket")->result();
	}
	function getDisplay(){
		return $this->db->get("display")->result();
	}
	function insertruang($data){
		$this->db->insert('ruang',$data);
		return $this->db->insert_id();
	}
	function updateruang($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('ruang',$data);
	}

    function hapusruang($id){
		$this->db->where('idx',$id);
		$this->db->delete('ruang');
	}
	function getJnsLayanan(){
        $this->db->where('aktif',1);
        return $this->db->get('jenis_layanan')->result();
    }
}
