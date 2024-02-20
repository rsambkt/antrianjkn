<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Antrean extends CI_Controller {
	function __construct()
    {
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
    function batalantrean(){
        $request=array(
            'kodebooking'=>$this->input->post('kodebooking'),
            'keterangan'=>$this->input->post('keterangan')
        );
        $response=bridgingbpjs("antrean/batal","POST",json_encode($request),'antrian');
        header('Content-Type: application/json');
        echo $response;
    }
    function listtask($kodebooking){
        $request=array(
            "kodebooking"=>$kodebooking
        );
        $response=bridgingbpjs("antrean/getlisttask","POST",json_encode($request),'antrian');
        header('Content-Type: application/json');
        echo $response;
    }
    function tanggal($tgl=""){
        $tanggal = empty($tgl) ? date('Y-m-d') : $tgl;
        $response=bridgingbpjs("antrean/pendaftaran/tanggal/".$tanggal,'GET','','antrian');
        header('Content-Type: application/json');
        echo $response;
    }
    function kodebooking($kodebooking=""){
        // $tanggal = empty($tgl) ? date('Y-m-d') : $tgl;
        $response=bridgingbpjs("antrean/pendaftaran/kodebooking/".$kodebooking,'GET','','antrian');
        header('Content-Type: application/json');
        echo $response;
    }
    function index($tipe=""){
        if($tipe=="detail"){
            $kodepoli=$this->input->get('kodepoli');
            $kodedokter=$this->input->get('kodedokter');
            $hari=$this->input->get('hari');
            $jampraktek=$this->input->get('jampraktek');
            $response=bridgingbpjs("antrean/pendaftaran/kodepoli/".$kodepoli."/kodedokter/".$kodedokter."/hari/".$hari."/jampraktek/".$jampraktek,'GET','','antrian');
            header('Content-Type: application/json');
            echo $response;
        }else{
            // $response=bridgingbpjs("antrean/pendaftaran/tanggal/");
            // $tanggal=date('Y-m-d');
            // $response=bridgingbpjs("antrean/pendaftaran/tanggal/".$tanggal,'GET','','antrian');
            // $arr=json_decode($response);
            // $data=array() $arr;
			$arr=array();
			$data=array(
				'contentTitle'=>'Pembatalan Booking',
			);
			$view=array(
				'header'=>$this->load->view('template/header', '', true),
				'nav_sidebar'=>$this->load->view('template/nav_sidebar', array(), true),
				'content'=>$this->load->view('jkn/antreanindex', $arr, true),
				'index_menu'=>9,
				'lib'=>array(
					'javascript/task.js'
				)
			);
			$this->load->view('template/theme', $view);

            // $data=array(
            //     'isi'=>$this->load->view('jkn/antreanindex',$arr,true),
            //     'idx'=>4
            // );
            // $data=array(
            //     'libjs'=>array('js/app/task.js'),
            //     'content'=> $this->load->view('admin/menu',$data,true)
            // );
            // $this->load->view('public/layout',$data);
        }
    }

	function dataantrian(){
		$tanggal=$this->input->get('tanggal');
		if(empty($tanggal)) $tanggal=date('Y-m-d');
        $response=bridgingbpjs("antrean/pendaftaran/tanggal/".$tanggal,'GET','','antrian');
		header('Content-Type: application/json');
        echo $response;
	}
	
    /**
     * Proses pengambilan antrian
     */
    function rujukan($nokartu){
        
    }
}
