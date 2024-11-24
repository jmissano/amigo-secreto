export function drawNames(participants: string[]): Record<string, string> {
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const result: Record<string, string> = {};
  
    for (let i = 0; i < participants.length; i++) {
      result[participants[i]] = shuffled[(i + 1) % participants.length];
    }
  
    return result;
  }
  