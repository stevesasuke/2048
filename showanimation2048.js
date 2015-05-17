function showNumberWithAnimation ( i, j, randNumber) {
	console.log("into showNumberWithAnimation");
	var numberCell = $('#number-cell-' + i + "-" + j);
	console.log("numberCell is", numberCell);

	numberCell.css('background-color', getNumberBackgroundColor( randNumber ));
	numberCell.css('color', getNumberColor( randNumber ));
	numberCell.text( randNumber );

	numberCell.animate({
		width: "100px",
		height: "100px",
		marginTop: getMarTop( i, j ),
		marginLeft: getMarLeft( i, j )
	}, 50);

}

function showMoveAnimation ( fromx, fromy, tox, toy ) {
	
	var numberCell = $('#number-cell-' + fromx + '-' + fromy );
	numberCell.animate({
		
	})
}


