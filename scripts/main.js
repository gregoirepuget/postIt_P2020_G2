$(document).ready(function(){
  
  var listePostIt = localStorage.getItem('listePostItLocal');
  if(listePostIt != null)
  {
    listePostIt= JSON.parse(listePostIt);
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
  
  }
  
  
  
});
  
  
