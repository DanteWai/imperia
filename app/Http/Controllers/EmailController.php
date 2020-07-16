<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class EmailController extends SiteController
{

    public function footerMessages(Request $request){
        $post = $request->except('type');
        $type = $request->only('type');

        if(!$type) return response()->json(['error'=>"no tip"]);
        switch ($type) {
            case 'f_message':
                $theme = 'Сообщение с сайта';
                $view = 'email.message';
                break;
            case 'f_phone':
                $theme = 'Запрос на звонок';
                $view = 'email.phone';
                break;
            default:
                return response()->json(['error'=>"no tip"]);
        }

        try{
            Mail::send($view, ['data' => $post], function ($m) use($theme) {
                $m->to('aa502@yandex.ru')->subject($theme);
            });
        }
        catch(\Exception $e){
            return response()->json(['error'=>$e->getMessage()]);
        }

        return response()->json(['success'=>'Сообщение успешно отправлено']);

    }
}
