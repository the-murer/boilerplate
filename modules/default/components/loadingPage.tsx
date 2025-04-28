import React from 'react'
import { Spinner } from "@heroui/react"

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  )
}

export default LoadingPage