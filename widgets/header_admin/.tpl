<?php //if ( $this->user->getId() ): ?>
<?php
  $url = $_SERVER["REQUEST_URI"];
?>
	<div class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a href="/index.php" class="navbar-brand" style="color:#D9230F;">ivi</a>
          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="navbar-collapse collapse" id="navbar-main">
          <ul class="nav navbar-nav">
            <li class="<?php if(strpos($url,'groups') !== false) print 'active';?>">
              <a href="<?=$this->link('admin', 'groups');?>">Группы</a>
            </li>
            <li class="<?php if(strpos($url,'categories') !== false) print 'active';?>">
              <a href="<?=$this->link('admin', 'categories');?>">Категории</a>
            </li>
            <li class="<?php if(strpos($url,'films') !== false) print 'active';?>">
              <a href="<?=$this->link('admin', 'films');?>">Фильмы</a>
            </li>
            <li class="<?php if(strpos($url,'news') !== false) print 'active';?>">
              <a href="<?=$this->link('admin', 'news');?>">Новости</a>
            </li>
            <li class="<?php if(strpos($url,'sliders') !== false) print 'active';?>">
              <a href="<?=$this->link('admin', 'sliders');?>">Слайдер</a>
            </li>
            <li class="<?php if(strpos($url,'users') !== false) print 'active';?>">
              <a href="<?=$this->link('admin', 'users');?>">Список пользователей</a>
            </li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li><a href="<?php echo $this->link('user', 'logout') ?>" ><span class="glyphicon glyphicon-log-out"></span> Выход</a></li>
          </ul>

        </div>
      </div>
    </div>


<?php //endif ?>
