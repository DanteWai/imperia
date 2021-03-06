@if($products)
    @foreach ($products as $key=>$item)
        <tr>
            <td><a href="{{route('product_edit',[$item->option_id])}}">{{$item->full_name}}</a></td>
            <td>{{$item->count}}</td>
            <td>{{$item->price}}</td>
            <td>{{$item->updated_at}}</td>
            <td style="width:15px; text-align: center;">
                <a class="delete-element delete-link" href="{{route('product_destroy',[$item->option_id])}}">
                    <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5385 5.13358L9.80513 6.40231L0.909376 1.26873L1.64274 0L3.87218 1.28339L4.86957 1.01205L8.04505 2.84547L8.3164 3.85018L10.5385 5.13358ZM0 12.5333V3.73284H3.71818L8.80042 6.66632V12.5333C8.80042 12.9223 8.64589 13.2953 8.37082 13.5704C8.09576 13.8455 7.72269 14 7.33368 14H1.46674C1.07773 14 0.704664 13.8455 0.429597 13.5704C0.154531 13.2953 0 12.9223 0 12.5333ZM1.46674 12.5333H7.33368V7.54636L3.27082 5.19958H1.46674V12.5333Z"/>
                    </svg>
                </a>
            </td>
        </tr>
    @endforeach
@endif

