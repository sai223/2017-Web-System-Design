var copyServiceObject = (function(){
  return {
    copyFunc: function(no){
      var id = 'copy-' + no;
      var copyData = document.getElementById(id);
      copyData.select();
      document.execCommand("Copy");
    }
  }
})(copyServiceObject||{})
