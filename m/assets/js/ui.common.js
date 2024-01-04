/* 《 종근당건강몰 모바일 공통 스크립트 》 */

$(document).ready(function() {
	goTop(); //페이지상단이동
	$(".form_chk.box, .form_chk.box_slim").length && boxCheck(); //박스형 체크박스
	$(".tab_menu.btn, .category_wrap").length && tabMovUI(); //탭 슬라이드 UI
	$(".sel_date.swiper").length && slideDate(); //년월선택슬라이드
	$(".product_wrap.swiper").length && slideProd(); //상품슬라이드
	$(".rv_photo.swiper").length && slideReview(); //리뷰이미지슬라이드
	$(".bnr_svc_wrap.swiper").length && slideSvc(); //서비스베너
	$(".coupon_wrap.swiper").length && coupnExhib(); //기획전쿠폰슬라이드
	$(".accodn_wrap").length && accdnUI(); //아코디언 컨텐츠 UI
	$(".acc_layout, .acc_open_cotn").length && accSimpleUI(); //간단아코디언 UI
	$(".btn_slide_wrap").length && buttonSwiper(); //스와이프버튼
	$(".btn_alert").length && alertPopup(); //알럿팝업
	$(".btm_open,.prd_option").length && btmPopup(); //바닥팝업 //상품상세 옵션팝업
	$(".full_open").length && fullPopup(); //전체팝업
	$(".full_popup").length && fullPopHeight(); //전체팝업 컨텐츠 영역 잡기
	$(".toast_pop").length && toastPop(); //토스트팝업
	$(".photo_view").length && photoSwiper(); //사진크게보기 슬라이드
	$(".scrah_slide_wrap").length && scrahEvt(); //복권긁기 이벤트
	$(".tooltip_wrap").length && toolTip(); //툴팁
	$(".foo_noti_bnr").length && fooNoti(); //푸터공지사항
	$(".join_policy").length && join(); //회원가입 약관동의
	$(".srch_ctgry").length && searchUI(); //검색&카테고리 UI
	$(".mem_evnt.swiper").length && slideMem(); //알림함 혜택 슬라이드
	$(".slide_main_pop").length && popSlide(); //메인 팝업 슬라이드
	$(".ord_search").length && search_pop();//마이페이지 기간조회 팝업
	$(".pho_rev_vw_pop").length && phoRevw_pop();//포토리뷰 내용보기 팝업

	// j-FIX 
	tabAction(); // 탭 선택 액션
	removeImg(); // 이미지 아이템 삭제

});

function back(event){
	event.preventDefault();
	history.back()
}
function routeActiveType(event){
	event.preventDefault();
	let params = new URLSearchParams(location.search)
	let type = params.get('type')
	if(type==='order'){
		location.href='/publish/m/mypage/order/M_Myp_303_02.html'
	}else if(type==='cancel'){
		location.href='/publish/m/mypage/order/M_Myp_303_03.html'
	}

}

