//Game engine - calculating new position and detect collisions
export default function GameEngine(position, board) {

    let isEndGame = false;
    let newPosition = position;
    if(newPosition===13){
        newPosition=14;
    }else{
        newPosition=13;
    }

    return ({newPosition, isEndGame});
  
  }