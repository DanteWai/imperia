
<div class="content-control-buttons">
    <a class="btn bg-back" href="/imperia_admin_panel">Назад</a>
    <a class="btn bg-basic" href="{{ route('brands.create') }}">Добавить элемент</a>
</div>
<h1 class="section-title">{{$title}}</h1>

@csrf
<div class="search">
    <div class="search-icon">
        <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M114.588 107.647L81.8722 74.9309C86.949 68.3675 89.6953 60.3428 89.6953 51.9023C89.6953 41.799 85.7522 32.3256 78.622 25.1827C71.4917 18.0398 61.9931 14.1094 51.9023 14.1094C41.8116 14.1094 32.313 18.0524 25.1827 25.1827C18.0398 32.313 14.1094 41.799 14.1094 51.9023C14.1094 61.9931 18.0524 71.4917 25.1827 78.622C32.313 85.7648 41.799 89.6953 51.9023 89.6953C60.3428 89.6953 68.3549 86.949 74.9183 81.8848L107.634 114.588C107.73 114.684 107.844 114.76 107.97 114.812C108.095 114.864 108.229 114.891 108.365 114.891C108.501 114.891 108.635 114.864 108.76 114.812C108.886 114.76 109 114.684 109.096 114.588L114.588 109.108C114.684 109.012 114.76 108.898 114.812 108.773C114.864 108.648 114.891 108.513 114.891 108.378C114.891 108.242 114.864 108.108 114.812 107.982C114.76 107.857 114.684 107.743 114.588 107.647V107.647ZM71.857 71.857C66.5156 77.1858 59.4357 80.1211 51.9023 80.1211C44.3689 80.1211 37.2891 77.1858 31.9477 71.857C26.6188 66.5156 23.6836 59.4357 23.6836 51.9023C23.6836 44.3689 26.6188 37.2765 31.9477 31.9477C37.2891 26.6188 44.3689 23.6836 51.9023 23.6836C59.4357 23.6836 66.5282 26.6063 71.857 31.9477C77.1858 37.2891 80.1211 44.3689 80.1211 51.9023C80.1211 59.4357 77.1858 66.5282 71.857 71.857Z"/>
        </svg>
    </div>
    <input placeholder="Поиск..." data-href="brands" type="search" data-token="{{ csrf_token() }}" id="search">
</div>
<br>

    <div class="filters" data-t-source="sort" id="sort">
        <button class="btn-outline" data-href="brands" data-search="created_at">По дате</button>
        <button class="btn-outline" data-href="brands" data-search="brand_name">По имени</button>
    </div>





<ul class="paginate" id="paginate">
    @if($brands->lastPage() > 1)
        @for($i = 1; $i <= $brands->lastPage();$i++)
            <div data-page="{{$i}}" class="paginate-item @if ($brands->currentPage() == $i)  {{"active"}}  @endif">{{$i}}</div>
        @endfor
    @endif
</ul>

<table id="list-component" class="table-elements" data-list="brands">
    <thead>
        <tr>
            <td>Название</td>
            <td>Изображение</td>
            <td>Дата изменения</td>
            <td>Редактировать</td>
            <td>Удалить</td>
        </tr>
    </thead>
    <tbody>
        @forelse ($brands as $item)
            <tr>
                <td>{{ $item->brand_name }}</td>
                <td>
                    @if(isset($item->brand_logo['min']))
                        <img style="max-width: 150px; height: auto;" src="{{'/public/images/brands/'.$item->brand_logo['min']}}" alt="">
                    @else
                        <img style="max-width: 150px; height: auto;" src="/public/images/admin/noimg.png" alt="{{ $item->brand_name }}">
                    @endif
                </td>
                <td>{{date('d-m-Y', strtotime($item->created_at))}}</td>
                <td style="width: 15px; text-align: center;">
                    <a class="edit-link" href="{{route('brands.edit',[$item->brand_id])}}">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.54975 11.2C2.58475 11.2 2.61975 11.1965 2.65475 11.1913L5.59825 10.675C5.63325 10.668 5.6665 10.6523 5.691 10.626L13.1092 3.20775C13.1255 3.19156 13.1383 3.17233 13.1471 3.15116C13.1559 3.12999 13.1604 3.10729 13.1604 3.08438C13.1604 3.06146 13.1559 3.03876 13.1471 3.01759C13.1383 2.99642 13.1255 2.97719 13.1092 2.961L10.2008 0.05075C10.1675 0.0175 10.1237 0 10.0765 0C10.0292 0 9.9855 0.0175 9.95225 0.05075L2.534 7.469C2.50775 7.49525 2.492 7.52675 2.485 7.56175L1.96875 10.5052C1.95173 10.599 1.95781 10.6955 1.98647 10.7864C2.01514 10.8772 2.06552 10.9597 2.13325 11.0267C2.24875 11.1387 2.394 11.2 2.54975 11.2V11.2ZM3.72925 8.148L10.0765 1.8025L11.3592 3.08525L5.012 9.43075L3.45625 9.7055L3.72925 8.148V8.148ZM13.44 12.67H0.56C0.25025 12.67 0 12.9203 0 13.23V13.86C0 13.937 0.063 14 0.14 14H13.86C13.937 14 14 13.937 14 13.86V13.23C14 12.9203 13.7498 12.67 13.44 12.67Z"/>
                        </svg>
                    </a>
                </td>
                <td style="width: 15px; text-align: center;">
                    <a class="delete-element delete-link" href="{{route('brands.destroy',[$item->brand_id])}}">
                        <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5385 5.13358L9.80513 6.40231L0.909376 1.26873L1.64274 0L3.87218 1.28339L4.86957 1.01205L8.04505 2.84547L8.3164 3.85018L10.5385 5.13358ZM0 12.5333V3.73284H3.71818L8.80042 6.66632V12.5333C8.80042 12.9223 8.64589 13.2953 8.37082 13.5704C8.09576 13.8455 7.72269 14 7.33368 14H1.46674C1.07773 14 0.704664 13.8455 0.429597 13.5704C0.154531 13.2953 0 12.9223 0 12.5333ZM1.46674 12.5333H7.33368V7.54636L3.27082 5.19958H1.46674V12.5333Z"/>
                        </svg>
                    </a>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="5">Производителей нет</td>
            </tr>
        @endforelse
    </tbody>
</table>
