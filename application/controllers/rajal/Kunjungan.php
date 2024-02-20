<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Kunjungan extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('users_model');
        $this->load->model('kunjungan_model');
        $this->load->model('pasien_model');
        $this->load->helper('ajaxdata');
        $this->load->helper('bridging');
        $lokasi=$this->session->userdata('lokasi');
        $lok=$this->uri->segment(3);
        if(empty($lokasi)) {
            header("location:".base_url()."rajal/home/ruang");
        }

    }
    function index()
    {
        if ($this->session->userdata('modul')==7) {
            $config = array(
                'url'           => 'rajal/kunjungan/datakunjungan',
                'variable'      => array('idx'=>'idx','nomr_pasien' => 'nomr_pasien','nama_pasien' => 'nama_pasien', 'tempat_lahir' => 'tempat_lahir', 'tgl_lahir' => 'tgl_lahir','label_antrian'=>'label_antrian','no_antrian'=>'no_antrian'),
                'field'         => array('id_daftar','reg_unit','<b>{{nomr_pasien}}</b><br><i>{{nama_pasien}}</i>','jns_kelamin', '{{tempat_lahir}} / {{tgl_lahir}}', 'carabayar','nama_dokter','tgl_kunjungan','statuspasien'),
                'function'      => 'getkunjungan',
                'keyword_id'    => 'q',
                'param_id'      => 'param',
				'param'			=> array('tgl_kunjungan'),
                'limit_id'      => 'limit',
                'data_id'       => 'datakunjungan',
                'page_id'       => 'pagination',
                'number'        => true,
                'action'        => true,
                'load'          => true,
                'action_button' => "<a href='" . base_url() . "rajal/kunjungan/detail/{{idx}}" . "' class='btn btn-danger btn-sm'><span class='fa fa-search'></span> Detail</a>",
            );
            $data = array(
				'contentTitle' => 'Data Kunjungan', 
				'config' => $config,
				'kelas'=> $this->kunjungan_model->getKelas(),
			);
            $view = array(
                'header' => $this->load->view('template/header', '', true),
                'nav_sidebar' => $this->load->view('template/nav_sidebar', array(), true),
                'content' => $this->load->view('rajal/kunjungan/index', $data, true),
                'index_menu'=>2,
                'lib'=> array(
                    'javascript/kunjunganrajal.js',
                ),
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

	function hasilpemeriksaanradiologi($idx){
		if ($this->session->userdata('modul')==7) {
			$this->load->model("permintaan_model");
            $data=array(
				'row'=>$this->permintaan_model->getDataPermintaanRadiologiById($idx)
			);
			$this->load->view("hasil/pemeriksaanradiologi",$data);
        } else {
            $sid = getSessionID();
            $url_login = base_url() . '?sid=' . $sid;
            echo "<script>alert('Ops. Sesi anda telah berubah! Silahkan login kembali');
                window.location.href = '$url_login'
                </script>";
        }
	}
	function datapermintaanradiologi($idx){
		if ($this->session->userdata('modul')==7) {
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'data'      => $this->kunjungan_model->getDataPermintaanRadiologiById($idx),
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
	}
	function hasilpemeriksaanlabor($id){
		if ($this->session->userdata('modul')==7 || $this->session->userdata('modul')==8) {
			$this->load->model('permintaan_model');
			$row=$this->permintaan_model->getPermintaanLaborById($id);
			// print_r($row); exit;
            $data=array(
				'row'	=>$row,
				'detail'=> $this->permintaan_model->getDetailPemeriksaan($id)
			);
			$this->load->view("hasil/pemeriksaanlabor",$data);
        } else {
            $sid = getSessionID();
            $url_login = base_url() . '?sid=' . $sid;
            echo "<script>alert('Ops. Sesi anda telah berubah! Silahkan login kembali');
                window.location.href = '$url_login'
                </script>";
        }
	}

    function datakunjungan()
    {
        if ($this->session->userdata('modul')==7) {
            $keyword = urldecode($this->input->get('keyword', TRUE));
            $start = intval($this->input->get('start'));
            $limit = intval($this->input->get('limit'));
            $param = urldecode($this->input->get('param', TRUE));
            $tgl_kunjungan = urldecode($this->input->get('tgl_kunjungan', TRUE));
            $param=($param=="nobpjs" ? "d.nobpjs":($param=="alamat"?$param="a.alamat":$param));
            $mulai = ($start * $limit) - $limit;
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'start'     => $mulai,
                'row_count' => $this->kunjungan_model->countkunjungan($keyword, $param,$tgl_kunjungan),
                'limit'     => $limit,
                'data'      => $this->kunjungan_model->getkunjungan($limit, $mulai, $keyword, $param,$tgl_kunjungan),
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function datapermintaan()
    {
        if ($this->session->userdata('modul')==7) {
            $keyword = urldecode($this->input->get('keyword', TRUE));
            $start = intval($this->input->get('start'));
            $limit = intval($this->input->get('limit'));
            $param = urldecode($this->input->get('param', TRUE));
            $mulai = ($start * $limit) - $limit;
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'start'     => $mulai,
                'row_count' => $this->kunjungan_model->countDataPermintaanKonsul($keyword, $param),
                'limit'     => $limit,
                'data'      => $this->kunjungan_model->getDataPermintaanKonsul($limit, $mulai, $keyword, $param),
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function kunjunganpasien($nomr)
    {
        if ($this->session->userdata('modul')==7) {
            $keyword = urldecode($this->input->get('keyword', TRUE));
            $start = intval($this->input->get('start'));
            $limit = intval($this->input->get('limit'));
            $mulai = ($start * $limit) - $limit;
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'start'     => $mulai,
                'row_count' => $this->kunjungan_model->countDataKunjunganByMR($keyword,$nomr),
                'limit'     => $limit,
                'data'      => $this->kunjungan_model->getDataKunjunganByMR($limit, $mulai, $keyword,$nomr),
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function aprovepasien($regunit)
    {
        if ($this->session->userdata('modul')==7) {
            
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'data'      => $this->kunjungan_model->getPermintaanKonsulByRegunit($regunit),
                'profile'   =>$this->kunjungan_model->getPendaftaranByRegUnit($regunit)
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function kamar($idkelas)
    {
        if ($this->session->userdata('modul')==7) {
            $response = array(
                'status' => true, 
                'data' => $this->kunjungan_model->getKamar($this->session->userdata('lokasi'),$idkelas)
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function tt($idkamar)
    {
        if ($this->session->userdata('modul')==7) {
            $response = array(
                'status' => true, 
                'data' => $this->kunjungan_model->getTT($idkamar)
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    
    function simpanasesmen(){
        if ($this->session->userdata('modul')==7) {
            $config = array(
                array(
                    'field' => 'sumberinformasi',
                    'label' => 'Sumber Informasi',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'keluhanutama',
                    'label' => 'Keluhan Utama',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'alloanamnessa',
                    'label' => 'Alloanamnessa',
                    'rules' => 'required'
                )
            );
            $this->form_validation->set_rules($config);
            $this->form_validation->set_message('required', '%s Tidak Boleh Kosong');
            if ($this->form_validation->run() == FALSE)
            {
                $response = array(
                    'status' => false, 
                    'message' => 'Data asesmen awal belum lengkap silahkan periksa kembali',
                    'error'=>array(
                        'sumberinformasi'=>form_error('sumberinformasi'),
                        'keluhanutama'=>form_error('keluhanutama'),
                        'alloanamnessa'=>form_error('alloanamnessa')
                    )
                );
                
            }else{
                // Simpan Asesmen Awal Dokter
				$idx=$this->input->post("idx");
				// $sumber=implode(",",$this->input->post("sumberinformasi"));
				
				$asesmen=array(
					'idx_pendaftaran'=>$this->input->post("idx_pendaftaran"),
					'tanggalasesmen'=>$this->input->post("tanggalasesmen"),
					'sumberinformasi'=>$this->input->post("sumberinformasi"),
					'keluhanutama'=>$this->input->post("keluhanutama"),
					'riwayat_penyakit_sekarang'=>$this->input->post("riwayat_penyakit_sekarang"),
					'riwayat_penyakit_dahulu'=>$this->input->post("riwayat_penyakit_dahulu"),
					'alloanamnessa'=>$this->input->post("alloanamnessa"),
					'riwayat_penyakit_keluarga'=>$this->input->post("riwayat_penyakit_keluarga"),
					'pemeriksaan_fisik_kepala'=>$this->input->post("pemeriksaan_fisik_kepala"),
					'pemeriksaan_fisik_torak'=>$this->input->post("pemeriksaan_fisik_torak"),
					'kajian_awal_medis'=>$this->input->post("kajian_awal_medis")
				);
                $insertid=$this->kunjungan_model->simpanAsesmen($asesmen,$idx);
                $response = array(
					'status' => true, 
					'message' => 'Kajian awal pasien berhasil disimpan',
					'insertid'=>$insertid
				);
            }
            
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function simpankonsul(){
        if ($this->session->userdata('modul')==7) {
            $config = array(
                array(
                    'field' => 'idruangtujuan',
                    'label' => 'Tujuan Informasi',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'doktertujuan',
                    'label' => 'Dokter',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'diagnosakerja',
                    'label' => 'Dianosa Kerja',
                    'rules' => 'required'
				),
                array(
                    'field' => 'keteranganklinik',
                    'label' => 'Diagnosa  Klinis',
                    'rules' => 'required'
				),
            );
            $this->form_validation->set_rules($config);
            $this->form_validation->set_message('required', '%s Tidak Boleh Kosong');
            if ($this->form_validation->run() == FALSE)
            {
                $response = array(
                    'status' => false, 
                    'message' => 'Data asesmen awal belum lengkap silahkan periksa kembali',
                    'error'=>array(
                        'idruangtujuan'=>form_error('idruangtujuan'),
                        'doktertujuan'=>form_error('doktertujuan'),
                        'diagnosakerja'=>form_error('diagnosakerja'),
                        'keteranganklinik'=>form_error('keteranganklinik')
                    )
                );
                
            }else{
                // Simpan Asesmen Awal Dokter
				$idx=$this->input->post("idx");
				// $sumber=implode(",",$this->input->post("sumberinformasi"));
				
				$konsul=array(
					'idx_pendaftaran'=>$this->input->post("idx_pendaftaran"),
					'tglminta'=>date('Y-m-d'),
					'id_daftar'=>$this->input->post("id_daftar"),
					'reg_unit'=>$this->input->post("reg_unit"),
					'norujukaninternal'=>$this->input->post("norujukaninternal"),
					'tglkonsul'=>$this->input->post("tglkonsul"),
					'nomr_pasien'=>$this->input->post("nomr_pasien"),
					'nama_pasien'=>$this->input->post("nama_pasien"),
					'jns_kelamin'=>$this->input->post("jns_kelamin"),
					'tgl_lahir'=>$this->input->post("tgl_lahir"),
					'idruangasal'=>$this->input->post("idruangasal"),
					'ruangasal'=>$this->input->post("ruangasal"),
					'dokterPengirim'=>$this->input->post("dokterPengirim"),
					'namaDokterPengirim'=>$this->input->post("dokterPengirim"),
					'kode_subspesialis_tujuan'=>getField('kode_jkn','idx',$this->input->post("idruangtujuan"),'ruang'),
					'kode_subspesialis_asal'=>getField('kode_jkn','idx',$this->input->post("idruangasal"),'ruang'),
					'kodedokterjkn'=>getField('dokterjkn','jadwal_dokter_id',$this->input->post("doktertujuan"),'jkn_jadwalhafis'),
					'idruangtujuan'=>$this->input->post("idruangtujuan"),
					'norujukaninternal'=>getRujukanInternal(),
					'ruangtujuan'=>$this->input->post("ruangtujuan"),
					'doktertujuan'=>$this->input->post("doktertujuan"),
					'namadoktertujuan'=>$this->input->post("namadoktertujuan"),
					'diagnosakerja'=>$this->input->post("diagnosakerja"),
					'keteranganklinik'=>$this->input->post("keteranganklinik"),
					'alasankonsul'=>$this->input->post("alasankonsul"),
					'id_cara_bayar'=>$this->input->post("id_cara_bayar"),
					'cara_bayar'=>$this->input->post("cara_bayar"),
					'dokterPengirim'=>$this->session->userdata('userid'),
                    'namaDokterPengirim'=>getUserNama($this->session->userdata('userid')),
					'cito'=>$this->input->post("cito"),
				);
                $insertid=$this->kunjungan_model->simpanKonsul($konsul,$idx);
                $response = array(
					'status' => true, 
					'message' => 'Permintaan konsul internal  berhasil disimpan',
					'insertid'=>$insertid
				);
            }
            
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function simpancppt(){
        if ($this->session->userdata('modul')==7) {
            $config = array(
                array(
                    'field' => 'td',
                    'label' => 'Tekanan Darah',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'nadi',
                    'label' => 'Nadi',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'nafas',
                    'label' => 'Nafas',
                    'rules' => 'required'
				),
                array(
                    'field' => 'suhu',
                    'label' => 'Suhu',
                    'rules' => 'required'
				),
                array(
                    'field' => 'kesadaran',
                    'label' => 'Kesadaran',
                    'rules' => 'required'
				),
                array(
                    'field' => 'subjective',
                    'label' => 'Subjective',
                    'rules' => 'required'
				),
                array(
                    'field' => 'objective',
                    'label' => 'Objective',
                    'rules' => 'required'
				),
                array(
                    'field' => 'asesmen',
                    'label' => 'Asesmen',
                    'rules' => 'required'
				),
                array(
                    'field' => 'planning',
                    'label' => 'Planning',
                    'rules' => 'required'
                )
            );
            $this->form_validation->set_rules($config);
            $this->form_validation->set_message('required', '%s Tidak Boleh Kosong');
            if ($this->form_validation->run() == FALSE)
            {
                $response = array(
                    'status' => false, 
                    'message' => 'Data asesmen awal belum lengkap silahkan periksa kembali',
                    'error'=>array(
                        'td'=>form_error('td'),
                        'nadi'=>form_error('nadi'),
                        'nafas'=>form_error('nafas'),
                        'suhu'=>form_error('suhu'),
                        'kesadaran'=>form_error('kesadaran'),
                        'subjective'=>form_error('subjective'),
                        'objective'=>form_error('objective'),
                        'asesmen'=>form_error('asesmen'),
                        'planning'=>form_error('planning'),
                    )
                );
                
            }else{
                // Simpan Asesmen Awal Dokter
				$idx=$this->input->post("idx");
				// $sumber=implode(",",$this->input->post("sumberinformasi"));
				// echo $idx; exit;
				$asesmen=array(
					'idx_pendaftaran'=>$this->input->post("idx_pendaftaran"),
					'tglcatat'=>$this->input->post("tglcatat"),
					'td'=>$this->input->post("td"),
					'nadi'=>$this->input->post("nadi"),
					'nafas'=>$this->input->post("nafas"),
					'suhu'=>$this->input->post("suhu"),
					'kesadaran'=>$this->input->post("kesadaran"),
					'subjective'=>$this->input->post("subjective"),
					'objective'=>$this->input->post("objective"),
					'kodediagnosa'=>$this->input->post("kodediagnosa"),
					'asesmen'=>$this->input->post("asesmen"),
					'planning'=>$this->input->post("planning")
				);
                $insertid=$this->kunjungan_model->simpanCppt($asesmen,$idx);
                $response = array(
					'status' => true, 
					'message' => 'Catatan Perkembangan pasien berhasil disimpan',
					'insertid'=>$insertid
				);
            }
            
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function simpanresep(){
        if ($this->session->userdata('modul')==7) {
            $config = array(
                array(
                    'field' => 'obatid',
                    'label' => 'Obat',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'signa1',
                    'label' => 'Signa 1',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'signa2',
                    'label' => 'Signa 2',
                    'rules' => 'required'
				),
                
            );
            $this->form_validation->set_rules($config);
            $this->form_validation->set_message('required', '%s Tidak Boleh Kosong');
            if ($this->form_validation->run() == FALSE)
            {
                $response = array(
                    'status' => false, 
                    'message' => 'Data resep belum lengkap silahkan periksa kembali',
                    'error'=>array(
                        'obat'=>form_error('obatid'),
                        'signa1'=>form_error('signa1'),
                        'signa2'=>form_error('signa2'),
                    )
                );
                
            }else{
				$this->db->trans_start();
				$idx=$this->input->post("idx_obat");
				$idx_resep=$this->input->post('idx_resep');
				if(empty($idx_resep)){
					$resepmaster=array(
						'idx_pendaftaran'=>$this->input->post("idx_pendaftaran"),
						'id_daftar'=>$this->input->post("id_daftar"),
						'no_resep'=>$this->kunjungan_model->generateNoResep(),
						'jenisresep'=>$this->input->post('jenisresep'),
						'tgl_resep'=>date('Y-m-d'),
						'dokterdpjp'=>$this->input->post("dokterdpjp"),
						'namadokterdpjp'=>$this->input->post("namadokterdpjp")
					);
					$idx_resep=$this->kunjungan_model->insertResepMaster($resepmaster);
				}
				$resepobat=array(
					'idx_resep'=>$idx_resep,
					'jenisresep'=>'Non Racikan',
					'obatid'=>$this->input->post("obatid"),
					'obatnama'=>$this->input->post("obatnama"),
					'signa1'=>$this->input->post("signa1"),
					'signa2'=>$this->input->post("signa2"),
					'jumlah'=>$this->input->post("jumlah"),
					'satuan'=>$this->input->post("satuan"),
					'keterangan'=>$this->input->post("keterangan")
				);
                $insertid=$this->kunjungan_model->simpanResep($resepobat,$idx);
				$this->db->trans_complete();
                $response = array(
					'status' => true, 
					'message' => 'Resep berhasil disimpan',
					'idx_resep'=>$idx_resep
				);
            }
            
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function simpanresepracikan(){
        if ($this->session->userdata('modul')==7) {
            $config = array(
                array(
                    'field' => 'obatnama',
                    'label' => 'Obat',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'moderacikan',
                    'label' => 'Metode Racik',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'signa1',
                    'label' => 'Signa 1',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'signa2',
                    'label' => 'Signa 2',
                    'rules' => 'required'
				),
                
            );
            $this->form_validation->set_rules($config);
            $this->form_validation->set_message('required', '%s Tidak Boleh Kosong');
            if ($this->form_validation->run() == FALSE)
            {
                $response = array(
                    'status' => false, 
                    'message' => 'Data resep belum lengkap silahkan periksa kembali',
                    'error'=>array(
                        'obat'=>form_error('obatnama'),
                        'signa1'=>form_error('signa1'),
                        'signa2'=>form_error('signa2'),
                        'moderacik'=>form_error('moderacik'),
                    )
                );
                
            }else{
                // Simpan Asesmen Awal Dokter
				$this->db->trans_start();
				$idx=$this->input->post("idx_obat");
				$idx_resep=$this->input->post('idx_resep');
				if(empty($idx_resep)){
					$resepmaster=array(
						'idx_pendaftaran'=>$this->input->post("idx_pendaftaran"),
						'id_daftar'=>$this->input->post("id_daftar"),
						'no_resep'=>$this->kunjungan_model->generateNoResep(),
						'jenisresep'=>'Racikan',
						'tgl_resep'=>date('Y-m-d'),
						'dokterdpjp'=>$this->input->post("dokterdpjp"),
						'namadokterdpjp'=>$this->input->post("namadokterdpjp")
					);
					$idx_resep=$this->kunjungan_model->insertResepMaster($resepmaster);
				}
				$resepobat=array(
					'idx_resep'=>$idx_resep,
					'jenisresep'=>'Racikan',
					'obatid'=>$this->input->post("obatid"),
					'obatnama'=>$this->input->post("obatnama"),
					'signa1'=>$this->input->post("signa1"),
					'signa2'=>$this->input->post("signa2"),
					'jumlah'=>$this->input->post("jumlah"),
					'moderacikan'=>$this->input->post("moderacikan"),
					'satuan'=>$this->input->post("satuan"),
					'keterangan'=>$this->input->post("keterangan")
				);
                $insertid=$this->kunjungan_model->simpanResep($resepobat,$idx);
				$this->db->trans_complete();
                $response = array(
					'status' => true, 
					'message' => 'Resep berhasil disimpan',
					'idx_resep'=>$idx_resep
				);
            }
            
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
	function tambahkomponen(){
        if ($this->session->userdata('modul')==7) {
            $config = array(
                array(
                    'field' => 'obatid',
                    'label' => 'Obat',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'dosis',
                    'label' => 'Signa 1',
                    'rules' => 'required'
                ),
            );
            $this->form_validation->set_rules($config);
            $this->form_validation->set_message('required', '%s Tidak Boleh Kosong');
            if ($this->form_validation->run() == FALSE)
            {
                $response = array(
                    'status' => false, 
                    'message' => 'Data resep belum lengkap silahkan periksa kembali',
                    'error'=>array(
                        'obat'=>form_error('komponenobatid'),
                        'dosis'=>form_error('dosis'),
                    )
                );
                
            }else{
				$this->db->trans_start();
				$idx=$this->input->post("idx_komponen");
				$komposisi=array(
					'idx_resep'=>$this->input->post('idx_resep'),
					'idx_resep_detail'=>$this->input->post('idx_resep_detail'),
					'obatid'=>$this->input->post("obatid"),
					'obatnama'=>$this->input->post("obatnama"),
					'jmlracikan'=>$this->input->post("jmlracikan"),
					'p1'=>$this->input->post("p1"),
					'p2'=>$this->input->post("p2"),
					'dosis'=>$this->input->post("dosis"),
					'satuan'=>$this->input->post("satuan"),
					'jmlpakai'=>$this->input->post("jmlpakai"),
					'jmlkeluar'=>ceil($this->input->post("jmlpakai"))
				);
                $insertid=$this->kunjungan_model->simpanKomposisi($komposisi,$idx);
				$this->db->trans_complete();
                $response = array(
					'status' => true, 
					'message' => 'Komposisi Resep Racikan berhasil disimpan',
					'idx_komposisi'=>$insertid
				);
            }
            
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
	function detailkomponen($detailid){
		if ($this->session->userdata('modul')==7) {
            $data=$this->kunjungan_model->getDetailKomponen($detailid);
			if(empty($data)){
				$response = array('status' => false, 'message' => 'Tidak ada data');
			}else{
				$response = array('status' => true, 'message' => 'OK','data'=>$data);
			}
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
	}
    function terimapasien(){
        if ($this->session->userdata('modul')==7) {
            $regunit=$this->input->post('reg_unit');
                $asal=$this->kunjungan_model->getPendaftaranByRegUnit($regunit);

                $lokasi=$this->session->userdata('lokasi');
                $lokasilogin=$this->kunjungan_model->lokasiLogin($lokasi);
                $data=array(
                    'idx_pasien'=>$asal->idx_pasien,
                    'nomr'=>$asal->nomr_pasien,
                    'id_cara_daftar'=>$asal->id_cara_daftar,
                    'id_daftar'=>$asal->id_daftar,
                    'reg_unit'=>$this->pasien_model->createRegUnit($lokasi),
                    'jns_layanan'=>$asal->jns_layanan,
                    'nomr_pasien'=>$asal->nomr_pasien,
                    'nama_pasien'=>$asal->nama_pasien,
                    'pekerjaan'=>$asal->pekerjaan,
                    'notelp'=>$asal->notelp,
                    'tgl_lahir'=>$asal->tgl_lahir,
                    'id_provinsi'=>$asal->id_provinsi,
                    'id_kab_kota'=>$asal->id_kab_kota,
                    'id_kecamatan'=>$asal->id_kelurahan,
                    'id_kelurahan'=>$asal->id_kelurahan,
                    'provinsi'=>$asal->provinsi,
                    'kab_kota'=>$asal->kab_kota,
                    'kecamatan'=>$asal->kecamatan,
                    'kelurahan'=>$asal->kelurahan,
                    'alamat'=>$asal->alamat,
                    'rt'=>$asal->rt,
                    'rw'=>$asal->rw,
                    'kodepos'=>$asal->kodepos,
                    'provinsi_domisili'=>$asal->provinsi_domisili,
                    'kab_kota_domisili'=>$asal->kab_kota_domisili,
                    'kecamatan_domisili'=>$asal->kecamatan_domisili,
                    'kelurahan_domisili'=>$asal->kelurahan_domisili,
                    'alamat_domisili'=>$asal->alamat_domisili,
                    'rt_domisili'=>$asal->rt_domisili,
                    'rw_domisili'=>$asal->rw_domisili,
                    'id_provinsi_domisili'=>$asal->id_provinsi_domisili,
                    'id_kab_kota_domisili'=>$asal->id_kab_kota_domisili,
                    'id_kecamatan_domisili'=>$asal->id_kecamatan_domisili,
                    'id_kelurahan_domisili'=>$asal->id_kelurahan_domisili,
                    'alamat_domisili'=>$asal->alamat_domisili,
                    'rt_domisili'=>$asal->rt_domisili,
                    'rw_domisili'=>$asal->rw_domisili,
                    'kodepos_domisili'=>$asal->kodepos_domisili,
                    'id_cara_bayar'=>$this->input->post('id_cara_bayar'),
                    'carabayar'=>$this->input->post('cara_bayar'),
                    'id_jenis_peserta'=>$asal->id_jenis_peserta,
                    'jenis_peserta'=>$asal->jenis_peserta,
                    'id_rujuk'=>6,
                    'rujukan'=>"RUJUKAN INTERNAL",
                    'id_poli'=>$lokasi,
                    'nama_poli'=>$lokasilogin->ruang,
                    'id_kelas'=>$asal->id_kelas,
                    'kelas_layanan'=>$asal->kelas_layanan,
                    'id_dokter'=>$this->input->post('doktertujuan'),
                    'nama_dokter'=>$this->input->post('namadoktertujuan'),
                    'id_poli_asal'=>$this->input->post("idruangasal"),
                    'nama_poli_asal'=>$this->input->post("ruangasal"),
                    'id_dokter_pengirim'=>$this->input->post("dokterPengirim"),
                    'nama_dokter_pengirim'=>$this->input->post("namaDokterPengirim"),
                    'tgl_kunjungan'=>date('Y-m-d H:i:s'),
                    'tgl_daftar'=>date('Y-m-d H:i:s'),
                    'no_sep'=>$asal->no_sep,
                    'no_rujuk'=>$this->input->post('no_rujuk'),
                    'nobpjs'=>$asal->nobpjs,
                    'keluhan'=>$asal->keluhan,
                );
                $this->db->trans_start();
                $idx=$this->kunjungan_model->insertPendaftaran($data);
                // reset Tempat Tidur Lama
                $this->kunjungan_model->resetTTlama($asal->id_daftar);
                
                // Update Status Permintaan
                $status=array(
                    'statusresponse'=>1
                );
                $this->kunjungan_model->updatePermintaanKonsul($status,$this->input->post('idx'));

                // // Update statuspasien
                // $statuspasien=array('statuspasien'=>3);
                // $this->kunjungan_model->updateKunjungan($statuspasien,$asal->idx);
                $this->db->trans_complete();
                $response = array('status' => true, 'message' => 'OK');
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function detail($id=""){
        if ($this->session->userdata('modul')==7) {
            $row=$this->kunjungan_model->getPendaftaran($id);
            
            $data = array(
                'contentTitle'  => 'Detail Pasien',
                'row'           => $row,
                'antrean'		=> $this->kunjungan_model->getAntrian($row->idx),
                'asesmen'		=> $this->kunjungan_model->getAsesmenAwalDokter($row->idx),
				'diagnosa'		=> $this->kunjungan_model->getDiagnosa(),
				'cp'			=> $this->kunjungan_model->getCppt($row->idx),
				'pemeriksaan'	=> $this->kunjungan_model->getPemeriksaan(),
				'metoderacik'	=> $this->kunjungan_model->getMetodeRacik(),
				'pemeriksaanradiologi'	=> $this->kunjungan_model->getPemeriksaanRad(),
				'ruang'	=> $this->kunjungan_model->getPoliklinik(),
				'kategoritindakan'=>$this->kunjungan_model->getKategoritindakan(),
				'tenagamedis'=>$this->kunjungan_model->getTenagaMedis($this->session->userdata('lokasi'))
            );
            $view = array(
                'header'        => $this->load->view('template/header', '', true),
                'nav_sidebar'   => $this->load->view('template/nav_sidebar', array(), true),
                'content'       => $this->load->view('rajal/kunjungan/detail', $data, true),
				'index_menu'	=> 2,
                'lib'           => array(
                    'javascript/kunjunganrajal.js',
                    'javascript/kunjungandetail.js',
                    'javascript/sukses.js',
                    'assets/js/tree/jquery-ui-dependencies/jquery.fancytree.ui-deps.js',
                    'assets/js/tree/jquery.fancytree.js',
                )	
            );
            $this->load->view('template/theme', $view);
        }else {
            echo "<script>alert('Ops. Data kunjungan tidak ditemukan');
            window.location.href = '" . base_url() . "rajal/kunjungan" . "'
            </script>";
        }
    }
	function datapemeriksaan($kode,$idx_permintaan=""){
		if ($this->session->userdata('modul')==7) {
			$data=$this->kunjungan_model->dataPemeriksaan($kode,$idx_permintaan);
			$response=array(
				'status'=>true,
				'message'=>'OK',
				'data'=>$data,
				'kat'=>$this->kunjungan_model->dataKategori($kode)
			);
		}else{
			$response=array(
				'status'=>false,
				'message'=>'Session Expired',
			);
		}
		header('Content-Type: application/json');
        echo json_encode($response);
	}
	function detailriwayat($idx=""){
		if ($this->session->userdata('modul')==7) {
			$data=$this->kunjungan_model->getPendaftaran($idx);
			$response=array(
				'status'=>true,
				'message'=>'OK',
				'data'=>$data,
				'asesmenawal'=>$this->kunjungan_model->getAsesmenAwalDokter($idx),
				'cppt'=>$this->kunjungan_model->getCppt($idx)
			);
		}else{
			$response=array(
				'status'=>false,
				'message'=>'Session Expired',
			);
		}
		header('Content-Type: application/json');
        echo json_encode($response);
	}

	function datapemeriksaanradiologi($kode,$idx_permintaan=""){
		if ($this->session->userdata('modul')==7) {
			$data=$this->kunjungan_model->dataPemeriksaanRadiologi($kode,$idx_permintaan);
			$response=array(
				'status'=>true,
				'message'=>'OK',
				'data'=>$data,
				'kat'=>$this->kunjungan_model->dataKategoriRadiologi($kode)
			);
		}else{
			$response=array(
				'status'=>false,
				'message'=>'Session Expired',
			);
		}
		header('Content-Type: application/json');
        echo json_encode($response);
	}
    function simpan_pendaftaran(){
        if ($this->session->userdata('modul')==7) {
            $cekKunjungan=$this->kunjungan_model->cekKunjungan($this->input->post('id_poli'),$this->input->post('nomr_kunjungan'));
            if($cekKunjungan>0){
                $response = array('status' => false, 'message' => 'kunjungan sudah terdaftar dipoli yang sama dan hari yang sama');
            }else{
                $mulai=0;
                $data=array(
                    'idx_kunjungan'=>$this->input->post('idx_kunjungan'),
                    'id_cara_daftar'=>$this->input->post('id_cara_daftar'),
                    'id_daftar'=>$this->kunjungan_model->createIdDaftar(),
                    'reg_unit'=>$this->kunjungan_model->createRegUnit($this->input->post('id_poli')),
                    'jns_layanan'=>$this->input->post('jns_layanan'),
                    'nomr_kunjungan'=>$this->input->post('nomr_kunjungan'),
                    'nama_kunjungan'=>$this->input->post('nama_kunjungan'),
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
                    'no_antrian'=>$this->kunjungan_model->createAntrian($this->input->post('id_poli'),$this->input->post('id_dokter'),$mulai),
                    'nobpjs'=>$this->input->post('nobpjs'),
                    'keluhan'=>$this->input->post('keluhan'),
                );
                $id=$this->kunjungan_model->insertPendaftaran($data);
                $response = array('status' => true, 'message' => 'Pendaftaran Berhasil','unikID'=>$id);
            }
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function update(){
        if ($this->session->userdata('modul')==7) {
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
            $this->kunjungan_model->updatekunjungan($data,$idx);
            $response = array('status' => true, 'message' => 'Data kunjunganberhasildiupdate');
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function kabupaten(){
        if ($this->session->userdata('modul')==7) {
            $provinsi=urldecode($this->input->get('provinsi'));
            $data=$this->kunjungan_model->getKabupaten($provinsi);
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
	function listdata(){
		header('Content-Type: application/json');
		echo '[{"id":1,"text":"Root node","children":[{"id":2,"text":"Child node 1"},{"id":3,"text":"Child node 2"}]}]';

	}
	function tindakan(){
		$data=$this->kunjungan_model->getTindakan();
		header('Content-Type: application/json');
		echo json_encode($data);
	}
    function kecamatan(){
        if ($this->session->userdata('modul')==7) {
            $provinsi=urldecode($this->input->get('kabkota'));
            $data=$this->kunjungan_model->getKecamatan($provinsi);
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
        if ($this->session->userdata('modul')==7) {
            $provinsi=urldecode($this->input->get('kecamatan'));
            $data=$this->kunjungan_model->getKelurahan($provinsi);
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
        if ($this->session->userdata('modul')==7) {
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
                    $res = $this->kunjungan_model->cariSEPLokal($nojaminan,$tgl);
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
                        //         $rujukan = $this->kunjungan_model->cariRujukan($res_arr->response->noRujukan, 2);
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
    function carakeluar($idx){
        // $keadaankeluar=$this->kunjungan_model->getKeadaanKeluar($idx);
        $carakeluar=$this->kunjungan_model->getCaraKeluarById($idx);
        $carakeluar["keadaankeluar"]=$this->kunjungan_model->getKeadaanKeluar($idx);
        header('Content-Type: application/json');
        echo json_encode($carakeluar);
    }
    function pasienpulang(){
        if ($this->session->userdata('modul')==7) {
            // update log
            if($this->input->post("idcarakeluar")==4) $infomeninggal="required";
            else $infomeninggal="trim";
            $config = array(
                array(
                    'field' => 'idcarakeluar',
                    'label' => 'Status Keluar',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'idkeadaankeluar',
                    'label' => 'Keadaan Keluar',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'tglPulang',
                    'label' => 'Tanggal Pulang',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'noSuratMeninggal',
                    'label' => 'No Surat Meninggal',
                    'rules' => $infomeninggal
                ),
                array(
                    'field' => 'tglMeninggal',
                    'label' => 'Tanggal Meninggal',
                    'rules' => $infomeninggal
                )
            );
            
            $this->form_validation->set_rules($config);
            $this->form_validation->set_message('required', '%s Tidak Boleh Kosong');
            if ($this->form_validation->run() == FALSE)
            {
                $response=json_encode(array(
                    'metaData'=>array(
                        'code'=>202,
                        'message'=>"Data Belum Lengkap"
                    ),
                    'error'=>array(
                        'carakeluar'=>form_error('idcarakeluar'),
                        'keadaankeluar'=>form_error('idkeadaankeluar'),
                        'tglPulang'=>form_error('tglPulang'),
                        'noSuratMeninggal'=>form_error('noSuratMeninggal'),
                        'tglMeninggal'=>form_error('tglMeninggal'),
                    )
                ));
            }else{
                $logidx=$this->input->post('logidx');
                $log=array(
                    'tgl_keluar'=>$this->input->post('tglPulang'),
                    'idcarakeluar'=>$this->input->post('idcarakeluar'),
                    'carakeluar'=>$this->input->post('carakeluar'),
                    'idkeadaankeluar'=>$this->input->post('idkeadaankeluar'),
                    'keadaankeluar'=>$this->input->post('keadaankeluar'),
                    'keadaankeluar'=>$this->input->post('keadaankeluar'),
                    'noSuratMeninggal'=>$this->input->post('noSuratMeninggal'),
                    'tglMeninggal'=>$this->input->post('tglMeninggal'),
                    'noLPmanual'=>$this->input->post('noLPManual'),
                );
                $this->kunjungan_model->updateLogById($log,$logidx);
                // reset tt
                $this->kunjungan_model->resetTTlama($this->input->post("id_daftar"));
                // pemulangan Pasien Bridging Vclaim
                $noSep=$this->input->post('noSep');
                if(!empty($noSep)){
                    if($this->input->post('idcarakeluar')==4){
                        $noSuratMeninggal=$this->input->post("noSuratMeninggal");
                        $tglMeninggal=$this->input->post("tglMeninggal");
                    }else{
                        $noSuratMeninggal="";
                        $tglMeninggal="";
                    }
                    $jsonData=json_encode(array(
                        'request'=>array(
                            't_sep'=>array(
                                'noSep'=>$noSep,
                                'statusPulang'=>$this->input->post('idcarakeluar'),
                                'noSuratMeninggal'=>$noSuratMeninggal,
                                'tglMeninggal'=>$tglMeninggal,
                                'tglPulang'=>$this->input->post('tglPulang'),
                                'noLPManual'=>$this->input->post('noLPManual'),
                                'user'=>$this->session->userdata('userid'),
                            )
                        )
                    ));
                    $response=bridgingbpjs("SEP/2.0/updtglplg","PUT",$jsonData,"vclaim");
                }else{
                    $response=json_encode(array(
                        'metaData'=>array(
                            'code'=>200,
                            'message'=>"Pasien sudah dipulangkan melalui simrs"
                        )
                    ));
                }
                // update status pasien
                $statuspasien=array(
                    'statuspasien'=>4
                );
                $id=$this->input->post('idx');
                $this->kunjungan_model->updateKunjungan($statuspasien,$id);

                // Update Statu kunjungan lama

            }
        } else {
            $response=json_encode(array(
                'metaData'=>array(
                    'code'=>202,
                    'message'=>"Session Expired"
                )
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
    function simpanpermintaanlabor(){
        if ($this->session->userdata('modul')==7) {
            
            $config = array(
                array(
                    'field' => 'jenis_sample',
                    'label' => 'Jenis Sample',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'tglpengambilansample',
                    'label' => 'Tanggal Pengambilan Sample',
                    'rules' => 'required'
				),
                array(
                    'field' => 'diagnosa_keterangan_klinis',
                    'label' => 'Diagnosa atau keterangan klinis',
                    'rules' => 'required'
				)
            );
            
            $this->form_validation->set_rules($config);
            $this->form_validation->set_message('required', '%s Tidak Boleh Kosong');
            if ($this->form_validation->run() == FALSE)
            {
                $response=json_encode(array(
                    'metadata'=>array(
                        'code'=>202,
                        'message'=>"Data Belum Lengkap"
                    ),
                    'error'=>array(
                        'jenis_sample'=>form_error('jenis_sample'),
                        'tglpengambilansample'=>form_error('tglpengambilansample'),
                        'diagnosa_keterangan_klinis'=>form_error('diagnosa_keterangan_klinis'),
                        'pemeriksaan'=>form_error('pemeriksaan')
                    )
                ));
            }else{
				$row=$this->kunjungan_model->getKunjunganById($this->input->post('idx_pendaftaran'));
				if(!empty($row)){
					$kodedokter=$row->id_dokter;
					$namadokter=$row->nama_dokter;
				}else{
					$kodedokter="";
					$namadokter="";
				}
                $permintaan=array(
                    'idx_pendaftaran'=>$this->input->post('idx_pendaftaran'),
                    'tglminta'=>date('Y-m-d H:i:s'),
                    'nama'=>$this->input->post('nama'),
                    'tgllahir'=>$this->input->post('tgllahir'),
                    'jnskelamin'=>$this->input->post('jnskelamin'),
                    'id_ruang_asal'=>$this->input->post('id_ruang_asal'),
                    'nama_ruang_asal'=>$this->input->post('nama_ruang_asal'),
                    'diagnosa_keterangan_klinis'=>$this->input->post('diagnosa_keterangan_klinis'),
                    'jenis_sample'=>$this->input->post('jenis_sample'),
                    'tglpengambilansample'=>$this->input->post('tglpengambilansample'),
					'kodedokterpengirim'=>$kodedokter,
                    'namadokterpengirim'=>$namadokter,
                    'id_cara_bayar'=>$this->input->post('id_cara_bayar'),
                    'cara_bayar'=>$this->input->post('cara_bayar')
                );
                $idx=$this->input->post('idx');
                if(empty($idx)){
					$this->db->trans_start();
                    $idx=$this->kunjungan_model->kirimPermintaanLabor($permintaan);
					$pemeriksaan=$this->input->post('pemeriksaan');
					$datapemeriksaan=$this->kunjungan_model->getPemeriksaanLabor($pemeriksaan);
					foreach ($datapemeriksaan as $d ) {
						$detail[]=array(
							'idx_permintaan'=>$idx,
							'kode_pemeriksaan'=>$d->kode,
							'nama_pemeriksaan'=>$d->namapemeriksaan
						);
					}
					
					$this->kunjungan_model->simpanDetailPermintaanLabor($detail);
					$this->db->trans_complete();
					$response=json_encode(array(
						'metadata'=>array(
							'code'=>200,
							'message'=>"Permintaan labor berhasil disimpan apakah masih ada permintaan labor yang lain",
							'data'=>$this->kunjungan_model->getPermintaanLabor($idx)
						)
					));
                }else{
					$this->db->trans_start();
                    $this->kunjungan_model->updatePermintaanLabor($permintaan,$idx);
					$pemeriksaan=$this->input->post('pemeriksaan');
					$datapemeriksaan=$this->kunjungan_model->getPemeriksaanLabor($pemeriksaan);
					foreach ($datapemeriksaan as $d ) {
						$cek=$this->kunjungan_model->cekPemeriksaan($idx,$d->kode);
						if(empty($cek)){
							$detail[]=array(
								'idx_permintaan'=>$idx,
								'kode_pemeriksaan'=>$d->kode,
								'nama_pemeriksaan'=>$d->namapemeriksaan
							);
						}
						
					}
					if(!empty($detail)) $this->kunjungan_model->simpanDetailPermintaanLabor($detail);
					$this->db->trans_complete();
					$response=json_encode(array(
						'metadata'=>array(
							'code'=>200,
							'message'=>"Permintaan labor berhasil diubah",
							'data'=>$this->kunjungan_model->getPermintaanLabor($idx)
						)
					));
                }
            }
        } else {
            $response=json_encode(array(
                'metadata'=>array(
                    'code'=>202,
                    'message'=>"Session Expired"
                )
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
    function simpanpermintaanradiologi(){
        if ($this->session->userdata('modul')==7) {
            
            $config = array(
                array(
                    'field' => 'diagnosa',
                    'label' => 'Diagnosa',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'statuspemeriksaan',
                    'label' => 'Status Pemeriksaan',
                    'rules' => 'required'
				),
                array(
                    'field' => 'diagnosa_klinis',
                    'label' => 'Diagnosa klinis',
                    'rules' => 'required'
				)
            );
            
            $this->form_validation->set_rules($config);
            $this->form_validation->set_message('required', '%s Tidak Boleh Kosong');
            if ($this->form_validation->run() == FALSE)
            {
                $response=json_encode(array(
                    'metadata'=>array(
                        'code'=>202,
                        'message'=>"Data Belum Lengkap"
                    ),
                    'error'=>array(
                        'diagnosa'=>form_error('diagnosa'),
                        'statuspemeriksaan'=>form_error('statuspemeriksaan'),
                        'diagnosa_klinis'=>form_error('diagnosa_klinis'),
                        'pemeriksaan'=>form_error('pemeriksaan')
                    )
                ));
            }else{
				$row=$this->kunjungan_model->getKunjunganById($this->input->post('idx_pendaftaran'),'id_dokter,nama_dokter');
				if(!empty($row)){
					$kodedokter=$row->id_dokter;
					$namadokter=$row->nama_dokter;
				}else{
					$kodedokter="";
					$namadokter="";
				}
                $permintaan=array(
                    'idx_pendaftaran'=>$this->input->post('idx_pendaftaran'),
                    'nama'=>$this->input->post('nama'),
                    'tgllahir'=>$this->input->post('tgllahir'),
                    'jnskelamin'=>$this->input->post('jnskelamin'),
                    'id_ruang_asal'=>$this->input->post('id_ruang_asal'),
                    'nama_ruang_asal'=>$this->input->post('nama_ruang_asal'),
                    'diagnosa_klinis'=>$this->input->post('diagnosa_klinis'),
                    'diagnosa'=>$this->input->post('diagnosa'),
                    'tanggalorder'=>$this->input->post('tanggalorder'),
                    'id_cara_bayar'=>$this->input->post('id_cara_bayar'),
                    'cara_bayar'=>$this->input->post('cara_bayar'),
                    'statuspemeriksaan'=>$this->input->post('statuspemeriksaan'),
                    'kodedokterpengirim'=>$kodedokter,
                    'namadokterpengirim'=>$namadokter
                );
                $idx=$this->input->post('idx');
                if(empty($idx)){
					$this->db->trans_start();
                    $idx=$this->kunjungan_model->kirimPermintaanRadiologi($permintaan);
					$pemeriksaan=$this->input->post('pemeriksaan');
					$datapemeriksaan=$this->kunjungan_model->getPemeriksaanRadiologi($pemeriksaan);
					foreach ($datapemeriksaan as $d ) {
						$detail[]=array(
							'idx_permintaan'=>$idx,
							'kode_pemeriksaan'=>$d->kode,
							'nama_pemeriksaan'=>$d->namapemeriksaan
						);
					}
					
					$this->kunjungan_model->simpanDetailPermintaanRadiologi($detail);
					$this->db->trans_complete();
					$response=json_encode(array(
						'metadata'=>array(
							'code'=>200,
							'message'=>"Permintaan labor berhasil disimpan apakah masih ada permintaan radiologi yang lain",
							'data'=>$this->kunjungan_model->getPermintaanRadiologi($idx)
						)
					));
                }else{
					$this->db->trans_start();
                    $this->kunjungan_model->updatePermintaanRadiologi($permintaan,$idx);
					$pemeriksaan=$this->input->post('pemeriksaan');
					$datapemeriksaan=$this->kunjungan_model->getPemeriksaanRadiologi($pemeriksaan);
					foreach ($datapemeriksaan as $d ) {
						$cek=$this->kunjungan_model->cekPemeriksaanRadiologi($idx,$d->kode);
						if(empty($cek)){
							$detail[]=array(
								'idx_permintaan'=>$idx,
								'kode_pemeriksaan'=>$d->kode,
								'nama_pemeriksaan'=>$d->namapemeriksaan
							);
						}
						
					}
					// print_r($detail);exit;
					if(!empty($detail)) $this->kunjungan_model->simpanDetailPermintaanRadiologi($detail);
					$this->db->trans_complete();
					$response=json_encode(array(
						'metadata'=>array(
							'code'=>200,
							'message'=>"Permintaan labor berhasil diubah",
							'data'=>$this->kunjungan_model->getPermintaanRadiologi($idx)
						)
					));
                }
            }
        } else {
            $response=json_encode(array(
                'metadata'=>array(
                    'code'=>202,
                    'message'=>"Session Expired"
                )
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	
	function resep($idx_pendaftaran=""){
        if (!empty($this->session->userdata('modul'))) {
            // update log
			$jenisresep=$this->input->get('jenisresep');
			$data=$this->kunjungan_model->getResep($idx_pendaftaran,$jenisresep);
			if(!empty($data)){
				$response=json_encode(
					array(
						'status'=>true,
						'message'=>"OK",
						'data'=>$data
					)
				);
			}else{
				$response=json_encode(
					array(
						'status'=>false,
						'message'=>"Tidak Ada Data",
					)
				);
			}
            
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function allresep($idx_pendaftaran=""){
        if (!empty($this->session->userdata('modul'))) {
            
			$racikan=$this->kunjungan_model->getResep($idx_pendaftaran,'Racikan',1);
			$umum=$this->kunjungan_model->getResep($idx_pendaftaran,'Non Racikan',1);
			if(!empty($racikan)||!empty($umum)){
				$response=json_encode(
					array(
						'status'=>true,
						'message'=>"OK",
						'racikan'=>$racikan,
						'umum'=>$umum,
					)
				);
			}else{
				$response=json_encode(
					array(
						'status'=>false,
						'message'=>"Tidak Ada Data",
					)
				);
			}
            
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function permintaanlabor($idx_pendaftaran){
        if (!empty($this->session->userdata('modul'))) {
            // update log
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"OK",
					'data'=>$this->kunjungan_model->getListPermintaanLabor($idx_pendaftaran)
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function permintaankonsul($idx_pendaftaran){
        if (!empty($this->session->userdata('modul'))) {
            // update log
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"OK",
					'data'=>$this->kunjungan_model->getListPermintaanKonsul($idx_pendaftaran)
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function permintaanradiologi($idx_pendaftaran){
        if (!empty($this->session->userdata('modul'))) {
            // update log
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"OK",
					'data'=>$this->kunjungan_model->getListPermintaanRadiologi($idx_pendaftaran)
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function permintaanradiologidetail($idx_pendaftaran){
        if (!empty($this->session->userdata('modul'))) {
            // update log
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"OK",
					'data'=>$this->kunjungan_model->getListPermintaanRadiologiDetail($idx_pendaftaran)
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function ubahpermintaanlabor($idx){
        if (!empty($this->session->userdata('modul'))) {
            // update log
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"OK",
					'data'=>$this->kunjungan_model->getPermintaanLabor($idx)
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function ubahtindakan($idx){
        if (!empty($this->session->userdata('modul'))) {
            // update log
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"OK",
					'data'=>$this->kunjungan_model->getTindakanPasienById($idx)
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function ubahpermintaankonsul($idx){
        if (!empty($this->session->userdata('modul'))) {
            // update log
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"OK",
					'data'=>$this->kunjungan_model->getPermintaanKonsul($idx)
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function ubahpermintaanradiologi($idx){
        if (!empty($this->session->userdata('modul'))) {
            // update log
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"OK",
					'data'=>$this->kunjungan_model->getPermintaanRadiologi($idx)
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function hapusresep($idx){
        if (!empty($this->session->userdata('modul'))) {
            // update log
			$this->kunjungan_model->hapusResep($idx);
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"Resep Berhasil dihapus"
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function kirimpermintaanresep(){
		if (!empty($this->session->userdata('modul'))) {
            // update log
			$idx=$this->input->post('idx_resep');
			$data=array("statusresep"=>1);
			$this->kunjungan_model->updateResepMaster($data,$idx);
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"Resep Berhasil Dikirim"
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
	}
	function hapustindakan($idx){
        if (!empty($this->session->userdata('modul'))) {
            // update log
			$this->kunjungan_model->hapusTindakan($idx);
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"Resep Berhasil dihapus"
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function hapusdetailpemeriksaan($idx){
		if (!empty($this->session->userdata('modul'))) {
            // update log
			$this->kunjungan_model->hapusDetailPermintaan($idx);
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"Permintaan Labor Berhasil dihapus"
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
	}
	function hapusdetailpemeriksaanradiologi($idx){
		if (!empty($this->session->userdata('modul'))) {
            // update log
			$this->kunjungan_model->hapusDetailPermintaanRadiologi($idx);
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"Permintaan Labor Berhasil dihapus"
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
	}
	function hapuspermintaan($idx){
        if (!empty($this->session->userdata('modul'))) {
            // update log
			$this->kunjungan_model->hapusPermintaanLabor($idx);
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"Permintaan Labor Berhasil dihapus"
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function hapuspermintaanradiologi($idx){
        if (!empty($this->session->userdata('modul'))) {
            // update log
			$this->kunjungan_model->hapusPermintaanRadiologi($idx);
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"Permintaan Radiologi Berhasil dihapus"
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function hapuspermintaankonsul($idx){
        if (!empty($this->session->userdata('modul'))) {
            // update log
			$this->kunjungan_model->hapusPermintaanKonsul($idx);
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"Permintaan Konsul Berhasil dihapus"
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function dokter(){
        if (!empty($this->session->userdata('modul'))) {
            // update log
			$tgl=$this->input->get("tgl");
			$ruang=$this->input->get("ruang");
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"OK",
					'data'=>$this->kunjungan_model->getJadwalDokter($tgl,$ruang)
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function layanan(){
        if (!empty($this->session->userdata('modul'))) {
            // update log
			$kategori=$this->input->get("kategori");
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"OK",
					'data'=>$this->kunjungan_model->getLayanan($kategori)
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function simpantindakan(){
        if (!empty($this->session->userdata('modul'))) {
            // update log
			$config = array(
                array(
                    'field' => 'kodetindakan',
                    'label' => 'Tindakan',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'kodekategori',
                    'label' => 'Kategori',
                    'rules' => 'required'
                ),
                array(
                    'field' => 'kodepetugas',
                    'label' => 'Petugas',
                    'rules' => 'required'
				)
            );
            $this->form_validation->set_rules($config);
            $this->form_validation->set_message('required', '%s Tidak Boleh Kosong');
            if ($this->form_validation->run() == FALSE)
            {
				$response=json_encode(
					array(
						'status'=>false,
						'message'=>"Data belum lengkap",
						'error'=>array(
							'kodetindakan'=>form_error('kodetindakan'),
							'kodekategori'=>form_error('kodekategori'),
							'kodepetugas'=>form_error('kodepetugas'),
						)
					)
				);
				
			}else{
				$tarif=$this->kunjungan_model->getTarif($this->input->post('kodetindakan'));
				$t=!empty($tarif)?$tarif->tarif:0;
				$data=array(
					'idx_pendaftaran'=>$this->input->post('idx_pendaftaran'),
					'id_daftar'=>$this->input->post('id_daftar'),
					'reg_unit'=>$this->input->post('reg_unit'),
					'kodekategori'=>$this->input->post('kodekategori'),
					'kategoritindakan'=>$this->input->post('kategoritindakan'),
					'kodetindakan'=>$this->input->post('kodetindakan'),
					'namatindakan'=>$this->input->post('namatindakan'),
					'kodepetugas'=>$this->input->post('kodepetugas'),
					'namapetugas'=>$this->input->post('namapetugas'),
					'jml'=>1,
					'tarif'=>$t
				);
				$idx=$this->input->post("idx");
				if(empty($idx)) $this->kunjungan_model->insertTindakan($data);
				else $this->kunjungan_model->updateTindakan($data,$idx);
				$response=json_encode(
					array(
						'status'=>true,
						'message'=>"OK"
					)
				);
			}
			
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
    }
	function datatindakan($idx){
		if (!empty($this->session->userdata('modul'))) {
            // update log
            $response=json_encode(
				array(
					'status'=>true,
					'message'=>"OK",
					'data'=>$this->kunjungan_model->getTindakanPasien($idx)
				)
			);
        } else {
            $response=json_encode(array(
                'status'=>false,
				'message'=>'Session Expired'
            ));
        }
        header('Content-Type: application/json');
        echo $response;
	}
}
