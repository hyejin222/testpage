
$(function() {
    
    const mainVisual = new Swiper('.main_visual', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.main_visual .swiper-pagination',
            type: 'bullets',
        },
    });


    $('[class^=datepicker]').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true, 
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,			
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],			
        yearSuffix: '년',
        showMonthAfterYear: true,
        minDate: 0,
        ignoreReadonly: true,
        beforeShow: function() {
            $('.ui-datepicker').removeClass('active');
        }
    });

    $('[class^=datepicker]').click(function() {
        $('.ui-datepicker').addClass('active');
    });


    // 공통 - Modal Tab - click event
    $('ul.tabs li').off('click').on('click', function() {
        let thisLi = $(this);
        $('ul.tabs li').removeClass('orangeLine');
        thisLi.addClass('orangeLine');

        // 탭메뉴 3개 이상
        if(thisLi.parent().hasClass('several')) {
            $('.tab_content').hide();
            $(thisLi.find('a').attr('href')).show(10);
            $('.modal_wrap').animate({ scrollTop: 0 }, 10);
        } else {                    
            if (thisLi.index() == 0) {
                $('.viewDetail').hide();
                $('.viewSummary').show();
            } else {
                $('.viewSummary').hide();
                $('.viewDetail').show();
            }
        }
    });


/* 보험가입시 유의사항 ---------------------------------------------- */

    // 전체 동의
    $('.check_wrap .all_chk').change(function (){
        if($('.all_chk').is(':checked')) {
            $('.cautionList input[type=checkbox]').each(function() { this.checked = true; });
            nextMoveEvt(true, '.join_insurance');
        } else {
            $('.cautionList input[type=checkbox]').each(function() { this.checked = false; });
            nextMoveEvt(false, '.join_insurance');
        }
    });
    // 개별 동의 - 전체동의 활성/비활성화
    $('.cautionList input[type=checkbox]').change(function (){
        if($('.cautionList input[type=checkbox]').length == $('.cautionList input[type=checkbox]:checked').length) {            
            $('.all_chk').prop('checked', true);
            nextMoveEvt(true, '.join_insurance');
        } else {
            $('.all_chk').prop('checked', false);
            nextMoveEvt(false, '.join_insurance');
        }
    });
    

/* 마케팅 동의 ---------------------------------------------- */

    let marketingAllCheck1 = false;
    let marketingAllCheck2 = false;

    $('.check_yesno.marketing').slideUp(); // 광고성 정보 수신 - 항목 접기
    
    // 전체동의
    $('#allchk_marketing').change(function (){
        if ($(this).is(':checked')) {
            allCheck('Y', '.marketing_box input');
            $('.marketing_box').slideUp();            
            nextMoveEvt(true,'.marketingNext');
            marketingAllCheck1 = true;
            marketingAllCheck2 = true;
        } else {
            //전체동의 취소
            allCheck('N', '.marketing_box input');
            $('.marketing_box').slideDown();
            nextMoveEvt(false,'.marketingNext');
            marketingAllCheck1 = false;
            marketingAllCheck2 = false;
        };
    });
    

    // 수집이용에 관한 사항
    $('#marketingAgree1').change(function(){
        if ($(this).is(':checked')) {
            marketingAllCheck1 = true;
            allCheck('Y', '.modal_no3 input');
            $('#marketingAgree2').prop('checked', true);
            $('#marketingAgree3').prop('checked', true);
            $('.check_yesno.marketing input[type=checkbox]').prop('checked', true);
        } else {
            marketingAllCheck1 = false;
            allCheck('N', '.modal_no3 input');
            $('#marketingAgree2').prop('checked', false);
            $('#marketingAgree3').prop('checked', false);
            $('.check_yesno.marketing input[type=checkbox]').prop('checked', false);
        }
    });

    // 수집이용에 관한 사항 - 개인(신용)정보수집 및 이용동의
    $('#marketingAgree2').change(function(){        
        if ($(this).is(':checked')) {
            allCheck('Y', '.modal_no3 input');            
            if($('#marketingAgree3').is(':checked')) {
                $('#marketingAgree1').prop('checked', true);
                marketingAllCheck1 = true;
            } else {
                $('#marketingAgree1').prop('checked', false);
                marketingAllCheck1 = false;
            }
        } else {
            allCheck('N', '.modal_no3 input');
            $('#marketingAgree1').prop('checked', false);
            marketingAllCheck1 = false;
        }
    });

    // 수집이용에 관한 사항 - 상품소개등을 위한 광고성 정보의 수신동의
    $('#marketingAgree3').change(function(){
        if ($(this).is(':checked')) {
            $('.check_yesno.marketing input[type=checkbox]').prop('checked', true);
            $('.check_yesno.marketing').slideDown();            
            if($('#marketingAgree2').is(':checked')) {
                $('#marketingAgree1').prop('checked', true);
                marketingAllCheck1 = true;
            }
        } else {
            $('.check_yesno.marketing input[type=checkbox]').prop('checked', false);
            $('.check_yesno.marketing').slideUp();
            $('#marketingAgree1').prop('checked', false);
            marketingAllCheck1 = false;
        }
    });

    // 수집이용에 관한 사항 -상품소개등을 위한 광고성 정보의 수신동의 ( 4개 )
    $('.check_yesno.marketing input[type=checkbox]').change(function (){
        if($('.check_yesno.marketing input[type=checkbox]:checked').length > 0) {
            $('#marketingAgree3').prop('checked', true);
        } else {
            $('#marketingAgree3').prop('checked', false);
        }
    });

    // 수집이용에 관한 사항 - 모달 안에 전체동의
    $('#modalAgreeMarketing').change(function (){
        if ($(this).is(':checked')) {
            allCheck('Y', '.modal_no3 input');
        } else {
            allCheck('N', '.modal_no3 input');
        };
    });

    // 제공에 관한 사항
    $('#marketingAgree4').change(function(){
        if ($(this).is(':checked')) {
            marketingAllCheck2 = true;
        } else {
            marketingAllCheck2 = false;
        }
    });

    // 동의 4항목 전체 체크 여부
    $('[id^=marketingAgree]').change(function(){
        if(marketingAllCheck1 && marketingAllCheck2) {
            $('#allchk_marketing').prop('checked', true);            
            $('.marketing_box').slideUp();
            nextMoveEvt(true, '.marketingNext');
        } else {
            $('#allchk_marketing').prop('checked', false);            
            $('.marketing_box').slideDown();
            nextMoveEvt(false, '.marketingNext');
        }
    });
    
    
