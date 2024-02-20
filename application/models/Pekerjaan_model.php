<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Pekerjaan_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countpekerjaan($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('pekerjaan_nama', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('pekerjaan a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getpekerjaan($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('pekerjaan_nama', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.pekerjaan_id', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('pekerjaan a')->result();
	}
	function getpekerjaanById($nomr)
	{
		$this->db->where('pekerjaan_id', $nomr);
		return $this->db->get('pekerjaan')->row();
	}

	
	function insertpekerjaan($data){
		$this->db->insert('pekerjaan',$data);
		return $this->db->insert_id();
	}
	function updatepekerjaan($data,$id){
		$this->db->where('pekerjaan_id',$id);
		$this->db->update('pekerjaan',$data);
	}

    function hapuspekerjaan($id){
		$this->db->where('pekerjaan_id',$id);
		$this->db->delete('pekerjaan');
	}
	
}
