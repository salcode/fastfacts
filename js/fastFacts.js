/**
 * jQuery Plugin Fast Facts
 * Version 1.1.0
 * Sal Ferrarello (http://salferrarello.com)
 *
 * http://fastfacts.salcode.com/
 */
(function( $ ) {
	$.fn.fastFacts = function( options ) {

		var options = $.extend({
			'min': 0,
			'max': 9,
			'colClass': 'col-xs-1',
			'rowClass': 'row',
			'operator': '+',
			'numProblems': 60,
			'allowNegativeResult': false,
			'allowZeroResult': false,
			'allowTwoDigitSubtractionResult': false,
			'allowTwoDigitSubtrahend':        false // Number being subtracted no greater than 9.
		}, options );

		return this.each( function() {
			var elem = $( this );
			var markup = getMarkup( options );
			elem.append( markup );
		});
	};

	var getMarkup = function( options ) {
		var markup = '';
		var problemCount = 0;
		var colIndex = 0;
		var numColumns = 10;

		while ( problemCount < options.numProblems ) {
			markup += startRow( options );
				colIndex = 0;
				while ( colIndex < numColumns && problemCount < options.numProblems ) {
					markup += startColumn( options );
					markup += getProblem( options );
					markup += endColumn( options );

					colIndex++;
					problemCount++;

				}

			markup += endRow( options );
		}

		return markup;
	}

	var startRow = function( options ) {
		return '<div class="fast-facts-row ' + options.rowClass + '">';
	}
	var endRow = function( options ) {
		return '</div>';
	}

	var startColumn = function( options ) {
		return '<div class="fast-facts-col ' + options.colClass + '">';
	}
	var endColumn = function( options ) {
		return '</div>';
	}
	var getProblem = function( options ) {
		var markup = '';
		var firstNumber  = getNumber( options );
		var secondNumber = getNumber( options, firstNumber );

		markup += '<div class="fast-facts-problem">';

			markup += '<div class="fast-facts-number fast-facts-number-1">';
			markup += firstNumber;
			markup += '</div>';

			markup += '<div class="fast-facts-number fast-facts-number-2">';
				markup += '<span class="fast-facts-operator">';
				markup += options.operator;
				markup += '</span>';

				markup += secondNumber;
			markup += '</div>';
		markup += '</div>';

		return markup;
	}

	var getNumber = function( options, otherNumber = false ) {
		var min, max, result;
		if ( '-' === options.operator && false !== otherNumber ) {
			min = options.min;
			max = options.allowNegativeResult ? options.max : otherNumber - 1;

			if ( false === options.allowTwoDigitSubtrahend && max >= 10 ) {
				max = 9;
			}

			if ( false === options.allowTwoDigitSubtractionResult && otherNumber - min >= 10 ) {
				min = otherNumber % 10 + 1;
			}

			if ( false === options.allowZeroResult && otherNumber === max ) {
				max--;
			}

			if ( min > max ) {
				min = max;
			}
		} else {
			min = options.min;
			max = options.max;
		}

		result = randomNumberFromMinToMaxInclusive( min, max );
		if ( '/' === options.operator && false !== otherNumber ) {
			return otherNumber * result;
		}
		return result;
	}

	var randomNumberFromMinToMaxInclusive = function( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	}

}) ( jQuery );
