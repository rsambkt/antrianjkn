<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Welcome extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
		$this->load->model('users_model');
	}

	public function index()
	{
		$data = array(
			'modul'	=> $this->users_model->getModul()
		);
		$this->load->view('template/login', $data);
	}
	function logout(){
		$this->session->sess_destroy();
        $this->session->unset_userdata('userid');
        redirect(base_url());
	}
	function cek()
	{
		$modulid = $this->input->post('modulid');
		$userd = $this->input->post('userID');
		$password = $this->input->post('password');
		$response = $this->users_model->cekUser($modulid, $userd, $password);
		$users = $response["users"];
		if (!empty($users)) {
			$sid = session_id();
			$last_login = date('Y-m-d H:i:s');
			$this->users_model->update_login_info($userd, $sid, $last_login);
			$data = array(
				'userid'	=> $userd,
				'level'     => $users->levelid,
				'modul'     => $modulid,
				'nama'  	=> $users->pgwNama
			);
			$this->session->set_userdata($data);
		}
		header('Content-Type: application/json');
		echo json_encode($response);
	}

	function hakakses($modul="",$level="",$select="",$ruang=""){ 

        $menu=$this->users_model->getMenu($modul,$level,$ruang);
        $res=array( 
            'menu'=>$menu,
            'select' => $select
        );
        header('Content-Type: application/json');
        echo json_encode($res); 

    }
}
