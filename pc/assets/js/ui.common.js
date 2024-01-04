/* 《 종근당건강몰 PC 공통 UI js 》 */

$(document).ready(function() {
	headerUI(); //헤더UI
	$(".form_chk.box, .form_chk.box_slim, .form_chk.box_mini").length && boxCheck(); //체크박스:박스형
	$(".location").length && locationUI(); //로케이션UI
	$("#lnb").length && lnbUI(); //LNB UI
	$(".go_top").length && goTop(); //페이지상단이동
	$("#quick").length && quickAside(); //#QUICK UI
	$(".mov_tab_wrap").length && movTab(); //좌우이동탭메뉴
	$(".line_tab_wrap").length && lineTabUI(); //라인탭메뉴UI
	$(".board_accdn").length && accordion(); //아코디언게시판UI
	$(".admin_bnr_area").length && bnrSwiper(); //관리자배너스와이프
	$(".list_menu").length && productSwiper(); //상품목록스와이프
	$(".big_prd_list.prd_swipe").length && bigPrdSwiper(); //큰썸네일상품스와이프
	$(".prd_large_view").length && bigViewPrd(); //선택상품크게보기:선택용상품스와이프
	$('.coupn_wrap').length && coupnSlider(); //쿠폰스와이프
	$('.scrah_slide_wrap').length && scrahEvt(); //복권긁기이벤트
	$(".ord_info_wrap").length && order_scroll();//장바구니/주문결제 스크롤
	$(".ui_selt_layout").length && selectUI(); //셀렉트 아코디언UI
	$(".ui_drop_layout").length && accSimpleUI(); //버튼 아코디언UI
	$(".btn_tooltip").length && toolTip(); //툴팁버튼
	$(".share_tooltip").length && sharePop(); //공유하기 툴팁 show/hide
	$(".order.payment").length && paymentUI(); //주문결제 UI
	$(".brand_ctgry_wrap .brand_list").length && brandListSwiper(); //브랜드카테고리:브랜드목록
	$(".alert_pop").length && alertPopup(); //알럿
	$(".full_pop").length && fullPopup(); //팝업
	$(".toast_pop").length && toastPop(); //토스트팝업
	$(".full_pop.photo_view").length && photoSwiper(); //리뷰이미지크게보기
	$(".main_pop_wrap").length && mainPopBnr(); //메인 일반/임직원팝업 슬라이드
	$(".product.view").length && prdViewUi()// 상품상세 UI
	$(".main").length && mainUI(); //메인UI
});

function boxCheck(){ //체크박스:박스형
	$(".form_chk.box, .form_chk.box_slim, .form_chk.box_mini").each(function() {
		var $this = $(this),
			boxChk = $this.find("input[type=checkbox]");

		boxChk.change(function() {
			if($(this).is(':checked')) {
				//console.log("checked");
				$(this).closest(".form_chk").addClass("on");
			}else{
				//console.log("unchecked");
				$(this).closest(".form_chk").removeClass("on");
			}
		});

		if(boxChk.prop('checked')){ /* checked 상태 */
			//console.log('활성');
			$(this).closest(".form_chk").addClass('on');
		}

		if(boxChk.prop('disabled')){ /* disabled 상태 */
			//console.log('비활성');
			$(this).closest(".form_chk").addClass('unchk');
		}
	});
}

function headerUI(){ //헤더UI
	headSearchUI(); //헤더검색UI
	gnbUI(); //GNB UI

	$(window).scroll(function() {
		var st = $(window).scrollTop();

		$("#header").addClass("bdr");
		if(st < 40){
			$("#header").removeClass("bdr");
		}
	});
}

function headSearchUI(){ //헤더검색UI
	$(".head_search").on("click", "input", function() { //검색레이어열림
		if(!$(".head_search").hasClass("on")){
			$(".head_search").addClass("on");
			$(".srch_layer").slideDown(450);
		}
	});

	$(document).mouseup(function(e) {
		var srchLayer = $(".srch_layer");

		if(srchLayer.has(e.target).length === 0 && $(".head_search").hasClass("on")){
			srchLayer.slideUp();
			setTimeout(function() {
				$(".head_search").removeClass("on");
			}, 450);
		}
	});
}

