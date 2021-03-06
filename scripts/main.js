$(document).ready(function(){
  
  //localStorage.removeItem('listePostItLocal');
  
  var listePostIt = localStorage.getItem('listePostItLocal');
  if(listePostIt != null)
  {
    listePostIt= JSON.parse(listePostIt);
    
    for(var i=0; i< listePostIt.length; i++)
    {
      afficherPostIt(i); 
    }
    console.log(listePostIt);
  }
  else
  {
   listePostIt = new Array();
    console.log('local storage vide'); 
  }
  
  
  $(".addPostIt").on('click', function(e){
    e.preventDefault();
    ajouterPostIt();  
  });
  
  
  function ajouterPostIt()
  {
    var couleursPostIt=['#2ecc71', '#2980b9', '#e74c3c', '#9b59b6', '#f1c40f'];
    var posX=200;
    var posY=300;
    var content="Nouveau PostIt";
    
    var nombreAleatoire = getTirage(couleursPostIt.length);
    var couleur=couleursPostIt[nombreAleatoire];
    
    var infoPostIt={
      "posX" : posX,
      "posY" : posY,
      "content" : content,
      "couleur" : couleur    
    };
    //console.log(infoPostIt);
  
    listePostIt.push(infoPostIt);
    localStorage.setItem('listePostItLocal', JSON.stringify(listePostIt));
    
    afficherPostIt(listePostIt.length-1);
  }
    
  function getTirage(limit)
  {
    return Math.floor(Math.random()*limit);
  }
  
  
  function afficherPostIt(postIt_Id)
  {
     var content = '<div class="postick" data-key="'+ postIt_Id +'" style="left:'+listePostIt[postIt_Id].posX+'px; top:'+listePostIt[postIt_Id].posY+'px; background:'+listePostIt[postIt_Id].couleur+';">';
     content += '<div class="toolbar"><span class="delete">x</span></div>';
     content +=  '<div contenteditable="true" class="editable">'+listePostIt[postIt_Id].content+'</div>';
     content += '</div>';
     
     $("#content").append(content);
    
    $(".postick").draggable(
      {
        "cancel": '.editable',
        "zIndex": 3000,
        "stack" : '.postick',
        "stop" : function( event, ui ) { miseAJourPosition($(this)); }
      
      }
    );
    
    $(".editable").on('blur',function(){
      var postIt_Id= $(this).parent().attr("data-key");
      var content= $(this).html();
    
      listePostIt[postIt_Id].content=content;
      localStorage.setItem('listePostItLocal', JSON.stringify(listePostIt));
    });
    
  
  }
  
  function miseAJourPosition(element)
  {
    var postIt_Id=element.attr("data-key");
    var posX=element.position().left;
    var posY= element.position().top;
    
    listePostIt[postIt_Id].posX=posX;
    listePostIt[postIt_Id].posY=posY;
    localStorage.setItem('listePostItLocal', JSON.stringify(listePostIt));

  }
  
  
  
});
  







  
