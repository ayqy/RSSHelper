<?php

/**
* Rss Parser
*/
class RssParser {
    const LIST_LENGTH = 10;

    function __construct($url) {
        $this->url = $url;
    }

    private function filterImg($html) {
        // 滤掉img标签
        return preg_replace("/<img[^>]*>/si",
            "<small class='image-placeholder'>图片被叼走了..</small>",
            $html
        );
    }

    function get() {
        $res = null;

        // XML parser
        // $rss = simplexml_load_file($this->url);
        $reader = new XMLReader();
        $reader->open($this->url, 'utf-8');
        
        $res = array(
            'title' => "",
            'items' => array()
        );
        $tmpArr = null;
        while (@$reader->read()) {
            if ($reader->nodeType == XMLReader::ELEMENT) {
                $nodeName = $reader->name;
            }

            $nodeType = $reader->nodeType;
            if (!empty($nodeName)) {
                if ($nodeName === 'item') {
                    if ($tmpArr !== null && $tmpArr['title'] !== '') {
                        array_push($res['items'], $tmpArr);
                        if (count($res['items']) >= self::LIST_LENGTH) {
                            break;
                        }
                    }
                    // new array
                    $tmpArr = array(
                        'title' => '',
                        'link' => '',
                        'date' => '',
                        'desc' => '',
                        'content' => ''
                    );
                }

                // page title
                //! 开标签和闭标签会经历2次nodeName === 'title'
                if ($reader->depth === 3 && $nodeName === 'title' && $res['title'] === '') {
                    $res['title'] = $reader->value;
                }
                else if ($reader->depth > 3 &&
                        ($nodeType == XMLReader::TEXT || $nodeType == XMLReader::CDATA)) {
                    switch ($nodeName) {
                        case 'title':
                            $tmpArr['title'] = $reader->value;
                            break;
                        case 'link':
                            $tmpArr['link'] = $reader->value;
                            break;
                        case 'pubDate':
                            $tmpArr['date'] = $reader->value;
                            break;
                        case 'description':
                            // 转义省略号
                            $desc = $reader->value;
                            $desc = str_replace('&#8230;', '...', $desc);
                            // 滤掉img标签
                            $desc = $this->filterImg($desc);

                            $tmpArr['desc'] = $desc;
                            break;
                        case 'content:encoded':
                            $content = $reader->value;
                            // 滤掉img标签
                            $content = $this->filterImg($content);

                            $tmpArr['content'] = $content;
                            break;
                    }
                }
            }
        }
        $reader->close();

        return $res;
    }
}


// test
// header('Content-Type: text/html; charset=utf-8');
// $url = "http://www.zhangxinxu.com/wordpress/feed/"; // url to parse
// // 图片都是相对路径，挂了
// $url = "http://www.barretlee.com/rss2.xml"; // url to parse
// // 没有content，只有desc
// $url = "http://www.75team.com/weekly/rss.php"; // url to parse
// $rp = new RssParser($url);
// $rss = $rp->get();
// var_dump($rss);
// print '<h2>'.$rss['title'].'</h2>';
// foreach ($rss['items'] as $item) {
//     print '<h3><a href="'.$item['link'].'">'.$item['title'].'</a><br /></h3>';
//     print '<p>date: '.$item['date'].'</p>';
//     print '<p>desc: '.$item['desc'].'</p>';
//     print '<div>content: '.$item['content'].'</div>';
// }
?>