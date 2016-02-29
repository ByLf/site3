var image = {
        review: 'Малая картинка (ссылка)',
        main: 'Ссылка на большую картинку'
    },
    telephone = {
        article: 189238,
        type: 'Смартфон',
        brand: 'Samsung',
        model: 'GT-I9301I GALAXY S 3',
        characteristics: {
            typeOfSim: 1, //Sim =0, MicroSim = 1, NanoSim = 2
            numberOfSim: 2,
            color: 1, //МАССИВОМ: 1=white Применить побитовое сравнение для цветов. +_detecedColor
            OS: 0,// 1- iOS, 0- Android, 2 - Windows Modile, 3- Symbian, иначе писать строку + _decodeIndex
            G3: true,
            LTE: false,
            GPS: true // проверять на условие, иначе писать строку. Занести в отдельную функцию
        },
        photo: [image], //Сначала идет картинка небольших размеров, и потом если надо подгружается главная. Избегать артефактов!
        definition: "Смартфон Samsung GT-I9301I GALAXY S 3 Ceramic White Моноблок, Micro-SIM, Android 4.4, 3G, Bluetooth 4.0, EDGE, GPRS, WAP, Wi-Fi, Количество ядер процессора 4, Частота процессора 1400 МГц... ",
        numderOfStar: 4,
        numderOfReview: 4,
        cost: 11290, //cделать fункцию отделения пробелом. ох,ох,ох+ _divideCost
        availability: true//наличие
    },
    listOfTelephone = [telephone];
//Модуль преобразования значений объекта в данные на странице, общий
// Я предупрежден, что всё это логичнее делать на чистом js
(function () {
    function _divideCost(Cost) {
        Cost = '' + Cost;
        var length = Cost.length - 1,
            result = '';
        if (length < 3) {result = Cost;
                        } else {
                while (length >= 0) {
                    result = Cost.substr(length - 3, 3) + " " + result;
                    Cost = Cost.substring(0, length - 3);
                    length = length - 3;
                }
            }
        return result;
    }
    function _decodeIndex() {
        var value = this;
        if (typeof value === Number || typeof value === Boolean) {
            return arguments[value];
        } else { return value; }
    }
    function _detecedColor(value) {
        var colors = ['Белый', 'Серый', 'Черный', 'Синий', 'Красный', 'Желтый', 'Оранжевый', 'Зеленый', 'Голубой', 'Фиолетовый', 'Розовый', 'Коричневый'],
            i = 0,
            result = 'Бесцветный',
            nowColor = 1;
        for (i = 0; i++; i < 12) {
            if (value & nowColor) {
                if (result !== 'Бесцветный') {
                    result += ', ' + colors[i];
                }
                    else {
                        result = colors[i];
                    }
            }
        }
    }
    function _makeStar(numOfStar) {
        var i = 0;
        for (i = 0; i < 5; i++)
            if (i < numOfStar) {

            } else{

            }
    }
    function _showNumberOfReview (telephone, target) {
        $('<div/>', {
            class: 'content__numder_of_rewiev',
            text: telephone.numderOfReview
        }).appendTo(target);
    }
    function _showArticle(telephone, target) {
        $('<div/>', {
            class: 'content__list_article',
            text: 'Артикул '
        })
            .append('<span/>', text = telephone.article )
            .dotdotdot({ellipsis: '...'})
            .appendTo(target);
    }
    function _showName(telephone, target) {
        $('<div/>', {
            class: 'content__list_name',
            text: telephone.type + ' ' + telephone.brand + ' ' + telephone.model
        })
            .dotdotdot({ellipsis: '...'})
            .appendTo(target);
    }
    function _showCost(telephone, target) {
        $('<div/>', {
            class: "content__list_cost",
            text: _divideCost(telephone.cost)
        }).appendTo(target);
    }
    function _togglefocus() {
        var that = $(this);
        if (that.hasClass('content__block_image_review')) {
            $('.content__block_image_review_active')
                .addClass('content__block_image_review')
                .removeClass('content__block_image_review_active');
            that.addClass('content__block_image_review_active')
            that.removeClass('content__block_image_review');
        }
    }
    function _showImageBlock(telephone, targer) {
        var imageBlock =  $('<div/>', {class = 'content__block_image'}),
            imageList = $('<div/>', {class = 'content__block_image_review_list'}),
            i = 1,
            lengthOfArrayImage = telephone.photo.length;
        $('<div/>', {class = 'content__block_image_main'})
            .append($('<img/>', src = telephone.photo[0].main))
            .appendTo(imageBlock);
        $('<div/>', {class = 'content__block_image_review_active'})
            .append($('<img/>', src = telephone.photo[0].review))
            .on('focus', _togglefocus)
            .appendTo(imageList);
        for (i = 1; i < lengthOfArrayImage; i++) {
            $('<div/>', {class = 'content__block_image_review'})
                .append($('<img/>', src = telephone.photo[i].review))
                .on('focus', _togglefocus)
                .appendTo(imageList);
        }
        imageList.appendTo(imageBlock);
        imageBlock.appendTo(target);
    }

    window.addCost = _showCost;
    window.NumReview = _showNumberOfReview;
    window.addArticle = _showArticle;
    window.addName = _showName;
    window.addImageBlock = _showImageBlock;

    window.decodeColor = _detecedColor;
    window.Star = _makeStar;
})();
//Не сметь трогать этот модуль!

//Модуль собирания вида список
(function () {
    display:nonne
    shabloon
    wrar+article+name+cost+aver+button
    var shabloon = $('<div/>', {class: 'content__list'});
    shabloon.hide();
    shabloon.append
})()
//Модуль собирания вида списка с картинками
//Модуль собирания вида блоков
//Модуль сортировки
