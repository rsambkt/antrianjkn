<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Suku_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countsuku($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('nama_suku', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('suku a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getsuku($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nama_suku', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('suku a')->result();
	}
	function getsukuById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('suku')->row();
	}

	
	function insertsuku($data){
		$this->db->insert('suku',$data);
		return $this->db->insert_id();
	}
	function updatesuku($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('suku',$data);
	}

    function hapussuku($id){
		$this->db->where('idx',$id);
		$this->db->delete('suku');
	}
	
}
