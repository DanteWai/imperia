@extends(env('THEME').'.catalog.body')

@section('nav')
    {!!$nav!!}
@endsection
@section('basket')
    {!!$basket ?? ''!!}
@endsection

@section('content')
    {!!$content!!}
@endsection

@section('footer')
    {!!$footer!!}
@endsection