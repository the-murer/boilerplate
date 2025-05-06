import React from "react";

type ErrorViewProps = {
  error: Error | string;
};

const ErrorView = ({ error }: ErrorViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Falha ao carregar recurso</h1>
      <p className="text-red-500">
        {typeof error === "string" ? error : error.message}
      </p>
    </div>
  );
};

export default ErrorView;
