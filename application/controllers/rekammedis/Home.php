<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('users_model');
        //$this->load->model('nota_model');
    }
    function index()
    {
        $ses_state = $this->users_model->cek_session_id();
        if ($ses_state) {


            $sekarang = date('Y-m-d');
            $this->db->where('jns_layanan', 'RJ');
            $this->db->where('DATE_FORMAT(tgl_masuk,"%Y-%m-%d")', $sekarang);
            $rj = $this->db->get('admisi')->num_rows();

            $this->db->where('jns_layanan', 'GD');
            $this->db->where('DATE_FORMAT(tgl_masuk,"%Y-%m-%d")', $sekarang);
            $gd = $this->db->get('admisi')->num_rows();

            $this->db->where('jns_layanan', 'RI');
            $this->db->where('DATE_FORMAT(tgl_masuk,"%Y-%m-%d")', $sekarang);
            $ri = $this->db->get('admisi')->num_rows();

			// $dokter=$this->users_model->getAntrianDokter($this->session->userdata('loket'));
			$lastantrian=$this->users_model->getLastAntrianAdmisi($this->session->userdata('loket'));
			$jadwal=array();
			
            $data = array(
				'contentTitle' => 'Home', 
				'rj' => $rj, 
				'gd' => $gd, 
				'ri' => $ri,
				'lastantrean'=>$lastantrian,
				'jadwal'=>$jadwal,
				'loket'=>$this->users_model->getLoket()
			);
            $view = array(
                'header' => $this->load->view('template/header', '', true),
                'nav_sidebar' => $this->load->view('template/nav_sidebar', array(), true),
                'content' => $this->load->view('rekammedis/index', $data, true),
                'index_menu'=>0,
				'lib'=>array(
					'javascript/admisi.js',
					'javascript/antrian.js',
				)
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
	function panggilantrean(){
        $loket=$this->input->get('loket');
        $jns=$this->input->get('jns');
        $nomor=$this->input->get('nomor');
        $kodebooking=$this->input->get('kodebooking');
		
		if(empty($this->session->userdata('loket'))){
			$response=array('status'=>false,'message'=>'Loket Pemanggil Belum Dipilih, Untuk mengaktifkan loket pemanggil pilih loket pemanggil kemudian klik tanda panah sebelah kanan loket pemanggil');
		}else{
			$data=$this->db->select("*,a.idx as idx_antrian")
				->where("kodebooking",$kodebooking)
				->join("ruang b","b.kode_jkn=kodepoli")
				->get("jkn_antrian a")
				->row();
			if(empty($data)){
				$response=array('status'=>false,'message'=>'Antrian Habis');
			}else{
				$update=array('statusadmisi'=>1);
				$this->db->where('idx',$data->idx_antrian);
				$this->db->update('jkn_antrian',$update);
				// Kirim antrian panggil
				$booking=array(
					'kodebooking'=>$kodebooking,
					'loketpemanggil'=>$this->session->userdata('loket'),
					'status'	=>1
				);
				$this->db->insert("jkn_panggil",$booking);
				$response=array('status'=>true,'message'=>'Memanggil...','nomorantrean'=>$data->angkaantreanadmisi);
			}
		}
		
        header('Content-Type: application/json');
        echo json_encode($response);
    }

	function lastantrean($loket,$jns=1,$curent=""){
        $lastantrean=$this->users_model->getLastAntrianAdmisi($loket,$jns,$curent);
        $response=array(
            'status'    => true,
            'data'      => $lastantrean,
            'sekarang'  => date('Y-m-d H:i:s'),
            'message'   => "OK"
        );
		header('Content-Type: application/json');
        echo json_encode($response);
    }
	function nextantrean($loket,$jns=1,$curent=""){
        $lastantrean=$this->users_model->getNextAntrianAdmisi($loket,$jns,$curent);
        $response=array(
            'status'    => true,
            'data'      => $lastantrean,
            'sekarang'  => date('Y-m-d H:i:s'),
            'message'   => "OK"
        );
		header('Content-Type: application/json');
        echo json_encode($response);
    }

	function listantrean($dj,$jns=1){
        $ses_state = $this->users_model->cek_session_id();
        if ($ses_state) {
            $lastantrean=$this->Layanan_model->getListAntrean($this->session->userdata('kdlokasi'),$dj,$jns);
            $response=array(
                'status'    => true,
                'data'      => $lastantrean,
                'sekarang'  => date('Y-m-d H:i:s'),
                'message'   => "OK"
            );
        }else{
            $response=array(
                'status'    => false,
                'message'   => "Session Expired"
            );
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

	function skipantrian(){
        $data=array('jnsantrianadmisi'=>3);
        $this->db->where('kodebooking',$this->input->post('kodebooking'));
        $this->db->update('jkn_antrian',$data);
        $response=array('status'=>true,'message'=>'OK');
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
	function pilihloket(){
		$this->session->set_userdata('loket',$this->input->post("loket"));
		$this->session->set_userdata('loketnama',$this->input->post("loketnama"));
		$response=array('status'=>true);
		echo json_encode($response);
	}
}
