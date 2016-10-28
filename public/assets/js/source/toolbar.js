jQuery(function( $ ) {

	function saveSelection() {
	    if (window.getSelection) {
	        sel = window.getSelection();
	        if (sel.getRangeAt && sel.rangeCount) {
	            return sel.getRangeAt(0);
	        }
	    } else if (document.selection && document.selection.createRange) {
	        return document.selection.createRange();
	    }
	    return null;
	}

	function restoreSelection(range) {
	    if (range) {
	        if (window.getSelection) {
	            sel = window.getSelection();
	            sel.removeAllRanges();
	            sel.addRange(range);
	        } else if (document.selection && range.select) {
	            range.select();
	        }
	    }
	}

	var ifSmallWidth = function(){

		return 600 <= $(window).width() ? true : false;
	}

	var dropClass = function() {

		return ifSmallWidth() ? 'up' : 'down';

	}

	/////////////
	/// DROP UP
	/////////////
	$(document).on('click', '#lasso-toolbar--components', function(e){

		$(this).toggleClass('toolbar--drop-'+dropClass() );
        // show and hide the component list 
		var dropUp 			= $(this).find('ul');
		if ($(this).hasClass( 'toolbar--drop-'+dropClass() )) {
			$(dropUp).show();
		} else {
			$(dropUp).hide();
		}
		$('#lasso-toolbar--html').removeClass('html--drop-'+dropClass() );
		$('#lasso-toolbar--link').removeClass('link--drop-'+dropClass() );
		if( !lasso_editor.isMobile) {
			// get the height of the list of components
			
			var	dropUpHeight 	= $(dropUp).height(),
				caretSpacing  	= 15; // this is the height of the caret

			// and adjust the drop up position as necessary
			if ( true == ifSmallWidth() ) {

				$(dropUp).css({
					dropUp: dropUpHeight,
					top: -(dropUpHeight + caretSpacing)
				});

			}
		} else {
			$(dropUp).css({
					dropUp: dropUpHeight,
					top: 40
				});
		}


	});

	/////////////
	/// HTML DROP UP
	/////////////

	//$('#lasso-toolbar--html').live('mousedown',function(){
	jQuery(document).on('mousedown', '#lasso-toolbar--html', function(){
		if( ! $(this).hasClass('html--drop-'+dropClass() ) ) {
			var article = document.getElementById(lasso_editor.editor);
			window.selRange = saveSelection();
			if( typeof window.selRange === 'undefined' || null == window.selRange ) {
				article.highlight();
				window.selRange = saveSelection();
			}
		}
	});

	//$('#lasso-toolbar--html__inner').live('focusout',function(){
	jQuery(document).on('focusout', '#lasso-toolbar--html__inner', function(){
		restoreSelection(window.selRange);
	});

	//$('#lasso-toolbar--html__inner').live('focus',function(){
	jQuery(document).on('focus', '#lasso-toolbar--html__inner', function(){
		if ( $(saveSelection().commonAncestorContainer).parents('#lasso--content').length != 0 ) {
			window.selRange = saveSelection();
		}
	});

	$(document).on('click', '#lasso-toolbar--html', function(e){

		$(this).toggleClass('html--drop-'+dropClass() );
		$('#lasso-toolbar--components').removeClass('toolbar--drop-'+dropClass() );
		$('#lasso-toolbar--link').removeClass('link--drop-'+dropClass() );

		// prevent dropup from closing
		//$('#lasso-toolbar--html__wrap').live('click',function(){
		jQuery(document).on('click', '#lasso-toolbar--html__wrap', function(){
			return false;
		});

		$(this).find('#lasso-toolbar--html__inner').focus();

	});

	//$('.lasso-toolbar--html__cancel').live('click',function(){
	jQuery(document).on('click', '.lasso-toolbar--html__cancel', function(){

		$(this).closest('li').removeClass('html--drop-'+dropClass() );

	});

	//////////////////
	// HTML FORMATTING IN HTML DROP UP MENU
	//////////////////
	var htmlItemInsert = function(markup){

		return $('#lasso-toolbar--html__inner').text(markup);

	}
	//$('#lasso-html--h2').live('click',function(e){
	jQuery(document).on('click', '#lasso-html--h2', function(e){
		e.preventDefault();
		htmlItemInsert('<h2>H2 Heading</h2>');
	});
	//$('#lasso-html--h3').live('click',function(e){
	jQuery(document).on('click', '#lasso-html--h3', function(e){
		e.preventDefault();
		htmlItemInsert('<h3>H3 Heading</h3>');
	});
	//$('#lasso-html--ul').live('click',function(e){
	jQuery(document).on('click', '#lasso-html--ul', function(e){
		e.preventDefault();
		htmlItemInsert('<ul><li>Item</li></ul>');
	});
	//$('#lasso-html--ol').live('click',function(e){
	jQuery(document).on('click', '#lasso-html--ol', function(e){
		e.preventDefault();
		htmlItemInsert('<ol><li>Item</li></ol>');
	});

	////////////
	/// LINK DROP UIP
	////////////
	//$('#lasso-toolbar--link').live('mousedown',function(){
	jQuery(document).on('mousedown', '#lasso-toolbar--link', function(){
		if( ! $(this).hasClass('link--drop-up') ) {
			var article = document.getElementById(lasso_editor.editor);
			window.selRange = saveSelection();
			if( typeof window.selRange === 'undefined' || null == window.selRange ) {
				article.highlight();
				window.selRange = saveSelection();
			}
		}
	});

	//$('#lasso-toolbar--link__inner').live('focusout',function(){
	jQuery(document).on('focusout', '#lasso-toolbar--link__inner', function(){
		restoreSelection(window.selRange);
	});

	//$('#lasso-toolbar--link__inner').live('focus',function(){
	jQuery(document).on('focus', '#lasso-toolbar--link__inner', function(){
		if ( $(saveSelection().commonAncestorContainer).parents('#lasso--content').length != 0 ) {
			window.selRange = saveSelection();
		}
	});

	$(document).on('click', '#lasso-toolbar--link', function(e){

		$(this).toggleClass('link--drop-'+dropClass());
		$('#lasso-toolbar--components').removeClass('toolbar--drop-'+dropClass() );
		$('#lasso-toolbar--html').removeClass('html--drop-'+dropClass() );

		$('#aesop-toolbar--link_newtab').unbind('mousedown').mousedown(function() {
			$(this).prop("checked", !$(this).prop("checked"));
			return;
		});

		// prevent dropup from closing
		jQuery(document).on('click', '#lasso-toolbar--link__wrap', function(){
			return false;
		});

		$(this).find('#lasso-toolbar--link__inner').focus();

	});

	// RESTORING LINK SELECTION
	//$('.lasso-editing .lasso-link').live('click',function(e){
	jQuery(document).on('click', '.lasso-editing .lasso-link', function(){

		e.preventDefault();

		// prevent dropup from closing
		//$('#lasso-toolbar--link__wrap').live('click',function(){
		jQuery(document).on('click', '#lasso-toolbar--link__wrap', function(){
			return false;
		});

		var link = $(this).attr('href');

		$('#lasso-toolbar--link').addClass('link--drop-'+dropClass());
		$('#lasso-toolbar--link__inner').text(link);
	});

	/////////////
	/// DELETING
	/////////////
	//$('.lasso-delete').live('click',function(e) {
	jQuery(document).on('click', '.lasso-delete', function(e){

		e.preventDefault();

		var $this = $(this);

		swal({
			title: "Delete this component?",
			type: "warning",
			text: false,
			showCancelButton: true,
			confirmButtonColor: "#d9534f",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		},
		function(){

			// remove component
			$this.closest('.aesop-component').remove();

			// remove wp image if its a wp image
			$this.closest('.lasso-component').remove();

		});

	});

	/////////////
	/// CLONING
	/////////////
	//$('.lasso-clone').live('click',function(e) {
	jQuery(document).on('click', '.lasso-clone', function(e){

		// sore reference to this
		var $this = $(this);

		e.preventDefault();

		$this.closest('.aesop-component').clone().insertAfter( $(this).parent().parent() ).hide().fadeIn()
		$this.closest('.lasso-component').clone().insertAfter( $(this).parent().parent() ).hide().fadeIn()

	});

});