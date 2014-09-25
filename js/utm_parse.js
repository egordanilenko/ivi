function getParam(sParamName)
{
    var Params = location.search.substring(1).split("&"); // отсекаем "?" и вносим переменные и их значения в массив
    var variable = "";

    for (var i = 0; i < Params.length; i++)
    { // пробегаем весь массив
        if (Params[i].split("=")[0] == sParamName)
        { // если это искомая переменная
            // если значение параметра задано, то возвращаем его
            if (Params[i].split("=").length > 1) variable = Params[i].split("=")[1];
            return variable;
        }
    }
    return "";
}

function setUtmParams(campaign, source, content)
{
    sessionStorage.setItem("utm_campaign", campaign);
    sessionStorage.setItem("utm_source", source);
    sessionStorage.setItem("utm_content", content);
}

var utm_campaign = getParam('utm_campaign');
var utm_source   = getParam('utm_source');
var utm_content  = getParam('utm_content');

if(utm_campaign != "")
{
    setUtmParams(utm_campaign, utm_source, utm_content);
}
else
{
    var ref = document.referrer;
    var regexp = null;
    // Если есть referrer то парсим по regexp'aм
    if(ref)
    {
        // если юзер пришел без utm_campaign и utm_source
        var campaign =
        [
            
        ];

        for (var i in campaign)
        {
            if(!campaign.hasOwnProperty(i)) continue;

            regexp = campaign[i].regexp;

            if(regexp.test(ref))
            {
                setUtmParams(campaign[i].name, "");
                break;
            }
        }
    }
}