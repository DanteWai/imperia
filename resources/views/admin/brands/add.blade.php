<div class="content-control-buttons">
    <a class="btn bg-back" href="/imperia_admin_panel/brands">Назад</a>
</div>
<h1 class="section-title">{{$title}}</h1>
<!-- TODO вывод ошибок -->
@if($errors->any())
    <div class="alert alert-warning">
        {{$errors->first()}}
    </div>
@endif

<section class="content-wrapper form">

    {!! Form::open(['url'=>isset($brand->brand_alias) ? route('brands.update',[$brand->brand_id]) :  route('brands.store'),'method'=>'POST','enctype'=>'multipart/form-data']) !!}

         @if(isset($brand->brand_logo['min']))
            <img src="{{'/public/images/brands/'.$brand->brand_logo['min']}}" alt="">
             <br><br>
        @endif
            <div class="form-body">
                <div class="form-section">
                    <label for="brand_name">Название</label>
                    <input class="form-model text-input" type="text" placeholder="Название" name="brand_name" id="brand_name" value="{{ isset($brand->brand_name) ? $brand->brand_name : old('brand_name')}}">
                </div>
            </div>

            <div class="form-body">
                <div class="form-section">
                    <label for="brand_name">Описание</label>
                    <textarea class="text-input" placeholder="Описание" name="brand_desc" id="brand_desc" cols="30" rows="10">{{ isset($brand->brand_desc) ? $brand->brand_desc : old('brand_desc')}}</textarea>
                </div>
            </div>



            @if(isset($brand->brand_alias))
                <div>@method('PUT')</div>
            @endif
            <div>
                <input class="inputFile" type="file" name="brand_logo" id="brand_logo" data-multiple-caption="{count} files selected">
                <label for="brand_logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                    <span>Выбор изображения</span>
                </label>
            </div>

            <div>
                <input class="btn bg-success" type="submit" value="Сохранить">
            </div>

    {!! Form::close() !!}

</section>