function gnbUI(){ //GNB 전체메뉴 UI
	$("#gnb .all").on('mouseenter', ".btn", function(e) { /* 전체메뉴열림 */
		e.preventDefault();

		if(!$("#gnb").hasClass("open")){
			$("#gnb").addClass("open");
			$(".all_ctgry_wrap").slideDown();
			$(".ctgry_set").eq(0).find("li").eq(0).addClass('on');
		}
	});

	$(".view_sub > a, .view_sub > .tit_18").on('mouseover', function() { /* 2뎁스오버:서브메뉴노출 */
		var $this = $(this),
			menuWrap = $this.closest(".view_sub");

		subRemove();
		menuWrap.addClass('on');
		$(".all_ctgry_wrap").css('width', '372px');

		if($this.hasClass('brand')){ /* 브랜드서브열릴때 가로사이즈 변경 */
			$(".all_ctgry_wrap").css('width', '585px');
		}
	});

	$(".all_ctgry_wrap").on('mouseleave', function() { /* 전체메뉴떠날때 닫힘 */
		if($("#gnb").hasClass("open")){
			$("#gnb").removeClass("open");
			hideMenu();
			subRemove();
			$(".all_ctgry_wrap").css('width', '372px');
		}
	});

	$(document).on('mouseup', function(e) { /* 전체메뉴영역외클릭:닫힘 */
		var gnbAll = $("#gnb");

		if(gnbAll.has(e.target).length === 0 && gnbAll.hasClass("open")){
			$("#gnb").removeClass("open");
			hideMenu();
			subRemove();
			$(".all_ctgry_wrap").css('width', '372px');
		}
	});

	function subRemove(){
		$(".view_sub").removeClass('on');
	}
	function hideMenu(){
		$(".all_ctgry_wrap").slideUp();
	}
}

function locationUI(){ //로케이션UI
	$(".location .menu_div").on("click", ".ctrl_trg", function() {
		var $this = $(this),
			locWrap = $this.closest(".menu_div"),
			menuArea = locWrap.find(".drop_area");

		if(!locWrap.hasClass("open")){
			$(".location .menu_div").removeClass("open");
			$(".drop_area").slideUp();
			locWrap.addClass("open");
			menuArea.slideDown();
		}else{
			locWrap.removeClass("open");
			menuArea.slideUp();
		}
	});
	$(document).mouseup(function (e){ /* 닫기 */
		var locat_menu = $(".location .menu_div");
		if(locat_menu.has(e.target).length === 0 && locat_menu.hasClass("open")){
			locat_menu.removeClass("open");
			$(".drop_area").slideUp();
		}
	});
	$(".scroll_area").mCustomScrollbar({
		theme: "my-theme",
	});
}

function lnbUI(){ //LNB UI
	$("#lnb .menu_group").each(function() { /* LNB에서 하위뎁스 찾음 */
		var $this = $(this);

		if($this.find(".dep_02").length){
			var depIcon = $(this).find(".i_sp_16");
			depIcon.hide();
			$(this).addClass("has_sub");
		}
	});

	$(".has_sub").on("click", ".dep01_link", function(e) { /* 하위뎁스열기 */
		e.preventDefault();

		var $this = $(this),
			depthParent = $this.closest(".menu_group"),
			subDepth = depthParent.find(".dep_02");

		if(!depthParent.hasClass("open")){
			depthParent.addClass("open");
			subDepth.slideDown();
		}else{
			depthParent.removeClass("open");
			subDepth.slideUp();
		}
	});
}

function goTop(){ //페이지상단이동
	$(".go_top").on('click', ".go_view", function() {
		$("html, body").animate({
			scrollTop: 0
		}, 500);
		return false;
	});
}

