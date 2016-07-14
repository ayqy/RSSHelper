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
$i = 0; // counter
$url = "http://www.75team.com/feed/"; // url to parse
$url = "http://www.zhangxinxu.com/wordpress/feed/"; // url to parse
$url = "http://www.barretlee.com/rss2.xml"; // url to parse
$url = "http://www.75team.com/weekly/rss.php"; // url to parse


$rss = simplexml_load_file($url); // XML parser

// RSS items loop

print '<h2>'.$rss->channel->title.'</h2>'; // channel title + img with src

foreach($rss->channel->item as $item) {
if ($i < 10) { // parse only 10 items
    print '<a href="'.$item->link.'">'.$item->title.'</a><br />';
}

$i++;
}
?>

</body>
</html>