$(document).ready(function () {
	setDatePicker(); // 날짜 선택기
	$(".order_main").length && orderMainSet(); // 주문/배송조회 메인

	$('.bank_list ul').children().on('click',function(e){
		e.preventDefault();
		btnActive($(this))
		$('.btn_bank_pop p').text($(this).find('.name').text())
	})

})

function tabAction(){
	$('.btn_tab').on('click',function(e){
		e.preventDefault();
		btnActive($(this))
	})
}

/**
 * 이미지 삭제
 */
function removeImg(){
	$(".add_img_wrap .add_li_area .add_li .btn_del").on("click", function (e) {
	e.preventDefault()
		$(`.add_img_wrap .add_li_area .add_li:nth-child(${$(this).parent().index() + 1})`).remove();
	});
}


/**
 * 주문/배송 조회 UI 설정
 */
function orderMainSet() {
	let height = $("#header").height() + $(".date_area").height();

	$(window).on("scroll", function () {
		if (window.scrollY >= height) {
			$(".order_main.ord_deli_cont > .tab_wrap").css({position: "fixed",top: "15vw","z-index": "999",width: "100%"});
			$(".order_main.ord_deli_cont > .ord_prd_area").css({	"padding-top": "41.19vw",});
		} else {
			$(".tab_wrap").css({ position: "relative", top: "unset" });
			$(".ord_prd_area").css({ "padding-top": "6.667vw" });
		}
	});
	$(".ord_deli_cont .tab_1dep_wrap").children().on("click", btnActive($(this)));
	if ($(".ord_prd_area").children().length === 0) {
		$(".data_none").removeClass("hidden");
	}
}

/**
 * 
 * @param {*} length 제한 숫자 표시
 */
function checkTextLength(length) {
	$('.ltr_len p span').text($('textarea').val().length)
}

/**
 * 
 * @param {*} target 버튼 상태 활성
 */
function btnActive(target) {
	target.siblings().removeClass('on')
	target.addClass('on')
}

/**
 * 
 * @param {} e 알림설정 필수동의
 */
function agreementSetting(e,type) {
	e.preventDefault();
	if ($('.form_chk').find('input').is(":checked")) {
		if(type==='cancel'){
			console.log('cancel')
		}else{
			popRecodeSuccess(event, 'pop') 
		}
	} else {
		if(type==='cancel'){
			alert('환불계좌를 확인해주세요')
		}else{
			alert('마케팅 정보 수신동의는 필수입니다.(수정해서 사용)')
		}
		
	}
}

/**
 * 날짜 선택기
 */
function setDatePicker() {
	let today = new Date();
	let start_date = new Date();
	start_date.setMonth(today.getMonth() - 1);
	let end_date = today.toISOString().slice(0, 10);

	$("input.end_date").attr("value", end_date);
	$("input.start_date").attr("value", start_date.toISOString().slice(0, 10));

	$(".blue_btn_set").children().on("click", function () {
			btnActive($(this));
			let index = $(this).index();
			start_date = new Date();

			if (index === 3) {
				$(".form_inpt input.end_date,.form_inpt input.start_date").attr("disabled",false);
			} else {
				start_date.setMonth(today.getMonth() - (index + 1));
				$(".form_inpt input.end_date").attr("disabled", true);
				$("input.start_date").attr(	"value",	start_date.toISOString().slice(0, 10));
				$("input.end_date").attr("value", end_date);
			}
		});

	// 기본선택기 오픈
	$("input.start_date, input.end_date").on("click", function () {
		$(".pop_calendar.alert_01").addClass("on");
		$("body").addClass("on");
	});

	// 월 선택기 오픈
	$(".go_month").on("click", function () {
		$(".pop_calendar.alert_popup").removeClass("on");
		$(".month_pop").addClass("on");
	});

	// 월 선택
	$(".month_pop .alert_btn_wrap button").on("click", function () {
		let value = $(
			".sel_date_wrap .sel_date .date_ym.swiper-slide-active span"
		).text();
		$(".month_pop").removeClass("on");
		$(".pop_calendar.alert_01").addClass("on");
		$(".alert_popup.alert_01 .txt_mon_info p.tit_16").html(value);
	});

	// 선택 활정
	$(".tb_calendar td").on("click", function () {
		$(".tb_calendar td").children("button").removeClass("select_date");
		$(this).children("button").addClass("select_date");
	});

	// 일 선택 완료
	$(".alert_01 .alert_btn_wrap button").on("click", function () {
		alert("날짜 적용 로직 추가해야함");
		$(".pop_calendar.alert_01").removeClass("on");
		$("body").removeClass("on");
	});
}