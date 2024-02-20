<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('users_model');
        //$this->load->model('nota_model');
    }
    function index()
    {
        $ses_state = $this->users_model->cek_session_id();
        if ($ses_state) {


            $sekarang = date('Y-m-d');
            $this->db->where('jns_layanan', 2);
            $this->db->where('DATE_FORMAT(tgl_kunjungan,"%Y-%m-%d")', $sekarang);
            $rj = $this->db->get('pendaftaran')->num_rows();

            $this->db->where('jns_layanan', 3);
            $this->db->where('DATE_FORMAT(tgl_kunjungan,"%Y-%m-%d")', $sekarang);
            $gd = $this->db->get('pendaftaran')->num_rows();

            $this->db->where('jns_layanan', 1);
            $this->db->where('DATE_FORMAT(tgl_kunjungan,"%Y-%m-%d")', $sekarang);
            $ri = $this->db->get('pendaftaran')->num_rows();
            $data = array('contentTitle' => 'Home', 'rj' => $rj, 'gd' => $gd, 'ri' => $ri);
            $view = array(
                'header' => $this->load->view('template/header', '', true),
                'nav_sidebar' => $this->load->view('template/nav_sidebar', array(), true),
                'content' => $this->load->view('admin/index', $data, true),
                'index_menu'=>0,
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
}
