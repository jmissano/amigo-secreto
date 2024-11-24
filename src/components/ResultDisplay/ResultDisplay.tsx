interface ResultDisplayProps {
    results: Record<string, string> | null;
  }
  
  const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
    if (!results) {
      return <p>Nenhum resultado disponível.</p>;
    }
  
    return (
      <div>
        <h2>Resultados:</h2>
        <ul>
          {Object.entries(results).map(([participant, secretFriend]) => (
            <li key={participant}>
              {participant} tirou {secretFriend}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ResultDisplay;
  