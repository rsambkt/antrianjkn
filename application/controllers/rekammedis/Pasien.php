<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Pasien extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('users_model');
        $this->load->model('pasien_model');
        $this->load->model('jkn_model');
        $this->load->helper('ajaxdata');
        $this->load->helper('bridging');
    }
    function index()
    {
        if ($this->session->userdata('modul')==2) {
            $config = array(
                'url'           => 'rekammedis/pasien/datapasien',
                'variable'      => array('nomr' => 'nomr', 'tempat_lahir' => 'tempat_lahir', 'tgl_lahir' => 'tgl_lahir'),
                'field'         => array('nomr', 'nik', 'nobpjs', 'nama', 'jns_kelamin', '{{tempat_lahir}} / {{tgl_lahir}}',  'alamat'),
                'function'      => 'getPasien',
                'keyword_id'    => 'q',
                'param_id'      => 'param',
                'limit_id'      => 'limit',
                'data_id'       => 'datapasien',
                'page_id'       => 'pagination',
                'number'        => true,
                'action'        => true,
                'load'          => true,
                'action_button' => "<a href='" . base_url() . "rekammedis/pasien/registrasi/{{nomr}}" . "' class='btn btn-default btn-sm'><span class='fa fa-user'></span> Registrasi Pasien</a>",
            );
            $data = array('contentTitle' => 'Pasien', 'config' => $config);
            $view = array(
                'header' => $this->load->view('template/header', '', true),
                'nav_sidebar' => $this->load->view('template/nav_sidebar', array(), true),
                'content' => $this->load->view('rekammedis/pasien/index', $data, true),
                'index_menu'=>2,
                'ajaxdata'  => getData($config)
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

    function datapasien()
    {
        if ($this->session->userdata('modul')==2) {
            $keyword = urldecode($this->input->get('keyword', TRUE));
            $start = intval($this->input->get('start'));
            $limit = intval($this->input->get('limit'));
            $param = urldecode($this->input->get('param', TRUE));
            $mulai = ($start * $limit) - $limit;
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'start'     => $mulai,
                'row_count' => $this->pasien_model->countPasien($keyword, $param),
                'limit'     => $limit,
                'data'      => $this->pasien_model->getPasien($limit, $mulai, $keyword, $param),
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function registrasi($nomr)
    {
        if ($this->session->userdata('modul')==2) {
            $pasien = $this->pasien_model->getPasienBynomr($nomr);
            if (!empty($pasien)) {
                
                $ruang=$this->pasien_model->getRuang();
                if(count($ruang)==1) $dokter=$this->pasien_model->getDokter($ruang[0]->idx); else $dokter=array();
				$kodebooking=$this->input->get("kodebooking");
				if(empty($kodebooking)) $booking=$this->pasien_model->getBooking($pasien->nomr,$pasien->nik,$pasien->nobpjs);
				else $booking=$this->pasien_model->getBookingByKode($kodebooking);
				// print_r($booking); exit;
				if(!empty($booking)){
					$dokter=$this->pasien_model->getDokterSubSpesialis($booking->kodepoli);
				}else{
					$dokter=array();
				}
                $data = array(
                    'contentTitle'  => 'Detail Pasien',
                    'row'           => $pasien,
                    'cara_daftar'   => $this->pasien_model->getCaraDaftar(),
                    'jenis_layanan' => $this->pasien_model->getJenisLayanan(),
                    'cara_bayar'    => $this->pasien_model->getCaraBayar(),
                    'agama'         => $this->pasien_model->getAgama(),
                    'suku'          => $this->pasien_model->getSuku(),
                    'bahasa'        => $this->pasien_model->getBahasa(),
                    'pendidikan'        => $this->pasien_model->getPendidikan(),
                    'provinsi'        => $this->pasien_model->getProvinsi(),
                    'pekerjaan'        => $this->pasien_model->getPekerjaan(),
                    'status'        => $this->pasien_model->getStatus(),
                    'kabupaten'        => $this->pasien_model->getKabupaten($pasien->id_provinsi),
                    'kecamatan'        => $this->pasien_model->getKecamatan($pasien->id_kab_kota),
                    'kelurahan'        => $this->pasien_model->getkelurahan($pasien->id_kecamatan),
                    'kabdom'        => $this->pasien_model->getKabupaten($pasien->id_provinsi),
                    'kecdom'        => $this->pasien_model->getKecamatan($pasien->id_kab_kota),
                    'keldom'        => $this->pasien_model->getkelurahan($pasien->id_kecamatan),
                    'negara'        => $this->pasien_model->getNegara(),
                    'kelas'        => $this->pasien_model->getKelas(),
                    'ranap'        => $this->pasien_model->getRanap($nomr),
					'booking'		=>$booking,
                    'ruang'=>$this->pasien_model->getRuang(),
                    'dokter'=>$dokter,
                    'rujukan'       => $this->pasien_model->getRujukan(array('idx <= ' => 6)),
                );
				// print_r($data["booking"]);exit;
                $view = array(
                    'header'        => $this->load->view('template/header', '', true),
                    'nav_sidebar'   => $this->load->view('template/nav_sidebar', array(), true),
                    'content'       => $this->load->view('rekammedis/pasien/detail', $data, true),
                    'ajaxdata'      => '',
                    'index_menu'=>2,
                    'lib'           => array(
                        'javascript/pendaftaran.js',
                    )
                );
                $this->load->view('template/theme', $view);
            } else {
                echo "<script>alert('Ops. Data pasien tidak ditemukan');
                window.location.href = '" . base_url() . "rekammedis/pasien" . "'
                </script>";
            }
        } else {
            $sid = getSessionID();
            $url_login = base_url() . '?sid=' . $sid;
            echo "<script>alert('Ops. Sesi anda telah berubah! Silahkan login kembali');
                window.location.href = '$url_login'
                </script>";
        }
    }
    function bataldaftar($idx){
        if ($this->session->userdata('modul')==2) {
            $data=array('batal'=>1,'userbatal'=>$this->session->userdata('userid'));
            $this->db->where('idx',$idx);
            $this->db->update('pendaftaran',$data);
            $res=array('status'=>true,'message'=>'Pendafatran berhasil dibatalkan');
        }else{
            $res=array('status'=>false,'message'=>'Session expired');
        }
        header('Content-Type: application/json');
        echo json_encode($res);
    }
    function cetakkartu($nomr=""){
        $data=array(
            'row'=>$this->pasien_model->getPasienBynomr($nomr)
        );
        $this->load->view('rekammedis/cetak/cetakkartu',$data);
    }

    function cetakstiker($nomr=""){
        $data=array(
            'row'=>$this->pasien_model->getPasienBynomr($nomr)
        );
        $this->load->view('rekammedis/cetak/cetakstiker',$data);
    }
    function rujukankeluar($noSep){
        if ($this->session->userdata('modul')==2) {
            $data=$this->pasien_model->getRujukanBySep($noSep);
            if(!empty($data)){
                $response=array(
                    'status'=>true,
                    'message'=>'Ok',
                    'data'=> $data
                );
            }else{
                $response=array(
                    'status'=>false,
                    'message'=>'Rujukan Tidak ada'
                );
            }
            
        }
        else {
            $response=array(
                'status'=>false,
                'message'=>'Session Expired'
            );
        }

        header('Content-Type: application/json');
        echo json_encode($response);

    }
    function tambah(){
        if ($this->session->userdata('modul')==2) {
			$kodebooking=!empty($this->input->get("kodebooking"))?$this->input->get("kodebooking"):"";
			$kodebooking=$this->input->get("kodebooking");
			// echo $kodebooking; exit;
            $data = array(
                'contentTitle'  => 'Daftar Pasien Baru',
                'cara_daftar'   => $this->pasien_model->getCaraDaftar(),
                'jenis_layanan' => $this->pasien_model->getJenisLayanan(),
                'cara_bayar'    => $this->pasien_model->getCaraBayar(),
                'agama'         => $this->pasien_model->getAgama(),
                'suku'          => $this->pasien_model->getSuku(),
                'bahasa'        => $this->pasien_model->getBahasa(),
                'provinsi'        => $this->pasien_model->getProvinsi(),
                'pendidikan'        => $this->pasien_model->getPendidikan(),
                'pekerjaan'        => $this->pasien_model->getPekerjaan(),
                'status'        => $this->pasien_model->getStatus(),
                'negara'        => $this->pasien_model->getNegara(),
                'kabupaten'        => array(),
                'kecamatan'        => array(),
                'kelurahan'        => array(),
                'rujukan'       => $this->pasien_model->getRujukan(array('idx <= ' => 6)),
				'booking'		=> $this->pasien_model->getBookingByKode($kodebooking)
            );
            $view = array(
                'header'        => $this->load->view('template/header', '', true),
                'nav_sidebar'   => $this->load->view('template/nav_sidebar', array(), true),
                'content'       => $this->load->view('rekammedis/pasien/tambah', $data, true),
                'lib'           => array('javascript/pendaftaran.js','javascript/jkn.js'),
                'index_menu'=>2,
            );
            $this->load->view('template/theme', $view);
        } else {
            echo "<script>alert('Ops. Data pasien tidak ditemukan');
            window.location.href = '" . base_url() . "rekammedis/pasien" . "'
            </script>";
        }
    }
    function datariwayat($nomr)
    {
        
        if ($this->session->userdata('modul')==2) {
            $keyword = urldecode($this->input->get('keyword', TRUE));
            $start = intval($this->input->get('start'));
            $limit = intval($this->input->get('limit'));
            $param = urldecode($this->input->get('param', TRUE));
            $mulai = ($start * $limit) - $limit;
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'start'     => $mulai,
                'row_count' => $this->pasien_model->countRiwayat($nomr, $keyword, $param),
                'limit'     => $limit,
                'data'      => $this->pasien_model->getRiwayat($nomr, $limit, $mulai, $keyword, $param),
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function carabayar($idx)
    {
        
        if ($this->session->userdata('modul')==2) {
            $response = array('status' => true, 'data' => $this->pasien_model->getCaraBayar(array('idx' => $idx)));
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function caripasien($nomr)
    {
        if ($this->session->userdata('modul')==2) {
            $pasien=$this->pasien_model->getPasienByNomr($nomr);
            if(!empty($pasien)) $response = json_encode(array('status' => true, 'terdaftar'=>1,'data' => $pasien));
            else{
                // echo SIMRS_ARCHIVE_API."v1/pasien/".$nomr; exit;
                $res=bacadblama(SIMRS_ARCHIVE_API."v1/pasien/".$nomr);
                // echo $res; exit;
                $arr=json_decode($res);
                if(!empty($arr->data[0])) $response = json_encode(array('status' => true, 'terdaftar'=>0,'data' => $arr->data[0]));
                else $response = json_encode(array('status' => false, 'terdaftar'=>0,'apilink'=>SIMRS_ARCHIVE_API."v1/pasien/".$nomr,'data'=>$arr->data));
                $res=bacadblama(SIMRS_ARCHIVE_API."v1/pasien/".$nomr);
                $arr=json_decode($res);
                if(!empty($arr->data[0])) $response = json_encode(array('status' => true, 'terdaftar'=>0,'data' => $arr->data[0]));
                else $response = json_encode(array('status' => false, 'terdaftar'=>0));
            }
        } else {
            $response = json_encode(array('status' => false, 'message' => 'Session Expired'));
        }
        header('Content-Type: application/json');
        echo $response;
    }
    function rujukan()
    {
        
        if ($this->session->userdata('modul')==2) {
            $rujukan = $this->pasien_model->getRujukan(array('aktif' => 1));
            $response = array('status' => true, 'data' => $rujukan);
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function pilihrujukan($id){
        if ($this->session->userdata('modul')==2) {
            $rujukan = $this->pasien_model->pilihRujukan($id);
            $response = array('status' => true, 'data' => $rujukan);
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function dokter($poli,$jns_layanan=2){
        if ($this->session->userdata('modul')==2) {
            $rujukan = $this->pasien_model->getDokter($poli,$jns_layanan);
            $poliklinik=$this->pasien_model->gtetPolyById($poli);
            $response = array('status' => true, 'data' => $rujukan,'poliklinik'=>$poliklinik);
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
	function jadwal($poli="",$dokter=""){
		if ($this->session->userdata('modul')==2) {
            $jadwal=$this->pasien_model->getJadwalDokter($poli,$dokter);
			if(empty($jadwal)){
				$response=array('status'=>false,'message'=>"jadwal Dokter Tidak Ditemukan");
			}else{
				$response = array('status' => true,'jadwal'=>$jadwal);
			}
            
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
	}
    function daftar_pasien_baru(){
        if ($this->session->userdata('modul')==2) {
            if($_SERVER['REQUEST_METHOD'] == "POST"){
                if(
                    isset($_POST['idx']) &&
                    isset($_POST['nomr']) &&
                    isset($_POST['nik']) &&
                    isset($_POST['nama']) &&
                    isset($_POST['tempat_lahir']) &&
                    isset($_POST['tgl_lahir'])
                    // isset($_POST['jns_kelamin']) &&
                    // isset($_POST['pekerjaan']) &&
                    // isset($_POST['agama']) &&
                    // isset($_POST['no_telpon']) &&
                    // isset($_POST['kewarganegaraan']) &&
                    // isset($_POST['nama_negara']) &&
                    // isset($_POST['nama_provinsi']) &&
                    // isset($_POST['nama_kab_kota']) &&
                    // isset($_POST['nama_kecamatan']) &&
                    // isset($_POST['nama_kelurahan']) &&
                    // isset($_POST['alamat']) &&
                    // isset($_POST['penanggung_jawab']) &&
                    // isset($_POST['no_penanggung_jawab']) &&
                    // isset($_POST['nobpjs'])
                ){
                    $this->load->library('form_validation');
                    $kwn=$this->input->post('kewarganegaraan');
                    if($kwn=="WNI") $wilayah='trim'; else $wilayah='trim';
                    $config = array(
                        
                        array(
                            'field' => 'nama',
                            'label' => 'Nama Pasien',
                            'rules' => 'trims'
                        ),
                        array(
                            'field' => 'nama',
                            'label' => 'Nama Pasien',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'tempat_lahir',
                            'label' => 'Tempat Lahir',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'tgl_lahir',
                            'label' => 'Tanggal Lahir',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'no_hp',
                            'label' => 'No HP',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'nama_ibu_kandung',
                            'label' => 'Nama Ibu Kandung',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'kewarganegaraan',
                            'label' => 'Kewarga negaraan',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'id_provinsi',
                            'label' => 'Provinsi',
                            'rules' => $wilayah
                        ),
                        array(
                            'field' => 'id_kab_kota',
                            'label' => 'Kab / Kota',
                            'rules' => $wilayah
                        ),
                        array(
                            'field' => 'id_kecamatan',
                            'label' => 'Kecamatan',
                            'rules' => $wilayah
                        ),
                        array(
                            'field' => 'id_kelurahan',
                            'label' => 'Kelurahan',
                            'rules' => $wilayah
                        ),
                        array(
                            'field' => 'alamat',
                            'label' => 'Alamat',
                            'rules' => $wilayah
                        ),
                        array(
                            'field' => 'rt',
                            'label' => 'RT',
                            'rules' => $wilayah
                        ),
                        array(
                            'field' => 'rw',
                            'label' => 'RW',
                            'rules' => $wilayah
                        ),
                        array(
                            'field' => 'kodepos',
                            'label' => 'Kode Pos',
                            'rules' => $wilayah
                        ),
                        array(
                            'field' => 'id_provinsi_domisili',
                            'label' => 'Provinsi Domisili',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'id_kab_kota_domisili',
                            'label' => 'Kab / Kota Domisili',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'id_kecamatan_domisili',
                            'label' => 'Kecamatan Domisili',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'id_kelurahan_domisili',
                            'label' => 'Kelurahan Domisili',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'alamat_domisili',
                            'label' => 'Alamat Domisili',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'rt_domisili',
                            'label' => 'RT Domisili',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'rw_domisili',
                            'label' => 'RW Domisili',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'kodepos_domisili',
                            'label' => 'Kode Pos Domisili',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'penanggung_jawab',
                            'label' => 'Penanggung Jawab ',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'umur_pj',
                            'label' => 'Umur Penanggung jawab Jawab',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'pekerjaan_pj',
                            'label' => 'Pekerjaan Penanggung Jawab',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'alamat_pj',
                            'label' => 'Alamat Penanggung Jawab',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'no_penanggung_jawab',
                            'label' => 'Nomor Penanggung Jawab',
                            'rules' => 'trim'
                        ),
                        array(
                            'field' => 'hub_keluarga',
                            'label' => 'hubungan keluarga',
                            'rules' => 'trim'
                        ),
                    );
                    $this->form_validation->set_rules($config);
                    $this->form_validation->set_message('required', '%s Tidak Boleh Kosong');
                    if ($this->form_validation->run() == FALSE)
                    {
                        $response['code'] = 203;
                        $response['message'] = "Ops. Data Belum Lengkap.";
                        $response['error']=array(
                            'nama'=>form_error('nama'),
                            'tempat_lahir'=>form_error('tempat_lahir'),
                            'tgl_lahir'=>form_error('tgl_lahir'),
                            'no_hp'=>form_error('no_hp'),
                            'nama_ibu_kandung'=>form_error('nama_ibu_kandung'),
                            'kewarganegaraan'=>form_error('kewarganegaraan'),
                            'nama_negara'=>form_error('nama_negara'),
                            'nama_provinsi'=>form_error('id_provinsi'),
                            'nama_kab_kota'=>form_error('id_kab_kota'),
                            'nama_kecamatan'=>form_error('id_kecamatan'),
                            'nama_kelurahan'=>form_error('id_kelurahan'),
                            'alamat'=>form_error('alamat'),
                            'rt'=>form_error('rt'),
                            'rw'=>form_error('rw'),
                            'kodepos'=>form_error('kodepos'),
                            'nama_provinsi_domisili'=>form_error('id_provinsi_domisili'),
                            'nama_kab_kota_domisili'=>form_error('id_kab_kota_domisili'),
                            'nama_kecamatan_domisili'=>form_error('id_kecamatan_domisili'),
                            'nama_kelurahan_domisili'=>form_error('id_kelurahan_domisili'),
                            'alamat_domisili'=>form_error('alamat_domisili'),
                            'rt_domisili'=>form_error('rt_domisili'),
                            'rw_domisili'=>form_error('rw_domisili'),
                            'kodepos_domisili'=>form_error('kodepos_domisili'), 
                            'penanggung_jawab'=>form_error('penanggung_jawab'), 
                            'umur_pj'=>form_error('umur_pj'), 
                            'pekerjaan_pj'=>form_error('pekerjaan_pj'), 
                            'alamat_pj'=>form_error('alamat_pj'),  
                            'no_penanggung_jawab'=>form_error('no_penanggung_jawab'),  
                            'hub_keluarga'=>form_error('hub_keluarga'),  
                        );
                    }else{
                        $hambatan=$this->input->post('hambatan_bahasa',TRUE);
                        if($hambatan!=1) $hambatan=2;
                        $params['idx'] = trim($this->input->post('idx',TRUE));
                        $params['nik'] = trim($this->input->post('nik',TRUE));
                        $params['nama'] = trim($this->input->post('nama',TRUE));
                        $params['tempat_lahir'] = trim($this->input->post('tempat_lahir',TRUE));
                        $params['tgl_lahir'] = setDateEng($this->input->post('tgl_lahir',TRUE));
                        $params['jns_kelamin'] = trim($this->input->post('jns_kelamin',TRUE));
                        
                        $params['id_agama'] = trim($this->input->post('id_agama',TRUE));
                        $params['agama'] = trim($this->input->post('agama',TRUE));
                        $params['id_tk_pddkn'] = trim($this->input->post('id_tk_pddkn',TRUE));
                        $params['pendidikan'] = trim($this->input->post('pendidikan',TRUE));
                        
                        $params['id_pekerjaan'] = trim($this->input->post('id_pekerjaan',TRUE));
                        
                        $params['pekerjaan'] = trim($this->input->post('pekerjaan',TRUE));
                        $params['id_status_kawin'] = trim($this->input->post('id_status_kawin',TRUE));
                        $params['status_kawin'] = trim($this->input->post('status_kawin',TRUE));
                        $params['id_etnis'] = trim($this->input->post('id_etnis',TRUE));
                        $params['suku'] = trim($this->input->post('suku',TRUE));
                        $params['id_bahasa'] = trim($this->input->post('id_bahasa',TRUE));
                        $params['bahasa'] = trim($this->input->post('bahasa',TRUE));
                        $params['hambatan_bahasa'] = $hambatan;
                        $params['no_telpon'] = trim($this->input->post('no_telpon',TRUE));
                        $params['no_hp'] = trim($this->input->post('no_hp',TRUE));
                        $params['nama_ibu_kandung'] = trim($this->input->post('nama_ibu_kandung',TRUE));
                        $params['kewarganegaraan'] = trim($this->input->post('kewarganegaraan',TRUE));
                        $nama_negara = trim($this->input->post('nama_negara',TRUE));
                        $params['id_negara'] = trim($this->input->post('id_negara',TRUE));
                        $params['nama_negara'] = ($nama_negara == "") ? "Indonesia" : $nama_negara;
                        
                        $params['id_provinsi'] = trim($this->input->post('id_provinsi',TRUE));
                        $params['nama_provinsi'] = trim($this->input->post('nama_provinsi',TRUE));
                        $params['id_kab_kota'] = trim($this->input->post('id_kab_kota',TRUE));
                        $params['nama_kab_kota'] = trim($this->input->post('nama_kab_kota',TRUE));
                        if($params['id_kab_kota']=='13.75') $params['dalam_kota']=1; else $params['dalam_kota']=0;
                        
                        $params['id_kecamatan'] = trim($this->input->post('id_kecamatan',TRUE));
                        $params['nama_kecamatan'] = trim($this->input->post('nama_kecamatan',TRUE));
                        $params['id_kelurahan'] = trim($this->input->post('id_kelurahan',TRUE));
                        $params['nama_kelurahan'] = trim($this->input->post('nama_kelurahan',TRUE));
                        $params['alamat'] = trim($this->input->post('alamat',TRUE));
                        $params['rt'] = trim($this->input->post('rt',TRUE));
                        $params['rw'] = trim($this->input->post('rw',TRUE));
                        $params['kodepos'] = trim($this->input->post('kodepos',TRUE));
                        $params['id_provinsi_domisili'] = trim($this->input->post('id_provinsi_domisili',TRUE));
                        $params['nama_provinsi_domisili'] = trim($this->input->post('nama_provinsi_domisili',TRUE));
                        $params['id_kab_kota_domisili'] = trim($this->input->post('id_kab_kota_domisili',TRUE));
                        $params['nama_kab_kota_domisili'] = trim($this->input->post('nama_kab_kota_domisili',TRUE));
                        $params['id_kecamatan_domisili'] = trim($this->input->post('id_kecamatan_domisili',TRUE));
                        $params['nama_kecamatan_domisili'] = trim($this->input->post('nama_kecamatan_domisili',TRUE));
                        $params['id_kelurahan_domisili'] = trim($this->input->post('id_kelurahan_domisili',TRUE));
                        $params['nama_kelurahan_domisili'] = trim($this->input->post('nama_kelurahan_domisili',TRUE));
                        $params['alamat_domisili'] = trim($this->input->post('alamat_domisili',TRUE));
                        $params['rt_domisili'] = trim($this->input->post('rt_domisili',TRUE));
                        $params['rw_domisili'] = trim($this->input->post('rw_domisili',TRUE));
                        $params['kodepos_domisili'] = trim($this->input->post('kodepos_domisili',TRUE));
                        $params['penanggung_jawab'] = trim($this->input->post('penanggung_jawab',TRUE));
                        $params['no_penanggung_jawab'] = trim($this->input->post('no_penanggung_jawab',TRUE));
                        $params['umur_pj'] = trim($this->input->post('umur_pj',TRUE));
                        $params['pekerjaan_pj'] = trim($this->input->post('pekerjaan_pj',TRUE));
                        $params['alamat_pj'] = trim($this->input->post('alamat_pj',TRUE));
                        $params['no_penanggung_jawab'] = trim($this->input->post('no_penanggung_jawab',TRUE));
                        $params['hub_keluarga'] = trim($this->input->post('hub_keluarga',TRUE));
                        $params['nobpjs'] = trim($this->input->post('nobpjs',TRUE));
                        $params['id_jenis_peserta'] = trim($this->input->post('id_jenis_peserta',TRUE));
                        $params['jenis_peserta'] = trim($this->input->post('jenis_peserta',TRUE));
                        $params['kodeppk'] = trim($this->input->post('kodeppk',TRUE));
                        $params['namappk'] = trim($this->input->post('namappk',TRUE));
                        $params['status_lengkap']=1;
                        $params['user_created'] = $this->session->userdata('get_uid');
                        $params['session_id'] = getSessionID();
                        if($_POST['idx'] == ""){
                            if($_POST['nomr'] == ''){
                                $nomr=$this->pasien_model->getNomr();
                                //$nomr = getNoMrBaru();
                            }else{
                                $nomr = $this->input->post('nomr',TRUE);
                            }
    
                            $params['nomr'] = $nomr;
                            // $params['nomr'] = $this->pasien_model->getNomr(); 
                            $cekCommand = $this->db->insert('pasien',$params);
                            
                            if($cekCommand){
                                $this->db->from('pasien');
                                $this->db->where('session_id', getSessionID());
                                $this->db->order_by('idx', 'desc');
                                $this->db->limit(1);
                                $cekQuery = $this->db->get(); 
                                if($cekQuery->num_rows() > 0){
                                    // Insert Ke database pendaftaran online
                                    $resPasien = $cekQuery->row_array();
                                    $response['code'] = 200;
                                    $response['message'] = "Simpan data sukses";
                                    $response['nomr'] = $resPasien['nomr']; 
                                }else{
                                    $response['code'] = 202;
                                    $response['message'] = "Simpan data sukses namun cookies telah dihapus. Silahkan cari dan pilih pasien";
                                    $response['nomr'] = null;                                            
                                }
                            }else{
                                $response['code'] = 501;
                                $response['message'] = "Ops. Query error! Silahkan hubungi administrator.";                                            
                            }
                        }else{
                            if($_POST['nomr'] == ''){
                                $nomr=$this->pasien_model->getNomr();
                                //$nomr = getNoMrBaru();
                            }else{
                                $nomr = $this->input->post('nomr',TRUE);
                            }
    
                            $params['nomr'] = $nomr;
    
                            $this->db->where('idx',  $this->input->post('idx',TRUE));
                            $cekCommand = $this->db->update('pasien',$params); 
    
                            if($cekCommand){
                                $response['code'] = 201;
                                $response['message'] = "Update data sukses.";     
                                $response['nomr'] = $nomr;                                            
                            }else{
                                $response['code'] = 501;
                                $response['message'] = "Ops. Query error! Silahkan hubungi administrator.";
                            }
                        }
                    }
                    
                }else{
                    $response['code'] = 401;
                    $response['message'] = "Ops. Variable tidak ditemukan. Coba ulangi kembali.";
                    $response['metod']= "POST";
                }
            }else{
                $response['code'] = 402;
                $response['message'] = "Ops. Method tidak ditemukan. Coba ulangi kembali.";
            }
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function suksesdaftar($id=""){
        if ($this->session->userdata('modul')==2) {
            // $row=$this->pasien_model->getPendaftaran($id);
            $data = array(
                'contentTitle'  => 'Pendaftaran Pasien Sukses',
                'row'           => $this->pasien_model->getPendaftaran($id),
            );
            $view = array(
                'header'        => $this->load->view('template/header', '', true),
                'nav_sidebar'   => $this->load->view('template/nav_sidebar', array(), true),
                'content'       => $this->load->view('rekammedis/pasien/sukses', $data, true),
                'index_menu'=>2,
                'lib'           => array(
                    'javascript/pendaftaran.js',
                    'javascript/jspdf.js',
                    'javascript/cetaksep.js',
                    'javascript/sukses.js'
                )
            );
            $this->load->view('template/theme', $view);
        }else {
            echo "<script>alert('Ops. Data pasien tidak ditemukan');
            window.location.href = '" . base_url() . "rekammedis/pasien" . "'
            </script>";
        }
    }
    function simpan_pendaftaran(){
        if ($this->session->userdata('modul')==2) {
            $cekKunjungan=$this->pasien_model->cekKunjungan($this->input->post('id_poli'),$this->input->post('nomr_pasien'));
            if($cekKunjungan>0){
                $response = array('status' => false, 'message' => 'Pasien sudah terdaftar dipoli yang sama dan hari yang sama');
            }else{
                $mulai=0;
                if($this->input->post('jkn')==1){
                    $id_jenis_peserta=$this->input->post('id_jenis_peserta');
                    $jenis_peserta=$this->input->post('jenis_peserta');
                }else{
                    $id_jenis_peserta=$this->input->post('id_cara_bayar').".1";
                    $jenis_peserta=$this->input->post('carabayar');
                }
                
                $backdate=$this->input->post('backdate');
                if($backdate==1) {
                    $tgllayan=$this->input->post('tgllayan');
                    $t=explode("-",$tgllayan);
                    $sep=$t[0].$t[1];
                    if(empty($this->input->post('id_daftar'))) $id_daftar=$this->pasien_model->createIdDaftar($sep);
                    else $id_daftar=$this->input->post('id_daftar');
                }else{
                    $tgllayan=date('Y-m-d H:i:s');
                    $sep=date('Ym');
                    if(empty($this->input->post('id_daftar'))) $id_daftar=$this->pasien_model->createIdDaftar($sep);
                    else $id_daftar=$this->input->post('id_daftar');
                }
                $data=array(
                    'idx_pasien'=>$this->input->post('idx_pasien'),
                    'nomr'=>$this->input->post('nomr_pasien'),
                    'id_cara_daftar'=>$this->input->post('id_cara_daftar'),
                    'id_daftar'=>$id_daftar,
                    'reg_unit'=>$this->pasien_model->createRegUnit($this->input->post('id_poli'),$sep),
                    'jns_layanan'=>$this->input->post('jns_layanan'),
                    'nomr_pasien'=>$this->input->post('nomr_pasien'),
                    'nama_pasien'=>$this->input->post('nama_pasien'),
                    'pekerjaan'=>$this->input->post('pekerjaan'),
                    'notelp'=>$this->input->post('notelp'),
                    'tgl_lahir'=>$this->input->post('tgl_lahir'),
                    'id_provinsi'=>$this->input->post('id_provinsi'),
                    'id_kab_kota'=>$this->input->post('id_kab_kota'),
                    'id_kecamatan'=>$this->input->post('id_kelurahan'),
                    'id_kelurahan'=>$this->input->post('id_kelurahan'),
                    'provinsi'=>$this->input->post('provinsi'),
                    'kab_kota'=>$this->input->post('kab_kota'),
                    'kecamatan'=>$this->input->post('kecamatan'),
                    'kelurahan'=>$this->input->post('kelurahan'),
                    'alamat'=>$this->input->post('alamat'),
                    'rt'=>$this->input->post('rt'),
                    'rw'=>$this->input->post('rw'),
                    'kodepos'=>$this->input->post('kodepos'),
                    'provinsi_domisili'=>$this->input->post('provinsi_domisili'),
                    'kab_kota_domisili'=>$this->input->post('kab_kota_domisili'),
                    'kecamatan_domisili'=>$this->input->post('kecamatan_domisili'),
                    'kelurahan_domisili'=>$this->input->post('kelurahan_domisili'),
                    'alamat_domisili'=>$this->input->post('alamat_domisili'),
                    'rt_domisili'=>$this->input->post('rt_domisili'),
                    'rw_domisili'=>$this->input->post('rw_domisili'),
                    'id_provinsi_domisili'=>$this->input->post('id_provinsi_domisili'),
                    'id_kab_kota_domisili'=>$this->input->post('id_kab_kota_domisili'),
                    'id_kecamatan_domisili'=>$this->input->post('id_kecamatan_domisili'),
                    'id_kelurahan_domisili'=>$this->input->post('id_kelurahan_domisili'),
                    'alamat_domisili'=>$this->input->post('alamat_domisili'),
                    'rt_domisili'=>$this->input->post('rt_domisili'),
                    'rw_domisili'=>$this->input->post('rw_domisili'),
                    'kodepos_domisili'=>$this->input->post('kodepos_domisili'),
                    'id_cara_bayar'=>$this->input->post('id_cara_bayar'),
                    'carabayar'=>$this->input->post('carabayar'),
                    'id_jenis_peserta'=>$id_jenis_peserta,
                    'jenis_peserta'=>$jenis_peserta,
                    'id_rujuk'=>$this->input->post('id_rujuk'),
                    'rujukan'=>$this->input->post('rujukan'),
                    'id_poli'=>$this->input->post('id_poli'),
                    'nama_poli'=>$this->input->post('nama_poli'),
                    'id_kelas'=>$this->input->post('id_kelas'),
                    'kelas_layanan'=>$this->input->post('kelas_layanan'),
                    'id_dokter'=>$this->input->post('id_dokter'),
                    'nama_dokter'=>$this->input->post('nama_dokter'),
                    'id_poli_asal'=>$this->input->post('id_poli_asal'),
                    'nama_poli_asal'=>$this->input->post('nama_poli_asal'),
                    'id_dokter_pengirim'=>$this->input->post('id_dokter_pengirim'),
                    'nama_dokter_pengirim'=>$this->input->post('nama_dokter_pengirim'),
                    'tgl_kunjungan'=>$tgllayan,
                    'tgl_daftar'=>$this->input->post('tgl_daftar'),
                    'label_antrian'=>'A',
                    'no_sep'=>$this->input->post('no_jaminan'),
                    // 'no_antrian'=>$this->pasien_model->createAntrian($this->input->post('id_poli'),$this->input->post('id_dokter'),$mulai),
                    'no_surat'=>$this->input->post('no_surat'),
                    'no_rujuk'=>$this->input->post('no_rujuk'),
                    'referensirajal'=>$this->input->post('referensirajal'),
                    'sepasal'=>$this->input->post('sepasal'),
                    'nobpjs'=>$this->input->post('nobpjs'),
                    'keluhan'=>$this->input->post('keluhan'),
                );
                $id=$this->pasien_model->insertPendaftaran($data);
				$kodebooking=$this->input->post("kodebooking");
				if(!empty($kodebooking)){
					// Kirim Task id 3
					$waktu=date('Y-m-d H:i:s');
					$waktums=strtotime($waktu)*1000; 
					if($this->input->post('terkirim')==1){
						$response=$this->jkn_model->updatetask($kodebooking,3,$id,$data['nomr']);
						$res=json_decode($response);
					}else{
						$res=array();
					}
				}else{
					// Booking antrian dan udate task id 3
					$res=array();
				}
                $response = array('status' => true, 'message' => 'Pendaftaran Berhasil','unikID'=>$id,'antrian'=>$res);
            }
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function update(){
        if ($this->session->userdata('modul')==2) {
            $kab=$this->input->post('kab_kota');
            $idx=$this->input->post('idx');
            if($kab=='Padang') $dalamkota=1; else $dalamkota=0;
            $data=array(
                'idx'=>$this->input->post('idx'),
                'nomr'=>$this->input->post('nomr'),
                'nik'=>$this->input->post('nik'),
                'nobpjs'=>$this->input->post('nobpjs'),
                'nama'=>$this->input->post('nama'),
                'tempat_lahir'=>$this->input->post('tempat_lahir'),
                'tgl_lahir'=>dateEng($this->input->post('tgl_lahir')),
                'jns_kelamin'=>$this->input->post('jns_kelamin'),
                'pekerjaan'=>$this->input->post('pekerjaan'),
                'agama'=>$this->input->post('agama'),
                'suku'=>$this->input->post('suku'),
                'bahasa'=>$this->input->post('bahasa'),
                'notelp'=>$this->input->post('notelp'),
                'dalam_kota'=>$dalamkota,
                'nama_provinsi'=>$this->input->post('nama_provinsi'),
                'kab_kota'=>$this->input->post('kab_kota'),
                'kecamatan'=>$this->input->post('kecamatan'),
                'kelurahan'=>$this->input->post('kelurahan'),
                'alamat'=>$this->input->post('alamat'),
                'nama_keluarga'=>$this->input->post('nama_keluarga'),
                'notelp_keluarga'=>$this->input->post('notelp_keluarga'),
                'hub_keluarga'=>$this->input->post('hub_keluarga'),
                'tgl_daftar'=>date('Y-m-d'),                
            );
            $this->pasien_model->updatePasien($data,$idx);
            $response = array('status' => true, 'message' => 'Data pasienberhasildiupdate');
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function kabupaten(){
        if ($this->session->userdata('modul')==2) {
            $provinsi=urldecode($this->input->get('provinsi'));
            $data=$this->pasien_model->getKabupaten($provinsi);
            if($data){
                $response = array('status' => true, 'message' => 'OK','response'=>$data);
            }else{
                $response = array('status' => false, 'message' => 'Kabupaten Tidak tersedia');
            }
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function kecamatan(){
        if ($this->session->userdata('modul')==2) {
            $provinsi=urldecode($this->input->get('kabkota'));
            $data=$this->pasien_model->getKecamatan($provinsi);
            if($data){
                $response = array('status' => true, 'message' => 'OK','response'=>$data);
            }else{
                $response = array('status' => false, 'message' => 'Kabupaten Tidak tersedia');
            }
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function kelurahan(){
        if ($this->session->userdata('modul')==2) {
            $provinsi=urldecode($this->input->get('kecamatan'));
            $data=$this->pasien_model->getKelurahan($provinsi);
            if($data){
                $response = array('status' => true, 'message' => 'OK','response'=>$data);
            }else{
                $response = array('status' => false, 'message' => 'Kabupaten Tidak tersedia');
            }
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function mapruang($kode)
    {
        if ($this->session->userdata('modul')==2) {
            $this->db->where('kode_jkn', $kode);
            $ruang = $this->db->get('ruang')->row();
            if (empty($ruang)) {
                $response = array('status' => false, 'message' => 'Ruangan Tidak Ditemukan', 'data' => array());
            } else {
                $response = array('status' => true, 'message' => 'OK', 'data' => $ruang);
            }
        } else {
            $response = array('status' => false, 'message' => 'Ops Session Expired', 'data' => array());
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function formSEP(){
        
    }

    function datacetaksep($nojaminan,$tgl="")
    {
        $raw = intval($this->input->get('raw'));
        $ses_state = $this->users_model->cek_session_id();
            if ($ses_state) {
                date_default_timezone_set('UTC');
                $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
                // Create Signature
                $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
                $encodedSignature = base64_encode($signature);
                if(empty($mulai)) $mulai=date('Y-m-d');
                if(empty($selesai)) $selesai=date('Y-m-d');
                // Generate Header
                $header = "";
                $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
                $header .= "X-timestamp: " . $tStamp . "\r\n";
                $header .= "X-signature: " . $encodedSignature ."\r\n";
                $header .= "user_key: ".KEY_VC;
                $this->load->model('vclaim_model');
                $res = $this->vclaim_model->getData("SEP/$nojaminan",$header);
                $res_arr=json_decode($res);
                // if($res_arr->metaData->code==200){
                //     $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$res_arr->response);
                //     $response=json_decode(hasil($data));
                //     // $res=json_encode(array('metaData'=>$res_arr->metaData,'response'=>json_decode(hasil($data))));
                // }
                if ($res_arr->metaData->code == 200) {
                    $res = $this->pasien_model->cariSEPLokal($nojaminan,$tgl);
                    if(!empty($res)){
                        $this->load->helper('lz');
                        $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$res_arr->response);
                        $response = array(
                            'status'    => true,
                            'local'     => 1, 
                            'namafaskes'=>FASKES_VC,
                            'tgl'=>date('Y-m-d H:i:s'),
                            'response'  => $res,
                            'seponline' => json_decode(hasil($data))
                        );
                        $this->db->query("UPDATE sep_response SET cetakke=cetakke+1 WHERE noSep='$nojaminan'");
                    }else{
                        // if ($res_arr->response->noRujukan != "") {
                        //     $this->load->model('vclaim_model');
                            
                        //     $header = "";
                        //     $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
                        //     $header .= "X-timestamp: " . $tStamp . "\r\n";
                        //     $header .= "X-signature: " . $encodedSignature ."\r\n";
                        //     $header .= "user_key: ".KEY_VC;
                        //     $this->load->model('vclaim_model');
                        //     if($faskes==1) $res = $this->vclaim_model->getData("Rujukan/Peserta/$nokartu",$header);
                        //     else $res = $this->vclaim_model->getData("Rujukan/RS/Peserta/$nokartu",$header);
                        //     // $res = $this->vclaim_model->getData("SEP/$nojaminan",$header);
                        //     $res_arr=json_decode($res);
                        //     // $rujukan = $this->vclaim_model->getData($res_arr->response->noRujukan);
                        //     // $rujukan_arr = json_decode($rujukan);
                        //     if ($rujukan_arr->metaData->code != 200) {
                        //         $rujukan = $this->pasien_model->cariRujukan($res_arr->response->noRujukan, 2);
                        //         $rujukan_arr = json_decode($rujukan);
                        //         $data_rujukan = $rujukan_arr->response;
                        //     } else {
                        //         $data_rujukan = array();
                        //     }
                        // } else {
                        //     $data_rujukan = array();
                        // }
                        $this->load->helper('lz');
                        $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$res_arr->response);
                        $response = array(
                            'status'=>true,
                            'tgl'=>date('Y-m-d H:i:s'),
                            'local' => 0, 
                            'namafaskes'=>FASKES_VC,
                            'seponline' => json_decode(hasil($data)), 
                            'rujukan' => array()
                        );
                        
                    }
                } else {
                    // echo $res_arr->metaData->message;
                    $res = $this->pasien_model->cariSEPLokal($nojaminan,$tgl);
                    if(!empty($res)){
                        $this->load->helper('lz');
                        $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$res_arr->response);
                        $response = array(
                            'status'    => true,
                            'local'     => 1, 
                            'namafaskes'=>FASKES_VC,
                            'tgl'=>date('Y-m-d H:i:s'),
                            'response'  => $res,
                            'seponline' => array()
                        );
                        // $this->db->query("UPDATE sep_response SET cetakke=cetakke+1 WHERE noSep='$nojaminan'");
                    }
                    // $response=array('status'=>false,'message'=>$res_arr->metaData->message);
                }
                //print_r($response); exit;
            } else {
                $response=array('status'=>false,'message'=>"session Expire");
                // echo "session Expire";
            }
            header('Content-Type: application/json');
            echo json_encode($response);
    }
    function qrpng($id){
		// $data=base_url()."online/pendaftaran/".$id;
		// $this->load->library('qr');
		
		// QRcode::png($data,false,QR_ECLEVEL_H,5,2);
		// $data=QRLINK."online/pendaftaran/".$id;
		// echo $data;exit;
		QRcode::png($id,false,QR_ECLEVEL_H,5,2);
	}

    function cetakrujukan($norujuk){
        if ($this->session->userdata('modul')==2) {
            $this->db->where('noRujukan',$norujuk);
            $rujukan=$this->db->get('rujukanonline')->row();
            $data=array('rujukan'=>$rujukan);

            $this->load->view('rekammedis/cetak/v_print_rujukan_online', $data);
        }else{
            echo "session Expire";
        }
    }

    function sep($nojaminan,$tgl="")
    {
        $raw = intval($this->input->get('raw'));
        if ($raw == 0) {
            $ses_state = $this->users_model->cek_session_id();
            if ($ses_state) {
                date_default_timezone_set('UTC');
                $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'))-SELISIH_WAKTU;
                // Create Signature
                $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
                $encodedSignature = base64_encode($signature);
                if(empty($mulai)) $mulai=date('Y-m-d');
                if(empty($selesai)) $selesai=date('Y-m-d');
                // Generate Header
                $header = "";
                $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
                $header .= "X-timestamp: " . $tStamp . "\r\n";
                $header .= "X-signature: " . $encodedSignature ."\r\n";
                $header .= "user_key: ".KEY_VC;
                $this->load->model('vclaim_model');
                $res = $this->vclaim_model->getData("SEP/$nojaminan",$header);
                $res_arr=json_decode($res);
                if($res_arr->metaData->code==200){
                    $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$res_arr->response);
                    $res=json_encode(array('metaData'=>$res_arr->metaData,'response'=>json_decode(hasil($data))));
                }
                // $res = $this->pendaftaran_model->cariSEP($nojaminan);
                // header('Content-Type: application/json');
                // echo $res; exit;
                // $res_arr = json_decode($res);
                if ($res_arr->metaData->code == 200) {
                    $res = $this->pendaftaran_model->cariSEPLokal($nojaminan,$tgl);
                    if(!empty($res)){
                        $this->load->helper('lz');
                        $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$res_arr->response);
                        // echo hasil($data); exit;
                        // print_r(json_decode(hasil($data))); exit;
                        $response = array('local' => 1, 'response' => $res,'sep'=>json_decode(hasil($data)));
                        // print_r($response);exit;
                        $this->load->view('cetak/v_print_sep_rj', $response);
                    }else{
                        //AmbilData Sep Online
                        // print_r($res_arr); exit;
                        if ($res_arr->response->noRujukan != "") {
                            $rujukan = $this->pendaftaran_model->cariRujukan($res_arr->response->noRujukan);
                            $rujukan_arr = json_decode($rujukan);
                            // print_r($rujukan_arr);
                            if ($rujukan_arr->metaData->code != 200) {
                                $rujukan = $this->pendaftaran_model->cariRujukan($res_arr->response->noRujukan, 2);
                                $rujukan_arr = json_decode($rujukan);
                                $data_rujukan = $rujukan_arr->response;
                            } else {
                                $data_rujukan = array();
                            }
                        } else {
                            $data_rujukan = array();
                        }

                        $response = array('local' => 0, 'response' => $res_arr->response, 'rujukan' => $data_rujukan);
                        
                        $this->load->view('cetak/v_print_sep_rj', $response);
                    }
                } else {
                    echo $res_arr->metaData->message;
                }
                //print_r($response); exit;
            } else {

                echo "session Expire";
            }
        } else {
            $res = $this->pendaftaran_model->cariSEPLokal($nojaminan);
            if (empty($res)) {
                $res = $this->pendaftaran_model->cariSEP($nojaminan);
                $res_arr = json_decode($res);
                $response = array('local' => 0, 'response' => $res_arr->response);
            } else {
                $response = array('local' => 1, 'response' => $res);
            }
            //$response = $this->pendaftaran_model->cariSEP($nojaminan);
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    }

    function ruangan($jns_layanan){
        if ($this->session->userdata('modul')==2) {
            $response=array(
                'status'=>true,
                'message'=>'OK',
                'data'=>$this->pasien_model->getRuang($jns_layanan),
                'rujukan'=>$this->pasien_model->getRujukanByLayanan($jns_layanan)
            );
        }else{
            $response=array(
                'status'=>false,
                'message'=>'Session Expired'
            );
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

	function booking($nomr,$nik,$nobpjs){
		if ($this->session->userdata('modul')==2) {
            $response=array(
                'status'=>true,
                'message'=>'OK',
                'data'=>$this->pasien_model->getBooking($nomr,$nik,$nobpjs),
            );
        }else{
            $response=array(
                'status'=>false,
                'message'=>'Session Expired'
            );
        }
        header('Content-Type: application/json');
        echo json_encode($response);
	}
    function reservasirajal($nomr){
        if ($this->session->userdata('modul')==2) {
            $response=array(
                'status'=>true,
                'message'=>'OK',
                'data'=>$this->pasien_model->getReservasiRajal($nomr),
            );
        }else{
            $response=array(
                'status'=>false,
                'message'=>'Session Expired'
            );
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
}
