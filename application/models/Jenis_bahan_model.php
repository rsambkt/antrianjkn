<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
class Jenis_bahan_model extends CI_Model
{
    public $table = 'bahan_jenis';
    public $key = 'jenisid';
    public $order = 'DESC';
    function __construct()
    {
        parent::__construct();
    }
    //get all data
    function get_pemasok()
    {
        $this->db->order_by($this->key, 'desc');
        return $this->db->get($this->table)->result();
    }
    // get data with limit and search
    function get_limit_data($limit, $start = 0, $q = NULL) {
        $this->db->order_by($this->key);
            $this->db->like('jenisnama', $q);
            $this->db->or_like('jenisstatus', $q);
        $this->db->limit($limit, $start);
        return $this->db->get($this->table)->result();
    }
    // get total rows
    function total_rows($q = NULL) {
            $this->db->like('jenisnama', $q);
            $this->db->or_like('jenisstatus', $q);
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }
    //Save Data
    public function save($data)
    {
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }
    //delete data
    public function delete($id)
    {
        $this->db->where($this->key, $id);
        $this->db->delete($this->table);
    }
    //Get data by id
    public function get_by_id($id){
        $this->db->where($this->key,$id);
        return $this->db->get($this->table)->row();
    }
    // update data
    function update($data,$id){
        $this->db->where($this->key, $id);
        $this->db->update($this->table, $data);
    }
    
}

/* End of file Pemasok_model.php */
/* Location: ./application/models/Pemasok_model.php */
/* Please DO NOT modify this information : */
/* Generated by Codeigniter CRUD Generator V1 19 Oct 2017 11:03:48 */
/* Copyright @ 2017 By Wanhar Azri S.Kom */