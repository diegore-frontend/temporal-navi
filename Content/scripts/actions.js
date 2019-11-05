var $wW = $(window).width(),
	$modLink = $(".ap-mod"),
	$mClose = $(".ap-modal-close"),
	$mCloseBtn = $(".ap-mod-close"),
	$host = window.location.hostname,
	$string = "http://"+ $host +":3000/html/game.html",
	$pine = $('.ap-pine'),
	$siteData = "",
	$randomStant = Math.floor(Math.random() * 7) + 1,
	$id = "",
	$ea = "",
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
	$(".ap-modal--game-loader")
		.fadeOut()
		.removeAttr("style");

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

function gameLoader() {
	var $prog = $(".ap-load-bar-progress");
	// Tween Animation
	TweenMax.to($prog, 1, { width: "100%", onComplete: loadOut });
}

function loadDoc() {
	var $isGame = $(".ap-game-stage").length;

	$(".ap").imagesLoaded({ background: true }, function() {
		if ($isGame) {
			gameLoader();
		} else {
			globLoader();
		}
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
	// Trigers when loader fadeOuts
	intro();
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
	$modLink.on("click", function(e) {
		e.preventDefault();

		var $link = $(this).attr("href"),
			$el = $($link),
			$vis = $(".ap-modal--is-visible");

		$vis.removeClass("ap-modal--is-visible");

		$el.fadeIn(function() {
			$el.addClass("ap-modal--is-visible");
		});
	});

	$mClose.on("click", function(e) {
		e.preventDefault();
		closemodal.call(this);
	});

	$mCloseBtn.on("click", function(e) {
		e.preventDefault();
		closeEsc();
	});

	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			e.preventDefault();
			closeEsc();
		}
	});

	function closemodal() {
		var $la = $(this),
			$elm = $la.closest(".ap-overlay");

		$elm.fadeOut(function() {
			$elm.removeClass("ap-modal--is-visible").removeAttr("style");
			animateScript();
		});
	}

	function closeEsc() {
		$(".ap-overlay").fadeOut(function() {
			$(this)
				.removeClass("ap-modal--is-visible")
				.removeAttr("style");

			animateScript();
		});
	}
}

function isGame() {
	if ($(".ap-game").length) {
		$("body").addClass("ap--is-game-menu");
	} else if ($(".ap-game-stage").length) {
		$("body").addClass("ap--is-game");
	}
}

function modalCall(modalId) {
	var $link = $(modalId),
		$el = $($link),
		$vis = $(".ap-modal");
	$vis.removeClass(".ap-modal--is-visible");

	$el.fadeIn(function() {
		$el.addClass("ap-modal--is-visible");
	});

	if (modalId === "#ap-modal--instructions") {
		animateScript();
	}
}

function docData() {
	$.ajax({
		url: "../Content/data/site-data.json",
		method: "GET",
		dataType: "json",
		success: function(data) {
			useReturnData(data);
			loadDoc();
		},
		error: function() {
			console.log("Something is wrong men.");
		}
	});
}

function useReturnData(data) {
	gamifiying(data);
	fillData(data);
}

function gamifiying(data) {
	var $globalDay = $day,
		$siteData = $(data),
		$giftArr = [],
		$currentDay = $day,
		$dayfrom = "",
		$canPlay = $error;

	pineStatus();
	standsPerDay();
	dayEqualstoGame();

	var $DAYPINEANIMATION = "runAnimationDay";
	var $RUNSETTINGSFORGAMEDAY = "runGame" + $gameSts + "";

	// Aquí va la animación del pino cuando ganas el pin del día
	var $animationWinDays = {
		runAnimationDay: function() {
			winSequence()
		},
	};

	var $gameSttings = {
		runGameEncuentraError: function(data) {
			console.log("Encuentra error game settings");

			gameType();
			$(".ap-instructions-tt").html(
				$siteData[0].instructionsEncuentra[0].title
			);
			$(".ap-instructions-ttt").html(
				$siteData[0].instructionsEncuentra[0].common
			);
			$(".ap-instructions-info").html(
				$siteData[0].instructionsEncuentra[0].copy
			);
			$(".ap-instructions-img").append(
				$siteData[0].instructionsEncuentra[0].img
			);
			$(".ap-play-btn").html($siteData[0].instructionsEncuentra[0].btn);
		},
		runGameTrivia: function(data) {
			console.log("Trivia game settings");
			gameType();
			$(".ap-instructions-tt").html($siteData[0].instructionsTrivia[0].title);
			$(".ap-instructions-ttt").html($siteData[0].instructionsTrivia[0].common);
			$(".ap-instructions-info").html($siteData[0].instructionsTrivia[0].copy);
			$(".ap-instructions-img").append($siteData[0].instructionsTrivia[0].img);
			$(".ap-play-btn").html($siteData[0].instructionsTrivia[0].btn);
		},
		runGameRompecabezas: function(data) {
			console.log("Rompe Cabezas game settings");
			gameType();

			$(".ap-instructions-tt").html(
				$siteData[0].instructionsRompecabezas[0].title
			);
			$(".ap-instructions-ttt").html(
				$siteData[0].instructionsRompecabezas[0].common
			);
			$(".ap-instructions-info").html(
				$siteData[0].instructionsRompecabezas[0].copy
			);
			$(".ap-instructions-img").append(
				$siteData[0].instructionsRompecabezas[0].img
			);
			$(".ap-play-btn").html($siteData[0].instructionsRompecabezas[0].btn);
		}
	};

	function dayEqualstoGame() {
		if ($day === 1 || $day === 3 || $day === 14) {
			// Game Rompecabezas
			$gameSts = "Rompecabezas";
			return $gameSts;
		} else if ($day === 2 || $day === 4 || $day === 6) {
			// Game Trivia
			$gameSts = "Trivia";
			return $gameSts;
		}
	}

	function standsPerDay() {
		if ($day > 1) {
			$('.ap-stands-bg').addClass('ap-stands-bg--day-'+$randomStant+'');
		} else {
			$('.ap-stands-bg').addClass('ap-stands-bg--day-'+$day+'');
		}
	}

	function winSequence() {
		if($win === true) {
			switchPineGifts();
		}
	}

	// Es estado del pino segun los días
	function pineStatus() {
		$giftArr = $('.ap-pine-gift');
		$dayfrom = $($giftArr.slice(0, $currentDay-1));
		$dayfrom.removeClass('ap-pine-gift-hide');
	}

	function switchPineGifts() {

		$dayfrom = $($giftArr.slice(0, $currentDay+1));

		if ($('.ap-game-end').length) {
			$dayfrom.addClass('ap-pine-gift--wined');
			var $animationPrice = $('.ap-pine-gift--wined');
			// Aquí se ejecuta la animación del icono ganador
			animateGift($animationPrice);
		}
	}

	$gameSttings[$RUNSETTINGSFORGAMEDAY]();
	$animationWinDays[$DAYPINEANIMATION]();
}

