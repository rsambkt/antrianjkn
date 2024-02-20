<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Bahasa_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countbahasa($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('bahasa', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('bahasa a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getbahasa($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('bahasa', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('bahasa a')->result();
	}
	function getbahasaById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('bahasa')->row();
	}

	
	function insertbahasa($data){
		$this->db->insert('bahasa',$data);
		return $this->db->insert_id();
	}
	function updatebahasa($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('bahasa',$data);
	}

    function hapusbahasa($id){
		$this->db->where('idx',$id);
		$this->db->delete('bahasa');
	}
	
}
