<?php
require 'lib/simple_html_dom.php';

/**
* Html Parser
*/
class HtmlParser {
    function __construct($url) {
        $this->url = $url;
    }

    function get() {
        $MAX_SIZE = 10;   // 只抓10条

        $res = null;

        // 新建一个Dom实例
        $html = new simple_html_dom();
        // 从url中加载
        $html->load_file($this->url);

        $title = $html->find('title', 0);
        $res = array(
            'title'=>$title->plaintext,
            'link'=>$this->url,
            'date'=>'',
            'items'=>array()
        );
        // 每个对象都有4个基本对象属性:
        // tag – 返回html标签名
        // innertext – 返回innerHTML
        // outertext – 返回outerHTML
        // plaintext – 返回html标签中的文本

        // 白树 div.forFlow
        if ($this->url === 'http://www.cnblogs.com/PeunZhang/' ||
            $this->url === 'http://www.cnblogs.com/yexiaochai/' ||
            $this->url === 'http://www.cnblogs.com/vajoy/' ||
            $this->url === 'http://www.cnblogs.com/dolphinX/') {
            // 白树、Samaritans
            $main = $html->find('div.forFlow', 0);
            if (!is_object($main)) {
                // 叶小钗
                $main = $html->find('div#centercontent', 0);
            }
            if (!is_object($main)) {
                // vajoy
                $main = $html->find('div#mainContent', 0);
            }
            if (!is_object($main)) {
                // 其它
                //...
            }
            
            // title、link
            $postTitles = $main->find('div.postTitle');
            $i = 0;
            foreach ($postTitles as $postTitle) {
                array_push($res['items'], array(
                    'title'=>$postTitle->plaintext,
                    'link'=>$postTitle->find('a', 0)->href
                ));
                
                $i++;
                if ($i === $MAX_SIZE) {
                    break;
                }
            }
            // desc
            $postDescs = $main->find('div.c_b_p_desc');
            $i = 0;
            foreach ($postDescs as $postDesc) {
                $res['items'][$i]['desc'] = $postDesc->plaintext;
                
                $i++;
                if ($i === $MAX_SIZE) {
                    break;
                }
            }
            // date、no content
            $postDates = $main->find('div.postDesc');
            $i = 0;
            foreach ($postDates as $postDate) {
                $res['items'][$i]['date'] = $postDate->plaintext;
                $res['items'][$i]['content'] = '';
                
                $i++;
                if ($i === $MAX_SIZE) {
                    break;
                }
            }
        }
        // else if(stripos($this->url, 'http://www.barretlee.com/') === 0) {
        //     if (!is_object($main)) {
        //         // barretlee
        //         $main = $html->find('div.post', 0);
                
        //     }
        // }
        // 云溪
        else if ($this->url === 'http://www.cnblogs.com/tugenhua0707/') {
            $main = $html->find('div#content', 0);
            $posts = $main->find('div.post-list-item');
            $i = 0;
            foreach ($posts as $post) {
                array_push($res['items'], array(
                    'title'=>$post->find('h2', 0)->plaintext,
                    'link'=>$post->find('h2 a', 0)->href,
                    'date'=>$post->find('small', 0)->plaintext,
                    'desc'=>$post->find('div.c_b_p_desc', 0)->plaintext,
                    'content'=>''
                ));
                
                $i++;
                if ($i === $MAX_SIZE) {
                    break;
                }
            }
        }
        // alinode
        else if ($this->url === 'http://alinode.aliyun.com/blog') {
            $main = $html->find('main.main-content', 0);
            $posts = $main->find('article.post');
            $i = 0;
            foreach ($posts as $post) {
                array_push($res['items'], array(
                    'title'=>$post->find('h2.post-title', 0)->plaintext,
                    // 相对路径转绝对路径
                    'link'=>'http://alinode.aliyun.com'.
                        $post->find('h2.post-title a', 0)->href,
                    'date'=>$post->find('div.post-metadata', 0)->plaintext,
                    'desc'=>$post->find('section.post-body', 0)->innertext,
                    'content'=>''
                ));

                $i++;
                if ($i === $MAX_SIZE) {
                    break;
                }
            }
        }
        // 捧腹笑话
        else if ($this->url === 'http://m.pengfu.com/zuixin/') {
            $main = $html->find('section.text', 0);
            $posts = $html->find('section.text section.textdl');
            $i = 0;
            foreach ($posts as $post) {
                // 跳过广告
                if (sizeof($post->find('div.tex1 script', 0)) === 0) {
                    array_push($res['items'], array(
                        'title'=>$post->find('h3', 0)->plaintext,
                        // 相对路径转绝对路径
                        'link'=>'http://m.pengfu.com'.
                            $post->find('h3 a', 0)->href,
                        'date'=>$post->find('div.userMsg', 0)->plaintext,
                        'desc'=>$post->find('div.tex1', 0)->innertext,
                        'content'=>''
                    ));
                    
                    $i++;
                    if ($i === $MAX_SIZE) {
                        break;
                    }
                }
            }
        }
        
        return $res;
    }
}
?>