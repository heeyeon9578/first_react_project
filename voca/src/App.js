import './App.css';
import Hello from './component/Hello';
import Welcome from './component/Welcome';
import styles from "./App.module.css";

function App() {
  const name="heeyeon";
  const naver={
    name:"네이버",
    url:"https://naver.com",
  };
  return (
    <div className="App">
      <Hello/>
      <Welcome></Welcome>
      <div className={styles.box}>App</div>
      <h1 style={{
        color: '#f0f', // 글자 색상을 자홍색으로 설정
        backgroundColor: 'green', // 배경색을 초록색으로 설정
      }}>
        Hello, {name}.<p>{naver.name}</p>
      </h1>
      <a href={naver.url}>{naver.name}</a>
    </div>
  );
}

export default App;
