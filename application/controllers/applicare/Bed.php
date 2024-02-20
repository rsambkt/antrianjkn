<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Bed extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('users_model');
        $this->load->helper('bridging');
    }
    function kelas(){
        $res=bridgingbpjs('rest/ref/kelas');
        header('Content-Type: application/json');
        echo $res;
    }
    function kamar($start=1,$limit=1){
        $res=bridgingbpjs('rest/bed/read/'.KODERS_VC."/".$start."/".$limit);
        header('Content-Type: application/json');
        echo $res;
    }
    function create($idkamar){
        $d=$this->db->select("kelasjkn AS kodekelas,id_kamar AS koderuang,nama_kamar AS namaruang,
        SUM(CASE WHEN status_kamar=1 AND publish=1 THEN 1 ELSE 0 END) AS kapasitas,
        SUM(CASE WHEN id_daftar IS NULL AND status_kamar=1 AND publish=1 THEN 1 ELSE 0 END) AS tersedia,
        SUM(CASE WHEN jekel=1 AND id_daftar IS NULL AND status_kamar=1 AND publish=1 THEN 1 ELSE 0 END) AS tersediapria,
        SUM(CASE WHEN jekel=2 AND id_daftar IS NULL AND status_kamar=1 AND publish=1 THEN 1 ELSE 0 END) AS tersediawanita,
        SUM(CASE WHEN jekel=3 AND id_daftar IS NULL AND status_kamar=1 AND publish=1 THEN 1 ELSE 0 END) AS tersediapriawanita")
        ->join("tempattidur","id_kamar=idkamartt","LEFT")
        ->where('id_kamar',$idkamar)
        ->group_by("id_kamar")
        ->get("kamar")
        ->row();
        $jsonData=json_encode($d);
        $res=http_request('rest/bed/create/'.KODERS_VC,$jsonData);
        $arr=json_decode($res);
        if($arr->metadata->code==1){
            $kamar=array('bpjsimport'=>1);
            $this->db->where('id_kamar',$idkamar)->update('kamar',$kamar);
        }else{
            if($arr->metadata->message=="Data tersebut sudah ada."){
                $kamar=array('bpjsimport'=>1);
                $this->db->where('id_kamar',$idkamar)->update('kamar',$kamar);
            }
        }
        header('Content-Type: application/json');
        echo $res;
    }
    
    function update($idkamar){
        $data=$this->db->select("kelasjkn AS kodekelas,id_kamar AS koderuang,nama_kamar AS namaruang,
        SUM(CASE WHEN status_kamar=1 AND publish=1 THEN 1 ELSE 0 END) AS kapasitas,
        SUM(CASE WHEN id_daftar IS NULL AND status_kamar=1 AND publish=1 THEN 1 ELSE 0 END) AS tersedia,
        SUM(CASE WHEN jekel=1 AND id_daftar IS NULL AND status_kamar=1 AND publish=1 THEN 1 ELSE 0 END) AS tersediapria,
        SUM(CASE WHEN jekel=2 AND id_daftar IS NULL AND status_kamar=1 AND publish=1 THEN 1 ELSE 0 END) AS tersediawanita,
        SUM(CASE WHEN jekel=3 AND id_daftar IS NULL AND status_kamar=1 AND publish=1 THEN 1 ELSE 0 END) AS tersediapriawanita")
        ->join("tempattidur","id_kamar=idkamartt","LEFT")
        ->where('id_kamar',$idkamar)
        ->group_by("id_kamar")
        ->get("kamar")
        ->row_array();
        $res=http_request('rest/bed/update/'.KODERS_VC,json_encode($data));
        header('Content-Type: application/json');
        echo $res;
    }
    
    function delete(){
        $data=array(
            'kodekelas'=>$this->input->post('kodekelas'),
            'koderuang'=>$this->input->post('koderuang')
        );
        $res=bridgingbpjs('rest/bed/delete/'.KODERS_VC,"POST",json_encode($data));
        header('Content-Type: application/json');
        echo $res;
    }

    function hapus($kodekelas,$koderuang){
        $data=array(
            'kodekelas'=>$kodekelas,
            'koderuang'=>$koderuang
        );
        $res=bridgingbpjs('rest/bed/delete/'.KODERS_VC,"POST",json_encode($data));
        $arr=json_decode($res);
        if($arr->metadata->code==1){
            $this->kamar_model->hapusKamar($koderuang);
        }
        header('Content-Type: application/json');
        echo $res;
    }
}
