<?php

// get
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("Content-type: text/html; charset=utf-8");

    $masters = array(
        // rss
        array('name'=>'barretlee', 'type'=>'rss', 'url'=>'http://www.barretlee.com/rss2.xml'),
        array('name'=>'张鑫旭', 'type'=>'rss', 'url'=>'http://www.zhangxinxu.com/wordpress/feed/'),
        array('name'=>'十年踪迹', 'type'=>'rss', 'url'=>'https://www.h5jun.com/rss.html'),
        // html
        array('name'=>'白树', 'type'=>'html', 'url'=>'http://www.cnblogs.com/PeunZhang/'),
        array('name'=>'叶小钗', 'type'=>'html', 'url'=>'http://www.cnblogs.com/yexiaochai/'),
        array('name'=>'vajoy', 'type'=>'html', 'url'=>'http://www.cnblogs.com/vajoy/'),
        array('name'=>'空智', 'type'=>'html', 'url'=>'http://www.cnblogs.com/tugenhua0707/'),
        array('name'=>'Samaritans', 'type'=>'html', 'url'=>'http://www.cnblogs.com/dolphinX/')
    );
    $blogs = array(
        // rss
        array('name'=>'奇舞团', 'type'=>'rss', 'url'=>'http://www.75team.com/rss.html'),

        // html
        array('name'=>'alinode', 'type'=>'html', 'url'=>'http://alinode.aliyun.com/blog')
    );
    $weeklys = array(
        // html
        array('name'=>'FEX周刊', 'type'=>'html', 'url'=>'http://fex.baidu.com/weekly/'),

        // rss
        array('name'=>'奇舞周刊', 'type'=>'rss', 'url'=>'http://www.75team.com/weekly/rss.php')
    );
    $jokes = array(
        // html
        array('name'=>'捧腹笑话', 'type'=>'html', 'url'=>'http://m.pengfu.com/')
    );

    $res = array(
        'code'=>200,
        'data'=>array('masters'=>$masters, 'blogs'=>$blogs, 'weeklys'=>$weeklys, 'jokes'=>$jokes)
    );

    // callback wrapper
    if (strpos($_SERVER["REQUEST_URI"], 'callback')) {
        $res = $_GET['callback'].'('.json_encode($res).')';
        echo $res;
    }
}
?>