<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Referensi extends CI_Controller {
    function __construct()
    {

    }
    function index(){
        $res=bridgingbpjs('referensi/obat/');
        header('Content-Type: application/json');
        echo $res;
    }
}