<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Generate Stylesheet</title>
	</head>
	<style>
	.darkText {
	    background-color: #212121!important;
	}
	</style>
	<body>
      	<?php
      	// If sgURLSearch Input has text in it then submit curl request.
        if (isset($_POST["sgURLSearch"]) && !empty($_POST["sgURLSearch"])) {

        	// SQL Injection Prevention.. but its not connected to a database so Im not sure.
            $url_input = stripslashes($_POST['sgURLSearch']);
            // cURL URL
            function file_get_contents_curl($url){
			    $ch = curl_init();
			    curl_setopt($ch, CURLOPT_HEADER, 0);
			    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			    curl_setopt($ch, CURLOPT_URL, $url);
			    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
			    $data = curl_exec($ch);
			    curl_close($ch);
			    return $data;
			}

			// Create new Object of Site DOM from cURL URL (sgURLSearch Input).
			$html = file_get_contents_curl("$url_input");
			$doc = new DOMDocument();
			@$doc->loadHTML($html);

			// The Title of Site
			$nodes = $doc->getElementsByTagName('title');
			$title = $nodes->item(0)->nodeValue;

			// Find all The Link Elements in DOM 
			$sgScrapeLinks = $doc->getElementsByTagName('link');
			echo "<script>"; //Open up JS to append new stylesheet links to head
			// Loop through all link elements
			for ($i = 0; $i < $sgScrapeLinks->length; $i++){
				//Seperate them into individual variables.
			    $sgScrapeSeperatedLinks = $sgScrapeLinks->item($i);
			    //If the link element has a rel of stylesheet (rel=stylesheet) then do the following.
			    if($sgScrapeSeperatedLinks->getAttribute('rel') == 'stylesheet'){
			    	$sgScrapeStylesheetURL = $sgScrapeSeperatedLinks->getAttribute('href'); 
			    	echo "var sgScrapperStyleSheetLinks = '$sgScrapeStylesheetURL';";
			    	echo "var sgCreateStyleLinkElement = document.createElement('link');";
			    	echo "sgCreateStyleLinkElement.setAttribute('href',''+sgScrapperStyleSheetLinks+'');";
			    	echo "sgCreateStyleLinkElement.setAttribute('rel','stylesheet');";
			    	echo "document.getElementsByTagName('head')[0].appendChild(sgCreateStyleLinkElement);";
			    }  
			}

	        echo "</script>"; // Close JS Script tag
	    };
      	?>
      	
        <div id="sg-url-constructor-container" style="font-size:14px;font-family:arial,helvetica;background:#fff;text-align:left;line-height:1.2;padding:1em;color:#111;">
	        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" onsubmit="sgResetAll();" method="post">
		        <input name="sgURLSearch" id="sgURLSearch" style="width:50%; padding:1px 6px;border:1px solid #ccc;margin:0;" placeholder="Paste link to website" type="text">
		        <input type="color" name="sgColourPrimary" id="sgColourPrimary" style="width:50px;padding:1px 6px;border:1px solid #ccc;" value="#eeeeee" type="text" >
		        <input type="color" name="sgColourSecondary" id="sgColourSecondary" style="width:50px;padding:1px 6px;border:1px solid #ccc;" value="#cccccc" type="text" >
		        <input type="color" name="sgColourTertiary" id="sgColourTertiary" style="width:50px;padding:1px 6px;border:1px solid #ccc;" value="#dddddd" type="text" >
		        <input type="color" name="sgColourFour" id="sgColourFour" style="width:50px;padding:1px 6px;border:1px solid #ccc;" value="#999999" type="text" >
		        <input type="color" name="sgColourFive" id="sgColourFive" style="width:50px;padding:1px 6px;border:1px solid #ccc;" value="#666666" type="text" >
		        <input type="color" name="sgColourSix" id="sgColourSix" style="width:50px;padding:1px 6px;border:1px solid #ccc;" value="#333333" type="text" ><br>
		        <strong>Sample Urls</strong>
		        <input style="padding: 1px 6px;" type="button" onclick="sgRemoveSampleUrls()" value="hide">
		        <input type="button" value="White Text?" id="colorToggle" style="padding:2px 6px;background:#212121;color:#fff;font-size:11px;"><br>
		        <div id="sg-sample-urls">
		        	http://paulirish.com/ - <strong>Paul Irish</strong><br>
		        	http://css-tricks.com/ - <strong>CSS Tricks</strong><br>
		        	http://bradfrostweb.com/ - <strong>Brad Frost</strong><br>
		        	http://www.lukew.com/ - <strong>Luke Wroblewski</strong><br>
		        	http://www.bv02.com/ - <strong>bv02</strong>
		        </div>
		        <input type="submit" style="visibility:hidden;height:0;padding:0;margin:0;">
      		</form>
      	</div>
      	<span style="color:#111;background:#eee;font-size:1.25em;font-family:arial,helvetica;display:block;padding:0.25em 1em;">
      		<?php
      			echo " $title - <a href='".$url_input."' target='_blank'>".$url_input."</a>";
			?>
		</span>
      <script src="js/index.js" type="text/javascript"></script>
	</body>
</html>
