import React from "react";

type NotFoundPageProps = {
  message: string;
};

const NotFoundPage = ({ message }: NotFoundPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Recurso não encontrado</h1>
      <p className="text-red-500">{message}</p>
    </div>
  );
};

export default NotFoundPage;
