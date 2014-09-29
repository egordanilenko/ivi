<header>
    <div class="logo">
      <a href="/" title="Онлайн-кинотеатр">
          <span>ivi</span>
          <img src="img/logo_54x29.png" alt="ivi">
      </a>
    </div>
    <ul class="main-nav">
      <li>
        <div class="item">
          <a href="<?=$this->link('index','films')?>&gr=1" title="Фильмы онлайн">Фильмы</a>
        </div>
        <div class="sub-nav-wrapper">
          <ul class="sub-main-nav" id="cat_0">
            <li><strong><a href="">Фильмы 2012 года</a></strong></li>
            <li class="last-section"><strong><a href="">Фильмы 2013 года</a></strong></li>
            <?php
            $count = 0;
            $id = 0;
            $cats = sp_category::find('code_sp_gruppa = 1');
            foreach ($cats as $cat):?>
              <?php if($count > 10){ $id++; print '</ul><ul class="sub-main-nav" id="cat_'.$id.'">';$count=0;} ?>
              <li><a href="" title=""><?php echo $cat->category_name?></a></li>
            <?php $count++;endforeach; ?>
          </ul>
        </div>
      </li>
      <li>
        <div class="item">
          <a href="<?=$this->link('index','films')?>&gr=2" title="">Сериалы</a>
        </div>
        <div class="sub-nav-wrapper">
          <ul class="sub-main-nav">
          <?php
            $count = 0;
            $id = 0;
            $cats = sp_category::find('code_sp_gruppa = 2');
            foreach ($cats as $cat):?>
              <?php if($count > 10){ $id++; print '</ul><ul class="sub-main-nav" id="cat_'.$id.'">';$count=0;} ?>
              <li><a href="" title=""><?php echo $cat->category_name?></a></li>
            <?php $count++;endforeach; ?>
          </ul>
        </div>
      </li>
      <li>
        <div class="item">
          <a href="<?=$this->link('index','films')?>&gr=3" title="Мультфильмы онлайн">Мультфильмы</a>
        </div>
        <div class="sub-nav-wrapper">
          <ul class="sub-main-nav">
            <?php
            $count = 0;
            $id = 0;
            $cats = sp_category::find('code_sp_gruppa = 3');
            foreach ($cats as $cat):?>
              <?php if($count > 10){ $id++; print '</ul><ul class="sub-main-nav" id="cat_'.$id.'">';$count=0;} ?>
              <li><a href="" title=""><?php echo $cat->category_name?></a></li>
            <?php $count++;endforeach; ?>
          </ul>
        </div>
      </li>
      <li>
        <div class="item">
          <a href="<?=$this->link('index','films')?>&gr=4" title="">Программы</a>
        </div>
        <div class="sub-nav-wrapper">
          <ul class="sub-main-nav">
            <?php
            $count = 0;
            $id = 0;
            $cats = sp_category::find('code_sp_gruppa = 4');
            foreach ($cats as $cat):?>
              <?php if($count > 10){ $id++; print '</ul><ul class="sub-main-nav" id="cat_'.$id.'">';$count=0;} ?>
              <li><a href="" title=""><?php echo $cat->category_name?></a></li>
            <?php $count++;endforeach; ?>
          </ul>
        </div>
      </li>
      <li>
        <div class="item"><a href="">Ещё</a></div>
        <div class="sub-nav-wrapper">
          <ul class="sub-main-nav">
            <li><a href="">Подборки</a></li>
            <li><a href="">Новости</a></li>
            <li><a href="">Студии</a></li>
            <li><a href="">Фильмы в HD</a></li>
            <li><a href="">Сериалы в HD</a></li>
          </ul>
        </div>
      </li>
      <li>
          <a href="<?=$this->link('admin','index')?>">
              <strong class="user-name">Админка</strong>
          </a>
      </li>
      <li class="nav-plus">
          <div class="item"><a at_counter="[ivi_plus_premieres]" href="/premieres/">ivi+</a></div>
          <div class="sub-nav-wrapper">
              <ul class="sub-main-nav">
                  <li><a href="">Блокбастеры ivi+</a></li>
                  <li><a href="">Подписка ivi+</a></li>
                  <li><a class="erotic_link" href="">Эротика+</a></li>
                  <li><a href="">Активировать сертификат</a></li>
              </ul>
          </div>
      </li>
    </ul>
    <div class="search-user-block">
        <div class="table-row">
        <form id="fast_search_form" class="fast-search" method="GET" action="<?=$this->link('index','search')?>">
          <div class="tools-box">
            <input name="res" type="text" value="" title="Поиск..." id="search-text" autocomplete="off">
            <input id="fast_search_submit" type="submit" value="">
          </div>
          <script id="content_autocomplete" type="text/x-jquery-tmpl">
          {{if content_count}}
            {{if total == 1}}
            {{each content}}
              <div class="exact-result">
                <a href="${link}"><img src="${image}/115x176/" alt=""></a>
                <span><a href="${link}"></a></span>
                {{if year||country}}
                  <small>
                    ${year}{{if year && country}}, {{/if}}${country}
                  </small>
                {{/if}}
              </div>
            {{/each}}    {{else}}
            <ul>
              {{each content}}
                <li>
                  <a href="${link}"><img src="" alt=""></a>
                  <span><a class="object-name" href="">${title}</a></span>
                  {{if year||country}}
                  <small>
                    ${year}{{if year && country}}, {{/if}}${country}
                  </small>
                  {{/if}}
                </li>
              {{/each}}
            </ul>    {{/if}}
          {{/if}}

          {{if person_count}}
            <ul class="actors-result">
              {{each person}}
                <li>
                  <a class="object-name" href="">${title}</a>
                </li>
              {{/each}}
            </ul>{{/if}}

          {{if total > 1}}
            <div class="more-results"><a href="">Все результаты</a></div>
          {{/if}}

          {{if !total}}
            <div class="nothing-found">
              <p>К сожалению, по введенному вами запросу ничего не найдено.</p>
              <p>Попробуйте ввести другой запрос.</p>
            </div>
          {{/if}}
          </script>
          <div class="result-box" id="fast_search_result"></div>
        </form>
          <div class="profile-block">
          <?php if(1==1) ://если загогинен?>
              <div class="profile-wrapper">
                <a href="<?=$this->link('index','profile')?>">
                  <span>7</span>
                  <img src="img/user-avatar-default.png" alt="" class="active">
                  <strong class="user-name">Юрий Репин</strong>
                </a>
                <ul class="user-info-block">
                  <li class="billing"><div><strong><a href="#" class="buy-link">Оформить подписку</a></strong></div><div class="cash"><strong><a href="#" class="header-profile-buy-link">Пополнить счет</a></strong></div></li>
                  <li><a href="<?=$this->link('index','profile')?>">Личный кабинет</a></li>
                  <li><a href="<?=$this->link('index','profile')?>&profile_tab=watched">История просмотров</a></li>
                  <li id="user-menu-favourites"><a href="<?=$this->link('index','profile')?>&profile_tab=favorites">Очередь <small>(<span id="user_menu_show_favourites_items_count">4</span>)</small></a></li>
                  <li><a href="<?=$this->link('index','profile')?>&profile_tab=recommendations">Рекомендации</a></li>
                  <li><a href="">Выход</a></li>
                </ul>
              </div>
            <?php else: ?>
            <div class="auth-link">
                <span onclick="">Войти</span>
            </div>
          <?php endif; ?>
          </div>

        </div>
    </div>
</header>