import "./App.css";
import styled from "styled-components";

const Bird = styled.div`
  position: absolute;
  background-color: red;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  top: ${(props) => props.size}px;
  border-radius: 50%;
`;

function App() {
  return (
    <div className="App">
      <Bird></Bird>flappy game
    </div>
  );
}

export default App;
