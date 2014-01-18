//  Generate Dynamic Style Guide (sg)
//  Developed by Brandon Brule

// Configurable Variables
// Common top level information element styles. eg H1 - ARIAL, HELVETICA - 32PX
var commonBrandingFont = 'arial,helvetica';
var commonBrandingFontSize = '1em';
var commonBrandingFontWeight = "200";
var commonBrandingTextTransform = "uppercase";
var commonBrandingSpacing = "0.25em";

//Divider Color and Size
var commonBrandingDividerSpacing = "3em";
var commonBrandingDividerColour = "#ececec";

// Container Widths
// Change container id and class name if there are any conflicts
// HTML elements container
var sgWrapperID = 'sg-wrapper';
var sgURLConstructorID = 'sg-url-constructor-container';

//
var sgMediaQuerySize = '55em';

var sgContainerElementID = 'sg-container';
var sgContainerElementWidth = '46.5%';
// Blog template container
var sgTemplateContainerID = 'sg-template';
var sgTemplateContainerWidth = '46.5%';
// Common branding and information element class
var sgComputedStylesClassName = ' computed-styles';

// HTML ELEMENTS
// Don't like Lorem Ipsum?  Change it.
// Array of Common HTML Elements and Filler Text
var defaultCommonElements = [
  {
    "el":"h1",
    "filler":"Sed ut perspiciatis unde omnis iste natus error aliquam quaerat voluptatemp"
  },
  {
    "el":"h2",
    "filler":"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam"
  },
  {
    "el":"h3",
    "filler":"Teius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi co"
  },
  {
    "el":"h4",
    "filler":"Sed ut perspiciatis unde omnis iste"
  },
  {
    "el":"h5",
    "filler":"Footer Nav Header"
  },
  {
    "el":"h6",
    "filler":"Teius modi tempora incidunt ut labore"
  },
  {
    "el":"h7",
    "filler":"test7"
  },
  {
    "el":"p",
    "filler":"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
  },
  {
  	"el":"blockquote",
  	"filler":"Dores culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus."
  }
];
// And the Default List Items
var listFillerText = [ 
	'At vero eos et accusamus et iusto odio dignissimos', 
	'Nam libero tempore, <a href="">nodeum soluta nobis</a> est eligendi optio cumque', 
	'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae' 
];

//	Get Element by Class Name Developed by Robert Nyman, http://www.robertnyman.com
//	Code/licensing: http://code.google.com/p/getelementsbyclassname/	
var getElementsByClassName=function(e,t,n){if(document.getElementsByClassName){getElementsByClassName=function(e,t,n){n=n||document;var r=n.getElementsByClassName(e),i=t?new RegExp("\\b"+t+"\\b","i"):null,s=[],o;for(var u=0,a=r.length;u<a;u+=1){o=r[u];if(!i||i.test(o.nodeName)){s.push(o)}}return s}}else if(document.evaluate){getElementsByClassName=function(e,t,n){t=t||"*";n=n||document;var r=e.split(" "),i="",s="http://www.w3.org/1999/xhtml",o=document.documentElement.namespaceURI===s?s:null,u=[],a,f;for(var l=0,c=r.length;l<c;l+=1){i+="[contains(concat(' ', @class, ' '), ' "+r[l]+" ')]"}try{a=document.evaluate(".//"+t+i,n,o,0,null)}catch(h){a=document.evaluate(".//"+t+i,n,null,0,null)}while(f=a.iterateNext()){u.push(f)}return u}}else{getElementsByClassName=function(e,t,n){t=t||"*";n=n||document;var r=e.split(" "),i=[],s=t==="*"&&n.all?n.all:n.getElementsByTagName(t),o,u=[],a;for(var f=0,l=r.length;f<l;f+=1){i.push(new RegExp("(^|\\s)"+r[f]+"(\\s|$)"))}for(var c=0,h=s.length;c<h;c+=1){o=s[c];a=false;for(var p=0,d=i.length;p<d;p+=1){a=i[p].test(o.className);if(!a){break}}if(a){u.push(o)}}return u}}return getElementsByClassName(e,t,n)}
//

