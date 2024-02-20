<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Jadwal extends CI_Controller{
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
            'contentTitle'=>'List Jadwal',
            'ruang'=>$this->jkn_model->getPoly(),
            'dokter'=>$this->jkn_model->getDokter(array(1,2,19))
        );

        $view=array(
            'header'=>$this->load->view('template/header', '', true),
            'nav_sidebar'=>$this->load->view('template/nav_sidebar', array(), true),
            'content'=>$this->load->view('jkn/jadwal', $data, true),
            'index_menu'=>9,
            'lib'=>array(
                'javascript/jadwal.js'
            )
        );
        $this->load->view('template/theme', $view);
    }
    
    function getdata()
    {
        $q = urldecode($this->input->get('keyword', TRUE));
            $start = intval($this->input->get('start'));
            $limit = intval($this->input->get('limit'));
            $poli = intval($this->input->get('poli'));
            $dokter = $this->input->get('dokter');
            $hari = $this->input->get('hari');
            $mulai = ($start * $limit) - $limit;
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'start'     => $mulai,
                'row_count' => $this->jkn_model->countDataJadwal($q,$poli,$dokter,$hari),
                'limit'     => $limit,
                'data'      => $this->jkn_model->getDataJadwal($limit, $mulai, $q,$poli,$dokter,$hari),
            );
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function datadokter(){
        $poli=$this->input->get('poli');
        $dokter=$this->db->where_in("profId",array(1,2))->get("pegawai")->result();

        $ruang=$this->db->where('idx',$poli)->where("status_ruang",1)->get('ruang')->row();
        header('Content-Type: application/json');
        echo json_encode(array('dokter'=>$dokter,'ruang'=>$ruang));
    }
    function datajadwaldokter(){
        $poli=$this->input->get('poli');
        $dokter=$this->input->get('dokter');
        $jadwal=$this->jkn_model->getJadwalDokter($poli,$dokter);
        header('Content-Type: application/json');
        echo json_encode(array('jadwal'=>$jadwal,'dokter'=>$this->jkn_model->getDokterByNrp($dokter)));
    }
    function simpanjadwal1(){
        // Update Jadwal jkn Mobile
        $seninaktif=$this->input->post('seninaktif');
        $selasaaktif=$this->input->post('selasaaktif');
        $rabuaktif=$this->input->post('rabuaktif');
        $kamisaktif=$this->input->post('kamisaktif');
        $jumataktif=$this->input->post('jumataktif');
        $sabtuaktif=$this->input->post('sabtuaktif');
        $mingguaktif=$this->input->post('mingguaktif');
        if(!empty($seninaktif)){
            $jadwal[]=array(
                'hari'=>$seninaktif,
                'buka'=>substr($this->input->post('seninbuka'),0,5),
                'tutup'=>substr($this->input->post('senintutup'),0,5),
            );
        }
        if(!empty($selasaaktif)){
            // echo $selasaaktif; exit;
            $jadwal[]=array(
                'hari'=>$selasaaktif,
                'buka'=>substr($this->input->post('selasabuka'),0,5),
                'tutup'=>substr($this->input->post('selasatutup'),0,5),
            );
        }
        if(!empty($rabuaktif)){
            $jadwal[]=array(
                'hari'=>$rabuaktif,
                'buka'=>substr($this->input->post('rabubuka'),0,5),
                'tutup'=>substr($this->input->post('rabututup'),0,5),
            );
        }
        if(!empty($kamisaktif)){
            $jadwal[]=array(
                'hari'=>$kamisaktif,
                'buka'=>substr($this->input->post('kamisbuka'),0,5),
                'tutup'=>substr($this->input->post('kamistutup'),0,5),
            );
        }
        if(!empty($jumataktif)){
            $jadwal[]=array(
                'hari'=>$jumataktif,
                'buka'=>substr($this->input->post('jumatbuka'),0,5),
                'tutup'=>substr($this->input->post('jumattutup'),0,5),
            );
        }
        if(!empty($sabtuaktif)){
            $jadwal[]=array(
                'hari'=>$sabtuaktif,
                'buka'=>substr($this->input->post('sabtubuka'),0,5),
                'tutup'=>substr($this->input->post('sabtututup'),0,5),
            );
        }
        if(!empty($mingguaktif)){
            $jadwal[]=array(
                'hari'=>$mingguaktif,
                'buka'=>substr($this->input->post('minggubuka'),0,5),
                'tutup'=>substr($this->input->post('minggututup'),0,5),
            );
        }

		$kodepoli=$this->input->post('kodepolijkn');
        $kodesubspesialis=$this->input->post('subspesialis');
        $kodedokter=$this->input->post('kodedokterjkn');
        if(!empty($jadwal)){
            // Update Jadwal senin
			$req=array(
				'kodepoli'=>$kodepoli,
				'kodesubspesialis'=>$kodesubspesialis,
				'kodedokter'=>$kodedokter,
				'jadwal'=>$jadwal
			);
			$res=bridgingbpjs("jadwaldokter/updatejadwaldokter","POST",json_encode($req),"antrian");
			$response=json_decode($res);
			if($response->metadata->code==200){
				$sen=$this->jkn_model->cekjadwalpoli($this->input->post('kodedokterrs'),$this->input->post('kodepolirs'),'Senin');
				$waktu_awal =strtotime($this->input->post('seninbuka'));
				$waktu_akhir=strtotime($this->input->post('senintutup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				$nama_dokter=getField2('pgwNama',array('nrp'=>$this->input->post('kodedokterrs')),'pegawai');
				$polynama=getField2('ruang',array('idx'=>$this->input->post('kodepolirs')),'ruang');
				if(empty($sen)){
					// Jika Belum Ada Jadwal Senin
					if($seninaktif==1){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'jadwal_dokter_id'=>$this->input->post('kodedokterrs'),
							'jadwal_dokter_nama'=>$nama_dokter,
							'jadwal_poly_nama'=>$polynama,
							'jadwal_poly_id'=>$this->input->post('kodepolirs'),
							'jadwal_hari'=>'Senin',
							'jadwal_jam_mulai'=>$this->input->post('seninbuka'),
							'jadwal_jam_selesai'=>$this->input->post('senintutup'),
							'jadwal_checkin'=>'07:30',
							'jadwal_pekan'=>0,
							'dokterjkn'=>$kodedokter,
							'jadwal_polijkn'=>$kodesubspesialis,
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'jadwal_status'=>'Aktif',
							'updated_at'=>date('Y-m-d H:i:s'),
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->insert('jkn_jadwalhafis',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($seninaktif==1){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal_jam_mulai'=>$this->input->post('seninbuka'),
							'jadwal_jam_selesai'=>$this->input->post('senintutup'),
							'jadwal_status'=>'Aktif',
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Senin')
						->update('jkn_jadwalhafis',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('jadwal_status'=>'Non Aktif');
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Senin')
						->update('jkn_jadwalhafis',$jadwalstatus);
					}
				}
				// Update Jadwal Selasa
				$sel=$this->jkn_model->cekjadwalpoli($this->input->post('kodedokterrs'),$this->input->post('kodepolirs'),'Selasa');
				$waktu_awal =strtotime($this->input->post('selasabuka'));
				$waktu_akhir=strtotime($this->input->post('selasatutup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($sel)){
					// Jika Belum Ada Jadwal Senin
					if($selasaaktif==2){
						// Insert Jadwal Simrs
						
						$jadwalsim=array(
							'jadwal_dokter_id'=>$this->input->post('kodedokterrs'),
							'jadwal_poly_id'=>$this->input->post('kodepolirs'),
							'jadwal_dokter_nama'=>$nama_dokter,
							'jadwal_poly_nama'=>$polynama,
							'jadwal_hari'=>'Selasa',
							'jadwal_jam_mulai'=>$this->input->post('selasabuka'),
							'jadwal_jam_selesai'=>$this->input->post('selasatutup'),
							'jadwal_checkin'=>'07:30',
							'jadwal_pekan'=>0,
							'dokterjkn'=>$kodedokter,
							'jadwal_polijkn'=>$kodesubspesialis,
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'jadwal_status'=>'Aktif',
							'updated_at'=>date('Y-m-d H:i:s'),
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->insert('jkn_jadwalhafis',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($selasaaktif==2){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal_jam_mulai'=>$this->input->post('selasabuka'),
							'jadwal_jam_selesai'=>$this->input->post('selasatutup'),
							
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'jadwal_status'=>'Aktif',
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Selasa')
						->update('jkn_jadwalhafis',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('jadwal_status'=>'Non Aktif');
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Selasa')
						->update('jkn_jadwalhafis',$jadwalstatus);
					}
				}
				// Update Jadwal Rabu
				$rab=$this->jkn_model->cekjadwalpoli($this->input->post('kodedokterrs'),$this->input->post('kodepolirs'),'Rabu');
				$waktu_awal =strtotime($this->input->post('rabubuka'));
				$waktu_akhir=strtotime($this->input->post('rabututup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($rab)){
					// Jika Belum Ada Jadwal Senin
					if($rabuaktif==3){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'jadwal_dokter_id'=>$this->input->post('kodedokterrs'),
							'jadwal_poly_id'=>$this->input->post('kodepolirs'),
							'jadwal_hari'=>'Rabu',
							'jadwal_dokter_nama'=>$nama_dokter,
							'jadwal_poly_nama'=>$polynama,
							'jadwal_jam_mulai'=>$this->input->post('rabubuka'),
							'jadwal_jam_selesai'=>$this->input->post('rabututup'),
							'jadwal_checkin'=>'07:30',
							'dokterjkn'=>$kodedokter,
							'jadwal_polijkn'=>$kodesubspesialis,
							'jadwal_pekan'=>0,
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'jadwal_status'=>'Aktif',
							'updated_at'=>date('Y-m-d H:i:s'),
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->insert('jkn_jadwalhafis',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($rabuaktif==3){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal_jam_mulai'=>$this->input->post('rabubuka'),
							'jadwal_jam_selesai'=>$this->input->post('rabututup'),
							'jadwal_status'=>'Aktif',
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Rabu')
						->update('jkn_jadwalhafis',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						
						$jadwalstatus=array('jadwal_status'=>'Non Aktif');
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Rabu')
						->update('jkn_jadwalhafis',$jadwalstatus);
					}
				}
				// Update Jadwal Kamis
				$kam=$this->jkn_model->cekjadwalpoli($this->input->post('kodedokterrs'),$this->input->post('kodepolirs'),'Kamis');
				$waktu_awal =strtotime($this->input->post('kamisbuka'));
				$waktu_akhir=strtotime($this->input->post('kamistutup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($kam)){
					// Jika Belum Ada Jadwal Senin
					if($kamisaktif==4){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'jadwal_dokter_id'=>$this->input->post('kodedokterrs'),
							'jadwal_poly_id'=>$this->input->post('kodepolirs'),
							'jadwal_dokter_nama'=>$nama_dokter,
							'jadwal_poly_nama'=>$polynama,
							'jadwal_hari'=>'Kamis',
							'jadwal_jam_mulai'=>$this->input->post('kamisbuka'),
							'jadwal_jam_selesai'=>$this->input->post('kamistutup'),
							'jadwal_checkin'=>'07:30',
							'jadwal_pekan'=>0,
							'dokterjkn'=>$kodedokter,
							'jadwal_polijkn'=>$kodesubspesialis,
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'jadwal_status'=>'Aktif',
							'updated_at'=>date('Y-m-d H:i:s'),
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->insert('jkn_jadwalhafis',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($kamisaktif==4){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal_jam_mulai'=>$this->input->post('kamisbuka'),
							'jadwal_jam_selesai'=>$this->input->post('kamistutup'),
							'jadwal_status'=>'Aktif',
							
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Kamis')
						->update('jkn_jadwalhafis',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('jadwal_status'=>'Non Aktif');
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Kamis')
						->update('jkn_jadwalhafis',$jadwalstatus);
					}
				}
				// Update Jadwal Jumat
				$jum=$this->jkn_model->cekjadwalpoli($this->input->post('kodedokterrs'),$this->input->post('kodepolirs'),'Jumat');
				$waktu_awal =strtotime($this->input->post('jumatbuka'));
				$waktu_akhir=strtotime($this->input->post('jumattutup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($jum)){
					// Jika Belum Ada Jadwal Senin
					if($jumataktif==5){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'jadwal_dokter_id'=>$this->input->post('kodedokterrs'),
							'jadwal_poly_id'=>$this->input->post('kodepolirs'),
							'jadwal_dokter_nama'=>$nama_dokter,
							'jadwal_poly_nama'=>$polynama,
							'jadwal_hari'=>'Jumat',
							'jadwal_jam_mulai'=>$this->input->post('jumatbuka'),
							'jadwal_jam_selesai'=>$this->input->post('jumattutup'),
							'jadwal_checkin'=>'07:30',
							'jadwal_pekan'=>0,
							'dokterjkn'=>$kodedokter,
							'jadwal_polijkn'=>$kodesubspesialis,
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'jadwal_status'=>'Aktif',
							'updated_at'=>date('Y-m-d H:i:s'),
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->insert('jkn_jadwalhafis',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($jumataktif==5){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal_jam_mulai'=>$this->input->post('jumatbuka'),
							'jadwal_jam_selesai'=>$this->input->post('jumattutup'),
							'jadwal_status'=>'Aktif',
							
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Jumat')
						->update('jkn_jadwalhafis',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('jadwal_status'=>'Non Aktif');
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Jumat')
						->update('jkn_jadwalhafis',$jadwalstatus);
					}
				}
				// Update Jadwal Sabtu
				$sab=$this->jkn_model->cekjadwalpoli($this->input->post('kodedokterrs'),$this->input->post('kodepolirs'),'Sabtu');
				$waktu_awal =strtotime($this->input->post('sabtubuka'));
				$waktu_akhir=strtotime($this->input->post('sabtututup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($sab)){
					// Jika Belum Ada Jadwal Senin
					if($sabtuaktif==6){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'jadwal_dokter_id'=>$this->input->post('kodedokterrs'),
							'jadwal_poly_id'=>$this->input->post('kodepolirs'),
							'jadwal_dokter_nama'=>$nama_dokter,
							'jadwal_poly_nama'=>$polynama,
							'jadwal_hari'=>'Sabtu',
							'jadwal_jam_mulai'=>$this->input->post('sabtubuka'),
							'jadwal_jam_selesai'=>$this->input->post('sabtututup'),
							'jadwal_checkin'=>'07:30',
							'jadwal_pekan'=>0,
							'dokterjkn'=>$kodedokter,
							'jadwal_polijkn'=>$kodesubspesialis,
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'jadwal_status'=>'Aktif',
							'updated_at'=>date('Y-m-d H:i:s'),
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->insert('jkn_jadwalhafis',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($sabtuaktif==6){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal_jam_mulai'=>$this->input->post('sabtubuka'),
							'jadwal_jam_selesai'=>$this->input->post('sabtututup'),
							'jadwal_status'=>'Aktif',
							
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Sabtu')
						->update('jkn_jadwalhafis',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('jadwal_status'=>'Non Aktif');
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Sabtu')
						->update('jkn_jadwalhafis',$jadwalstatus);
					}
				}
				// Update Jadwal Minggu
				$minggu=$this->jkn_model->cekjadwalpoli($this->input->post('kodedokterrs'),$this->input->post('kodepolirs'),'Minggu');
				$waktu_awal =strtotime($this->input->post('minggubuka'));
				$waktu_akhir=strtotime($this->input->post('minggututup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($minggu)){
					// Jika Belum Ada Jadwal Senin
					if($mingguaktif==7){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'jadwal_dokter_id'=>$this->input->post('kodedokterrs'),
							'jadwal_poly_id'=>$this->input->post('kodepolirs'),
							'jadwal_dokter_nama'=>$nama_dokter,
							'jadwal_poly_nama'=>$polynama,
							'jadwal_hari'=>'Minggu',
							'jadwal_jam_mulai'=>$this->input->post('minggubuka'),
							'jadwal_jam_selesai'=>$this->input->post('minggututup'),
							'jadwal_checkin'=>'07:30',
							'jadwal_pekan'=>0,
							'dokterjkn'=>$kodedokter,
							'jadwal_polijkn'=>$kodesubspesialis,
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'jadwal_status'=>'Aktif',
							'updated_at'=>date('Y-m-d H:i:s'),
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->insert('jkn_jadwalhafis',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($mingguaktif==7){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal_jam_mulai'=>$this->input->post('minggubuka'),
							'jadwal_jam_selesai'=>$this->input->post('minggututup'),
							'jadwal_status'=>'Aktif',
							
							'kuotajkn'=>$kuotajkn,
							'kuotanonjkn'=>$kuotanonjkn,
							'updated_at'=>date('Y-m-d H:i:s')
						);
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Minggu')
						->update('jkn_jadwalhafis',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('jadwal_status'=>'Non Aktif');
						$this->db->where('jadwal_dokter_id',$this->input->post('kodedokterrs'))
						->where('jadwal_poly_id',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Minggu')
						->update('jkn_jadwalhafis',$jadwalstatus);
					}
				}
			}else{
				$response=array(
					'metadata'=>$response->metadata,
					'request'=>$req
				);
			}
            
            // $response=array(
            //     'metadata'=>array('code'=>200,'message'=>'Simpan Jadwal Berhasil')
            // );
            
            
        }else{
            $response=array(
                'metadata'=>array('code'=>201,'message'=>'Data Jadwal Tidak ada')
            );
        }
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function simpanjadwal(){
        // Update Jadwal jkn Mobile
        $seninaktif=$this->input->post('seninaktif');
        $selasaaktif=$this->input->post('selasaaktif');
        $rabuaktif=$this->input->post('rabuaktif');
        $kamisaktif=$this->input->post('kamisaktif');
        $jumataktif=$this->input->post('jumataktif');
        $sabtuaktif=$this->input->post('sabtuaktif');
        $mingguaktif=$this->input->post('mingguaktif');
        if(!empty($seninaktif)){
            $jadwal[]=array(
                'hari'=>$seninaktif,
                'buka'=>substr($this->input->post('seninbuka'),0,5),
                'tutup'=>substr($this->input->post('senintutup'),0,5),
            );
        }
        if(!empty($selasaaktif)){
            // echo $selasaaktif; exit;
            $jadwal[]=array(
                'hari'=>$selasaaktif,
                'buka'=>substr($this->input->post('selasabuka'),0,5),
                'tutup'=>substr($this->input->post('selasatutup'),0,5),
            );
        }
        if(!empty($rabuaktif)){
            $jadwal[]=array(
                'hari'=>$rabuaktif,
                'buka'=>substr($this->input->post('rabubuka'),0,5),
                'tutup'=>substr($this->input->post('rabututup'),0,5),
            );
        }
        if(!empty($kamisaktif)){
            $jadwal[]=array(
                'hari'=>$kamisaktif,
                'buka'=>substr($this->input->post('kamisbuka'),0,5),
                'tutup'=>substr($this->input->post('kamistutup'),0,5),
            );
        }
        if(!empty($jumataktif)){
            $jadwal[]=array(
                'hari'=>$jumataktif,
                'buka'=>substr($this->input->post('jumatbuka'),0,5),
                'tutup'=>substr($this->input->post('jumattutup'),0,5),
            );
        }
        if(!empty($sabtuaktif)){
            $jadwal[]=array(
                'hari'=>$sabtuaktif,
                'buka'=>substr($this->input->post('sabtubuka'),0,5),
                'tutup'=>substr($this->input->post('sabtututup'),0,5),
            );
        }
        if(!empty($mingguaktif)){
            $jadwal[]=array(
                'hari'=>$mingguaktif,
                'buka'=>substr($this->input->post('minggubuka'),0,5),
                'tutup'=>substr($this->input->post('minggututup'),0,5),
            );
        }
		// echo json_encode($jadwal); exit;
		$kodepoli=$this->input->post('kodepolijkn');
        $kodesubspesialis=$this->input->post('subspesialis');
        $kodedokter=$this->input->post('kodedokterjkn');
		if(empty($kodepoli)) $kodepoli=getCustomeField("kodepolijkn",array("idx"=>$this->input->post('kodepolirs')),"tbl_ruang");
		if(empty($kodesubspesialis)) $kodesubspesialis=getCustomeField("kodejkn",array("idx"=>$this->input->post('kodepolirs')),"tbl_ruang");
		if(empty($kodedokter)) $kodedokter=getCustomeField("kode",array("kodedokterrs"=>$this->input->post('kodedokterrs')),"jkn_dokter");
        if(!empty($jadwal)){
            // Update Jadwal senin
			$req=array(
				'kodepoli'=>$kodepoli,
				'kodesubspesialis'=>$kodesubspesialis,
				'kodedokter'=>$kodedokter,
				'jadwal'=>$jadwal
			);
			// echo json_encode($req); exit;
			$res=bridgingbpjs("jadwaldokter/updatejadwaldokter","POST",json_encode($req),"antrian");
			$response=json_decode($res);
			if($response->metadata->code==200){
				// if(true){
				$sen=$this->jkn_model->cekjadwalpoli($kodedokter,$kodepoli,'SENIN');
				
				$waktu_awal =strtotime($this->input->post('seninbuka'));
				$waktu_akhir=strtotime($this->input->post('senintutup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				$nama_dokter=getField2('pgwNama',array('nrp'=>$this->input->post('kodedokterrs')),'pegawai');
				$polynama=getField2('ruang',array('idx'=>$this->input->post('kodepolirs')),'ruang');
				if(empty($sen)){
					// Jika Belum Ada Jadwal Senin
					if($seninaktif==1){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'kodesubspesialis'=>$kodesubspesialis,
							'namasubspesialis'=>$polynama,
							'kodepoli'=>$kodepoli,
							'kodepolirs'=>$this->input->post('kodepolirs'),
							'namapoli'=>$polynama,
							'kodedokterrs'=>$this->input->post('kodedokterrs'),
							'kodedokter'=>$kodedokter,
							'namadokter'=>$nama_dokter,
							'hari'=>'1',
							'namahari'=>'SENIN',
							'jadwal'=>$this->input->post('seninbuka')."-".$this->input->post('senintutup'),
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
							'libur'=>0,
							'pekan'=>0,
							'status'=>1,
						);
						echo json_encode($jadwalsim); exit;
						$this->db->insert('jkn_jadwaldokter1',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($seninaktif==1){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal'=>$this->input->post('seninbuka')."-".$this->input->post('senintutup'),
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
							'status'=>1,
						);
						$this->db->where('kodedokter',$kodedokter)
						->where('kodesubspesialis',$kodesubspesialis)
						->where('namahari','SENIN')
						->update('jkn_jadwaldokter',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('status'=>0);
						$this->db->where('kodedokterrs',$this->input->post('kodedokterrs'))
						->where('kodepolirs',$this->input->post('kodepolirs'))
						->where('jadwal_hari','Senin')
						->update('jkn_jadwalhafis',$jadwalstatus);
					}
				}
				// Update Jadwal Selasa
				$sel=$this->jkn_model->cekjadwalpoli($kodedokter,$kodepoli,'SELASA');
				$waktu_awal =strtotime($this->input->post('selasabuka'));
				$waktu_akhir=strtotime($this->input->post('selasatutup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($sel)){
					// Jika Belum Ada Jadwal Senin
					if($selasaaktif==1){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'kodesubspesialis'=>$kodesubspesialis,
							'namasubspesialis'=>$polynama,
							'kodepoli'=>$kodepoli,
							'kodepolirs'=>$this->input->post('kodepolirs'),
							'namapoli'=>$polynama,
							'kodedokterrs'=>$this->input->post('kodedokterrs'),
							'kodedokter'=>$kodedokter,
							'namadokter'=>$nama_dokter,
							'hari'=>'2',
							'namahari'=>'SELASA',
							'jadwal'=>$this->input->post('selasabuka')."-".$this->input->post('selasatutup'),
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
							'libur'=>0,
							'pekan'=>0,
							'status'=>1,
						);
						$this->db->insert('jkn_jadwaldokter',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($selasaaktif==1){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal'=>$this->input->post('selasabuka')."-".$this->input->post('selasatutup'),
							'status'=>1,
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
						);
						$this->db->where('kodedokter',$kodedokter)
						->where('kodesubspesialis',$kodesubspesialis)
						->where('namahari','SELASA')
						->update('jkn_jadwaldokter',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('status'=>0);
						$this->db->where('kodedokterrs',$this->input->post('kodedokterrs'))
						->where('kodepolirs',$this->input->post('kodepolirs'))
						->where('namahari','SELASA')
						->update('jkn_jadwaldokter',$jadwalstatus);
					}
				}
				// Update Jadwal Rabu
				$rab=$this->jkn_model->cekjadwalpoli($kodedokter,$kodepoli,'RABU');
				$waktu_awal =strtotime($this->input->post('rabubuka'));
				$waktu_akhir=strtotime($this->input->post('rabututup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($rab)){
					// Jika Belum Ada Jadwal Senin
					if($rabuaktif==1){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'kodesubspesialis'=>$kodesubspesialis,
							'namasubspesialis'=>$polynama,
							'kodepoli'=>$kodepoli,
							'kodepolirs'=>$this->input->post('kodepolirs'),
							'namapoli'=>$polynama,
							'kodedokterrs'=>$this->input->post('kodedokterrs'),
							'kodedokter'=>$kodedokter,
							'namadokter'=>$nama_dokter,
							'hari'=>'3',
							'namahari'=>'RABU',
							'jadwal'=>$this->input->post('rabubuka')."-".$this->input->post('rabututup'),
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
							'libur'=>0,
							'pekan'=>0,
							'status'=>1,
						);
						$this->db->insert('jkn_jadwaldokter',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($rabuaktif==1){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal'=>$this->input->post('rabubuka')."-".$this->input->post('rabututup'),
							'status'=>1,
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
						);
						$this->db->where('kodedokter',$kodedokter)
						->where('kodesubspesialis',$kodesubspesialis)
						->where('namahari','RABU')
						->update('jkn_jadwaldokter',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('status'=>0);
						$this->db->where('kodedokterrs',$this->input->post('kodedokterrs'))
						->where('kodepolirs',$this->input->post('kodepolirs'))
						->where('namahari','RABU')
						->update('jkn_jadwaldokter',$jadwalstatus);
					}
				}
				// Update Jadwal Kamis
				$kam=$this->jkn_model->cekjadwalpoli($kodedokter,$kodepoli,'KAMIS');
				$waktu_awal =strtotime($this->input->post('kamisbuka'));
				$waktu_akhir=strtotime($this->input->post('kamistutup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($kam)){
					// Jika Belum Ada Jadwal Senin
					if($kamisaktif==1){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'kodesubspesialis'=>$kodesubspesialis,
							'namasubspesialis'=>$polynama,
							'kodepoli'=>$kodepoli,
							'kodepolirs'=>$this->input->post('kodepolirs'),
							'namapoli'=>$polynama,
							'kodedokterrs'=>$this->input->post('kodedokterrs'),
							'kodedokter'=>$kodedokter,
							'namadokter'=>$nama_dokter,
							'hari'=>'4',
							'namahari'=>'KAMIS',
							'jadwal'=>$this->input->post('kamisbuka')."-".$this->input->post('kamistutup'),
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
							'libur'=>0,
							'pekan'=>0,
							'status'=>1,
						);
						$this->db->insert('jkn_jadwaldokter',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($kamisaktif==1){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal'=>$this->input->post('kamisbuka')."-".$this->input->post('kamistutup'),
							'status'=>1,
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
						);
						$this->db->where('kodedokter',$kodedokter)
						->where('kodesubspesialis',$kodesubspesialis)
						->where('namahari','KAMIS')
						->update('jkn_jadwaldokter',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('status'=>0);
						$this->db->where('kodedokterrs',$this->input->post('kodedokterrs'))
						->where('kodepolirs',$this->input->post('kodepolirs'))
						->where('namahari','KAMIS')
						->update('jkn_jadwaldokter',$jadwalstatus);
					}
				}
				// Update Jadwal Jumat
				$jum=$this->jkn_model->cekjadwalpoli($kodedokter,$kodepoli,'JUMAT');
				$waktu_awal =strtotime($this->input->post('jumatbuka'));
				$waktu_akhir=strtotime($this->input->post('jumattutup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($jum)){
					// Jika Belum Ada Jadwal Senin
					if($jumataktif==1){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'kodesubspesialis'=>$kodesubspesialis,
							'namasubspesialis'=>$polynama,
							'kodepoli'=>$kodepoli,
							'kodepolirs'=>$this->input->post('kodepolirs'),
							'namapoli'=>$polynama,
							'kodedokterrs'=>$this->input->post('kodedokterrs'),
							'kodedokter'=>$kodedokter,
							'namadokter'=>$nama_dokter,
							'hari'=>'5',
							'namahari'=>'JUMAT',
							'jadwal'=>$this->input->post('jumatbuka')."-".$this->input->post('jumattutup'),
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
							'libur'=>0,
							'pekan'=>0,
							'status'=>1,
						);
						$this->db->insert('jkn_jadwaldokter',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($jumataktif==1){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal'=>$this->input->post('jumatbuka')."-".$this->input->post('jumattutup'),
							'status'=>1,
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
						);
						$this->db->where('kodedokter',$kodedokter)
						->where('kodesubspesialis',$kodesubspesialis)
						->where('namahari','JUMAT')
						->update('jkn_jadwaldokter',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('status'=>0);
						$this->db->where('kodedokterrs',$this->input->post('kodedokterrs'))
						->where('kodepolirs',$this->input->post('kodepolirs'))
						->where('namahari','JUMAT')
						->update('jkn_jadwaldokter',$jadwalstatus);
					}
				}
				// Update Jadwal Sabtu
				$sab=$this->jkn_model->cekjadwalpoli($kodedokter,$kodepoli,'SABTU');
				$waktu_awal =strtotime($this->input->post('sabtubuka'));
				$waktu_akhir=strtotime($this->input->post('sabtututup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($sab)){
					// Jika Belum Ada Jadwal Senin
					if($sabtuaktif==1){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'kodesubspesialis'=>$kodesubspesialis,
							'namasubspesialis'=>$polynama,
							'kodepoli'=>$kodepoli,
							'kodepolirs'=>$this->input->post('kodepolirs'),
							'namapoli'=>$polynama,
							'kodedokterrs'=>$this->input->post('kodedokterrs'),
							'kodedokter'=>$kodedokter,
							'namadokter'=>$nama_dokter,
							'hari'=>'6',
							'namahari'=>'SABTU',
							'jadwal'=>$this->input->post('sabtubuka')."-".$this->input->post('sabtututup'),
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
							'libur'=>0,
							'pekan'=>0,
							'status'=>1,
						);
						$this->db->insert('jkn_jadwaldokter',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($sabtuaktif==1){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal'=>$this->input->post('sabtubuka')."-".$this->input->post('sabtututup'),
							'status'=>1,
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
						);
						$this->db->where('kodedokter',$kodedokter)
						->where('kodesubspesialis',$kodesubspesialis)
						->where('namahari','SABTU')
						->update('jkn_jadwaldokter',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('status'=>0);
						$this->db->where('kodedokterrs',$this->input->post('kodedokterrs'))
						->where('kodepolirs',$this->input->post('kodepolirs'))
						->where('namahari','SABTU')
						->update('jkn_jadwaldokter',$jadwalstatus);
					}
				}
				// Update Jadwal Minggu
				$minggu=$this->jkn_model->cekjadwalpoli($kodedokter,$kodepoli,'MINGGU');
				$waktu_awal =strtotime($this->input->post('minggubuka'));
				$waktu_akhir=strtotime($this->input->post('minggututup'));
				$selisih=$waktu_akhir-$waktu_awal;
				$selisihmenit=$selisih/60;
				$quota=$selisihmenit/6;
				$kuotajkn=(80*$quota)/100;
				$kuotanonjkn=(20*$quota)/100;
				if(empty($minggu)){
					// Jika Belum Ada Jadwal Senin
					if($mingguaktif==1){
						// Insert Jadwal Simrs
						$jadwalsim=array(
							'kodesubspesialis'=>$kodesubspesialis,
							'namasubspesialis'=>$polynama,
							'kodepoli'=>$kodepoli,
							'kodepolirs'=>$this->input->post('kodepolirs'),
							'namapoli'=>$polynama,
							'kodedokterrs'=>$this->input->post('kodedokterrs'),
							'kodedokter'=>$kodedokter,
							'namadokter'=>$nama_dokter,
							'hari'=>'5',
							'namahari'=>'MINGGU',
							'jadwal'=>$this->input->post('minggubuka')."-".$this->input->post('minggututup'),
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
							'libur'=>0,
							'pekan'=>0,
							'status'=>1,
						);
						$this->db->insert('jkn_jadwaldokter',$jadwalsim);
					}
					
				}else{
					// Jika Sudah ada jadwal Senin
					if($mingguaktif==1){
						// Update Jadwal Simrs
						$jadwalsim=array(
							'jadwal'=>$this->input->post('minggubuka')."-".$this->input->post('minggututup'),
							'status'=>1,
							'kapasitaspasien'=>$quota,
							'kapasitasjkn'=>$kuotajkn,
							'kapasitasnonjkn'=>$kuotanonjkn,
						);
						$this->db->where('kodedokter',$kodedokter)
						->where('kodesubspesialis',$kodesubspesialis)
						->where('namahari','MINGGU')
						->update('jkn_jadwaldokter',$jadwalsim);
					}else{
						// Hapus Jadwal Lokal Simrs
						$jadwalstatus=array('status'=>0);
						$this->db->where('kodedokterrs',$this->input->post('kodedokterrs'))
						->where('kodepolirs',$this->input->post('kodepolirs'))
						->where('namahari','MINGGU')
						->update('jkn_jadwaldokter',$jadwalstatus);
					}
				}
			}else{
				$response=array(
					'metadata'=>$response->metadata,
					'request'=>$req
				);
			}
            
            // $response=array(
            //     'metadata'=>array('code'=>200,'message'=>'Simpan Jadwal Berhasil')
            // );
            
            
        }else{
            $response=array(
                'metadata'=>array('code'=>201,'message'=>'Data Jadwal Tidak ada')
            );
        }
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function hapusjadwal(){
        $poli=$this->input->get('poli');
            $dokter=$this->input->get('dokter');
            $this->db->where('jadwal_dokter_id',$dokter)
            ->where('jadwal_poly_id',$poli)
            ->delete('jkn_jadwalhafis');
            header('Content-Type: application/json');
            echo json_encode(array('status'=>true,'message'=>'Data berhasil dihapus'));
    }
    function selisih(){
        $awal='08:00:00';
        $akhir='14:00:00';
        $waktu_awal =strtotime($awal);
        $waktu_akhir=strtotime($akhir);
        $selisih=$waktu_akhir-$waktu_awal;
        $selisihmenit=$selisih/60;
        $quota=$selisihmenit/6;
        $kuotajkn=(80*$quota)/100;
        $kuotanonjkn=(20*$quota)/100;
        echo "<br>Selisih (detik) : ".$selisih;
        echo "<br>Selisih (Menit) : ".$selisihmenit;
        echo "<br>Quota SPM(6 Menit) : ".$quota;
        echo "<br>Quota JKN(80%) : ".$kuotajkn;
        echo "<br>Quota NON JKN(20%) : ".$kuotanonjkn;

        echo "<br>".substr('08:00:00',0,5);
    }
}
