<?php
defined('BASEPATH') or exit('No direct script access allowed');

class rujukan_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countrujukan($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('rujukan', $keyword);
            $this->db->or_like('faskes', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('rujukan a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getrujukan($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('rujukan', $keyword);
            $this->db->or_like('faskes', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.idx', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('rujukan a')->result();
	}
	function getrujukanById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('rujukan')->row();
	}

	
	function insertrujukan($data){
		$this->db->insert('rujukan',$data);
		return $this->db->insert_id();
	}
	function updaterujukan($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('rujukan',$data);
	}

    function hapusrujukan($id){
		$this->db->where('idx',$id);
		$this->db->delete('rujukan');
	}
	
}
