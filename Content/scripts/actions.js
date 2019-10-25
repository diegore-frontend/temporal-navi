var $wW = $(window).width(),
	$modLink = $(".ap-mod"),
	$mClose = $(".ap-modal-close"),
	$mCloseBtn = $(".ap-mod-close"),
	$siteData = "",
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
		});
	}

	function closeEsc() {
		$(".ap-overlay").fadeOut(function() {
			$(this)
				.removeClass("ap-modal--is-visible")
				.removeAttr("style");
		});
	}
}

function isGame() {
	if ($(".ap-game").length) {
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
	$siteData = data;

	gamifiying(data);
	fillData(data);
}

function gamifiying(data) {
	var $globalDay = $day,
		$siteData = $(data),
		$canPlay = $error;

	dayEqualstoGame();

	var $DAYPINEANIMATION = "runAnimationDay" + $day + "";
	var $RUNSETTINGSFORGAMEDAY = "runGame" + $gameSts + "";

	console.log(
		"Current game day is:" + $globalDay + ".",
		" Session is " + $canPlay + " for play."
	);

	var $animationDays = {
		runAnimationDay1: function() {

		},
		runAnimationDay2: function() {
			console.log("Pine Animation for day two");
		}
	};

	var $gameSttings = {
		runGameAhorcado: function(data) {
			console.log("Ahorcado game settings");

			gameType();
			$(".ap-instructions-tt").html($siteData[0].instructionsRompecabezas[0].title);
			$(".ap-instructions-ttt").html($siteData[0].instructionsRompecabezas[0].common);
			$(".ap-instructions-info").html($siteData[0].instructionsRompecabezas[0].copy);
			$(".ap-instructions-img").append($siteData[0].instructionsRompecabezas[0].img);
		},
		runGameTrivia: function(data) {
			console.log("Trivia game settings");
			gameType();
			$(".ap-instructions-tt").html($siteData[0].instructionsTrivia[0].title);
			$(".ap-instructions-ttt").html($siteData[0].instructionsTrivia[0].common);
			$(".ap-instructions-info").html($siteData[0].instructionsTrivia[0].copy);
			$(".ap-instructions-img").append($siteData[0].instructionsTrivia[0].img);
		},
		runGameRompecabezas: function(data) {
			console.log("Rompe Cabezas game settings");
			gameType();
			$(".ap-instructions-tt").html($siteData[0].instructionsRompecabezas[0].title);
			$(".ap-instructions-ttt").html($siteData[0].instructionsRompecabezas[0].common);
			$(".ap-instructions-info").html($siteData[0].instructionsRompecabezas[0].copy);
			$(".ap-instructions-img").append($siteData[0].instructionsRompecabezas[0].img);
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

	$animationDays[$DAYPINEANIMATION]();
	$gameSttings[$RUNSETTINGSFORGAMEDAY]();
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

	$('.click-id').on('click', function(){
		modalCall("#ap-modal--instructions")
	})
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
});
