var $wW = $(window).width(),
	$modLink = $(".ap-mod"),
	$mClose = $(".ap-modal-close"),
	$mCloseBtn = $('.ap-mod-close'),
	$siteData = '',
	$termsData;

function terms(termsUrl) {
	if ($termsData) {
		$(".ap-modal-terms-data").html($termsData);
	} else {
		$.get(termsUrl, function(data) {
			$termsData = data;
			$(".ap-modal-terms-data").html($termsData);
			$(".ap-scroll").perfectScrollbar("update");
		});
	}
}

function globLoader() {
	$(".ap-modal--loading").fadeOut("1", function() {
		$(this)
			.removeClass("ap-modal--is-visible")
			.removeAttr("style");

		$("body")
			.removeClass("ap--is-loading")
			.addClass("ap--is-ready ap--is-intro");

		init();
	});
}

function loadDoc() {
	$(".ap").imagesLoaded({ background: true }, function() {
		globLoader();
	});
}

function intro() {
	function openGarage() {
		var $inTl = new TimelineLite();

		$inTl.fromTo(
			"#logo",
			1,
			{ opacity: "0", y: "-50px" },
			{ opacity: "1", y: "0px" }
		);
		$inTl.fromTo("#door-wall", 2, { y: "0px" }, { y: "-400px" }, 2.2);
		$inTl.fromTo(
			"#tree-vector",
			2,
			{ scale: ".8", y: "-50px", transformOrigin: "center" },
			{ scale: "1", y: "0px", transformOrigin: "center" },
			2.4
		);
		$inTl.fromTo(
			".ap-lg",
			0.6,
			{ y: "-100px", opacity: "0" },
			{ y: "0", opacity: "1" },
			2.5
		);
		$inTl.fromTo(
			".ap-intro-nav",
			0.6,
			{ y: "100px", opacity: "0" },
			{ y: "0", opacity: "1", onComplete: setReadyHome },
			2.7
		);
	}
	openGarage();
}

function setReadyHome() {
	$("body").removeClass("ap--is-intro");
	$(".ap-op--intro").addClass("ap-op--intro-done");
}

function init() {
	// // Trigers when loader fadeOuts
	intro();
	if ($(".ap-scroll").length) {
		$(".ap-scroll").perfectScrollbar();
	}
}

function hashur() {
	$(".ap-hash-link").click(function() {
		$("html, body").animate(
			{
				scrollTop: $($(this).attr("href")).offset().top
			},
			100
		);
		return false;
	});
}

function modalBoix() {
	$modLink.on('click', function (e) {
		e.preventDefault();

		var $link = $(this).attr('href'),
				$el = $($link),
				$vis = $('.ap-modal--is-visible');

		$vis.removeClass('ap-modal--is-visible');

		$el.fadeIn(function () {
			$el.addClass('ap-modal--is-visible');
		});
	});

	$mClose.on('click', function (e) {
		e.preventDefault();
		closemodal.call(this);
	});

	$mCloseBtn.on('click', function (e) {
		e.preventDefault();
		closeEsc();
	});

	$(document).keyup(function (e) {
		if (e.keyCode == 27) {
			e.preventDefault();
			closeEsc();
		}
	});

	function closemodal() {
		var $la = $(this),
				$elm = $la.closest('.ap-overlay');

		$elm.fadeOut(function(){
			$elm.removeClass('ap-modal--is-visible').removeAttr('style');
		});
	}

	function closeEsc() {
		$('.ap-overlay').fadeOut(function () {
			$(this).removeClass('ap-modal--is-visible').removeAttr('style');
		});
	}
}

function modalCall(modalId) {
	var $link = $(modalId),
			$el = $($link),
			$vis = $('.ap-modal--is-visible');

	console.log(modalId);

	$vis.removeClass('ap-modal--is-visible');

	$el.fadeIn(function () {
		$el.addClass('ap-modal--is-visible');
	});
}

function docData() {
	$.ajax({
		url: "../Content/data/site-data.json",
		method: "GET",
		dataType: 'json',
		success: function(data) {
			useReturnData(data);
			loadDoc();
		},
		error: function(){
			console.log('Something is wrong men.')
		}
	});
}

function useReturnData(data){
	$siteData = data;

	gamifiying(data, $day, $error);
};


function gamifiying(data, $day, $error) {
	var $globalDay = $day,
			$canPlay = $error;

	dayEqualstoGame();

	var $DAYPINEANIMATION = 'runAnimationDay'+$day+'';
	var $RUNSETTINGSFORGAMEDAY = 'runGame'+$gameSts+'';

	console.log(
		'Current game day is:'+$globalDay+'.',
		' Session is '+$canPlay+' for play.');

	var $animationDays = {
		runAnimationDay1: function(){
			console.log('Pine Animation for day One')
		},
		runAnimationDay2: function(){
			console.log('Pine Animation for day two')
		}
	};

	var $gameSttings = {
		runGameAhorcado: function(){
			console.log('Ahorcado game settings')
		},
		runGameTrivia: function(){
			console.log('Trivia game settings')
		},
		runGameRompecabezas: function(){
			console.log('Rompe Cabezas game settings')
		}
	};

	function dayEqualstoGame() {

		if ($day === 1 || $day === 3 || $day === 14) {
			// Game Rompecabezas
			$gameSts = 'Rompecabezas';
			return $gameSts
		} else if($day === 2 || $day === 4 || $day === 6) {
			// Game Trivia
			$gameSts = 'Trivia';
			return $gameSts
		}
	}

	$animationDays[$DAYPINEANIMATION]();
	$gameSttings[$RUNSETTINGSFORGAMEDAY]();
}


$(function() {
	docData();
	terms("../html/page.terms.html");
	hashur();
	modalBoix();

	$('.link').on('click', function(e){
		e.preventDefault();
		modalCall("#ap-modal--login-error");
	})
});
