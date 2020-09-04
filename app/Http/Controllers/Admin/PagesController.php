<?php

namespace App\Http\Controllers\Admin;

use App\Models\Page;
use Illuminate\Http\Request;

class PagesController extends AdminController
{

    public function __construct()
    {
        parent::__construct();
        $this->template = 'admin.index';
    }

    public function index(Request $request)
    {


       if ($request->ajax()) {

           $pages = $this->page_rep->getPagesForSearch($request->value,$request->page,$request->sort, $request->sort_type);
           return response()->json($pages);
        }

        $title = $this->title = 'Страницы';
        $pages = $this->page_rep->getPages();

        $this->content = view('admin.pages.index',compact('pages','title'))->render();

        return $this->renderOutput();
    }


    public function create()
    {
        $this->title = 'Добавление страницы';
        $this->content = view('admin.pages.add')->with(['title'=>$this->title])->render();
        return $this->renderOutput();
    }

    public function store(Request $request)
    {
        //
        $result = $this->page_rep->addPage($request);

        if(is_array($result) && !empty($result['error'])) {
            return back()->withErrors($result['error']);
        }

        return redirect(route('pages.index'))->with($result);
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

    /**
     * Show the form for editing the specified resource.
     *
     * @param Page $page
     * @return \Illuminate\Http\Response
     * @throws \Throwable
     */
    public function edit(Page $page)
    {
        //
        $this->title = 'Изменение страницы '.$page->brand_name;

        $this->content = view('admin.pages.add')->with([
            'title'=>$this->title,
            'page'=>$page,
        ])->render();

        return $this->renderOutput();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Page $page
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Page $page)
    {
        //
        $result = $this->page_rep->updatePage($request ,$page);

        if(is_array($result) && !empty($result['error'])) {
            return back()->withErrors($result['error']);
        }

        return redirect('/admin/pages/')->with($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Page $page
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Page $page)
    {
        if($page->delete()) {
            return response()->json(['status' => 'Материал удален']);
        } else{
            return response()->json(['status' => 'Удалить не удалось']);
        }
    }
}
