<script type="text/javascript">
$(document).ready(function($) {
	$('body').addClass('genre_old alt-price-plates')
});
</script>
<div id="wrapper" class="png full-height">
        <div class="shadows"></div>
<div class="one-column">
<script>
$(document).ready(function(){
    var params = {};

    Runner.genre(params);
});
</script>

<div class="content-main">

<h1><?=( ($_GET['group'] != '') ? sp_gruppa::get($_GET['group'])->gruppa_name : "Все видео")?></h1>
    <div class="canvas">

        <div class="content-line">

            <div class="main-col">

                <div class="content-line">
                </div>

                <!-- Subgenres block -->

            </div>

            <div class="extra-col">
                <!-- Top rated videos -->

                <!-- Awarded videos -->

                <!-- Box-office hits -->
                <!-- New series -->

                <!-- Friends watching -->

                <!-- Watch again -->
            </div>

        </div>

        <div class="content-line">
            <!-- Catalog -->
            <div class="catalog-content" id="plus_promo_catalog_head">
                    <a name="catalog" class="scroll-target"></a>
                    <div id="filters-wrapper-position" class="filters-wrapper-position"></div>
                    <div class="filters-wrapper catalog-page" id="catalog-filters">
                        <ul class="filter-nav">
                            <li>
                                <a href="<?=$this->link('index', 'films')?>">Категория</a>
                                <div class="submenu">
                                    <ul class="top">
                                        <li><a href="<?=$this->link('index', 'films')?>">Любая категория</a></li>
                                    </ul>
                                    <ul>
                                        <?php foreach ($groups as $key => $item): ?>
                                        <li>
                                            <a href="<?=$this->link('index', 'films').'&group='.$item->codeid?>" title="<?=$item->codeid?>"><?=$item->gruppa_name?></a>
                                        </li>
                                        <?php endforeach ?>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <a href="<?=$this->link('index', 'films')?>">Год</a>
                                <div class="submenu">
                                    <ul class="top">
                                        <li><a href="<?=$this->link('index', 'films')?>">Любой год</a></li>
                                    </ul>
                                    <ul>
                                        <li><a href='/videos/?personal=1&year_from=2013&year_to=2013#catalog'>2013 год</a></li>
                                        <li><a href='/videos/?personal=1&year_from=2000&year_to=2012#catalog'>2000 — 2012</a></li>
                                        <li><a href='/videos/?personal=1&year_from=1990&year_to=2000#catalog'>1990 — 2000</a></li>
                                        <li><a href='/videos/?personal=1&year_from=1980&year_to=1990#catalog'>1980 — 1990</a></li>
                                        <li><a href='/videos/?personal=1&year_from=1960&year_to=1980#catalog'>1960 — 1980</a></li>
                                        <li><a href='/videos/?personal=1&year_from=1940&year_to=1960#catalog'>1940 — 1960</a></li>
                                        <li><a href='/videos/?personal=1&year_from=1900&year_to=1940#catalog'>до 1940 года</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <ul class="preview-descr-wrap">
                            <li class="descr-catalog"><a href="/videos/list/?personal=1#catalog"></a></li>
                                <li class="preview-catalog active"><a href="/videos/?personal=1#catalog"></a></li>
                        </ul>
                    </div>
                    <ul class="films-gallery large" data-wsource="genre_catalogue_all" id="plus_promo_catalog">
                    <?php foreach ($all_films as $key => $film): ?>
                        <li class="vb-item element-selector" data-id="<?=$film->codeid?>" data-type="content">
                            <div class="image" onmouseover="da.xinfo.load(this);" data-uid="<?=$film->codeid?>0">
                                <a href="<?=$this->link('index','watch').'&film='?><?=$film->codeid?>">
                                    <img src="<?=$film->cover?>" alt="<?=$film->film_name?>">
                                    <span class="overlay"></span>
                                </a>
                                <div class="xinfo" id="cat_xinfo_<?=$film->codeid?>1">
                                   <h3><?=$film->film_name?></h3>
                                    <div class="tags">
                                        <div class="tags"><?=$film->year?>, <?=$film->country?>, <?=$film->codeid?></div>
                                    </div>
                                    <div class="action-button-wrapper">
                                        <a href="<?=$this->link('index','watch').'&film='?><?=$film->codeid?>" class="action-button gradient icon-view button-view view_link">Смотреть</a>
                                        <a href="#" data-id="<?=$this->link('index','watch').'&film='?><?=$film->codeid?>" class="action-button dim gradient icon-favorite button-favorite fav">В очередь</a>
                                    </div>
                                    <div class="rating-list">
                                        <span class="h3i">Рейтинги:</span>
                                        <ul>
                                           <!--  <li>
                                                Кинопоиск: <strong>7,0</strong>
                                            </li>
                                            <li>
                                                IMDb: <strong>6,4</strong>
                                            </li> -->
                                            <li>
                                                ivi.ru: <strong><?=$film->raiting/10?></strong>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="wrap-text-xinfo">
                                        <div class="directors">
                                            <span class="h3i">Режиссер:</span>
                                            <?=$film->director?>
                                        </div>
                                        <div class="actors">
                                            <span class="h3i">Актеры:</span>
                                            <?=$film->actors?>
                                        </div>
                                        <div class="text">
                                            <?=$film->description?>
                                        </div>
                                    </div>
                                    <span class="root"></span>
                                </div>
                            </div>
                            <div class="scale-rating size11 unvoted">
                                <div style="width:<?=$film->rating?>%"></div>
                                <ul data-id="<?=$film->codeid?>">
                                    <li class="rate1" data-id="1"><a href="#"><em></em></a></li>
                                    <li class="rate2" data-id="2"><a href="#"><em></em></a></li>
                                    <li class="rate3" data-id="3"><a href="#"><em></em></a></li>
                                    <li class="rate4" data-id="4"><a href="#"><em></em></a></li>
                                    <li class="rate5" data-id="5"><a href="#"><em></em></a></li>
                                    <li class="rate6" data-id="6"><a href="#"><em></em></a></li>
                                    <li class="rate7" data-id="7"><a href="#"><em></em></a></li>
                                    <li class="rate8" data-id="8"><a href="#"><em></em></a></li>
                                    <li class="rate9" data-id="9"><a href="#"><em></em></a></li>
                                    <li class="rate10" data-id="10"><a href="#"><em></em></a></li>
                                </ul>
                            </div>
                            <strong>
                                <a href="<?=$this->link('index','watch').'&film='?><?=$film->codeid?>" title="<?=$film->film_name?>"><?=$film->film_name?></a>
                            </strong>
                            <div class="tags"><?=$film->year?>, <?=$film->country?>, <?=$film->codeid?></div>
                        </li>
                    <?php endforeach ?>
                    </ul>
                    <p class="more">
                        <a class="underdotted" id="plus_more_button" href="/videos/?personal=1&amp;offset=20">Показать еще</a>
                    </p>
                    <script>
                        plus_promo();
                    </script>
            </div>
        </div>
    </div>
