<?

namespace App\Repositories;

use App\Models\Order;
use Carbon\Carbon;

class OrdersRepository extends Repository {

    public function __construct(Order $order)
    {
        $this->model = $order;
    }

    public function addOrder($data) {



        if(!$data['name']) $data['name'] = 'Не указано';
        if(!$data['email']) $data['email'] = 'Не указано';


        $data['status'] = json_encode([
            'active' => [
                'name' => 'awaiting',
                'date' => Carbon::now()->format('d-m-Y')
            ]
        ]);

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



        $data['options'] = json_encode($options);
        $data['basket'] = json_encode($data['basket']);

        unset($data['name'],$data['email'],$data['phone'],$data['address'],$data['getting'],$data['payment']);


        $this->model->fill($data);

        if($this->model->save()){
            return ['status' => 'Добавление прошло успешно'];
        }
        return ['error' => 'Не удалось произвести сохранение'];
    }


}
