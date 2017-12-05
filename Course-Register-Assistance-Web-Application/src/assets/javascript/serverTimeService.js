var serverTimeServiceObject = (function(){
  return {
    getServerTime: function() {
      var xmxlHttp;
      try{
        xmlHttp = new XMLHttpRequest();
      }catch(err1){
        try{
          xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        }catch(err2){
          try{
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
          }catch(err3){
            alert('AJAX not supported!');
          }
        }
      }
      var origin = window.location.href;
      window.location.href = 'http://sugang.ajou.ac.kr';
      xmlHttp.open('HEAD', window.location.href.toString(), false);
      xmlHttp.setRequestHeader('Content-Type', 'text/html');
      xmlHttp.send('');
      window.location.href = origin;
      return xmlHttp.getResponseHeader('Date');
    }
  }
})(serverTimeServiceObject||{})
