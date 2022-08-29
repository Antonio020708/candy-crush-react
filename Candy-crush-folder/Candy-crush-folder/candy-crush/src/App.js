/* ALL MY FUNCTION NAMES HAVE BEEN DECLARED BEING AS DESCRIPTIVE AS POSSIBLE , NAMES OF FUNCTIONS STATE THE FUNCTIONALITY OF WHICH IS BEING CARRIED OUT */

import React, {useState, useEffect} from 'react';
import ScoreBoard from './components/Scores';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './index.css';
import candyOne from './images/candyOne.png';
import candyTwo from './images/candyTwo.png';
import candyThree from './images/candyThree.png';
import candyFour from './images/candyFour.png';
import candyFive from './images/candyFive.png';
import candySix from './images/candySix.png';
import blank from './images/blank.png'


const width = 8

/* Below in the list I have used the images inside images folder in the array */

const candyColors = [

  candyOne,
  candyTwo,
  candyThree,
  candyFour,
  candyFive,
  candySix
]


const App = () => {

  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [ squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [ squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [ scoreDisplay , setScoreDisplay] = useState(0)
 

  /* Below is a arrow function which checks for columns of 4 in the board  */

  const checkForColumnOfFour = () => {

    for ( let i = 0; i <= 39; i++ ){

      const columnOfFour = [i , i + width , i + width * 2 , i + width * 3 ]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if( columnOfFour.every( square => currentColorArrangement[square] === decidedColor && !isBlank )){
        setScoreDisplay((score) => score + 4 ) // If there is a match using column of 4 , 4 points will be added 
        columnOfFour.forEach( square => currentColorArrangement[square] = blank )
        return true

      }
    }
  }

  /* End of CheckForColumnOfFour function */


   /* Below is a arrow function which checks for rows of 4 in the board  */

  const checkForRowOfFour = () => {

    for ( let i = 0; i < 64 ; i++ ){

      const rowOfFour = [ i , i + 1 , i + 2 , i + 3 ]
      const decidedColor = currentColorArrangement[i]
      const notValid = [ 5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64 ]
      const isBlank = currentColorArrangement[i] === blank

      if( notValid.includes(i) ) continue

      if( rowOfFour.every( square => currentColorArrangement[square] === decidedColor && !isBlank )){
        setScoreDisplay((score) => score + 4 ) // If there is a match using row of 4 , 4 points will be added 
        rowOfFour.forEach( square => currentColorArrangement[square] =blank)
        return true

      }
    }
  }
  /* End of CheckForRowOfFour function */


   /* Below is a arrow function which checks for columns of 3 in the board  */

  const checkForColumnOfThree = () => {

    for ( let i = 0; i <= 47; i++ ){

      const columnOfThree = [ i , i + width , i + width * 2 ]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if( columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank )){
        setScoreDisplay((score) => score + 3 ) // If there is a match using column of 3 , 3 points will be added 
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true


      }
    }
  }

    /* End of checkForColumnOfThree function */


    /* Below is a arrow function which checks for rows of 3 in the board  */
  const checkForRowOfThree = () => {

    for ( let i = 0; i < 64 ; i++ ){

      const rowOfThree = [i , i + 1 , i + 2 ]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
      const isBlank = currentColorArrangement[i] === blank

      if(notValid.includes(i)) continue

      if( rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank )){
        setScoreDisplay((score) => score + 3 )
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true

      }
    }
  }

  /* End of checkForRowsOfThree function */


  /* Function of moveIntoSquareBelow allows for candies to fill up blank spaces on the board  */
  const moveIntoSquareBelow = () => {
    for(let i = 0; i <= 55; i++){
      const firstRow = [ 0,1,2,3,4,5,6,7 ]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangement[i] === blank){

      let randomNumber =  Math.floor(Math.random() * candyColors.length)
      currentColorArrangement[i] = candyColors[randomNumber]
      }

      if((currentColorArrangement[i + width]) === blank){

        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }

    }
  }

  /* End of moveIntoSquareBelow function*/

  const dragStart = (e) => {

    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e) => {

    setSquareBeingReplaced(e.target)
  }

  const dragEnd = () => {

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    const validMoves = [ 

      squareBeingDraggedId -1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1, 
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if(squareBeingReplacedId && validMove && ( isAColumnOfFour || isARowOfFour || isARowOfThree || isAColumnOfThree )){

      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else{

      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentColorArrangement([...currentColorArrangement])

    }
  }


  /* Below the createBoard function has been created which uses Math.floor and Math.random to randomize everything */

  const createBoard = () => {

    const randomColorArrangement = []

    for( let i=0; i < width*width; i++){

      const randomColor = candyColors[ Math.floor( Math.random() * candyColors.length) ]
      randomColorArrangement.push(randomColor)

    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  useEffect(() => {

    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100) 

    return () => clearInterval(timer)

  } , [checkForColumnOfFour ,checkForRowOfFour, checkForColumnOfThree ,checkForRowOfThree , moveIntoSquareBelow , currentColorArrangement] )


  const Restart = () => {

    alert(' Game restarting ')
    window.location.reload()

  }

  let maxScore = 150

  if ( scoreDisplay >= maxScore ){

      alert('You have passed the level')
      window.location.reload()

     }
  

  return (

    <div className = 'app'>
      <div className = 'game'>

        {currentColorArrangement.map((candyColor , index)=> ( <img 
    
        key = { index }
        src = { candyColor }
        alt = { candyColor }
        data-id = { index }
        draggable = { true }
        onDragStart = { dragStart }
        onDragOver = { (e) => e.preventDefault() }
        onDragEnter =  { (e) => e.preventDefault() }
        onDragLeave = { (e) => e.preventDefault() }
        onDrop = { dragDrop }
        onDragEnd = { dragEnd }

        />

        ))}

      </div>

<Card  id = 'card-score-card'  style={{ width: '18rem' , backgroundColor: 'rgb(240, 240, 255)'}}>

     <h1 className = 'score-title'>
      YOUR SCORE
     </h1>

      <h2 className = 'score-text'>
      <ScoreBoard score = {scoreDisplay + '/' + maxScore} />
      </h2>

      <Card.Body>

        <Card.Text id = 'card-text'>
          Match 3 or 4 of the same candies by dragging it to increase your score
        </Card.Text>

        <Button id = 'card-button' onClick = { Restart }> Restart Game </Button>
      </Card.Body>

    </Card>
    </div>
  )
}

export default App;