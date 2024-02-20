<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Wilayah_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countwilayah($keyword = "", $param = "")
	{
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('provinsi', $keyword);
            $this->db->or_like('kabkota', $keyword);
            $this->db->or_like('nama_kabkota', $keyword);
            $this->db->or_like('kecamatan', $keyword);
            $this->db->or_like('desa', $keyword);
			$this->db->group_end();
		}
		return $this->db->get('wilayah a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getwilayah($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('provinsi', $keyword);
            $this->db->or_like('kabkota', $keyword);
            $this->db->or_like('nama_kabkota', $keyword);
            $this->db->or_like('kecamatan', $keyword);
            $this->db->or_like('desa', $keyword);
			$this->db->group_end();
		}
        $this->db->order_by('a.wilayah_id', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('wilayah a')->result();
	}
	function getwilayahById($nomr)
	{
		$this->db->where('wilayah_id', $nomr);
		return $this->db->get('wilayah')->row();
	}

	
	function insertwilayah($data){
		$this->db->insert('wilayah',$data);
		return $this->db->insert_id();
	}
	function updatewilayah($data,$id){
		$this->db->where('wilayah_id',$id);
		$this->db->update('wilayah',$data);
	}

    function hapuswilayah($id){
		$this->db->where('wilayah_id',$id);
		$this->db->delete('wilayah');
	}
	function getProvinsi($param){
		$this->db->select('provinsi');
		$this->db->like('provinsi',$param);
		$this->db->group_by('provinsi');
		return $this->db->get('wilayah')->result();
	}
	function getKabKota($provinsi,$param){
		$this->db->select('kabkota,nama_kabkota');
		$this->db->where('provinsi',$provinsi);
		$this->db->group_start();
		$this->db->like('kabkota',$param);
		$this->db->or_like('nama_kabkota',$param);
		$this->db->group_by('nama_kabkota');
		$this->db->group_end();
		return $this->db->get('wilayah')->result();
	}
	function getKecamatan($param){
		$this->db->select('kecamatan');
		$this->db->like('kecamatan',$param);
		$this->db->group_by('kecamatan');
		return $this->db->get('wilayah')->result();
	}
	function generateKode(){
		$this->db->select('wilayah_id');
		$this->db->order_by('wilayah_id','DESC');
		$data=$this->db->get('wilayah')->row();
		if(empty($data)){
			return "00001";
		}else{
			$kl=intval($data->wilayah_id)+1;
			return str_pad($kl,5,"0",STR_PAD_LEFT);
		}
	}
}
