<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Statuskawin_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countstatuskawin($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('status', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('status_kawin a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getstatuskawin($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('status', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.Id', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('status_kawin a')->result();
	}
	function getstatuskawinById($nomr)
	{
		$this->db->where('Id', $nomr);
		return $this->db->get('status_kawin')->row();
	}

	
	function insertstatuskawin($data){
		$this->db->insert('status_kawin',$data);
		return $this->db->insert_id();
	}
	function updatestatuskawin($data,$id){
		$this->db->where('Id',$id);
		$this->db->update('status_kawin',$data);
	}

    function hapusstatuskawin($id){
		$this->db->where('Id',$id);
		$this->db->delete('status_kawin');
	}
	
}
