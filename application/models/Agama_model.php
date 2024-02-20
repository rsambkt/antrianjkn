<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Agama_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countagama($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('agama', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('agama a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getagama($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('agama', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('agama a')->result();
	}
	function getagamaById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('agama')->row();
	}

	
	function insertagama($data){
		$this->db->insert('agama',$data);
		return $this->db->insert_id();
	}
	function updateagama($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('agama',$data);
	}

    function hapusagama($id){
		$this->db->where('idx',$id);
		$this->db->delete('agama');
	}
	
}
