<section class=" form">
    <div class="col-sm-12 row">
        <a href="/imperia_admin_panel/parsers/" class="btn btn-dark btn-lg">Назад</a>
        <h2 class="h2 ml-3">{{ $title }}</h2>
    </div>

    @if($errors->any())
        <div class="alert alert-warning" role="alert">
            {{$errors->first()}}
        </div>
    @endif

    {!! Form::open(['class'=>'addProduct','url'=>isset($parser->parser_alias) ? route('parsers.update',['alias'=>$parser->parser_alias]) : route('parsers.store'),'method'=>'POST','enctype'=>'multipart/form-data']) !!}

    <div class="addProduct-header">
        <input class="form-model text-input" type="text" placeholder="Название" name="parser_name"
               value={{  $parser->parser_name  ?? old('parser_name') }}>
        <input class="form-model text-input" type="text" placeholder="Страница" name="page"
               value={{ $parser->parser_options['page']  ?? old('page') }}>
    </div>




    <input type="submit" value="Отправить">
    {!! Form::close() !!}

</section>
