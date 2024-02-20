<?php
defined('BASEPATH') or exit('No direct script access allowed');

class profesi_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countprofesi($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('profesi', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('profesi a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getprofesi($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('profesi', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('profesi a')->result();
	}
	function getprofesiById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('profesi')->row();
	}

	
	function insertprofesi($data){
		$this->db->insert('profesi',$data);
		return $this->db->insert_id();
	}
	function updateprofesi($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('profesi',$data);
	}

    function hapusprofesi($id){
		$this->db->where('idx',$id);
		$this->db->delete('profesi');
	}
	
}
