<?php

namespace App\Modules;

use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Facades\Http;

/*
 *
 * curl -> Guzzle

shinoman.ru
sibirkoleso.ru
shinplaneta.ru
cs42.ru
poehali.center
kemerovo.express-shina.ru

//
*/

class Parser
{
    protected $url;
    private $params;

    public function __construct($url)
    {

        $this->url = $url;
    }

    public function getHtml($url){

        $response = Http::get($url);
        return $response->body();
    }

    public  function getCard($craw, $nextPage){
        /*$brand = 'nokian';
        $model = 'wr d4';*/
        $model = strtolower(trim($this->params['model']));
        //dump($model);

        $card = $craw->filter('.product-card')->reduce(function (Crawler $node, $i) use( $model) {
            $fullName = strtolower($node->filter('a')->first()->text());
            if(/*strpos($fullName,$brand) !== false &&*/ strpos($fullName,$model) !== false){
                return  true;
            }
            return  false;
        });

        if($card->count() === 0 && $nextPage === false){
            return false;
        }
        if($card->count() === 0 && $nextPage !== false){
            sleep(1);
            $html = $this->getHtml($nextPage);
            $crawler = new Crawler($html,'http://www.shinoman.ru/tyres/by-size/');
            $np = $this->getNextPage($crawler);
            return $this->getCard($crawler, $np);
        }

        return $card;

    }

    public function getNextPage($craw){
        $pagination = $craw->filter('.pagination');
        if($pagination->count() > 0){
            $a = $pagination->filter('a')->last();
                if($a->attr('href')){
                    $nextPage = $a->link()->getUri();
                } else{
                    $nextPage = false;
                }


        } else{
            $nextPage = false;
        }

        return $nextPage;
    }

    public function parseProduct($params){

        $this->params = $params;
        sleep(1);
        /*$width = 155;
        $width = 65;
        $diametr = 14;
        $index = '75';
        $brand = 'nokian';
        $model = 'wr d4';*/
        $url = "http://www.shinoman.ru/tyres/by-size/?q=&order=-warehouses&brand=&price=&order=-warehouses&width_and_aspect_ratio={$params['width']}%2F{$params['height']}.0&rim_diameter={$params['diameter']}0&season=";

        $html = $this->getHtml($url);
        $crawler = new Crawler($html,'http://www.shinoman.ru/tyres/by-size/');


        $nextPage = $this->getNextPage($crawler);
        $card = $this->getCard($crawler, $nextPage);




        if($card !== false){
            $price = $card->filter('span[itemprop="price"]')->text();

            $data = [
                'price' => $price
            ];
        } else{
            $data = [
                'error' => 'Товар не найден'
            ];
        }

        return $data;

        /**/


        /*
         *
         * $crawler = new Crawler(null, $link);
            $crawler->addHtmlContent($html, 'UTF-8');
         * */


    }


}
