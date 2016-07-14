<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test lastRSS</title>
    <style>
    a {
        display: block;
    }
    </style>
</head>
<body>

<?php
require 'lastRSS.php';

$url = 'http://www.zhangxinxu.com/wordpress/feed/';
$url = 'http://feed.cnblogs.com/blog/u/161525/rss';

// create lastRSS object
$rss = new lastRSS();

// setup transparent cache
$rss->cache_dir = './cache';
$rss->cache_time = 3600; // one hour

// load some RSS file
if ($rs = $rss->get($url)) {
    html('title: '.$rs['title']);
    html('items_count：'.$rs['items_count']);
    foreach ($rs['items'] as $item) {
        html($item['title'], 'a', array('href' => $item['link']));
    }
    
} else {
    die ('Error: RSS file not found...');
}

function html($str, $tag = 'p', $args = null) {
    $sHtml = '<'.$tag;
    // attrs
    if (is_array($args)) {
        $sHtml .= ' ';
        foreach ($args as $key => $value) {
            $sHtml .= $key.'="'.$value.'"';
        }
    }
    echo $sHtml.' >'.$str.'</'.$tag.'>';
}
?>

</body>
</html>