// Generate All Style Guide Elements and Functions
function generateStyleguide() {

	// Get all the elements by class and seperate them.
	// Add Styles you want displayed here - getComputedStyles.
	function cssClassStylesGenerator(){
		for (var i=0; i<styleClass.length; i++) {
			classesSeperated = styleClass[i];
			sgElements = (classesSeperated).nextElementSibling;
		  	
		  sgElementType = sgElements.nodeName;
			sgFontFamily = window.getComputedStyle(sgElements).fontFamily;
			sgFontSize = window.getComputedStyle(sgElements).fontSize;
			sgFontWeight = window.getComputedStyle(sgElements).fontWeight;

			classesSeperated.innerHTML = sgElementType+" - "+sgFontFamily+" - "+sgFontSize+" - "+sgFontWeight;
		}
	}
	// Add Span, Span Contains Applied CSS Styles
	function addSpanStylesGenerated() {
		spanElement = document.createElement('span');
		spanElement.className = spanElement.className + sgComputedStylesClassName;
		spanElement.setAttribute(
			'style',
			'font-family:'+commonBrandingFont+';font-size:'+commonBrandingFontSize+';text-transform:'+commonBrandingTextTransform+';margin:'+commonBrandingSpacing+' 0;display:block;'
		);
		document.getElementById(sgContainerElementID).appendChild(spanElement);
	}
	// Seperator Line
	function addHrSeperator() {
		hrElement = document.createElement('hr');
		document.getElementById(sgContainerElementID).appendChild(hrElement);
		hrElement.setAttribute(
			'style',
			'margin:'+commonBrandingDividerSpacing+' 0;border:1px solid #'+commonBrandingDividerColour+';'
		);
	}

	//wrapper
	sgWrapperElement = document.createElement('div');
	sgWrapperElement.setAttribute(
			'style',
			'height:auto;width:auto;overflow:scroll;background-color: rgba(255, 255, 255, 0.95);padding:2em;'
		);
	sgWrapperElement.id = sgWrapperElement.id + sgWrapperID;
	document.body.appendChild(sgWrapperElement);

	// Common Typography Element Styles
	// Create Div that will contain sg Elements
	sgContainerElement = document.createElement('div');
	sgContainerElement.setAttribute(
			'style',
			'width:'+sgContainerElementWidth+';float:left;'
		);
	sgContainerElement.id = sgContainerElement.id + sgContainerElementID;
	document.getElementById(sgWrapperID).appendChild(sgContainerElement);
	
	// Create Elements, text, and span seperators for each element from the array.
	// element = defaultCommonElements[i].el;
	// fillerText = defaultCommonElements[i].filler;
	for(var i in defaultCommonElements){
		addSpanStylesGenerated();
		createElementType = document.createElement(defaultCommonElements[i].el);
		fillerText = document.createTextNode(defaultCommonElements[i].filler);
		createElementType.appendChild(fillerText);
		document.getElementById(sgContainerElementID).appendChild(createElementType);
		addHrSeperator();
	}

	//Create unordered and ordered lists seperately from defaultCommonElements array
	addSpanStylesGenerated();
	var unorderedListElement = document.createElement('ul');
	for (var i in listFillerText) {
	  var listItemElement = document.createElement('li');
	  listItemElement.innerHTML = listFillerText[i];
	  unorderedListElement.appendChild(listItemElement);
	  document.getElementById(sgContainerElementID).appendChild(unorderedListElement);
	}
	addHrSeperator();

	// Get span elements, run those elements through cssClassStyleGenerator function
	styleClass = getElementsByClassName(sgComputedStylesClassName);
	cssClassStylesGenerator();

	// Template Sample
	// Just a div with some place holder html elements.
	sgTemplateContainer = document.createElement('div');
	sgTemplateContainer.setAttribute(
		"style",
		'width:'+sgTemplateContainerWidth+';float:right;'
	);
	sgTemplateContainer.id = sgTemplateContainer.id + sgTemplateContainerID;
	document.getElementById(sgWrapperID).appendChild(sgTemplateContainer);
	sgTemplateContainer.innerHTML = '<h1>My First Blogpost In high definition.</h1><h2>Here I would further describe my ultra awesome internet article</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut <a href="http://www.startupottawa.com/?p=2139">http://www.startupottawa.com/?p=2139</a>aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit </p><blockquote>Dores culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</blockquote><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commod est lab <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit </p><h3>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commod est labo.</p><ul><li>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</li><li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</li><li>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</li><li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</li></ul><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit </p><h4>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h4><p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.</p><table summary="Table summary"><caption>Table Caption</caption><thead><tr><th>Header</th><th>Header</th><th>Header</th></tr></thead><tbody><tr><td>Content</td><td>1</td><td>a</td></tr><tr><td>Content</td><td>2</td><td>b</td></tr><tr><td>Content</td><td>3</td><td>c</td></tr><tr><td>Content</td><td>4</td><td>d</td></tr><tr><td>Content</td><td>5</td><td>e</td></tr><tr><td>Content</td><td>6</td><td>f</td></tr></tbody></table><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit </p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commod est labo.</p><ol><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Vestibulum auctor dapibus neque.</li></ol><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit </p><h3>Quis nostrud exercitation ullamco laboris nisi</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut <a href="http://www.startupottawa.com/?p=2139">http://www.startupottawa.com/?p=2139</a>aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit </p>';

	// Colour Pallett
	//Create unordered and ordered lists seperately from defaultCommonElements array
	// Colour Pallet Colours
	var sgColourPrimary = document.getElementById('sgColourPrimary').value;
	var sgColourSecondary = document.getElementById('sgColourSecondary').value;
	var sgColourTertiary = document.getElementById('sgColourTertiary').value;
	var sgColourFour = document.getElementById('sgColourFour').value;
	var sgColourFive = document.getElementById('sgColourFive').value;
	var sgColourSix = document.getElementById('sgColourSix').value;

	var sgColourContainer = document.createElement('ul');
	sgColourContainer.id = sgColourContainer.id + "sg-colour-pallet";
	sgColourContainer.setAttribute(
			'style',
			'list-style:none;padding:0;width:'+sgTemplateContainerWidth+';float:right;'
		);
	var sgColourInfo = [ 
		sgColourPrimary,
		sgColourSecondary, 
		sgColourTertiary, 
		sgColourFour,
		sgColourFive,
		sgColourSix 
		];

	for (var i in sgColourInfo) {
	  var listItemElement = document.createElement('li');
	  listItemElement.setAttribute(
	  		'style',
	  		'background:'+sgColourInfo[i]+';width:120px;height:120px;display:inline-block;margin:0.5%;text-align:center;position:relative;'
	  	)
	  sgColourContainer.appendChild(listItemElement);
	  document.getElementById(sgWrapperID).appendChild(sgColourContainer);

	  var listItemSpanElement = document.createElement('span');
	  listItemSpanElement.setAttribute(
	  		'style',
	  		'background-color: rgba(255, 255, 255, 0.75);color:#111;position:absolute;bottom:1em;right:1em;padding:1px 6px;'
	  	)
	  listItemSpanElement.innerHTML = sgColourInfo[i];
	  listItemElement.appendChild(listItemSpanElement);
	}

	if (matchMedia) {
		var mq = window.matchMedia('(min-width: '+sgMediaQuerySize+')');//64em = 1024px
		mq.addListener(WidthChange);
		WidthChange(mq);
	}
	// Set width based on screen size.
	function WidthChange(mq) {
		if (mq.matches) { // Larger then 1024
		  	sgContainerElement.setAttribute(
				'style',
				'width:'+sgContainerElementWidth+';float:left;'
			);
		  	sgTemplateContainer.setAttribute(
				"style",
				'width:'+sgTemplateContainerWidth+';float:right;'
			);
			sgColourContainer.setAttribute(
				'style',
				'list-style:none;padding:0;width:'+sgTemplateContainerWidth+';float:right;'
			);
	      return (true)
		}
		else {  //Smaller then 1024
	      	sgContainerElement.setAttribute(
				'style',
				'width:100%;float:none;'
			);
			sgTemplateContainer.setAttribute(
				'style',
				'width:100%;float:none;'
			);
			sgColourContainer.setAttribute(
				'style',
				'width:100%;float:none;padding:0;list-style:none;'
			);
	        return (false)
		}
	}

}

