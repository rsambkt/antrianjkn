<?php
defined('BASEPATH') or exit('No direct script access allowed');

class carakeluar_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countcarakeluar($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('cara_keluar', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('cara_keluar a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getcarakeluar($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('cara_keluar', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('cara_keluar a')->result();
	}
	function getcarakeluarById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('cara_keluar')->row();
	}

	
	function insertcarakeluar($data){
		$this->db->insert('cara_keluar',$data);
		return $this->db->insert_id();
	}
	function updatecarakeluar($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('cara_keluar',$data);
	}

    function hapuscarakeluar($id){
		$this->db->where('idx',$id);
		$this->db->delete('cara_keluar');
	}
	
}