function quickAside(){ //#QUICK UI
	var lastViewProd = new Swiper(".last_view .swiper", { //최근본상품 스와이프
		speed: 600,
		spaceBetween: 12,
		pagination: {
			el: ".paging_swipe .swiper-pagination",
			type: "fraction",
		},
		navigation: {
			nextEl: ".paging_swipe .swiper-button-next",
			prevEl: ".paging_swipe .swiper-button-prev",
		},
	});

	var footOff = $("#footer").offset().top - 1000,
		quickHeight = $("#quick .cotn").outerHeight();

	$(window).scroll(function() {
		var st = $(window).scrollTop();

		if(footOff <= st){
			/* 푸터 위에서 멈춤 */
			$("#quick").addClass("fix_clear");
			$("#quick").css({
				bottom: quickHeight + 100
			});
		}else{
			$("#quick").removeClass("fix_clear");
			$("#quick").css({
				bottom: "auto"
			});
		}

		if($("#wrap").hasClass("main")){ //메인 퀵메뉴
			if(st >= 380){
				$("#quick").css({ /* 스크롤따라가다가fixed */
					position: "fixed",
					top: "360px",
				});
			}else{
				$("#quick").css({ /* 원래위치로복귀 */
					position: "absolute",
					top: "640px",
				});
			}

			if(footOff <= st){ /* 푸터 위에서 멈춤 */
				$("#quick").css({
					position: "relative",
					top: "auto",
					bottom: quickHeight + 100
				});
			}
		}
	});

	function fixQuick(){
		$("#quick").css({
			position: "fixed",
		});
	}
}

function movTab(){ //좌우이동탭메뉴
	var movTabWrap = $(".mov_tab_wrap .swiper");
	movTabWrap.each(function(index) {
		var $this = $(this);
		// var selc = $this.closest(".tab_cotn").addClass("type" + index);
		$this.siblings(".swiper-button-next").addClass("type"+index);
		$this.siblings(".swiper-button-prev").addClass("type"+index);
		var swiper = new Swiper(this, {
			slidesPerView: 6,
			spaceBetween: 8,
			slidesPerGroup: 6,
			touchRatio: 0,//드래그 금지
			slideToClickedSlide: true,
			navigation: {
				nextEl: ".type"+index+".swiper-button-next",
				prevEl: ".type"+index+".swiper-button-prev",
			},
		});
		// 탭메뉴 7개미만 슬라이드 해제
		var btnTab = $this.find(".div_set");
		if(btnTab.length < 7){
			$this.closest(".mov_tab_wrap").addClass("non_mov");
		}
	});
}
function lineTabUI(){ //라인탭메뉴UI
	var btnTab = $(".line_tab_wrap .div_set");

	$(".line_tab_wrap").on("click", ".bt_tab", function() { //라인탭선택
		var lineTab = $(this).closest(".line_tab_wrap"),
			targetPos = $(this).closest(".div_set").position().left,
			targetWidth = $(this).outerWidth(),
			onBorder = lineTab.find(".on_bdr");

		onBorder.css({ //onBorder 이동 모션
			width: targetWidth,
			transform: "translate3d("+ (targetPos) +"px, 0, 0)",
		});

		$(this).closest(".div_set").addClass("on");
		$(this).closest(".div_set").siblings("div").removeClass("on");
	});

	btnTab.each(function() {
		if($(this).hasClass("on")){ //활성화탭 border 이동
			var target = $(this),
				targetPos = target.position().left,
				targetWidth = $(this).outerWidth(),
				onBorder = target.closest(".line_tab_wrap").find(".on_bdr");

			onBorder.css({
				width: targetWidth,
				transform: "translate3d("+ (targetPos) +"px, 0, 0)"
			});
		}
	});
}

function accordion(){ //아코디언게시판UI
	$(".board_accdn").on("click", ".ctrl_acc", function() {
		var $this = $(this),
			accWrap = $this.closest(".acc_group"),
			boardCotn = accWrap.find(".cotn");

		if(!accWrap.hasClass("open")){
			accWrap.addClass("open");
			boardCotn.slideDown();
		}else{
			accWrap.removeClass("open");
			boardCotn.slideUp();
		}
	});
}

function bnrSwiper(){ //관리자배너스와이프
	var adminBnrSwiper = new Swiper(".admin_bnr_area .swiper", {
		slidesPerView: 2,
		spaceBetween: 32,
		speed: 800,
		navigation: {
				nextEl: ".admin_bnr_area .swp_btn.swiper-button-next",
				prevEl: ".admin_bnr_area .swp_btn.swiper-button-prev",
			},
	});
}

