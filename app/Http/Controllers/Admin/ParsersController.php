<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\Parser;
use Illuminate\Support\Str;
use App\Repositories\ParsersRepository;

class ParsersController extends AdminController
{

    public function __construct()
    {
        parent::__construct();
        $this->template = 'admin.index';

    }


    public function index()
    {
        $this->title = 'Парсеры сайтов';


        $this->content = view(env('THEME') . '.admin.parsers.index')->with([
            'title'=>$this->title,
            'parsers'=>$this->pars_rep->get()
        ])->render();

        return $this->renderOutput();
    }


    public function create()
    {
        $this->title = 'Добавление парсера';

        $this->content = view('admin.parsers.add')->with([
            'title'=>$this->title,

        ])->render();

        return $this->renderOutput();
    }


    public function store(Request $request)
    {
        $result = $this->pars_rep->addParser($request);

        if(is_array($result) && !empty($result['error'])) {
            return back()->with($result);
        }

        return redirect("/{$this->admin_url}/parsers")->with($result);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    public function edit(Parser $parser)
    {
        $parser->parser_options = json_decode($parser->parser_options);
        $this->title = 'Изменение парсера '.$parser->parser_name;

        $this->content = view('admin.parsers.add')->with([
            'title'=>$this->title,
            'parser'=>$parser,
        ])->render();

        return $this->renderOutput();
    }


    public function update(Request $request, Parser $parser)
    {
        $result = $this->pars_rep->updateParser($request,$parser);

        if(is_array($result) && !empty($result['error'])) {
            return back()->withErrors($result);
        }

        return redirect('/admin/parsers')->with($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
