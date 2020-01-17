

class Game {

 constructor(){

     this.scores = [0,0]
     this.roundScore = 0
     this.activePlayer = 0
     this.gamePlaying = true

     this.winningScore = 100

     this.name = false
     this.playerNames = []
//============Calculation Variables==============================
     this.cardDraws = [0,0,0] // all card draws total
     this.doubleSix = [0,0,0] // number of times back to back sixes were rolled
     this.totalRoundDraws = [0,0,0] // total cards taken in one round
     this.one = 0 // if a 1 was rolled
     this.roundDraws=[0,0,0] // array holding all draws per round for the game
     this.roundTurnTotal = 0 // total turns per round
     this.holdsAverageTurns =[] //array holding round turns before hold is pressed
     this.totalGamesEver = 0 // done
     this.totalGamesEverWon = 0 // done
     this.totalGamesEverLost = this.totalGamesEverWon //
     this.roundPointsLost = 0
     this.pointResetDoubleSix = 0
     this.gamePointsLostTotal = 0
     this.pointsBeforeHold = 0
     this.highestPointStreak = 0

     this.initBindingsAndEventListeners()
     this.getPlayerData()


 }



  initBindingsAndEventListeners(){

        this.nameInput = document.querySelector('.new-player')
        this.submitPlayerName = document.querySelector('.new-player-submit')
        this.submitPlayerName.addEventListener('click',this.handleSubmitPlayerName)
        this.player1name = document.getElementById('name-0')
        this.player2name = document.getElementById('name-1')
        this.roll = document.querySelector('.btn-roll').addEventListener('click', this.handleBtnRoll)
        this.diceDOm = document.querySelector('.dice')
        this.finalScore = document.querySelector('.final-score')
        this.btnHold = document.querySelector('.btn-hold').addEventListener('click', this.handleBtnHold)
        this.init = document.querySelector('.btn-new').addEventListener('click', this.handleNewGame)
        this.diceDOmNum = document.querySelector('.dice-DOm')
        this.diceDOmNum.style.display = 'none'



  }

    handleSubmitPlayerName = () => {


        if (this.name === false){
        this.player1 = new Player(this.nameInput.value)
          this.postPlayer(this.player1)
        this.player1name.textContent = this.player1.name
        this.name = true
        this.nameInput.placeholder='Enter Player 2 name'
        this.nameInput.value = '';

      } else if (this.name === true) {
        this.player2 = new Player(this.nameInput.value)
            this.postPlayer(this.player2)
        this.player2name.textContent = this.player2.name
        this.nameInput.placeholder='May you be a champion!'
        this.nameInput.value = ''
        document.querySelector('.new-player-submit').style.display = 'none'

      }

console.log(this.playerData)

          // this.playerNames.push()
    }

    handleBtnRoll = () => {
        this.cardDraws[this.activePlayer]++
        this.cardDraws[2]++

        if(this.gamePlaying){
          this.totalGamesEver++
          let dice = Math.floor((Math.random()) * 6) + 1
              this.diceDOm.style.display = 'block'
              this.diceDOmNum.style.display = 'block'
              this.diceDOm.src = `dice/${dice}` + '.gif'
              this.diceDOmNum.src = `dice/${dice}` +'.png'


                if (dice === 6 && this.lastDice === 6){
                  console.log("TWO SIXES!!!!");
                  this.arrayUpdate(this.totalRoundDraws)
                  // this.totalRoundDraws[this.activePlayer]++
                  // this.totalRoundDraws[2]++
                  console.log("Round Draw Total " + this.totalRoundDraws);
                  this.doubleSix[this.activePlayer]++
                  this.doubleSix[2]++
                  console.log("Double Six " + this.doubleSix);
                  this.scores[this.activePlayer] = 0
                      document.querySelector('#score-' + this.activePlayer).textContent = this.scores[this.activePlayer]
                  this.nextPlayer()
                  this.diceDOm.style.display = 'block'
                  this.diceDOm.src = 'dice/dice-1.gif'
                  this.diceDOmNum.style.display = 'block'
                  this.diceDOmNum.src = 'dice/1.png'

                } else if(dice !== 1) {
                  this.arrayUpdate(this.totalRoundDraws)

                  // this.totalRoundDraws[this.activePlayer]++
                  // this.totalRoundDraws[2]++
                  this.roundScore += dice;
                  document.querySelector("#current-" + this.activePlayer).textContent = this.roundScore
                } else {
                  this.arrayUpdate(this.totalRoundDraws)
                  // this.totalRoundDraws[this.activePlayer]++
                  // this.totalRoundDraws[2]++
                  this.one++
                  this.nextPlayer()
                  this.diceDOm.style.display = 'block'

                  this.diceDOm.src = 'dice/6-2.gif'

                }
                    this.lastDice = dice

                    let input = this.finalScore.value

                    if(input){
                      this.winningScore = input
                    } else {
                      this.winningScore
                    }

            }

            this.finalScore.placeholder=`First to reach ${this.winningScore} wins!`
            this.finalScore.value = ""
    }

