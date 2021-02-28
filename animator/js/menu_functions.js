//https://schoolsw3.com/howto/howto_js_draggable.php
function dragElementAbsolute(elmnt, parent=false) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	elmnt.mousedown(dragMouseDown);
	
	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}
	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		var newtop = (elmnt.offset().top - pos2) + "px",
			newleft = (elmnt.offset().left - pos1) + "px";
		if(parseInt(newtop)<0 || parseInt(newleft)<0){return}
		var elmntDrag = elmnt;
		if(parent){
			elmntDrag = elmnt.parent();
		}
		elmntDrag.css({'top':newtop, 'left':newleft})
	}
	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}


function dragElementFixed(elmnt, parent=false) {
  elmnt.mousedown(dragMouseDown);
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
	if(parseInt(e.clientY)<0 || parseInt(e.clientX)<0){return}
	var elmntDrag = elmnt;
		if(parent){
			elmntDrag = elmnt.parent();
		}
	elmntDrag.css({'top':e.clientY, 'left':e.clientX})

  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

$('.closeMenu').click(function(){
    $(this).parent().css('display','none');
})








dragElementFixed($('#arrow_menu_drag'),true);