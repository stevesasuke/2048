var board = new Array();
var score = 0;

$(document).ready(function() {
	newgame();
});

$(document).keydown( function( event ) {
		switch ( event.keyCode ) {
			case 37: //left
				if ( moveLeft() ) {
					generateOneNumber();
					isGameOver();
				}
				break;
			case 38: //up
				if ( moveUp() ) {
					generateOneNumber();
					isGameOver();
				}

				break;
			case 39: //right
				if ( moveRight() ) {
					generateOneNumber();
					isGameOver();
				}

				break;
			case 40: //down
				if ( moveDown() ) {
					generateOneNumber();
					isGameOver();
				}

				break;
			default:
				break;
		}
});

function newgame() {
	// 初始化棋盘格
	init();
	// 在随机的两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

function init () {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css('margin-top', getMarTop( i, j ));
			gridCell.css('margin-left', getMarLeft( i, j ));			
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
		}
	}

	updateBoardView();
}

function updateBoardView () {
	console.log("into updateBoardView");
	$(".number-cell").remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			// $('#grid-container').append('<div>i,j</div>');

			console.log("into for for");
			var theNumberCell = $('#number-cell-'+i+'-'+j);

			if (board[i][j] == 0) {
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('margin-top', getMarTop( i, j )+50);
				theNumberCell.css('margin-left', getMarLeft( i, j )+50);
			} 
			else {
				theNumberCell.css('width', '100px');
				theNumberCell.css('height', '100px');
				theNumberCell.css('margin-top', getMarTop( i, j ));
				theNumberCell.css('margin-left', getMarLeft( i, j ));
				theNumberCell.css('background-color', getNumberBackgroundColor( board[i][j]) );
				theNumberCell.css('color', getNumberColor( board[i][j]) );
				theNumberCell.text( board[i][j] );
			}
		}
	}
}

function generateOneNumber () {
	console.log("into generateOneNumber");
	if ( nospace( board )) {
		return false;
	}

	// 随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));

	while ( true ) {
		if ( board[randx][randy] == 0 ) {
			break;
		}
		var randx = parseInt(Math.floor(Math.random() * 4));
		var randy = parseInt(Math.floor(Math.random() * 4));
	}

	// 随机一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;
	console.log("the randNumber is", randNumber);
	board[randx][randy] = randNumber;

	showNumberWithAnimation( randx, randy, randNumber );


	return true;
 }

function moveLeft () {
	
	if ( !canMoveLeft( board ) ) {
		return false;
	}

	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if ( board[i][j] != 0 ) {
				
				for (var k = 0; k < j; k++) {
					if ( board[i][k] == 0 && noBlockHorizontal( i, k, j, board )) {
						//move
						showMoveAnimation( i, j, i, k );
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if ( board[i][k] == board[i][j] && noBlockHorizontal( i, k, j, board )) {
						//move 
						showMoveAnimation( i, j, i, k );
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						return;
					}
				}
			}
		}
	}

	return true;
}











