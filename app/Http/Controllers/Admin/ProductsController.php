<?php

namespace App\Http\Controllers\Admin;

use Debugbar;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class ProductsController extends AdminController
{
    public function __construct()
    {
        parent::__construct();
        $this->template = 'admin.index';
    }

    public function index($category, Request $request)
    {

        $category_id = $this->c_rep->getIdFromAlias($category);

        if ($request->ajax()) {

            if(isset($request->only('page')['page']))
            $page = $request->only('page')['page'];
            $search = $request->only('search')['search'];
            $sort = $request->only('sort')['sort'];
            $sort_type = $request->only('sort_type')['sort_type'];

            $products = $this->o_rep->getProductsForSearch($category_id->category_id, $search,$sort_type,$sort,$page);
            return response()->json($products);

        }

        $title = $this->title = 'Управление товаром';
        //$products = $this->p_rep->getAdminProducts($category_id->category_id);
        $products = $this->o_rep->getProductsForSearch($category_id->category_id, false,'updated_at','asc',1);
        $this->content = view('admin.products.index',compact('products','category','title'))->render();

        return $this->renderOutput();
    }

    public function create(Request $request)
    {
        //
        if($request->ajax()){
            $id = $request->only('id')["id"];
            $data['html'] = 'error';
            if($id == 1){
                $data['html'] =  $this->content = view('admin.products.addShin')->render();
            } else if($id == 2){
                $data['html'] =  $this->content = view('admin.products.addDisk')->render();
            }
            return response()->json($data);
        }
        $title = $this->title = 'Добавление товара';

        $category_id = 1;
        $categories = $this->c_rep->get();
        $brands = $this->b_rep->get();

        Debugbar::info($categories);
        Debugbar::info($brands);
        $this->content = view('admin.products.add',compact('category_id','title','categories','brands'))->render();

        return $this->renderOutput();
    }

    public function store(Request $request)
    {
        //
        $result = $this->p_rep->addProduct($request);

        if(is_array($result) && !empty($result['error'])) {
            return back()->withErrors($result['error']);
        }

        $result = $this->o_rep->addOption($result);

        return redirect('/admin/products/shiny')->with($result);
    }


    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
