<?php 
class Sep extends CI_Controller{
    function __construct(){
        parent::__construct();
        $this->load->model('vclaim_model');
        $this->load->model('users_model');
        $this->load->helper('lz');
        $this->load->helper('bridging');
        $ses_state = $this->users_model->cek_session_id();
        if(!$ses_state){  
            $response=array('metaData'=>array('code'=>201,'message'=>'Anda Belum Login Atau Session Expired'));
            header('Content-Type: application/json');
            echo json_encode($response);
            exit;
        }
    }
    function index(){
        $data=array(
            'contentTitle'=>'Riwayat SEP'
        );
        // //$z = setNav("nav_6");
        // $y['index_menu'] = 7;
        $view=array(
            'header'=>$this->load->view('template/header', '', true),
            'nav_sidebar'=>$this->load->view('template/nav_sidebar', array(), true),
            'content'=>$this->load->view('vclaim/index', $data, true),
            'index_menu'=>4,
            'lib'=>array(
                'javascript/sep.js'
            )
        );
        $this->load->view('template/theme', $view);
    }
    function insert(){
        $cob=$this->input->post('cob');
        if(!$cob) $cob=0;
        $tujuan=$this->input->post('tujuan');
        if($tujuan=='MAT') {
            $katarak=$this->input->post('katarak');
            if(!$katarak) $katarak=0;
        }else $katarak=0;
        $eksekutif=$this->input->post('eksekutif');
        if(!$eksekutif) $eksekutif=0;

        $laklantas=$this->input->post('lakaLantas');
        if($laklantas>0){
            $tglKejadian=$this->input->post('tglKejadian');
            $keterangan=$this->input->post('keterangan');
            $suplesi=$this->input->post('suplesi');
            if(!$suplesi) $suplesi=0;
            $noSepSuplesi=$this->input->post('noSepSuplesi');
            $kdPropinsi=$this->input->post('kdPropinsi');
            $kdKabupaten=$this->input->post('kdKabupaten');
            $kdKecamatan=$this->input->post('kdKecamatan');
            // Validasi data Lakalantas
            $tglk=strtotime($tglKejadian);
            $tglsep=strtotime($this->input->post('tglSep'));
            if($tglk>$tglsep){
                $response=array(
                    'metaData'=>array(
                        'code'=>201,
                        'message'=>"Tanggal Kejadian Tidak boleh lebih kecil dari Tanggal sekarang"
                    )
                );
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }

            // $penjamin=$this->input->post('penjamin');
            // if($penjamin<1 || $penjamin>4){
            //     $response=array(
            //         'metaData'=>array(
            //             'code'=>201,
            //             'message'=>"Data Penjamin Tidak Valid"
            //         )
            //     );
            //     header('Content-Type: application/json');
            //     echo json_encode($response);
            //     exit;
            // }

            if(empty($kdPropinsi)||$kdPropinsi=='-'){
                $response=array(
                    'metaData'=>array(
                        'code'=>201,
                        'message'=>"Data Provinsi tidak boleh kosong"
                    )
                );
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }

            if(empty($kdKabupaten)){
                $response=array(
                    'metaData'=>array(
                        'code'=>201,
                        'message'=>"Data Kabupaten tidak boleh kosong " .$kdPropinsi
                    )
                );
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }
            if(empty($kdKecamatan)){
                $response=array(
                    'metaData'=>array(
                        'code'=>201,
                        'message'=>"Data Kecamatan tidak boleh kosong"
                    )
                );
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }
            // print_r($penjamin) ; exit;

        }else{
            $tglKejadian='';
            $keterangan='';
            $suplesi=0;
            $noSepSuplesi='';
            $kdPropinsi='';
            $kdKabupaten='';
            $kdKecamatan='';
        }
        $jnsPelayanan =$this->input->post('jnsPelayanan');
        if($jnsPelayanan==1)$dpjpLayan=""; 
        else $dpjpLayan=$this->input->post('dpjpLayan');
        $req=array(
            'request'=>array(
                't_sep'=>array(
                    'noKartu'=>$this->input->post('noKartu'),
                    'tglSep'=>$this->input->post('tglSep'),
                    'ppkPelayanan'=>$this->input->post('ppkPelayanan'),
                    'jnsPelayanan'=>2,
                    'klsRawat'=>array(
                        'klsRawatHak'=>$this->input->post('klsRawatHak'),
                        'klsRawatNaik'=>'',
                        'pembiayaan'=>'',
                        'penanggungJawab'=>''
                    ),
                    'noMR'=>$this->input->post('norm'),
                    'rujukan'=>array(
                        'asalRujukan'=>$this->input->post('asalRujukan'),
                        'tglRujukan'=>$this->input->post('tglRujukan'),
                        'noRujukan'=>$this->input->post('noRujukan'),
                        'ppkRujukan'=>$this->input->post('ppkRujukan')
                    ),
                    'catatan'=>$this->input->post('catatan'),
                    'diagAwal'=>$this->input->post('diagAwal'),
                    'poli'=>array(
                        'tujuan'=>$this->input->post('tujuan'),
                        'eksekutif'=>$eksekutif,
                    ),
                    'cob'=>array(
                        'cob'=>$cob
                    ),
                    'katarak'=>array(
                        'katarak'=>$katarak
                    ),
                    'jaminan'=>array(
                        'lakaLantas'=>$laklantas,
                        'penjamin'=>array(
                            'tglKejadian'=>$tglKejadian,
                            'keterangan'=>$keterangan,
                            'suplesi'=>array(
                                'suplesi'=>$suplesi,
                                'noSepSuplesi'=>$noSepSuplesi,
                                'lokasiLaka'=>array(
                                    'kdPropinsi'=>$kdPropinsi,
                                    'kdKabupaten'=>$kdKabupaten,
                                    'kdKecamatan'=>$kdKecamatan
                                )
                            )
                        )
                    ),
                    'tujuanKunj'=>$this->input->post('tujuanKunj'),
                    'flagProcedure'=>$this->input->post('flagProcedure'),
                    'kdPenunjang'=>$this->input->post('kdPenunjang'),
                    'assesmentPel'=>$this->input->post('assesmentPel'),
                    'skdp'=>array(
                        'noSurat'=>$this->input->post('noSurat'),
                        'kodeDPJP'=>$this->input->post('kodeDPJP')
                    ),
                    'dpjpLayan'=>$dpjpLayan,
                    'noTelp'=>$this->input->post('noTelp'),
                    'user'=>$this->session->userdata('userid')
                )
            )
        );
        // header('Content-Type: application/json');
        // echo json_encode($req);
        // exit;
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        if(empty($tgl)) $tgl=date('Y-m-d');
        $contentType = "application/x-www-form-urlencoded";
        // Generate Header
        $header = "";
        $header .= "Content-Type: " . $contentType . "\r\n";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;
        $res=$this->vclaim_model->postData('SEP/2.0/insert',$header,json_encode($req));
        // echo $res; exit;
        if(isJSON($res)){
            $arr=json_decode($res);
            if($arr->metaData->code==200){
                $lz=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                $data=json_decode(hasil($lz));
                $localsep=array(
                    'catatan'=>$data->sep->catatan,
                    'diagnosa'=>$data->sep->diagnosa,
                    'jnsPelayanan'=>$data->sep->jnsPelayanan,
                    'kelasRawat'=>$data->sep->kelasRawat,
                    'noSep'=>$data->sep->noSep,
                    'penjamin'=>$data->sep->penjamin,
                    'asuransi'=>$data->sep->peserta->asuransi,
                    'hakKelas'=>$data->sep->peserta->hakKelas,
                    'jnsPeserta'=>$data->sep->peserta->jnsPeserta,
                    'kelamin'=>$data->sep->peserta->kelamin,
                    'nama'=>$data->sep->peserta->nama,
                    'noKartu'=>$data->sep->peserta->noKartu,
                    'noMr'=>$data->sep->peserta->noMr,
                    'tglLahir'=>$data->sep->peserta->tglLahir,
                    'Dinsos'=>$data->sep->informasi->dinsos,
                    'prolanisPRB'=>$data->sep->informasi->prolanisPRB,
                    'noSKTM'=>$data->sep->informasi->noSKTM,
                    'poli'=>$data->sep->poli,
                    'poliEksekutif'=>$data->sep->poliEksekutif,
                    'tglSep'=>$data->sep->tglSep,
                    'ppkPelayanan'=>$this->input->post('ppkPelayanan'),
                    'klsRawatHak'=>$this->input->post('klsRawatHak'),
                    'klsRawatNaik'=>$this->input->post('klsRawatNaik'),
                    'pembiayaan'=>$this->input->post('pembiayaan'),
                    'penanggungJawab'=>$this->input->post('penanggungjawab'),
                    'asalRujukan'=>$this->input->post('asalRujukan'),
                    'tglRujukan'=>$this->input->post('tglRujukan'),
                    'noRujukan'=>$this->input->post('noRujukan'),
                    'ppkRujukan'=>$this->input->post('ppkRujukan'),
                    'namaPpkRujukan'=>$this->input->post('namaPpkRujukan'),
                    'tujuan'=>$this->input->post('tujuan'),
                    'namaTujuan'=>$this->input->post('namaTujuan'),
                    'eksekutif'=>$eksekutif,
                    'cob'=>$cob,
                    'katarak'=>$katarak,
                    'lakaLantas'=>$laklantas,
                    'tglKejadian'=>$tglKejadian,
                    'keterangan'=>$keterangan,
                    'suplesi'=>$suplesi,
                    'noSepSuplesi'=>$noSepSuplesi,
                    'kdPropinsi'=>$kdPropinsi,
                    'kdKabupaten'=>$kdKabupaten,
                    'kdKecamatan'=>$kdKecamatan,
                    'tujuanKunj'=>$this->input->post('tujuanKunj'),
                    'flagProcedure'=>$this->input->post('flagProcedure'),
                    'kdPenunjang'=>$this->input->post('kdPenunjang'),
                    'assesmentPel'=>$this->input->post('assesmentPel'),
                    'noSurat'=>$this->input->post('noSurat'),
                    'kodeDPJP'=>$this->input->post('kodeDPJP'),
                    'namaDPJP'=>$this->input->post('namaDPJP'),
                    'dpjpLayan'=>$this->input->post('dpjpLayan'),
                    'namaDpjpLayan'=>$this->input->post('namaDpjpLayan'),
                    'noTelp'=>$this->input->post('noTelp'),
                    'user'=>$this->session->userdata('userid')
                );
                $this->db->insert('sep_response',$localsep);
                // Jika SEP DIbuat Setelah Pendaftaranmaka update no_jaminan pad tblpendaftaran
                $idx=$this->input->post('idx');
                if(!empty($idx)){
                    $update = array(
                        'id_cara_bayar' => 1,
                        'no_sep' => $data->sep->noSep
                    );
                    $this->db->where('idx', $idx);
                    $this->db->update('pendaftaran', $update);
                }
                
                $res=json_encode(array('metaData'=>$arr->metaData,'response'=>$data));
            }else{
                $response=array(
                    'metaData'=>array(
                        'code'=>$arr->metaData->code,
                        'message'=>$arr->metaData->message
                    ),
                    'request'=>$req
                );
                $res=json_encode($response);
            }
            header('Content-Type: application/json');
            echo $res;
        }else {

            echo $res;
        }
        
        // header('Content-Type: application/json');
        // echo json_encode($req);
    }
    function update(){
        $cob=$this->input->post('cob');
        if(!$cob) $cob=0;
        $tujuan=$this->input->post('tujuan');
        if($tujuan=='MAT') {
            $katarak=$this->input->post('katarak');
            if(!$katarak) $katarak=0;
        }else $katarak=0;
        $eksekutif=$this->input->post('eksekutif');
        if(!$eksekutif) $eksekutif=0;

        $laklantas=$this->input->post('lakaLantas');
        if($laklantas>0){
            $tglKejadian=$this->input->post('tglKejadian');
            $keterangan=$this->input->post('keterangan');
            $suplesi=$this->input->post('suplesi');
            if(!$suplesi) $suplesi=0;
            $noSepSuplesi=$this->input->post('noSepSuplesi');
            $kdPropinsi=$this->input->post('kdPropinsi');
            $kdKabupaten=$this->input->post('kdKabupaten');
            $kdKecamatan=$this->input->post('kdKecamatan');
        }else{
            $tglKejadian='';
            $keterangan='';
            $suplesi=0;
            $noSepSuplesi='';
            $kdPropinsi='';
            $kdKabupaten='';
            $kdKecamatan='';
        }

        $req=array(
            'request'=>array(
                't_sep'=>array(
                    'noSep'=>$this->input->post('noSep'),
                    'klsRawat'=>array(
                        'klsRawatHak'=>$this->input->post('klsRawatHak'),
                        'klsRawatNaik'=>$this->input->post('klsRawatNaik'),
                        'pembiayaan'=>$this->input->post('pembiayaan'),
                        'penanggungJawab'=>$this->input->post('penanggungJawab')
                    ),
                    'noMR'=>$this->input->post('noMR'),
                    'catatan'=>$this->input->post('catatan'),
                    'diagAwal'=>$this->input->post('diagAwal'),
                    'poli'=>array(
                        'tujuan'=>$this->input->post('tujuan'),
                        'eksekutif'=>$eksekutif,
                    ),
                    'cob'=>array(
                        'cob'=>$cob
                    ),
                    'katarak'=>array(
                        'katarak'=>$katarak
                    ),
                    'jaminan'=>array(
                        'lakaLantas'=>$laklantas,
                        'penjamin'=>array(
                            'tglKejadian'=>$tglKejadian,
                            'keterangan'=>$keterangan,
                            'suplesi'=>array(
                                'suplesi'=>$suplesi,
                                'noSepSuplesi'=>$noSepSuplesi,
                                'lokasiLaka'=>array(
                                    'kdPropinsi'=>$kdPropinsi,
                                    'kdKabupaten'=>$kdKabupaten,
                                    'kdKecamatan'=>$kdKecamatan
                                )
                            )
                        )
                    ),
                    'dpjpLayan'=>$this->input->post('dpjpLayan'),
                    'noTelp'=>$this->input->post('noTelp'),
                    'user'=>$this->session->userdata('userid')
                )
            )
        );
        // header('Content-Type: application/json');
        // echo json_encode($req);
        // exit;
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        if(empty($tgl)) $tgl=date('Y-m-d');
        $contentType = "application/x-www-form-urlencoded";
        // Generate Header
        $header = "";
        $header .= "Content-Type: " . $contentType . "\r\n";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;
        $res=$this->vclaim_model->putData('SEP/2.0/update',$header,json_encode($req));
        // $res = rtrim($res, "\0");
        // $res = json_decode(trim($res), TRUE);
        // $res =  json_decode( preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $res), true ); 
        // $res = stripslashes(html_entity_decode($res));

        // $k=json_decode($res,true);

        // print_r($k);
        // exit;
        if(isJSON($res)){
            // try {  
            //     $arr=json_decode($res, false, 512, JSON_THROW_ON_ERROR);  
            // }  
            // catch (\JsonException $exception) {  
            //     echo "<br><br>Error".$exception->getMessage(); // displays "Syntax error"  
            //     exit;
            // }
            $arr=json_decode($res);
            // print_r($arr);
            if($arr->metaData->code==200){
                $lz=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                $data=json_decode(hasil($lz));
                // if($this->input->post('klsRawatNaik')>0) $kelasRawat="Kelas "
                $localsep=array(
                    'catatan'=>$data->sep->catatan,
                    'diagnosa'=>$data->sep->diagnosa,
                    'kelasRawat'=>$data->sep->kelasRawat,
                    'penjamin'=>$data->sep->penjamin,
                    'noMr'=>$this->input->post('noMR'),
                    'poli'=>$this->input->post('poli'),
                    'poliEksekutif'=>$this->input->post('eksekutif'),
                    'klsRawatHak'=>$this->input->post('klsRawatHak'),
                    'klsRawatNaik'=>$this->input->post('klsRawatNaik'),
                    'pembiayaan'=>$this->input->post('pembiayaan'),
                    'penanggungJawab'=>$this->input->post('penanggungJawab'),
                    'tujuan'=>$this->input->post('tujuan'),
                    'namaTujuan'=>$this->input->post('poli'),
                    'eksekutif'=>$eksekutif,
                    'cob'=>$cob,
                    'katarak'=>$katarak,
                    'lakaLantas'=>$laklantas,
                    'tglKejadian'=>$tglKejadian,
                    'keterangan'=>$keterangan,
                    'suplesi'=>$suplesi,
                    'noSepSuplesi'=>$noSepSuplesi,
                    'kdPropinsi'=>$kdPropinsi,
                    'kdKabupaten'=>$kdKabupaten,
                    'kdKecamatan'=>$kdKecamatan,
                    'dpjpLayan'=>$this->input->post('dpjpLayan'),
                    'namaDpjpLayan'=>$this->input->post('namaDpjpLayan'),
                    'noTelp'=>$this->input->post('noTelp'),
                    'user'=>$this->session->userdata('userid')
                );
                $this->db->where('noSep',$this->input->post('noSep'));
                $this->db->update('sep_response',$localsep);

                $res=json_encode(array('metaData'=>$arr->metaData,'response'=>$data));
            }
        }else {
            // echo "Bukan Json";
            header('Content-Type: application/json');
            echo $res;
            exit;
        }
        header('Content-Type: application/json');
        echo $res;
        
    }
    function jsondecode(){
        $json='{"metaData":{"code":"200","message":"Sukses"},"response":"l+UI\/piELVGlxVmA5zQBPFWg+09up\/WOr2\/TVeXe+gQzkpMgRhBTCqvT9VeJNyRV\/16LLJQB\/sA7Jfz0T3pb4AUa5eql2u4gLidBsDyIEZzD5waViF6RDx3ksRfBZSKDLJB1egZN6aao7AF2nAaX2H\/uTiNKTQm6D3S98wQlREi+jfHVDvMX+ryeXDXI35GwFSo6JW1uUjJYbLXwpm7DSuYKZPJKAH5uLIHbIS9y3KqNezxAO6iLyYzb3SivYiEyME4lMIQTtmqgDeqkOKFaupaOwZ0YhAvsvmsYih9MWDZss9qler7XcD0UveQ\/CFmNOi6s0muFdGhUdQUA\/LB\/Pal69zh\/16rrCJzj\/HWb4OTqdKPVXcPj3Yr4oJC05ia+o2j7KtfTfgzttOYQ8bJndWv5YPn+yPbO50\/nZOWR+sJRMmfE\/snB0yC8ptoCRVYsN7wA9yFogN12XW20G4qeUAwxonRvQPHzE+PZgva8TZjl7W6MN\/RQU5BWYO3WD8n6ZxKRiYu6gR9qHOrZE+jPnvlDaZV9e4raI0zqUuC+BronQFmqPAJ1LWT6HjJWM6yL\/TcH03z3PJ3eTqYWmU\/yrK6yWd0hIshgOFQ5KytBmT1DyLnD8NOF1J8BVe+7F+tYUl7HHwk+e8W0lo7BzDE0s9hIbhj9pDrd1Z2VFosE903KTeP2Wh7no71u9hkrpg3K\/WTeKqEZCQ1LYThK9gJTXQ=="}';
        // header('Content-Type: application/json');
        // echo $json;
        // echo "<br><br><br>";
        $arr= json_decode($json);
        print_r($arr);
    }
    function updatepulang(){
        
        $req=array(
            'request'=>array(
                't_sep'=>array(
                    'noSep'=>$this->input->post('noSep'),
                    'statusPulang'=>$this->input->post('statusPulang'),
                    'noSuratMeninggal'=>$this->input->post('noSuratMeninggal'),
                    'tglMeninggal'=>$this->input->post('tglMeninggal'),
                    'tglPulang'=>$this->input->post('tglPulang'),
                    'noLPManual'=>$this->input->post('noLPManual'),
                    'user'=>$this->session->userdata('userid')
                )
            )
        );
        // header('Content-Type: application/json');
        // echo json_encode($req);
        // exit;
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        if(empty($tgl)) $tgl=date('Y-m-d');
        $contentType = "application/x-www-form-urlencoded";
        // Generate Header
        $header = "";
        $header .= "Content-Type: " . $contentType . "\r\n";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;
        $res=$this->vclaim_model->putData('SEP/2.0/updtglplg',$header,json_encode($req));
        if(isJSON($res)){
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
    }
    function pulang(){
        $data=array(
            'contentTitle'=>'Pemulangan Pasien'
        );
        //$z = setNav("nav_6");
        // $y['index_menu'] = 7;
        $view=array(
            'header'=>$this->load->view('template/header', '', true),
            'nav_sidebar'=>$this->load->view('template/nav_sidebar', array(), true),
            'content'=>$this->load->view('vclaim/updatepulang', $data, true),
            'index_menu'=>4,
            'lib'=>array(
                'javascript/sep.js'
            )
        );
        $this->load->view('template/theme', $view);
    }

    function pulang1(){
        $data=array(
            'contentTitle'=>'Pemulangan Pasien'
        );
        //$z = setNav("nav_6");
        // $y['index_menu'] = 7;
        $view=array(
            'header'=>$this->load->view('template/header', '', true),
            'nav_sidebar'=>$this->load->view('template/nav_sidebar', array(), true),
            'content'=>$this->load->view('vclaim/pulang', $data, true),
            'index_menu'=>4,
            'lib'=>array(
                'javascript/seppulang.js'
            )
        );
        $this->load->view('template/theme', $view);
    }
    function listpulang($bulan="",$tahun=""){
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        if(empty($bulan)) $bulan=date('m');
        if(empty($tahun)) $tahun=date('Y');
        $filter=urlencode($this->input->get('filter'));
        // Generate Header
        $header = "";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;

        $res = $this->vclaim_model->getData("SEP/updtglplg/list/bulan/$bulan/tahun/$tahun/$filter",$header);
        if(isJSON($res)){
            $arr=json_decode($res);
            if($arr->metaData->code==200){
                $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                $res=json_encode(array('metaData'=>$arr->metaData,'response'=>json_decode(hasil($data))));
            }
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
    }
    function updatepulanglokal(){
        $data=array(
            'noSep'=>$this->input->post('noSep'),
            'statusPulang'=>$this->input->post('statusPulang'),
            'namaStatusPulang'=>$this->input->post('namaStatusPulang'),
            'noSuratMeninggal'=>$this->input->post('noSuratMeninggal'),
            'tglMeninggal'=>$this->input->post('tglMeninggal'),
            'tglPulang'=>$this->input->post('tglPulang'),
            'noLPManual'=>$this->input->post('noLPManual'),
        );
        $this->db->where('noSep',$this->input->post('noSep'));
        $this->db->update('sep_response',$data);
        $response=array(
            'metaData'=>array(
                'code'=>200,
                'message'=>"OK"
            )
        );
        header('Content-Type: application/json');
        echo json_encode($response);

    }
    function hapus($nosep){
        $req=array(
            'request'=>array(
                't_sep'=>array(
                    'noSep'=>$nosep,
                    'user'=>$this->session->userdata('userid')
                )
            )
        );
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        if(empty($tgl)) $tgl=date('Y-m-d');
        $contentType = "application/x-www-form-urlencoded";
        // Generate Header
        $header = "";
        $header .= "Content-Type: " . $contentType . "\r\n";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;
        $res=$this->vclaim_model->deleteData('SEP/2.0/delete',$header,json_encode($req));
        
        // $arr=json_decode($res);
        // $data = str_replace('null','""',$res);
        // echo "test<br>";
        // echo $data;
        // exit;
        // echo "<br>";
        if(isJSON($res)){
            $arr = json_decode(trim($res), TRUE);
            if(is_array($arr)){
                if($arr->metaData->code==200){
                    $batal=array(
                        'batal'=>1,
                        'userbatal'=>$this->session->userdata('userid')
                    );
                    $this->db->where('noSep',$nosep);
                    $this->db->update('sep_response',$batal);
        
                    $lz=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                    $data=json_decode(hasil($lz));
        
                    $res=json_encode(array('metaData'=>$arr->metaData,'response'=>$data));
                }
            }
            
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
    }
    function edit($nosep){
        $this->db->where('noSep',$nosep);
        $this->db->where('batal',0);
        $data = $this->db->get('sep_response')->row();
        header('Content-Type: application/json');
        echo json_encode($data);
    }
    function hapuslokal($nosep){
        $data=array(
            'batal'=>1,
            'userbatal'=>$this->session->userdata('userid')
        );
        $this->db->where('noSep',$nosep);
        $this->db->update('sep_response',$data);
        header('Content-Type: application/json');
        echo json_encode(array('status'=>false,'message'=>'Berhasil Hapus SEP'));
    }
    function cari($sep=""){
        // Create TimeStamps
        // $param=urlencode($this->input->get('param'));
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

        $res = $this->vclaim_model->getData("SEP/$sep",$header);
        if(isJSON($res)){
            $arr=json_decode($res);
            if($arr->metaData->code==200){
                $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                $res=json_encode(array('metaData'=>$arr->metaData,'response'=>json_decode(hasil($data))));
            }
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
    }
    function detail($noSep){
        // Create TimeStamps
        // $param=urlencode($this->input->get('param'));
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

        $res = $this->vclaim_model->getData("SEP/$noSep",$header);
        if(isJSON($res)){
            $arr=json_decode($res);
            if($arr->metaData->code==200){
                $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                // $res=json_encode(array('metaData'=>$arr->metaData,'response'=>json_decode(hasil($data))));

                $data=array(
                    'contentTitle'=>'Detail SEP',
                    'data'=>json_decode(hasil($data)),
                    'rujukanonline'=>$this->vclaim_model->getRujukanOnline($noSep)
                );
                //$z = setNav("nav_7");
                $y['index_menu'] = 7;
                $view=array(
                    'header'=>$this->load->view('template/header', '', true),
                    'nav_sidebar'=>$this->load->view('template/nav_sidebar', array(), true),
                    'content'=>$this->load->view('vclaim/detail', $data, true),
                    'index_menu'=>4,
                    'lib'=>array(
                        'javascript/sep.js'
                    )
                );
                $this->load->view('template/theme', $view);

            }
        }else {
            echo $res;
        }
        
        // header('Content-Type: application/json');
        // echo $res;
    }
    function suplesi1($nokartu,$tgl=""){
        // Create TimeStamps
        // $param=urlencode($this->input->get('param'));
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        if(empty($tgl)) $tgl=date('Y-m-d');
        // Generate Header
        $header = "";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;

        $res = $this->vclaim_model->getData("sep/JasaRaharja/Suplesi/$nokartu/$tgl",$header);
        if(isJSON($res)){
            $arr=json_decode($res);
            if($arr->metaData->code==200){
                $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                $res=json_encode(array('metaData'=>$arr->metaData,'response'=>json_decode(hasil($data))));
            }
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
        // header('Content-Type: application/json');
        // echo $res;
    }
    function internal($sep=""){
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

        $res = $this->vclaim_model->getData("SEP/Internal/$sep",$header);
        if(isJSON($res)){
            $arr=json_decode($res);
            if($arr->metaData->code==200){
                $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                $res=json_encode(array('metaData'=>$arr->metaData,'response'=>json_decode(hasil($data))));
            }
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
    }
    function hapusinternal($nosep,$nosurat,$tglRujuk,$tujuan){
        $req=array(
            'request'=>array(
                't_sep'=>array(
                    'noSep'=>$nosep,
                    'noSurat'=>$nosurat,
                    'tglRujukanInternal'=>$tglRujuk,
                    'kdPoliTuj'=>$tujuan,
                    'user'=>$this->session->userdata('userid')
                )
            )
        );
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        if(empty($tgl)) $tgl=date('Y-m-d');
        $contentType = "application/x-www-form-urlencoded";
        // Generate Header
        $header = "";
        $header .= "Content-Type: " . $contentType . "\r\n";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;
        $res=$this->vclaim_model->deleteData('SEP/Internal/delete',$header,json_encode($req));
        if(isJSON($res)){
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
    }

    function pengajuan(){
        $data=array(
            'contentTitle'=>'Pengajuan SEP',
        );
        //$z = setNav("nav_7");
        $y['index_menu'] = 7;
        $view=array(
            'header'=>$this->load->view('template/header', '', true),
            'nav_sidebar'=>$this->load->view('template/nav_sidebar', array(), true),
            'content'=>$this->load->view('vclaim/pengajuan', $data, true),
            'index_menu'=>4,
            'lib'=>array(
                'javascript/pengajuan.js'
            )
        );
        $this->load->view('template/theme', $view);
    }

    function riwayatpengajuan(){
        $start=intval($this->input->get('start'));
        $limit=10;
        $list=array(
            'status'    => true,
            'message'   => "OK", 
            'start'     => $start,
            'row_count' => $this->vclaim_model->countRiwayatPengajuan(),
            'limit'     => $limit,
            'data'     => $this->vclaim_model->jmlRiwayatPengajuan($start,$limit),
        );
		// $respons=bridgingbpjs();
        header('Content-Type: application/json');
        echo json_encode($list);
    }
	function persetujuansep($bulan="",$tahun=""){
		$bulan=empty($bulan)?date('m'):$bulan;
		$tahun=empty($tahun)?date('Y'):$tahun;
		$response = bridgingbpjs("Sep/persetujuanSEP/list/bulan/".intval($bulan)."/tahun/".$tahun,"GET","","vclaim");
		header('Content-Type: application/json');
		echo $response; 
		
	}
    function kirimpengajuan(){
        $req=array(
            'request'=>array(
                't_sep'=>array(
                    'noKartu'=>$this->input->post('noKartu'),
                    'tglSep'=>$this->input->post('tglSep'),
                    'jnsPelayanan'=>$this->input->post('jnsPelayanan'),
                    'jnsPengajuan'=>$this->input->post('jnsPengajuan'),
                    'keterangan'=>$this->input->post('keterangan'),
                    'user'=>$this->session->userdata('userid')
                )
            )
        );
        // header('Content-Type: application/json');
        // echo json_encode($req);
        // exit;
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        if(empty($tgl)) $tgl=date('Y-m-d');
        $contentType = "application/x-www-form-urlencoded";
        // Generate Header
        $header = "";
        $header .= "Content-Type: " . $contentType . "\r\n";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;
        $res=$this->vclaim_model->postData('Sep/pengajuanSEP',$header,json_encode($req));
        // echo $res; exit;
        
        if(isJSON($res)){
            $arr=json_decode($res);
            if(is_array($arr)){
                if($arr->metaData->code==200){
                    $pengajuan = array(
                        'noKartu'=>$this->input->post('noKartu'),
                        'tglSep'=>$this->input->post('tglSep'),
                        'jnsPelayanan'=>$this->input->post('jnsPelayanan'),
                        'jnsPengajuan'=>$this->input->post('jnsPengajuan'),
                        'keterangan'=>$this->input->post('keterangan'),
                        'user'=>$this->session->userdata('userid')
                    );
                    $this->db->insert('pengajuansep',$pengajuan);
                }
            }else{
                $pengajuan = array(
                    'noKartu'=>$this->input->post('noKartu'),
                    'tglSep'=>$this->input->post('tglSep'),
                    'jnsPelayanan'=>$this->input->post('jnsPelayanan'),
                    'jnsPengajuan'=>$this->input->post('jnsPengajuan'),
                    'keterangan'=>$this->input->post('keterangan'),
                    'statuspengajuan'=>'Pending',
                    'user'=>$this->session->userdata('userid')
                );
                $this->db->insert('pengajuansep',$pengajuan);
            }
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
    }

    function aprovepengajuan(){
        $idx=intval($this->input->get('idx'));
        $this->db->where('idx',$idx);
        $row=$this->db->get('pengajuansep')->row();
        
        if($row){
            if($this->session->userdata('level')==1){
                $req=array(
                    'request'=>array(
                        't_sep'=>array(
                            'noKartu'=>$row->noKartu,
                            'tglSep'=>$row->tglSep,
                            'jnsPelayanan'=>$row->jnsPelayanan,
                            'jnsPengajuan'=>$row->jnsPengajuan,
                            'keterangan'=>$row->keterangan,
                            'user'=>$this->session->userdata('userid')
                        )
                    )
                );
                // header('Content-Type: application/json');
                // echo json_encode($req); exit;
                // print_r($req); exit;
                date_default_timezone_set('UTC');
                $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
                // Create Signature
                $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
                $encodedSignature = base64_encode($signature);
                if(empty($tgl)) $tgl=date('Y-m-d');
                $contentType = "application/x-www-form-urlencoded";
                // Generate Header
                $header = "";
                $header .= "Content-Type: " . $contentType . "\r\n";
                $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
                $header .= "X-timestamp: " . $tStamp . "\r\n";
                $header .= "X-signature: " . $encodedSignature ."\r\n";
                $header .= "user_key: ".KEY_VC;
                $res=$this->vclaim_model->postData('Sep/aprovalSEP',$header,json_encode($req));
                // echo $res; exit;
                if(isJSON($res)){
                    $arr=json_decode($res);
					if($arr->metaData->code==200){
						// echo "disini";
						// exit;
						$status=array(
							'statuspengajuan'=>'Aproved'
						);
						$this->db->where('idx',$idx);
						$this->db->update('pengajuansep',$status);
					}else{
						// echo "disini";
						// exit;
						$lz=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
						$data=json_decode(hasil($lz));
						if($data=="Peserta Sudah Pernah Melakukan Pengajuan Aproval Penjaminan di tanggal ".date('Y-m-d')){
							$status=array(
								'statuspengajuan'=>'Aproved'
							);
							$this->db->where('idx',$idx);
							$this->db->update('pengajuansep',$status);
						}
						$res=json_encode(array(
							'metaData'=>array(
								'code'=>$arr->metaData->code,
								'message'=>$arr->metaData->message
							),
							'response'=>$data
						));
					}
					header('Content-Type: application/json');
                    echo $res;
                }else {
					// echo "disini"; exit;
					header('Content-Type: application/json');
                    echo $res;
                }
                
            }else{
                $response=array(
                    'metaData'=>array(
                        'code'=>201,
                        'message'=>'Anda tidak berhak melakukan aproval pengajuan SEP'
                    )
                );
                $res=json_encode($response);
                header('Content-Type: application/json');
                echo $res;
            }
            
        }else{
            $response=array(
                'metaData'=>array(
                    'code'=>201,
                    'message'=>'Data Tidak Ditemukan Di Database Lokal'
                )
            );
            $res=json_encode($response);
            header('Content-Type: application/json');
            echo $res;
        }
        
    }

    function finger(){
        $data=array(
            'contentTitle'=>'Finger Print',
        );
        //$z = setNav("nav_7");
        $y['index_menu'] = 7;
        $view=array(
            'header'=>$this->load->view('template/header', '', true),
            'nav_sidebar'=>$this->load->view('template/nav_sidebar', array(), true),
            'content'=>$this->load->view('vclaim/finger', $data, true),
            'index_menu'=>4,
            'lib'=>array(
                'javascript/finger.js'
            )
        );
        $this->load->view('template/theme', $view);
    }
    
    function cekfinger(){
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        // if(empty($mulai)) $mulai=date('Y-m-d');
        // if(empty($selesai)) $selesai=date('Y-m-d');
        $noKartu = $this->input->get('noKartu');
        $tglPelayanan=$this->input->get('tglPelayanan');
        // Generate Header
        $header = "";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;

        $res = $this->vclaim_model->getData("SEP/FingerPrint/Peserta/$noKartu/TglPelayanan/$tglPelayanan",$header);
        if(isJSON($res)){
            $arr=json_decode($res);
            if($arr->metaData->code==200){
                $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                $res=json_encode(array('metaData'=>$arr->metaData,'response'=>json_decode(hasil($data))));
            }
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
    }

    function listfinger(){
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        // if(empty($mulai)) $mulai=date('Y-m-d');
        // if(empty($selesai)) $selesai=date('Y-m-d');
        $tglPelayanan=$this->input->get('tglPelayanan');
        // Generate Header
        $header = "";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;

        $res = $this->vclaim_model->getData("SEP/FingerPrint/List/Peserta/TglPelayanan/$tglPelayanan",$header);
        if(isJSON($res)){
            $arr=json_decode($res);
            if($arr->metaData->code==200){
                $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                $res=json_encode(array('metaData'=>$arr->metaData,'response'=>json_decode(hasil($data))));
            }
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
    }

    function jasaraharja(){
        $data=array(
            'contentTitle'=>'Suplesi Jasaraharja',
        );
        //$z = setNav("nav_7");
        $y['index_menu'] = 7;
        $view=array(
            'header'=>$this->load->view('template/header', '', true),
            'nav_sidebar'=>$this->load->view('template/nav_sidebar', array(), true),
            'content'=>$this->load->view('vclaim/jasaraharja', $data, true),
            'index_menu'=>4,
            'lib'=>array(
                'javascript/jasaraharja.js'
            )
        );
        $this->load->view('template/theme', $view);
    }
    function suplesi(){
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        // if(empty($mulai)) $mulai=date('Y-m-d');
        // if(empty($selesai)) $selesai=date('Y-m-d');
        $noKartu = $this->input->get('noKartu');
        $tglPelayanan=$this->input->get('tglPelayanan');
        // Generate Header
        $header = "";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;

        $res = $this->vclaim_model->getData("sep/JasaRaharja/Suplesi/$noKartu/TglPelayanan/$tglPelayanan",$header);
        if(isJSON($res)){
            $arr=json_decode($res);
            if($arr->metaData->code==200){
                $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                $res=json_encode(array('metaData'=>$arr->metaData,'response'=>json_decode(hasil($data))));
            }
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
    }
    function kecelakaan(){
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Create Signature
        $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
        $encodedSignature = base64_encode($signature);
        // if(empty($mulai)) $mulai=date('Y-m-d');
        // if(empty($selesai)) $selesai=date('Y-m-d');
        $noKartu = $this->input->get('noKartu');
        // Generate Header
        $header = "";
        $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
        $header .= "X-timestamp: " . $tStamp . "\r\n";
        $header .= "X-signature: " . $encodedSignature ."\r\n";
        $header .= "user_key: ".KEY_VC;

        $res = $this->vclaim_model->getData("sep/KllInduk/List/$noKartu",$header);
        if(isJSON($res)){
            $arr=json_decode($res);
            if($arr->metaData->code==200){
                $data=$this->vclaim_model->stringDecrypt(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                $res=json_encode(array('metaData'=>$arr->metaData,'response'=>json_decode(hasil($data))));
            }
            header('Content-Type: application/json');
            echo $res;
        }else {
            echo $res;
        }
        
    }
}
