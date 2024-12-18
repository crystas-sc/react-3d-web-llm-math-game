// Math utility functions
export function generateQuestion(level: number): {
  question: string[];
  answer: number;
} {
  const operations = ['+', '-', '*'];
  const opSize = operations.length; 
  const operation = operations[Math.floor(Math.random() * 10) %opSize];
  
  const num1 = Math.floor(Math.random() * 10**level) + 1;
  const num2 = Math.floor(Math.random() * 10**level) + 1;
  
  let answer: number;
  switch (operation) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    case '/':
      answer = num1 / num2;
      break;
    default:
      answer = 0;
  }
  
  return {
    question: [num1+"", operation, num2+""], //`${num1} ${operation} ${num2}`,
    answer
  };
}