function productSwiper(){ //상품목록스와이프
	$(".list_menu").each(function() {
		var prdSliderBasic = new Swiper(".list_menu .swiper", { //일반상품목록 슬라이드
			slidesPerView: 4,
			spaceBetween: 32,
			speed: 700,
			navigation: {
				nextEl: ".product_wrap .swp_btn.swiper-button-next",
				prevEl: ".product_wrap .swp_btn.swiper-button-prev",
			},
			preventClicks: true,
			preventClicksPropagation: true,
	});

	var bgPrdSlide = new Swiper(".list_menu.bg_container .swiper", { //BG영역 상품목록 슬라이드
			slidesPerView: "auto",
			spaceBetween: 16,
			speed: 700,
			navigation: {
				nextEl: ".list_menu.bg_container .swp_btn.swiper-button-next",
				prevEl: ".list_menu.bg_container .swp_btn.swiper-button-prev",
			},
		});
	});
}

function bigPrdSwiper(){ //큰썸네일상품스와이프
	var bigPrdSlide = new Swiper(".big_prd_list.prd_swipe .swiper", {
		slidesPerView: "auto",
		spaceBetween: 32,
		speed: 1500,
		loop: true,
		centeredSlides: true,
		autoplay: {
			delay: 1200,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".big_prd_list .wd_auto .swp_btn.swiper-button-next",
			prevEl: ".big_prd_list .wd_auto .swp_btn.swiper-button-prev",
		},
	});
}

function bigViewPrd(){
	var prdBigView = new Swiper(".prd_large_view .swiper", { //선택상품크게보기:선택용상품스와이프
		speed: 500,
		slidesPerView: 3,
		spaceBetween: 20,
		navigation: {
			nextEl: ".prd_large_view .swiper-button-next",
			prevEl: ".prd_large_view .swiper-button-prev",
		},
	});
}

function coupnSlider(){ //쿠폰스와이프
	var coupnSlider = new Swiper(".coupn_wrap.swiper", {
		centeredSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 16,
		speed: 700,
		loop: true,
		navigation: {
			prevEl: ".coupn_wrap .swp_btn.swiper-button-prev",
			nextEl: ".coupn_wrap .swp_btn.swiper-button-next",
		},
		pagination: {
			el: '.coupn_paging',
			type: 'bullets',
		},
	});
}

function scrahEvt(){ //복권긁기이벤트
	var scrahSlider = new Swiper(".scrah_slide_wrap.swiper", { //복권 슬라이드
		centeredSlides: true,
		slideToClickedSlide: true,
		slidesPerView: 'auto',
		speed: 700,
		navigation: {
			prevEl: ".scrah_slide_wrap .swp_btn.swiper-button-prev",
			nextEl: ".scrah_slide_wrap .swp_btn.swiper-button-next",
		},
	});
	$('.btn_scrah .btn[bt_role="confirm"]').on('click', function(){ //선택완료버튼클릭
		$(".scrah_slide_wrap.swiper").addClass("active");
		scrahSlider.disable();
	});

	$('.btn_scrah .btn[bt_role="cancel"]').on('click', function(){ //다시선택버튼클릭
		$('.scrah_item[class*=active] .scrahpad').wScratchPad("reset");
		$(".scrah_slide_wrap.swiper").removeClass("active");
		scrahSlider.enable();
	});
}

function order_scroll(){ //결제정보 스크롤시 고정UI
	order_fixed();
	$(window).scroll(function(){
		order_fixed();
	});
};
function order_fixed(){
	var ord_info = $(".ord_info_wrap"),
		ord_offs = $(".ord_rit_area").offset().top,
		win_top = $(window).scrollTop();
		ord_total_h = $(".ord_contai_wrap").offset().top + $(".ord_contai_wrap").height() - ord_info.height() - 40,
		header_h = $("#header").innerHeight();

	// 상단고정
	if(win_top >= (ord_offs-header_h)){
		ord_info.addClass("ord_fixed");
	}else{
		ord_info.removeClass("ord_fixed");

	}
	// 하단 고정
	if(win_top >=  ord_total_h - 217){
		ord_info.removeClass("ord_fixed");
		ord_info.addClass("ord_absolt");
	}else{
		ord_info.removeClass("ord_absolt");
	}
	// Left 위치
	$(window).on("scroll resize",function(){
		var win_s = $(window).width(),
			scroll_x = $(window).scrollLeft();
		if(win_s <= 1192){
			if(ord_info.hasClass("ord_fixed")){
				ord_info.css({left:1192 - 274 - scroll_x });
			}else{
				ord_info.css({left:''});
			}
		}else{
			ord_info.css({left:''});
		}
	});
};

