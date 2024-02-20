<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Kamar extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('users_model');
        $this->load->model('Kamar_model');
        $this->load->helper('ajaxdata');
    }
    function index()
    {
        if ($this->session->userdata('modul')==1) {
            $data = array(
                'contentTitle' => 'kamar', 
                'bangsal'=>$this->Kamar_model->getBangsal(),
                'kelas'=>$this->Kamar_model->getkelas()
            );
            $view = array(
                'header' => $this->load->view('template/header', '', true),
                'nav_sidebar' => $this->load->view('template/nav_sidebar', array(), true),
                'content' => $this->load->view('admin/master/kamar', $data, true),
                'index_menu'=>2,
                'lib'           => array('javascript/kamar.js'),
                'ajaxdata'  => ''
            );
            $this->load->view('template/theme', $view);
        } else {
            $sid = getSessionID();
            $url_login = base_url() . '?sid=' . $sid;
            echo "<script>alert('Ops. Sesi anda telah berubah! Silahkan login kembali');
                window.location.href = '$url_login'
                </script>";
        }
    }

    function bed($idkamar){
        if ($this->session->userdata('modul')==1) {
            $data = array(
                'contentTitle' => 'Tempat Tidur', 
                'kamar'=>$this->Kamar_model->getKamarById($idkamar),
                'tt'=>$this->Kamar_model->getTT($idkamar)
            );
            $view = array(
                'header' => $this->load->view('template/header', '', true),
                'nav_sidebar' => $this->load->view('template/nav_sidebar', array(), true),
                'content' => $this->load->view('admin/master/bed', $data, true),
                'index_menu'=>2,
                'lib'           => array('javascript/bed.js'),
                'ajaxdata'  => ''
            );
            $this->load->view('template/theme', $view);
        } else {
            $sid = getSessionID();
            $url_login = base_url() . '?sid=' . $sid;
            echo "<script>alert('Ops. Sesi anda telah berubah! Silahkan login kembali');
                window.location.href = '$url_login'
                </script>";
        }
    }

    function datakamar()
    {
        if ($this->session->userdata('modul')==1) {
            $keyword = urldecode($this->input->get('keyword', TRUE));
            $start = intval($this->input->get('start'));
            $limit = intval($this->input->get('limit'));
            $param = urldecode($this->input->get('param', TRUE));
            $mulai = ($start * $limit) - $limit;
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'start'     => $mulai,
                'row_count' => $this->Kamar_model->countKamar($keyword, $param),
                'limit'     => $limit,
                'data'      => $this->Kamar_model->getKamar($limit, $mulai, $keyword, $param),
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function datatt($idkamar)
    {
        if ($this->session->userdata('modul')==1) {
            
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'data'      => $this->Kamar_model->getTT($idkamar),
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    
    function insert(){
        if ($this->session->userdata('modul')==1) {
            $status=$this->input->post('status_kamar');
            if($status!=1) $status=0;
            $kelas=$this->Kamar_model->getKelasById($this->input->post('kelas_id'));
            $data=array(
                'nama_kamar'=>$this->input->post('nama_kamar'),
                'id_ruang'=>$this->input->post('id_ruang'),
                'nama_ruang'=>$this->input->post('nama_ruang'),
                'kelasjkn'=>$kelas->kode_jkn,
                'kelas_id'=>$this->input->post('kelas_id'),
                'kelas_kamar'=>$this->input->post('kelas_kamar'),
                'jekel'=>$this->input->post('jekel'),
                'status_kamar'=>$status
            );
            $idx=$this->input->post('id_kamar');
            if(empty($idx)) {
                $idx=$this->Kamar_model->insertkamar($data);
                $pesan="kamar berhasil disimpan";
            }
            else {
                $id=$this->Kamar_model->updatekamar($data,$idx);
                $pesan="kamar berhasil diupdate";
            }
            $response = array('status' => true, 'message' => $pesan,'idkamar'=>$idx);
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function inserttt(){
        if ($this->session->userdata('modul')==1) {
            $status=$this->input->post('statustt');
            $data=array(
                'idkamartt'=>$this->input->post('id_kamar'),
                'namatt'=>$this->input->post('namatt'),
                'statustt'=>$status
            );
            $idx=$this->input->post('idtt');
            if(empty($idx)) {
                $id=$this->Kamar_model->inserttt($data);
                $pesan="tempat tidur berhasil disimpan";
            }
            else {
                $id=$this->Kamar_model->updatett($data,$idx);
                $pesan="tempat tidur berhasil diupdate";
            }
            $response = array('status' => true, 'message' => $pesan);
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function update(){
        if ($this->session->userdata('modul')==1) {
            $status=$this->input->post('status_kamar');
            if($status!=1) $status=0;
            $data=array(
                'kode_jkn'=>$this->input->post('kode_jkn'),
                'kamar'=>$this->input->post('kamar'),
                'jns_layanan'=>$this->input->post('jns_layanan'),
                'status_kamar'=>$status
            );
            $this->Kamar_model->updatekamar($data,$idx);
            $response = array('status' => true, 'message' => 'Data kamar berhasil diupdate');
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function edittt($idx){
        if ($this->session->userdata('modul')==1) {
            $data=$this->Kamar_model->getTTById($idx);
            $response = array('status' => true, 'message' => 'Ok','data'=>$data);
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function edit($idx){
        if ($this->session->userdata('modul')==1) {
            $data=$this->Kamar_model->getKamarById($idx);
            $response = array('status' => true, 'message' => 'Ok','data'=>$data);
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function hapus($idx){
        if ($this->session->userdata('modul')==1) {
            $kamar=$this->Kamar_model->getKamarById($idx);
            $data=array(
                'kodekelas'=>$kamar->kelasjkn,
                'koderuang'=>$kamar->id_kamar
            );
            $res=bridgingbpjs('rest/bed/delete/'.KODERS_VC,"POST",json_encode($data));
            $arr=json_decode($res);
            if($arr->metadata->code==1){
                $data=$this->Kamar_model->hapuskamar($idx);
                $response = array('status' => true, 'message' => $arr->metadata->message,'response'=>$arr);
            }else{
                $response = array('status' => false, 'message' => $arr->metadata->message,'response'=>$arr,'req'=>$data);
            }
            
            
            
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function hapustt($idx){
        if ($this->session->userdata('modul')==1) {
            $data=$this->Kamar_model->hapustt($idx);
            $response = array('status' => true, 'message' => 'Data berhasil dihapus','data'=>$data);
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
}
