/**
 *------------------------------------------------------------------------------
 * @package       Hudson By iThemesLab!
 *------------------------------------------------------------------------------
 * @copyright     Copyright (C) 2013-2016 iThemesLab.com. All Rights Reserved.
 * @Link:         http://ithemeslab.com
 */
( function ( $ ) {
	"use strict";

	//Preloader Start
	$( window )
		.load( function () {
			$( '#preloader' )
				.fadeOut( 'slow', function () {
					$( this )
						.remove();
				} );
		} );
	//Preloader End
	// browser detect
	try {
		$.browserSelector();
		// Adds window smooth scroll on chrome.
		if ( $( "html" )
			.hasClass( "chrome" ) ) {
			$.smoothScroll();
		}
	} catch ( err ) {

	}

	// browser detect
	//Fixed Navigation on Scroll Start
	$( window )
		.on( 'scroll', function () {
			if ( $( window )
				.scrollTop() > 55 ) {
				$( '#t3-mainnav' ).addClass( 'navbar-fixed-top' );
				$('#back-to-top').addClass('reveal');
			} else {
				$( '#t3-mainnav' ).removeClass( 'navbar-fixed-top' );
				 $('#back-to-top').removeClass('reveal');
			}
		} );
	//Fixed Navigation on Scroll Ends


	$( document )
		.ready( function () {
			//Progress Bar Starts
			$( '.progress-skill-shortcode' )
				.appear( function () {
					$( '.progress' )
						.each( function () {
							$( '.progress-bar' )
								.css( 'width', function () {
									return ( $( this )
										.attr( 'data-percentage' ) + '%' )
								} );
						} );
				}, {
					accY: -200
				} );

			//Progress Bar End
			//Pie Chart Start
			$( '.chart' )
				.appear( function () {
					$( '.chart' )
						.each( function () {
							var $chart = $( this );
							var $color = $( this )
								.data( 'color' );
							var $width = $( this )
								.data( 'width' );
							var $size = $( this )
								.data( 'size' );
							$chart.easyPieChart( {
								animate: 2000,
								barColor: $color,
								barColor2: $color,
								lineCap: 'butt',
								lineWidth: $width,
								scaleColor: false,
								trackColor: '#f2f2f2',
								size: $size,
								trackWidth: $width - 1
							} );

						} );
				} );
			//Pie chart End
			//Clients Carousel Start
			$( ".itl-clients" )
				.owlCarousel( {
					items: 5, //items
					responsive: true,
					pagination: false, //navigation & pagination
					slideSpeed: 100, //Basic Speeds
					paginationSpeed: 600,
					autoPlay: true
				} );
			//Clients Carousel End
			//Animated Counter Start
			$( ".fact-box" )
				.appear( function () {
					var datacount = $( this )
						.attr( 'data-count' );
					$( this )
						.find( '.timer' )
						.delay( 6000 )
						.countTo( {
							from: 0,
							to: datacount,
							speed: 5000,
							refreshInterval: 50
						} );
				} );
			//Animated Counter End

		//back to top button start
        $('#back-to-top').on('click', function(){
            $("html, body").animate({scrollTop: 0}, 1000);
            return false;
        });
        //back to top button end

		} );

} )( jQuery );