/* 휴대폰 본인인증 Step1 ---------------------------------------------- */

    let certificationNumEl = $('#certificationNum');
    let nextPhoneEl = $('.nextPhone'); 
    let viewMenuBoxEl = $('.viewMenuBox');
    let signPhoneInputs = $('.agreeItem.sign_phone');
    let agAllInput = $('#agAll');

    // 전체동의
    agAllInput.change(function (){
        if(agAllInput.is(':checked')) {
            signPhoneInputs.find('input').prop('checked', true);
            viewMenuBoxEl.slideDown();
        } else {
            signPhoneInputs.find('input').prop('checked', false);
            viewMenuBoxEl.slideUp();
        }
    });

    // 전체동의 하위 input 들
    signPhoneInputs.find('input').change(function (){
        if(signPhoneInputs.find('input').length == signPhoneInputs.find('input:checked').length) {
            agAllInput.prop('checked', true);
            viewMenuBoxEl.slideDown();
        } else {
            agAllInput.prop('checked', false);
            viewMenuBoxEl.slideUp();
        }
    });

    // 인증번호 없이 다음 눌렀을 때
    nextPhoneEl.off('click').on('click', function(){
        if($(this).hasClass('light')) {
            certificationNumEl.focus();
            pmd('인증번호를 확인해 주세요');
        }        
    });

    var timer = null;
    var isRunning = false;
  
    // 인증번호 전송
    $('.btn_certification').on('click', function() {
        var phoneCntEl = $('.phoneCnt');
    	var leftSec = 179;
        phoneCntEl.show();
        certificationNumEl.focus();
    	if (isRunning){
    		clearInterval(timer);
    		startTimer(leftSec, phoneCntEl);
    	} else{
            startTimer(leftSec, phoneCntEl);    		
    	}
    });

    // 인증번호 글자수 체크
    certificationNumEl.keyup(function (){
        if(certificationNumEl.val().length == 6) {
            nextPhoneEl.removeClass('light').attr('href', './sign_agree.html');
        } else {
            nextPhoneEl.addClass('light').removeAttr('href');
        }
    });

    // 인증번호 타이머
    function startTimer(count, target) {            
        var minutes, seconds;
        timer = setInterval(function () {
            minutes = parseInt(count / 60, 10);
            seconds = parseInt(count % 60, 10);
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            target.html(minutes + ':' + seconds);
            if (--count < 0) {
                clearInterval(timer);
                target.html('00:00');
                isRunning = false;
            }
        }, 1000);
        isRunning = true;
    }



