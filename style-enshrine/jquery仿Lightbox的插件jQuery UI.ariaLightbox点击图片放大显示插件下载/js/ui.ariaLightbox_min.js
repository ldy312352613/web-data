﻿// Copyright (c) 2009 Felix Nagel for Namics (Deustchland) GmbH
// Download by http://sc.xueit.com
// Licensed under Creative Commens Attribution-Share Alike 3.0 Unported (http://creativecommons.org/licenses/by-sa/3.0/)
(function(A){A.widget("ui.ariaLightbox",{_init:function(){var D=this.options,B=this;if(D.imageArray){D.imageArray[D.imageArray.length]=this.element;var C=D.imageArray.length;this.element.click(function(E){B.options.activeImage=C-1;if(!D.disabled){E.preventDefault();B._open(A(this),E);}});}else{B.element.click(function(E){if(!D.disabled){E.preventDefault();B._open(A(this),E);}});}if(D.useDimmer){A(window).resize(function(){B._dimmerResize();});}},startGallery:function(D){var C=this.options,B=this;B._open(A(C.imageArray[0]),D);},_open:function(D,E){var C=this.options,B=this;C.clickedElement=E.target;C.wrapperElement=A("#ui-lightbox-wrapper");if(!C.wrapperElement.length){B._show(D,E);}else{B._changePicture(D,E);}},_show:function(F,B){var M=this.options,L=this;var J="\n";J+='<div id="ui-lightbox-wrapper" style="z-index:'+M.zIndex+1+';" class="ui-dialog ui-widget ui-widget-content ui-corner-all" tabindex="-1" role="dialog" aria-labelledby="ui-dialog-titleText-dialog">'+"\n";J+='	<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">'+"\n";J+='		<span class="ui-dialog-title" id="ui-dialog-title-dialog">'+M.titleText+"</span>"+"\n";J+='		<a href="#nogo" id="ui-lightbox-close" class="ui-dialog-titlebar-close ui-corner-all" title="'+M.closeText+'" role="button">'+"\n";J+='			<span class="ui-icon ui-icon-closethick">'+M.closeText+"</span>"+"\n";J+="		</a>"+"\n";J+="	</div>"+"\n";J+='	<div id="ui-lightbox-content">'+"\n";J+='		<div id="ui-lightbox-image"><img src="" aria-describedby="ui-lightbox-description" /></div>'+"\n";J+='		<p id="ui-lightbox-description"></p>'+"\n";if(M.imageArray){J+='		<p id="ui-lightbox-pager"></p>'+"\n";J+='		<div id="ui-dialog-buttonpane" class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">'+"\n";J+='			<button id="ui-lightbox-next" type="button" class="ui-state-default ui-corner-all">n?chtes Bild</button>'+"\n";J+='			<button id="ui-lightbox-prev" type="button" class="ui-state-default ui-corner-all">vorheriges Bild</button>'+"\n";J+="		</div>"+"\n";}J+="	</div>	"+"\n";J+="</div>"+"\n";if(M.useDimmer){L._lightboxCreate();}A("body").append(J);L._trigger("onShow",0);M.wrapperElement=A("#ui-lightbox-wrapper");if(M.imageArray){M.wrapperElement.keydown(function(N){if(N.keyCode==A.ui.keyCode.RIGHT){L.next();}if(N.keyCode==A.ui.keyCode.DOWN){L.next();}if(N.keyCode==A.ui.keyCode.UP){L.prev();}if(N.keyCode==A.ui.keyCode.LEFT){L.prev();}if(N.keyCode==A.ui.keyCode.SPACE){L.next();}if(N.keyCode==A.ui.keyCode.END){M.activeImage=M.imageArray.length-2;N.preventDefault();L.next();}if(N.keyCode==A.ui.keyCode.HOME){M.activeImage=1;N.preventDefault();L.prev();}});M.buttonpane=M.wrapperElement.find("#ui-dialog-buttonpane");L._setButtonState();var D=M.buttonpane.find("#ui-lightbox-prev");D.click(function(){L.prev();});L._makeHover(D);var I=M.buttonpane.find("#ui-lightbox-next");I.click(function(){L.next();});L._makeHover(I);}M.wrapperElement.keydown(function(N){if(N.keyCode==A.ui.keyCode.ESCAPE){L.close();}});var K=M.wrapperElement.find("#ui-lightbox-close");K.click(function(){L.close();});L._makeHover(K);switch(M.pos){case"auto":var C=L._pageScroll();var E=((A(document).width()-M.wrapperElement.width())/2);var H=C[1]+M.autoHeight;break;case"offset":var E=B.pageX+M.offsetX;var H=B.pageY-M.offsetY;break;default:var G=M.pos.split(",");var E=G[0];var H=G[1];break;}M.wrapperElement.css({left:E+"px",top:H+"px"}).fadeIn(M.animationSpeed).focus();L._changePicture(F,B);},_changePicture:function(E,G){var D=this.options,B=this;var C=D.wrapperElement.find("#ui-lightbox-content");var F=C.find("#ui-lightbox-image");var H=F.find("img");H.fadeOut(D.animationSpeed,function(){C.attr("aria-live","assertive").attr("aria-relevant","additions removals text").attr("aria-busy",true);var I=new Image();I.onload=function(){H.attr("src",E.attr("href")).attr("alt",E.find("img").attr(D.altText));var K=(D.em)?I.width*D.em+"em":I.width;var J=(D.em)?I.height*D.em+"em":I.height;H.css({width:K,height:J});switch(D.pos){case"offset":D.wrapperElement.animate({left:G.pageX+D.offsetX+"px",top:G.pageY+D.offsetY+"px",width:K},D.animationSpeed);break;case"auto":D.wrapperElement.animate({left:((A(document).width()-I.width)/2)+"px",width:K},D.animationSpeed);break;}F.animate({height:J},D.animationSpeed,function(){H.fadeIn(D.animationSpeed);D.wrapperElement.find("#ui-lightbox-description").text(E.find("img").attr(D.descText));if(D.imageArray){D.wrapperElement.find("#ui-lightbox-pager").text(D.pictureText+" "+(D.activeImage+1)+" "+D.ofText+" "+D.imageArray.length);}if(D.useDimmer){B._dimmerResize();}B._updateVitualBuffer();C.attr("aria-busy",false);B._trigger("onChangePicture",0);});I.onload=function(){};};I.src=E.attr("href");});},_setButtonState:function(){var B=this.options;B.buttonpane.find("#ui-lightbox-next, #ui-lightbox-prev").removeAttr("disabled").removeClass("ui-state-disabled").removeClass("ui-state-focus");switch(B.activeImage){case 0:B.buttonpane.find("#ui-lightbox-prev").attr("disabled","disabled").removeClass("ui-state-hover").addClass("ui-state-disabled");B.buttonpane.find("#ui-lightbox-next").focus();break;case B.imageArray.length-1:B.buttonpane.find("#ui-lightbox-next").attr("disabled","disabled").removeClass("ui-state-hover").addClass("ui-state-disabled");B.buttonpane.find("#ui-lightbox-prev").focus();break;}},close:function(){var C=this.options,B=this;A(C.clickedElement).parent().focus();C.wrapperElement.fadeOut(C.animationSpeed,function(){A(this).remove();});if(C.useDimmer){A("#ui-lightbox-screendimmer").fadeOut(C.animationSpeed,function(){A(this).remove();});}B._trigger("onClose",0);},prev:function(){var C=this.options,B=this;if(C.imageArray&&C.activeImage>0){C.activeImage=C.activeImage-1;B._changePicture(A(C.imageArray[C.activeImage]));B._setButtonState();B._trigger("onPrev",0);}},next:function(){var C=this.options,B=this;if(C.imageArray&&C.activeImage<(C.imageArray.length-1)){C.activeImage=C.activeImage+1;B._changePicture(A(C.imageArray[C.activeImage]));B._setButtonState();B._trigger("onNext",0);}},_lightboxCreate:function(){var C=this.options,B=this;var D='<div id="ui-lightbox-screendimmer" style="display: none;"></div>';A("body").append(D);A("#ui-lightbox-screendimmer").css({width:B._dimmerWidth(),height:B._dimmerHeight(),zIndex:C.zIndex,background:C.background,position:"absolute",top:"0px",left:"0px",opacity:C.opacity}).fadeIn(C.animationSpeed).click(function(){B.close();});},_dimmerResize:function(){var C=this;var E=A("#ui-lightbox-screendimmer");E.css({width:0,height:0});var D=C._pageScroll();var B=(D[0]==0)?C._dimmerWidth():D[0];E.css({width:B,height:C._dimmerHeight()});},_dimmerHeight:function(){if(A.browser.msie&&A.browser.version<7){var C=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);var B=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);if(C<B){return A(window).height()+"px";}else{return C+"px";}}else{return A(document).height()+"px";}},_dimmerWidth:function(){if(A.browser.msie&&A.browser.version<7){var B=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);var C=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);if(B<C){return A(window).width()+"px";}else{return B+"px";}}else{return A(document).width()+"px";}},_pageScroll:function(){var C,B;if(self.pageYOffset){B=self.pageYOffset;C=self.pageXOffset;}else{if(document.documentElement&&document.documentElement.scrollTop){B=document.documentElement.scrollTop;C=document.documentElement.scrollLeft;}else{if(document.body){B=document.body.scrollTop;C=document.body.scrollLeft;}}}arrayPageScroll=new Array(C,B);return arrayPageScroll;},_makeHover:function(B){B.bind("mouseenter",function(){A(this).addClass("ui-state-hover");}).bind("mouseleave",function(){A(this).removeClass("ui-state-hover");}).bind("focus",function(){A(this).addClass("ui-state-focus");}).bind("blur",function(){A(this).removeClass("ui-state-focus");});},_updateVitualBuffer:function(){var C=A("#virtualBufferForm");if(C.length){(C.val()=="1")?C.val("0"):C.val("1");}else{var B='<form><input id="virtualBufferForm" type="hidden" value="1" /></form>';A("body").append(B);}},destroy:function(){var B=this.options;this.element.unbind(".ariaLightbox").unbind("click").removeData("ariaLightbox");A("#virtualBufferForm").parent().remove();A("#ui-lightbox-screendimmer").remove();A("#ui-lightbox-wrapper").unbind("keydown").remove();}});A.extend(A.ui.ariaLightbox,{version:"1.7.1",defaults:{altText:"alt",descText:"titleText",prevText:"vorheriges Bild",nextText:"n?chtes Bild",titleText:"Lightbox",pictureText:"Bild",ofText:"von",closeText:"Schlie?en [ESC]",pos:"auto",autoHeight:50,offsetX:10,offsetY:10,useDimmer:true,animationSpeed:"slow",zIndex:1000,background:"black",opacity:0.8,em:0.0568182,activeImage:0}});})(jQuery);
