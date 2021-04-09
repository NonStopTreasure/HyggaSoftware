import React from "react"
import { ITaskTriesModel } from "common/interfaces"

const taskTries = (
  tries: ITaskTriesModel[],
  maxTries: number
): React.ReactElement => {
  if (tries === null) {
    return <p>{maxTries}</p>
  }
  return <p>{maxTries - tries.length}</p>
}

export { taskTries }
