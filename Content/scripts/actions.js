var $wW = $(window).width(),
	$modLink = $(".ap-mod"),
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

$(function() {
	terms("../html/page.terms.html");
	loadDoc();
	hashur();
});
