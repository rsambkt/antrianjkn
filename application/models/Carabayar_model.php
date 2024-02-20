<?php
defined('BASEPATH') or exit('No direct script access allowed');

class carabayar_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countcarabayar($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('cara_bayar', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('cara_bayar a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getcarabayar($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('cara_bayar', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('cara_bayar a')->result();
	}
	function getcarabayarById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('cara_bayar')->row();
	}

	
	function insertcarabayar($data){
		$this->db->insert('cara_bayar',$data);
		return $this->db->insert_id();
	}
	function updatecarabayar($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('cara_bayar',$data);
	}

    function hapuscarabayar($id){
		$this->db->where('idx',$id);
		$this->db->delete('cara_bayar');
	}
	
}
