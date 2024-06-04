$(document).ready(function () {
	function addNewArticle(data) {
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

		$('.carousel-inner').append(carouselItem);


	}

	function query() {
		const url = 'https://smileschool-api.hbtn.info/quotes';

		$.ajax({
			url: url,
			dataType: 'json',
			success: function (response) {
				response.forEach(function (quote) {
					addNewArticle(quote);
				});

				$('.carousel-item').first().addClass('active');

			},
			error: function () {
				alert("Server Error");
			}
		});
	}

	$(document).on('click', '.carousel-control-prev, .carousel-control-next', function () {
		const slides = $('.carousel-item');
		const slideActive = $('.carousel-item.active');

		//Détermine la direction de la navigation (suivant ou précédent) basée sur le bouton cliqué.
		const calcNextSlide = $(this).hasClass('carousel-control-next') ? 1 : -1;

		//Calcule l'index de la nouvelle diapositive à activer.
		let newIndex = calcNextSlide + slides.index(slideActive);

		//Gère les cas où la nouvelle index dépasse les limites du tableau de diapositives, créant ainsi une boucle infinie.
		if (newIndex < 0) newIndex = slides.length - 1;
		if (newIndex >= slides.length) newIndex = 0;

		//Met à jour les classes pour rendre la nouvelle diapositive active et désactiver l'ancienne.
		slideActive.removeClass('active');
		slides.eq(newIndex).addClass('active');
	});

	query();
});