function sgResetStyleLink(){
	var sgStyleSheetLink = document.getElementById('sgStyleSheetLink');
	sgStyleSheetLink.parentNode.removeChild(sgStyleSheetLink);
}

function sgResetAll(){
	// Remove Stylesheet Link Element
	var sgStyleSheetLink = document.getElementById('sgStyleSheetLink');
	sgStyleSheetLink.parentNode.removeChild(sgStyleSheetLink);
	// Remove Styleguide
	var element = document.getElementById(sgWrapperID);
	element.parentNode.removeChild(element);
	generateStyleguide();
}
function sgRemoveSampleUrls(){
	if(!document.getElementById('sg-sample-urls')){
	    var sgSampleURLS = document.createElement('div');
	    sgSampleURLS.id = 'sg-sample-urls';
	    sgSampleURLS.innerHTML = 'http://css-tricks.com/ - <strong>CSS Tricks</strong><br>http://www.smashingmagazine.com/ - <strong>Smashing Magazine</strong><br>http://www.bv02.com/ - <strong>bv02</strong>';
	    document.getElementById('sg-url-constructor-container').appendChild(sgSampleURLS);
	    
	} else {
	    sgSampleUrlElement = document.getElementById('sg-sample-urls');
	    sgSampleUrlElement.parentNode.removeChild(sgSampleUrlElement);
	}
}
//Toggle text colour selction
// Force White Text Dark Background on Wrapper
document.getElementById('colorToggle').onclick = function() {
    var sgWrapper = document.getElementById('sg-wrapper');
    var className = ' ' + sgWrapper.className + ' ';
    if ( ~className.indexOf(' darkText ') ) {
        sgWrapper.className = className.replace(' darkText ', ' ');
    } else {
        sgWrapper.className += ' darkText';
    }              
}

window.onload = function () {
    generateStyleguide();

    //clear input on focus global function
	var inputs = document.getElementsByTagName("input"); 
	for (var i = 0; i < inputs.length; i++) {
	    var status = inputs[i].setAttribute(
		'onfocus',
		'this.value=""'
		);
	}
}