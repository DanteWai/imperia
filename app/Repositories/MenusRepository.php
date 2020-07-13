<? 

namespace App\Repositories;

use App\Models\Main_menu;

class MenusRepository extends Repository {

    public function __construct(Main_menu $menu)
    {
        $this->model = $menu;
    }

}