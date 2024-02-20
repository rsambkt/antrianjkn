<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('users_model');
        // $this->load->model('jkn_model');
        $lokasi=$this->session->userdata('lokasi');
        $lok=$this->uri->segment(3);
        
        if(empty($lokasi)) {
            if($lok!="ruang"){
                header("location:".base_url()."rajal/home/ruang");
            }
        }
    }
    function index()
    {
        $ses_state = $this->users_model->cek_session_id();
        if ($ses_state) {
            

            $sekarang = date('Y-m-d');
            // $this->db->where('jns_layanan', 'RJ');
            // $this->db->where('DATE_FORMAT(tgl_masuk,"%Y-%m-%d")', $sekarang);
            // $rj = $this->db->get('admisi')->num_rows();

            // $this->db->where('jns_layanan', 'GD');
            // $this->db->where('DATE_FORMAT(tgl_masuk,"%Y-%m-%d")', $sekarang);
            // $gd = $this->db->get('admisi')->num_rows();

            // $this->db->where('jns_layanan', 'RI');
            // $this->db->where('DATE_FORMAT(tgl_masuk,"%Y-%m-%d")', $sekarang);
            // $ri = $this->db->get('admisi')->num_rows();
			$dokter=$this->users_model->getAntrianDokter($this->session->userdata('lokasi'));
			
			if(!empty($dokter)){
				$lastantrian=$this->users_model->getLastAntrian($this->session->userdata('lokasi'),$dokter[0]->kodedokter);
				// print_r($lastantrian);exit;
				$jadwal=$this->users_model->getJadwalDokter($this->session->userdata('lokasi'),$dokter[0]->kodedokter);
			}
            else {
				$lastantrian=array();
				$jadwal=array();
			}
			// print_r($jadwal);exit;
			$data = array(
				'contentTitle' => 'Home', 
				'ruangID'=>$this->session->userdata('lokasi'),
				'kodepoli'=>getKodePoli($this->session->userdata('lokasi')),
				'display'=>getDisplay($this->session->userdata('lokasi')),
				'antreandokter'=>$dokter,
				'lastantrean'=>$lastantrian,
				'jadwal'=>$jadwal
			);
            $view = array(
                'header'        => $this->load->view('template/header', '', true),
                'nav_sidebar'   => $this->load->view('template/nav_sidebar', array(), true),
                'content'       => $this->load->view('rajal/index', $data, true),
                'lib'           => array(
					'javascript/ruang.js',
					'javascript/antrian.js'
				),
                'index_menu'=>0,
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
    function ruang(){
        $ses_state = $this->users_model->cek_session_id();
        if ($ses_state) {
            $profile=$this->users_model->getUsersInfo($this->session->userdata('userid'));
            if(!empty($profile)) {
                // print_r($profile); exit;
                $listruang=explode(',',$profile->aksespoliklinik);
                $ruang=$this->users_model->getRuangAkses($listruang);
            }else $ruang=array();
            $data = array('contentTitle' => 'Ruangan','ruang'=>$ruang);
            $view = array(
                'header' 	  => $this->load->view('template/header', '', true),
                'nav_sidebar' => $this->load->view('template/nav_sidebar', array(), true),
                'content' 	  => $this->load->view('rajal/ruang', $data, true),
                'lib'     	  => array('javascript/ruang.js'),
                'index_menu'  => 1,
            );
            $this->load->view('template/theme', $view);
        }else{
            $sid = getSessionID();
            $url_login = base_url() . '?sid=' . $sid;
            echo "<script>alert('Ops. Sesi anda telah berubah! Silahkan login kembali');
                window.location.href = '$url_login'
                </script>";
        }
    }
    function pilihruang($ruid){
        $this->session->set_userdata('lokasi',$ruid);
        header("location:".base_url()."rajal/home");
        // header('Content-Type: application/json');
        // echo json_encode(array('status'=>true));
    }
	// Antrean

	function panggilantrean(){
        $dokter=$this->input->get('dokter');
        $jns=$this->input->get('jns');
        $nomor=$this->input->get('nomor');
		$this->db->select("a.*,a.idx");
		$this->db->where("kodedokter",$dokter);
		$this->db->where("jnsantrian",$jns);
        if(!empty($nomor)) $this->db->where('nomorantrean',$nomor);
		$this->db->where('b.idx',$this->session->userdata('lokasi'));
		$this->db->where('tanggalperiksa',date('Y-m-d'));
		$this->db->join("ruang b","b.kode_jkn=kodepoli");
        $this->db->order_by('nomorantrean');
        $data=$this->db->get('jkn_antrian a')->row();
        if(empty($data)){
            $response=array('status'=>false,'message'=>'Antrian Habis');
        }else{
            $update=array('status'=>1);
            $this->db->where('idx',$data->idx);
            $this->db->update('jkn_antrian',$update);
            
			$booking=array(
				'kodebooking'=>$data->kodebooking,
				'loketpemanggil'=>$this->session->userdata('lokasi'),
				'jenisdisplay'=>'Poli',
				'displayid'=>getDisplay($this->session->userdata('lokasi')),
				'status'	=>1,
				
			);
			$this->db->insert("jkn_panggil",$booking);

            $response=array('status'=>true,'message'=>'Memanggil...','nomorantrean'=>$data->nomorantrean);
        }
        header('Content-Type: application/json');
        echo json_encode($response);

    }
	function batalkanantrean(){
        // Create TimeStamps
		$this->load->model('jkn_model');
        $res=$this->jkn_model->updatetask($this->input->post('kodebooking'),99);
        header('Content-Type: application/json');
        echo $res;
    }
	function skipantrian(){
        $data=array('jnsantrian'=>3);
        $this->db->where('kodebooking',$this->input->post('kodebooking'));
        $this->db->update('jkn_antrian',$data);
        $response=array('status'=>true,'message'=>'OK');
        header('Content-Type: application/json');
        echo json_encode($response);
    }
	function lastantrean($dj,$jns=1,$curent=""){
        $lastantrean=$this->users_model->getLastAntrian($this->session->userdata('lokasi'),$dj,$jns,$curent);
        $response=array(
            'status'    => true,
            'data'      => $lastantrean,
            'sekarang'  => date('Y-m-d H:i:s'),
            'message'   => "OK"
        );
		header('Content-Type: application/json');
        echo json_encode($response);
    }

}
