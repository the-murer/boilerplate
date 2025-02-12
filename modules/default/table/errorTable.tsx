import React from 'react'

const ErrorTable = ({ error }: { error: any }) => {
  return (
    <div>
      <p>Ocorreu um erro ao carregar os dados</p>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorTable