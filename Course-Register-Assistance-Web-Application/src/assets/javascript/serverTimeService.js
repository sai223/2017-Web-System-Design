var serverTimeServiceObject = (function(){
  return {
    getServerTime: function() {
      console.log("1-");
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
      xmlHttp.open('HEAD', window.location.href.toString(), false);
      xmlHttp.setRequestHeader('Content-Type', 'text/html');
      xmlHttp.send('');
      return xmlHttp.getResponseHeader('Date');
    }
  }
})(serverTimeServiceObject||{})
