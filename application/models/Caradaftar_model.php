<?php
defined('BASEPATH') or exit('No direct script access allowed');

class caradaftar_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countcaradaftar($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('caradaftar', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('cara_daftar a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getcaradaftar($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('caradaftar', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('cara_daftar a')->result();
	}
	function getcaradaftarById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('cara_daftar')->row();
	}

	
	function insertcaradaftar($data){
		$this->db->insert('cara_daftar',$data);
		return $this->db->insert_id();
	}
	function updatecaradaftar($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('cara_daftar',$data);
	}

    function hapuscaradaftar($id){
		$this->db->where('idx',$id);
		$this->db->delete('cara_daftar');
	}
	
}
