<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Kelaslayanan_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countkelaslayanan($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('kelas_layanan', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('kelas_layanan a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getkelaslayanan($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('kelas_layanan', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('kelas_layanan a')->result();
	}
	function getkelaslayananById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('kelas_layanan')->row();
	}

	
	function insertkelaslayanan($data){
		$this->db->insert('kelas_layanan',$data);
		return $this->db->insert_id();
	}
	function updatekelaslayanan($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('kelas_layanan',$data);
	}

    function hapuskelaslayanan($id){
		$this->db->where('idx',$id);
		$this->db->delete('kelas_layanan');
	}
	
}
