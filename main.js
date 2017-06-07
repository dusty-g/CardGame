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

var player1Score = 0
var player2Score = 0

var clicked1;

var clicked2;
var player1Turn = true
var clickCount =0
var index = 0
$(document).ready(function(){
    
    newGame()
        
        $("#nextPlayer").click(function(){
            if($("#"+clicked1).attr("src") == $("#"+clicked2).attr("src")){
                (player1Turn) ? player1Score ++ : player2Score++;
                
                $("#"+clicked1+","+"#"+clicked2).css("visibility", "hidden")

            }else{
                toggleCard($("#"+clicked1))
                toggleCard($("#"+clicked2))
                player1Turn = !player1Turn
            }

            if (player1Turn){
                $("h1").text("Player 1's Turn")
            }else{
                $("h1").text("Player 2's Turn")
            }
            clickCount = 0
            console.log(player1Score, player2Score)
            $(this).css("visibility", "hidden")
            if(player1Score + player2Score == 8){
                if (player1Score > player2Score){
                    $("h1").text("Player 1 wins")
                    
                }
                else if (player2Score > player1Score){
                    $("h1").text("Player 2 wins")
                }else{
                    $("h1").text("Tie")
                }
                $("h1").append("<button id = 'newGame'>New Game</button>")

                $("#newGame").click(function(){
                    newGame()

                })
            }
        })
        
        
})

function newGame(){
    newDeck.shuffle()
    $("#board").empty()
    $("h1").text("Player 1's Turn")
    player1Score = 0
    player2Score = 0




    player1Turn = true
    clickCount =0
    index = 0
    for(var row = 1; row < 5; row++){
        var rowDiv = $("<div></div>")
        for(var i = 0; i < 4; i++){
            rowDiv.append("<img id='"+index+"' src='rainbow.jpg' data-alt-src = '"+newDeck.deck[index].src+"' ></img>")
            index++
        }
        $("#board").append(rowDiv)

    }
    $('img').click(function(){

                if(clickCount == 0){
                    toggleCard($(this))
                    clicked1 = $(this).attr("id")
                    clickCount ++
                }else if(clickCount==1){
                    if ($(this).attr("id") != clicked1){
                        toggleCard($(this))
                        clicked2 = $(this).attr("id")
                        $("#nextPlayer").css("visibility", "visible")
                        clickCount++
                    }
                    
                    
                }

            

                
        })
}
function toggleCard(el){
    let altSrc = el.data("alt-src")
    el.data("alt-src", el.attr('src'))
    el.attr("src", altSrc)
}