// 선택지가 2개인 경우 
const alertData = {
	withdraw:{
		title: '주문취소신청',
		sub_txt : '상품 주문취소를 진행하시겠습니까?',
		url : './M_Myp_303.html?type=order'
	},
	withdrawConfirm:{
		title: '주문취소 확인',
		sub_txt : '주문취소신청을 완료하시겠습니까?',
		url:'./M_Myp_304.html'
	},
	cancel:{
		title: '취소신청',
		sub_txt : '주문하신 상품을 모두 취소하시겠어요?',
		url : './M_Myp_303.html?type=cancel'
	},
	cancelConfirm:{
		title: '취소신청 확인',
		sub_txt : '신청하신 상품 중 배송준비중인 상품이 있습니다. <br /> 상품이 이미 발송 된 경우 취소신청이 철회될 수 있습니다. <br /> 신청하시겠습니까?',
		url : './M_Myp_304_02.html'
	},
	cancelReturn:{
		title: '취소신청 철회',
		sub_txt : '취소신청을 철회하시겠습니까?'
	},
	change:{
		title: '교환신청',
		sub_txt : '상품 교환신청을 진행하시겠습니까?',
		url : './M_Myp_301.html'
	},
	changeConfirm:{
		title: '교환신청 확인',
		sub_txt : '교환신청을 완료하시겠습니까?',
		url:'./M_Myp_404.html'
	},
	return:{
		title: '반품신청',
		sub_txt : '상품 반품신청을 진행하시겠습니까?',
		url : './M_Myp_301.html'
	},
	returnConfirm:{
		title: '반품신청 확인',
		sub_txt : '반품신청을 완료하시겠습니까?',
		url:'./M_Myp_505.html'
	},
	reception:{
		title: '수취확인',
		sub_txt : '배송상품을 수령하셨습니까?'
	},
	//  ??
	confirm:{
		title: '구매확정',
		sub_txt : '구매확정 하시면 적립금이 지급됩니다.<br/> 구매확정 하시겠습니까?'
	},
	changeReturn:{
		title: '교환신청 철회',
		sub_txt : '교환신청을 철회하시겠습니까?'
	},
	returnReturn:{
		title: '반품신청 철회',
		sub_txt : '반품신청을 철회하시겠습니까?'
	},
	changeArr:{
		title: '배송지 변경',
		sub_txt : '배송지를 변경하시겠습니까?'
	},
	review:{
		title: '상품후기 작성',
		sub_txt : '상품후기를 작성하시겠습니까?',
		info_msg : '※ 리뷰작성 시 자동 수취확인 처리 됩니다.',
		url:'../review/M_Myp_1204.html'
	},
	received:{
		title: '미수령 신고',
		sub_txt : '미수령신고 처리를 진행하시겠습니까?',
		url:'./M_Myp_602.html'
	},
	apply:{
		title: '주문취소 신청 철회',
		sub_txt : '주문취소 신청을 철회하시겠습니까?'
	},
}


// j-FIX 
function openModal(e,target,alertValue){
	e.preventDefault();
	$('body').css({'overflow':'hidden'})
	$(`.${target}`).addClass('on')
	if(target === 'alert_03'){
		$('body').addClass('dim')
		$('.alert_03 .tit_16').text(alertData[`${alertValue}`].title);
		$('.alert_03 .sub_txt').html(alertData[`${alertValue}`].sub_txt);
		if(alertData[`${alertValue}`]?.url!==undefined){
			$('.alert_03 .alert_btn_wrap a').attr("href", alertData[`${alertValue}`].url)
		}
	}
}
function closeModal(e,target){
	e.preventDefault();
	$('body').css({'overflow':'unset'})
	$(`.${target}`).removeClass('on')
	if(target === 'alert_03'){
		$('body').removeClass('dim')
	}
}
function deepOpenModal(e,target){
	e.preventDefault();
	$(`.${target}`).addClass('on')
	if(target==='btm_cs'){
		$('body').addClass('dim')
	}
}
function deepCloseModal(e,target){
	e.preventDefault();
	$(`.${target}`).removeClass('on')
	if(target==='btm_cs'){
		$('body').removeClass('dim')
	}
}
function popRecodeSuccess(event){
	e.preventDefault();
	deepOpenModal(event,'pop_reord_cmplt')
	closeModal(event,'pop_reord')
}
function btnActive(target){
	target.siblings().removeClass('on')
	target.addClass('on')
}
function tabAction(){
	$('.btn_tab').on('click',function(e){
		e.preventDefault();
		btnActive($(this))
	})
}
function removeImg(){
	$(".add_img_wrap .add_li_area .add_li .btn_del").on("click", function (e) {
	e.preventDefault()
		$(`.add_img_wrap .add_li_area .add_li:nth-child(${$(this).parent().index() + 1})`).remove();
	});
}





