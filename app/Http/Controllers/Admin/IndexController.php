<?php

namespace App\Http\Controllers\Admin;

use App\Models\Order;
use App\Repositories\OrdersRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IndexController extends AdminController
{
    //
    public function __construct() {

        parent::__construct();
        $this->order_rep =  new OrdersRepository(new Order());
        $this->template = 'admin.index';

    }

    public function index() {
        $this->title = 'Панель администратора';
        $orders = $this->order_rep->get();
        dump($orders);
        $this->content = view('admin.mainPageContent',compact('orders'))->render();
        return $this->renderOutput();

    }

    public function update() { // временно
        $this->title = 'Обновления';
        $this->content = view('admin.update')->render();
        return $this->renderOutput();
    }
}
