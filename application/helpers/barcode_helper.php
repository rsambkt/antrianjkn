<?php 
require_once(APPPATH.'helpers/barcode.php');
function generatebarcode($kode){
    barcode::code39($kode,30,1);
}