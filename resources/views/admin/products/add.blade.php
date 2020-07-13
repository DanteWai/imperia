<div class="content-control-buttons">
    <a class="btn bg-back" href="/imperia_admin_panel/products/shiny">Назад</a>
</div>
<h1 class="section-title">{{$title}}</h1>
<!-- TODO вывод ошибок -->
@if($errors->any())
    <div class="alert alert-warning">
        {{$errors->first()}}
    </div>
@endif

<section class="content-wrapper form">

    {!! Form::open(['url'=>isset($product->product_id) ? route('product_update',[$brand->brand_id]) :  route('productStore'),'method'=>'POST','enctype'=>'multipart/form-data']) !!}


    <div class="form-body">
        <div class="form-section">
            <label for="category_id">Категория</label>
            <div class="select">
                <select class="select category_selector" name="category_id" id="category_id" data-href="product/add">
                    @foreach($categories as $item)
                        <option value="{{$item->category_id}}">{{$item->category_name}}</option>
                    @endforeach
                </select>
                <div class="select__arrow"></div>
            </div>
        </div>
        <div class="form-section">
            <label for="brand_id">Производитель</label>
            <div class="select">
                <select class="select" name="brand_id" id="brand_id">
                    @foreach($brands as $item)
                        <option value="{{$item->brand_id}}">{{$item->brand_name}}</option>
                    @endforeach
                </select>
                <div class="select__arrow"></div>
            </div>
        </div>
        <div class="form-section">
            <label for="product_model">Модель</label>
            <input class="text-input" type="text" placeholder="Модель" name="product_model" id="product_model">
        </div>
    </div>

    <div class="form-body">
        <div class="form-section">
            <label for="product_desc">Описание</label>
            <textarea class="text-input" placeholder="Описание" name="product_desc" id="product_desc" cols="30" rows="10">{{ isset($brand->brand_desc) ? $brand->brand_desc : old('brand_desc')}}</textarea>
        </div>
    </div>

    <div class="product-options">
        @if($category_id === 1)
            @include('admin.products.addShin')
        @elseif($category_id === 2)
            @include('admin.products.addDisk')
        @endif
    </div>



    @if(isset($product->product_id))
        @method('PUT')
    @endif
    <div>
        <input class="inputFile" type="file" name="product_images" id="product_images" data-multiple-caption="{count} files selected">
        <label for="product_images">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
            <span>Выбор изображения</span>
        </label>
    </div>
    <div>
        <input class="btn bg-success" type="submit" value="Сохранить">
    </div>

    {!! Form::close() !!}

</section>
