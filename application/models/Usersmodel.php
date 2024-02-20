<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Usersmodel extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countusers($keyword = "", $param = "")
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
            $this->db->or_like('level', $keyword);
			$this->db->group_end();
		}
        $this->db->join('pegawai a','a.nrp=c.nrp');
        $this->db->join('profesi b','a.profId=b.idx');
        $this->db->join('acc_level d','d.idx=c.levelid');
		return $this->db->get('users_admin c')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getusers($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        $this->db->select("a.*,b.profesi,d.level,c.idx as idx");
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
            $this->db->or_like('level', $keyword);
			$this->db->group_end();
		}
        $this->db->join('pegawai a','a.nrp=c.nrp');
        $this->db->join('profesi b','a.profId=b.idx');
        $this->db->join('acc_level d','d.idx=c.levelid');
        $this->db->order_by('a.nrp', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('users_admin c')->result();
	}
	function getusersById($nomr)
	{
		$this->db->where('idx', $nomr);
		return $this->db->get('users_admin')->row();
	}

	
	function insertusers($data){
		$this->db->insert('users_admin',$data);
		return $this->db->insert_id();
	}
	function updateusers($data,$id){
		$this->db->where('idx',$id);
		$this->db->update('users_admin',$data);
	}

    function hapususers($id){
		$this->db->where('idx',$id);
		$this->db->delete('users_admin');
	}
	function getJnsLayanan(){
        $this->db->where('aktif',1);
        return $this->db->get('profesi')->result();
    }
    function getPegawai(){
        return $this->db->get('pegawai')->result();
    }
    function getLevel(){
        $this->db->where('status',1);
        return $this->db->get('acc_level')->result();
    }

    
}
