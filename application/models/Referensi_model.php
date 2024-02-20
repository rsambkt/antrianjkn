<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Referensi_model extends CI_Model
{
	function getObat($keyword){
		$this->db2 = $this->load->database('db2', true);
		return $this->db2->like('NMBRG',$keyword)
		->or_like("NMKTBRG",$keyword)
		->or_like("JENISBRG",$keyword)
		->get("tbl04_barang")
		->result();
	}
	function getKomponenObat($keyword){
		$this->db2 = $this->load->database('db2', true);
		return $this->db2->where("KAPASITAS IS NOT NULL")
		->where("KAPASITAS >",0)
		->group_start()
		->like('NMBRG',$keyword)
		->or_like("NMKTBRG",$keyword)
		->or_like("JENISBRG",$keyword)
		->group_end()
		->get("tbl04_barang")
		->result();
	}
}
