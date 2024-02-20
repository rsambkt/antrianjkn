<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Dokter_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countdokter($keyword = "", $param = "")
	{
        
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('a.nrp', $keyword);
            $this->db->or_like('nip', $keyword);
            $this->db->or_like('pgwNama', $keyword);
            $this->db->or_like('pgwJenkel', $keyword);
            $this->db->or_like('pgwTmpLahir', $keyword);
            $this->db->or_like('pgwTglLahir', $keyword);
            $this->db->or_like('pgwAgama', $keyword);
            $this->db->or_like('pgwAlmt', $keyword);
            $this->db->or_like('pgwTelp', $keyword);
            $this->db->or_like('profesi', $keyword);
            $this->db->or_like('ruang', $keyword);
			$this->db->group_end();
		}
        $this->db->join('pegawai a','a.nrp=c.nrp');
        $this->db->join('profesi b','a.profId=b.idx');
        $this->db->join('ruang d','d.idx=c.idruang');
		return $this->db->get('dokter c')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getdokter($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        $this->db->select("a.*,b.profesi,c.dokter,d.ruang,c.id as idx");
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('a.nrp', $keyword);
            $this->db->or_like('nip', $keyword);
            $this->db->or_like('pgwNama', $keyword);
            $this->db->or_like('pgwJenkel', $keyword);
            $this->db->or_like('pgwTmpLahir', $keyword);
            $this->db->or_like('pgwTglLahir', $keyword);
            $this->db->or_like('pgwAgama', $keyword);
            $this->db->or_like('pgwAlmt', $keyword);
            $this->db->or_like('pgwTelp', $keyword);
            $this->db->or_like('profesi', $keyword);
            $this->db->or_like('ruang', $keyword);
			$this->db->group_end();
		}
        $this->db->join('pegawai a','a.nrp=c.nrp');
        $this->db->join('profesi b','a.profId=b.idx');
        $this->db->join('ruang d','d.idx=c.idruang');
        $this->db->order_by('a.nrp', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('dokter c')->result();
	}
	function getdokterById($nomr)
	{
		$this->db->where('id', $nomr);
		return $this->db->get('dokter')->row();
	}

	
	function insertdokter($data){
		$this->db->insert('dokter',$data);
		return $this->db->insert_id();
	}
	function updatedokter($data,$id){
		$this->db->where('id',$id);
		$this->db->update('dokter',$data);
	}

    function hapusdokter($id){
		$this->db->where('id',$id);
		$this->db->delete('dokter');
	}
	function getJnsLayanan(){
        $this->db->where('aktif',1);
        return $this->db->get('profesi')->result();
    }
    function getPegawai(){
        return $this->db->get('pegawai')->result();
    }
    function getRuang(){
        $this->db->where('status_ruang',1);
        return $this->db->get('ruang')->result();
    }

    
}
