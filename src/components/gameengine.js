//Game engine - calculating new position and detect collisions
export default function GameEngine(position) {

    let isEndGame = false;
    let newPosition = position;
    if(newPosition===8){
        newPosition=9;
    }else{
        newPosition=8;
    }

    return ({newPosition, isEndGame});
  
  }