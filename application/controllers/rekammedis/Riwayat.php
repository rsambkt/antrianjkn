<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Riwayat extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('users_model');
        $this->load->model('riwayat_model');
        $this->load->helper('ajaxdata');
    }
    function index()
    {
        if ($this->session->userdata('modul')==2) {
            $config = array(
                'url'           => 'rekammedis/riwayat/datariwayat',
                'variable'      => array('idx'=>'idx','nomr_pasien' => 'nomr_pasien', 'tempat_lahir' => 'tempat_lahir', 'tgl_lahir' => 'tgl_lahir'),
                'field'         => array('id_daftar','reg_unit','jenislayanan','nomr_pasien', 'nama_pasien','jns_kelamin','pekerjaan', 'notelp', '{{tempat_lahir}} / {{tgl_lahir}}',  'alamat','carabayar','rujukan','nama_poli','nama_dokter','tgl_kunjungan',),
                'function'      => 'getriwayat',
                'keyword_id'    => 'q',
                'param_id'      => 'param',
                'limit_id'      => 'limit',
                'data_id'       => 'datariwayat',
				'param'			=> array('jnslayanan'=>'jnslayanan','ruang'=>'ruang','tanggal'=>'tanggal'),
                'page_id'       => 'pagination',
                'number'        => true,
                'action'        => true,
                'load'          => true,
                'action_button' => "<a href='" . base_url() . "rekammedis/pasien/suksesdaftar/{{idx}}" . "' class='btn btn-danger btn-sm'><span class='fa fa-search'></span> Detail</a>",
            );
            $data = array(
				'contentTitle' => 'Riwayat Kunjungan', 
				'jnsLayanan'	=>$this->riwayat_model->getJenisLayanan(),
				'lib'           => array(
					'javascript/riwayat.js',
				),
				'config' => $config
			);
            $view = array(
                'header' => $this->load->view('template/header', '', true),
                'nav_sidebar' => $this->load->view('template/nav_sidebar', array(), true),
                'content' => $this->load->view('rekammedis/riwayat/index', $data, true),
                'index_menu'=>3,
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

    function datariwayat()
    {
        if ($this->session->userdata('modul')==2) {
            $keyword = urldecode($this->input->get('keyword', TRUE));
            $start = intval($this->input->get('start'));
            $limit = intval($this->input->get('limit'));
            $jnslayanan = intval($this->input->get('jnslayanan'));
            $ruang = intval($this->input->get('ruang'));
            $param = urldecode($this->input->get('param', TRUE));
            $tanggal = urldecode($this->input->get('tanggal', TRUE));
            $param=($param=="nobpjs" ? "d.nobpjs":($param=="alamat"?$param="a.alamat":$param));
            $mulai = ($start * $limit) - $limit;
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'start'     => $mulai,
                'row_count' => $this->riwayat_model->countriwayat($keyword, $param,$jnslayanan,$ruang,$tanggal),
                'limit'     => $limit,
                'data'      => $this->riwayat_model->getriwayat($limit, $mulai, $keyword, $param,$jnslayanan,$ruang,$tanggal),
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function detail($nomr)
    {
        if ($this->session->userdata('modul')==2) {
            $riwayat = $this->riwayat_model->getriwayatBynomr($nomr);
            if (!empty($riwayat)) {
                $config = array(
                    'url'           => 'rekammedis/riwayat/datariwayat/' . $nomr,
                    'variable'      => array('nomr' => 'nomr', 'tempat_lahir' => 'tempat_lahir', 'tgl_lahir' => 'tgl_lahir'),
                    'field'         => array('id_daftar', 'reg_unit', 'jns_layanan', 'nama_poli', 'nama_dokter', '{{tgl_lahir}}',  'alamat'),
                    'function'      => 'getData',
                    'keyword_id'    => 'q',
                    'param_id'      => 'param',
                    'limit_id'      => 'limit',
                    'data_id'       => 'data',
                    'page_id'       => 'pagination',
                    'number'        => true,
                    'action'        => false,
                    'load'          => true,
                    'action_button' => "",
                );
                $ruang=$this->riwayat_model->getRuang();
                if(count($ruang)==1) $dokter=$this->riwayat_model->getDokter($ruang[0]->idx); else $dokter=array();
                $data = array(
                    'contentTitle'  => 'Detail riwayat',
                    'row'           => $riwayat,
                    'cara_daftar'   => $this->riwayat_model->getCaraDaftar(),
                    'jenis_layanan' => $this->riwayat_model->getJenisLayanan(),
                    'cara_bayar'    => $this->riwayat_model->getCaraBayar(),
                    'agama'         => $this->riwayat_model->getAgama(),
                    'suku'          => $this->riwayat_model->getSuku(),
                    'bahasa'        => $this->riwayat_model->getBahasa(),
                    'provinsi'        => $this->riwayat_model->getProvinsi(),
                    'kabupaten'        => $this->riwayat_model->getKabupaten($riwayat->nama_provinsi),
                    'kecamatan'        => $this->riwayat_model->getKecamatan($riwayat->kab_kota),
                    'kelurahan'        => $this->riwayat_model->getkelurahan($riwayat->kecamatan),
                    'ruang'=>$this->riwayat_model->getRuang(),
                    'dokter'=>$dokter,
                    'rujukan'       => $this->riwayat_model->getRujukan(array('idx <= ' => 6)),
                );
                $view = array(
                    'header'        => $this->load->view('template/header', '', true),
                    'nav_sidebar'   => $this->load->view('template/nav_sidebar', array(), true),
                    'content'       => $this->load->view('rekammedis/riwayat/detail', $data, true),
                    'ajaxdata'      => getData($config),
                    'lib'           => array(
                        'javascript/pendaftaran.js',
                        
                    )
                );
                $this->load->view('template/theme', $view);
            } else {
                echo "<script>alert('Ops. Data riwayat tidak ditemukan');
                window.location.href = '" . base_url() . "rekammedis/riwayat" . "'
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
    function tambah(){
        if ($this->session->userdata('modul')==2) {
            $data = array(
                'contentTitle'  => 'Daftar riwayat Baru',
                'cara_daftar'   => $this->riwayat_model->getCaraDaftar(),
                'jenis_layanan' => $this->riwayat_model->getJenisLayanan(),
                'cara_bayar'    => $this->riwayat_model->getCaraBayar(),
                'agama'         => $this->riwayat_model->getAgama(),
                'suku'          => $this->riwayat_model->getSuku(),
                'bahasa'        => $this->riwayat_model->getBahasa(),
                'provinsi'        => $this->riwayat_model->getProvinsi(),
                'kabupaten'        => array(),
                'kecamatan'        => array(),
                'kelurahan'        => array(),
                'rujukan'       => $this->riwayat_model->getRujukan(array('idx <= ' => 6)),
            );
            $view = array(
                'header'        => $this->load->view('template/header', '', true),
                'nav_sidebar'   => $this->load->view('template/nav_sidebar', array(), true),
                'content'       => $this->load->view('rekammedis/riwayat/tambah', $data, true),
                'lib'           => array('javascript/pendaftaran.js')
            );
            $this->load->view('template/theme', $view);
        } else {
            echo "<script>alert('Ops. Data riwayat tidak ditemukan');
            window.location.href = '" . base_url() . "rekammedis/riwayat" . "'
            </script>";
        }
    }
    
    function carabayar($idx)
    {
        
        if ($this->session->userdata('modul')==2) {
            $response = array('status' => true, 'data' => $this->riwayat_model->getCaraBayar(array('idx' => $idx)));
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function rujukan()
    {
        
        if ($this->session->userdata('modul')==2) {
            $rujukan = $this->riwayat_model->getRujukan(array('aktif' => 1));
            $response = array('status' => true, 'data' => $rujukan);
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function pilihrujukan($id){
        if ($this->session->userdata('modul')==2) {
            $rujukan = $this->riwayat_model->pilihRujukan($id);
            $response = array('status' => true, 'data' => $rujukan);
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function dokter($poli){
        if ($this->session->userdata('modul')==2) {
            $rujukan = $this->riwayat_model->getDokter($poli);
            $response = array('status' => true, 'data' => $rujukan);
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function daftar_riwayat_baru(){
        if ($this->session->userdata('modul')==2) {
            $kab=$this->input->post('kab_kota');
            $idx=$this->input->post('idx');
            if($kab=='Padang Panjang') $dalamkota=1; else $dalamkota=0;
            $data=array(
                'nomr'=>$this->riwayat_model->generateNomr(),
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
                'tgl_daftar'=>date('Y-m-d H:i:s')    
            );
            $id = $this->riwayat_model->insertriwayat($data);
            if($id){
                $response = array('status' => true, 'message' => 'Data riwayat berhasil ditambahkan','nomr'=>$data['nomr']);
            }else{
                $response = array('status' => false, 'message' => 'Data riwayat gagal ditambahkan');
            }
            
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function suksesdaftar($id=""){
        if ($this->session->userdata('modul')==2) {
            // $row=$this->riwayat_model->getPendaftaran($id);
            $data = array(
                'contentTitle'  => 'Pendaftaran riwayat Sukses',
                'row'           => $this->riwayat_model->getPendaftaran($id),
            );
            $view = array(
                'header'        => $this->load->view('template/header', '', true),
                'nav_sidebar'   => $this->load->view('template/nav_sidebar', array(), true),
                'content'       => $this->load->view('rekammedis/riwayat/sukses', $data, true),
                'lib'           => array(
                    'javascript/pendaftaran.js',
                    'javascript/jspdf.js',
                    'javascript/cetaksep.js'
                )
            );
            $this->load->view('template/theme', $view);
        }else {
            echo "<script>alert('Ops. Data riwayat tidak ditemukan');
            window.location.href = '" . base_url() . "rekammedis/riwayat" . "'
            </script>";
        }
    }
    function simpan_pendaftaran(){
        if ($this->session->userdata('modul')==2) {
            $cekKunjungan=$this->riwayat_model->cekKunjungan($this->input->post('id_poli'),$this->input->post('nomr_riwayat'));
            if($cekKunjungan>0){
                $response = array('status' => false, 'message' => 'riwayat sudah terdaftar dipoli yang sama dan hari yang sama');
            }else{
                $mulai=0;
                $data=array(
                    'idx_riwayat'=>$this->input->post('idx_riwayat'),
                    'id_cara_daftar'=>$this->input->post('id_cara_daftar'),
                    'id_daftar'=>$this->riwayat_model->createIdDaftar(),
                    'reg_unit'=>$this->riwayat_model->createRegUnit($this->input->post('id_poli')),
                    'jns_layanan'=>$this->input->post('jns_layanan'),
                    'nomr_riwayat'=>$this->input->post('nomr_riwayat'),
                    'nama_riwayat'=>$this->input->post('nama_riwayat'),
                    'pekerjaan'=>$this->input->post('pekerjaan'),
                    'notelp'=>$this->input->post('notelp'),
                    'tgl_lahir'=>$this->input->post('tgl_lahir'),
                    'kab_kota'=>$this->input->post('kab_kota'),
                    'kecamatan'=>$this->input->post('kecamatan'),
                    'kelurahan'=>$this->input->post('kelurahan'),
                    'alamat'=>$this->input->post('alamat'),
                    'id_cara_bayar'=>$this->input->post('id_cara_bayar'),
                    'carabayar'=>$this->input->post('carabayar'),
                    'id_rujuk'=>$this->input->post('id_rujuk'),
                    'rujukan'=>$this->input->post('rujukan'),
                    'id_poli'=>$this->input->post('id_poli'),
                    'nama_poli'=>$this->input->post('nama_poli'),
                    'id_dokter'=>$this->input->post('id_dokter'),
                    'nama_dokter'=>$this->input->post('nama_dokter'),
                    'tgl_kunjungan'=>date('Y-m-d'),
                    'tgl_daftar'=>$this->input->post('tgl_daftar'),
                    'label_antrian'=>'A',
                    'no_sep'=>$this->input->post('no_jaminan'),
                    'no_antrian'=>$this->riwayat_model->createAntrian($this->input->post('id_poli'),$this->input->post('id_dokter'),$mulai),
                    'nobpjs'=>$this->input->post('nobpjs'),
                    'keluhan'=>$this->input->post('keluhan'),
                );
                $id=$this->riwayat_model->insertPendaftaran($data);
                $response = array('status' => true, 'message' => 'Pendaftaran Berhasil','unikID'=>$id);
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
            if($kab=='Padang Panjang') $dalamkota=1; else $dalamkota=0;
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
            $this->riwayat_model->updateriwayat($data,$idx);
            $response = array('status' => true, 'message' => 'Data riwayatberhasildiupdate');
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function kabupaten(){
        if ($this->session->userdata('modul')==2) {
            $provinsi=urldecode($this->input->get('provinsi'));
            $data=$this->riwayat_model->getKabupaten($provinsi);
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
            $data=$this->riwayat_model->getKecamatan($provinsi);
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
            $data=$this->riwayat_model->getKelurahan($provinsi);
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
                    $res = $this->riwayat_model->cariSEPLokal($nojaminan,$tgl);
                    if(!empty($res)){
                        $this->load->helper('lz');
                        $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$res_arr->response);
                        $response = array(
                            'status'    => true,
                            'local'     => 1, 
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
                        //         $rujukan = $this->riwayat_model->cariRujukan($res_arr->response->noRujukan, 2);
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
                            'local' => 0, 
                            'seponline' => json_decode(hasil($data)), 
                            'rujukan' => array()
                        );
                        
                    }
                } else {
                    // echo $res_arr->metaData->message;
                    $response=array('status'=>false,'message'=>$res_arr->metaData->message);
                }
                //print_r($response); exit;
            } else {
                $response=array('status'=>false,'message'=>"session Expire");
                // echo "session Expire";
            }
            header('Content-Type: application/json');
            echo json_encode($response);
    }
}
