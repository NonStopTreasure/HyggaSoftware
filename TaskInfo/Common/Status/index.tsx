import React from "react"
import {
  DeadlineForDebtorStatus,
  DeadlineStatus,
  DoneStatus,
  FailedStatus,
  NoTimeStatus,
  SubmittedStatus,
} from "pages/TaskInfo/helper"
import { Col, Row } from "antd"

interface ITaskStatus {
  status: string
  mark: number
  open: boolean
  currentId: string
  taskId: string
  taskLength: number
}

const TaskStatus = (props: ITaskStatus): React.ReactElement => {
  const { currentId, mark, open, status, taskId, taskLength } = props
  let statusComponent
  switch (status) {
    case "no time limit":
      statusComponent = <NoTimeStatus />
      break

    case "submitted":
      statusComponent = <SubmittedStatus />
      break

    case "deadline for debtor":
      statusComponent = <DeadlineForDebtorStatus maxMark={mark} />
      break

    case "deadline":
      statusComponent = <DeadlineStatus maxMark={mark} />
      break
    case "failed":
      statusComponent = <FailedStatus />
      break
    case "done":
      statusComponent = <DoneStatus maxMark={mark} />
      break
    default:
      return (
        <Col className="task__status">
          <p>{status}</p>
        </Col>
      )
  }
  let border_status = ""
  if (open && taskId === currentId) {
    border_status = "_active"
  } else if (taskId !== currentId) {
    border_status = "_no-active"
  }

  return (
    <Col xs={1} className="task-status">
      {statusComponent}
      {taskLength === 1 ? null : (
        <Row className="task-status__border">
          <Col span={1} className={"border-span" + border_status} />
        </Row>
      )}
    </Col>
  )
}

export { TaskStatus }
