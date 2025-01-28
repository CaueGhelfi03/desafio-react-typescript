import { useState } from 'react'
import './App.css'

interface Dot{
  clientX: number;
  clientY: number;
}


function App() {

  const [list, setList] = useState<Dot[]>([]);
  const [undid, setUndid] = useState<Dot[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
    
    const newDot: Dot = {
      clientX: event.clientX,
      clientY: event.clientY,
    }
    console.log(newDot);
    setList((prev) => [...prev, newDot]);
  };

  const handleRedo = (event: React.MouseEvent) =>{
      event.stopPropagation();

      const recoveredDot = undid[undid.length - 1];
      setUndid((prev) =>  {
        const newArr = [...prev].slice(0,-1);
        return newArr;
      });

      setList((prev) => [...prev,recoveredDot]);
  }


  const handleUndo = (event: React.MouseEvent) =>{
      event.stopPropagation();

      if(list.length === 0){
        return;
      }

      const lastItem = list[list.length - 1];

      setUndid((prev) => [...prev,lastItem]);

      setList((prev: Dot[] ) => {
        const newArr = [...prev].slice(0,-1);
        return newArr;
      })
  }

  return (
    <>
      <div id="page" onClick={handleClick}>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>ReDo</button>
        {list.map((item, index) => 
          <span 
            key={index}
            className="dot"
            style={{
                left: item.clientX,
                top: item.clientY,
                position: 'absolute',
                borderRadius: "20px",
                }}
          />
        )}
      </div>
    </>
  )
}

export default App
