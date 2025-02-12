import React from 'react'

const ErrorTable = ({ error }: { error: any }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="w-full bg-gray-200 dark:bg-gray-900 p-8">
        <div className="flex justify-center items-center min-h-[200px] flex-col gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Ocorreu um erro ao buscard dados
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {error.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorTable