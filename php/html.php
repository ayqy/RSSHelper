<?php
require 'HtmlParser.php';

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


    $hp = new HtmlParser($url);

    $res = array(
        'code'=>200,
        'data'=>$hp->get()
    );

    // test
    // echo json_encode($res);
    
    // callback wrapper
    if (strpos($_SERVER["REQUEST_URI"], 'callback')) {
        $res = $_GET['callback'].'('.json_encode($res).')';
        echo $res;
    }
}

?>