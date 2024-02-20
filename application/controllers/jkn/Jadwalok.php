<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Jadwalok extends CI_Controller{
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
		$data=array(
            'contentTitle'=>'Jadwal Operasi',
			'poli'=>$this->jkn_model->getPoly()
        );
        $view=array(
            'header'=>$this->load->view('template/header', '', true),
            'nav_sidebar'=>$this->load->view('template/nav_sidebar', array(), true),
            'content'=>$this->load->view('jkn/jadwalok', $data, true),
            'index_menu'=>9,
            'lib'=>array(
                'javascript/jadwalok.js'
            )
        );
        $this->load->view('template/theme', $view);
	}
	function datajadwal(){
		$awal=$this->input->get("tglawal");
		$akhir=$this->input->get("tglakhir");
		// $tanggal=empty($tgl)?date('Y-m-d'):$tgl;
		$data=$this->jkn_model->getJadwalOk($awal,$akhir);
		if(empty($data)){
			$response=json_encode(array(
				'metadata'=>array(
					'code'=>202,
					'message'=>'Belum Ada Jadwal Operasi'
				),
			));
		}else{
			$response=json_encode(array(
				'metadata'=>array(
					'code'=>200,
					'message'=>'OK'
				),
				'response'=>$data
			));
		}
		header('Content-Type: application/json');
        echo $response;
	}
	function ubahjadwal($idx){
		$data=$this->jkn_model->getJadwalOkByID($idx);
		if(empty($data)){
			$response=json_encode(array(
				'metadata'=>array(
					'code'=>202,
					'message'=>'Belum Ada Jadwal Operasi'
				),
			));
		}else{
			$response=json_encode(array(
				'metadata'=>array(
					'code'=>200,
					'message'=>'OK'
				),
				'response'=>$data
			));
		}
		header('Content-Type: application/json');
        echo $response;
	}
	function hapus($idx){
		$data=$this->jkn_model->hapusJadwalOk($idx);
		if(empty($data)){
			$response=json_encode(array(
				'metadata'=>array(
					'code'=>202,
					'message'=>'Belum Ada Jadwal Operasi'
				),
			));
		}else{
			$response=json_encode(array(
				'metadata'=>array(
					'code'=>200,
					'message'=>'OK'
				),
				'response'=>$data
			));
		}
		header('Content-Type: application/json');
        echo $response;
	}
	function pasien(){
		$keyword=$this->input->get('param');
		$data=$this->db->select("*,a.idx as idx_pendaftaran")
		->like("nobpjs",$keyword)
		->or_like("nomr_pasien",$keyword)
		->or_like("nama_pasien",$keyword)
		->or_like("reg_unit",$keyword)
		->or_like("nama_poli",$keyword)
		->join("ruang b","id_poli=b.idx")
		->get("pendaftaran a")
		->result();
		header('Content-Type: application/json');
        echo json_encode($data);
	}
	function simpanjadwal(){
		$sekarang=date('Y-m-d H:i:s');
		$lastupdate=strtotime($sekarang)*1000;
		$data=array(
			'idx_pendaftaran'=>$this->input->post('idx_pendaftaran'),
			'nopeserta'=>$this->input->post('nopeserta'),
			'kodebooking'=>$this->jkn_model->getKodeBooking(),
			'tanggaloperasi'=>$this->input->post('tanggaloperasi'),
			'jenistindakan'=>$this->input->post('jenistindakan'),
			'kodepoli'=>$this->input->post('kodepoli'),
			'namapoli'=>$this->input->post('namapoli'),
			'lastupdate'=>$lastupdate,
		);
		$idx=$this->input->post('idx');
		if(empty($idx)){
			$sekarang=date('Y-m-d H:i:s');
			$lastupdate=strtotime($sekarang)*1000;
			$data=array(
				'idx_pendaftaran'=>$this->input->post('idx_pendaftaran'),
				'nopeserta'=>$this->input->post('nopeserta'),
				'kodebooking'=>$this->jkn_model->getKodeBooking(),
				'tanggaloperasi'=>$this->input->post('tanggaloperasi'),
				'jenistindakan'=>$this->input->post('jenistindakan'),
				'kodepoli'=>$this->input->post('kodepoli'),
				'namapoli'=>$this->input->post('namapoli'),
				'lastupdate'=>$lastupdate,
			);
			$this->db->insert("jkn_jadwaloperasi",$data);
			$response=array('status'=>true,'message'=>"Berhasil menambahkan Jadwal Operasi");
		}else{
			$sekarang=date('Y-m-d H:i:s');
			$lastupdate=strtotime($sekarang)*1000;
			$data=array(
				'tanggaloperasi'=>$this->input->post('tanggaloperasi'),
				'jenistindakan'=>$this->input->post('jenistindakan'),
				'lastupdate'=>$lastupdate,
			);
			$this->db->where("idx",$idx)->update("jkn_jadwaloperasi",$data);
			$response=array('status'=>true,'message'=>"Berhasil Menupdate Jadwal Operasi");
		}
		header('Content-Type: application/json');
        echo json_encode($response);
	}
	function ubahstatus($idx,$st){
		$stat=array("terlaksana"=>$st);
		$this->db->where("idx",$idx)->update("jkn_jadwaloperasi",$stat);
		$response=array("status"=>true);
		header('Content-Type: application/json');
        echo json_encode($response);
	}
}