function fillData(data) {
	$siteData = $(data);

	$(".ap-btn-home").html($siteData[0].homeInfo[0].btnTxt);

	// Modalboxes
	$(".ap-login-day").html($day);
	$(".ap-login-tt").html($siteData[0].loginModalInfo[0].title);
	$(".ap-login-info").html($siteData[0].loginModalInfo[0].info);
	$(".ap-login-error-tt").html($siteData[0].loginModalInfo[0].errorTitle);
	$(".ap-login-error-info").html($siteData[0].loginModalInfo[0].errorInfo);
	$(".ap-login-error-btn").html($siteData[0].loginModalInfo[0].errorBtn);
	$(".ap-leave-tt").html($siteData[0].leaveModalInfo[0].title);
	$(".ap-leave-info").html($siteData[0].leaveModalInfo[0].info);
	$(".ap-leave-btn").html($siteData[0].leaveModalInfo[0].leaveBtn);
	$(".ap-leave-btn-back").html($siteData[0].leaveModalInfo[0].leaveBtnBack);
	$(".ap-error-flow-tt").html($siteData[0].errorflowModalInfo[0].title);
	$(".ap-error-flow-info").html($siteData[0].errorflowModalInfo[0].info);
	$(".ap-error-flow-btn").html($siteData[0].errorflowModalInfo[0].errorBtn);
	$(".ap-terms-tt").html($siteData[0].termsModalInfo[0].title);

	// Hold On
	$(".ap-hold-tt").html($siteData[0].holdOnModalInfo[0].title);
	$(".ap-hold-info").html($siteData[0].holdOnModalInfo[0].info);

	// Gift Error
	$(".ap-gift-err-tt").html($siteData[0].errorGiftModalInfo[0].title);
	$(".ap-gift-err-info").html($siteData[0].errorGiftModalInfo[0].info);

	// Loader
	$(".ap-load-tt").html($siteData[0].loaderModalInfo[0].tt);
}

function glowAnimation() {
	var $tarElem = ".click-id-anim";

	TweenLite.defaultEase = Linear.easeNone;
	var tl = new TimelineMax({ yoyo: true, repeat: -1 });
	var dur = 0.8;
	tl.to($tarElem, dur, { attr: { dx: 0, dy: 0, stdDeviation: 0 } }, 0);
}

function gameType() {
	glowAnimation();

	$(".click-id").on("click", function() {
		modalCall("#ap-modal--instructions");
	});

	// Animación de instrucciones a Juego
	$("#ap-play-game").on("click", function() {
		modalCall("#ap-modal--game-loader");

		var $progU = $(".ap-load-bar-progress");
		$timeWait = 1;

		// Tween Animation
		TweenMax.to($progU, $timeWait, { width: "50%", onComplete: goToGame });
	});
}

function goToGame() {
	var $game = $gameSts.toLowerCase();

	window.location.replace("http://"+ $host +":3000/html/game-" + $game + ".html");
}

function loadOut() {
	$(".ap-modal--game-loader").fadeOut("1000", function() {
		$(this)
			.removeClass("ap-modal--is-visible")
			.removeAttr("style");
		$("body")
			.removeClass("ap--is-loading")
			.addClass("ap--is-ready");
		console.log("Game counter starts Here motha fuckas");
	});
}

function animateScript() {
	var $clack = $(".ap-mod-clack"),
		$el = $(".ap-modal--instructions");

	$clack.toggleClass("ap-mod-clack--open");
	$el.toggleClass("ap-modal--instructions-open");
}

function animateGift($animationPrice) {
	var $el = $animationPrice;
	console.log($el)
}


$(function() {
	isGame();
	docData();
	terms("../html/page.terms.html");
	hashur();
	modalBoix();

	$(".link").on("click", function(e) {
		e.preventDefault();
		modalCall("#ap-modal--login-error");
	});

	$(".ap-login-wfacebook, .ap-login-wtwitter").on("click", function(e) {
		if ($error === true) {
			e.preventDefault();
			modalCall("#ap-modal--login-error");
		}
	});

	if ($(".ap-scroll").length) {
		$(".ap-scroll").perfectScrollbar();
	}

	$.each( [ "a", "b", "c" ], function( i, l ){
	  console.log("Index #" + i + ": " + l );
	});
});
