<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>

<?php
$content = '<p><a href="http://weibo.com/1812166904/D4hGckyzd" target="_blank" rel="external"><img src="/blogimgs/2015/11/20151105_5356dbce.jpg" alt="搜狗输入法bug - 微博"></a></p><img>';
$content = preg_replace("/<img[^>]*>/si",
    "<small class='image-placeholder'>图片被叼走了..<small>",
    $content
);
echo $content;
?>

</body>
</html>