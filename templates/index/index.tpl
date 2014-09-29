<script type="text/javascript">
$(document).ready(function($) {
    $('body').addClass('start alt-price-plates');
});
</script>
<div id="wrapper" class="png full-height">
    <div class="shadows"></div>
    <div class="one-column">

        <div class="content-line promo-top" data-wsource="index_promo">

            <div class="images preloader">
                <ul class="jcarousel-skin-home-images">
                    <?php foreach ($slides as $key => $slide):?>
                    <li class="item-<?php echo $key ?>">
                        <span></span>
                        <a href="<?=$this->link('index','watch').'&film='.$slide['film']->codeid?>"><img src="/upload/<?=$slide['slide']->slider_big?>" alt="<?=$slide['film']->film_name?>"></a>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <div class="wrapped-info" style="display: none">
                <div class="info">
                    <?php foreach ($slides as $key => $slide):?>
                    <div class="info-item item<?php echo $key ?>" style="display: none;">
                        <div class="info-content">
                            <span class="note"><?=$slide['film']->note ?></span>
                            <span class="h3i"><a href="http://www.ivi.ru<?=$this->link('index','watch').'&film='?>103456"><?=$slide['film']->film_name?></a></span>

                            <div class="age-rating"><?=$slide['film']->age ?>+</div>
                            <div class="scale-rating size11">
                                <div style="width: <?=$slide['film']->raiting?>%"></div>
                            </div>

                            <div class="text">
                                <!-- <img src="http://img.ivi.ru/static/promotest/858d5e8f263014f4e1bd357c1ea145de.png?filever=e5a6ffc80f3954066132af919125812c" alt="" itemprop="image"> -->
                                <?=$slide['film']->description?>
                            </div>
                        </div>
                        <div class="action-button-wrapper">
                            <a href="<?=$this->link('index','watch').'&film='.$slide['film']->codeid?>" class="action-button gradient icon-view button-view">Смотреть <?=(($slide['film']->price > 0) ? 'Смотреть за '.$slide['film']->price.' сом' : '')?></a>
                            <a href="#" data-id="<?php echo $slide['film']->codeid ?>" class="action-button dim gradient icon-favorite promo-button-favorite button-favorite fav">В очередь</a>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="previews" style="display: none;">
                <ul class="jcarousel-skin-home-previews" data-wsource="promo">
                    <?php foreach ($slides as $key => $slide):?>
                    <li>
                    <a href="#" class="item<?=$key?>">
                    <img src="/upload/<?=$slide['slide']->slider_small?>" alt="<?=$slide['film']->film_name?>">
                    <span></span>
                    <em><?=$key?> / 20</em>
                    </a>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <div class="promo-buttons-container left-arrow" style="display: none;">
                <a href="#"></a>
            </div>
            <div class="promo-buttons-container right-arrow" style="display: none;">
                <a href="#"></a>
            </div>

        </div>

        <div class="content-main-wrapper">
            <div class="content-main">
                <div class="content-line top-collections">
                    <div class="main-col">
                        <!-- Блоки "Новое и популярное" -->
                        <div class="films-gallery-col popout"
                             id="index_new">
                            <span class="h2i">
                                <a href="<?=$this->link('index','films').'&sort=news'?>">Новое на ivi</a>
                            </span>
                            <ul class="films-gallery light" data-wsource="index_new">
                                <?php foreach ($new_films as $key => $film):?>
                                <li class="vb-item element-selector hidden"
                                            data-id="<?=$film->codeid?>"
                                            data-type="compilation">
                                    <div class="image" onmouseover="da.xinfo.load(this);" data-uid="<?=$film->codeid?>1">
                                        <a href="<?=$this->link('index','watch').'&film='.$film->codeid?>">
                                            <img src="/upload/covers/asd.jpg" alt="<?=$film->film_name?>">
                                            <span class="overlay"></span>
                                        </a>
                                        <div class="xinfo" id="<?=$film->codeid?>2">
                                            <div class="xinfo-loading"></div>
                                        </div>
                                    </div>
                                    <strong>
                                        <a href="<?=$this->link('index','watch').'&film='.$film->codeid?>" title="<?=$film->film_name?>"><?=$film->film_name?></a>
                                    </strong>
                                <?php endforeach;?>
                                </li>
                            </ul>

                            <p class="more">
                                <a class="underlined" href="<?=$this->link('index','films').'&sort=news'?>">Показать еще</a>
                            </p>
                        </div>
                        <div class="films-gallery-col popout"
                                   id="index_pop">
                            <span class="h2i">
                                <a href="<?=$this->link('index','films').'&sort=views'?>">Популярное</a>
                            </span>

                            <ul class="films-gallery light" data-wsource="index_pop">
                                <?php foreach ($new_films as $key => $film):?>
                                <li class="vb-item element-selector hidden"
                                            data-id="<?=$film->codeid?>"
                                            data-type="compilation">
                                    <div class="image" onmouseover="da.xinfo.load(this);" data-uid="<?=$film->codeid?>1">
                                        <a href="<?=$this->link('index','watch').'&film='.$film->codeid?>">
                                            <img src="/upload/covers/asd.jpg" alt="<?=$film->film_name?>">
                                            <span class="overlay"></span>
                                        </a>
                                        <div class="xinfo" id="<?=$film->codeid?>2">
                                            <div class="xinfo-loading"></div>
                                        </div>
                                    </div>
                                    <strong>
                                        <a href="<?=$this->link('index','watch').'&film='.$film->codeid?>" title="<?=$film->film_name?>"><?=$film->film_name?></a>
                                    </strong>
                                <?php endforeach;?>
                            </ul>

                            <p class="more">
                                <a class="underlined" href="<?=$this->link('index','films').'&sort=views'?>">Показать еще</a>
                            </p>
                        </div>    </div>

                    <div class="extra-col">
                        <!-- Блок "Продолжить просмотр" -->
                        <div class="cblock movie-stack">
                            <div id="movie-stack-teaser" class="clickable">
                                <span class="h2i">Войдите для того, чтобы</span>
                                <ul class="capabilities-list">
                                    <li class="get-recommendations">получать личные рекомендации</li>
                                    <li class="save-movie">сохранять понравившиеся фильмы</li>
                                    <li class="review">комментировать и публиковать рецензии</li>
                                </ul>
                            </div>
                            <ul class="auth-nav">
                                <li><a onclick="return openModal('auth');" href="#">Войти</a></li>
                                <li><a onclick="showReg();
                                        return false;" href="#">Зарегистрироваться</a></li>
                            </ul>
                        </div>
                        <!-- Верхние тизеры в боковой колонке -->
                        <div class="cblock sidecol-teaser">
                            <!--  AdRiver code START. Type:100x100 Site: ivi SZ: index PZ: 0 BN: 0 -->
                            <script><!--
                            var RndNum4NoCash = Math.round(Math.random() * 1000000000);
                                var ar_Tail = 'unknown';
                                if (document.referrer)
                                    ar_Tail = escape(document.referrer);
                                document.write(
                                        '<iframe src="http://ad.adriver.ru/cgi-bin/erle.cgi?'
                                        + 'sid=147544&sz=index&target=top&w=220&h=159&bt=2&pz=0&rnd=' + RndNum4NoCash + '&tail256=' + ar_Tail
                                        + '" frameborder=0 vspace=0 hspace=0 width=220 height=159 marginwidth=0'
                                        + ' marginheight=0 scrolling=no></iframe>');
                                //--></script>
                            <noscript>
                            <a href="http://ad.adriver.ru/cgi-bin/click.cgi?sid=147544&sz=index&bt=2&pz=0&rnd=1591162330" target=_top>
                                <img src="http://ad.adriver.ru/cgi-bin/rle.cgi?sid=147544&sz=index&bt=2&pz=0&rnd=1591162330" alt="-AdRiver-" border=0 width=220 height=159></a>
                            </noscript>
                            <!--  AdRiver code END  -->    <div class="gift-teaser">
                                <a id="activation_gift">Активировать сертификат</a>
                            </div>
                        </div>
                    </div>
                </div>            <div class="content-line">
                    <div class="description" itemprop="description">
                        <div class="expandable description-text" id="description-text">
                            <div class="content-wrapper">
