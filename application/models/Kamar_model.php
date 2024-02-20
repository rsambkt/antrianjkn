<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Kamar_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countKamar($keyword = "", $param = "")
	{
           
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('nama_kamar', $keyword);
            $this->db->or_like('nama_ruang', $keyword);
            $this->db->or_like('kelas_kamar', $keyword);
			$this->db->group_end();
		}
        $this->db->join('tempattidur b','id_kamar=idkamartt','LEFT');
        $this->db->group_by('id_kamar');
		return $this->db->get('kamar a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getKamar($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        $this->db->select("a.*,COUNT(idtt) AS totaltt,
        SUM(CASE WHEN statustt=0 THEN 1 ELSE 0 END) AS nonaktif,
        SUM(CASE WHEN statustt=1 THEN 1 ELSE 0 END) AS aktif,
        SUM(CASE WHEN statustt=2 THEN 1 ELSE 0 END) AS rusak,
        SUM(CASE WHEN id_daftar IS NULL AND idtt IS NOT NULL THEN 1 ELSE 0 END) AS tersedia,
        SUM(CASE WHEN id_daftar IS NOT NULL AND jnskelamin=1 THEN 1 ELSE 0 END) AS terisilk,
        SUM(CASE WHEN id_daftar IS NOT NULL AND jnskelamin=2 THEN 1 ELSE 0 END) AS terisipr,
        (CASE WHEN jekel=1 THEN 'Pria' WHEN jekel=2 THEN 'Wanita' ELSE 'Pria & Wanita' END) AS penempatan");
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nama_kamar', $keyword);
            $this->db->or_like('nama_ruang', $keyword);
            $this->db->or_like('kelas_kamar', $keyword);
			$this->db->group_end();
		}
        $this->db->join('tempattidur b','id_kamar=idkamartt','LEFT');
        $this->db->order_by('a.id_kamar', 'desc');
        $this->db->group_by('id_kamar');
		$this->db->limit($limit, $mulai);
		return $this->db->get('kamar a')->result();
	}
	function getKamarById($nomr)
	{
		$this->db->where('id_kamar', $nomr);
		return $this->db->get('kamar')->row();
	}

	
	function insertKamar($data){
		$this->db->insert('kamar',$data);
		return $this->db->insert_id();
	}
	function inserttt($data){
		$this->db->insert('tempattidur',$data);
		return $this->db->insert_id();
	}
	function updateKamar($data,$id){
		$this->db->where('id_kamar',$id);
		$this->db->update('kamar',$data);
	}
	function updatett($data,$id){
		$this->db->where('idtt',$id);
		$this->db->update('tempattidur',$data);
	}

    function hapusKamar($id){
		// Hapus TT
		$this->db->where('idkamartt',$id)->delete("tempattidur");
		// Hapus Kamar
		$this->db->where('id_kamar',$id)->delete('kamar');
		return true;
	}
    function hapustt($id){
		$this->db->where('idtt',$id);
		$this->db->delete('tempattidur');
	}
	function getBangsal(){
        $this->db->where('jns_layanan',1);
        return $this->db->get('ruang')->result();
    }
	function getKelas(){
        return $this->db->get('kelas_kamar')->result();
    }
	function getKelasById($id){
        return $this->db->where('idx',$id)->get('kelas_kamar')->row();
    }
    function getTT($kamarid){
        return $this->db->where("idkamartt",$kamarid)->get('tempattidur')->result();
    }
    function getTTById($id){
        return $this->db->where("idtt",$id)->get('tempattidur')->row();
    }
}
