<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test xml reader</title>
    <style>
    a {
        display: block;
    }
    </style>
</head>
<body>

<?php
$url = "http://www.zhangxinxu.com/wordpress/feed/"; // url to parse
$url = "http://www.barretlee.com/rss2.xml"; // 小胡子哥，content === desc
$url = "http://www.75team.com/weekly/rss.php"; // 奇舞周刊，没有content，desc就是全文
$url = 'http://www.75team.com/rss.html';    // 奇舞团博客，没有content，desc就是全文

//x $url = 'http://fex.baidu.com/feed.xml'; // xml有错
// http://fex.baidu.com/weekly/   直接解析html去

$url = 'https://www.h5jun.com/rss.html';    // 内容与奇舞团博客差不多，格式也一样



$reader = new XMLReader();
$reader->open($url, 'utf-8');
while ($reader->read()) {
    if($reader->nodeType == XMLReader::ELEMENT){
        $nodeName = $reader->name;
    }

    $nodeType = $reader->nodeType;
    if (!empty($nodeName)) {
        if ($reader->depth === 3 && $nodeName === 'title') {
            echo $title = $reader->value, '<br>';
        }
        else if ($reader->depth > 3 &&
                ($nodeType == XMLReader::TEXT || $nodeType == XMLReader::CDATA)) {
            switch ($nodeName) {
                case 'title':
                    echo $title = $reader->value, '<br>';
                    break;
                case 'link':
                    echo $link = $reader->value, '<br>';
                    break;
                case 'pubDate':
                    echo $date = $reader->value, '<br>';
                    break;
                case 'description':
                    echo $desc = $reader->value, '<br>';
                    break;
                case 'content:encoded':
                    echo $content = $reader->value, '<br>';
                    break;
            }
        }
    }
}
$reader->close();

?>

</body>
</html>