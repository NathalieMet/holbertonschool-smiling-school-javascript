$(document).ready(function () {
	function addNewArticle1(data, carousel) {
		const p = $('<p></p>').text(`« ${data.text}`).addClass('text-white');
		const span = $('<span></span>').text(data.title).addClass('text-white');
		const h = $('<h4></h4>').text(data.name).addClass('text-white font-weight-bold');
		const img = $('<img></img>').attr('src', data.pic_url).addClass('d-block align-self-center').attr('alt', 'Carousel Pic');

		const carouselItem = $('<div class="carousel-item"></div>');

		const row = $('<div class="row mx-auto align-items-center"></div>');
		const colImg = $('<div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center"></div>');
		const colText = $('<div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0"></div>');
		const quoteText = $('<div class="quote-text"></div>');

		colImg.append(img);
		quoteText.append(p).append(h).append(span);
		colText.append(quoteText);
		row.append(colImg).append(colText);
		carouselItem.append(row);

		$(carousel).append(carouselItem);
	}

	function addNewArticle2(data, carousel) {
		const p = $('<p></p>').text(data['sub-title']).addClass('card-text text-muted');
		const span = $('<span></span>').text(data.duration).addClass('main-color');
		const h5 = $('<h5></h5>').text(data.title).addClass('card-title font-weight-bold');
		const thumbnail = $('<img></img>').attr('src', data.thumb_url).addClass('card-img-top').attr('alt', 'Video thumbnail');
		const play = $('<img></img>').attr('src', "images/play.png").addClass('align-self-center play-overlay').attr('alt', 'Play').attr('width', '64px');
		const creator_img = $('<img></img>').attr('src', data.author_pic_url).addClass('rounded-circle').attr('alt', "Creator of Video").attr('width', '30px');
		const h6 = $('<h6></h6>').text(data.author).addClass('pl-3 m-0 main-color');
		const stars = data.star;
		const rating = $('<div class="rating"></div>');

		for (let i = 0; i < stars; i++) {
			rating.append($('<img></img>').attr('src', "images/star_on.png").attr('alt', "star on").attr('width', '15px'));
		}

		const col = $('<div class="col-12 col-sm-6 col-md-4 col-lg-3"></div>');
		const card = $('<div class="card"></div>');
		const card_body = $('<div class="card-body"></div>');
		const creator = $('<div class="creator d-flex align-items-center"></div>');
		const info = $('<div class="info pt-3 d-flex justify-content-between"></div>');
		const card_play = $('<div class="card-img-overlay text-center"></div>');

		card_play.append(play);
		info.append(rating).append(span);
		creator.append(creator_img).append(h6);
		card_body.append(h5).append(p).append(creator).append(info);
		card.append(thumbnail).append(card_play).append(card_body);
		col.append(card);

		$(carousel).append(col);
	}

	function slick_carousel(carousel) {
		$(carousel).slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: true,
			arrows: true,
			centerMode: true,
			centerPadding: '0',
			prevArrow: '<a class="slick-prev"><img src="images/arrow_black_left.png" alt="Previous" aria-hidden="true" /></a>',
			nextArrow: '<a class="slick-next"><img src="images/arrow_black_right.png" alt="Next" aria-hidden="true" /></a>',
			autoplay: true,
			autoplaySpeed: 4000,
			responsive: [

				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	}

	function query(url, addArticleFunction, loaderSelector, carouselSelector) {
		$(loaderSelector).show();

		$.ajax({
			url: url,
			dataType: 'json',
			success: function (response) {
				$(loaderSelector).hide();

				response.forEach(function (quote) {
					addArticleFunction(quote, carouselSelector);
				});

				if (carouselSelector === '#carousel-popular' || carouselSelector === '#carousel-latest') {
					slick_carousel(carouselSelector);
				} else if (carouselSelector === '#carousel-quotes') {
					$(`${carouselSelector} .carousel-item`).first().addClass('active');
				}

			},
			error: function () {
				alert("Server Error");
				$(loaderSelector).hide();
			}
		});
	}

	query('https://smileschool-api.hbtn.info/quotes', addNewArticle1, '.loader1', '#carousel-quotes');
	query('https://smileschool-api.hbtn.info/popular-tutorials', addNewArticle2, '.loader2', '#carousel-popular');
	query('https://smileschool-api.hbtn.info/latest-videos', addNewArticle2, '.loader3', '#carousel-latest');
});
