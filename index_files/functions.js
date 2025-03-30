function confirmAction(msg)
	{
	if (confirm(msg)) return true;
	else return false;
	}

function checkList(Element,Name)
	{
	thisCheckBoxes = document.getElementsByTagName('input');
	for (i = 1; i < thisCheckBoxes.length; i++)
		{
		if (thisCheckBoxes[i].type == 'checkbox' && thisCheckBoxes[i].name == Name)
			{
			thisCheckBoxes[i].checked = Element.checked;
			}
		}
	}

function showFullText(input)
	{
	document.getElementById("o_" + input).style.display="none";
	document.getElementById("o_text_" + input).style.display="";
	}
	
var folder=''; var old;
function expandit(curobj)
	{
	folder = document.getElementById(curobj).style;
	if (folder.display == "none") folder.display = "";
	else folder.display = "none";
	if (old != null && old != folder) old.display = "none";
	old = folder;
	}
	
function addFavorites(r,i,t,l)
	{
	$.ajax({
	type: "POST",
	url: "/script/ajax/favorites.php",
	data: "r=" + r + "&id=" + i + "&type=" + t + "&from=" + l,
	cache: false,
	success: function(txt) {$("#fav_"+i).html(txt);}
	});
	}
	
function addFavoritesCookies(i,t,l)
	{
	$.ajax({
	type: "POST",
	url: "/script/ajax/favorites_cookies.php",
	data: "id=" + i + "&type=" + t + "&from=" + l,
	cache: false,
	success: function(txt) {$("#fav_"+i).html(txt);}
	});
	}
	
function addFavoritesAnonymous(r,i,t,l)
	{
	$.ajax({
	type: "POST",
	url: "/script/ajax/favorites_anonymous.php",
	data: "r=" + r + "&id=" + i + "&type=" + t + "&from=" + l,
	cache: false,
	success: function(txt) {$("#fav_"+i).html(txt);}
	});
	}
	
function addBlacklist(r,i,t,l)
	{
	$.ajax({
	type: "POST",
	url: "/script/ajax/blacklist.php",
	data: "r=" + r + "&id=" + i + "&type=" + t + "&from=" + l,
	cache: false,
	success: function(txt) {$("#black_"+i).html(txt);}
	});
	}


/*map_chk = new Array();
function mm_ch(id) 
	{
	if (map_chk[id])
		{
		var path=document.getElementById('map_' + id).style.setProperty("fill", "");
		document.getElementById('metro_' + id).checked = false;
		map_chk[id] = false;
		}
	else
		{
		var path=document.getElementById('map_' + id).style.setProperty("fill", "red");
		document.getElementById('metro_' + id).checked = true;
		map_chk[id] = true;
		}
	}*/
	
map_chk = new Array();

function mm_ch(city,metro) 
	{
	var path = document.getElementById('metromap-svg-'+city).getSVGDocument().getElementById('map_' + metro);
	//var path = document.getElementById('map_'+metro);
	
	if (map_chk[metro])
		{
		path.style.setProperty("fill", "");
		document.getElementById('metro_' + metro).checked = false;
		map_chk[metro] = false;
		}
	else
		{
		path.style.setProperty("fill", "red");
		document.getElementById('metro_' + metro).checked = true;
		map_chk[metro] = true;
		}
	}

function ll_ch(city,metro) 
	{
	if (map_chk[metro[0]])
		{
		var my_fill = "";
		var my_checked = false;
		}
	else
		{
		var my_fill = "red";
		var my_checked = true;
		}
	
	for (i=0; i<metro.length; i++)
		{
		var path = document.getElementById('metromap-svg-'+city).getSVGDocument().getElementById('map_' + metro[i]);
		path.style.setProperty("fill", my_fill);
		
		document.getElementById('metro_' + metro[i]).checked = my_checked;
		map_chk[metro[i]] = my_checked;
		}
	}

/*function metromap_open(city)
	{
	document.getElementById('metromap-'+city).style.display='';
	document.getElementById('metromap-back-'+city).style.display='';
	}

function metromap_close(city)
	{
	document.getElementById('metromap-'+city).style.display='none';
	document.getElementById('metromap-back-'+city).style.display='none';
	}*/

function metromap_open(city)
	{
	//document.getElementById('metromap-'+city).style.top = '0';
	document.getElementById('metromap-svg-'+city).style.left = '0';
	//document.getElementById('metromap-'+city).style.left = '50%';
	//document.getElementById('metromap-'+city).style.transform = 'translateX(-50%)';
	//document.getElementById('metromap-back-'+city).hidden = false;
	//document.getElementById('metromap-svg-'+city).style.display='';
	document.getElementById('metromap-back-'+city).style.display='';
	}

function metromap_close(city)
	{
	//document.getElementById('metromap-'+city).style.top = '-9999px';
	document.getElementById('metromap-svg-'+city).style.left = '-9999px';
	//document.getElementById('metromap-back-'+city).hidden = true;
	//document.getElementById('metromap-svg-'+city).style.display='none';
	document.getElementById('metromap-back-'+city).style.display='none';
	}

function metromap_clear(city)
	{
	var elems = document.getElementById('metromap-list').getElementsByTagName('input');
	var path = document.getElementById('metromap-svg-' + city).getSVGDocument();
	
	/*for (var i=0; i<elems.length; i++)
		{
		var box = document.getElementById(elems[i].id);
		if (box.checked)
			{
			box.click();
			}
		}*/

	for (var i=0; i<elems.length; i++)
		{
		var box = document.getElementById(elems[i].id);
		if (box.checked)
			{
			path.getElementById('map_' + box.value).style.setProperty("fill", "");
			document.getElementById('metro_' + box.value).checked = false;
			map_chk[box.value] = false;
			}
		}
	}