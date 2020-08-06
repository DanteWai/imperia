<?

namespace App\Repositories;

use App\Models\Order;
use App\Models\Product_option;
use Carbon\Carbon;

class OrdersRepository extends Repository {

    public function __construct(Order $order)
    {
        $this->model = $order;
    }

    public function getFullOrder($id){
        $order = $this->model->select('*')->where('order_id',$id)->first();

        $options_id = array_keys($order['basket']);

        $options_rep = new OptionsRepository(new Product_option());
        $products = $options_rep->getProducts($options_id);

        $basket = [];
        foreach ($products as $key => $product){
            $product['count_basket'] = $order['basket'][$product['option_id']];
            $basket[] = $product;
        }

        $order['basket'] = $basket;
        return $order;
    }

    public function addOrder($data) {



        if(!$data['name']) $data['name'] = 'Не указано';
        if(!$data['email']) $data['email'] = 'Не указано';


        $data['status'] = [
            'active' => [
                'name' => 'awaiting',
                'date' => Carbon::now()->format('d-m-Y')
            ]
        ];

        $options = [
            'payment' => $data['payment'],
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
        ];


        if($data['getting'] === 'delivery'){
            $options['getting'] = $data['address'];
        }
        else if($data['getting'] === 'pickup'){
            $options['getting'] = 'Самовывоз';
        }



        $data['options'] = $options;

        unset($data['name'],$data['email'],$data['phone'],$data['address'],$data['getting'],$data['payment']);


        $this->model->fill($data);

        if($this->model->save()){
            return ['status' => 'Добавление прошло успешно'];
        }
        return ['error' => 'Не удалось произвести сохранение'];
    }


}