function boxCheck(){ //박스형 체크박스
	$(".form_chk.box, .form_chk.box_slim").each(function() {
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

function passwordBtn(){ //input text UI
	$(".btn_pw").on('click', function() { /* password 텍스트보기/숨기기 */
		var $this = $(this),
			pwField = $this.prev("input");

		if(!$this.hasClass("hide")){
			pwField.attr("type", "text");
			$this.removeClass("show").addClass("hide");
		}else{
			pwField.attr("type", "password");
			$this.removeClass("hide").addClass("show");
		}
	});

	$(".btn_pw").focusout(function() {
		$(".btn_pw").hide();
	});
}

function tabMovUI(){ //탭슬라이드UI
	$(".tab_menu.btn, .category_wrap").each(function() {
		var $tab = $(this).find(".btn_tab");
		var tabSwiper = new Swiper(".tab_menu.btn .swiper, .category_wrap .swiper", {
			slidesPerView: 'auto',
			preventClicks: true,
			preventClicksPropagation: false,
		});

		$tab.on('click', 'a', function(e){
			e.preventDefault();
			var target = $(this).closest(".btn_tab");

			target.siblings("div").removeClass("on");
			target.addClass("on");
			tabCenter(target);
		});
	});
}

function tabCenter(target){ //탭슬라이드가운데 이동 UI
	var box = $('.tab_menu.btn .swiper, .category_wrap .swiper'),
		tabWrap = target.closest('.tab_menu.btn .swiper .swiper-wrapper, .category_wrap .swiper .swiper-wrapper'),
		tabItem = tabWrap.find(".btn_tab"),
		boxWidth = $(".tab_menu.btn .swiper, .category_wrap .swiper").width(),
		targetPos = target.position(),
		boxHarf = box.width()/2;
	var pos;
	var listWidth=0;

	tabItem.each(function(){
		listWidth += $(this).outerWidth()+12;
	});

	var selectTargetPos = targetPos.left + target.outerWidth()/2;

	if (selectTargetPos <= boxHarf) { //left 정렬, 첫번째 left:0
		pos = 0;
	}else if ((listWidth - selectTargetPos) <= boxHarf) { //right : target 절반 이후 영역이 boxHarf 보다 작을경우 right 정렬
		pos = listWidth-box.width();
	}else { //중앙정렬
		pos = selectTargetPos - boxHarf;
	}

	if(listWidth > boxWidth){
		setTimeout(function(){tabWrap.css({
			"transform": "translate3d("+ (pos*-1) +"px, 0, 0)",
			"transition-duration": "450ms"
		})}, 100);
	}
}

function tabCotnUI(){ //탭컨텐츠 show/hide UI
	$(".tab_cotn_wrap").each(function() {
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

			if(!$this.parents(".rel_prd_wrap").length){ //상품상세:묶음상품영역 체크
				//console.log('없음');
				$("html, body").animate({ //탭영역 스크롤이동
					scrollTop: $(this.hash).offset().top - 100
				}, 600);
			}

			/* 상품상세:묶음상품 레이어 - 탭컨텐츠 */
			if($this.parents(".rel_prd_wrap").length){ //상품상세:묶음상품영역 체크
				//console.log('레이어영역');
				var lyr = $(".layer_wrap .tab_cotn_wrap"),
					lyrTabCotn = lyr.find(".cotn_div");

				/* 탭컨텐츠:위치조정용 class 추가/삭제 */
				lyrTabCotn.addClass("hide");

				if($(this.hash).css("display", "block")){ //선택된것만 노출
					//console.log($(this.hash));
					$(this.hash).removeClass("hide").addClass("show");
				}
			}
		});
	});
}

function slideProd(){ //상품슬라이드
	var prdSlider = new Swiper(".product_wrap.swiper", {
		slidesPerView: "auto",
		freeMode: true,
		preventClicks: true,
		preventClicksPropagation: false,
	});
}

function slideReview(){ //리뷰이미지슬라이드
	var rvSlider = new Swiper(".rv_photo.swiper", {
		slidesPerView: "auto",
		freeMode: true,
	});
}

function slideSvc(){ //서비스베너
	var svcSlider = new Swiper(".bnr_svc_wrap.swiper", {
		spaceBetween: 8,
		slidesPerView: "auto",
	});
}

function coupnExhib(){ //기획전쿠폰슬라이드
	var coupnSlider = new Swiper(".coupon_wrap.swiper", {
		spaceBetween: 20,
		slidesPerView: "auto",
		pagination: {
			el: ".dot_paging",
		},
	});
}

function slideDate(){ //년월선택슬라이드
	var selectDate = new Swiper(".date_year.swiper", { //년도선택
		initialSlide: 5,
		slidesPerView: 5,
		direction: "vertical",
		centeredSlides: true,
		slideToClickedSlide: true,
	});

	var selectDate = new Swiper(".date_month.swiper", { //월선택
		initialSlide: 0,
		slidesPerView: 5,
		direction: "vertical",
		centeredSlides: true,
		slideToClickedSlide: true,
	});
}

function slideMem(){ //알림함 혜택 슬라이드
	var slideBnr = new Swiper(".mem_evnt.swiper", {
		spaceBetween: 8,
		slidesPerView: "auto",
	});
}

function accdnUI(){ //아코디언 컨텐츠 UI
	$(".accodn_wrap .view_fix .ctrl_trg").on('click', function() {
		var $this = $(this),
			accWrap = $this.closest(".accodn_wrap"),
			openContent = accWrap.find(".open_cotn");

		if(!accWrap.hasClass("open")){
			accWrap.addClass("open");
			openContent.slideDown();
		}else{
			accWrap.removeClass("open");
			openContent.slideUp();
		}
	});

	$(".accodn_wrap").each(function() { //열린상태
		if($(this).hasClass("open")){
			$(this).find(".open_cotn").css('display', 'block');
		}
	});
}

function accSimpleUI(){ //간단아코디언 UI
	$(".acc_layout").on("click", ".ctrl_trg", function() {
		var $this = $(this),
			accFixed = $this.closest(".acc_layout"),
			accContent = accFixed.next(".acc_open_cotn");

		if(accFixed.hasClass("active")){
			accContent.slideUp();
			delActive();
		}else{
			accContent.slideDown();
			addActive();
		}

		function delActive(){
			setTimeout(function() {
				accFixed.removeClass("active");
			}, 500);
		}
		function addActive(){
			setTimeout(function() {
				accFixed.addClass("active");
			}, 500);
		}
	});
}

function buttonSwiper(){ //스와이프버튼
	var buttonSlider = new Swiper(".btn_slide_wrap .swiper", {
		slidesPerView: "auto",
	});
}

function alertPopup(){ //알럿팝업
	var $openBtn = $(".btn_alert"),
		$closeBtn = $(".alert_popup .alert_btn_wrap .btn");

	$openBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		var target = $(this).attr("open-layer-class") || e;
		$(".alert_popup" + "." + target).fadeIn(150);
		dimShow();
	});

	$closeBtn.on("click", function() { /* 닫기 */
		var target= $(this).closest(".alert_popup");
		target.fadeOut(150);
		setTimeout(dimHide, 200);
	});
}