</div>
<script>

cuSel({
    changedEl: 'form.selector select, #order-block select',
    visRows: 7,
    scrollArrows: false
});


// Expand/contract intro text {{

var text_elem = $('.intro-text');
var text_height_min  = 18 * 3;
var text_height_full = text_elem.height();
var text_expand     = 'Подробнее…';
var text_contract   = 'Свернуть';

if (text_height_full > text_height_min) {

    text_elem
        .append('<p class="more-link"><a class="more">' + text_expand + '</a></p>')
        .find('.content-wrapper').addClass('contracted')
        .parent().find('p > a.more').click(function() {

            var elem_link    = $(this);
            var elem_wrapper = elem_link.parent().prev('.content-wrapper');

            if (!elem_wrapper.hasClass('locked')) {
                if (elem_wrapper.hasClass('contracted')) {
                    elem_wrapper.addClass('locked').animate(
                        { 'height': text_height_full + 'px' },
                        {
                            'duration': 350,
                            'complete': function() {
                                elem_wrapper.removeClass('contracted').addClass('expanded')
                                    .removeClass('locked');
                                elem_link.text(text_contract);
                            }
                        }
                    );
                }
                else if (elem_wrapper.hasClass('expanded')) {
                    elem_wrapper.addClass('locked').animate(
                        { 'height': text_height_min + 'px' },
                        {
                            'duration': 350,
                            'complete': function() {
                                elem_wrapper.removeClass('expanded').addClass('contracted')
                                    .removeClass('locked');
                                elem_link.text(text_expand);
                            }
                        }
                    );
                }
            }

        });
}
// }} Expand/contract intro text


// Float catalog head plate {{

// disabling plate floating opera 10.5 {{

var opera_pre_10_6 = $.browser.opera && ($.browser.version.slice(0, 4) < '10.6');
if (!opera_pre_10_6) {

    function catalogFiltersRefreshState()
    {
        var scroll_cur  = $(document).scrollTop();
        var win_height  = $(window).height();

        var position_elem   = $('#filters-wrapper-position');

        if (!position_elem.length) {
            return;
        }

        var position = position_elem.offset();
        var float_filters = scroll_cur > scroll_max;
        var elem = $('#catalog-filters');

        if ($('.plate-notices').length) {
            var scroll_max = position.top - 60 - $('.header').height();
        } else {
            var scroll_max = position.top - $('.header').height();
        };

        //var is_ie8  = $.browser.msie && (parseInt($.browser.version, 10) < 9);

        if (scroll_cur > scroll_max) {
            elem.addClass('floating');
            /*if (is_ie8) {
                position_elem.addClass('filters-floated');
            }*/
        }
        else {
            elem.removeClass('floating');
            /*if (is_ie8) {
                position_elem.removeClass('filters-floated');
            }*/
        }
    }


    // Initializing #filters-wrapper-position state and adding handler for this state
    catalogFiltersRefreshState();

    $(window).scroll(function () {
        catalogFiltersRefreshState();
    });
}
// }} disabling plate floating opera 10.5

// }} Float catalog head plate
</script></div>
    </div>