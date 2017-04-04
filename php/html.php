<?php
require 'HtmlParser.php';

function url_encode($str) {
    if (is_array($str)) {
        foreach($str as $key=>$value) {
            $str[urlencode($key)] = url_encode($value);
        }
    } else {
        $str = urlencode($str);
    }

    return $str;
}

// get
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("Content-type: text/javascript; charset=utf-8");

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
        // $res = $_GET['callback'].'('.json_encode($res, JSON_UNESCAPED_UNICODE).')';
        $res = $_GET['callback'].'('.json_encode($res).')';
        // $res = $_GET['callback'].'('.urldecode(json_encode(url_encode($res))).')';

        echo $res;
    }
}

?>