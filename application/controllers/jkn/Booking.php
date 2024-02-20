<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Booking extends CI_Controller{
    function __construct(){
        parent::__construct();
        $this->load->model('jkn_model');
        $this->load->model('users_model');
        $this->load->helper('lz');
        $ses_state = $this->users_model->cek_session_id();
        if(!$ses_state){  
            $metadata=array(
                'code'=>201,
                'message'=>'Anda Belum Login Atau Session Expired'
            );
            $response=array(
                'metadata'=>$metadata
            );
            header('Content-Type: application/json');
            echo json_encode($response);
            exit;
        }
    }
    function index(){
        // $z = setNav("nav_6");
        $data=array(
            'contentTitle'=>'Pembatalan Booking',
        );
        $view=array(
            'header'=>$this->load->view('template/header', '', true),
            'nav_sidebar'=>$this->load->view('template/nav_sidebar', array(), true),
            'content'=>$this->load->view('jkn/booking', $data, true),
            'index_menu'=>9,
            'libjs'=>array(
                'js/jkn.js'
            )
        );
        $this->load->view('template/theme', $view);
    }
	function listbooking(){
		$tgl=date('Y-m-d');
		$response=bridgingbpjs("antrean/pendaftaran/tanggal/".$tgl,"GET","","antrian");
		header('Content-Type: application/json');
        echo $response;
	}
	function batal($kodebooking){
		$request=array(
			'kodebooking'=>$kodebooking,
			'keterangan'=>"Data testing"
		);
		$response=bridgingbpjs("antrean/batal","POST",json_encode($request),"antrian");
		header('Content-Type: application/json');
        echo $response;
	}
	function updatetask($kodebooking,$taskid,$idx_pendaftaran=""){
		$response = $this->jkn_model->updatetask($kodebooking,$taskid,$idx_pendaftaran);
		header('Content-Type: application/json');
        echo $response;
	}
	function antreanfarmasi(){
		$req=array(
			"kodebooking"=>$this->input->post("kodebooking"),
			"taskaktif"=>$this->input->post("taskaktif"),
			"jenisresep"=>$this->input->post("jenisresep"),
			"idx_pendaftaran"=>$this->input->post("idx_pendaftaran")
		);
		$response = $this->jkn_model->bookingFarmasi($req);
		header('Content-Type: application/json');
        echo $response;
	}
	function cekkode($nik){
		$booking=$this->jkn_model->cekBooking($nik);
		if(empty($booking)){
			$response=array(
				'metadata'=>array(
					'code'=>203,
					'message'=>'Pasien Belum Mengambil Antrian'
				)
			);
		}else{
			// $response=array(
			// 	'metadata'=>array(
			// 		'code'=>200,
			// 		'message'=>'OK'
			// 	),
			// 	'response'=>$booking
			// );
			// echo $booking->kodebooking; exit;
			$res=$this->jkn_model->updatetask($booking->kodebooking,"2");
			$response=json_decode($res);
		}
		header('Content-Type: application/json');
        echo json_encode($response);
	}
}
