/**
 * Контроллер опросника:
 */
da.survey = {
    isFill: 65,
    ratesCount: 0,
    rateItems: null,
    lock: false,
    tabs:{
        //Вкладка "свойства":
        properties: function($tab, resp)
        {
            da.survey.load($tab, function(){
                var recalc = da.survey.progress({form:'#step_properties', progress:'properties'});
                //Обработка запроса:
                $tab.$target.find('input').click(function(){
                    da.survey.add({type:'property', id: $(this).data('id'), value: this.value})
                    recalc();
                    $(this).parents('tr').addClass('checked');
                });
                
                da.survey.ajaxExamples('/genre/ajax/property', $tab, 'property');
                da.survey.initScroll('#thead-properties');
                
                $tab.$target.find('tbody').each(function(){
                    var $tbody = $(this);
                    var tr = $tbody.find('tr');
                    if (tr.length == 1)
                    {
                        $tbody.hide();
                    }
                    $(tr[0]).click(function(){
                        if ($tbody.hasClass('collapsed'))
                        {
                            $tbody.removeClass('collapsed')
                        }
                        else
                        {
                            $tbody.addClass('collapsed')
                        }
                    });
                });
            });
        },
        //Вкладка "жанры":
        genres: function($tab, resp)
        {
            da.survey.load($tab, function(){
                var tbody = $tab.$target.find('tbody');
                var collapsed = /\bcollapsed\b/;
                var total = 0;
                var recalc = function()
                {
                                        if (total)
                                        {
                                            da.survey.status.set('genres', 0)
                                        }
                    var checked = 0;
                    tbody.each(function(){
                        if (collapsed.test(this.className) && $(this).find('tr.head').hasClass('checked'))
                        {
                            checked += this.getElementsByTagName('tr').length;
                        }
                        else
                        {
                            checked += $(this).find('tr.checked').length;
                        }
                        
                    });
                    da.survey.status.set('genres', Math.floor(100*checked/total))
                }
                tbody.each(function(){
                    var $tbody = $(this);
                    total += $tbody.find('tr').length;
                    $tbody.find('tr.head input').click(function(){
                        $(this).parents('tr').addClass('checked');
                        //Обновляем форму:
                        if (this.value > 1)
                        {
                            $tbody.removeClass('collapsed');
                        }
                        else
                        {
                            $tbody.addClass('collapsed');
                        }
                        da.survey.add({type:'category', id: $tbody.data('id'), value: this.value});
                        recalc();
                    });
                });
                $tab.$target.find('tr.row input').click(function(){
                    var $me = $(this);
                    $me.parent().parent().addClass('checked');
                    da.survey.add({type:'genre', id: $me.data('id'), value: this.value});
                    recalc();
                });
                
                da.survey.ajaxExamples('/genre/ajax/genre', $tab, 'genre');
                da.survey.initScroll('#thead-genres');
            });
        },
        devices: function($tab)
        {
            var checked = function(input)
            {
                var ret = null;
                if (input.checked)
                {
                    $(input).parents('tr').addClass('checked');
                    return checked.often;
                }
                else
                {
                    $(input).parents('tr').removeClass('checked');
                    return checked.never;
                }
            }
            checked.never = 1;
            checked.often = 3;
            
            /**
             * Обновить статус:
             */
            var status = function(value)
            {
                if (value == checked.often)
                {
                    da.survey.status.set('devices',100);
                }
                else {
                    if ($tab.$target.find('tr.checked').length > 0)
                    {
                        da.survey.status.set('devices',100);
                    }
                    else
                    {
                        da.survey.status.set('devices',0);
                    }
                }
                return value;
            }
            
            da.survey.load($tab, function(){
                $tab.$target.find('input').each(function(){
                    checked(this);
                    $(this).change(function(){
                        da.survey.add({type:'device', id: this.id, value: status(checked(this))});
                    })
                });
                //Обновляем статус:
                status();
            });
        },

        rate: function($tab)
        {
            da.survey.select($tab);
            da.survey.initPrevButton($tab);
            $.ajax
            ({
                url:      '/default/rate/all/item',
                type:     'POST',
                data: {
                    "class" : "unvoted size16",
                    "items" : da.survey.rateItems
                },
                dataType: "json",
                success:  function(response)
                {
                    if (response.common !== undefined)
                    {
                       for(i=0; i<10; i++)
                       {
                          $($tab.$target).find('ul.inf_ul').append(response.common[i]["html"]);
                       }

                       $($tab.$target).find('ul.inf_ul li').iviMoviePopup();
                       
                    }

                    if (typeof(response.extra) != 'undefined' && response.extra.length > 0)
                    {
                          itemsStorage.addItems(response.extra);
                    }
                }
            });
        },

        subtabs: function()
        {
            $.ajax
            ({
                url:      '/survey/recommendation',
                dataType: "json",
                success:  function(response)
                {
                    if (response.html === undefined)
                    {
                        response.html = "Временно недоступно";
                    }
                    $(".subtab_recommended_data").html(response.html);
                }
            });
        }
    },
    ajaxExamples: function(url, $tab, key)
    {
        var tpl = $('#survey_profile_examples_popup').template();
        $tab.$target.find('.examples-wrapper span').mouseover(function(){
            var $me = $(this);
            if ($me.data('load'))
            {
                return;//just loaded
            }
            $me.data('load', true);
            $.ajax({
                url:url, 
                dataType:'json',
                data: {id: $me.data('id'), render:'survey_profile_examples_popup', count:3},
                success: function(resp)
                {
                    var list = '';
                    for (var i = 0; i < resp.entries.length; i++)
                    {
                        list += resp.entries[i].html;
                    }
                    var html = $.tmpl(tpl, resp[key]);
                    $(html).find('ul').html(list);
                    $me.parent().append(html);
                }
            });
        });
    },
    /**
     * Обработка статуса выполнения:
     */
    status: {
        value: 0,
        init: function(resp)
        {
            da.survey.status.set('properties', resp.properties);
            da.survey.status.set('genres', resp.genres);
            da.survey.status.set('devices', resp.devices);
            da.survey.status.set('rate', resp.rate);
        },
        get: function()
        {
            return da.survey.status.value;
        },
        set: function(step, progress)
        {
            // Normalizing value
            if (progress > 100) {
                progress = 100;
            }
            else if (progress < 0) {
                progress = 0;
            }
            else {
                progress = parseInt(progress);
            }
            
            // Getting jQuery object for wrapper (step label element)
            var $label_elem = $('#step_label_' + step);
            
            // Getting DOM element for canvas (diagram)
            var canvas_elem = $label_elem.find('canvas').get(0);
            // Redrawing diagram
            drawPieDiagram(canvas_elem, progress, '#fff', '#000');
            
            // Setting percent value
            $label_elem.find('.percent > strong').html(progress);
            
            // Setting tick status (ticked if progress is 100%)
            $label_elem.find('.tick').toggleClass('ticked', progress >= 100);
            
            da.survey.status.refresh();
        },
        subscribe: function(fn)
        {
            da.on('survey.status.update').add(fn);
        },
        refresh: function()
        {
            var $collection = $('#recommendations_adjust_steps_nav > li .percent > strong');
            var num_steps   = $collection.length;
            var percent_sum = 0;
            
            $collection.each(function(index, elem) {
                percent_sum += parseInt($(elem).html());
            });
            
            var total = Math.round(percent_sum / num_steps);

            da.survey.status.draw(total);
            da.survey.status.updateButtons(total);
            da.survey.status.value = total;

            da.on('survey.status.update').fire(total);
        },
        /**
         * Sets total progress value for recommendation survey
         * @param int progress  Progress value (0 to 100)
         */
        draw: function(progress)
        {
            var value = progress + '%';
            var $elem = $('#survey_total_progress_bar');
            
            // Setting bar width
            $elem.children('.bar').css('width', value);
            
            // Setting label value (and inverting label view if needed)
            $elem.children('.value')
                .toggleClass('inverted', progress > 50)
                .html(value);
        },

        /**
         * Enables or disables survey results buttons (all of them)
         * @param int progress  Progress value (0 to 100)
         */
        updateButtons: function(progress)
        {/*
            // Status is active if total progress is 80% or more
            var status = true;
            
            // Collecting all necessary buttons
            $collection = $('.view-recommendations');
            
            // Unbinding previous click function
            $collection.unbind('click');
            
            
            if (status) {
                // Getting tabs API
                var api = $('#recommendations_subtabs_nav').data('tabs');
                
                // Activating button
                $collection
                    .removeClass('disabled')
                    .click(function() {
                        api.click('#subtab_recommended');
                        return false;
                    });
            }
            
            else {
                // Deactivating button
                $collection
                    .addClass('disabled')
                    .click(function() {
                        return false;
                    });
            }*/
        }
    },
    items:[],
    /**
     * Инициация табов:
     */
    init: function(settings)
    {
        if (da.survey.lock) return;
        da.survey.lock = true;

        if(settings.rateItems)
        {
            da.survey.rateItems = settings.rateItems;
        }
        
        var first = true;
        $(settings.id).children('li').each(function(){
            //Проходимся по всем табам:
            var $this = $(this);
            //Создаем функцию загрузки:
            this.load = function()
            {
                if ($this.$target)
                {
                    //Таб уже загружен по ajax:
                    da.survey.select($this);
                    return false;
                }
                //Загружаем таб:
                $this.$target = $($this.data('target'));
                da.survey.tabs[$this.data('controller')]($this);
                return false;
            }
            $this.click(this.load);
            da.survey.items[$this.data('controller')] = this;
            if (first)
            {
                //Загружаем первый таб:
                this.load();
                first = false;
            }            
        });
        $.ajax({
            url: '/survey/json/stat',
            dataType: 'json',
            success: da.survey.status.init
        });

        /* функционал для плашки с предложением заполнить опросник {{ */
        var $surverTipPlate = $('#surver-tip-plate');
        var surverTipPlateCookie = 'hide_survey_plate_' + IviStore.user_id;

        if ($.cookie(surverTipPlateCookie) !== null) {
            $surverTipPlate.remove();
        } else {
            $surverTipPlate.show();
        }

        $('.link-close', $surverTipPlate).on('click', function(event){
            $surverTipPlate.remove();

            $.cookie(surverTipPlateCookie, 1, {
                expires: 365,
                path: '/'
            });

            event.preventDefault();
        });
        /* }} функционал для плашки с предложением заполнить опросник */
    },
    load: function($this, callback)
    {
        $.ajax({
            url: $this.data('url'),
            success: function(resp)
            {
                //Заполняем html:
                $this.$target.html(resp);
                da.survey.initPrevButton($this);
                //Дергаем каллбек:
                callback(resp);
                //Показываем таб:
                da.survey.select($this);
                
            }
        });
    },
    initPrevButton: function($this)
    {
        //Навешиваем действия на кнопки вперед-назад:
        $this.$target.find('.prev-next-buttons a').click(function(){
            if($(this).data('to') !== "ratefw"){
            return da.survey.items[$(this).data('to')].load();
            }
        });
    },
    /**
     * Выбрать элементы:
     */
    select: function($tab)
    {
        if (da.survey.active)
        {
            da.survey.active.removeClass('active');
            da.survey.active.$target.hide();
        }
        da.survey.active = $tab;
        da.survey.active.addClass('active');
        da.survey.active.$target.show();
        
        // сейчас это расчёт всегда выдаёт 0, но если изменится поведение шапки, она возможно будет иметь смысл
        var scrollOffset = $('.content-main').position().top - calculateScrollOffset();
        $('html, body').animate({ scrollTop: scrollOffset}, 0);
    },
    add: function(data, callback)
    {
        $.ajax({
            url: '/survey/add/',
            type:'post',
            dataType:'json',
            data: data,
            success: function(resp)
            {
                if (callback) callback(resp);
            }
        });
    },
    //Функция для пересчета прогресса:
    progress: function(settings)
    {
        var $form   = $(settings.form);
        var total = 0;
        $form.find('tr').each(function(){
            if (this.getElementsByTagName('input').length > 0)
            {
                total += 1;
            }
        });
        var ret = function()
        {
                    var rate = 0;
                    if (total)
                    {
                        var checked = $form.find('tr.checked').length;
                        var rate = Math.floor(100 * checked/total);
                    }
                    da.survey.status.set(settings.progress, rate);
        }
        ret();
        return ret;
    },
    initScroll: function(id){
        //Тут будет код, который прилепляет "часто редко никогда" к верху
        var opera_pre_10_6 = $.browser.opera && ($.browser.version.slice(0, 4) < '10.6');
        if (!opera_pre_10_6) {

            function catalogFiltersRefreshState()
            {
                var scroll_cur = $(document).scrollTop();

                var position_elem = $(id + '-wrapper-position');
                var position      = position_elem.offset();
                var float_filters = scroll_cur > scroll_max;
                var elem = $(id);

                if ($('.plate-notices').length) {
                    var scroll_max = position.top - 60 - $('.header').height();
                } else {
                    var scroll_max = position.top - $('.header').height();
                }

                if (scroll_cur > scroll_max) {
                    elem.addClass('floating');
                } else {
                    elem.removeClass('floating');
                }
            }

            // Initializing #filters-wrapper-position state and adding handler for this state
            // catalogFiltersRefreshState();

            $(window).scroll(function () {
                if ($(id).is(':visible')) {
                    catalogFiltersRefreshState();
                } else {
                    $(id).removeClass('floating');
                }
            });
        }
    }
}