<a href="<?php echo $this->link('admin','index') ?>">asdasd</a>
                                <h1>Бесплатный онлайн кинотеатр ivi.ru: фильмы в хорошем  качестве  всегда приносят настоящее удовольствие </h1>
                                <p>Случалось ли вам отказаться от  просмотра интересного фильма из-за того, что его показывали в  неудобное время?<br>
                                    Приходилось ли искать в сети интернет,  где смотреть фильмы онлайн? А спорить с домашними из-за выбора кино для просмотра по ТВ?<br>
                                <p>Все эти проблемы остались в прошлом! Откройте для себя&nbsp;<a href="http://www.ivi.ru/videos/all/movies/all/by_day/">фильмы онлайн</a>&nbsp; в HD качестве с кинотеатром ivi.ru.</p>
                                <p>Мы не просто освобождаем вас от необходимости  идти в кинотеатр или изучать программу  телепередач — у посетителей нашего  ресурса гораздо больше возможностей.</p>
                                <p>Онлайн кинотеатр ivi.ru —  это самая большая коллекция отечественных и зарубежных фильмов в рунете.  Наша видеотека насчитывает более 30 тысяч фильмов и видеороликов,  доступных для просмотра в онлайн, и постоянно пополняется. </p>
                                <p>Онлайн кинотеатр ivi.ru – это: </p>
                                <ol>
                                    <li>первый  видеосервис в  России, который позволяет смотреть фильмы  онлайн в хорошем качестве;</li>
                                    <li>возможность отложить просмотр фильма на время или начать смотреть кино онлайн с любого момента;</li>
                                    <li>удобный поиск фильмов: по  названию, году выпуска, стране производства или жанру;</li>
                                    <li>фильмы  в онлайне для просмотра которых  не требуется устанавливать видеоплееры или  искать кодеки;</li>
                                    <li>никаких смс и торрентов — смотрите онлайн фильмы хорошего качества без регистрации и  без смс.  Это действительно бесплатно для большей  части видео!</li>
                                </ol>
                                <p>Регулярно мы добавляем на сайт самые свежие&nbsp;<a href="http://www.ivi.ru/videos/all/movies/comedy/by_day/">комедии</a>,&nbsp;<a href="http://www.ivi.ru/videos/all/movies/adventures/by_day/">лучшие фильмы-приключения</a>,&nbsp;<a href="http://www.ivi.ru/videos/all/movies/boeviki/by_day/">боевики</a>,&nbsp;<a href="http://www.ivi.ru/videos/all/movies/horror/by_day/">фильмы ужасов</a>,&nbsp;<a href="http://www.ivi.ru/videos/all/movies/thriller/by_day/">триллеры</a>&nbsp;и исторические драмы бесплатно.<br>
                                    Откройте для себя возможность смотреть фильмы онлайн бесплатно в отличном качестве без регистрации и смс с кинотеатром ivi.ru! </p>
                                <p>Убедитесь в том, что  смотреть онлайн – просто и удобно!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-line" id="recommendation_explanation"
                     >
                    <div class="incut-line-wrapper">
                        <div class="incut-line recommend-related films-gallery-wrapper">
                            <span class="h2i">Рекомендуем лично вам</span>
                            <ul class="films-gallery medium light bordered vb-container" data-wsource="index_recommendations">

                            </ul>
                        </div>
                    </div>
                </div>            <div class="content-line advert-wide" id="start_adriver_banner_wide" title=""></div>
                <script>
                    new adriver("start_adriver_banner_wide", {sid:147544, bt:52, sz:"indexrast"});
                </script>            <div class="content-line">
                    <div class="incut-line-wrapper bright"><div class="incut-line watching-now"
                                                                >
                            <span class="h2i">Блокбастеры ivi+</span>
                            <div class="gallery-wrapper">
                                <span class="scroll-button prev" id="watching_now_prev"></span>
                                <span class="scroll-button next" id="watching_now_next"></span>
                                <div class="hover-area"><div class="scrollable-wrapper">
                                        <ul
                                            data-wsource="index_watchingnow" class="films-gallery light" id="watching_now_carousel">
                                            <!-- --><li class="vb-item element-selector"
                                                        data-id="103332"
                                                        data-type="content"
                                                        >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1033320">
                                                    <a href="<?=$this->link('index','watch').'&film='?>103332">
                                                        <img src="http://thumbs.ivi.ru/f17.vcp.digitalaccess.ru/contents/0/8/930d87d310ff6cb43553198731f5d7.jpg/97x147/" alt="Паранойя">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1033321">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>103332" title="Паранойя">Паранойя</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="103329"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1033290">
                                                    <a href="<?=$this->link('index','watch').'&film='?>103329">
                                                        <img src="http://thumbs.ivi.ru/f11.vcp.digitalaccess.ru/contents/6/a/e4fab64b0079a39451cfc46419c417.jpg/97x147/" alt="Горько!">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1033291">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>103329" title="Горько!">Горько!</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64241"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642410">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64241">
                                                        <img src="http://thumbs.ivi.ru/f28.vcp.digitalaccess.ru/contents/b/8/4f8773c041fe7eeaa6d0b5df96546e.jpg/97x147/" alt="Последний самурай">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642411">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64241" title="Последний самурай">Последний самурай</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="97238"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="972380">
                                                    <a href="<?=$this->link('index','watch').'&film='?>97238">
                                                        <img src="http://thumbs.ivi.ru/f15.vcp.digitalaccess.ru/contents/a/a/3c854455ca0a10e7dfe698449770f2.jpg/97x147/" alt="Обещать – не значит жениться">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_972381">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>97238" title="Обещать – не значит жениться">Обещать – не значит жениться</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="65061"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="650610">
                                                    <a href="<?=$this->link('index','watch').'&film='?>65061">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/b/4/904cb71eedc514ed5845e2aaca7ffc.jpg/97x147/" alt="Флаги наших отцов">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_650611">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>65061" title="Флаги наших отцов">Флаги наших отцов</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64203"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642030">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64203">
                                                        <img src="http://thumbs.ivi.ru/f1.vcp.digitalaccess.ru/contents/b/6/c5c0249923f6ea78b16722044f9592.jpg/97x147/" alt="Мальчишник 2: Из Вегаса в Бангкок">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642031">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64203" title="Мальчишник 2: Из Вегаса в Бангкок">Мальчишник 2: Из Вегаса в Бангкок</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113453"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1134530">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113453">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/8/8/6c737d7c0b43d541801bb099ea231d.jpg/97x147/" alt="Делай ноги">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1134531">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113453" title="Делай ноги">Делай ноги</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64243"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642430">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64243">
                                                        <img src="http://thumbs.ivi.ru/f28.vcp.digitalaccess.ru/contents/d/a/d0f24aa359ba446f0595fb2cd61dc7.jpg/97x147/" alt="Я - легенда">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642431">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64243" title="Я - легенда">Я - легенда</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="94440"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="944400">
                                                    <a href="<?=$this->link('index','watch').'&film='?>94440">
                                                        <img src="http://thumbs.ivi.ru/f28.vcp.digitalaccess.ru/contents/f/0/c601e9520e41df676d900a8252513e.jpg/97x147/" alt="Мадагаскар 3">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_944401">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>94440" title="Мадагаскар 3">Мадагаскар 3</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="65046"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="650460">
                                                    <a href="<?=$this->link('index','watch').'&film='?>65046">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/4/e/a22f0b17fe08f124abe89f02ebee60.jpg/97x147/" alt="Ходят слухи">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_650461">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>65046" title="Ходят слухи">Ходят слухи</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="65031"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="650310">
                                                    <a href="<?=$this->link('index','watch').'&film='?>65031">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/1/f/eb34aca27623b393c69854da991741.jpg/97x147/" alt="Вундеркинды">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_650311">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>65031" title="Вундеркинды">Вундеркинды</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="112478"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1124780">
                                                    <a href="<?=$this->link('index','watch').'&film='?>112478">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/8/1/62e0e35b1459ba4405dba128072cfd.jpg/97x147/" alt="История Золушки">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1124781">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>112478" title="История Золушки">История Золушки</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="87191"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="871910">
                                                    <a href="<?=$this->link('index','watch').'&film='?>87191">
                                                        <img src="http://thumbs.ivi.ru/f5.vcp.digitalaccess.ru/contents/c/0/eb768ad2705987505479b27fd04f3a.jpg/97x147/" alt="Трансформеры: Месть падших">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_871911">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>87191" title="Трансформеры: Месть падших">Трансформеры: Месть падших</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="87497"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="874970">
                                                    <a href="<?=$this->link('index','watch').'&film='?>87497">
                                                        <img src="http://thumbs.ivi.ru/f27.vcp.digitalaccess.ru/contents/5/5/310d29a709e1b9c27ff1713047f83c.jpg/97x147/" alt="Хозяин морей: На краю Земли">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_874971">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>87497" title="Хозяин морей: На краю Земли">Хозяин морей: На краю Земли</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64257"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642570">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64257">
                                                        <img src="http://thumbs.ivi.ru/f2.vcp.digitalaccess.ru/contents/8/7/6f3968f4a950f31af962c13ed2556d.jpg/97x147/" alt="10 000 лет до н.э.">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642571">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64257" title="10 000 лет до н.э.">10 000 лет до н.э.</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="96103"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="961030">
                                                    <a href="<?=$this->link('index','watch').'&film='?>96103">
                                                        <img src="http://thumbs.ivi.ru/f2.vcp.digitalaccess.ru/contents/5/1/38f985968478942e26db70f086364d.jpg/97x147/" alt="Хичкок">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_961031">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>96103" title="Хичкок">Хичкок</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="65030"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="650300">
                                                    <a href="<?=$this->link('index','watch').'&film='?>65030">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/b/d/469749cae55943bbdb62823e559b1a.jpg/97x147/" alt="Долгая помолвка">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_650301">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>65030" title="Долгая помолвка">Долгая помолвка</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113777"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1137770">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113777">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/9/a/1064cea7a923b767e106d15fd6f8c3.jpg/97x147/" alt="Скуби-Ду и меч самурая">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1137771">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113777" title="Скуби-Ду и меч самурая">Скуби-Ду и меч самурая</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="87490"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="874900">
                                                    <a href="<?=$this->link('index','watch').'&film='?>87490">
                                                        <img src="http://thumbs.ivi.ru/f35.vcp.digitalaccess.ru/contents/8/c/b0ab8d75c454fd76e831914e6c6500.jpg/97x147/" alt="Элвин и бурундуки">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_874901">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>87490" title="Элвин и бурундуки">Элвин и бурундуки</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113909"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1139090">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113909">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/d/1/51946fc5969da777fc5f4d26bdce56.jpg/97x147/" alt="Аферисты">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1139091">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113909" title="Аферисты">Аферисты</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="98471"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="984710">
                                                    <a href="<?=$this->link('index','watch').'&film='?>98471">
                                                        <img src="http://thumbs.ivi.ru/f32.vcp.digitalaccess.ru/contents/f/6/5b5fdb2365e3822d7bef954ddfcda5.jpg/97x147/" alt="Родительский беспредел">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_984711">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>98471" title="Родительский беспредел">Родительский беспредел</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="65074"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="650740">
                                                    <a href="<?=$this->link('index','watch').'&film='?>65074">
                                                        <img src="http://thumbs.ivi.ru/f28.vcp.digitalaccess.ru/contents/4/9/d214f22dafd6cde5b5ca032f83aa94.jpg/97x147/" alt="Люди в черном 3">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_650741">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>65074" title="Люди в черном 3">Люди в черном 3</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="109950"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1099500">
                                                    <a href="<?=$this->link('index','watch').'&film='?>109950">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/e/0/911ef8d6c4d2c56ab4ea806e772b7d.jpg/97x147/" alt="Отважная">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1099501">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>109950" title="Отважная">Отважная</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="103467"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1034670">
                                                    <a href="<?=$this->link('index','watch').'&film='?>103467">
                                                        <img src="http://thumbs.ivi.ru/f18.vcp.digitalaccess.ru/contents/1/9/2b06175178c398519b624e60d2ed5b.jpg/97x147/" alt="Перевозчик">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1034671">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>103467" title="Перевозчик">Перевозчик</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="114390"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1143900">
                                                    <a href="<?=$this->link('index','watch').'&film='?>114390">
                                                        <img src="http://thumbs.ivi.ru/f6.vcp.digitalaccess.ru/contents/f/a/40327858bd94fc71a2ca7d908b8dcb.jpg/97x147/" alt="Откровения лучших порномоделей">        <span class="price">
                                                            199 рублей        </span>
                                                        <span class="price">
                                                            199 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1143901">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>114390" title="Откровения лучших порномоделей">Откровения лучших порномоделей</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="112639"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1126390">
                                                    <a href="<?=$this->link('index','watch').'&film='?>112639">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/3/d/6734d06f77fb4b73c4bd6c14ac3dc3.jpg/97x147/" alt="Любовь к собакам обязательна">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1126391">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>112639" title="Любовь к собакам обязательна">Любовь к собакам обязательна</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113829"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1138290">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113829">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/6/1/cae4df5df1a6365db3d020a49efa5d.jpg/97x147/" alt="Дитя с Марса">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1138291">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113829" title="Дитя с Марса">Дитя с Марса</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="110238"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1102380">
                                                    <a href="<?=$this->link('index','watch').'&film='?>110238">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/1/0/f8ce714b86c5e9a09ef6103be9141a.jpg/97x147/" alt="Дитя тьмы">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1102381">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>110238" title="Дитя тьмы">Дитя тьмы</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="106271"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1062710">
                                                    <a href="<?=$this->link('index','watch').'&film='?>106271">
                                                        <img src="http://thumbs.ivi.ru/f1.vcp.digitalaccess.ru/contents/2/c/2d0cff6cfe84ca578a17b7a8991ee1.jpg/97x147/" alt="Никки, дьявол – младший">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1062711">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>106271" title="Никки, дьявол – младший">Никки, дьявол – младший</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="87621"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="876210">
                                                    <a href="<?=$this->link('index','watch').'&film='?>87621">
                                                        <img src="http://thumbs.ivi.ru/f35.vcp.digitalaccess.ru/contents/9/e/f6aa9fe4b0c89173b65237890beadd.jpg/97x147/" alt="Ледниковый период 4: Континентальный дрейф">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_876211">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>87621" title="Ледниковый период 4: Континентальный дрейф">Ледниковый период 4: Континентальный дрейф</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="106303"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1063030">
                                                    <a href="<?=$this->link('index','watch').'&film='?>106303">
                                                        <img src="http://thumbs.ivi.ru/f18.vcp.digitalaccess.ru/contents/3/c/94bed2130adcd300339ef068b0e5e7.jpg/97x147/" alt="Впритык">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1063031">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>106303" title="Впритык">Впритык</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64250"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642500">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64250">
                                                        <img src="http://thumbs.ivi.ru/f26.vcp.digitalaccess.ru/contents/d/d/ad0b609be681d4d6e34d2f716cc966.jpg/97x147/" alt="Пункт назначения 3">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642501">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64250" title="Пункт назначения 3">Пункт назначения 3</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64252"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642520">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64252">
                                                        <img src="http://thumbs.ivi.ru/f1.vcp.digitalaccess.ru/contents/c/7/8ba536e9981da5347843a877da4a80.jpg/97x147/" alt="Темный рыцарь">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642521">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64252" title="Темный рыцарь">Темный рыцарь</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="103294"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1032940">
                                                    <a href="<?=$this->link('index','watch').'&film='?>103294">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/6/a/9289784bc911fb14fa5c39281e3628.jpg/97x147/" alt="Капитан Филлипс">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1032941">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>103294" title="Капитан Филлипс">Капитан Филлипс</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="103364"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1033640">
                                                    <a href="<?=$this->link('index','watch').'&film='?>103364">
                                                        <img src="http://thumbs.ivi.ru/f19.vcp.digitalaccess.ru/contents/7/6/32a770512d944c066eaa11536d2dfe.jpg/97x147/" alt="Самолеты">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1033641">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>103364" title="Самолеты">Самолеты</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="105908"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1059080">
                                                    <a href="<?=$this->link('index','watch').'&film='?>105908">
                                                        <img src="http://thumbs.ivi.ru/f17.vcp.digitalaccess.ru/contents/1/0/a1245da537797dae519b06e305f150.jpg/97x147/" alt="Потустороннее">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1059081">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>105908" title="Потустороннее">Потустороннее</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="101232"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1012320">
                                                    <a href="<?=$this->link('index','watch').'&film='?>101232">
                                                        <img src="http://thumbs.ivi.ru/f17.vcp.digitalaccess.ru/contents/e/2/e7c698032b0fdb580e46ae6c34f5b3.jpg/97x147/" alt="Транс">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1012321">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>101232" title="Транс">Транс</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64791"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="647910">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64791">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/a/0/30de6a31d3bab832207c7c63f766d4.jpg/97x147/" alt="Оправданная жестокость">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_647911">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64791" title="Оправданная жестокость">Оправданная жестокость</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64978"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="649780">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64978">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/e/0/95564dc50f67774e432f109e092415.jpg/97x147/" alt="Придурки из Хаззарда">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_649781">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64978" title="Придурки из Хаззарда">Придурки из Хаззарда</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113840"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1138400">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113840">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/0/b/13a4d06ee7f638ee38c3ac1ae6bb27.jpg/97x147/" alt="Жизнь как дом">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1138401">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113840" title="Жизнь как дом">Жизнь как дом</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="65032"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="650320">
                                                    <a href="<?=$this->link('index','watch').'&film='?>65032">
                                                        <img src="http://thumbs.ivi.ru/f1.vcp.digitalaccess.ru/contents/e/a/6313236d230cc0126b4b0889d517f9.jpg/97x147/" alt="Труп невесты">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_650321">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>65032" title="Труп невесты">Труп невесты</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64228"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642280">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64228">
                                                        <img src="http://thumbs.ivi.ru/f27.vcp.digitalaccess.ru/contents/2/f/d668236e65029528b47124b9b78a79.jpg/97x147/" alt="Час пик 3">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642281">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64228" title="Час пик 3">Час пик 3</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113859"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1138590">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113859">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/b/3/8115273fb7dbca088f17b4339e0a79.jpg/97x147/" alt="Сердца в Атлантиде">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1138591">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113859" title="Сердца в Атлантиде">Сердца в Атлантиде</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="103304"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1033040">
                                                    <a href="<?=$this->link('index','watch').'&film='?>103304">
                                                        <img src="http://thumbs.ivi.ru/f6.vcp.digitalaccess.ru/contents/9/b/4fee91870996b0d07dd13d981a5e81.jpg/97x147/" alt="Волк с Уолл-стрит">        <span class="price">
                                                            299 рублей        </span>
                                                        <span class="price">
                                                            299 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1033041">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>103304" title="Волк с Уолл-стрит">Волк с Уолл-стрит</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="98613"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="986130">
                                                    <a href="<?=$this->link('index','watch').'&film='?>98613">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/2/2/bceec58304aef4976cc7516bd32b9c.jpg/97x147/" alt="Эпик">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_986131">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>98613" title="Эпик">Эпик</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="103385"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1033850">
                                                    <a href="<?=$this->link('index','watch').'&film='?>103385">
                                                        <img src="http://thumbs.ivi.ru/f17.vcp.digitalaccess.ru/contents/d/f/523388b11979ecb4bd66630ea5897d.jpg/97x147/" alt="Росомаха: Бессмертный">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1033851">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>103385" title="Росомаха: Бессмертный">Росомаха: Бессмертный</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64235"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642350">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64235">
                                                        <img src="http://thumbs.ivi.ru/f34.vcp.digitalaccess.ru/contents/a/9/e8e96f63b4f9b3471fbff5fb7995c9.jpg/97x147/" alt="Матрица: Революция">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642351">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64235" title="Матрица: Революция">Матрица: Революция</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="115473"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1154730">
                                                    <a href="<?=$this->link('index','watch').'&film='?>115473">
                                                        <img src="http://thumbs.ivi.ru/f32.vcp.digitalaccess.ru/contents/0/b/a7b1735fadd2d4a525f62c0f9025b6.jpg/97x147/" alt="Телеведущий: И снова здравствуйте">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1154731">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>115473" title="Телеведущий: И снова здравствуйте">Телеведущий: И снова здравствуйте</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="65035"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="650350">
                                                    <a href="<?=$this->link('index','watch').'&film='?>65035">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/3/e/c7f6197daa06d3aba59f947dc695c6.jpg/97x147/" alt="Сириана">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_650351">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>65035" title="Сириана">Сириана</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="97712"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="977120">
                                                    <a href="<?=$this->link('index','watch').'&film='?>97712">
                                                        <img src="http://thumbs.ivi.ru/f20.vcp.digitalaccess.ru/contents/0/e/47318d33920a4716b79d5fbd554b48.jpg/97x147/" alt="Ангелы и Демоны">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_977121">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>97712" title="Ангелы и Демоны">Ангелы и Демоны</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="103296"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1032960">
                                                    <a href="<?=$this->link('index','watch').'&film='?>103296">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/5/5/51498698c05d7e2043852e41339af2.jpg/97x147/" alt="Холодное сердце">        <span class="price">
                                                            299 рублей        </span>
                                                        <span class="price">
                                                            299 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1032961">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>103296" title="Холодное сердце">Холодное сердце</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113788"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1137880">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113788">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/5/2/11f5a214542fed195ad455fdf913b5.jpg/97x147/" alt="Дублеры">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1137881">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113788" title="Дублеры">Дублеры</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="87598"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="875980">
                                                    <a href="<?=$this->link('index','watch').'&film='?>87598">
                                                        <img src="http://thumbs.ivi.ru/f31.vcp.digitalaccess.ru/contents/e/6/ca4c13dd385fc00fb476dd530e0669.jpg/97x147/" alt="Кот в сапогах">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_875981">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>87598" title="Кот в сапогах">Кот в сапогах</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="106099"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1060990">
                                                    <a href="<?=$this->link('index','watch').'&film='?>106099">
                                                        <img src="http://thumbs.ivi.ru/f17.vcp.digitalaccess.ru/contents/5/6/5b85765e872b54790952c3d705411b.jpg/97x147/" alt="Мажестик">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1060991">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>106099" title="Мажестик">Мажестик</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64234"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642340">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64234">
                                                        <img src="http://thumbs.ivi.ru/f27.vcp.digitalaccess.ru/contents/1/e/dd6acaca8e6cd19ef6d9164ae4bb54.jpg/97x147/" alt="Мисс Конгениальность 2: Прекрасна и опасна">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642341">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64234" title="Мисс Конгениальность 2: Прекрасна и опасна">Мисс Конгениальность 2: Прекрасна и опасна</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="87628"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="876280">
                                                    <a href="<?=$this->link('index','watch').'&film='?>87628">
                                                        <img src="http://thumbs.ivi.ru/f32.vcp.digitalaccess.ru/contents/1/6/3cee28e437b37c53fd0ac05fee9917.jpg/97x147/" alt="Значит, война">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_876281">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>87628" title="Значит, война">Значит, война</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="103331"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1033310">
                                                    <a href="<?=$this->link('index','watch').'&film='?>103331">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/f/2/e0d6f8ab5081a46daca4dfe3feeaeb.jpg/97x147/" alt="Уцелевший">        <span class="price">
                                                            199 рублей        </span>
                                                        <span class="price">
                                                            199 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1033311">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>103331" title="Уцелевший">Уцелевший</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="93888"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="938880">
                                                    <a href="<?=$this->link('index','watch').'&film='?>93888">
                                                        <img src="http://thumbs.ivi.ru/f33.vcp.digitalaccess.ru/contents/e/a/df27874eb59344fb35b446e25d3e0f.jpg/97x147/" alt="Диктатор">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_938881">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>93888" title="Диктатор">Диктатор</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="103291"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1032910">
                                                    <a href="<?=$this->link('index','watch').'&film='?>103291">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/2/e/39fe558660a4f9257eb3381b8f9da2.jpg/97x147/" alt="Starперцы">        <span class="price">
                                                            199 рублей        </span>
                                                        <span class="price">
                                                            199 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1032911">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>103291" title="Starперцы">Starперцы</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="106310"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1063100">
                                                    <a href="<?=$this->link('index','watch').'&film='?>106310">
                                                        <img src="http://thumbs.ivi.ru/f2.vcp.digitalaccess.ru/contents/b/7/218fef3089d026a03d8ba8e9774760.jpg/97x147/" alt="Мех: Воображаемый портрет Дианы Арбус">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1063101">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>106310" title="Мех: Воображаемый портрет Дианы Арбус">Мех: Воображаемый портрет Дианы Арбус</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="112187"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1121870">
                                                    <a href="<?=$this->link('index','watch').'&film='?>112187">
                                                        <img src="http://thumbs.ivi.ru/f33.vcp.digitalaccess.ru/contents/f/f/5a5a711427658ac4bc8a7826f2cade.jpg/97x147/" alt="Ловец снов">        span class="price">
                                                        99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1121871">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>112187" title="Ловец снов">Ловец снов</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="87510"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="875100">
                                                    <a href="<?=$this->link('index','watch').'&film='?>87510">
                                                        <img src="http://thumbs.ivi.ru/f25.vcp.digitalaccess.ru/contents/3/6/0164348dec80b331986bf54028e346.jpg/97x147/" alt="Дьявол носит Prada">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_875101">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>87510" title="Дьявол носит Prada">Дьявол носит Prada</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113847"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1138470">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113847">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/2/f/faeb836c5f9c402e1e843f39de09bc.jpg/97x147/" alt="Кит Киттредж: Загадка американской девочки">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1138471">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113847" title="Кит Киттредж: Загадка американской девочки">Кит Киттредж: Загадка американской девочки</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="106040"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1060400">
                                                    <a href="<?=$this->link('index','watch').'&film='?>106040">
                                                        <img src="http://thumbs.ivi.ru/f17.vcp.digitalaccess.ru/contents/7/5/7ffe1fc94fff5a0bf140f75450714b.jpg/97x147/" alt="Отсчет убийств">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1060401">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>106040" title="Отсчет убийств">Отсчет убийств</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64244"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642440">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64244">
                                                        <img src="http://thumbs.ivi.ru/f31.vcp.digitalaccess.ru/contents/9/9/b4af1302a35478109d085fbc21a023.jpg/97x147/" alt="Гарри Поттер и Кубок огня">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642441">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64244" title="Гарри Поттер и Кубок огня">Гарри Поттер и Кубок огня</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="109287"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1092870">
                                                    <a href="<?=$this->link('index','watch').'&film='?>109287">
                                                        <img src="http://thumbs.ivi.ru/f20.vcp.digitalaccess.ru/contents/5/d/a1e30eb47b7bce5dfc92d3071d1d03.jpg/97x147/" alt="Медвежонок Винни и его друзья">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1092871">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>109287" title="Медвежонок Винни и его друзья">Медвежонок Винни и его друзья</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113474"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1134740">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113474">
                                                        <img src="http://thumbs.ivi.ru/f8.vcp.digitalaccess.ru/contents/5/e/c6b3ab136cf13994e1c49227a13a35.jpg/97x147/" alt="Мы – одна команда">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1134741">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113474" title="Мы – одна команда">Мы – одна команда</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64256"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642560">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64256">
                                                        <img src="http://thumbs.ivi.ru/f33.vcp.digitalaccess.ru/contents/8/3/9646afd94f1353a73fa330e250d0a8.jpg/97x147/" alt="Бэтмен: Начало">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642561">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64256" title="Бэтмен: Начало">Бэтмен: Начало</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="110655"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1106550">
                                                    <a href="<?=$this->link('index','watch').'&film='?>110655">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/3/4/d0ed38866481cfd669811c3debd5e4.jpg/97x147/" alt="Держи ритм">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1106551">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>110655" title="Держи ритм">Держи ритм</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113487"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1134870">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113487">
                                                        <img src="http://thumbs.ivi.ru/f36.vcp.digitalaccess.ru/contents/0/2/adaaaba816b5eb6168f187ef94810a.jpg/97x147/" alt="Том и Джерри: Трепещи, Усатый!">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1134871">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113487" title="Том и Джерри: Трепещи, Усатый!">Том и Джерри: Трепещи, Усатый!</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="112167"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1121670">
                                                    <a href="<?=$this->link('index','watch').'&film='?>112167">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/2/9/1016f8d0388c08d07fb4050ab50299.jpg/97x147/" alt="Анализируй то">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1121671">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>112167" title="Анализируй то">Анализируй то</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113850"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1138500">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113850">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/3/f/d3258be07a8b3e7128e06ccc8fab60.jpg/97x147/" alt="Джон Кью">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1138501">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113850" title="Джон Кью">Джон Кью</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="97983"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="979830">
                                                    <a href="<?=$this->link('index','watch').'&film='?>97983">
                                                        <img src="http://thumbs.ivi.ru/f16.vcp.digitalaccess.ru/contents/1/e/a570e27bf0b5c445cac4f4e940e88c.jpg/97x147/" alt="Монстры на каникулах">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_979831">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>97983" title="Монстры на каникулах">Монстры на каникулах</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="102458"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1024580">
                                                    <a href="<?=$this->link('index','watch').'&film='?>102458">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/9/7/fae61e19424541ffd05e734313f570.jpg/97x147/" alt="Астрал: Глава 2">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1024581">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>102458" title="Астрал: Глава 2">Астрал: Глава 2</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="83419"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="834190">
                                                    <a href="<?=$this->link('index','watch').'&film='?>83419">
                                                        <img src="http://thumbs.ivi.ru/f27.vcp.digitalaccess.ru/contents/4/f/df2b324b57af2931243bb25ca2a7a2.jpg/97x147/" alt="Человек-паук 2">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_834191">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>83419" title="Человек-паук 2">Человек-паук 2</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="87520"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="875200">
                                                    <a href="<?=$this->link('index','watch').'&film='?>87520">
                                                        <img src="http://thumbs.ivi.ru/f34.vcp.digitalaccess.ru/contents/a/2/085c31e0be295c95ff118df495656d.jpg/97x147/" alt="День, когда Земля остановилась">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_875201">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>87520" title="День, когда Земля остановилась">День, когда Земля остановилась</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113915"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1139150">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113915">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/9/5/82528a2b65f51437b47cc86fcc0f1a.jpg/97x147/" alt="Битва Титанов">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1139151">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113915" title="Битва Титанов">Битва Титанов</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="106166"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1061660">
                                                    <a href="<?=$this->link('index','watch').'&film='?>106166">
                                                        <img src="http://thumbs.ivi.ru/f17.vcp.digitalaccess.ru/contents/0/7/aca8472bc08d2133af89a1a21744e3.jpg/97x147/" alt="Зеленый Фонарь">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1061661">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>106166" title="Зеленый Фонарь">Зеленый Фонарь</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="114087"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1140870">
                                                    <a href="<?=$this->link('index','watch').'&film='?>114087">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/a/1/140093b0b755c559c1c5116215b04e.jpg/97x147/" alt="Довольно слов">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1140871">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>114087" title="Довольно слов">Довольно слов</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="99160"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="991600">
                                                    <a href="<?=$this->link('index','watch').'&film='?>99160">
                                                        <img src="http://thumbs.ivi.ru/f6.vcp.digitalaccess.ru/contents/a/3/0530defb7c37c0d83ea42c836a25ec.jpg/97x147/" alt="Трансформеры 3: Темная сторона Луны">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_991601">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>99160" title="Трансформеры 3: Темная сторона Луны">Трансформеры 3: Темная сторона Луны</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="98505"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="985050">
                                                    <a href="<?=$this->link('index','watch').'&film='?>98505">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/1/5/e8acd8b3fc128b9bf5c3684364c7fa.jpg/97x147/" alt="Университет монстров">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_985051">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>98505" title="Университет монстров">Университет монстров</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="112595"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1125950">
                                                    <a href="<?=$this->link('index','watch').'&film='?>112595">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/3/6/8d975ca6ce72e5975e7b1e8e5ca23a.jpg/97x147/" alt="Если свекровь – монстр…">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1125951">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>112595" title="Если свекровь – монстр…">Если свекровь – монстр…</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="97239"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="972390">
                                                    <a href="<?=$this->link('index','watch').'&film='?>97239">
                                                        <img src="http://thumbs.ivi.ru/f16.vcp.digitalaccess.ru/contents/3/0/cbbb15ef219ff22b86ecdf03a2d99e.jpg/97x147/" alt="Гарри Поттер и Принц-полукровка">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_972391">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>97239" title="Гарри Поттер и Принц-полукровка">Гарри Поттер и Принц-полукровка</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="87480"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="874800">
                                                    <a href="<?=$this->link('index','watch').'&film='?>87480">
                                                        <img src="http://thumbs.ivi.ru/f26.vcp.digitalaccess.ru/contents/e/6/3e7f89894202f76ad0cc98da6b45c7.jpg/97x147/" alt="Фонтан">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_874801">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>87480" title="Фонтан">Фонтан</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113795"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1137950">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113795">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/4/1/df19f4167e336cd27078de627b63e1.jpg/97x147/" alt="Гордость и слава">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1137951">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113795" title="Гордость и слава">Гордость и слава</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="112689"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1126890">
                                                    <a href="<?=$this->link('index','watch').'&film='?>112689">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/c/c/c1eb468c0f46be86b1ab360a30ce71.jpg/97x147/" alt="Огненная стена">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1126891">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>112689" title="Огненная стена">Огненная стена</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64259"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642590">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64259">
                                                        <img src="http://thumbs.ivi.ru/f32.vcp.digitalaccess.ru/contents/6/7/dbe44172bcf30878b4fb65e2d1c8d4.jpg/97x147/" alt="Идеальный шторм">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642591">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64259" title="Идеальный шторм">Идеальный шторм</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64240"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642400">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64240">
                                                        <img src="http://thumbs.ivi.ru/f28.vcp.digitalaccess.ru/contents/b/a/62df12afa86f9dd234195a6f86c69e.jpg/97x147/" alt="Властелин колец: Братство кольца">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642401">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64240" title="Властелин колец: Братство кольца">Властелин колец: Братство кольца</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64239"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642390">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64239">
                                                        <img src="http://thumbs.ivi.ru/f32.vcp.digitalaccess.ru/contents/2/5/c89a915e7ea4963252be7491d25e0a.jpg/97x147/" alt="Властелин колец: Возвращение Короля">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642391">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64239" title="Властелин колец: Возвращение Короля">Властелин колец: Возвращение Короля</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113797"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1137970">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113797">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/1/c/54f0cb2ed604820a43b9a19623fedc.jpg/97x147/" alt="Одержимость">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1137971">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113797" title="Одержимость">Одержимость</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113886"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1138860">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113886">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/a/3/2dae99cde5630b73857af0549faec2.jpg/97x147/" alt="Окончательный анализ">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1138861">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113886" title="Окончательный анализ">Окончательный анализ</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113793"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1137930">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113793">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/3/c/a82ec33cf423c4218002878f1579e0.jpg/97x147/" alt="Пути и путы">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1137931">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113793" title="Пути и путы">Пути и путы</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113907"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1139070">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113907">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/c/5/bf8301c4744318a021afbce0c3bf1b.jpg/97x147/" alt="Даффи Дак: Охотники за чудовищами">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1139071">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113907" title="Даффи Дак: Охотники за чудовищами">Даффи Дак: Охотники за чудовищами</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="99165"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="991650">
                                                    <a href="<?=$this->link('index','watch').'&film='?>99165">
                                                        <img src="http://thumbs.ivi.ru/f30.vcp.digitalaccess.ru/contents/3/8/3dc2945a978581f3154b48e825944e.jpg/97x147/" alt="Поймай меня, если сможешь">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_991651">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>99165" title="Поймай меня, если сможешь">Поймай меня, если сможешь</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="109966"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1099660">
                                                    <a href="<?=$this->link('index','watch').'&film='?>109966">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/e/5/f269e3036a3719b9289ccdc3cb94c5.jpg/97x147/" alt="Вторжение">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1099661">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>109966" title="Вторжение">Вторжение</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="100120"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1001200">
                                                    <a href="<?=$this->link('index','watch').'&film='?>100120">
                                                        <img src="http://thumbs.ivi.ru/f5.vcp.digitalaccess.ru/contents/3/e/a2ce409e4c09d0ac56ec3918add38b.jpg/97x147/" alt="Американская история &quot;ИКС&quot; (Американская история Х)">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1001201">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>100120" title="Американская история &quot;ИКС&quot; (Американская история Х)">Американская история "ИКС" (Американская история Х)</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113911"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1139110">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113911">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/a/7/6fc8027fcff84354b74dea7d704ba2.jpg/97x147/" alt="Теория заговора">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1139111">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113911" title="Теория заговора">Теория заговора</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64232"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642320">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64232">
                                                        <img src="http://thumbs.ivi.ru/f2.vcp.digitalaccess.ru/contents/2/0/5020874598d03dfc69fe75fabeefbf.jpg/97x147/" alt="Тринадцать друзей Оушена">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642321">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64232" title="Тринадцать друзей Оушена">Тринадцать друзей Оушена</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="105966"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1059660">
                                                    <a href="<?=$this->link('index','watch').'&film='?>105966">
                                                        <img src="http://thumbs.ivi.ru/f17.vcp.digitalaccess.ru/contents/0/b/16090c920adc3c6d0759f0a55d1b82.jpg/97x147/" alt="Дикий, дикий Запад">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1059661">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>105966" title="Дикий, дикий Запад">Дикий, дикий Запад</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64227"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642270">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64227">
                                                        <img src="http://thumbs.ivi.ru/f33.vcp.digitalaccess.ru/contents/f/c/68a98a51e3659d025bd702b8f7e060.jpg/97x147/" alt="Секс в большом городе">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642271">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64227" title="Секс в большом городе">Секс в большом городе</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113863"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1138630">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113863">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/5/4/2296cd9178e488552a7e6797f7b728.jpg/97x147/" alt="Гамлет">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1138631">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113863" title="Гамлет">Гамлет</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113749"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1137490">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113749">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/7/2/a877ac4695272e6c844c5b730f6b29.jpg/97x147/" alt="Выбор судьбы">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1137491">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113749" title="Выбор судьбы">Выбор судьбы</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="106084"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1060840">
                                                    <a href="<?=$this->link('index','watch').'&film='?>106084">
                                                        <img src="http://thumbs.ivi.ru/f12.vcp.digitalaccess.ru/contents/d/d/a256ddc8007c3d85b12f75c8c82b19.jpg/97x147/" alt="Совокупность лжи">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1060841">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>106084" title="Совокупность лжи">Совокупность лжи</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113803"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1138030">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113803">
                                                        <img src="http://thumbs.ivi.ru/f1.vcp.digitalaccess.ru/contents/e/c/7afb6ab6708f144150f0b85acfb2f1.jpg/97x147/" alt="Расплата">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1138031">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113803" title="Расплата">Расплата</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113811"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1138110">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113811">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/8/1/c8e07cf95cac96df33f9ef4b772d2e.jpg/97x147/" alt="Подростки как подростки">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1138111">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113811" title="Подростки как подростки">Подростки как подростки</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="97247"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="972470">
                                                    <a href="<?=$this->link('index','watch').'&film='?>97247">
                                                        <img src="http://thumbs.ivi.ru/f2.vcp.digitalaccess.ru/contents/1/1/55f1df7d39bb7a50ef9efcb06fcc3d.jpg/97x147/" alt="Кокаин">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_972471">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>97247" title="Кокаин">Кокаин</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="65056"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="650560">
                                                    <a href="<?=$this->link('index','watch').'&film='?>65056">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/e/0/c9e4ba526aece1d87fd9ea78c9b52f.jpg/97x147/" alt="Мгновения Нью-Йорка">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_650561">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>65056" title="Мгновения Нью-Йорка">Мгновения Нью-Йорка</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="98382"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="983820">
                                                    <a href="<?=$this->link('index','watch').'&film='?>98382">
                                                        <img src="http://thumbs.ivi.ru/f31.vcp.digitalaccess.ru/contents/d/1/7c37b9c83661cc8ebb582d1cdd9c0e.jpg/97x147/" alt="Джанго освобожденный">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_983821">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>98382" title="Джанго освобожденный">Джанго освобожденный</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113784"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1137840">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113784">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/5/c/4f7edaf568266fe37a0db98e548b42.jpg/97x147/" alt="Ромео должен умереть">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1137841">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113784" title="Ромео должен умереть">Ромео должен умереть</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="115226"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1152260">
                                                    <a href="<?=$this->link('index','watch').'&film='?>115226">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/0/c/87a81dab5b3f6535e9799bcaca4d76.jpg/97x147/" alt="Над законом">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1152261">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>115226" title="Над законом">Над законом</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113994"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1139940">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113994">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/5/6/0b9f3260bdff17089518ba055e7387.jpg/97x147/" alt="Вся президентская рать">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1139941">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113994" title="Вся президентская рать">Вся президентская рать</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="110061"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1100610">
                                                    <a href="<?=$this->link('index','watch').'&film='?>110061">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/2/5/f0355c6fb8421c3263442092ec451e.jpg/97x147/" alt="Напряги извилины">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1100611">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>110061" title="Напряги извилины">Напряги извилины</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="99914"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="999140">
                                                    <a href="<?=$this->link('index','watch').'&film='?>99914">
                                                        <img src="http://thumbs.ivi.ru/f18.vcp.digitalaccess.ru/contents/b/6/3444567b81bb51d0ad22fffc1c4760.jpg/97x147/" alt="Таинственная река">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_999141">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>99914" title="Таинственная река">Таинственная река</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113906"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1139060">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113906">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/3/e/b87eb6a7b6b43bd66fc1f01bc8d0f2.jpg/97x147/" alt="Опасные связи">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1139061">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113906" title="Опасные связи">Опасные связи</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="98614"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="986140">
                                                    <a href="<?=$this->link('index','watch').'&film='?>98614">
                                                        <img src="http://thumbs.ivi.ru/f11.vcp.digitalaccess.ru/contents/2/e/7dea895b459e40620db1f0b8821fd4.jpg/97x147/" alt="Кадры">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_986141">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>98614" title="Кадры">Кадры</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="64247"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="642470">
                                                    <a href="<?=$this->link('index','watch').'&film='?>64247">
                                                        <img src="http://thumbs.ivi.ru/f36.vcp.digitalaccess.ru/contents/a/6/7e8a2c9f3cbcaea20bcb3159469c2b.jpg/97x147/" alt="Гарри Поттер и философский камень">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_642471">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>64247" title="Гарри Поттер и философский камень">Гарри Поттер и философский камень</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="96144"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="961440">
                                                    <a href="<?=$this->link('index','watch').'&film='?>96144">
                                                        <img src="http://thumbs.ivi.ru/f37.vcp.digitalaccess.ru/contents/c/0/e57db6803e85d93e90a828e79c3c75.jpg/97x147/" alt="Заклятие">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_961441">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>96144" title="Заклятие">Заклятие</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="87494"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="874940">
                                                    <a href="<?=$this->link('index','watch').'&film='?>87494">
                                                        <img src="http://thumbs.ivi.ru/f36.vcp.digitalaccess.ru/contents/7/0/9d3e7ba5e2de431b86928a8de54dcd.jpg/97x147/" alt="Ледниковый период">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_874941">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>87494" title="Ледниковый период">Ледниковый период</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="105736"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1057360">
                                                    <a href="<?=$this->link('index','watch').'&film='?>105736">
                                                        <img src="http://thumbs.ivi.ru/f17.vcp.digitalaccess.ru/contents/6/b/39edaf9eab94efbe97608a32d09b35.jpg/97x147/" alt="Тачки 2">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1057361">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>105736" title="Тачки 2">Тачки 2</a>
                                                </strong>
                                            </li><!-- --><!-- --><li class="vb-item element-selector"
                                                                     data-id="113805"
                                                                     data-type="content"
                                                                     >




                                                <div class="image" onmouseover="da.xinfo.load(this);" data-uid="1138050">
                                                    <a href="<?=$this->link('index','watch').'&film='?>113805">
                                                        <img src="http://thumbs.ivi.ru/f38.vcp.digitalaccess.ru/contents/e/e/7be525dd754723c4a8c91320dcf5c5.jpg/97x147/" alt="Эпидемия">        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="price">
                                                            99 рублей        </span>
                                                        <span class="overlay"></span>
                                                    </a>
                                                    <div class="xinfo" id="xinfo_1138051">
                                                        <div class="xinfo-loading"></div>
                                                    </div>        </div>

                                                <strong>
                                                    <a href="<?=$this->link('index','watch').'&film='?>113805" title="Эпидемия">Эпидемия</a>
                                                </strong>
                                            </li><!-- -->                    </ul>
                                    </div></div>
                            </div>
                        </div></div>
                </div>            <div id="subtab_recommended" class="subtab subtab_recommended subtab_recommended_data">
                    <div id="subtab_recommended_tagpairs">
                    </div>
                </div>
                <script>
                    $(document).ready(function() {
                        Runner.tagpair('main', 'twotag_recommendations');
                    });

                </script>
                <div class="content-line" id="infinite_rate">
                    <div class="incut-line-wrapper">
                        <div class="incut-line user-votes">
                            <div class="title-wrap">
                                <span class="h2i">Оцените, чтобы уточнить рекомендации</span>
                                <a class="open-vote-help-block" title="Как это работает?" href="#"></a>
                            </div>
                            <div class="digits">
                                <strong>Поставлено оценок:</strong><div id="rates_count">0</div>
                            </div>
                            <div class="vote-help-block">
                                <div class="link-close gray"></div>
                                <div class="action-text">Оценивайте фильмы, выставляя оценку звездочками.</div>
                                <div class="img-wrap">
                                    <img src="/images/da/img/user-votes-showcase.png" alt="">
                                </div>
                                <div class="result-text">Чем больше оценок вы поставите, тем&nbsp;точнее&nbsp;будут&nbsp;ваши&nbsp;рекомендации.</div>
                            </div>
                            <ul class="films-gallery medium bordered inf_ul" data-wsource="index_tune_recommendations">
                            </ul>
                            <div class="overlay-login-to-save" id="rates_overlay" style="display:none">
                                <span class="h2i">Войдите, чтобы сохранить оценки и получить рекомендации</span>
                                <p>Чем больше фильмов вы оцените, тем точнее будут персональные рекомендации</p>
                                <a id="user_votes_login" href="#" class="action-button gradient large">Войти</a>
                            </div>
                        </div>
                    </div></div>            <div class="content-line"><div class="incut-line-wrapper">
                        <div class="incut-line ivi-on-devices">
                            <div class="deviсes-page-link"><a href="devices/">Страница устройств</a></div>
                            <ul class="wrap-urls">
                                <li>
                                    <strong><a href="devices/phones/">Мы на мобильных:</a></strong>
                                    <ul class="devices-list">
                                        <li><a href="/info/-/android/">Android</a></li>
                                        <li><a href="/info/-/ios/">iPhone/iPad</a></li>
                                        <li><a href="/info/-/winphone/">Windows Phone</a></li>
                                        <li><a href="/info/-/windows8/">Windows 8</a></li>
                                        <li><a href="/info/-/bada/">Samsung bada</a></li>
                                        <li><a href="/info/-/symbian/">Nokia (Symbian^3)</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <strong><a href="devices/tvs/">Мы на ТВ:</a></strong>
                                    <ul class="devices-list">
                                        <li><a href="/info/-/samsungtv/">Samsung</a></li>
                                        <li><a href="/info/-/lgtv/">LG</a></li>
                                        <li><a href="/info/-/philipstv/">Philips</a></li>
                                        <li><a href="/info/-/panasonictv/">Panasonic</a></li>
                                        <li><a href="/info/-/toshibatv/">Toshiba</a></li>
                                        <li><a href="/devices/stbs/dune/">Dune HD</a></li>
                                        <li><a href="/info/-/iconbit/">iconBIT</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div></div>            <div class="content-line">
                    <div class="selections-gallery-filters">
                        <div class="block-head">
                            <span class="h2i"><a href="/videos/podborki/">Подборки</a></span>
                            <div id="hiddden_selection_block" class="hidden">
                                <a href="/videos/podborki/cult_shestidesyatye/">Культовые фильмы 60-х</a>    <a href="/videos/podborki/postapocalyptic-films/">Постапокалиптические фильмы</a>    <a href="/videos/podborki/kulinary/">Кулинарная подборка</a>    <a href="/videos/podborki/madeinukraine/">Сделано на Украине</a>    <a href="/videos/podborki/hd_series/">Сериалы в HD</a>    <a href="/videos/podborki/stylish_movies/">Стильное кино</a>    <a href="/videos/podborki/sitcoms/">Комедийные сериалы</a>    <a href="/videos/podborki/medical_dramas/">Медицинские драмы</a>    <a href="/videos/podborki/new-year-cartoons/">Новогодние мультфильмы</a>    <a href="/videos/podborki/movie_franchises/">Лучшие кинофраншизы</a>    <a href="/videos/podborki/movies-about-Sherlock-Holmes/">Фильмы о Шерлоке Холмсе</a>    <a href="/videos/podborki/redbull/">Red Bull</a>    <a href="/videos/podborki/movies_about_tigers/">Фильмы про тигров</a>    <a href="/videos/podborki/best_cooking_shows/">Лучшие рецепты</a>    <a href="/videos/podborki/bbc_documentaries/">Документальные фильмы BBC</a>    <a href="/videos/podborki/musicals/">Фильмы про танцы</a>    <a href="/videos/podborki/doomsday_movies/">Фильмы о конце света</a>    <a href="/videos/podborki/biker_movies/">Фильмы про мотоциклы</a>    </div>                <div id="filters-wrapper-position" class="filters-wrapper-position"></div>
                            <div class="filters-wrapper" id="selections-filter">
                                <ul class="filter-nav" id="selection-categories-list">
                                    <li><a href="/videos/podborki/" data-value="all">Любая категория</a></li>
                                    <li>
                                        <a href="/videos/podborki/movies/" data-value="movies">Фильмы</a>
                                    </li>    <li>
                                        <a href="/videos/podborki/series/" data-value="series">Сериалы</a>
                                    </li>    <li>
                                        <a href="/videos/podborki/animation/" data-value="animation">Мультфильмы</a>
                                    </li>    <li>
                                        <a href="/videos/podborki/programs/" data-value="programs">Программы</a>
                                    </li>                    </ul>
                            </div>
                        </div>
                    </div>
                    <div class="main-col">
                        <!-- Блок "Подборки" -->
                        <div class="content-line selections-line">
                            <div class="main-col">
                                <div class="selections-gallery">
                                    <div id="selections-block-content">
                                        <ul data-wsource="index_podborki" id="selections-block-content-list">
                                            <li>
                                                <a class="image" href="/videos/podborki/lego_mults/"><img src="http://img.ivi.ru/static/8a/abd9/8aabd9eba918f7ed311d.0.jpeg" alt=""></a>
                                                <strong><a href="/videos/podborki/lego_mults/"> Мультфильмы LEGO</a></strong>
                                            </li>    <li>
                                                <a class="image" href="/videos/podborki/timeout/"><img src="http://img.ivi.ru/static/25/8494/25849446da61944a3323.0.jpg" alt=""></a>
                                                <strong><a href="/videos/podborki/timeout/">Лучшие фильмы по версии Time Out Москва</a></strong>
                                            </li>    <li>
                                                <a class="image" href="/videos/podborki/cosmos/"><img src="http://img.ivi.ru/static/8f/fb08/8ffb08b05e45a787fb78.0.jpg" alt=""></a>
                                                <strong><a href="/videos/podborki/cosmos/">Фильмы про космос</a></strong>
                                            </li>    <li>
                                                <a class="image" href="/videos/podborki/wall_street_wolves/"><img src="http://img.ivi.ru/static/5b/666c/5b666ccd7c319f9bcb2b.0.jpeg" alt=""></a>
                                                <strong><a href="/videos/podborki/wall_street_wolves/">Волки с Уолл-стрит</a></strong>
                                            </li>    <li>
                                                <a class="image" href="/videos/podborki/marvel_universe/"><img src="http://img.ivi.ru/static/d2/d4a9/d2d4a95c414c85ac2ea0.0.jpg" alt=""></a>
                                                <strong><a href="/videos/podborki/marvel_universe/">Вселенная Marvel</a></strong>
                                            </li>    <li>
                                                <a class="image" href="/videos/podborki/oscar/"><img src="http://img.ivi.ru/static/b8/193d/b8193d810540d97fdd89.0.jpg" alt=""></a>
                                                <strong><a href="/videos/podborki/oscar/">Премия «Оскар»</a></strong>
                                            </li>    <li>
                                                <a class="image" href="/videos/podborki/screen_adaptation/"><img src="http://img.ivi.ru/static/0e/da0b/0eda0b72594a586548e7.0.jpeg" alt=""></a>
                                                <strong><a href="/videos/podborki/screen_adaptation/">Экранизации классики</a></strong>
                                            </li>    <li>
                                                <a class="image" href="/videos/podborki/kvartet_i/"><img src="http://img.ivi.ru/static/0f/5f99/0f5f9916eb42ea62d7ad.0.jpeg" alt=""></a>
                                                <strong><a href="/videos/podborki/kvartet_i/">«Квартет И»</a></strong>
                                            </li>    <li>
                                                <a class="image" href="/videos/podborki/berlinale/"><img src="http://img.ivi.ru/static/e8/297a/e8297afe0a84e6789bce.0.jpg" alt=""></a>
                                                <strong><a href="/videos/podborki/berlinale/">Фильмы Берлинского кинофестиваля</a></strong>
                                            </li>                            </ul>
                                        <p class="more">
                                            <a id="selectons_more_btn" class="underlined" href="/videos/podborki/">Показать еще</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="extra-col">
                        <!-- Рекламный блок в боковой колонке -->
                        <!-- AdRiver code START. Type:240x400 Site: ivi SZ: index PZ: 0 BN: 0 -->
                        <script type="text/javascript">
                            var RndNum4NoCash = Math.round(Math.random() * 1000000000);
                            var ar_Tail = 'unknown';
                            if (document.referrer)
                                ar_Tail = escape(document.referrer);
                            document.write(
                                    '<iframe src="' + ('https:' == document.location.protocol ? 'https:' : 'http:') + '//ad.adriver.ru/cgi-bin/erle.cgi?'
                                    + 'sid=147544&sz=index&target=top&bt=22&pz=0&rnd=' + RndNum4NoCash + '&tail256=' + ar_Tail
                                    + '" frameborder=0 vspace=0 hspace=0 width=240 height=400 marginwidth=0'
                                    + ' marginheight=0 scrolling=no></iframe>');
                        </script>
                        <noscript>
                        <a href="//ad.adriver.ru/cgi-bin/click.cgi?sid=147544&sz=index&bt=22&pz=0&rnd=449811776" target=_top>
                            <img src="//ad.adriver.ru/cgi-bin/rle.cgi?sid=147544&sz=index&bt=22&pz=0&rnd=449811776" alt="-AdRiver-" border=0 width=240 height=400></a>
                        </noscript>

                        <!-- AdRiver code END -->        </div>
                </div>            <div class="content-line clear-line-wrapper similar" id="similar-parent">

                    <div class="block-head">
                        <span class="h2i">Похожее на самые популярные фильмы ivi.ru</span>
                        <select name="similar" id="similar" class="dropdown-choice rounded">
                            <option value="89056">Плезантвиль</option>    <option value="95898">Параллельные миры</option>    <option value="113559">Три короля</option>    <option value="99489">Даже не думай!</option>    <option value="60814">Медальон</option>            </select>
                    </div>

                    <ul class="films-gallery submedium light vb-container" data-wsource="index_similar_recommendations">
                    </ul>
                </div>                <div class="content-line"><div class="incut-line-wrapper">
                        <div class="incut-line promo-lesser-block" data-wsource="index_littlepromo">
                            <span class="h2i">Выбор редакции</span>
                            <ul>
                                <li>
                                    <a href="http://www.ivi.ru<?=$this->link('index','watch').'&film='?>109851">
                                        <img src="http://img.ivi.ru/static/f3/3b80/f33b801811e17fbdbd4a.0.jpg" alt="Распутин" pxlink="">
                                    </a>
                                    <strong>
                                        <a href="http://www.ivi.ru<?=$this->link('index','watch').'&film='?>109851">Распутин</a>
                                    </strong>
                                    <small></small>
                                </li>    <li>
                                    <a href="http://www.ivi.ru<?=$this->link('index','watch').'&film='?>molodoy_volkodav">
                                        <img src="http://img.ivi.ru/static/37/c1b1/37c1b1a071e66c1b2d8d.0.jpg" alt="Молодой Волкодав" pxlink="">
                                    </a>
                                    <strong>
                                        <a href="http://www.ivi.ru<?=$this->link('index','watch').'&film='?>molodoy_volkodav">Молодой Волкодав</a>
                                    </strong>
                                    <small></small>
                                </li>    <li>
                                    <a href="http://www.ivi.ru<?=$this->link('index','watch').'&film='?>demony_da_vinchi/season2">
                                        <img src="http://img.ivi.ru/static/b0/c5e0/b0c5e0531e76a7831dd0.0.jpg" alt="Демоны Да Винчи" pxlink="">
                                        <span class="price"></span>        </a>
                                    <strong>
                                        <a href="http://www.ivi.ru<?=$this->link('index','watch').'&film='?>demony_da_vinchi/season2">Демоны Да Винчи</a>
                                    </strong>
                                    <small>ВТОРОЙ СЕЗОН!</small>
                                </li>    <li>
                                    <a href="http://www.ivi.ru<?=$this->link('index','watch').'&film='?>60799">
                                        <img src="http://img.ivi.ru/static/2a/6b86/2a6b860aa309b090be38.0.jpg" alt="Конан-варвар" pxlink="">
                                    </a>
                                    <strong>
                                        <a href="http://www.ivi.ru<?=$this->link('index','watch').'&film='?>60799">Конан-варвар</a>
                                    </strong>
                                    <small></small>
                                </li>    <li>
                                    <a href="http://www.ivi.ru<?=$this->link('index','watch').'&film='?>107172">
                                        <img src="http://img.ivi.ru/static/57/433d/57433d0cd99476530708.0.jpg" alt="Рио" pxlink="">
                                        <span class="price"></span>        </a>
                                    <strong>
                                        <a href="http://www.ivi.ru<?=$this->link('index','watch').'&film='?>107172">Рио</a>
                                    </strong>
                                    <small></small>
                                </li>                </ul>
                        </div>
                    </div></div>
                <div class="content-line">
                    <div class="description" itemprop="description">
                        <div class="expandable description-text" id="description-footer-text">
                            <div class="content-wrapper">


                                <p>Каждый день миллионы людей ищут фильмы онлайн и никто не хочет  усложнять себе жизнь – и вы наверняка один из них! А раз так, то ivi.ru – это именно тот ресурс, который вам нужен, если вы хотите смотреть фильмы онлайн бесплатно и без регистрации. Потому что именно наш сайт является настоящим Эльдорадо для киноманов. </p>

                                <p>Мы дарим вам смех, адреналин, взрывные эмоции – а вы при этом не  тратите ничего! Хотите смотреть кино без регистрации? Пожалуйста, выбирайте и смотрите – мы экономим ваше время. На сайте доступен бесплатный просмотр фильмов – мы экономим ваши деньги. И нет, все вышесказанное  не значит, что картины  будут в плохом качестве. Как раз наоборот! И мы снова экономим  – ваши усилия, которые могли быть потрачены на попытки разобрать невнятные диалоги, некачественный перевод, расплывчатую картинку. </p>

                                <p>Быстро, бесплатно, захватывающе – вот что такое кинопросмотр с ivi.ru!</p>

                            </div>
                        </div>
                    </div>
                </div>
                <script>
                    $(document).ready(function() {
                        Runner.start({
                            watchAgainIds: [],
                            updater_path: 'http://img.ivi.ru/UpdaterSWF.swf'
                        });
                    });
                </script>        </div>
        </div>

        <div id="flash_updater" class="flash-updater"></div></div>
</div>