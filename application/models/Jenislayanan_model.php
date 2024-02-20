<?php
defined('BASEPATH') or exit('No direct script access allowed');

class jenislayanan_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countjenislayanan($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('jenislayanan', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('jenis_layanan a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getjenislayanan($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('jenislayanan', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('jenis_layanan a')->result();
	}
	function getjenislayananById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('jenis_layanan')->row();
	}

	
	function insertjenislayanan($data){
		$this->db->insert('jenis_layanan',$data);
		return $this->db->insert_id();
	}
	function updatejenislayanan($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('jenis_layanan',$data);
	}

    function hapusjenislayanan($id){
		$this->db->where('idx',$id);
		$this->db->delete('jenis_layanan');
	}
	
}
