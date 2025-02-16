import React from "react";

type ErrorPageProps = {
  error: Error;
};

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Falha ao carregar recurso</h1>
      <p className="text-red-500">
        {error.message}
      </p>
    </div>
  );
};

export default ErrorPage;
