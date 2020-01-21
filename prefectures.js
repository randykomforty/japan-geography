var checkNumber = "";
var municipality = "";
var randomNumber = "";
function getWiki() {
	var municipalities = [
		["Fukuoka", "<ruby><rb>福</rb><rt>ふく</rt><rb>岡</rb><rt>おか</rt><rb>県</rb><rt>けん</rt></ruby>", "福岡県", "ɸɯ̟ᵝkɯ̟ᵝo̞ka̠"],
		["Kagoshima", "<ruby><rb>鹿</rb><rt>か</rt><rb>児</rb><rt>ご</rt><rb>島</rb><rt>しま</rt><rb>県</rb><rt>けん</rt></ruby>", "鹿児島県", "ka̠ɡo̞ɕima̠"],
		["Okinawa", "<ruby><rb>沖</rb><rt>おき</rt><rb>縄</rb><rt>なわ</rt><rb>県</rb><rt>けん</rt></ruby>", "沖縄県", "o̞kʲina̠ɰᵝa̠"],
		["Kumamoto", "<ruby><rb>熊</rb><rt>くま</rt><rb>本</rb><rt>もと</rt><rb>県</rb><rt>けん</rt></ruby>", "熊本県", "kɯ̟ᵝma̠mo̞to̞"],
		["Nagasaki", "<ruby><rb>長</rb><rt>なが</rt><rb>崎</rb><rt>さき</rt><rb>県</rb><rt>けん</rt></ruby>", "長崎県", "na̠ɡa̠sa̠kʲi"],
		["Miyazaki", "<ruby><rb>宮</rb><rt>みや</rt><rb>崎</rb><rt>ざき</rt><rb>県</rb><rt>けん</rt></ruby>", "宮崎県", "mʲija̠za̠kʲi"],
		["Ōita", "<ruby><rb>大</rb><rt>おお</rt><rb>分</rb><rt>いた</rt><rb>県</rb><rt>けん</rt></ruby>", "大分県", "o̞ːita̠"],
		["Saga", "<ruby><rb>佐</rb><rt>さ</rt><rb>賀</rb><rt>が</rt><rb>県</rb><rt>けん</rt></ruby>", "佐賀県", "sa̠ɡa̠"]
	];
	while (checkNumber == randomNumber) {
		randomNumber = Math.floor(Math.random() * municipalities.length);
		continue;
	}
	checkNumber = randomNumber;
	municipality = municipalities[randomNumber];
	var imgURL = "http://randy.addictivecode.org/Japan%20Geography/" + municipality[0] + "-ken.png";
	var baseURL = "https://en.wikipedia.org/w/api.php?origin=*";
	var params = [
		"&action=query",
		"&titles=" + municipality[0] + " " + "Prefecture",
		"&format=json",
		"&prop=extracts",
		"&exintro",
		"&explaintext",
		"&amp;section=1",
		"&redirects=1"
	];
	for (var i = 0; i < params.length; i++) {
		baseURL += params[i];
	}
	var xhr = new XMLHttpRequest();
	xhr.open('GET', baseURL, true);
	xhr.onload = function() {
		var data = JSON.parse(this.response);
		var text = data.query.pages[Object.keys(data.query.pages)[0]].extract;
		var replace = text.replace(municipality[2], "<span class=\"jp\">" + municipality[2] + "</span>, IPA: <span class=\"ipa\">" + municipality[3] + "</span>");
		//replace = replace.replace(/\../g, ".<br /><br />");
		document.getElementById("island-map").style.display = "none";
		document.getElementById("left-side").style.overflowY = "visible";
		document.getElementById("intro").style.display = "none";
		document.getElementById("right-side").getElementsByTagName("p")[0].innerHTML = replace;
		document.getElementById("right-side").style.overflowY = "auto";
		document.getElementById("prefecture-map").src = imgURL;
		document.getElementsByTagName("h1")[0].style.paddingTop = "20px";
		document.getElementsByTagName("h1")[0].style.fontFamily = "Kosugi Maru";
		document.getElementsByTagName("h1")[0].innerHTML = municipality[1];
	}
	xhr.send();
}
