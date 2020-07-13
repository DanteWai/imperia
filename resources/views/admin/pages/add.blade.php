<div class="content-control-buttons">
    <a class="btn bg-back" href="/imperia_admin_panel/pages">Назад</a>
</div>
<h1 class="section-title">{{$title}}</h1>

<!-- TODO вывод ошибок -->
@if($errors->any())
    <div class="alert alert-warning">
        {{$errors->first()}}
    </div>
@endif

<section class="content-wrapper form">

    {!! Form::open(['url'=>isset($page->page_alias) ? route('pages.update',[$page->id]) :  route('pages.store'),'method'=>'POST','enctype'=>'multipart/form-data']) !!}

            <div class="form-body">
                <div class="form-section">
                    <label for="page_name">Название</label>
                    <input class="form-model text-input" type="text" placeholder="Название" name="page_name" id="page_name" value="{{ isset($page->page_name) ? $page->page_name : old('page_name')}}">
                </div>
                <div class="form-section">
                    <label for="page_alias">Alias</label>
                    <input class="form-model text-input" type="text" placeholder="Алиас" name="page_alias" id="page_alias" value="{{ isset($page->page_alias) ? $page->page_alias : old('page_alias')}}">
                </div>
            </div>

            <div class="form-body">
                <div class="form-section">
                    <label for="page_desc">Описание</label>
                    <textarea class="text-input" placeholder="Описание" name="page_desc" id="page_desc" cols="30" rows="10">{{ isset($page->page_desc) ? $page->page_desc : old('page_desc')}}</textarea>
                </div>
            </div>


            @if(isset($page->page_alias))
                <div>
                    @method('PUT')
                </div>
            @endif

            <div>
                <input class="btn bg-success" type="submit" value="Сохранить">
            </div>

    {!! Form::close() !!}

</section>

<script>
    CKEDITOR.replace( 'page_desc' );
</script>
