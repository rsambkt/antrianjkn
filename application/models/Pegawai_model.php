<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Pegawai_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function countpegawai($keyword = "", $param = "")
	{
        
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			
			$this->db->group_start();
			$this->db->like('nrp', $keyword);
            $this->db->or_like('nip', $keyword);
            $this->db->or_like('pgwNama', $keyword);
            $this->db->or_like('pgwJenkel', $keyword);
            $this->db->or_like('pgwTmpLahir', $keyword);
            $this->db->or_like('pgwTglLahir', $keyword);
            $this->db->or_like('pgwAgama', $keyword);
            $this->db->or_like('pgwAlmt', $keyword);
            $this->db->or_like('pgwTelp', $keyword);
            $this->db->or_like('profesi', $keyword);
			$this->db->group_end();
		}
        $this->db->join('profesi b','a.profId=b.idx');
		return $this->db->get('pegawai a')->num_rows();
		//$this->db->limit($limit, $start);
	}
	function getpegawai($limit = 0, $mulai = 1, $keyword = "", $param = "")
	{
        $this->db->select("a.*,b.profesi");
        if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nrp', $keyword);
            $this->db->or_like('nip', $keyword);
            $this->db->or_like('pgwNama', $keyword);
            $this->db->or_like('pgwJenkel', $keyword);
            $this->db->or_like('pgwTmpLahir', $keyword);
            $this->db->or_like('pgwTglLahir', $keyword);
            $this->db->or_like('pgwAgama', $keyword);
            $this->db->or_like('pgwAlmt', $keyword);
            $this->db->or_like('pgwTelp', $keyword);
            $this->db->or_like('profesi', $keyword);
			$this->db->group_end();
		}
        $this->db->join('profesi b','a.profId=b.idx');
        $this->db->order_by('a.nrp', 'desc');
		$this->db->limit($limit, $mulai);
		return $this->db->get('pegawai a')->result();
	}
	function getpegawaiById($nomr)
	{
		$this->db->where('nrp', $nomr);
		return $this->db->get('pegawai')->row();
	}

	
	function insertpegawai($data){
		$this->db->insert('pegawai',$data);
		return $this->db->insert_id();
	}
	function updatepegawai($data,$id){
		$this->db->where('nrp',$id);
		$this->db->update('pegawai',$data);
	}

    function hapuspegawai($id){
		$this->db->where('nrp',$id);
		$this->db->delete('pegawai');
	}
	function getJnsLayanan(){
        $this->db->where('aktif',1);
        return $this->db->get('profesi')->result();
    }
    function getProfesi(){
        return $this->db->get('profesi')->result();
    }
    function getAgama(){
        return $this->db->get('agama')->result();
    }

    function generateNrp(){
        $sep='NRP'.date('ym');
        // $sep='NRP1910';
        $this->db->select('nrp');
        $this->db->like('nrp',$sep,'after');
        $this->db->order_by('nrp','DESC');
        $this->db->limit(1);
        $data=$this->db->get('pegawai')->row();
        if(empty($data)) return $sep."001";
        else{
            $nrpterakhir=$data->nrp;
            $nrpangka=substr($nrpterakhir,7,3);
            // echo $nrpterakhir."<br>".$nrpangka."<br>";
            $newnrpangka=intval($nrpangka)+1;
            return $sep.str_pad($newnrpangka,3,'0',STR_PAD_LEFT);
        }

    }
}
