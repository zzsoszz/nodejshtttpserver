$(document).ready(function(){
	
	$(".file").change(function(){
		var aa=$(this).get(0).files[0];
		var uploadsrc = window.URL.createObjectURL(aa);
		$(this).closest(".file-box").find("img")[0].src=uploadsrc;
	});
	
});