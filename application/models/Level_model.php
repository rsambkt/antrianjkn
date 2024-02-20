<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Level_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countlevel($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('level', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('acc_level a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getlevel($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('level', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('acc_level a')->result();
	}
	function getlevelById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('acc_level')->row();
	}

	
	function insertlevel($data){
		$this->db->insert('acc_level',$data);
		return $this->db->insert_id();
	}
	function updatelevel($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('acc_level',$data);
	}

    function hapuslevel($id){
		$this->db->where('idx',$id);
		$this->db->delete('acc_level');
	}
    function getModul(){
        $this->db->where('status',1);
        return $this->db->get('acc_modul')->result();
    }
	
}
