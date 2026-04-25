import Card from './components/Card/Card'
import MainContainer from './components/MainContainer/MainContainer'
import './App.css'
import DrawCardButton from './components/DrawCardButton/DrawCardButton'



function App() {
  return (
    <>
    <MainContainer>
      <Card />
      <Card />
      <DrawCardButton />
    </MainContainer>
    </>
  )
}

export default App
