<?php defined('BASEPATH') or exit('No direct script access allowed');

class Admin extends Admin_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->driver('Streams');
        $this->load->model('attributes_m');
    }

    public function ajax_create($title)
    {

        // Create
        $title = urldecode($title);
        $id    = $this->attributes_m->create($title);

        // Check
        if( $id > 0 ) { 
            echo 'ok|' . $id . '|' . $title;
            exit();
        }

        echo 'false';
        exit();
    }

    public function ajax_order()
    {

        // Variables
        $stream = 'firesale_products';
        $stream = $this->streams->streams->get_stream($stream, $stream);
        $row_id = $this->input->post('row');
        $order  = $this->input->post('order');
        $order  = explode(',', $order);
        $where  = array('stream_id' => $stream->id, 'row_id' => $row_id);

        // Ensure we have attributes
        if ( is_array($order) and $row_id > 0 ) {

            // Loop through each attribute
            foreach( $order as $i => $attribute ) {

                // Update
                $id = str_replace('attribute_', '', $attribute);
                $where['attribute_id'] = $id;
                $this->db->where($where)->update('firesale_attributes_assignments', array('ordering_count' => $i));
            }

            // Clear cache
            $this->pyrocache->delete_all('attributes_m');
            $this->pyrocache->delete_all('products_m');
        }
    }

}
