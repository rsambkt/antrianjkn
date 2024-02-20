<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Negara_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countnegara($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('nama_negara', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('negara a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getnegara($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nama_negara', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('negara a')->result();
	}
	function getnegaraById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('negara')->row();
	}

	
	function insertnegara($data){
		$this->db->insert('negara',$data);
		return $this->db->insert_id();
	}
	function updatenegara($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('negara',$data);
	}

    function hapusnegara($id){
		$this->db->where('idx',$id);
		$this->db->delete('negara');
	}
	
}
