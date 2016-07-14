<?php
require 'RssParser.php';

// get
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("Content-type: text/html; charset=utf-8");

    $url = '';
    // arg
    if (isset($_GET['url'])) {
        $url = $_GET['url'];
    }
    else {
        exit('arg:url is not found');
    }
    $rp = new RssParser($url);
    $res = array(
        'code'=>200,
        'data'=>$rp->get()
    );

    // callback wrapper
    if (strpos($_SERVER["REQUEST_URI"], 'callback')) {
        $res = $_GET['callback'].'('.json_encode($res).')';
        echo $res;
    }
}
?>