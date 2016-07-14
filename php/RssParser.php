<?php

/**
* Rss Parser
*/
class RssParser {
    function __construct($url) {
        $this->url = $url;
    }

    function get() {
        $res = null;

        // XML parser
        $rss = simplexml_load_file($this->url);
        $res = array(
            'title'=>(string)$rss->channel->title,
            'link'=>(string)$rss->channel->link,
            'date'=>(string)$rss->channel->lastBuildDate,
            'items'=>array()
        );
        // build date at rss2.0
        if (!isset($rss->channel->lastBuildDate)) {
            $res['date'] = (string)$rss->channel->pubDate;
        }

        $i = 0;
        foreach($rss->channel->item as $item) {
            // parse only 10 items
            // 转义省略号
            $desc = (string)$item->description;
            $desc = str_replace('&#8230;', '...', $desc);
            // 滤掉img标签
            $content = (string)$item->children("content", true);
            $content = preg_replace("/<img[^>]*>/si",
                "<small class='image-placeholder'>图片被叼走了..</small>",
                $content
            );
            if ($i < 10) {
                array_push($res['items'], array(
                    'title'=>(string)$item->title,
                    'link'=>(string)$item->link,
                    'date'=>(string)$item->pubDate,
                    'desc'=>$desc,
                    'content'=>$content
                ));
            }
            $i++;
        }

        return $res;
    }
}

// test
// $url = "http://www.75team.com/feed/"; // url to parse
// $url = "http://www.zhangxinxu.com/wordpress/feed/"; // url to parse
// // 图片都是相对路径，挂了
// $url = "http://www.barretlee.com/rss2.xml"; // url to parse
// // 没有content，只有desc
// $url = "http://www.75team.com/weekly/rss.php"; // url to parse
// $rp = new RssParser($url);
// $rss = $rp->get();
// print '<h2>'.$rss['title'].'</h2>';
// print '<h5>'.$rss['date'].'</h5>';
// foreach ($rss['items'] as $item) {
//     print '<a href="'.$item['link'].'">'.$item['title'].'</a><br />';
//     print '<p>date: '.$item['date'].'</p>';
//     print '<p>desc: '.$item['desc'].'</p>';
//     print '<div>content: '.$item['content'].'</div>';
// }
?>