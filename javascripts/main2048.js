var board = new Array();
var hasConflicted = new Array();
var boardSpace = new Array();
var score = 0;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function() {
	prepareForMobile();
	newgame();
});

$(document).keydown( function( event ) {
	switch ( event.keyCode ) {
		case 37: //left
			event.preventDefault();
			if ( moveLeft() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
			break;
		case 38: //up
			event.preventDefault();
			if ( moveUp() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
			break;
		case 39: //right
			event.preventDefault();
			if ( moveRight() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
			break;
		case 40: //down
			event.preventDefault();
			if ( moveDown() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
			break;
		default:
			break;
	}
});

var gridContainer = $('#grid-container');

gridContainer.addEventListener('touchstart', function (event) {
	startx = event.touches[0].clientX;
	starty = event.touches[0].clientY;

	event.preventDefault();
});

gridContainer.addEventListener('touchend', function (event) {
	endx = event.changedTouches[0].clientX;
	endy = event.changedTouches[0].clientY;

	var deltax = endx - startx;
	var deltay = endy - starty;

	if ( Math.abs( deltax ) < 0.3*documentWidth && Math.abs( deltay ) < 0.3*documentWidth ) {
		// 解决点击造成移动的bug
		console.log("click");
		return;
	}

	if ( Math.abs( deltax ) >= Math.abs( deltay ) ) {
		// 水平方向滑动
		if ( deltax > 0 ) {
			// 向右滑动
			console.log("into RIGHT");
			if ( moveRight() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
		else {
			// 向左滑动
			console.log("into LEFT");
			if ( moveLeft() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
	}
	else {
		// 垂直方向滑动
		if ( deltay > 0 ) {
			// 向下滑动
			console.log("into DOWN");
			if ( moveDown() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
		else {
			// 向上滑动
			console.log("into UP");
			if ( moveUp() ) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
	}
});

function prepareForMobile () {
	// 

	console.log("into func prepareForMobile");

	if ( documentWidth > 500 ) {
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}

	$('#grid-container').css('width', gridContainerWidth);
	$('#grid-container').css('height', gridContainerWidth);
	$('#grid-container').css('border-radius', 0.02*gridContainerWidth);

	$('.grid-cell').css('width', cellSideLength);
	$('.grid-cell').css('height', cellSideLength);
	$('.grid-cell').css('border-radius', 0.02*cellSideLength);
}

function newgame() {
	// 初始化棋盘格，在随机的两个格子生成数字

	init();
	generateOneNumber();
	generateOneNumber();
}

function init () {
	// 初始化棋盘格

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css('margin-top', getMarTop( i, j ));
			gridCell.css('margin-left', getMarLeft( i, j ));	
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}

	updateBoardView();

	score = 0;
}

function updateBoardView () {
	// 根据board数组中的数字更新前端界面：双重循环...

	console.log("into updateBoardView");
	$(".number-cell").remove();

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');

			var theNumberCell = $('#number-cell-'+i+'-'+j);

			if ( board[i][j] == 0 ) {
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('margin-top', getMarTop( i, j )+cellSideLength/2);
				theNumberCell.css('margin-left', getMarLeft( i, j )+cellSideLength/2);
			} 
			else {
				theNumberCell.css('width', cellSideLength+'px');
				theNumberCell.css('height', cellSideLength+'px');
				theNumberCell.css('margin-top', getMarTop( i, j ));
				theNumberCell.css('margin-left', getMarLeft( i, j ));
				theNumberCell.css('background-color', getNumberBackgroundColor( board[i][j]) );
				theNumberCell.css('color', getNumberColor( board[i][j]) );
				theNumberCell.text( board[i][j] );

				if ( board[i][j] > 64 && board[i][j] < 1024 ) {
					// 3位数时，将字号调小
					theNumberCell.css('font-size', '38px');
				} 
				else if ( board[i][j] > 512 ) {
					// 4位数时，将字号调更小0.0
					theNumberCell.css('font-size', '36px');
				}
			}
			hasConflicted[i][j] = false;
		}
	}

	$('.number-cell').css('line-height', cellSideLength+'px');
	$('.number-cell').css('font-size', 0.6*cellSideLength+'px');	
}

function generateOneNumber () {
	// 在棋盘格中生成一个数字： 
	// 		1. 更新boardSpace，之后利用boardSpace数组的长度判断是否有空间；
	// 		2. 随机一个能够放置新数字的位置；
	// 		3. 随意一个数字：2或4；
	// 		4. 动画显示之...

	console.log("into generateOneNumber");

	boardSpace = refreshBoardSpace( board, boardSpace );
	console.log("boardSpace: ", boardSpace);
	if ( boardSpace.length == 0 ) {
		return false;
	}

	// 随机一个位置
	var rand_num = randSpace( boardSpace );
	var randx = Math.floor( rand_num / 4 );
	var randy = rand_num % 4;

	// 随机一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;
	// console.log("randNumber: ", randNumber);
	board[randx][randy] = randNumber;

	showNumberWithAnimation( randx, randy, randNumber );

	return true;
}

function moveLeft () {
	// 向左移动: 
	// 		1. 先利用canMoveLeft判断是否能向左移动；
	// 		2. 双重循环，从第一行第二列开始（第一列左侧无数字），
	// 			2.1 若左侧有0且中间无阻挡（noBlockHorizontal），则将其左移；
	// 			2.2 若左侧数字相同且中间无阻挡（noBlockHorizontal），则将其叠加后左移；

	if ( !canMoveLeft( board ) ) {
		return false;
	}

	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if ( board[i][j] != 0 ) {
				for (var k = 0; k < j; k++) {
					if ( board[i][k] == 0 && noBlockHorizontal( i, k, j, board ) ) {
						//move
						showMoveAnimation( i, j, i, k );
						board[i][k] = board[i][j];
						board[i][j] = 0;

						continue;
					}
					else if ( board[i][k] == board[i][j] && noBlockHorizontal( i, k, j, board ) && 
						hasConflicted[i][k] == false ) {
						//move 
						showMoveAnimation( i, j, i, k );
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;

						score += board[i][k];
						updateScore( score );
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);

	return true;
}

function moveRight () {
	// 向右移动: 
	// 		1. 先利用canMoveRight判断是否能向左移动；
	// 		2. 双重循环，从第一行第三列开始（第四列右侧无数字），
	// 			2.1 若右侧有0且中间无阻挡（noBlockHorizontal），则将其右移；
	// 			2.2 若右侧数字相同且中间无阻挡（noBlockHorizontal），则将其叠加后右移；

	if ( !canMoveRight( board ) ) {
		return false;
	}

	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if ( board[i][j] != 0 ) {
				for (var k = 3; k > j; k--) {
					if ( board[i][k] == 0 && noBlockHorizontal( i, j, k, board ) ) {
						//move
						showMoveAnimation( i, j, i, k );
						board[i][k] = board[i][j];
						board[i][j] = 0;

						continue;
					}
					else if ( board[i][k] == board[i][j] && noBlockHorizontal( i, j, k, board ) && 
						hasConflicted[i][k] == false ) {
						//move 
						showMoveAnimation( i, j, i, k );
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;

						score += board[i][k];
						updateScore( score );
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);

	return true;
}

function moveUp () {
	// 向上移动: 
	// 		1. 先利用canMoveUp判断是否能向左移动；
	// 		2. 双重循环，从第一列第二行开始（第一行上侧无数字），
	// 			2.1 若上侧有0且中间无阻挡（noBlockVertical），则将其上移；
	// 			2.2 若上侧数字相同且中间无阻挡（noBlockVertical），则将其叠加后上移；

	if ( !canMoveUp( board ) ) {
		return false;
	}

	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if ( board[i][j] != 0 ) {
				for (var k = 0; k < i; k++) {
					if ( board[k][j] == 0 && noBlockVertical( j, k, i, board ) ) {
						//move
						showMoveAnimation( i, j, k, j );
						board[k][j] = board[i][j];
						board[i][j] = 0;

						continue;
					}
					else if ( board[k][j] == board[i][j] && noBlockVertical( j, k, i, board ) && 
						hasConflicted[k][j] == false ) {
						//move 
						showMoveAnimation( i, j, k, j );
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];
						updateScore( score );
						hasConflicted[k][j] == true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);

	return true;
}

function moveDown () {
	// 向下移动: 
	// 		1. 先利用canMoveDown判断是否能向左移动；
	// 		2. 双重循环，从第一行第三列开始（第四列下侧无数字），
	// 			2.1 若下侧有0且中间无阻挡（noBlockVertical），则将其下移；
	// 			2.2 若下侧数字相同且中间无阻挡（noBlockVertical），则将其叠加后下移；

	if ( !canMoveDown( board ) ) {
		return false;
	}

	for (var i = 2; i >= 0; i--) {
		for (var j = 0; j < 4; j++) {
			if ( board[i][j] != 0 ) {
				for (var k = 3; k > i; k--) {
					if ( board[k][j] == 0 && noBlockVertical( j, i, k, board ) ) {
						//move
						showMoveAnimation( i, j, k, j );
						board[k][j] = board[i][j];
						board[i][j] = 0;

						continue;
					}
					else if ( board[k][j] == board[i][j] && noBlockVertical( j, i, k, board ) && 
						hasConflicted[k][j] == false ) {
						//move 
						showMoveAnimation( i, j, k, j );
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];
						updateScore( score );
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);

	return true;
}

function isGameOver () {
	// 判断游戏是否结束了  
	// 		1. 当前棋盘格中已无空间
	//		2. 已经无法移动（相加合成）

	if ( nospace( board ) && nomove( board ) ) {
		gameover();
	}
}

function gameover () {
	// 当前游戏已结束

	alert("0.0,游戏结束了... ╮(╯▽╰)╭")
}









