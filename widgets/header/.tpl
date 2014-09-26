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
          <a href="" title="Фильмы онлайн">Фильмы</a>
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
          <a href="" title="">Сериалы</a>
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
          <a href="" title="Мультфильмы онлайн">Мультфильмы</a>
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
          <a href="" title="">Программы</a>
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
        <form id="fast_search_form" class="fast-search" method="GET" action="/search/simple/">
          <div class="tools-box">
            <input at_counter='[search_field]' name="q" type="text" value="" title="Поиск..." id="search-text" autocomplete="off">
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
       <!--  <div>
                <a href="<?php echo $this->link('admin','index'); ?>"></a><span>Админка</span>
        </div> -->
          <div class="profile-block">
            <div class="auth-link">
                <span onclick="">Войти</span>
                <a href="<?php echo $this->link('admin','index'); ?>"><span>Админка</span></a>
            </div>
          </div>
        </div>
    </div>
</header>