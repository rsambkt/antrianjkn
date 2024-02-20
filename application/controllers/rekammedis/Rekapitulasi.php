<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Rekapitulasi extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('users_model');
        $this->load->model('rekapitulasi_model');
        $this->load->helper('ajaxdata');
    }
    function parameter(){
        if ($this->session->userdata('modul')==2) {
            $keyword = urldecode($this->input->get('param', TRUE));
            $response=$this->rekapitulasi_model->getParameter($keyword);
            
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function harian()
    {
        if ($this->session->userdata('modul')==2) {
            $data = array(
                'contentTitle' => 'Rekapitulasi Kunjungan Harian',
                'jenislayanan'=>$this->rekapitulasi_model->getJenisLayanan()
            );
            $view = array(
                'header' => $this->load->view('template/header', '', true),
                'nav_sidebar' => $this->load->view('template/nav_sidebar', array(), true),
                'content' => $this->load->view('rekammedis/rekapitulasi/harian', $data, true),
                'index_menu'=>10,
                'lib'           => array('javascript/harian.js'),
                'ajaxdata'  => array()
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

    function dataharian(){
        if ($this->session->userdata('modul')==2) {
            $start = intval($this->input->post('start'));
            $limit = intval($this->input->post('limit'));
            // $group = $this->input->post('group');
            $dari=$this->input->post('dari');
            $sampai=$this->input->post('sampai');
            $mulai = ($start * $limit) - $limit;
            $pekerjaan=$this->input->post('pekerjaan');
            $wilayah=$this->input->post('wilayah');
            $caradaftar=$this->input->post('caradaftar');
            $carabayar=$this->input->post('carabayar');
            $jenispeserta=$this->input->post('jenispeserta');
            $rujukan=$this->input->post('rujukan');
            $ruangan=$this->input->post('ruangan');
            $jnslayanan=$this->input->post('jnslayanan');
            if(empty($jenispasien)) $jenispasien=0;
            if(empty($pekerjaan)) $pekerjaan=0;
            if(empty($wilayah)) $wilayah=0;
            if(empty($caradaftar)) $caradaftar=0;
            if(empty($carabayar)) $carabayar=0;
            if(empty($rujukan)) $rujukan=0;
            if(empty($ruangan)) $ruangan=0;
            $subquery="";
            $header="<tr><td rowspan=2 style='width:50px;'>#</td><td rowspan='2'>Tanggal</td>";
            $sheader="<tr>";
            if($jenispasien==1){
                $subquery="sum(case when (DATE_FORMAT(`tgl_kunjungan`,'%Y-%m-%d')=`tgl_daftar`) then 1 else 0 end) as pasienbaru,
                SUM(CASE WHEN (DATE_FORMAT(`tgl_kunjungan`,'%Y-%m-%d')!=`tgl_daftar`) THEN 1 ELSE 0 END) AS pasienlama,";
                $header.="<td colspan='2'>Jenis Pasien</td>";
                $sheader.="<td style='width:50px;'>Baru</td><td style='width:50px;'>Lama</td>";
            }
            if($wilayah==1){
                // $wilayah=array('Padang Panjang','Padang Pariaman','Tanah Datar','Bukittinggi','Lainnya');
                $subquery.="sum(case when (kab_kota='Padang Pariaman') then 1 else 0 end) as padangpariaman,
                SUM(CASE WHEN (kab_kota='Pariaman') THEN 1 ELSE 0 END) AS pariaman,
                SUM(CASE WHEN (kab_kota='Padang') THEN 1 ELSE 0 END) AS padang,
                SUM(CASE WHEN (kab_kota='Padang Panjang') THEN 1 ELSE 0 END) AS padangpanjang,
                SUM(CASE WHEN (kab_kota!='Padang Panjang' AND kab_kota!='Padang Pariaman' AND kab_kota!='Padang' AND kab_kota!='Padang') THEN 1 ELSE 0 END) AS wilayahlain,";
                $header.="<td colspan='5'>Wilayah</td>";
                $sheader.="<td style='width:50px;'>Padang Pariaman</td><td style='width:50px;'>Pariaman</td>
                <td style='width:50px;'>Padang</td><td style='width:50px;'>padangpanjang</td><td style='width:50px;'>Wilayah Lain</td>";
            }
            if($pekerjaan==1){
                $datapekerjaan=$this->rekapitulasi_model->getPekerjaan();
                $urut=0;
                foreach ($datapekerjaan as $p ) {
                    $urut++;
                    $fieldname="pekerjaan".$urut;
                    $fieldpekerjaan[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`pekerjaan`='".$p->pekerjaan_nama."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:70px;'>".$p->pekerjaan_nama ."</td>";
                }
                $jmlpekerjaan=count($datapekerjaan);
                $header.="<td colspan='$jmlpekerjaan'>Pekerjaan</td>";
                
            }
            if($caradaftar==1){
                $datacd=$this->rekapitulasi_model->getCaraDaftar();
                $urut=0;
                foreach ($datacd as $p ) {
                    $urut++;
                    $fieldname="cd".$urut;
                    $fieldcd[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`id_cara_daftar`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->caradaftar ."</td>";
                }
                $jmlcd=count($datacd);
                $header.="<td colspan='$jmlcd'>Cara Daftar</td>";
            }
            if($carabayar==1){
                $datacb=$this->rekapitulasi_model->getCaraBayar();
                $urut=0;
                foreach ($datacb as $p ) {
                    $urut++;
                    $fieldname="carabayar".$urut;
                    $fieldcb[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`id_cara_bayar`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->cara_bayar ."</td>";
                }
                $jmlcb=count($datacb);
                $header.="<td colspan='$jmlcb'>Cara Daftar</td>";
            }
            if($rujukan==1){
                $datarujukan=$this->rekapitulasi_model->getRujukan(array('aktif'=>1));
                $urut=0;
                foreach ($datarujukan as $p ) {
                    $urut++;
                    $fieldname="rujukan".$urut;
                    $fieldrujukan[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`id_rujuk`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->rujukan ."</td>";
                }
                $jmlrujukan=count($datarujukan);
                $header.="<td colspan='$jmlrujukan'>Rujukan</td>";
            }
            if($ruangan==1){
                $jnslayanan=$this->input->post('jnslayanan');
                $datapoli=$this->rekapitulasi_model->getPoli($jnslayanan);
                $urut=0;
                foreach ($datapoli as $p ) {
                    $urut++;
                    $fieldname="ruang".$urut;
                    $fieldruangan[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`idx`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->ruang ."</td>";
                }
                $jmlruangan=count($datapoli);
                $header.="<td colspan='$jmlruangan'>Ruangan/Poliklinik</td>";
            }
            $sheader.='</tr>';
            $header.="<td rowspan='2' style='width:50px;'>Jumlah</td></tr>";
            $header.=$sheader;
            
            $group=array(
                'jenispasien'=>$jenispasien,
                'pekerjaan'=>$pekerjaan,
                'wilayah'=>$wilayah,
                'caradaftar'=>$caradaftar,
                'carabayar'=>$carabayar,
                'rujukan'=>$rujukan,
                'ruangan'=>$ruangan
            );
            if(empty($fieldpekerjaan)) $fieldpekerjaan=array();
            if(empty($fieldcd)) $fieldcd=array();
            if(empty($fieldcb)) $fieldcb=array();
            if(empty($fieldrujukan)) $fieldrujukan=array();
            if(empty($fieldruangan)) $fieldruangan=array();
            $groupfield=array(
                'jenispasien'=>array('pasienbaru','pasienlama'),
                'pekerjaan'=>$fieldpekerjaan,
                'wilayah'=>$wilayah,
                'caradaftar'=>$fieldcd,
                'carabayar'=>$fieldcb,
                'rujukan'=>$fieldrujukan,
                'ruangan'=>$fieldruangan
            );
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'start'     => $mulai,
                'row_count' => array(),
                'limit'     => $limit,
                'header'=>$header,
                'group'=>$group,
                'groupfield'=>$groupfield,
                'data'=>$this->rekapitulasi_model->getDataHarian($limit,$mulai,$dari,$sampai,$subquery)
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function databulanan(){
        if ($this->session->userdata('modul')==2) {
            $start = intval($this->input->post('start'));
            $limit = intval($this->input->post('limit'));
            // $group = $this->input->post('group');
            $dari=$this->input->post('tahunmulai').$this->input->post('bulanmulai');
            $sampai=$this->input->post('tahunsampai').$this->input->post('bulansampai');
            $mulai = ($start * $limit) - $limit;
            $pekerjaan=$this->input->post('pekerjaan');
            $wilayah=$this->input->post('wilayah');
            $caradaftar=$this->input->post('caradaftar');
            $carabayar=$this->input->post('carabayar');
            // $jenispeserta=$this->input->post('jenispeserta');
            $rujukan=$this->input->post('rujukan');
            $ruangan=$this->input->post('ruangan');
            $jenispasien=$this->input->post('jenispasien');
            if(empty($jenispasien)) $jenispasien=0;
            if(empty($pekerjaan)) $pekerjaan=0;
            if(empty($wilayah)) $wilayah=0;
            if(empty($caradaftar)) $caradaftar=0;
            if(empty($carabayar)) $carabayar=0;
            if(empty($rujukan)) $rujukan=0;
            if(empty($ruangan)) $ruangan=0;
            $subquery="";
            $header="<tr><td rowspan=2 style='width:50px;'>#</td><td rowspan='2'>Bulan</td>";
            $sheader="<tr>";
            if($jenispasien==1){
                $subquery="sum(case when (DATE_FORMAT(`tgl_kunjungan`,'%Y-%m-%d')=`tgl_daftar`) then 1 else 0 end) as pasienbaru,
                SUM(CASE WHEN (DATE_FORMAT(`tgl_kunjungan`,'%Y-%m-%d')!=`tgl_daftar`) THEN 1 ELSE 0 END) AS pasienlama,";
                $header.="<td colspan='2'>Jenis Pasien</td>";
                $sheader.="<td style='width:50px;'>Baru</td><td style='width:50px;'>Lama</td>";
            }
            if($wilayah==1){
                // $wilayah=array('Padang Panjang','Padang Pariaman','Tanah Datar','Bukittinggi','Lainnya');
                $subquery.="sum(case when (kab_kota='Padang Pariaman') then 1 else 0 end) as padangpariaman,
                SUM(CASE WHEN (kab_kota='Pariaman') THEN 1 ELSE 0 END) AS pariaman,
                SUM(CASE WHEN (kab_kota='Padang') THEN 1 ELSE 0 END) AS padang,
                SUM(CASE WHEN (kab_kota='Padang Panjang') THEN 1 ELSE 0 END) AS padangpanjang,
                SUM(CASE WHEN (kab_kota!='Padang Panjang' AND kab_kota!='Padang Pariaman' AND kab_kota!='Padang' AND kab_kota!='Padang') THEN 1 ELSE 0 END) AS wilayahlain,";
                $header.="<td colspan='5'>Wilayah</td>";
                $sheader.="<td style='width:50px;'>Padang Pariaman</td><td style='width:50px;'>Pariaman</td>
                <td style='width:50px;'>Padang</td><td style='width:50px;'>padangpanjang</td><td style='width:50px;'>Wilayah Lain</td>";
            }
            if($pekerjaan==1){
                $datapekerjaan=$this->rekapitulasi_model->getPekerjaan();
                $urut=0;
                foreach ($datapekerjaan as $p ) {
                    $urut++;
                    $fieldname="pekerjaan".$urut;
                    $fieldpekerjaan[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`pekerjaan`='".$p->pekerjaan_nama."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:70px;'>".$p->pekerjaan_nama ."</td>";
                }
                $jmlpekerjaan=count($datapekerjaan);
                $header.="<td colspan='$jmlpekerjaan'>Pekerjaan</td>";
                
            }
            if($caradaftar==1){
                $datacd=$this->rekapitulasi_model->getCaraDaftar();
                $urut=0;
                foreach ($datacd as $p ) {
                    $urut++;
                    $fieldname="cd".$urut;
                    $fieldcd[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`id_cara_daftar`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->caradaftar ."</td>";
                }
                $jmlcd=count($datacd);
                $header.="<td colspan='$jmlcd'>Cara Daftar</td>";
            }
            if($carabayar==1){
                $datacb=$this->rekapitulasi_model->getCaraBayar();
                $urut=0;
                foreach ($datacb as $p ) {
                    $urut++;
                    $fieldname="carabayar".$urut;
                    $fieldcb[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`id_cara_bayar`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->cara_bayar ."</td>";
                }
                $jmlcb=count($datacb);
                $header.="<td colspan='$jmlcb'>Cara Daftar</td>";
            }
            if($rujukan==1){
                $datarujukan=$this->rekapitulasi_model->getRujukan(array('aktif'=>1));
                $urut=0;
                foreach ($datarujukan as $p ) {
                    $urut++;
                    $fieldname="rujukan".$urut;
                    $fieldrujukan[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`id_rujuk`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->rujukan ."</td>";
                }
                $jmlrujukan=count($datarujukan);
                $header.="<td colspan='$jmlrujukan'>Rujukan</td>";
            }
            if($ruangan==1){
                $jnslayanan=$this->input->post('jnslayanan');
                $datapoli=$this->rekapitulasi_model->getPoli($jnslayanan);
                $urut=0;
                foreach ($datapoli as $p ) {
                    $urut++;
                    $fieldname="ruang".$urut;
                    $fieldruangan[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`idx`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->ruang ."</td>";
                }
                $jmlruangan=count($datapoli);
                $header.="<td colspan='$jmlruangan'>Ruangan/Poliklinik</td>";
            }
            $sheader.='</tr>';
            $header.="<td rowspan='2' style='width:50px;'>Jumlah</td></tr>";
            $header.=$sheader;
            
            $group=array(
                'jenispasien'=>$jenispasien,
                'pekerjaan'=>$pekerjaan,
                'wilayah'=>$wilayah,
                'caradaftar'=>$caradaftar,
                'carabayar'=>$carabayar,
                'rujukan'=>$rujukan,
                'ruangan'=>$ruangan
            );
            if(empty($fieldpekerjaan)) $fieldpekerjaan=array();
            if(empty($fieldcd)) $fieldcd=array();
            if(empty($fieldcb)) $fieldcb=array();
            if(empty($fieldrujukan)) $fieldrujukan=array();
            if(empty($fieldruangan)) $fieldruangan=array();
            $groupfield=array(
                'jenispasien'=>array('pasienbaru','pasienlamag'),
                'pekerjaan'=>$fieldpekerjaan,
                'wilayah'=>$wilayah,
                'caradaftar'=>$fieldcd,
                'carabayar'=>$fieldcb,
                'rujukan'=>$fieldrujukan,
                'ruangan'=>$fieldruangan
            );
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'start'     => $mulai,
                'row_count' => array(),
                'limit'     => $limit,
                'header'=>$header,
                'group'=>$group,
                'groupfield'=>$groupfield,
                'data'=>$this->rekapitulasi_model->getDataBulanan($limit,$mulai,$dari,$sampai,$subquery)
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function datatahunan(){
        if ($this->session->userdata('modul')==2) {
            $start = intval($this->input->post('start'));
            $limit = intval($this->input->post('limit'));
            // $group = $this->input->post('group');
            $dari=$this->input->post('dari');
            $sampai=$this->input->post('sampai');
            $mulai = ($start * $limit) - $limit;
            $pekerjaan=$this->input->post('pekerjaan');
            $wilayah=$this->input->post('wilayah');
            $caradaftar=$this->input->post('caradaftar');
            $carabayar=$this->input->post('carabayar');
            // $jenispeserta=$this->input->post('jenispeserta');
            $rujukan=$this->input->post('rujukan');
            $ruangan=$this->input->post('ruangan');
            $jenispasien=$this->input->post('jenispasien');
            if(empty($jenispasien)) $jenispasien=0;
            if(empty($pekerjaan)) $pekerjaan=0;
            if(empty($wilayah)) $wilayah=0;
            if(empty($caradaftar)) $caradaftar=0;
            if(empty($carabayar)) $carabayar=0;
            if(empty($rujukan)) $rujukan=0;
            if(empty($ruangan)) $ruangan=0;
            $subquery="";
            $header="<tr><td rowspan=2 style='width:50px;'>#</td><td rowspan='2'>Tahun</td>";
            $sheader="<tr>";
            if($jenispasien==1){
                $subquery="sum(case when (DATE_FORMAT(`tgl_kunjungan`,'%Y-%m-%d')=`tgl_daftar`) then 1 else 0 end) as pasienbaru,
                SUM(CASE WHEN (DATE_FORMAT(`tgl_kunjungan`,'%Y-%m-%d')!=`tgl_daftar`) THEN 1 ELSE 0 END) AS pasienlama,";
                $header.="<td colspan='2'>Jenis Pasien</td>";
                $sheader.="<td style='width:50px;'>Baru</td><td style='width:50px;'>Lama</td>";
            }
            if($wilayah==1){
                // $wilayah=array('Padang Panjang','Padang Pariaman','Tanah Datar','Bukittinggi','Lainnya');
                $subquery.="sum(case when (kab_kota='Padang Pariaman') then 1 else 0 end) as padangpariaman,
                SUM(CASE WHEN (kab_kota='Pariaman') THEN 1 ELSE 0 END) AS pariaman,
                SUM(CASE WHEN (kab_kota='Padang') THEN 1 ELSE 0 END) AS padang,
                SUM(CASE WHEN (kab_kota='Padang Panjang') THEN 1 ELSE 0 END) AS padangpanjang,
                SUM(CASE WHEN (kab_kota!='Padang Panjang' AND kab_kota!='Padang Pariaman' AND kab_kota!='Padang' AND kab_kota!='Padang') THEN 1 ELSE 0 END) AS wilayahlain,";
                $header.="<td colspan='5'>Wilayah</td>";
                $sheader.="<td style='width:50px;'>Padang Pariaman</td><td style='width:50px;'>Pariaman</td>
                <td style='width:50px;'>Padang</td><td style='width:50px;'>padangpanjang</td><td style='width:50px;'>Wilayah Lain</td>";
            }
            if($pekerjaan==1){
                $datapekerjaan=$this->rekapitulasi_model->getPekerjaan();
                $urut=0;
                foreach ($datapekerjaan as $p ) {
                    $urut++;
                    $fieldname="pekerjaan".$urut;
                    $fieldpekerjaan[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`pekerjaan`='".$p->pekerjaan_nama."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:70px;'>".$p->pekerjaan_nama ."</td>";
                }
                $jmlpekerjaan=count($datapekerjaan);
                $header.="<td colspan='$jmlpekerjaan'>Pekerjaan</td>";
                
            }
            if($caradaftar==1){
                $datacd=$this->rekapitulasi_model->getCaraDaftar();
                $urut=0;
                foreach ($datacd as $p ) {
                    $urut++;
                    $fieldname="cd".$urut;
                    $fieldcd[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`id_cara_daftar`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->caradaftar ."</td>";
                }
                $jmlcd=count($datacd);
                $header.="<td colspan='$jmlcd'>Cara Daftar</td>";
            }
            if($carabayar==1){
                $datacb=$this->rekapitulasi_model->getCaraBayar();
                $urut=0;
                foreach ($datacb as $p ) {
                    $urut++;
                    $fieldname="carabayar".$urut;
                    $fieldcb[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`id_cara_bayar`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->cara_bayar ."</td>";
                }
                $jmlcb=count($datacb);
                $header.="<td colspan='$jmlcb'>Cara Daftar</td>";
            }
            if($rujukan==1){
                $datarujukan=$this->rekapitulasi_model->getRujukan(array('aktif'=>1));
                $urut=0;
                foreach ($datarujukan as $p ) {
                    $urut++;
                    $fieldname="rujukan".$urut;
                    $fieldrujukan[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`id_rujuk`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->rujukan ."</td>";
                }
                $jmlrujukan=count($datarujukan);
                $header.="<td colspan='$jmlrujukan'>Rujukan</td>";
            }
            if($ruangan==1){
                $jnslayanan=$this->input->post('jnslayanan');
                $datapoli=$this->rekapitulasi_model->getPoli($jnslayanan);
                $urut=0;
                foreach ($datapoli as $p ) {
                    $urut++;
                    $fieldname="ruang".$urut;
                    $fieldruangan[]=$fieldname;
                    $subquery.="SUM(CASE WHEN (`idx`='".$p->idx."') THEN 1 ELSE 0 END) AS '".$fieldname."',";
                    $sheader.="<td style='width:50px;'>".$p->ruang ."</td>";
                }
                $jmlruangan=count($datapoli);
                $header.="<td colspan='$jmlruangan'>Ruangan/Poliklinik</td>";
            }
            $sheader.='</tr>';
            $header.="<td rowspan='2' style='width:50px;'>Jumlah</td></tr>";
            $header.=$sheader;
            
            $group=array(
                'jenispasien'=>$jenispasien,
                'pekerjaan'=>$pekerjaan,
                'wilayah'=>$wilayah,
                'caradaftar'=>$caradaftar,
                'carabayar'=>$carabayar,
                'rujukan'=>$rujukan,
                'ruangan'=>$ruangan
            );
            if(empty($fieldpekerjaan)) $fieldpekerjaan=array();
            if(empty($fieldcd)) $fieldcd=array();
            if(empty($fieldcb)) $fieldcb=array();
            if(empty($fieldrujukan)) $fieldrujukan=array();
            if(empty($fieldruangan)) $fieldruangan=array();
            $groupfield=array(
                'jenispasien'=>array('pasienbaru','pasienlamag'),
                'pekerjaan'=>$fieldpekerjaan,
                'wilayah'=>$wilayah,
                'caradaftar'=>$fieldcd,
                'carabayar'=>$fieldcb,
                'rujukan'=>$fieldrujukan,
                'ruangan'=>$fieldruangan
            );
            $response = array(
                'status'    => true,
                'message'   => "OK",
                'start'     => $mulai,
                'row_count' => array(),
                'limit'     => $limit,
                'header'=>$header,
                'group'=>$group,
                'groupfield'=>$groupfield,
                'data'=>$this->rekapitulasi_model->getDataTahunan($limit,$mulai,$dari,$sampai,$subquery)
            );
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function bulanan()
    {
        if ($this->session->userdata('modul')==2) {
            $data = array(
                'contentTitle' => 'Rekapitulasi Kunjungan Bulanan',
                'jenislayanan'=>$this->rekapitulasi_model->getJenisLayanan()
            );
            $view = array(
                'header' => $this->load->view('template/header', '', true),
                'nav_sidebar' => $this->load->view('template/nav_sidebar', array(), true),
                'content' => $this->load->view('rekammedis/rekapitulasi/bulanan', $data, true),
                'index_menu'=>10,
                'lib'           => array('javascript/bulanan.js'),
                'ajaxdata'  => array()
            );
            $this->load->view('template/theme', $view);
        }else {
            $sid = getSessionID();
            $url_login = base_url() . '?sid=' . $sid;
            echo "<script>alert('Ops. Sesi anda telah berubah! Silahkan login kembali');
                window.location.href = '$url_login'
                </script>";
        }
    }
    function tahunan()
    {
        if ($this->session->userdata('modul')==2) {
            
            $data = array('contentTitle' => 'Rekapitulasi Kunjungan Tahunan','jenislayanan'=>$this->rekapitulasi_model->getJenisLayanan());
            $view = array(
                'header' => $this->load->view('template/header', '', true),
                'nav_sidebar' => $this->load->view('template/nav_sidebar', array(), true),
                'content' => $this->load->view('rekammedis/rekapitulasi/tahunan', $data, true),
                'index_menu'=>10,
                'lib'           => array('javascript/tahunan.js'),
                'ajaxdata'  => array()
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
    function datarekapitulasi()
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
                'row_count' => $this->rekapitulasi_model->countrekapitulasi($keyword, $param),
                'limit'     => $limit,
                'data'      => $this->rekapitulasi_model->getrekapitulasi($limit, $mulai, $keyword, $param),
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
            $rekapitulasi = $this->rekapitulasi_model->getrekapitulasiBynomr($nomr);
            if (!empty($rekapitulasi)) {
                $config = array(
                    'url'           => 'rekammedis/rekapitulasi/datarekapitulasi/' . $nomr,
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
                $ruang=$this->rekapitulasi_model->getRuang();
                if(count($ruang)==1) $dokter=$this->rekapitulasi_model->getDokter($ruang[0]->idx); else $dokter=array();
                $data = array(
                    'contentTitle'  => 'Detail rekapitulasi',
                    'row'           => $rekapitulasi,
                    'cara_daftar'   => $this->rekapitulasi_model->getCaraDaftar(),
                    'jenis_layanan' => $this->rekapitulasi_model->getJenisLayanan(),
                    'cara_bayar'    => $this->rekapitulasi_model->getCaraBayar(),
                    'agama'         => $this->rekapitulasi_model->getAgama(),
                    'suku'          => $this->rekapitulasi_model->getSuku(),
                    'bahasa'        => $this->rekapitulasi_model->getBahasa(),
                    'provinsi'        => $this->rekapitulasi_model->getProvinsi(),
                    'kabupaten'        => $this->rekapitulasi_model->getKabupaten($rekapitulasi->nama_provinsi),
                    'kecamatan'        => $this->rekapitulasi_model->getKecamatan($rekapitulasi->kab_kota),
                    'kelurahan'        => $this->rekapitulasi_model->getkelurahan($rekapitulasi->kecamatan),
                    'ruang'=>$this->rekapitulasi_model->getRuang(),
                    'dokter'=>$dokter,
                    'rujukan'       => $this->rekapitulasi_model->getRujukan(array('idx <= ' => 6)),
                );
                $view = array(
                    'header'        => $this->load->view('template/header', '', true),
                    'nav_sidebar'   => $this->load->view('template/nav_sidebar', array(), true),
                    'content'       => $this->load->view('rekammedis/rekapitulasi/detail', $data, true),
                    'ajaxdata'      => getData($config),
                    'lib'           => array(
                        'javascript/pendaftaran.js',
                        
                    )
                );
                $this->load->view('template/theme', $view);
            } else {
                echo "<script>alert('Ops. Data rekapitulasi tidak ditemukan');
                window.location.href = '" . base_url() . "rekammedis/rekapitulasi" . "'
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
                'contentTitle'  => 'Daftar rekapitulasi Baru',
                'cara_daftar'   => $this->rekapitulasi_model->getCaraDaftar(),
                'jenis_layanan' => $this->rekapitulasi_model->getJenisLayanan(),
                'cara_bayar'    => $this->rekapitulasi_model->getCaraBayar(),
                'agama'         => $this->rekapitulasi_model->getAgama(),
                'suku'          => $this->rekapitulasi_model->getSuku(),
                'bahasa'        => $this->rekapitulasi_model->getBahasa(),
                'provinsi'        => $this->rekapitulasi_model->getProvinsi(),
                'kabupaten'        => array(),
                'kecamatan'        => array(),
                'kelurahan'        => array(),
                'rujukan'       => $this->rekapitulasi_model->getRujukan(array('idx <= ' => 6)),
            );
            $view = array(
                'header'        => $this->load->view('template/header', '', true),
                'nav_sidebar'   => $this->load->view('template/nav_sidebar', array(), true),
                'content'       => $this->load->view('rekammedis/rekapitulasi/tambah', $data, true),
                'lib'           => array('javascript/pendaftaran.js')
            );
            $this->load->view('template/theme', $view);
        } else {
            echo "<script>alert('Ops. Data rekapitulasi tidak ditemukan');
            window.location.href = '" . base_url() . "rekammedis/rekapitulasi" . "'
            </script>";
        }
    }
    
    function carabayar($idx)
    {
        
        if ($this->session->userdata('modul')==2) {
            $response = array('status' => true, 'data' => $this->rekapitulasi_model->getCaraBayar(array('idx' => $idx)));
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function rujukan()
    {
        
        if ($this->session->userdata('modul')==2) {
            $rujukan = $this->rekapitulasi_model->getRujukan(array('aktif' => 1));
            $response = array('status' => true, 'data' => $rujukan);
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function pilihrujukan($id){
        if ($this->session->userdata('modul')==2) {
            $rujukan = $this->rekapitulasi_model->pilihRujukan($id);
            $response = array('status' => true, 'data' => $rujukan);
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function dokter($poli){
        if ($this->session->userdata('modul')==2) {
            $rujukan = $this->rekapitulasi_model->getDokter($poli);
            $response = array('status' => true, 'data' => $rujukan);
        } else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function daftar_rekapitulasi_baru(){
        if ($this->session->userdata('modul')==2) {
            $kab=$this->input->post('kab_kota');
            $idx=$this->input->post('idx');
            if($kab=='Padang Panjang') $dalamkota=1; else $dalamkota=0;
            $data=array(
                'nomr'=>$this->rekapitulasi_model->generateNomr(),
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
            $id = $this->rekapitulasi_model->insertrekapitulasi($data);
            if($id){
                $response = array('status' => true, 'message' => 'Data rekapitulasi berhasil ditambahkan','nomr'=>$data['nomr']);
            }else{
                $response = array('status' => false, 'message' => 'Data rekapitulasi gagal ditambahkan');
            }
            
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function suksesdaftar($id=""){
        if ($this->session->userdata('modul')==2) {
            // $row=$this->rekapitulasi_model->getPendaftaran($id);
            $data = array(
                'contentTitle'  => 'Pendaftaran rekapitulasi Sukses',
                'row'           => $this->rekapitulasi_model->getPendaftaran($id),
            );
            $view = array(
                'header'        => $this->load->view('template/header', '', true),
                'nav_sidebar'   => $this->load->view('template/nav_sidebar', array(), true),
                'content'       => $this->load->view('rekammedis/rekapitulasi/sukses', $data, true),
                'lib'           => array(
                    'javascript/pendaftaran.js',
                    'javascript/jspdf.js',
                    'javascript/cetaksep.js'
                )
            );
            $this->load->view('template/theme', $view);
        }else {
            echo "<script>alert('Ops. Data rekapitulasi tidak ditemukan');
            window.location.href = '" . base_url() . "rekammedis/rekapitulasi" . "'
            </script>";
        }
    }
    function simpan_pendaftaran(){
        if ($this->session->userdata('modul')==2) {
            $cekKunjungan=$this->rekapitulasi_model->cekKunjungan($this->input->post('id_poli'),$this->input->post('nomr_rekapitulasi'));
            if($cekKunjungan>0){
                $response = array('status' => false, 'message' => 'rekapitulasi sudah terdaftar dipoli yang sama dan hari yang sama');
            }else{
                $mulai=0;
                $data=array(
                    'idx_rekapitulasi'=>$this->input->post('idx_rekapitulasi'),
                    'id_cara_daftar'=>$this->input->post('id_cara_daftar'),
                    'id_daftar'=>$this->rekapitulasi_model->createIdDaftar(),
                    'reg_unit'=>$this->rekapitulasi_model->createRegUnit($this->input->post('id_poli')),
                    'jns_layanan'=>$this->input->post('jns_layanan'),
                    'nomr_rekapitulasi'=>$this->input->post('nomr_rekapitulasi'),
                    'nama_rekapitulasi'=>$this->input->post('nama_rekapitulasi'),
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
                    'no_antrian'=>$this->rekapitulasi_model->createAntrian($this->input->post('id_poli'),$this->input->post('id_dokter'),$mulai),
                    'nobpjs'=>$this->input->post('nobpjs'),
                    'keluhan'=>$this->input->post('keluhan'),
                );
                $id=$this->rekapitulasi_model->insertPendaftaran($data);
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
            $this->rekapitulasi_model->updaterekapitulasi($data,$idx);
            $response = array('status' => true, 'message' => 'Data rekapitulasiberhasildiupdate');
        }else {
            $response = array('status' => false, 'message' => 'Session Expired');
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    function kabupaten(){
        if ($this->session->userdata('modul')==2) {
            $provinsi=urldecode($this->input->get('provinsi'));
            $data=$this->rekapitulasi_model->getKabupaten($provinsi);
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
            $data=$this->rekapitulasi_model->getKecamatan($provinsi);
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
            $data=$this->rekapitulasi_model->getKelurahan($provinsi);
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
                    $res = $this->rekapitulasi_model->cariSEPLokal($nojaminan,$tgl);
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
                        //         $rujukan = $this->rekapitulasi_model->cariRujukan($res_arr->response->noRujukan, 2);
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
