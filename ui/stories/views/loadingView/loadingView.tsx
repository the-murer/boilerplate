import React from 'react'
import { Spinner } from "@heroui/react"

const LoadingView = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  )
}

export default LoadingView;