function accSimpleUI(){ //버튼 드롭다운 UI
	$(".ui_ctrl").on("click", function() {
		var $this = $(this),
			accFixed = $this.closest(".ui_drop_layout"),
			accContent = accFixed.next(".ui_drop_cotn");
		if(!accFixed.hasClass("active")){
			accContent.slideDown();
			accFixed.addClass("active");
		}else{
			accContent.slideUp();
			accFixed.removeClass("active");
		}
	});
}

function selectUI(){ //버튼,셀렉트박스 드롭다운 UI
	$(".ui_selt_cotn").hide();
	$(".ui_selt_ctrl").on("click", function() {
		var $this = $(this),
			accFixed = $this.closest(".ui_selt_layout"),
			accContent = accFixed.next(".ui_selt_cotn"),
			selt_wrap = accFixed.closest(".ui_select");
		if(!selt_wrap.hasClass("active")){
			$(".ui_selt_cotn").slideUp();
			$(".ui_selt_layout,.ui_select").removeClass("active");
			accContent.slideDown(300);
			accFixed.addClass("active");
			selt_wrap.addClass("active");
		}else{
			accContent.slideUp(200);
			accFixed.removeClass("active");
			selt_wrap.removeClass("active");
		}
	});
	$(document).mouseup(function (e){ /* 닫기 */
		var select = $(".ui_select");
		if(select.has(e.target).length === 0 && select.hasClass("active")){
			$(".ui_select.active .ui_selt_cotn").slideUp(300);
			select.removeClass("active");
			$(".ui_selt_layout").removeClass("active");
		}
	});
}

function toolTip(){ //툴팁버튼
	$(".btn_tooltip").on("click", function(e){
		e.preventDefault();

		var $this = $(this),
			tip = $this.closest(".tooltip_wrap");
			wrap = $this.closest(".btn_tool_wrap");
			tipBox = $this.siblings(".tooltip_box");

		if(tip.hasClass("on")){ /* 열기 */
			tip.removeClass("on");
		}else{
			$(".tooltip_wrap").removeClass("on");
			tip.addClass("on");
		}

		if(tip.hasClass("tip_mid")){ /* 툴팁:가운데 */
			var boxW = tipBox.width();
			tipBox.css('width', boxW);
			wrap.css('position','relative');
		}
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var tip = $(".tooltip_wrap");
		if(tip.has(e.target).length === 0 && tip.hasClass("on")){
			tip.removeClass("on");
		}
	});
}

function sharePop(){ //공유하기 툴팁 show/hide
	var pop_share = $(".share_tooltip");
	$(".btn_share").on("click", function(e){
		e.preventDefault();
		pop_share.show();
	});
	$(".btn_close").on("click", function(e){
		e.preventDefault();
		pop_share.hide();
	});
}

function paymentUI(){ // 주문결제 UI
	$(".ui_rdo_wrap").each(function(){  // 라디오 버튼탭
		$(".rdo_tab .form_rdo label").on("click", function() {
			var $this = $(this).attr("data-rdo-cotn");
			$(this).closest(".ui_rdo_wrap").find(".ord_rdo_cotn").hide();
			$("."+$this).show();
		});
	});

	var selectCard = new Swiper(".select_card .swiper", { // 간편결제 카드선택 swiper slider
		slidesPerView:'auto',
		spaceBetween: 134,
		centeredSlides: true,
		speed: 600,
		//loop: true,
		slideToClickedSlide: true,
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			slideShadows: false,
			scale:0.89,
		},
		navigation: {
			nextEl: ".slide_nav .swiper-button-next",
			prevEl: ".slide_nav .swiper-button-prev",
		},
	});
	$(".tab_cotn_wrap").each(function() { // 선물하기: 탭메뉴
		var tab = $(this).children(".tab_menu").find(".btn_tab a"),
			tabCotn = $(this).children(".tab_cotn_area").children(".cotn_div");

		tab.on("click", function() {
			var $this = $(this),
				tabDiv = $this.closest(".btn_tab"),
				idx = tabDiv.index();

			tabDiv.siblings(".btn_tab").removeClass("on");
			tabDiv.addClass("on");
			tabCotn.siblings(".cotn_div").hide();
			tabCotn.eq(idx).show();
		});
	});
}

