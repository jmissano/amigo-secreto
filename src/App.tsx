import React, { useState, useEffect } from "react";
import InputForm from "./components/InputForm/InputForm";
import DrawButton from "./components/DrawButton/DrawButton";
import ResultDisplay from "./components/ResultDisplay/ResultDisplay";
import { drawNames } from "./utils/secretFriend";

const App: React.FC = () => {
  const [participants, setParticipants] = useState<string[]>([]); 
  const [remainingParticipants, setRemainingParticipants] = useState<string[]>([]); 
  const [userResults, setUserResults] = useState<Record<string, string>>({}); 
  const [userName, setUserName] = useState<string>(""); 
  const [isDrawing, setIsDrawing] = useState(false); 

  // Adiciona um participante na lista
  const handleAddParticipant = (name: string) => {
    if (!participants.includes(name)) {
      setParticipants((prev) => [...prev, name]);
      setRemainingParticipants((prev) => [...prev, name]);
    } else {
      alert("Esse nome já foi adicionado!");
    }
  };

  // Atualiza o nome do usuário
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  // Realiza o sorteio
  const handleDraw = () => {
    if (remainingParticipants.length < 2) {
      alert("Adicione pelo menos 2 participantes para realizar o sorteio!");
      return;
    }

    if (!userName || !participants.includes(userName)) {
      alert("Por favor, insira seu nome para realizar o sorteio.");
      return;
    }

    setIsDrawing(true);

    // Simula o sorteio e garante que a pessoa não tire a si mesma
    setTimeout(() => {
      let drawResult = drawNames(remainingParticipants);

      // Garantir que o usuário não tire a si mesmo
      if (drawResult[userName] === userName) {
        // Se o usuário tirar a si mesmo, sorteia novamente para ele
        while (drawResult[userName] === userName) {
          drawResult = drawNames(remainingParticipants);
        }
      }

      // Atualiza os resultados para o usuário
      setUserResults((prevResults) => ({
        ...prevResults,
        [userName]: drawResult[userName], // A pessoa vai ver quem ela tirou
      }));

      // Atualiza a lista de participantes restantes
      const updatedParticipants = remainingParticipants.filter(
        (name) => name !== drawResult[userName]
      );
      setRemainingParticipants(updatedParticipants);

      setIsDrawing(false);
    }, 2000); // Ajuste o tempo de sorteio (animação)
  };

  return (
    <div style={styles.container}>
      <h1>Amigo Secreto</h1>

      <div style={styles.participants}>
        <h2>Participantes:</h2>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
      </div>

      <div style={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={userName}
          onChange={handleUserNameChange}
        />
      </div>

      {/* Botão para realizar o sorteio */}
      <InputForm onAddParticipant={handleAddParticipant} />
      <DrawButton onClick={handleDraw} />

      {isDrawing ? (
        <p>Carregando o sorteio...</p>
      ) : (
        <ResultDisplay results={{ [userName]: userResults[userName] }} />
      )}
    </div>
  );
};

const styles: { container: React.CSSProperties; participants: React.CSSProperties; inputWrapper: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
  },
  participants: {
    marginBottom: "20px",
  },
  inputWrapper: {
    marginBottom: "20px",
  },
};

export default App;
