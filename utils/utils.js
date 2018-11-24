exports.numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

exports.getFormatDate = function(date){
    var year = date.getFullYear();                  //yyyy
    var month = (1 + date.getMonth());              //M
    month = month >= 10 ? month : '0' + month;      // month 두자리로 저장
    var day = date.getDate();                       //d
    day = day >= 10 ? day : '0' + day;              //day 두자리로 저장
    return  year + '-' + month + '-' + day;
}

exports.byteConvertor = function (bytes) {
	bytes = parseInt(bytes);
	var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	var e = Math.floor(Math.log(bytes)/Math.log(1024));
	if(e == "-Infinity") return "0 "+s[0];
	else return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
}

function removeHTML(text){
    text = text.replace(/<p[^>]*>/g, "\n");
    text = text.replace(/<br[^>]*>/g, "\n");

    // console.log(text);
    text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");

    return text;
}