function brandListSwiper(){ //브랜드카테고리:브랜드목록
	var brandList = new Swiper(".brand_list .swiper", {
		slidesPerView: "auto",
		spaceBetween: 24,
		slidesPerGroup: 9,
		navigation: {
			nextEl: ".brand_list .swiper-button-next",
			prevEl: ".brand_list .swiper-button-prev",
		},
	});
}

function dimShow(){ /* 딤드 show */
	$("body").addClass("dim");
}
function dimHide(){ /* 딤드 hide */
	$("body").removeClass("dim");
}

function alertPopup(){ //알럿
	var $openBtn = $(".btn_alert"),
		$closeBtn = $(".alert_pop .closed");

	$openBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		var target = $(this).attr("open-layer-class") || e;
		$(".alert_pop" + "." + target).fadeIn(150).addClass("on");
		dimShow();
	});

	$closeBtn.on("click", function() { /* 닫기 */
		var target= $(this).closest(".alert_pop");
		var popOn = $(".alert_pop.on").length;

		target.fadeOut(150).removeClass("on");
		if(popOn <= 1){ // 팝업 2개 이상 활성화될 경우 dim 닫지 않기
			dimHide();
		}
	});
};

function fullPopup(){ //팝업
	var $openBtn = $(".full_open"),
		$closeBtn = $(".full_pop .closed");

	$openBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		var target = $(e.target).attr("open-full-pop") || e;
		$(".full_pop" + '.' + target + "").addClass("on");
		$("body").addClass("dim");
	});

	$closeBtn.on("click", function() { /* 닫기 */
		var target= $(this).closest(".full_pop");
		target.removeClass("on");
		$("body").removeClass("dim");
	});
}

function toastPop(){ //토스트팝업
	var $toastBtn = $(".btn_toast"),
		$toast = $(".toast_pop");

	$toastBtn.on("click", function(e){
		e.preventDefault();
		var target = $(e.target).attr("open-toast-pop") || e;
		$(".toast_pop" + "." + target + "").addClass("active");

		setTimeout(function(){
			$toast.removeClass("active")
		}, 3000);
	});
}

function photoSwiper(){ //리뷰이미지크게보기
	var photoView = new Swiper(".pt_slide_wrap .swiper", {
		loop: true,
		slidesPerView:'1',
		spaceBetween:0,
		pagination:{ //페이지넘버
			el: '.pt_slide_wrap .swiper-pagination',
			type: 'fraction',
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + ' current' + '"></span>' + ' <span>/</span> ' + '<span class="' + totalClass + ' total' + '"></span>';
			}
		},
		navigation : { //좌우버튼
			nextEl : '.pt_slide_wrap .swiper-button-next',
			prevEl : '.pt_slide_wrap .swiper-button-prev',
		},
	});
}

function mainPopBnr(){ // 메인 일반/임직원팝업 슬라이드
	var mainPopBnr = new Swiper(".main_pop_wrap .swiper", {
		speed:1000,
		slidesPerView: "1",
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".main_pop_wrap .num_paging",
			type: "fraction",
		},
	});
}