/* 보험가입 동의 Step2 ---------------------------------------------- */

    let nextSignAgreeEl = $('.nextSignAgree');
   
    //전체동의
    $('.one_line li .viewDetail').hide();

     // 개별 전체 클릭시 전체동의 체크이벤트
     $('.sign_phone input').change(function (){
        if($('.sign_phone input').length == $('.sign_phone input:checked').length ){
            $('#agAll').prop('checked',true);
            $('.viewMenuBox').slideDown();
        }
    });

    // 필수동의사항 체크 확인 
    nextSignAgreeEl.off('click').on('click', function() {
        if( $('#yesno_0').prop('checked') == false ){
            $('#yesno_0').focus(); //Step2 - 인증번호
            pmd('필수 동의사항을 확인해 주세요');
            return false;
        }
    });

    // 필수동의사항 체크 여부에 따른 버튼 변화
    $('.com_agree_chk input[type=checkbox]').change(function (){
        if($('.com_agree_chk input[type=checkbox]').is(':checked') && $('#agAll').is(':checked')) {
            nextSignAgreeEl.removeClass('light').removeClass('nextSignAgree').addClass('dialog_open_precaution');

            // 보험가입시 유의사항 팝업 열기
            $('.dialog_open_precaution').off('click').on('click', function() {
                $('.precautionDialog').addClass('show');
            });
            
            
        } else {
            nextSignAgreeEl.addClass('light').addClass('nextSignAgree').removeAttr('href').removeClass('dialog_open_precaution');
        }
    });

    
    // 전체동의 해제시 버튼 비활성화
    $('input[name=agreeAllCheck]').change(function(){
        if(!$('#agAll').is(':checked')){
            $('#yesno_0').prop('checked',false);
            nextSignAgreeEl.addClass('light').removeAttr('href');
        }
    });


    
/* 가입 후 결과 ---------------------------------------------- */

    $('.tinfoBtn').off('click').on('click', function() {
        if($('.tinfo').css('display') === 'none') {
            $('.tinfo').slideDown(500);
            $(this).addClass('active');
        } else {
            $('.tinfo').slideUp(500);
            $(this).removeClass('active');
        }
    });
    

/* 팝업 ------------------------------------------------------- */

    // 공통 - 팝업 열기
    $('.modal_open').off('click').on('click', function() {
        modalEvt('open', $(this).data('modal'));
    });
    
    // 공통 - 팝업 닫기
    $('.mdcolsebtn, .modalBottomBtn').off('click').on('click', function() {
        modalEvt('close', $(this).parents('.modal_wrap').data('modal'));
    });

    // dialog full popup
    $('.dialog_close').off('click').on('click', function() {
        $(this).parents('.dialog').removeClass('show');
    });

});
// document ready






// 공통 - 팝업 열기,닫기
function modalEvt (type, modalNumber) {    
    if(type == 'open') {
        $('.modalBackColor').fadeIn();
        $('.modalBottomBtn').fadeIn();
        $('.modal_no' + modalNumber).slideDown();
        enable(); //스크롤 부모창 막기

        // 첫번째 탭 선택
        $('.tabs li').removeClass('orangeLine');
        $('.tabs li:first-child').addClass('orangeLine');
        $('.modal_no' + modalNumber + ' .tab_content').first().show();
        $('.viewDetail').hide();
        $('.viewSummary').show();
        // 첫번째 탭 선택 끝
        
    } else {
        $('.modalBackColor').fadeOut();
        $('.modalBottomBtn').fadeOut();
        $('.modal_no' + modalNumber).slideUp();
        disable(); //스크롤 부모창 풀기
    }
}

//스크롤 부모창 막기
const body = document.querySelector('body');
let scrollPosition = 0;
function enable() {// 팝업 오픈
	scrollPosition = window.pageYOffset;
	body.style.overflow = 'hidden';
	body.style.position = 'fixed';
	body.style.top = '-${scrollPosition}px';
	body.style.width = '100%';
}
function disable() {// 팝업 닫기
	body.style.removeProperty('overflow');
	body.style.removeProperty('position');
	body.style.removeProperty('top');
	body.style.removeProperty('width');
	window.scrollTo(0, scrollPosition);
}

// 공통 - 전체선택
function allCheck(checkVal, target) {
    if (checkVal == 'Y') {
        $(target).each(function() { this.checked = true; });
    } else {
        $(target).each(function() { this.checked = false; });
    }
}

// 공통 - 다음 페이지 이동
function nextMoveEvt(type, target) {
    if(type) {
        let url = $(target).data('url');
        $(target).removeClass('light').attr('href', './'+ url +'.html');
    } else {
        $(target).addClass('light').removeAttr('href');
    }        
}

// 공통 - 검은색 작은 메세지 띄우기
function pmd(t) {
    //메세지띄우기
    $('.messageTxt').text(t);
    $('.popupMessage').slideDown();
    // 2초 후 사라지게
    setTimeout(function () {
        $('.popupMessage').slideUp();
    }, 2000);
}

// 공통 - input number
function onlyNumber(str) {
    return str.value=str.value.replace(/[^-0-9]/g,'');    
}
  


