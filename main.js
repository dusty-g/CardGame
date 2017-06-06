function Card(number){
    this.number = number
    this.src = this.number + ".png"
}

function Deck(){
    this.deck = []
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            this.deck.push(new Card(j))
        }
    }
    this.shuffle = () => {
		for(let i = 0; i < this.deck.length; i++){
			let j = Math.floor(Math.random()*this.deck.length)
			let temp = this.deck[i]
			this.deck[i] = this.deck[j]
			this.deck[j] = temp
		}
	}
}
let newDeck = new Deck()
newDeck.shuffle()
$(document).ready(function(){
        var player1Score;
        var player2Score;
        
        var clicked1;

        var clicked2;
        var player1Turn = true
        var firstClick = true
        var index = 0
        for(var row = 1; row < 5; row++){
            var rowDiv = $("<div></div>")
            for(var i = 0; i < 4; i++){
                rowDiv.append("<img id='"+index+"' src='rainbow.jpg' data-alt-src = '"+newDeck.deck[index].src+"' ></img>")
                index++
            }
            $("#board").append(rowDiv)
            
        }
        $("#nextPlayer")
        $('img').click(function(){
            if(player1Turn){
                if(firstClick){
                    toggleCard($(this))
                    clicked1 = $(this).attr("id")
                    firstClick = false
                }else{
                    if ($(this).attr("id") != clicked1){
                        toggleCard($(this))
                    
                        clicked2 = $(this).attr("id")
                        if($("#"+clicked1).attr("src") == $("#"+clicked2).attr("src")){
                            player1Score ++
                            $("#nextPlayer").css("visibility", "visible")
                            $("#"+clicked1+","+"#"+clicked2).css("visibility", "hidden")
                            
                        }else{

                        }
                        
                    }
                    
                    
                }
            }

                
        })
        
})
function toggleCard(el){
    let altSrc = el.data("alt-src")
    el.data("alt-src", el.attr('src'))
    el.attr("src", altSrc)
}