function prdViewUi(){ // 상품상세 UI
	var thum_slide = new Swiper(".thum_slide", { // 썸네일 슬라이드
		spaceBetween: 16,
		slidesPerView: 5,
		// freeMode: true,
		watchSlidesProgress: true,
	});
	var prd_slide = new Swiper(".prd_slide", { // 상품메인 슬라이드
		spaceBetween: 10,
		effect: "fade",
		thumbs: {
			swiper: thum_slide,
		},
	});
	var evt_bann_slide = new Swiper(".evt_bann_slide", { // 이벤트 배너 슬라이드
		spaceBetween:16,
		slidesPerView:1,
		pagination: {
			el: ".dot_paging",
			clickable: true,
		},
	});
	var bund_slide = new Swiper(".bund_slide", { // 묶음상품 슬라이드
		slidesPerView:"auto",
		spaceBetween:16,
		slideToClickedSlide: true,
		navigation: {
			nextEl: ".bund_slide .swiper-button-next",
			prevEl: ".bund_slide .swiper-button-prev",
		},
	});

	var rvPhotoCollection = new Swiper(".rv_photo.thum_coll .swiper", { //포토리뷰모아보기 슬라이드
		slidesPerView: 8,
		slidesPerGroup: 8,
		spaceBetween: 10,
		speed: 800,
		navigation: {
			nextEl: ".thum_coll .swiper-button-next",
			prevEl: ".thum_coll .swiper-button-prev",
		},
	});

	$(".bund_slide .swiper-slide").click(function(){
		$(".bund_slide .swiper-slide").removeClass("active")
		$(this).addClass("active");
	});

	$(".view_cotn_sec .line_tab_wrap .div_set a").on("click", function() { // 탭메뉴 컨텐츠 show/hide
		var $this = $(this).attr("data-tab-cotn"),
			tab_offs = $(".vw_rit_area").offset().top;
		$(this).closest(".view_cotn_sec").find(".prd_tab_cotn").fadeOut(100);
		$('#' + $this).fadeIn(500);

		if($(this).closest(".line_tab_wrap").hasClass("tab_pop")){ //탭영역 스크롤이동
			$(".full_pop > .cotn").animate({ // 팝업일때
				scrollTop:0
			}, 100);
		}else{
			$("html,body").animate({ // 페이지일때
				scrollTop: tab_offs
			}, 100);
		}
	});

	$(".dtl_img_wrap .btn").on("click",function(){ // 상품상세 더보기
		var vw_sec = $(".dtl_img_wrap");
		if(!vw_sec.hasClass("active")){
			vw_sec.addClass("active");
			vw_opt_scroll();
			$(this).children("span").text("상세정보 접기");
		}else{
			vw_sec.removeClass("active");
				var detl_sr = $(".dtl_img_wrap").offset().top + 1300/2 // 스크롱 이동
				$("html,body").scrollTop(detl_sr);
				$(this).children("span").text("상세정보 더보기");
		}
	});

	// 상품정보 제공 고시 아코디언
	$(".prd_ctrl").on("click", function() {
		var $this = $(this),
			accFixed = $this.closest(".prd_drop_layout"),
			accContent = accFixed.next(".prd_drop_cotn");
		if(!accFixed.hasClass("active")){
			accContent.slideDown();
			accFixed.addClass("active");
			if(accContent.is(":visible")){
				setTimeout(function(){
					vw_opt_scroll();
				},400);
			}
		}else{
			accContent.slideUp();
			accFixed.removeClass("active");
			if(accContent.is(":visible")){
				setTimeout(function(){
					vw_opt_scroll();
				},400)
			}
		}
	});
	vw_opt_scroll(); //옵션정보 스크롤시 고정UI
	function vw_opt_scroll(){
		opt_fixed();
		$(window).on("scroll resize",function(){
			opt_fixed();
		});
	};
	function opt_fixed(){
		var opt_info = $("#container .dtl_rit_wrap"),
			opt_offs = $("#container .vw_rit_area").offset().top,
			win_top = $(window).scrollTop(),
			offsIerval = $("#container .vw_contai_sec").next('div').offset().top - win_top,
			top_txt = $("#container .bund_prd_sec .tit");

		// 상단고정
		if(win_top >= opt_offs){
			opt_info.addClass("prd_fixed");
			top_txt.hide();
		}else{
			opt_info.removeClass("prd_fixed");
			top_txt.show();
		}

		// 하단 고정
		if(offsIerval < 1260){
			opt_info.removeClass("prd_fixed");
			opt_info.addClass("prd_absolt");
		}else{
			opt_info.removeClass("prd_absolt");
		}

		// Left 위치
		$(window).on("scroll resize",function(){
			var win_s = $(window).width(),
				scroll_x = $(window).scrollLeft();
			if(win_s <= 1192){
				if(opt_info.hasClass("prd_fixed")){
					opt_info.css({left:1192 - 306 - scroll_x });
				}else{
					opt_info.css({left:''});
				}
			}else{
				opt_info.css({left:''});
			}
		});
	};

	// 묶음상품 상세보기(상단 텍스트)
	$(".full_pop > .cotn").scroll(function(){
		var top_txt_p = $(".bund_prd_sec .tit");
		if($(".full_pop > .cotn").scrollTop() >= 1){
			top_txt_p.hide();
		}else{
			top_txt_p.show();
		}
	});
};

