<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\AdminController;
use Illuminate\Http\Request;

use App\Models\Product_brand;
use Illuminate\Support\Facades\Route;


class BrandsController extends AdminController
{

    public function __construct()
    {
        parent::__construct();
        $this->template = 'admin.index';
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @throws \Throwable
     */

    public function index(Request $request)
    {
        if ($request->ajax()) {

            if(isset($request->only('page')['page']))
            $page = $request->only('page')['page'];
            $search = $request->only('search')['search'];
            $sort = $request->only('sort')['sort'];
            $sort_type = $request->only('sort_type')['sort_type'];

            $brands = $this->b_rep->getBrandsForSearch($search,$sort_type,$sort,$page);
            return response()->json($brands);

        }

        $title = $this->title = 'Производители';
        $brands = $this->b_rep->get();
        $this->content = view('admin.brands.index',compact('brands', 'title'))->render();
        return $this->renderOutput();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     * @throws \Throwable
     */
    public function create()
    {
        $this->title = 'Добавление производителя';
        $this->content = view('admin.brands.add')->with(['title'=>$this->title])->render();
        return $this->renderOutput();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $result = $this->b_rep->addBrand($request);

        if(is_array($result) && !empty($result['error'])) {
            return back()->withErrors($result['error']);
        }

        return redirect('/admin/brands/')->with($result);
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
     * @param Product_brand $brand
     * @return \Illuminate\Http\Response
     * @throws \Throwable
     */
    public function edit(Product_brand $brand)
    {


        $this->title = 'Изменение производителя '.$brand->brand_name;

        $this->content = view('admin.brands.add')->with([
            'title'=>$this->title,
            'brand'=>$brand,
        ])->render();

        return $this->renderOutput();

    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Product_brand $brand
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product_brand $brand)
    {

        $result = $this->b_rep->updateBrand($request ,$brand);

        if(is_array($result) && !empty($result['error'])) {
            return back()->withErrors($result['error']);
        }

        return redirect('/admin/brands/')->with($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product_brand $brand
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Product_brand $brand)
    {

        if(isset($brand->brand_logo) && !empty($brand->brand_logo)){
            foreach($brand->brand_logo as $item){
                $path = public_path('images/brands/'.$item);
                if(file_exists($path)){
                    unlink($path);
                }
            }
        }

        if($brand->delete()) {
            return response()->json(['status' => 'Материал удален']);
        } else{
            return response()->json(['status' => 'Удалить не удалось']);
        }

        /* TODO проощарить return json_encode($data); и X-Requested-With*/
    }
}
