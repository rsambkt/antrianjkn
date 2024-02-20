<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Display extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->model("Display_model");
	}
    function index(){
        
		$data=array();
		$x['content']		= $this->load->view('view_content_all',$data,true);
		$this->load->view('view_display',$x);
    }

	function admisi()
    {
      	// $lastantrean=$this->Layanan_model->getAntreanPanggil($this->session->userdata('kdlokasi'));
      	// if(!empty($lastantrean)) $dj= $lastantrean->dokterJaga; else $dj=0;
      	// $jadwal=$this->Layanan_model->getJadwal($this->session->userdata('kdlokasi'),$dj);
		$panggil=$this->db->join('jkn_antrian b','a.kodebooking=b.kodebooking')
		->order_by("a.idx","DESC")
		->get("jkn_panggil a")->row();
		$data = array(
			'contentTitle' => 'Antrean Admisi',
			'loketpemanggil' => $this->session->userdata('loket'),
			'panggil'=>$panggil,
			'jenisdisplay'=>'Admisi'
		);
		$x['content']		= $this->load->view('display_antrean',$data,true);
		$x['title']="Antrian Admisi";
		$this->load->view('view_display',$x);
    }
	function farmasi()
    {
      	// $lastantrean=$this->Layanan_model->getAntreanPanggil($this->session->userdata('kdlokasi'));
      	// if(!empty($lastantrean)) $dj= $lastantrean->dokterJaga; else $dj=0;
      	// $jadwal=$this->Layanan_model->getJadwal($this->session->userdata('kdlokasi'),$dj);
		$panggil=$this->db->join('jkn_antrian b','a.kodebooking=b.kodebooking')
		->order_by("a.idx","DESC")
		->get("jkn_panggil a")->row();
		$data = array(
			'contentTitle' => 'Antrean Farmasi',
			'loketpemanggil' => 1,
			'panggil'=>$panggil,
			'jenisdisplay'=>'Farmasi'
		);
		$x['content']		= $this->load->view('display_antrean',$data,true);
		$x['title']="Antrian Farmasi";
		$this->load->view('view_display',$x);
    }
	function poli()
    {
      	// $lastantrean=$this->Layanan_model->getAntreanPanggil($this->session->userdata('kdlokasi'));
      	// if(!empty($lastantrean)) $dj= $lastantrean->dokterJaga; else $dj=0;
      	// $jadwal=$this->Layanan_model->getJadwal($this->session->userdata('kdlokasi'),$dj);
		$display=$this->input->get("display");
		$panggil=$this->db->join('jkn_antrian b','a.kodebooking=b.kodebooking')
		->where("displayid",$display)
		->order_by("a.idx","DESC")
		->get("jkn_panggil a")->row();
		$poli='';
		$p=$this->db->where("kode_jkn",$poli)->get("ruang")->row();
		if(!empty($p)) $namapoli=$p->ruang; else $namapoli="";
		$data = array(
			'contentTitle' => 'Antrean Poliklinik ',
			'loketpemanggil' => $this->session->userdata('loket'),
			'panggil'=>$panggil,
			'kodepoli'=>$poli,
			'display'=>$display,
			'jenisdisplay'=>'Poli'
		);
		$x['content']		= $this->load->view('display_antrean',$data,true);
		$x['title']="Antrian Poliklinik ".$namapoli;
		$this->load->view('view_display',$x);
    }
	function getantrean(){
		$jenisdisplay=$this->input->get("jenisdisplay");
		if($jenisdisplay=="Admisi" || $jenisdisplay=="Farmasi"){
			$panggil=$this->db->select("*")
			->join('jkn_antrian b','a.kodebooking=b.kodebooking')
			->where("a.jenisdisplay",$jenisdisplay)
			->where("b.tanggalperiksa",date('Y-m-d'))
			->order_by("a.idx","DESC")
			->get("jkn_panggil a")->row();
		}else{
			$display=$this->input->get("display");
			$panggil=$this->db->select("*")
			->join('jkn_antrian b','a.kodebooking=b.kodebooking')
			->where("a.jenisdisplay",$jenisdisplay)
			->where("b.tanggalperiksa",date('Y-m-d'))
			->where("a.displayid",$display)
			->order_by("a.idx","DESC")
			->get("jkn_panggil a")->row();
		}
		
		
		if(!empty($panggil)){
			$response=array(
				'status'=>true,
				'message'=>'OK',
				'jenisdisplay'=>$jenisdisplay,
				'panggil'=>$panggil
			);
		}else{
			$response=array(
				'status'=>false,
				'message'=>'Tidak Antrean Yang Sedang Memanggil',
				'jenisdisplay'=>$jenisdisplay,
				'panggil'=>$panggil,
				'waktupanggil'=>date('Y-m-d H:i:s')
			);
		}
		header('Content-Type: application/json');
		echo json_encode($response);
	}
	function hapusantrean(){
		$kodebooking=$this->input->get("kodebooking");
		$this->db->where("kodebooking",$kodebooking)->delete("jkn_panggil");
		$response=array(
			'status'=>true,
			'message'=>'OK',
		);
	}
    function ruanganall(){
		$data=$this->Display_model->getMonitoringAll();
		header('Content-Type: application/json');
		echo json_encode($data);
	}
	function kamar(){
		$data=$this->Display_model->getKamar();
		header('Content-Type: application/json');
		echo json_encode($data);
	}
	
}