    arrayUpdate = (something) => {
        something[this.activePlayer]++
        something[2]++
        debugger
    }

  nextPlayer() {
    this.roundTurnTotal++
    console.log("Total Number of Rounds " + this.roundTurnTotal );
    console.log("1 Draw Total " + this.one)
    console.log("Game Draw total " + this.cardDraws);
    console.log("Round Draw Total " + this.totalRoundDraws);
    this.roundDraws.push(this.totalRoundDraws)
    console.log("Round Draws Average "+ this.roundDraws.reduce((a,b) => a + b, 0) / this.roundDraws.length)
    this.totalRoundDraws = 0
    this.activePlayer === 0 ? this.activePlayer = 1 : this.activePlayer = 0;
    this.roundScore = 0
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    this.diceDOm.style.display = 'none'
  }

  getPlayerData(){
    return fetch('http://localhost:3000/api/v1/players/')
      .then(res => res.json())
      .then(playerData => {
        this.playerData = playerData

      })
  }

postPlayer(player){
  fetch('http://localhost:3000/api/v1/players/',{
      method: 'POST',
      headers: {'Content-Type': 'application/json',
      Accept: "application/json"
    },
      body: JSON.stringify({
        'name': player.name
      })
  })
  .then(response => response.json())
  // .then((player_obj) => {
  //   let new_player = player_obj
    console.log('Success:', player.name)
    }


handleBtnHold = () => {
  this.holdsAverageTurns.push(this.totalRoundDraws)

  console.log("Average turns before holding " + this.holdsAverageTurns.reduce((a,b) => a + b, 0) / this.holdsAverageTurns.length)
        if (this.gamePlaying){
          this.scores[this.activePlayer] += this.roundScore

          document.querySelector('#score-' + this.activePlayer).textContent = this.scores[this.activePlayer]
          this.diceDOm.style.display = 'none'
          this.diceDOmNum.style.display = 'none'


          if (this.scores[this.activePlayer] >= this.winningScore ) {
            document.querySelector('#name-' + this.activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + this.activePlayer + '-panel').classList.add('winner')
            this.totalGamesEverWon++
            document.querySelector('.player-' + this.activePlayer + '-panel').classList.remove('active')

            this.gamePlaying = false
            this.diceDOm.style.display = 'block'
            this.diceDOm.src = 'champ.gif'


          } else {
              this.nextPlayer()
              this.diceDOm.style.display = 'block'
              this.diceDOm.src = 'other-graveyard.png'

            }
          }



        }

                handleNewGame = () => {
                            this.name = false
                            this.scores = [0,0];
                            this.roundScore = 0;
                            this.activePlayer = 0;
                            this.gamePlaying = true
                            this.winningScore = 100
                            this.finalScore.placeholder="Final Score (Default 100)"
                            this.finalScore.value = ""
                            this.diceDOm.style.display = 'none'
                            this.diceDOmNum.style.display = 'none'
                            document.getElementById('score-0').textContent = '0'
                            document.getElementById('score-1').textContent = '0'
                            document.getElementById('current-0').textContent = '0'
                            document.getElementById('current-1').textContent = '0'
                            document.getElementById('name-0').textContent = 'Player 1'
                            document.getElementById('name-1').textContent = 'Player 2'
                            document.querySelector('.player-0-panel').classList.remove('winner')
                            document.querySelector('.player-1-panel').classList.remove('winner')
                            document.querySelector('.player-1-panel').classList.remove('active')
                            document.querySelector('.player-0-panel').classList.add('active')
                            document.querySelector('.new-player-submit').style.display = 'block'
                            document.querySelector('.new-player').placeholder='Enter Player1 name'
                            this.diceDOm.style.display = 'block'
                            this.diceDOm.src = 'other-graveyard.png'

                          }



}


// let player1name, player2name, scores, roundScore, activePlayer,i, gamePlaying, lastDice, winningScore = 100
// let diceDOm = document.querySelector('.dice')
// let name = false
// let playerArray = []//done
//
// let playerRolls = [[],[]]
// let averageRollsPerTurn = [[],[]]
// let averageRoundScore = [[],[]]
// let gameWinner = []