function mainUI(){ //메인UI
	var bigSwiperBnr = new Swiper(".big_bnr_wrap .swiper", { //1192배너스와이프
		speed: 700,
		slidesPerView: "auto",
		spaceBetween: 32,
		centeredSlides: true,
		loop: true,
		autoplay: {
			delay: 1800,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".big_bnr_wrap .swiper-button-next",
			prevEl: ".big_bnr_wrap .swiper-button-prev",
		},
		pagination: {
			el: ".big_bnr_wrap .dot_paging",
		},
	});

	var tubSwiperBnr = new Swiper(".tub_bnr_wrap .swiper", { //100%배너스와이프
		speed: 500,
		effect: "fade",
		slidesPerView: 1,
		loop: true,
		pagination: {
			el: ".tub_bnr_wrap .dot_paging",
		},
	});

	var mainAI = new Swiper(".ai_cotn .swiper", { //AI추천상품
		speed: 500,
		slidesPerView: 3,
		spaceBetween: 20,
		navigation: {
			nextEl: ".ai_cotn .swiper-button-next",
			prevEl: ".ai_cotn .swiper-button-prev",
		},
	});

	var mainSugProd = new Swiper(".keyword_cotn .swiper", { //인기키워드추천상품
		speed: 500,
		slidesPerView: 3,
		spaceBetween: 20,
		navigation: {
			nextEl: ".keyword_cotn .swiper-button-next",
			prevEl: ".keyword_cotn .swiper-button-prev",
		},
	});

	var recomndProd = new Swiper(".recomnd_prod .group_set .swiper", { //100%배너스와이프
		speed: 500,
		slidesPerView: 1,
		loop: true,
		pagination: {
			el: ".recomnd_prod .group_set .paging_swipe .swiper-pagination",
			type: "fraction",
		},
		navigation: {
			nextEl: ".recomnd_prod .group_set .paging_swipe .swiper-button-next",
			prevEl: ".recomnd_prod .group_set .paging_swipe .swiper-button-prev",
		},
	});

	var expThumImg = new Swiper(".exp_thum .swiper", { //체험단신청:썸네일
		spaceBetween: 12,
		slidesPerView: "auto",
		watchSlidesProgress: true,
	});
	var expCotnInfo = new Swiper(".exp_bnr_area .info .swiper", { //체험단신청:배너영역
		slidesPerView: 1,
		effect: "fade",
		navigation: {
			nextEl: ".exp_bnr_area .info .swiper-button-next",
			prevEl: ".exp_bnr_area .info .swiper-button-prev",
		},
		thumbs: {
			swiper: expThumImg,
		},
	});

	var newPrdInfo = new Swiper(".new_intro_wrap .prd_h_wrap .swiper", { //신제품:상품정보
		spaceBetween: 6,
		centeredSlides: true,
		slidesPerView: 'auto',
		slideToClickedSlide: true,
		loop: true,
		loopedSlides: 4,
	});
	var newBnrImg = new Swiper(".new_intro_wrap .bnr_wrap .swiper", { //신제품:배너이미지
		slidesPerView: 1,
		effect: "fade",
		speed: 500,
		loop: true,
		loopedSlides: 4,
		navigation: {
			nextEl: ".new_intro_wrap .bnr_wrap .swiper-button-next",
			prevEl: ".new_intro_wrap .bnr_wrap .swiper-button-prev",
		},
	});
	newBnrImg.controller.control = newPrdInfo;
	newPrdInfo.controller.control = newBnrImg;
}

function photoReview(){
	var revSwiper = new Swiper(".rv_detail_wrap .swiper", { //포토리뷰 상세 Swiper
		spaceBetween: 16,
		speed: 800,
		navigation: {
			nextEl: ".rv_detail_wrap .swiper-button-next",
			prevEl: ".rv_detail_wrap .swiper-button-prev",
		},
	});
}