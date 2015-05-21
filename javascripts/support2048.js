

documentWidth = $(window).width(); 
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

console.log("gridContainerWidth: ", gridContainerWidth);
console.log("cellSideLength: ", cellSideLength);
console.log("cellSpace: ", cellSpace);

function getMarTop (line, row) {
	// 取得正确的margin-top值
	return cellSpace + line*( cellSpace + cellSideLength );
}

function getMarLeft (line, row) {	
	// 取得正确的margin-left值
	return cellSpace + row*( cellSpace + cellSideLength );
}

function getNumberBackgroundColor ( number ) {
	// 取得正确的数字背景颜色
	switch	( number ) {
		case 2: return "#eee4da"; break;
		case 4: return "#ede0c8"; break;
		case 8: return "#f2b179"; break;
		case 16: return "#f59563"; break;
		case 32: return "#f67c5f"; break;
		case 64: return "#f65e3b"; break;
		case 128: return "#edcf72"; break;
		case 256: return "#edcc61"; break;
		case 512: return "#9c0"; break;
		case 1024: return "#33b5e5"; break;
		case 2048: return "#09c"; break;
		case 4196: return "#a6c"; break;
		case 8192: return "#93c"; break;		
	}

	return "black";
}

function getNumberColor ( number ) {
	// 取得正确的数字颜色
	if ( number <= 4 ) {
		return "#776e65";
	}

	return "white";
}

function nospace ( board ) {
	// 判断是否还有空间
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if ( board[i][j] == 0 ) {
				return false;
			}
		}
	}

	return true;
}

function refreshBoardSpace ( board, boardSpace ) {
	// 遍历棋盘格，将空位加入boardSpace数组,之后用于的generateOneNumber随机生成新数字

	boardSpace = [];
	var bs_i = 0;

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if ( board[i][j] == 0 ) {
				boardSpace[bs_i] = i*4+j;
				bs_i += 1;
			}
		}
	}

	return boardSpace;
}

function randSpace ( boardSpace ) {
	// 从boardSpace中随机一个空位
	var rand_i = parseInt( Math.floor( Math.random() * boardSpace.length ) );

	return boardSpace[rand_i];
}

function canMoveLeft ( board ) {
	// 判断是否能够向左移动
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if ( board[i][j] != 0 ) {
				if ( board[i][j-1]==0 || board[i][j-1]==board[i][j] ) {
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveRight ( board ) {
	// 判断是否能够向右移动
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if ( board[i][j] != 0 ) {
				if ( board[i][j+1]==0 || board[i][j+1]==board[i][j] ) {
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveUp ( board ) {
	// 判断是否能够向上移动

	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if ( board[i][j] != 0 ) {
				if ( board[i-1][j]==0 || board[i-1][j]==board[i][j] ) {
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveDown ( board ) {
	// 判断是否能够向下移动

	for (var i = 2; i >= 0; i--) {
		for (var j = 0; j < 4; j++) {
			if ( board[i][j] != 0 ) {
				if ( board[i+1][j]==0 || board[i+1][j]==board[i][j] ) {
					return true;
				}
			}
		}
	}

	return false;
}

function noBlockHorizontal ( row, col1, col2, board ) {
	// 判断在水平方向上，从col1到col2是否有障碍（不等于0）

	for (var i = col1+1; i < col2; i++) {
		if ( board[row][i] != 0 ) {
			return false;
		}
	}

	return true;
}

function noBlockVertical ( col, row1, row2, board ) {
	// 判断在垂直方向上，从row1到row2是否有障碍（不等于0）

	for (var i = row1+1; i < row2; i++) {
		if ( board[i][col] != 0 ) {
			return false;
		}
	}

	return true;
}

function nomove ( board ) {
	// 

	if ( canMoveDown(board) || canMoveLeft(board) || 
		canMoveRight(board) || canMoveUp(board)) {
		return false;
	}
	return true;
}




