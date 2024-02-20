<?php
function getAppName()
{
    return "SimRS App";
}
function getSessionID()
{
    return session_id();
}
function getAppLgName()
{
    return "<b>SimRS</b> App";
}
function getAppMnName()
{
    return "<b>SIM</b>K";
}
function getCompany()
{
    return COMPANY_NAME;
}
function getRS()
{
    return COMPANY_NAME;
}
function getAddress1()
{
    return REPORT_ADDRESS_1;
}
function getAddress2()
{
    return REPORT_ADDRESS_2;
}
function getFooterRS()
{
    return FOOTER_APP;
}
function getVersion()
{
    return VERSION_APP;
}
function getFooter()
{
    return FOOTER_RS . " [" . getFooterRS() . "]";
}
function getLoginLogo()
{
    return LOGO;
}
function getTimeUserLogin()
{
    $CI = &get_instance();
    $uid = $CI->session->userdata('userid');
    $CI->db->where('nrp', $uid);
    $cekQuery = $CI->db->get('pegawai');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['last_login'];
    } else {
        return "";
    }
}
function getUserNama()
{
    $CI = &get_instance();
    $uid = $CI->session->userdata('userid');
    $CI->db->where('nrp', $uid);
    $cekQuery = $CI->db->get('pegawai');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['pgwNama'];
    } else {
        return "";
    }
}
function getSpesificField($field="",$param=array(),$table="")
{
    $CI = &get_instance();
    // $uid = $CI->session->userdata('userid');
    $CI->db->where($param);
    $cekQuery = $CI->db->get($table);
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res[$field];
    } else {
        return "";
    }
}
function getSkin($idx)
{
    $CI = &get_instance();
    $CI->db->where('idx', $idx);
    $cekQuery = $CI->db->get('acc_modul');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['skin'];
    } else {
        return "";
    }
}
function longDate($tgl){
    $tgl=explode('-',$tgl);
    $bulan=array('','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember');
    return $tgl[2]." " .$bulan[intval($tgl[1])]." " .$tgl[0];
}
function isJSON($string){
    return is_string($string) && is_array(json_decode($string, true)) ? true : false;
}

function setDateEng($engDateFormat)
{
    $hari = substr($engDateFormat, 0, 2);
    $bln = substr($engDateFormat, 3, 2);
    $thn = substr($engDateFormat, 6, 4);
    return "$thn-$bln-$hari";
}
function setDateInd($engDateFormat)
{
    $hari = substr($engDateFormat, 8, 2);
    $bln = substr($engDateFormat, 5, 2);
    $thn = substr($engDateFormat, 0, 4);
    return "$hari/$bln/$thn";
}
function getLoket($loketid)
{
	$CI = &get_instance();
    $CI->db->where('loketid', $loketid);
    $cekQuery = $CI->db->get('loket');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['loketnama'];
    } else {
        return false;
    }
}

function getNamaPoli($loketid)
{
	$CI = &get_instance();
    $CI->db->where('idx', $loketid);
    $cekQuery = $CI->db->get('ruang');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['ruang'];
    } else {
        return false;
    }
}
function getKodePoli($loketid)
{
	$CI = &get_instance();
    $CI->db->where('idx', $loketid);
    $cekQuery = $CI->db->get('ruang');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['kode_jkn'];
    } else {
        return false;
    }
}
function getDisplay($loketid)
{
	$CI = &get_instance();
    $CI->db->where('idx', $loketid);
    $cekQuery = $CI->db->get('ruang');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['displayid'];
    } else {
        return false;
    }
}
function getLabeleAntrianPoli($kodepoli)
{
	$CI = &get_instance();
    $CI->db->where('kode_jkn', $kodepoli);
    $cekQuery = $CI->db->get('ruang');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['labelantrianpoli'];
    } else {
        return false;
    }
}
function getLabeleAntrianAdmisi($loketid)
{
	$CI = &get_instance();
    $CI->db->where('loketid', $loketid);
    $cekQuery = $CI->db->get('loket');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['loketlabel'];
    } else {
        return false;
    }
}
function getPoliRs($kodesub,$field='idx'){
    $CI = &get_instance();
    $CI->db->select($field)->where('kodejkn', $kodesub);
    $cekQuery = $CI->db->get('tbl_ruang');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['idx'];
    } else {
        return false;
    }
}
function getCustomeField($field,$param=array(),$table=''){
    $CI = &get_instance();
    $CI->db->select($field)->where($param);
    $cekQuery = $CI->db->get($table);
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res[$field];
    } else {
        return '';
    }
}
// function getPoliBpjs($kodesub){
//     $CI = &get_instance();
//     $CI->db->select("kodepolijkn")->where('kodejkn', $kodesub);
//     $cekQuery = $CI->db->get('tbl_ruang');
//     if ($cekQuery->num_rows() > 0) {
//         $res = $cekQuery->row_array();
//         return $res['idx'];
//     } else {
//         return false;
//     }
// }
function getDokterRs($kodedokter){
    $CI = &get_instance();
    $CI->db->select("kodedokterrs")->where('kode', $kodedokter);
    $cekQuery = $CI->db->get('jkn_dokter');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['kodedokterrs'];
    } else {
        return '-';
    }
}
function getDokterBpjs($kodedokter){
    $CI = &get_instance();
    $CI->db->select("kodedokterrs")->where('kode', $kodedokter);
    $cekQuery = $CI->db->get('jkn_dokter');
    if ($cekQuery->num_rows() > 0) {
        $res = $cekQuery->row_array();
        return $res['kodedokterrs'];
    } else {
        return '-';
    }
}
