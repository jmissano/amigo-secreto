import React, { useState } from "react";

interface InputFormProps {
  onAddParticipant: (name: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onAddParticipant }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddParticipant(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o nome"
      />
      <button type="submit">Adicionar Participante</button>
    </form>
  );
};

export default InputForm;
