function showNumberWithAnimation ( i, j, randNumber) {
	// 数字显示的动画效果
	// console.log("into showNumberWithAnimation");
	var numberCell = $('#number-cell-' + i + "-" + j);
	// console.log("numberCell is", numberCell);

	numberCell.css('background-color', getNumberBackgroundColor( randNumber ));
	numberCell.css('color', getNumberColor( randNumber ));
	numberCell.text( randNumber );

	numberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		fontSize: 0.6*cellSideLength,
		marginTop: getMarTop( i, j ),
		marginLeft: getMarLeft( i, j )
	}, 50);

}

function showMoveAnimation ( fromx, fromy, tox, toy ) {
	// 显示移动数字的动画效果
	var numberCell = $('#number-cell-' + fromx + '-' + fromy );
	numberCell.animate({
		marginTop:getMarTop( tox, toy ),
		marginLeft:getMarLeft( tox, toy )
	}, 200);
}
	
function updateScore ( score ) {
	// body...
	$('#score').text( score );
}




