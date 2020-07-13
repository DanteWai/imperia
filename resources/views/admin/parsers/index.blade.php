<section class="content-wrapper form">
    <div class="col-sm-12 row" >
        <a href="/imperia_admin_panel/" class="btn btn-dark btn-lg">Назад</a>
        <a href="{{ route('parsers.create') }}" class="btn btn-success btn-lg  ml-3">Добавить</a>
        <h2 class="h2 ml-3">{{ $title }}</h2>
    </div>



    @isset($result)
        Ошибка
    @endisset
    <section class="list-content row">
        @foreach ($parsers as $parser)
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-body">
                        <p class="card-title">{{ $parser->parser_name }}</p>
                        <p class="card-subtitle mb-2 text-muted">{{ $parser->parser_alias }}</p>
                        <a href="{{ route('parser_edit',['id'=>$parser->parser_alias]) }}" class="btn btn-primary btn-sm">Изменить</a>
                        <button data-toggle="modal" data-target="{{'#parser'.$parser->id}}"  class="btn btn-danger btn-sm">Удалить</button>

                        <!-- Modal -->
                        <div class="modal fade" id="{{ 'parser'.$parser->id }}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Удаление</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    </div>
                                    <div class="modal-body">
                                        Вы уверены что хотите удалить элемент?
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Отменить</button>
                                    <button type="button" class="btn btn-primary">Подтвердить удаление</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        @endforeach
    </section>

</section>
