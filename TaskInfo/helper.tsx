import React from "react"
import {
  CheckOutlined,
  CloseOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons"
import { format } from "date-fns"
import { Col, Row } from "antd"

const DeadlineStatus = ({
  maxMark,
}: {
  maxMark: number
}): React.ReactElement => (
  <Row className="task-status_deadline">
    <Col className="status-deadline__block">
      <p>{maxMark}</p>
    </Col>
  </Row>
)

const FailedStatus = (): React.ReactElement => (
  <Row className="task-status_failed">
    <Col className="status-failed__block">
      <CloseOutlined className="status-failed__block-icon" />
    </Col>
  </Row>
)

const NoTimeStatus = (): React.ReactElement => (
  <Row className="task-status_no-time-limit">
    <Col className="status-no-time-limit__block">
      <FieldTimeOutlined className="status-no-time-limit__block-icon" />
    </Col>
  </Row>
)

const SubmittedStatus = (): React.ReactElement => (
  <Row className="task-status_submitted">
    <Col className="status-submitted__block">
      <CheckOutlined className="status-submitted__block-icon" />
    </Col>
  </Row>
)

const DoneStatus = ({ maxMark }: { maxMark: number }): React.ReactElement => (
  <Row className="task-status_done">
    <Col className="status-done__block">
      <p>{maxMark}</p>
    </Col>
  </Row>
)

const DeadlineForDebtorStatus = ({
  maxMark,
}: {
  maxMark: number
}): React.ReactElement => (
  <Row className="task-status_deb-deadline">
    <Col className="status-deb-deadline__block">
      <p>{maxMark}</p>
    </Col>
  </Row>
)

const blockPanel = (curId: string, id: string): boolean =>
  !!(curId && curId !== id)

const dateByStatus = (
  status: string,
  dateEnd: string,
  deadline: string
): React.ReactElement => {
  switch (status) {
    case "deadline":
      return (
        <p className="extra__text">
          Дедлайн: {format(new Date(dateEnd), "dd/MM/yyyy ")}
        </p>
      )
    case "deadline for debtor":
      return (
        <p className="extra__text">
          Дедлайн для должников:
          {format(new Date(deadline), "dd/MM/yyyy")}
        </p>
      )
    default:
      return <p />
  }
}

const disableButton = (status: string): boolean => {
  switch (status) {
    case "deadline":
    case "deadline for debtor":
    case "no time limit":
      return false
    default:
      return true
  }
}

export {
  blockPanel,
  DeadlineForDebtorStatus,
  DeadlineStatus,
  DoneStatus,
  FailedStatus,
  NoTimeStatus,
  SubmittedStatus,
  dateByStatus,
  disableButton,
}