function btmPopup(){ //바닥팝업
	var $openBtn = $(".btm_open"),
		$closeBtn = $(".btm_popup .closed");

	$openBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		var target = $(e.target).attr("open-layer-class") || e;
		$(".btm_popup" + "." + target + "").fadeIn(100).addClass("on");
		dimShow();
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $(".btm_popup");
		if(popArea.has(e.target).length === 0 && popArea.hasClass("on")){
			popArea.fadeOut(150).removeClass("on");
			dimHide();
		}
	});

	$closeBtn.on("click", function() { /* 닫기 */
		var target= $(this).closest(".btm_popup");
		target.fadeOut(150).removeClass("on");
		dimHide();
	});
}

function fullPopup(){ //전체팝업
	var $openBtn = $(".full_open"),
		$closeBtn = $(".full_popup .closed");

	$openBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		var target = $(e.target).attr("open-full-pop") || e;
		$(".full_popup" + '.' + target + "").addClass("on");
		$("body").addClass("up");
	});

	$closeBtn.on("click", function() { /* 닫기 */
		var target= $(this).closest(".full_popup");
		target.removeClass("on");
		$("body").removeClass("up");
	});
}

function fullPopHeight(){ //전체팝업 컨텐츠 영역 잡기
	var $fullPopup = $(".full_popup");
	$fullPopup.each(function() {
		var $this = $(this);

		if($this.find(".btn_fixed").length == 0){
			$this.addClass("no_foot_btn");
		}
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

function dimShow(){ /* 딤드 show */
	$("body").addClass("dim");
}
function dimHide(){ /* 딤드 hide */
	$("body").removeClass("dim");
}

function photoSwiper(){ //사진크게보기 슬라이드
	var photoView = new Swiper(".pt_slide_wrap .swiper-container", {
		loop: true,
		slidesPerView:'1',
		spaceBetween:0,
		pagination:{ //페이징
			el: '.pt_slide_wrap .swiper-pagination',
			type: 'fraction',
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + ' current' + '"></span>' + ' <span>/</span> ' + '<span class="' + totalClass + ' total' + '"></span>';
			}
		},
		navigation : { //네비게이션
			nextEl : '.swiper-button-next', // 다음 화살표
			prevEl : '.swiper-button-prev', // 이전 화살표
		},
	});
}

function scrahEvt(){ //복권긁기
	var scrahSlider = new Swiper(".scrah_slide_wrap.swiper", { //복권 슬라이드
		centeredSlides: true,
		spaceBetween: 8,
		slidesPerView: 'auto',
	});

	$('.btn_scrah.on .btn').on('click', function(){ //선택완료버튼클릭
		$(".scrah_slide_wrap.swiper").addClass("active");
		scrahSlider.disable();
	});

	$('.btn_scrah.off .btn').on('click', function(){ //다시선택버튼클릭
		$(".scrah_slide_wrap.swiper").removeClass("active");
		scrahSlider.enable();
		$('.scrah_item .scrahpad').wScratchPad("reset");
	});
}

function toolTip(){//툴팁
	$(".btn_tooltip").on("click", function(e){
		e.preventDefault();

		var $this = $(this),
			tip = $this.closest(".tooltip_wrap");
		if(tip.hasClass("on")){ /* 닫기 */
			tip.removeClass("on");
		}else{
			$(".tooltip_wrap").removeClass("on");
			tip.addClass("on");
		}
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var tipArea = $(".tooltip_wrap");
		if(tipArea.has(e.target).length === 0 && tipArea.hasClass("on")){
			tipArea.removeClass("on");
		}
	});
}

function goTop(){ //페이지상단이동
	$(".go_top").on('click', function() {
		$("html, body").animate({
			scrollTop: 0
		}, 500);
		return false;
	});
}

function fooNoti(){ // 푸터공지사항
	var noticeBnrSwiper = new Swiper(".foo_noti_bnr .swiper", {
		direction: "vertical",
		speed:500,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	});
}

function prodDetail(){ //상품상세UI
	var $window = $(window),
		$body = $("body"),
		$tab = $(".tab_menu.line .btn_tab");

	$window.on('scroll', function() { //스크롤 UI
		var st = $(document).scrollTop();

		//스크롤:헤더bg깔기
		if(st >= $(".dtl_wrap").offset().top){
			$body.addClass("top");
		}else{
			$body.removeClass("top");
		}
	});

	$(".ctrl_open").on('click', "a", function(e) { //상품정보(이미지) 더보기
		e.preventDefault();
		var dtlImg = $(this).closest(".dtl_img_wrap");

		if(!dtlImg.hasClass('open')){
			dtlImg.addClass('open');
			$(this).find("span").text("상품정보 접기");
		}else{
			dtlImg.removeClass('open');
			$(this).find("span").text("상품정보 더보기");

			if(!$(this).parents(".rel_prd_wrap").length){ //묶음상품영역 체크
				//console.log('없음');
				$("html, body").animate({
					scrollTop: $(this).offset().top - 220
				}, 800);
			}
		}
	});

	var thumSwiper = new Swiper(".dtl_prd .thum_img .swiper", { //상단:상품썸네일
		speed: 800,
		pagination: {
			el: ".num_paging",
			type: "fraction",
		},
	});

	var adminBnrSwiper = new Swiper(".admin_bnr_area .swiper", { //관리자등록배너
		spaceBetween: 8,
		pagination: {
			el: ".admin_bnr_area .dot_paging",
		},
	});

	var planImage = new Swiper('.plan_shop .bnr_img_wrap', { //관련기획전배너
		spaceBetween: 8,
		speed: 500,
	});

	tabCotnUI(); //탭컨텐츠 show/hide UI

	$(".basic_info .quaty").on("click", "a", function() { //리뷰선택:리뷰탭컨텐츠로 이동
		var $tabBtn = $(".sub > .tab_cotn_wrap > .tab_menu.line").find(".btn_tab"),
			reviewCotn = $(".sub > .tab_cotn_wrap .tab_cotn_area").find("#tab_02"),
			linkVal = $(this).attr('href');

		$tabBtn.each(function() {
			var $this = $(this).find("a"),
				val = $this.attr('href');
			//console.log(val, linkVal);
			if(val == linkVal){
				console.log($(this.hash));
				$(this).addClass("on");
				$(this).siblings(".btn_tab").removeClass("on");
			}
		});

		reviewCotn.show();
		reviewCotn.siblings(".cotn_div").hide();
		$("html, body").animate({
			scrollTop: $(".sub > .tab_cotn_wrap").offset().top - 60
		}, 600);
	});

	/* 묶음상품:레이어영역 */
	$(".rel_prd_wrap > .rel_cotn .img_area").on("click", ".go_view", function(e) { //레이어:열림
		e.preventDefault();
		$(".rel_prd_wrap").addClass("show");
		$("body").addClass("dim");

		setTimeout(function() {
			$(".rel_prd_wrap .btn_paging").show();
		}, 600);
	});

	$(".prd_img_set .img_area").each(function() { //레이어:묶음상품선택
		var imgDiv = $(this),
			idx = imgDiv.index();

		imgDiv.on('click', function() { //묶음상품선택:부모페이지와 활성화 연결
			var $this = $(this);

			$this.addClass("on").siblings("div").removeClass("on");
			$(".prd_img_set .img_area").eq(idx).addClass("on").siblings("div").removeClass("on");
			$(".layer_wrap .img_area").eq(idx).addClass("on").siblings("div").removeClass("on");
		});
	});

	$(".layer_wrap").on('scroll', function() { //레이어:탭컨텐츠 탭 영역
		var st = $(this).scrollTop();
		//console.log(st);
		if(st < 329){ //탭컨텐츠 위치조정 class삭제
			$(this).find(".cotn_div").removeClass("show");
		}
	});

	$(".rel_prd_wrap .tit .btn_closed").on("click", function(e) { //레이어:닫힘
		e.preventDefault();
		$(".rel_prd_wrap").removeClass("show");
		$("body").removeClass("dim");
		$(".rel_prd_wrap .btn_paging").hide();
	});
}

function paymentUI(){ //주문결제 UI
	$(".pymnt_way").on("click", ".select_way input", function() { //간편결제/일반결제 선택
		var $this = $(this).closest(".select_way"),
			pymntClass = $this.closest("section").find(".cotn_way");

		if(!pymntClass.hasClass("open")){
			$(".cotn_way").removeClass("open");
			pymntClass.addClass("open");
		}
	});

	var selectCard = new Swiper(".select_card .swiper", { // 간편결제 카드선택 swiper slider
		watchOverflow: true,
		slidesPerView: 'auto',
		spaceBetween: 10,
		centeredSlides: true,
		speed: 600,
		initialSlide: 0,
		loop: true,
	});

	tabCotnUI(); //탭컨텐츠 show/hide UI
}

function join(){ // 회원가입: 입력폼 활성화 모션
	// 약관동의 높이 재설정 js
	$(".join_policy .accodn_wrap .view_fix .ctrl_trg").on("click",function(){
		$(this).closest(".join_policy").removeClass("f_active").addClass("complt");
	});
}

//검색&카테고리 UI
function searchUI(){
	var poplrSwiper = new Swiper(".slide_keyword .swiper", { //인기검색어 vertical swiper
		direction: "vertical",
		speed: 800,
		loop: true,
		autoplay: {
			delay: 1300,
			disableOnInteraction: false,
		} /**/
	});

	$(".poplr_word").on("click", ".btn_open", function(e) { //인기검색어 열림/닫힘
		e.preventDefault();
		if(!$(".keyword_wrap").hasClass("open")){
			$(".keyword_wrap").addClass("open");
			$(".open_keyword").slideDown();
			poplrSwiper.autoplay.stop();
		}else{
			$(".keyword_wrap").removeClass("open");
			$(".open_keyword").slideUp();
			poplrSwiper.autoplay.start();
		}
	});

	// 추천검색어 레이어 show/hide
	var $body = $("body"),
		searchWrap = $(".srch_form"),
		termLayer = $(".sug_layer_wrap");

	searchWrap.find("input").focus(function() {
		if(!$body.hasClass("srch_open")){
			termLayer.slideDown();
			$body.addClass("srch_open");
		}
	});

	searchWrap.find(".cancel").on("click", function() {
		if($body.hasClass("srch_open")){
			termLayer.slideUp();
			$body.removeClass("srch_open");
		}
	});

	var sameWordSwiper = new Swiper(".same_terms .swiper", { //유사검색어
		slidesPerView: "auto",
		spaceBetween: 24,
		freeMode: true,
	});
}

// 메인 UI
function mainUI(){
	// 상단 상품슬라이드
	var mainSwiper = new Swiper(".slide_main .swiper", {
		speed: 500,
		slidesPerView:"auto",
		centeredSlides: true,
		loop:true,
		spaceBetween: 12,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".num_paging",
			type: "fraction",
		},
	});

	// 이벤트 배너
	var mainBnrSwiper = new Swiper(".main_evt_bnr .swiper", {
		spaceBetween: 8,
		pagination: {
			el: ".main_evt_bnr .dot_paging",
		},
	});

	// 체험단 배너
	var mainPlanImage = new Swiper('.main_plan_shop .bnr_img_wrap', {
		spaceBetween: 8,
		effect: "fade",
		speed: 500,
		loop: true,
		loopedSlides: 4
	});
	var mainPlanProuct = new Swiper('.main_plan_shop .prod_h_wrap', {
		spaceBetween: 6,
		centeredSlides: true,
		slidesPerView: 'auto',
		slideToClickedSlide: true,
		loop: true,
		loopedSlides: 4
	});
	mainPlanImage.controller.control = mainPlanProuct;
	mainPlanProuct.controller.control = mainPlanImage;
	// E

	// 신제품
	var mainNewSwiper = new Swiper(".main_recom_bnr .swiper", {
		spaceBetween:12,
		pagination: {
			el: ".main_recom_bnr .dot_paging",
		},
	});

	// 메인 상단 띠배너
	if($(".main_top_banner").length){
		var img_h = $(".main_top_banner img").height(),
			main_bar = $(".main_top_banner");
			main = $(".main");

			main.addClass("active");
			main_bar.stop().animate({"height":0,"height":img_h});
			// 스크롤 시
			$(window).scroll(function(){
				img_h = $(".main_top_banner img").height();
				if($(window).scrollTop() >= 1){
					main.removeClass("active");
					main_bar.stop().css({"height":0});
				}else{
					main.addClass("active");
					main_bar.stop().animate({"height":img_h});
				}
			});
			// 닫기
			$(".btn_ban_close").on("click",function(){
				main_bar.stop().animate({"height":0});
				main.removeClass("active");
				main_bar.hide()
			});
	};
	//E
}

// 팝업: 이미지 슬라이드
function popSlide(){
	var popSwiper = new Swiper(".slide_main_pop .swiper", {
		speed: 300,
		pagination: {
			el: ".num_paging",
			type: "fraction",
		},
	});
}

// j-FIX
// 마이페이지 기간조회 팝업
function search_pop() {
	$(".date_area > .ord_search input,.date_area > .ord_search .btn").on("focus click", function () {
		if (!$(".date_layer_pop").is(":visible")) {
			$("body").addClass("srch_open");
			$('.date_layer_pop .search_inp .form_txt input').focus();
		}
	});
	$(document).mouseup(function (e) { /* 닫기 */
		// var popArea = $(".btm_popup");
		if ($(".srch_open").has(e.target).length === 0 && $("body").hasClass("srch_open")) {
			if ($('.month_pop').hasClass('on')) {
				$('.month_pop').removeClass('on')
				$('.pop_calendar.alert_01').addClass('on')
			} else if ($('.pop_calendar').hasClass('on')) {
				$('.pop_calendar').removeClass('on')
				$("body").removeClass('on')
			} else {
				$("body").removeClass("srch_open");
			}
		}
	});
};

// 포토리뷰 내용보기 팝업
function phoRevw_pop(){
	 // 전체화면 스와이프
	 var revwFull = new Swiper(".rev_full_slide > .swiper-container", {
		loop: false,
		slidesPerView:'1',
		spaceBetween:0,
	});
    // 이미지 스와이프
    var revwSlide = $(".pt_slide_list .swiper");
    revwSlide.each(function(index) {
        var $this = $(this);
        $this.siblings(".swiper-button-next").addClass("type"+index);
        $this.siblings(".swiper-button-prev").addClass("type"+index);
        $this.siblings(".swiper-pagination").addClass("type"+index);
        var imgSwiper = new Swiper(this, {
            slidesPerView:1,
            spaceBetween:0,
            slideToClickedSlide: true,
            navigation: {
                nextEl: ".type"+index+".swiper-button-next",
                prevEl: ".type"+index+".swiper-button-prev",
            },
            pagination:{ //페이징
                el: '.type'+index+'.swiper-pagination',
                type: 'fraction',
                renderFraction: function (currentClass, totalClass) {
                    return '<span class="' + currentClass + ' current' + '"></span>' + ' <span>/</span> ' + '<span class="' + totalClass + ' total' + '"></span>';
                }
            },

        });
    });
}
